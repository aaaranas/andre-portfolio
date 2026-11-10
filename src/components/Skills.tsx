"use client";
import { useState } from "react";
import { skills } from "@/lib/data/skills";

const categories = Object.keys(skills) as Array<keyof typeof skills>;

export default function SkillsBlock() {
  const [active, setActive] = useState<keyof typeof skills>("Frontend");

  return (
    <>
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
                el.style.background = "var(--accent-soft)";
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

    </>
  );
}
