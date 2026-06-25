"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/lib/data";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Icon map — simple text glyphs */
const icons: Record<string, string> = {
  "React": "⚛",
  "Next.js": "▲",
  "TypeScript": "TS",
  "JavaScript": "JS",
  "Tailwind CSS": "~",
  "HTML": "</>",
  "CSS": "#",
  "Responsive Design": "◫",
  "Socket.io Client": "⚡",
  "Flutter": "◆",
  "Node.js": "⬡",
  "Express.js": "∞",
  "PostgreSQL": "🐘",
  "Firebase": "🔥",
  "Firestore": "📦",
  "Supabase": "⚡",
  "tRPC": "⇄",
  "bcrypt": "🔒",
  "Socket.io Server": "⚡",
  "Prisma ORM": "◈",
  "Git": "⎇",
  "GitHub": "🐙",
  "GitLab": "🦊",
  "Vercel": "▲",
  "JetAdmin": "✦",
  "Docker": "🐳",
  "Postman": "📮",
  "VS Code": "{ }",
};

const accentColors = [
  "var(--accent)",
  "var(--accent2)",
  "var(--accent3)",
];

function Pill({ skill, idx }: { skill: string; idx: number }) {
  const color = accentColors[idx % accentColors.length];
  return (
    <div
      className="skill-pill"
      style={{
        "--pill-color": color,
      } as React.CSSProperties}
    >
      <span style={{ fontSize: "13px", lineHeight: 1 }}>{icons[skill] ?? "◇"}</span>
      <span>{skill}</span>
    </div>
  );
}

function MarqueeRow({ items, direction, speed }: { items: string[]; direction: "left" | "right"; speed: number }) {
  /* Duplicate items so the loop is seamless */
  const doubled = [...items, ...items, ...items];
  return (
    <div style={{ overflow: "hidden", position: "relative", width: "100%" }}>
      {/* fade edges */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: `linear-gradient(to right, var(--bg2) 0%, transparent 10%, transparent 90%, var(--bg2) 100%)`,
      }} />
      <div
        className={`marquee-track ${direction}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((s, i) => (
          <Pill key={`${s}-${i}`} skill={s} idx={i} />
        ))}
      </div>
    </div>
  );
}

const proficiencies = [
  { name: "React / Next.js", pct: 90, color: "var(--accent)" },
  { name: "TypeScript", pct: 80, color: "var(--accent2)" },
  { name: "Tailwind CSS", pct: 90, color: "var(--accent)" },
  { name: "Node / Express", pct: 70, color: "var(--accent3)" },
  { name: "PostgreSQL", pct: 72, color: "var(--accent2)" },
  { name: "Flutter", pct: 55, color: "var(--accent3)" },
];

function Bar({ name, pct, color, i }: { name: string; pct: number; color: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref}>
      <div style={{
        display: "flex", justifyContent: "space-between", marginBottom: "8px",
        fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--muted)",
      }}>
        <span>{name}</span>
        <span style={{ color }}>{pct}%</span>
      </div>
      <div style={{ height: "4px", background: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.1, delay: i * 0.1, ease: EASE }}
          style={{ height: "100%", background: `linear-gradient(90deg, ${color}, var(--accent2))`, borderRadius: "2px" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const row1 = [...skills.Frontend, ...skills["Backend & APIs"].slice(0, 5)];
  const row2 = [...skills.Tools, ...skills["Backend & APIs"].slice(5)];

  return (
    <section
      id="skills"
      className="s-pad"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="section-label" style={{ marginBottom: "16px" }}>03 / skills</div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 800, marginBottom: "16px",
          }}>
            Tech Stack
          </h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "15px",
            color: "var(--muted)", marginBottom: "56px", maxWidth: "480px",
            lineHeight: 1.7,
          }}>
            Full-spectrum from pixels to production — frontend, backend, tooling, and everything in between.
          </p>
        </motion.div>
      </div>

      {/* Infinite marquee rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "80px" }}>
        <MarqueeRow items={row1} direction="left" speed={38} />
        <MarqueeRow items={row2} direction="right" speed={44} />
      </div>

      {/* Proficiency bars */}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "10px",
          color: "var(--muted)", letterSpacing: "0.2em",
          textTransform: "uppercase", marginBottom: "28px",
        }}>
          Proficiency
        </div>
        <div
          className="skills-bars"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 80px" }}
        >
          {proficiencies.map(({ name, pct, color }, i) => (
            <Bar key={name} name={name} pct={pct} color={color} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
