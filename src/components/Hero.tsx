"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Mark from "./ui/mark";
import { personal, projects, allRoles } from "@/lib/data";
import { ASCII_PORTRAIT, ASCII_LINE_HEIGHT } from "@/lib/ascii";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Track = {
  id: string;
  n: string;
  role: string;
  short: string;
  color: string;
  line: string;
  stack: string[];
  href: string;
  cmd: string;
};

const TRACKS: Track[] = [
  {
    id: "developer",
    n: "01",
    role: "Software Engineer",
    short: "SWE",
    color: "var(--accent)",
    line: "Frontend-leaning full stack. React, Next.js, TypeScript, Node. I take a build from the schema to the deploy.",
    stack: ["React", "Next.js", "TypeScript", "Node", "PostgreSQL"],
    href: "#projects",
    cmd: "npm run build",
  },
  {
    id: "data-analyst",
    n: "02",
    role: "Data Analyst",
    short: "DATA",
    color: "var(--accent2)",
    line: "Python spatial analysis, GIS multi-criteria modelling, cohort retention. The notebooks are here to read, outputs and all.",
    stack: ["Python", "Pandas", "GeoPandas", "SQL", "Jupyter"],
    href: "#data-analyst",
    cmd: "jupyter lab",
  },
  {
    id: "automation",
    n: "03",
    role: "AI Automation Engineer",
    short: "AI/AUTO",
    color: "var(--accent3)",
    line: "n8n orchestration with LLM agents, tool-calling, webhook routing. Workflows that run without me.",
    stack: ["n8n", "Gemini API", "Webhooks", "RAG", "Agents"],
    href: "#automation",
    cmd: "n8n execute",
  },
];

