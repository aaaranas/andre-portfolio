"use client";
import { useState } from "react";
import { skills } from "@/lib/data";

const categories = Object.keys(skills) as Array<keyof typeof skills>;

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
        <div className="section-label" style={{ marginBottom: "16px" }}>
          06 / skills
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 800,
            marginBottom: "48px",
          }}
        >
          Tech Stack
        </h2>

        {/* Category tabs */}
        <div
          style={{
            display: "flex",
            gap: "0",
            marginBottom: "48px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              data-hover
              onClick={() => setActive(cat)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "0.08em",
                padding: "12px 24px",
                background: "none",
                border: "none",
                color: active === cat ? "var(--accent)" : "var(--muted)",
                borderBottom: active === cat ? "2px solid var(--accent)" : "2px solid transparent",
                cursor: "pointer",
                transition: "color 0.2s",
                marginBottom: "-1px",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {skills[active].map((skill, i) => (
            <div
              key={skill}
              data-hover
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                padding: "10px 20px",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                color: "var(--text)",
                background: "var(--card)",
                cursor: "default",
                transition: "all 0.2s ease",
                animationDelay: `${i * 0.04}s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--accent)";
                el.style.color = "var(--accent)";
                el.style.background = "rgba(127,255,111,0.05)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.color = "var(--text)";
                el.style.background = "var(--card)";
                el.style.transform = "translateY(0)";
              }}
            >
              {skill}
            </div>
          ))}
        </div>

        {/* Visual skill bars for frontend */}
        {active === "Frontend" && (
          <div
            className="skills-bars"
          style={{
              marginTop: "64px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px 64px",
            }}
          >
            {[
              { name: "React / Next.js", pct: 90 },
              { name: "TypeScript", pct: 80 },
              { name: "Tailwind CSS", pct: 90 },
              { name: "Node / Express", pct: 70 },
              { name: "PostgreSQL", pct: 72 },
              { name: "Flutter", pct: 55 },
            ].map(({ name, pct }) => (
              <div key={name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    color: "var(--muted)",
                  }}
                >
                  <span>{name}</span>
                  <span style={{ color: "var(--accent)" }}>{pct}%</span>
                </div>
                <div
                  style={{
                    height: "3px",
                    background: "var(--border)",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, var(--accent), var(--accent2))`,
                      borderRadius: "2px",
                      transition: "width 1s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
