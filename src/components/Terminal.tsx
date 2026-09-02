"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  personal,
  projects,
  skills,
  experience,
  education,
  certifications,
  blogPosts,
  dataAnalystProjects,
  automationProjects,
} from "@/lib/data";
import { X } from "lucide-react";
import { ASCII_PORTRAIT, ASCII_COLS, ASCII_LINE_HEIGHT } from "@/lib/ascii";

/* ────────────────────────────────────────────────────────────────
   A real shell over the portfolio data. Every command below reads
   from src/lib/data.ts — nothing here is a canned transcript.
   ──────────────────────────────────────────────────────────────── */

type Tone = "out" | "muted" | "accent" | "err" | "head";
export type Line = { text: string; tone?: Tone; href?: string; indent?: number; fetch?: Fetch };

/** A portrait column with an info column beside it, neofetch-style. */
export type Fetch = { portrait: string[]; info: Line[] };

const out = (text: string, tone: Tone = "out", indent = 0): Line => ({ text, tone, indent });
const link = (text: string, href: string, indent = 0): Line => ({ text, href, tone: "accent", indent });
const blank = (): Line => ({ text: "" });

const SECTIONS = [
  "about",
  "projects",
  "data-analyst",
  "automation",
  "experience",
  "education",
  "blog",
  "certifications",
  "skills",
  "contact",
] as const;

type Ctx = {
  close: () => void;
  clear: () => void;
  setTheme: (t: "dark" | "light") => void;
  theme: "dark" | "light";
  history: string[];
};

type Command = {
  name: string;
  usage: string;
  desc: string;
  aliases?: string[];
  run: (args: string[], ctx: Ctx) => Line[] | Promise<Line[]>;
};

/* ── helpers ── */

const pad = (s: string, n: number) => (s.length >= n ? s : s + " ".repeat(n - s.length));

function findProject(q: string) {
  const needle = q.toLowerCase().replace(/[\s_]/g, "-");
  return (
    projects.find((p) => p.id === needle) ??
    projects.find((p) => p.name.toLowerCase().replace(/\s/g, "-") === needle) ??
    projects.find((p) => p.id.includes(needle) || p.name.toLowerCase().includes(q.toLowerCase()))
  );
}

function projectLines(p: (typeof projects)[number]): Line[] {
  return [
    out(p.name, "head"),
    out(p.tagline, "muted"),
    blank(),
    out(`${pad("category", 10)} ${p.category}`, "out"),
    out(`${pad("role", 10)} ${p.role}`, "out"),
    out(`${pad("repo", 10)} ${p.repo}`, "out"),
    blank(),
    out("metrics", "accent"),
    ...p.metrics.map((m) => out(`• ${m}`, "out", 1)),
    blank(),
    out("stack", "accent"),
    out(p.stack.join(" · "), "out", 1),
    blank(),
    out("about", "accent"),
    ...wrap(p.description).map((l) => out(l, "muted", 1)),
    blank(),
    link(`github  -> ${p.github}`, p.github),
    ...(p.live ? [link(`live    -> ${p.live}`, p.live)] : [out("live    -> not deployed (boots in QEMU)", "muted")]),
  ];
}

/** Soft-wrap long prose so the terminal keeps its column feel. */
function wrap(text: string, width = 78): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > width) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur += " " + w;
    }
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}

