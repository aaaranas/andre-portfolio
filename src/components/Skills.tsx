"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { skills } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

/* Simple Icons via react-icons/si */
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiHtml5, SiCss, SiSocketdotio, SiFlutter,
  SiNodedotjs, SiExpress, SiPostgresql, SiFirebase, SiSupabase,
  SiTrpc, SiPrisma,
  SiGit, SiGithub, SiGitlab, SiVercel, SiDocker, SiPostman,
} from "react-icons/si";
import { IconType } from "react-icons";

const ICON_MAP: Record<string, IconType> = {
  "React": SiReact,
  "Next.js": SiNextdotjs,
  "TypeScript": SiTypescript,
  "JavaScript": SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  "HTML": SiHtml5,
  "CSS": SiCss,
  "Socket.io Client": SiSocketdotio,
  "Flutter": SiFlutter,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "PostgreSQL": SiPostgresql,
  "Firebase": SiFirebase,
  "Firestore": SiFirebase,
  "Supabase": SiSupabase,
  "tRPC": SiTrpc,
  "Socket.io Server": SiSocketdotio,
  "Prisma ORM": SiPrisma,
  "Git": SiGit,
  "GitHub": SiGithub,
  "GitLab": SiGitlab,
  "Vercel": SiVercel,
  "Docker": SiDocker,
  "Postman": SiPostman,
};

/* Text fallback glyphs for skills with no SI icon */
const GLYPH_MAP: Record<string, string> = {
  "Responsive Design": "◫",
  "bcrypt": "🔒",
  "JetAdmin": "✦",
  "VS Code": "{ }",
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const categories = Object.keys(skills) as Array<keyof typeof skills>;

const categoryIcons: Record<string, string> = {
  "Frontend": "⬡",
  "Backend & APIs": "⚙",
  "Tools": "◈",
};

const proficiencyBars = [
  { name: "React / Next.js", pct: 90, color: "var(--accent)" },
  { name: "TypeScript", pct: 80, color: "var(--accent2)" },
  { name: "Tailwind CSS", pct: 90, color: "var(--accent)" },
  { name: "Node / Express", pct: 70, color: "var(--accent3)" },
  { name: "PostgreSQL", pct: 72, color: "var(--accent2)" },
  { name: "Flutter", pct: 55, color: "var(--accent3)" },
];

function Bar({ name, pct, color, i }: { name: string; pct: number; color: string; i: number; key?: React.Key }) {
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
  const [active, setActive] = useState<keyof typeof skills>("Frontend");

  return (
    <section
      id="skills"
      className="s-pad"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal>
          <div className="section-label" style={{ marginBottom: "16px" }}>03 / skills</div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 800, marginBottom: "48px",
          }}>
            Tech Stack
          </h2>
        </ScrollReveal>

        {/* Category tabs */}
        <ScrollReveal delay={60}>
          <div style={{
            display: "flex", gap: "0",
            marginBottom: "40px",
            borderBottom: "1px solid var(--border)",
            position: "relative",
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: "12px",
                  letterSpacing: "0.06em",
                  padding: "12px 24px",
                  background: "none", border: "none",
                  color: active === cat ? "var(--accent)" : "var(--muted)",
                  cursor: "pointer", position: "relative",
                  transition: "color 0.2s",
                  marginBottom: "-1px",
                  display: "flex", alignItems: "center", gap: "6px",
                }}
              >
                <span style={{ fontSize: "14px", opacity: 0.75 }}>{categoryIcons[cat]}</span>
                {cat}
                {active === cat && (
                  <motion.div
                    layoutId="tab-underline"
                    style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      height: "2px", background: "var(--accent)", borderRadius: "1px",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Skill chips with icons */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "56px" }}>
              {skills[active].map((skill, i) => {
                const Icon = ICON_MAP[skill];
                const glyph = GLYPH_MAP[skill];
                return (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.22 }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "7px",
                      padding: "8px 16px",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontFamily: "var(--font-mono)", fontSize: "12px",
                      color: "var(--text)",
                      background: "var(--card)",
                      cursor: "default",
                      transition: "border-color 0.2s, background 0.2s, color 0.2s",
                    }}
                    whileHover={{
                      borderColor: "var(--accent)",
                      background: "rgba(45,212,191,0.07)",
                      color: "var(--accent)",
                    }}
                  >
                    {Icon
                      ? <span style={{ flexShrink: 0, display: "inline-flex" }}><Icon size={15} /></span>
                      : <span style={{ fontSize: "13px", lineHeight: 1 }}>{glyph ?? "◇"}</span>
                    }
                    {skill}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Proficiency bars (all categories) */}
        <ScrollReveal>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "10px",
            color: "var(--muted)", letterSpacing: "0.2em",
            textTransform: "uppercase", marginBottom: "24px",
          }}>
            Proficiency
          </div>
          <div
            className="skills-bars"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 64px" }}
          >
            {proficiencyBars.map(({ name, pct, color }, i) => (
              <Bar key={name} name={name} pct={pct} color={color} i={i} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
