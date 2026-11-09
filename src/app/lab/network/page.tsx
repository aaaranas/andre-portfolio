"use client";
import "./network.css";
/**
 * PROTOTYPE B — "The Route"
 *
 * First attempt was four parallel rails with rotated labels. It was a Gantt
 * chart with collisions, not a map. This is the rebuild: one continuous line
 * that snakes down the page and changes colour as it passes through phases,
 * the way a single journey crosses zones.
 *
 * Earned, not decorative — Andre built Komyut ta Bai, which routes Dijkstra
 * over a transit graph. Reading top to bottom also means it survives mobile,
 * which a pan-and-zoom canvas does not.
 */
import { useState } from "react";
import { personal, projects, dataAnalystProjects, automationProjects, experience, education } from "@/lib/data";

type Station = {
  id: string;
  name: string;
  phase: string;
  colour: string;
  meta: string;
  detail: string;
  interchange?: boolean;
  href?: string;
};

const C = { study: "#5b6472", role: "#e4572e", build: "#0f8f84", lab: "#7b5cd6" };

/** Long formal titles do not fit a station label; these are the platform names. */
const short = (s: string, n = 30) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

const STATIONS: Station[] = [
  ...[...education].reverse().map((e) => ({
    id: e.degree,
    name: short(e.degree.replace("Bachelor of Science in ", "BS ").replace("Science, Technology, Engineering & Mathematics", "STEM")),
    phase: "study",
    colour: C.study,
    meta: e.school.replace("University of the Philippines Cebu", "UP Cebu").replace("Philippine Science High School — Central Visayas Campus", "PSHS–CVC"),
    detail: e.period,
  })),
  ...[...experience].reverse().flatMap((c) =>
    [...c.roles].reverse().map((r) => ({
      id: c.company + r.period,
      name: short(r.role),
      phase: "role",
      colour: C.role,
      meta: `${c.company} · ${r.type}`,
      detail: `${r.period} · ${r.location}`,
      interchange: r.current,
    })),
  ),
  ...projects.map((p) => ({
    id: p.id,
    name: short(p.name),
    phase: "build",
    colour: C.build,
    meta: `${p.role} · ${p.category}`,
    detail: p.tagline,
    href: p.live || p.github,
  })),
  ...dataAnalystProjects.map((p) => ({
    id: p.id,
    name: short(p.name, 26),
    phase: "lab",
    colour: C.lab,
    meta: "analysis",
    detail: p.tagline,
  })),
  ...automationProjects.map((p) => ({
    id: p.id,
    name: short(p.name, 26),
    phase: "lab",
    colour: C.lab,
    meta: "workflow",
    detail: p.tagline,
  })),
];

const PHASES = [
  { id: "study", label: "Study", colour: C.study },
  { id: "role", label: "Work", colour: C.role },
  { id: "build", label: "Builds", colour: C.build },
  { id: "lab", label: "Lab", colour: C.lab },
];

/* geometry */
const STEP = 76;
const TOP = 56;
const LEFT = 150;
const JOG = 86;

export default function RoutePrototype() {
  const [active, setActive] = useState<Station | null>(null);

  // The line jogs right each time the phase changes, so a zone reads as a leg.
  // Lane is derived, not accumulated in a mutable local: how many phase
  // changes have happened before this station.
  const pts = STATIONS.map((s, i) => {
    const lane = STATIONS.slice(0, i + 1).filter(
      (st, j) => j > 0 && st.phase !== STATIONS[j - 1].phase,
    ).length;
    return { s, x: LEFT + lane * JOG, y: TOP + i * STEP };
  });

  const height = TOP + STEP * (STATIONS.length - 1) + 70;
  const width = Math.max(...pts.map((p) => p.x)) + 460;

  // One polyline through every station, with a square corner at each jog.
  const d = pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = pts[i - 1];
      return prev.x === p.x ? `L ${p.x} ${p.y}` : `L ${prev.x} ${p.y - STEP / 2} L ${p.x} ${p.y - STEP / 2} L ${p.x} ${p.y}`;
    })
    .join(" ");

  return (
    <main className="rt-root">
      <header className="rt-head">
        <h1 className="rt-title">{personal.name}</h1>
        <p className="rt-sub">{personal.subtitle} · {personal.location}</p>
        <ul className="rt-legend">
          {PHASES.map((p) => (
            <li key={p.id}>
              <span className="rt-swatch" style={{ background: p.colour }} />
              {p.label}
            </li>
          ))}
        </ul>
      </header>

      <div className="rt-canvas">
        <svg viewBox={`0 0 ${width} ${height}`} className="rt-svg" role="img"
          aria-label="A single route through Andre's study, work and projects">
          {/* the track, drawn per segment so colour changes with the phase */}
          {pts.slice(1).map((p, i) => {
            const prev = pts[i];
            const seg = prev.x === p.x
              ? `M ${prev.x} ${prev.y} L ${p.x} ${p.y}`
              : `M ${prev.x} ${prev.y} L ${prev.x} ${p.y - STEP / 2} L ${p.x} ${p.y - STEP / 2} L ${p.x} ${p.y}`;
            return (
              <path key={p.s.id} d={seg} fill="none" stroke={p.s.colour}
                strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
            );
          })}
          <path d={d} fill="none" stroke="none" />

          {pts.map(({ s, x, y }) => {
            const on = active?.id === s.id;
            return (
              <g key={s.id} className="rt-stop" onClick={() => setActive(s)} tabIndex={0} role="button"
                aria-label={`${s.name}, ${s.meta}`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(s); } }}>
                {s.interchange ? (
                  <rect x={x - 12} y={y - 12} width={24} height={24} rx={4} fill="#fff" stroke={s.colour} strokeWidth={5} />
                ) : (
                  <circle cx={x} cy={y} r={on ? 12 : 9} fill="#fff" stroke={s.colour} strokeWidth={5} />
                )}
                <text x={x + 26} y={y - 2} className={`rt-name${on ? " is-on" : ""}`}>{s.name}</text>
                <text x={x + 26} y={y + 14} className="rt-meta">{s.meta}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <aside className={`rt-panel${active ? " is-open" : ""}`} aria-live="polite">
        {active && (
          <>
            <div className="rt-panel-bar" style={{ background: active.colour }}>{active.phase}</div>
            <div className="rt-panel-body">
              <h2>{active.name}</h2>
              <p className="rt-panel-sub">{active.meta}</p>
              <p className="rt-panel-detail">{active.detail}</p>
              {active.href && <a className="rt-panel-link" href={active.href} target="_blank" rel="noopener noreferrer">open ↗</a>}
              <button className="rt-panel-close" onClick={() => setActive(null)}>close</button>
            </div>
          </>
        )}
      </aside>
    </main>
  );
}