/** The neofetch payload: ASCII portrait on the left, real numbers on the right. */
function fetchBlock(): Fetch {
  const deployed = projects.filter((p) => p.live).length;
  const techs = new Set(projects.flatMap((p) => p.stack)).size;
  const current = experience.filter((e) => e.current);
  const row = (k: string, v: string, tone: Tone = "out") => out(`${pad(k, 11)}${v}`, tone);
  return {
    portrait: ASCII_PORTRAIT,
    info: [
      out(`${personal.shortName.toLowerCase()}@portfolio`, "accent"),
      out("-".repeat(28), "muted"),
      row("name", personal.name),
      row("role", personal.subtitle, "accent"),
      row("school", `${personal.title} · UP Cebu`),
      row("location", personal.location),
      row("shell", "ama-shell 2.0"),
      row("projects", `${projects.length} featured · ${deployed} deployed`),
      row("stack", `${techs} technologies`),
      row("roles", current.map((e) => e.company.replace(/^Freelance · /, "")).join(", ")),
      row("status", personal.availability.label, "muted"),
      blank(),
      link(personal.github, personal.githubUrl),
      link(personal.email, `mailto:${personal.email}`),
    ],
  };
}

/* ── command registry ── */

const COMMANDS: Command[] = [
  {
    name: "help",
    usage: "help",
    desc: "list every command",
    aliases: ["?", "man"],
    run: () => [
      out("available commands", "head"),
      blank(),
      ...COMMANDS.map((c) => out(`${pad(c.usage, 22)} ${c.desc}`, "out", 1)),
      blank(),
      out("tab completes · up/down walks history · esc closes", "muted"),
    ],
  },
  {
    name: "neofetch",
    usage: "neofetch",
    desc: "the portrait, plus the vitals",
    aliases: ["me", "portrait", "ascii"],
    run: () => [{ text: "", fetch: fetchBlock() }],
  },
  {
    name: "whoami",
    usage: "whoami",
    desc: "who you are talking to",
    run: () => [
      out(personal.name, "head"),
      out(personal.subtitle, "accent"),
      out(`${personal.title} · ${personal.location}`, "muted"),
      blank(),
      ...wrap(personal.bio).map((l) => out(l, "out")),
      blank(),
      out(`status: ${personal.availability.label}`, personal.availability.open ? "accent" : "muted"),
    ],
  },
  {
    name: "ls",
    usage: "ls [resource]",
    desc: "list projects, skills, sections…",
    run: (args) => {
      const what = (args[0] ?? "").replace(/\/$/, "");
      if (!what)
        return [
          out("projects/      experience/    education/     skills/", "out"),
          out("certs/         blog/          analytics/     automation/", "out"),
          out("sections/", "out"),
          blank(),
          out("try: ls projects", "muted"),
        ];
      if (what.startsWith("proj"))
        return [
          out(`${pad("ID", 18)}${pad("CATEGORY", 13)}NAME`, "accent"),
          ...projects.map((p) => out(`${pad(p.id, 18)}${pad(p.category, 13)}${p.name}`)),
          blank(),
          out(`${projects.length} projects · cat <id> for detail`, "muted"),
        ];
      if (what.startsWith("exp"))
        return experience.map((e) =>
          out(`${pad(e.period, 22)}${pad(e.role, 42)}${e.company}`, e.current ? "accent" : "out"),
        );
      if (what.startsWith("edu"))
        return education.map((e) => out(`${pad(e.period, 34)}${e.degree} — ${e.school}`));
      if (what.startsWith("skill"))
        return Object.entries(skills).map(([k, v]) => out(`${pad(k, 22)}${v.length} entries`));
      if (what.startsWith("cert"))
        return certifications.map((c) => out(`${pad(c.date, 12)}${pad(c.issuer, 12)}${c.title}`));
      if (what.startsWith("blog")) return blogPosts.map((b) => out(`${pad(b.date, 18)}${b.title}`));
      if (what.startsWith("analy"))
        return dataAnalystProjects.map((d) => out(`${pad(d.id, 26)}${d.name}`));
      if (what.startsWith("auto"))
        return automationProjects.map((a) => out(`${pad(a.id, 26)}${a.name}`));
      if (what.startsWith("section")) return SECTIONS.map((s) => out(`#${s}`));
      return [out(`ls: no such resource: ${what}`, "err")];
    },
  },
  {
    name: "cat",
    usage: "cat <project>",
    desc: "read a project in full",
    aliases: ["show"],
    run: (args) => {
      if (!args[0]) return [out("usage: cat <project>   (try: ls projects)", "err")];
      const p = findProject(args.join(" "));
      if (!p) return [out(`cat: ${args.join(" ")}: no such project`, "err")];
      return projectLines(p);
    },
  },
  {
    name: "find",
    usage: "find <query>",
    desc: "search projects by anything",
    aliases: ["grep", "search"],
    run: (args) => {
      const q = args.join(" ").toLowerCase();
      if (!q) return [out("usage: find <query>", "err")];
      const hits = projects.filter((p) =>
        [p.name, p.tagline, p.description, p.category, p.role, ...p.stack, ...p.metrics]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
      if (!hits.length) return [out(`no matches for "${q}"`, "muted")];
      return [
        out(`${hits.length} match${hits.length > 1 ? "es" : ""} for "${q}"`, "accent"),
        blank(),
        ...hits.flatMap((p) => [out(`${pad(p.id, 18)}${p.name}`, "head"), out(p.tagline, "muted", 1)]),
      ];
    },
  },
  {
    name: "stack",
    usage: "stack [tech]",
    desc: "what I build with, and where",
    run: (args) => {
      const q = args.join(" ").toLowerCase();
      if (!q) {
        const counts = new Map<string, number>();
        projects.forEach((p) => p.stack.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
        const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
        return [
          out("tech across the featured builds", "accent"),
          blank(),
          ...sorted.map(([t, n]) =>
            out(`${pad(t, 24)}${"|".repeat(n * 3)} ${n}`, n > 1 ? "out" : "muted"),
          ),
          blank(),
          out("stack <tech> to see which projects use it", "muted"),
        ];
      }
      const hits = projects.filter((p) => p.stack.some((t) => t.toLowerCase().includes(q)));
      if (!hits.length) return [out(`nothing in the featured builds uses "${q}"`, "muted")];
      return [
        out(`"${q}" appears in ${hits.length} project${hits.length > 1 ? "s" : ""}`, "accent"),
        ...hits.map((p) => out(`${pad(p.id, 18)}${p.stack.filter((t) => t.toLowerCase().includes(q)).join(", ")}`)),
      ];
    },
  },
  {
    name: "experience",
    usage: "experience [company]",
    desc: "where I have worked",
    aliases: ["exp", "work"],
    run: (args) => {
      const q = args.join(" ").toLowerCase();
      const rows = q ? experience.filter((e) => e.company.toLowerCase().includes(q)) : experience;
      if (!rows.length) return [out(`no role matching "${q}"`, "err")];
      return rows.flatMap((e) => [
        out(`${e.role} · ${e.company}`, "head"),
        out(`${e.period}   ${e.type}   ${e.location}`, e.current ? "accent" : "muted"),
        ...e.highlights.flatMap((h) => wrap(h, 74).map((l, k) => out(k === 0 ? `-> ${l}` : `   ${l}`, "out", 1))),
        blank(),
      ]);
    },
  },
  {
    name: "education",
    usage: "education",
    desc: "school, in reverse order",
    aliases: ["edu"],
    run: () =>
      education.flatMap((e) => [
        out(e.degree, "head"),
        out(e.school, "out"),
        out(e.period, "muted"),
        ...(e.courses.length ? [out(e.courses.join(" · "), "muted", 1)] : []),
        blank(),
      ]),
  },
  {
    name: "skills",
    usage: "skills [category]",
    desc: "the toolbox, by category",
    run: (args) => {
      const q = args.join(" ").toLowerCase();
      const entries = Object.entries(skills).filter(([k]) => !q || k.toLowerCase().includes(q));
      if (!entries.length) return [out(`no skill category matching "${q}"`, "err")];
      return entries.flatMap(([k, v]) => [
        out(k, "accent"),
        ...wrap(v.join(" · "), 76).map((l) => out(l, "out", 1)),
        blank(),
      ]);
    },
  },
  {
    name: "certs",
    usage: "certs",
    desc: "certifications, with verify links",
    run: () =>
      certifications.flatMap((c) => [
        out(c.title, "head"),
        out(`${c.issuer} · ${c.date} · ${c.credentialId}`, "muted"),
        link(`verify -> ${c.verificationUrl}`, c.verificationUrl, 1),
        blank(),
      ]),
  },
  {
    name: "blog",
    usage: "blog",
    desc: "things I have written up",
    run: () =>
      blogPosts.flatMap((b) => [
        out(b.title, "head"),
        out(`${b.date} · ${b.readTime} · ${b.category}`, "muted"),
        ...wrap(b.excerpt, 76).map((l) => out(l, "out", 1)),
        blank(),
      ]),
  },
  {
    name: "contact",
    usage: "contact",
    desc: "how to reach me",
    run: () => [
      out(personal.availability.note, "muted"),
      blank(),
      link(`email    ${personal.email}`, `mailto:${personal.email}`),
      link(`github   ${personal.github}`, personal.githubUrl),
      link(`phone    ${personal.phone}`, `tel:${personal.phone}`),
    ],
  },
  {
    name: "open",
    usage: "open <project|target>",
    desc: "open a repo, live site, or résumé",
    run: (args) => {
      const t = (args[0] ?? "").toLowerCase();
      if (!t) return [out("usage: open <project|github|resume>", "err")];
      const go = (url: string, label: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
        return [out(`opening ${label}…`, "accent")];
      };
      if (t === "github") return go(personal.githubUrl, personal.github);
      if (t === "resume" || t === "cv") return go("/resume.pdf", "résumé");
      if (t === "portfolio" || t === "site") return go(personal.portfolioUrl, "portfolio");
      const p = findProject(args.join(" "));
      if (!p) return [out(`open: unknown target: ${t}`, "err")];
      const wantsRepo = args[1] === "repo" || args[1] === "github" || !p.live;
      return go(wantsRepo ? p.github : p.live, `${p.name} ${wantsRepo ? "repo" : "live site"}`);
    },
  },
  {
    name: "goto",
    usage: "goto <section>",
    desc: "scroll the page to a section",
    aliases: ["cd"],
    run: (args, ctx) => {
      const t = (args[0] ?? "").replace(/^#|\/$/g, "").toLowerCase();
      if (!t) return [out(`sections: ${SECTIONS.join(", ")}`, "muted")];
      const hit = SECTIONS.find((s) => s === t) ?? SECTIONS.find((s) => s.startsWith(t));
      if (!hit) return [out(`goto: no section named ${t}`, "err")];
      ctx.close();
      document.getElementById(hit)?.scrollIntoView({ behavior: "smooth" });
      return [out(`-> #${hit}`, "accent")];
    },
  },
  {
    name: "theme",
    usage: "theme [dark|light]",
    desc: "flip the lights",
    run: (args, ctx) => {
      const t = (args[0] ?? "").toLowerCase();
      const next = t === "dark" || t === "light" ? (t as "dark" | "light") : ctx.theme === "dark" ? "light" : "dark";
      ctx.setTheme(next);
      return [out(`theme -> ${next}`, "accent")];
    },
  },
  {
    name: "stats",
    usage: "stats",
    desc: "the portfolio by the numbers",
    run: () => {
      const deployed = projects.filter((p) => p.live).length;
      const techs = new Set(projects.flatMap((p) => p.stack)).size;
      const active = experience.filter((e) => e.current).length;
      return [
        out(`${pad("featured builds", 22)}${projects.length}`),
        out(`${pad("deployed live", 22)}${deployed}`),
        out(`${pad("distinct technologies", 22)}${techs}`),
        out(`${pad("roles running now", 22)}${active}`),
        out(`${pad("certifications", 22)}${certifications.length}`),
        out(`${pad("analytics case studies", 22)}${dataAnalystProjects.length}`),
        out(`${pad("automation builds", 22)}${automationProjects.length}`),
      ];
    },
  },
  {
    name: "date",
    usage: "date",
    desc: "local time, right now",
    run: () => [out(new Date().toString(), "muted")],
  },
  {
    name: "echo",
    usage: "echo <text>",
    desc: "say it back",
    run: (args) => [out(args.join(" "))],
  },
  {
    name: "history",
    usage: "history",
    desc: "what you have run so far",
    run: (_a, ctx) =>
      ctx.history.length
        ? ctx.history.map((h, i) => out(`${pad(String(i + 1), 5)}${h}`, "muted"))
        : [out("nothing yet", "muted")],
  },
  {
    name: "clear",
    usage: "clear",
    desc: "wipe the screen",
    aliases: ["cls"],
    run: (_a, ctx) => {
      ctx.clear();
      return [];
    },
  },
  {
    name: "exit",
    usage: "exit",
    desc: "close the terminal",
    aliases: ["quit", "q"],
    run: (_a, ctx) => {
      ctx.close();
      return [];
    },
  },
];

const RESOLVE = new Map<string, Command>();
COMMANDS.forEach((c) => {
  RESOLVE.set(c.name, c);
  c.aliases?.forEach((a) => RESOLVE.set(a, c));
});

const banner = (): Line[] => [
  { text: "", fetch: fetchBlock() },
  blank(),
  out('type "help" for the command list · tab completes · esc closes', "muted"),
];

/* ── component ── */

export default function Terminal({
  open,
  onClose,
  theme,
  onTheme,
}: {
  open: boolean;
  onClose: () => void;
  theme: "dark" | "light";
  onTheme: (t: "dark" | "light") => void;
}) {
  const [lines, setLines] = useState<Line[]>(banner);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const ctx = useMemo<Ctx>(
    () => ({
      close: onClose,
      clear: () => setLines([]),
      setTheme: onTheme,
      theme,
      history,
    }),
    [onClose, onTheme, theme, history],
  );

  // Focus the prompt whenever the terminal opens.
  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  // Keep the newest output in view.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, busy]);

  const submit = useCallback(
    async (raw: string) => {
      const cmdline = raw.trim();
      setInput("");
      setCursor(-1);
      if (!cmdline) {
        setLines((l) => [...l, { text: "", tone: "out", indent: -1 }]);
        return;
      }
      setHistory((h) => [...h, cmdline]);
      setLines((l) => [...l, { text: cmdline, indent: -1 }]);

      const [name, ...args] = cmdline.split(/\s+/);
      const key = name.toLowerCase();

      if (key === "sudo") {
        setLines((l) => [...l, out(`${personal.shortName} is not in the sudoers file. This incident will be reported.`, "err")]);
        return;
      }

      const cmd = RESOLVE.get(key);
      if (!cmd) {
        setLines((l) => [
          ...l,
          out(`command not found: ${name}`, "err"),
          out('type "help" for the list', "muted"),
        ]);
        return;
      }

      const result = cmd.run(args, ctx);
      if (result instanceof Promise) {
        setBusy(true);
        const resolved = await result;
        setBusy(false);
        setLines((l) => [...l, ...resolved]);
      } else if (result.length) {
        setLines((l) => [...l, ...result]);
      }
    },
    [ctx],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      void submit(input);
      return;
    }
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setInput(history[next]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cursor < 0) return;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setInput("");
      } else {
        setCursor(next);
        setInput(history[next]);
      }
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(/\s+/);
      // completing an argument for cat/open → project ids
      if (parts.length > 1 && ["cat", "show", "open"].includes(parts[0].toLowerCase())) {
        const frag = parts[parts.length - 1].toLowerCase();
        const hit = projects.map((p) => p.id).find((id) => id.startsWith(frag));
        if (hit) setInput([...parts.slice(0, -1), hit].join(" ") + " ");
        return;
      }
      const frag = parts[0].toLowerCase();
      const hit = [...RESOLVE.keys()].sort().find((k) => k.startsWith(frag));
      if (hit) setInput(hit + " ");
    }
  };

  if (!open) return null;

  const toneColor: Record<Tone, string> = {
    out: "var(--text)",
    muted: "var(--muted)",
    accent: "var(--accent)",
    err: "var(--accent2)",
    head: "var(--text)",
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "color-mix(in srgb, var(--bg) 72%, transparent)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "84px 16px 24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Portfolio terminal"
        style={{
          width: "min(880px, 100%)",
          maxHeight: "min(640px, calc(100vh - 120px))",
          display: "flex",
          flexDirection: "column",
          background: "var(--card)",
          border: "1px solid var(--accent)",
          borderRadius: "var(--r2)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.45), 0 0 0 1px var(--accent-soft)",
          overflow: "hidden",
        }}
      >
        {/* title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 14px",
            background: "var(--bg3)",
            borderBottom: "1px solid var(--border)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--muted)",
            letterSpacing: "0.06em",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", gap: "5px" }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
            ))}
          </div>
          <span style={{ flex: 1 }}>
            {personal.shortName.toLowerCase()}@portfolio — ~/ama
          </span>
          <button
            onClick={onClose}
            aria-label="Close terminal"
            style={{
              background: "none",
              border: "none",
              color: "var(--muted)",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            esc
            <X aria-hidden style={{ width: "12px", height: "12px" }} />
          </button>
        </div>

        {/* output */}
        <div
          ref={bodyRef}
          onClick={() => inputRef.current?.focus()}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 18px 8px",
            fontFamily: "var(--font-mono)",
            fontSize: "12.5px",
            lineHeight: 1.75,
            cursor: "text",
          }}
        >
          {lines.map((l, i) =>
            l.fetch ? (
              <div key={i} className="term-fetch">
                <pre
                  role="img"
                  aria-label="ASCII-art portrait of Andre Milan Arañas"
                  style={{
                    margin: 0,
                    color: "var(--accent)",
                    fontFamily: "var(--font-mono)",
                    fontSize: `${Math.min(10, 420 / ASCII_COLS)}px`,
                    lineHeight: ASCII_LINE_HEIGHT,
                    letterSpacing: 0,
                    flexShrink: 0,
                    userSelect: "none",
                  }}
                >
                  {l.fetch.portrait.join("\n")}
                </pre>
                <div style={{ minWidth: 0 }}>
                  {l.fetch.info.map((f, k) => (
                    <div
                      key={k}
                      style={{
                        color: toneColor[f.tone ?? "out"],
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {f.href ? (
                        <a
                          href={f.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "3px" }}
                        >
                          {f.text}
                        </a>
                      ) : (
                        f.text || " "
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : l.indent === -1 ? (
              <div key={i} style={{ color: "var(--text)", marginTop: i ? "10px" : 0 }}>
                <span style={{ color: "var(--accent)" }}>~/ama $</span> {l.text}
              </div>
            ) : (
              <div
                key={i}
                style={{
                  color: toneColor[l.tone ?? "out"],
                  fontWeight: l.tone === "head" ? 700 : 400,
                  paddingLeft: `${(l.indent ?? 0) * 16}px`,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {l.href ? (
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "3px" }}
                  >
                    {l.text}
                  </a>
                ) : (
                  l.text || " "
                )}
              </div>
            ),
          )}
          {busy && <div style={{ color: "var(--muted)" }}>thinking…</div>}
        </div>

        {/* prompt */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 18px",
            borderTop: "1px solid var(--border)",
            background: "var(--bg2)",
            fontFamily: "var(--font-mono)",
            fontSize: "12.5px",
            flexShrink: 0,
          }}
        >
          <span style={{ color: "var(--accent)" }}>~/ama $</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal input"
            placeholder="help"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text)",
              fontFamily: "var(--font-mono)",
              fontSize: "12.5px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
