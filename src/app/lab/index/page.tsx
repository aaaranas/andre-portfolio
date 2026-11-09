"use client";
import "./index.css";
/**
 * PROTOTYPE C — "Index"
 *
 * The anti-portfolio. No hero, no cards, no sections, no scroll reveals.
 * The entire site is one typographic index — every piece of work, role and
 * credential as a row in a single ranked table, the way a book index or a
 * departure board works.
 *
 * Navigation is filtering and expansion in place, so nothing is ever more
 * than one interaction away. It loads instantly and reads perfectly in a
 * screen reader, which is the opposite trade from a spatial canvas.
 */
import { useMemo, useState } from "react";
import { personal, projects, dataAnalystProjects, automationProjects, experience, certifications, education } from "@/lib/data";

type Row = {
  id: string;
  year: string;
  title: string;
  kind: string;
  meta: string;
  body: string;
  stack?: string[];
  href?: string;
};

const ROWS: Row[] = [
  ...projects.map((p) => ({
    id: p.id, year: "—", title: p.name, kind: "build",
    meta: `${p.role} · ${p.category}`, body: p.description, stack: p.stack, href: p.live || p.github,
  })),
  ...dataAnalystProjects.map((p) => ({
    id: p.id, year: "—", title: p.name, kind: "data",
    meta: p.tagline, body: p.summary, stack: p.tools,
  })),
  ...automationProjects.map((p) => ({
    id: p.id, year: "—", title: p.name, kind: "automation",
    meta: p.tagline, body: p.description, stack: p.n8nNodes.map((n) => n.name),
  })),
  ...experience.flatMap((c) =>
    c.roles.map((r) => ({
      id: c.company + r.period, year: r.period.split(" ")[1] ?? "", title: r.role, kind: "role",
      meta: `${c.company} · ${r.type}`, body: r.highlights[0], stack: undefined,
    })),
  ),
  ...education.map((e) => ({
    id: e.degree, year: e.period.replace(/[^0-9]/g, "").slice(0, 4), title: e.degree, kind: "study",
    meta: e.school, body: e.courses.join(" · ") || e.period,
  })),
  ...certifications.map((c) => ({
    id: c.id, year: c.date.split(" ")[1] ?? "", title: c.title, kind: "credential",
    meta: `${c.issuer} · ${c.date}`, body: c.description, stack: c.skills, href: c.verificationUrl,
  })),
];

const KINDS = ["all", "build", "data", "automation", "role", "study", "credential"] as const;

export default function IndexPrototype() {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ROWS.filter(
      (r) =>
        (kind === "all" || r.kind === kind) &&
        (!needle ||
          [r.title, r.meta, r.body, ...(r.stack ?? [])].join(" ").toLowerCase().includes(needle)),
    );
  }, [kind, q]);

  return (
    <main className="ix-root">
      {/* masthead — the only thing that is not a row */}
      <header className="ix-head">
        <h1 className="ix-name">{personal.name}</h1>
        <div className="ix-meta">
          <span>{personal.subtitle}</span>
          <span>{personal.location}</span>
          <a href={`mailto:${personal.email}`}>{personal.email}</a>
          <a href={personal.githubUrl}>{personal.github}</a>
        </div>
      </header>

      {/* controls */}
      <div className="ix-controls">
        <input
          className="ix-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="filter everything…"
          aria-label="Filter the index"
        />
        <div className="ix-kinds">
          {KINDS.map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`ix-kind${kind === k ? " is-on" : ""}`}
            >
              {k}
              <sup>{k === "all" ? ROWS.length : ROWS.filter((r) => r.kind === k).length}</sup>
            </button>
          ))}
        </div>
        <span className="ix-count">{rows.length} entries</span>
      </div>

      {/* the index */}
      <ol className="ix-list">
        {rows.map((r, i) => {
          const isOpen = open === r.id;
          return (
            <li key={r.id} className={`ix-row${isOpen ? " is-open" : ""}`}>
              <button className="ix-rowhead" onClick={() => setOpen(isOpen ? null : r.id)}>
                <span className="ix-n">{String(i + 1).padStart(3, "0")}</span>
                <span className="ix-title">{r.title}</span>
                <span className="ix-kindtag">{r.kind}</span>
                <span className="ix-dots" aria-hidden />
                <span className="ix-year">{r.year}</span>
              </button>
              <div className="ix-detail">
                <div className="ix-detail-inner">
                  <p className="ix-detail-meta">{r.meta}</p>
                  <p className="ix-detail-body">{r.body}</p>
                  {r.stack && <p className="ix-detail-stack">{r.stack.join("  ·  ")}</p>}
                  {r.href && (
                    <a className="ix-detail-link" href={r.href} target="_blank" rel="noopener noreferrer">
                      open ↗
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {rows.length === 0 && <p className="ix-empty">nothing matches “{q}”.</p>}
    </main>
  );
}
