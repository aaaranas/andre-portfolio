"use client";
import { useState } from "react";
import { projects } from "@/lib/data";

export default function Projects() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section
      id="projects"
      style={{
        padding: "120px 64px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div className="section-label" style={{ marginBottom: "16px" }}>
        02 / projects
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px, 5vw, 60px)",
          fontWeight: 800,
          marginBottom: "8px",
        }}
      >
        Things I&apos;ve Built
      </h2>
      <p
        style={{
          color: "var(--muted)",
          fontSize: "14px",
          marginBottom: "64px",
          fontFamily: "var(--font-mono)",
        }}
      >
        Click any card to see more details.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "20px",
        }}
      >
        {projects.map((proj) => {
          const isHovered = hovered === proj.id;
          const isExpanded = expanded === proj.id;

          return (
            <div
              key={proj.id}
              data-hover
              onClick={() => setExpanded(isExpanded ? null : proj.id)}
              onMouseEnter={() => setHovered(proj.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: isHovered || isExpanded ? "var(--bg3)" : "var(--card)",
                border: `1px solid ${isHovered || isExpanded ? proj.color : "var(--border)"}`,
                borderRadius: "8px",
                padding: "28px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: proj.color,
                  opacity: isHovered || isExpanded ? 1 : 0,
                  transition: "opacity 0.25s",
                }}
              />

              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "24px" }}>{proj.emoji}</span>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "18px",
                        fontWeight: 700,
                        marginBottom: "2px",
                      }}
                    >
                      {proj.name}
                    </h3>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        color: proj.color,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {proj.role}
                    </span>
                  </div>
                </div>

                {/* Highlight badge */}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    padding: "4px 10px",
                    border: `1px solid ${proj.color}33`,
                    borderRadius: "20px",
                    color: proj.color,
                    background: `${proj.color}11`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {proj.highlight}
                </span>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--muted)",
                  marginBottom: "16px",
                  lineHeight: 1.6,
                }}
              >
                {proj.tagline}
              </p>

              {/* Expanded description */}
              <div
                style={{
                  maxHeight: isExpanded ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    color: "var(--text)",
                    lineHeight: 1.8,
                    marginBottom: "16px",
                    paddingTop: "8px",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  {proj.description}
                </p>
              </div>

              {/* Tech stack */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {proj.stack.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Expand indicator */}
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "16px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--muted)",
                  transition: "opacity 0.2s",
                  opacity: isHovered ? 1 : 0,
                }}
              >
                {isExpanded ? "[ collapse ]" : "[ expand ]"}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
