"use client";
import React from "react";
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
          05 / EDUCATION & ACADEMICS
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 4.5vw, 54px)",
            fontWeight: 800,
            marginBottom: "48px",
          }}
        >
          Education
        </h2>
      </ScrollReveal>

      <div style={{ position: "relative" }}>
        {/* Timeline vertical guide line */}
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

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {education.map((edu, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div style={{ paddingLeft: "56px", position: "relative" }}>
                <div
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
                    border: "1px solid var(--border)",
                    borderRadius: "14px",
                    padding: "24px 28px",
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
                      letterSpacing: "0.08em",
                      marginBottom: "6px",
                      fontWeight: 600,
                    }}
                  >
                    {edu.period}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "21px",
                      fontWeight: 700,
                      color: "var(--text)",
                      marginBottom: "4px",
                    }}
                  >
                    {edu.school}
                  </h3>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      marginBottom: "16px",
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
