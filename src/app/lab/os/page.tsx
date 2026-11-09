"use client";
import "./os.css";
/**
 * PROTOTYPE A — "AMA-OS"
 *
 * The portfolio as an operating system. Not a metaphor picked off a trend
 * list: Andre wrote DugOS, a freestanding 32-bit OS that boots through GRUB
 * into its own shell. This site boots the same way, and the terminal he
 * already built stops being an easter egg and becomes the actual interface.
 *
 * Navigation is a launcher, not a nav bar. Content opens in windows.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { personal, projects, allRoles, experience, education, skills, certifications } from "@/lib/data";

const BOOT_LINES = [
  "GRUB loading stage2...",
  "Multiboot header OK  ·  i386 protected mode",
  "GDT 5 entries  ·  IDT 256 entries  ·  PIC remapped 32–47",
  "PS/2 keyboard driver attached on IRQ1",
  "mounting /dev/portfolio ... ok",
  `loading ${projects.length} builds, ${allRoles.length} roles, ${certifications.length} credentials`,
  "starting ama-shell",
];

type WindowId = "work" | "experience" | "background" | "contact" | "readme";

const APPS: { id: WindowId; label: string; hint: string }[] = [
  { id: "readme", label: "readme", hint: "start here" },
  { id: "work", label: "work", hint: `${projects.length} builds` },
  { id: "experience", label: "experience", hint: `${allRoles.length} roles` },
  { id: "background", label: "background", hint: "school · stack" },
  { id: "contact", label: "contact", hint: "say hello" },
];

export default function OsPrototype() {
  const [booted, setBooted] = useState(false);
  const [line, setLine] = useState(0);
  const [open, setOpen] = useState<WindowId[]>(["readme"]);
  const [focused, setFocused] = useState<WindowId>("readme");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setLine((n) => {
        if (n >= BOOT_LINES.length) {
          if (timer.current) clearInterval(timer.current);
          setTimeout(() => setBooted(true), 420);
          return n;
        }
        return n + 1;
      });
    }, 230);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  const launch = useCallback((id: WindowId) => {
    setOpen((w) => (w.includes(id) ? w : [...w, id]));
    setFocused(id);
  }, []);

  const close = useCallback((id: WindowId) => {
    setOpen((w) => w.filter((x) => x !== id));
  }, []);

  if (!booted) {
    return (
      <main className="os-boot">
        <pre className="os-boot-log">
          {BOOT_LINES.slice(0, line).map((l, i) => (
            <div key={i}>
              <span className="os-ok">[  OK  ]</span> {l}
            </div>
          ))}
          <div className="os-caret">_</div>
        </pre>
      </main>
    );
  }

  return (
    <main className="os-root">
      {/* status bar */}
      <header className="os-bar">
        <span className="os-bar-name">AMA-OS</span>
        <span className="os-bar-sep">·</span>
        <span>{personal.name}</span>
        <span className="os-bar-spacer" />
        <span className="os-bar-dim">{personal.location}</span>
        <span className="os-bar-sep">·</span>
        <span className="os-bar-dim">{personal.availability.label}</span>
      </header>

      <div className="os-body">
        {/* launcher */}
        <nav className="os-launcher" aria-label="Applications">
          {APPS.map((a, i) => (
            <button
              key={a.id}
              onClick={() => launch(a.id)}
              className={`os-app${open.includes(a.id) ? " is-open" : ""}`}
            >
              <span className="os-app-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="os-app-label">{a.label}</span>
              <span className="os-app-hint">{a.hint}</span>
            </button>
          ))}
          <div className="os-launcher-foot">
            <span>{open.length} window{open.length === 1 ? "" : "s"}</span>
          </div>
        </nav>

        {/* windows */}
        <section className="os-windows">
          {open.length === 0 && (
            <p className="os-empty">no windows open — pick something on the left</p>
          )}
          {open.map((id) => (
            <article
              key={id}
              className={`os-window${focused === id ? " is-focused" : ""}`}
              onMouseDown={() => setFocused(id)}
            >
              <div className="os-window-bar">
                <span className="os-window-title">/{id}</span>
                <button className="os-window-close" onClick={() => close(id)} aria-label={`Close ${id}`}>×</button>
              </div>
              <div className="os-window-body">
                <WindowContent id={id} />
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

function WindowContent({ id }: { id: WindowId }) {
  if (id === "readme") {
    return (
      <div className="os-prose">
        <p>{personal.bio}</p>
        <p className="os-dim">
          Everything here opens as a window. Nothing is hidden behind a scroll.
        </p>
      </div>
    );
  }
  if (id === "work") {
    return (
      <ul className="os-list">
        {projects.map((p, i) => (
          <li key={p.id}>
            <span className="os-list-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="os-list-main">
              <strong>{p.name}</strong>
              <span className="os-dim"> — {p.tagline}</span>
              <span className="os-stack">{p.stack.slice(0, 4).join(" · ")}</span>
            </span>
            <span className="os-list-tag">{p.category}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (id === "experience") {
    return (
      <ul className="os-list">
        {experience.flatMap((c) =>
          c.roles.map((r) => (
            <li key={c.company + r.period}>
              <span className="os-list-n">{r.current ? "●" : "○"}</span>
              <span className="os-list-main">
                <strong>{r.role}</strong>
                <span className="os-dim"> — {c.company}</span>
                <span className="os-stack">{r.period} · {r.type}</span>
              </span>
            </li>
          )),
        )}
      </ul>
    );
  }
  if (id === "background") {
    return (
      <div className="os-prose">
        <ul className="os-list">
          {education.map((e) => (
            <li key={e.degree}>
              <span className="os-list-n">·</span>
              <span className="os-list-main">
                <strong>{e.degree}</strong>
                <span className="os-dim"> — {e.school}</span>
                <span className="os-stack">{e.period}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="os-stack" style={{ marginTop: 18 }}>
          {Object.values(skills).flat().slice(0, 18).join(" · ")}
        </p>
      </div>
    );
  }
  return (
    <div className="os-prose">
      <p>{personal.availability.note}</p>
      <p>
        <a href={`mailto:${personal.email}`}>{personal.email}</a>
        <br />
        <a href={personal.githubUrl}>{personal.github}</a>
      </p>
    </div>
  );
}
