"use client";
import { education, experience } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function Education() {
  return (
    <section
      id="education"
      className="s-pad"
      style={{ maxWidth: "1200px", margin: "0 auto" }}
    >
      <ScrollReveal>
        <div className="section-label" style={{ marginBottom: "16px" }}>
          04 / experience &amp; education
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 800,
            marginBottom: "64px",
          }}
        >
          Where I&apos;ve Been
        </h2>
      </ScrollReveal>

      <div style={{ position: "relative" }}>
        {/* Timeline line */}
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

        <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>

          {/* Experience entries */}
          {experience.map((exp, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div style={{ paddingLeft: "56px", position: "relative" }}>
                {/* Pulsing dot for current */}
                <div
                  className="pulse"
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "6px",
                    width: "13px",
                    height: "13px",
                    background: "var(--accent)",
                    border: "2px solid var(--accent)",
                    borderRadius: "50%",
                  }}
                />

                <div
                  className="card-glow"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--accent)",
                    borderRadius: "10px",
                    padding: "28px 32px",
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
                          fontSize: "10px",
                          color: "#4ade80",
                          letterSpacing: "0.12em",
                          marginBottom: "6px",
                        }}
                      >
                        <span
                          style={{
                            width: "6px", height: "6px",
                            borderRadius: "50%",
                            background: "#4ade80",
                            display: "inline-block",
                            boxShadow: "0 0 6px #4ade80",
                          }}
                        />
                        {exp.period}
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "22px",
                          fontWeight: 700,
                          marginBottom: "4px",
                        }}
                      >
                        {exp.role}
                      </h3>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--accent)" }}>
                        {exp.company}
                      </p>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        padding: "4px 12px",
                        border: "1px solid var(--accent)",
                        borderRadius: "999px",
                        color: "var(--accent)",
                        background: "rgba(45,212,191,0.08)",
                        letterSpacing: "0.08em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Current
                    </span>
                  </div>
                  <ul style={{ paddingLeft: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
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

          {/* Education entries */}
          {education.map((edu, i) => (
            <ScrollReveal key={i} delay={(i + experience.length) * 80}>
              <div style={{ paddingLeft: "56px", position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "6px",
                    width: "13px",
                    height: "13px",
                    background: i === 0 ? "var(--bg3)" : "var(--bg)",
                    border: "2px solid var(--accent)",
                    borderRadius: "50%",
                  }}
                />

                <div
                  className="card-glow"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "28px 32px",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--accent)",
                      letterSpacing: "0.1em",
                      marginBottom: "8px",
                    }}
                  >
                    {edu.period}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "22px",
                      fontWeight: 700,
                      marginBottom: "6px",
                    }}
                  >
                    {edu.school}
                  </h3>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      marginBottom: "20px",
                    }}
                  >
                    {edu.degree}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {edu.courses.map((c) => (
                      <span key={c} className="tag">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}

        </div>
      </div>
    </section>
  );
}
