"use client";
import { useState } from "react";
import { projects } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

const vercelProjects = projects.filter((p) => p.live !== "");

function BrowserPreview({ url, color, name }: { url: string; color: string; name: string }) {
  const screenshotUrl = `https://image.thum.io/get/width/800/crop/450/noanimate/allowJPG/${url}`;
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      style={{ display: "block", textDecoration: "none", marginBottom: "20px" }}
    >
      {/* Browser chrome */}
      <div
        style={{
          borderRadius: "8px 8px 0 0",
          background: "var(--bg3)",
          border: `1px solid ${color}33`,
          borderBottom: "none",
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: "5px" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div
              key={c}
              style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }}
            />
          ))}
        </div>
        {/* URL bar */}
        <div
          style={{
            flex: 1,
            background: "var(--bg)",
            borderRadius: "4px",
            padding: "3px 10px",
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            color: "var(--muted)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            border: "1px solid var(--border)",
          }}
        >
          {url.replace("https://", "")}
        </div>
        {/* External link icon */}
        <span style={{ fontSize: "10px", color: color, opacity: 0.7 }}>↗</span>
      </div>

      {/* Screenshot viewport */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
          border: `1px solid ${color}33`,
          borderRadius: "0 0 6px 6px",
          background: "var(--bg)",
        }}
      >
        {!imgError ? (
          <img
            src={screenshotUrl}
            alt={`${name} preview`}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: "var(--muted)",
            }}
          >
            <span style={{ fontSize: "28px" }}>🌐</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}>
              Preview unavailable
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                color: color,
                opacity: 0.7,
              }}
            >
              Click to visit →
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="preview-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: `${color}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.2s",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: color,
              background: "var(--bg)",
              padding: "6px 14px",
              borderRadius: "4px",
              border: `1px solid ${color}55`,
            }}
          >
            Open site ↗
          </span>
        </div>
      </div>

      <style>{`
        a:hover .preview-overlay { opacity: 1 !important; }
      `}</style>
    </a>
  );
}

export default function Projects() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section
      id="projects"
      className="s-pad"
      style={{ maxWidth: "1200px", margin: "0 auto" }}
    >
      <ScrollReveal>
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
          Click any card to see more details. Live previews link to deployed sites.
        </p>
      </ScrollReveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "24px",
        }}
      >
        {vercelProjects.map((proj, i) => {
          const isHovered = hovered === proj.id;
          const isExpanded = expanded === proj.id;

          return (
            <ScrollReveal key={proj.id} delay={i * 60}>
              <div
                data-hover
                onClick={() => setExpanded(isExpanded ? null : proj.id)}
                onMouseEnter={() => setHovered(proj.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHovered || isExpanded ? "var(--bg3)" : "var(--card)",
                  border: `1px solid ${isHovered || isExpanded ? proj.color : "var(--border)"}`,
                  borderRadius: "10px",
                  padding: "24px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
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

                {/* Live site preview */}
                <BrowserPreview url={proj.live} color={proj.color} name={proj.name} />

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
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                  {proj.stack.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div
                  style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        letterSpacing: "0.06em",
                        padding: "5px 12px",
                        border: `1px solid ${proj.color}55`,
                        borderRadius: "3px",
                        color: proj.color,
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = `${proj.color}18`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      GitHub ↗
                    </a>
                  )}
                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        letterSpacing: "0.06em",
                        padding: "5px 12px",
                        border: `1px solid ${proj.color}55`,
                        borderRadius: "3px",
                        color: proj.color,
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = `${proj.color}18`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      Live ↗
                    </a>
                  )}
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
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
