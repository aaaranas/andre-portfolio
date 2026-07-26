"use client";
import { experience } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

type ExpEntry = (typeof experience)[0];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="s-pad"
      style={{ maxWidth: "1200px", margin: "0 auto" }}
    >
      <ScrollReveal>
        <div className="section-label" style={{ marginBottom: "16px" }}>
          04 / work experience
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 600,
            marginBottom: "64px",
          }}
        >
          Work Experience
        </h2>
      </ScrollReveal>

      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: "16px",
            top: "8px",
            bottom: "8px",
            width: "1px",
            background: "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {experience.map((exp: ExpEntry, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div style={{ paddingLeft: "56px", position: "relative" }}>
                <div
                  className={i === 0 ? "pulse" : ""}
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "8px",
                    width: "13px",
                    height: "13px",
                    background: i === 0 ? "var(--accent)" : "var(--bg3)",
                    border: "2px solid var(--accent)",
                    borderRadius: "50%",
                  }}
                />

                <div
                  className="card-glow"
                  style={{
                    background: "var(--card)",
                    border: `1px solid ${i === 0 ? "var(--accent)" : "var(--border)"}`,
                    borderRadius: "var(--r)",
                    padding: "24px 28px",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = i === 0 ? "var(--accent)" : "var(--border)";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                    <div>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          color: i === 0 ? "var(--ok)" : "var(--muted)",
                          letterSpacing: "0.08em",
                          marginBottom: "4px",
                        }}
                      >
                        {i === 0 && (
                          <span
                            style={{
                              width: "6px", height: "6px",
                              borderRadius: "50%",
                              background: "var(--ok)",
                              display: "inline-block",
                              boxShadow: "0 0 6px var(--ok)",
                            }}
                          />
                        )}
                        {exp.period}
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "21px",
                          fontWeight: 700,
                          color: "var(--text)",
                          marginBottom: "2px",
                        }}
                      >
                        {exp.role}
                      </h3>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--accent)", fontWeight: 600 }}>
                        {exp.company}
                      </p>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        padding: "3px 10px",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--r)",
                        color: "var(--muted)",
                        background: "var(--bg3)",
                        letterSpacing: "0.08em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>

                  <ul style={{ paddingLeft: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "0" }}>
                    {exp.highlights.map((h, j) => (
                      <li
                        key={j}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "12px",
                          color: "var(--muted)",
                          lineHeight: 1.7,
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <span style={{ color: "var(--accent)", flexShrink: 0 }}>→</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