/* ── Character-reveal heading ── */
function Reveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span style={{ display: "inline-block" }}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: "0.4em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.022, duration: 0.5, ease: EASE }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [lit, setLit] = useState(false);
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (locked) return;
    timer.current = setInterval(() => setActive((i) => (i + 1) % TRACKS.length), 3600);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [locked]);

  const t = TRACKS[active];

  return (
    <section
      id="about"
      className="hero-pad"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}
    >
      {/* soft matcha glow that follows the active track */}
      <motion.div
        animate={{ background: `radial-gradient(circle, ${t.color === "var(--accent)" ? "rgba(168,207,142,0.10)" : t.color === "var(--accent2)" ? "rgba(240,168,192,0.09)" : "rgba(232,201,138,0.08)"} 0%, transparent 68%)` }}
        transition={{ duration: 0.9 }}
        style={{ position: "absolute", top: "-6%", right: "-4%", width: "760px", height: "760px", pointerEvents: "none", zIndex: 0 }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", width: "100%" }}>

        {/* ── status bar ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", marginBottom: "44px", fontFamily: "var(--font-mono)", fontSize: "10.5px", letterSpacing: "0.14em", color: "var(--dim)", textTransform: "uppercase" }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", color: "var(--accent)" }}>
            <span className="pulse" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
            {personal.subtitle}
          </span>
          <span style={{ color: "var(--dim)" }}>/</span>
          <span>{personal.location}</span>
          <span style={{ color: "var(--dim)" }}>/</span>
          <span>4th yr · bs cs · up cebu</span>
          <span style={{ color: "var(--dim)" }}>/</span>
          <span style={{ color: "var(--dim)" }}>{personal.availability.label}</span>
        </motion.div>

        {/* ── nameplate: the portrait sits behind the name, not beside it ── */}
        <div className="hero-name" style={{ position: "relative", marginBottom: "18px" }}>

          {/* hairline the name hangs from, running out past the portrait */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.55, duration: 1.1, ease: EASE }}
            aria-hidden
            className="hero-rule"
            style={{
              position: "absolute", left: 0, right: 0, top: "0.42em", height: "1px",
              background: "linear-gradient(to right, var(--accent), var(--border) 42%, transparent)",
              transformOrigin: "left", zIndex: 0,
            }}
          />

          {/* portrait, overlapped by the surname */}
          <motion.div
            initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: EASE }}
            className="hero-portrait"
            onMouseEnter={() => setLit(true)}
            onMouseLeave={() => setLit(false)}
          >
            <div
              role="img"
              aria-label="ASCII-art portrait of Andre Milan Arañas"
              className="ascii-portrait"
              style={{
                borderRadius: "var(--r)",
                border: `1px solid ${lit ? "var(--accent)" : "var(--border2)"}`,
                background: "var(--bg2)",
                padding: "12px 14px",
                boxShadow: lit ? "0 0 36px var(--accent-glow)" : "none",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
            >
              <pre
                aria-hidden="true"
                style={{
                  margin: 0,
                  fontFamily: "var(--font-mono)",
                  lineHeight: ASCII_LINE_HEIGHT,
                  letterSpacing: 0,
                  whiteSpace: "pre",
                  color: "var(--accent)",
                  opacity: lit ? 1 : 0.72,
                  transition: "opacity 0.3s",
                  userSelect: "none",
                }}
              >
                {ASCII_PORTRAIT.join("\n")}
              </pre>
            </div>
          </motion.div>

          {/* crop marks bracketing the whole nameplate */}
          {[0, 1, 2, 3].map((i) => (
            <span key={i} aria-hidden className="hero-tick" style={{
              position: "absolute", width: "10px", height: "10px",
              borderColor: "var(--accent)", opacity: lit ? 0.9 : 0.4, transition: "opacity 0.3s",
              ...(i < 2 ? { top: 0 } : { bottom: 0 }),
              ...(i % 2 === 0 ? { left: 0 } : { right: 0 }),
              ...(i < 2 ? { borderTop: "1px solid" } : { borderBottom: "1px solid" }),
              ...(i % 2 === 0 ? { borderLeft: "1px solid" } : { borderRight: "1px solid" }),
            }} />
          ))}

          {/* the name itself, in front */}
          <h1 className="hero-h1">
            <span className="hero-kicker">
              <span style={{ color: "var(--accent)" }}>$</span> whoami
            </span>
            <span className="hero-line-1"><Reveal text="Andre Milan" delay={0.15} /></span>
            <span className="hero-line-2"><Reveal text="Arañas" delay={0.42} /></span>
          </h1>
        </div>

        {/* ── rule ── */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
          style={{ height: "1px", background: "var(--border)", transformOrigin: "left", margin: "38px 0 34px" }}
        />

        {/* ── three career paths ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "20px" }}>
            three tracks — pick one
          </div>

          <div className="track-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "var(--border2)", border: "1px solid var(--border2)", borderRadius: "var(--r)", overflow: "hidden" }}>
            {TRACKS.map((track, i) => {
              const on = active === i;
              return (
                <a
                  key={track.id}
                  href={track.href}
                  onMouseEnter={() => { setActive(i); setLocked(true); }}
                  onMouseLeave={() => setLocked(false)}
                  style={{
                    position: "relative",
                    background: on ? "var(--card2)" : "var(--card)",
                    padding: "26px 24px 24px",
                    display: "flex", flexDirection: "column",
                    transition: "background 0.3s",
                    minHeight: "168px",
                  }}
                >
                  {/* top accent bar */}
                  <motion.div
                    animate={{ scaleX: on ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: track.color, transformOrigin: "left" }}
                  />

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "14px" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: on ? track.color : "var(--dim)", letterSpacing: "0.16em", transition: "color 0.3s" }}>
                      {track.n}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--dim)", letterSpacing: "0.14em" }}>
                      {track.short}
                    </span>
                  </div>

                  <h2 style={{
                    fontSize: "clamp(19px, 2.1vw, 25px)", fontWeight: 600, letterSpacing: "-0.03em",
                    color: on ? "var(--text)" : "var(--muted)", transition: "color 0.3s", marginBottom: "14px", lineHeight: 1.12,
                  }}>
                    {track.role}
                  </h2>

                  <div style={{ marginTop: "auto", display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {track.stack.slice(0, 3).map((s) => (
                      <span key={s} style={{
                        fontFamily: "var(--font-mono)", fontSize: "9.5px", padding: "2px 7px",
                        border: `1px solid ${on ? track.color : "var(--border2)"}`,
                        color: on ? track.color : "var(--dim)",
                        borderRadius: "2px", transition: "all 0.3s", opacity: on ? 1 : 0.7,
                      }}>{s}</span>
                    ))}
                  </div>
                </a>
              );
            })}
          </div>

          {/* ── active track detail strip ── */}
          <div style={{ borderLeft: "1px solid var(--border2)", borderRight: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)", borderRadius: "0 0 var(--r) var(--r)", background: "var(--bg2)", padding: "16px 24px", minHeight: "74px", display: "flex", alignItems: "center", gap: "18px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}
              >
                <code style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", color: t.color, border: `1px solid ${t.color}`, opacity: 0.85, padding: "3px 9px", borderRadius: "2px", whiteSpace: "nowrap" }}>
                  $ {t.cmd}
                </code>
                <span style={{ fontSize: "13.5px", color: "var(--muted)", lineHeight: 1.6, maxWidth: "760px" }}>
                  {t.line}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── bottom row: bio + CTAs + stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.6, ease: EASE }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "40px", flexWrap: "wrap", marginTop: "44px" }}
        >
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="#projects" style={{
              fontFamily: "var(--font-mono)", fontSize: "11.5px", letterSpacing: "0.06em", fontWeight: 600,
              padding: "12px 26px", borderRadius: "var(--r)", background: "var(--accent)", color: "var(--bg)",
              transition: "opacity 0.2s, transform 0.2s", display: "inline-flex", alignItems: "center", gap: "8px",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.opacity = "0.9"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.opacity = "1"; }}
            >
              view work
              <Mark name="arrow" size={13} />
            </a>
            <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "var(--font-mono)", fontSize: "11.5px", letterSpacing: "0.06em",
              padding: "12px 26px", borderRadius: "var(--r)", border: "1px solid var(--border2)", color: "var(--muted)",
              transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: "8px",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border2)"; }}
            >
              github
              <Mark name="external" size={13} />
            </a>
          </div>

          <div className="hero-stats" style={{ display: "flex", gap: "38px" }}>
            {([
              [`${projects.length}`, "featured builds"],
              [`${projects.filter((p) => p.live).length}`, "deployed live"],
              [`${allRoles.filter((r) => r.current).length}`, "active roles"],
              ["2027", "expected grad"],
            ] as const).map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "30px", fontWeight: 600, color: "var(--text)", lineHeight: 1, letterSpacing: "-0.04em" }}>{v}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "9.5px", color: "var(--dim)", marginTop: "6px", letterSpacing: "0.14em", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
