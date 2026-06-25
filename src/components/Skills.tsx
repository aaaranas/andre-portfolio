"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

const categories = Object.keys(skills) as Array<keyof typeof skills>;

const categoryIcons: Record<string, string> = {
  "Frontend": "⬡",
  "Backend & APIs": "⚙",
  "Tools": "◈",
};

const bars = [
  { name: "React / Next.js", pct: 90 },
  { name: "TypeScript", pct: 80 },
  { name: "Tailwind CSS", pct: 90 },
  { name: "Node / Express", pct: 70 },
  { name: "PostgreSQL", pct: 72 },
  { name: "Flutter", pct: 55 },
];

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
          <div className="section-label" style={{ marginBottom: "16px" }}>
            03 / skills
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 800, marginBottom: "48px",
          }}>
            Tech Stack
          </h2>
        </ScrollReveal>

        {/* Tab buttons */}
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
                data-hover
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

        {/* Animated skill chips */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "56px" }}>
              {skills[active].map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.035, duration: 0.2 }}
                  className="skill-chip"
                  data-hover
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Proficiency bars (Frontend only) */}
        <AnimatePresence>
          {active === "Frontend" && (
            <motion.div
              key="bars"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
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
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px 64px",
                  }}
                >
                  {bars.map(({ name, pct }, i) => (
                    <ScrollReveal key={name} delay={i * 60}>
                      <div>
                        <div style={{
                          display: "flex", justifyContent: "space-between",
                          marginBottom: "8px",
                          fontFamily: "var(--font-mono)", fontSize: "12px",
                          color: "var(--muted)",
                        }}>
                          <span>{name}</span>
                          <span style={{ color: "var(--accent)" }}>{pct}%</span>
                        </div>
                        <div style={{
                          height: "4px", background: "var(--border)",
                          borderRadius: "2px", overflow: "hidden",
                        }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                            style={{
                              height: "100%",
                              background: `linear-gradient(90deg, var(--accent), var(--accent2))`,
                              borderRadius: "2px",
                            }}
                          />
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
