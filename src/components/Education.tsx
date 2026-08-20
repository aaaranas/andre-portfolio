"use client";
import { education } from "@/lib/data";
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
          05 / education
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 600,
            marginBottom: "64px",
          }}
        >
          Education
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
          {education.map((edu, i) => (
            <ScrollReveal key={i} delay={i * 80}>
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
                    borderRadius: "var(--r)",
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
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent)", letterSpacing: "0.1em", marginBottom: "8px" }}>
                    {edu.period}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 700, marginBottom: "6px" }}>
                    {edu.school}
                  </h3>
                  <p style={{ color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: "13px", marginBottom: edu.courses.length > 0 ? "20px" : "0" }}>
                    {edu.degree}
                  </p>
                  {edu.courses.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {edu.courses.map((c) => (
                        <span key={c} className="tag">{c}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
