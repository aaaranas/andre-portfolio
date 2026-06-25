"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

const vercelProjects = projects.filter((p) => p.live !== "");
const clientIds = new Set(["7gb-construction", "myle-photography"]);

type Filter = "all" | "deployed" | "client";
const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "deployed", label: "Personal" },
  { key: "client", label: "Client Work" },
];

type Project = (typeof projects)[0];

/* ── Browser chrome preview ── */
function BrowserPreview({ url, color, name, compact }: { url: string; color: string; name: string; compact?: boolean }) {
  const screenshotUrl = `https://image.thum.io/get/width/900/crop/506/noanimate/allowJPG/${url}`;
  const [imgError, setImgError] = useState(false);

  return (
    <div style={{ marginBottom: compact ? "0" : "20px" }}>
      {/* Chrome bar */}
      <div style={{
        borderRadius: compact ? "6px 6px 0 0" : "8px 8px 0 0",
        background: "var(--bg3)",
        border: `1px solid ${color}30`,
        borderBottom: "none",
        padding: "7px 10px",
        display: "flex", alignItems: "center", gap: "8px",
      }}>
        <div style={{ display: "flex", gap: "4px" }}>
          {["#ff5f57","#febc2e","#28c840"].map((c) => (
            <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1, background: "var(--bg)",
          borderRadius: "4px", padding: "2px 8px",
          fontFamily: "var(--font-mono)", fontSize: "9px",
          color: "var(--muted)", overflow: "hidden",
          textOverflow: "ellipsis", whiteSpace: "nowrap",
          border: "1px solid var(--border)",
        }}>
          {url.replace("https://", "")}
        </div>
        <a
          href={url} target="_blank" rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{ fontSize: "10px", color: color, opacity: 0.8, flexShrink: 0 }}
        >↗</a>
      </div>
      {/* Screenshot */}
      <div style={{
        position: "relative", width: "100%",
        aspectRatio: compact ? "16/9" : "16/9",
        overflow: "hidden",
        border: `1px solid ${color}30`,
        borderRadius: "0 0 6px 6px",
        background: "var(--bg)",
      }}>
        {!imgError ? (
          <img
            src={screenshotUrl}
            alt={`${name} preview`}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: "8px", color: "var(--muted)",
          }}>
            <span style={{ fontSize: "28px" }}>🌐</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}>Preview unavailable</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Project detail modal ── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-box"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{ borderTop: `3px solid ${project.color}` }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: "16px", right: "16px",
              width: "32px", height: "32px",
              borderRadius: "50%",
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              color: "var(--muted)",
              cursor: "pointer", zIndex: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", lineHeight: 1,
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--text)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--muted)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            }}
          >
            ×
          </button>

          <div style={{ padding: "32px" }}>
            {/* Browser preview */}
            <div style={{ marginBottom: "28px" }}>
              <BrowserPreview url={project.live} color={project.color} name={project.name} />
            </div>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "36px" }}>{project.emoji}</span>
              <div style={{ flex: 1 }}>
                <h2 style={{
                  fontFamily: "var(--font-display)", fontSize: "32px",
                  fontWeight: 800, marginBottom: "4px",
                }}>
                  {project.name}
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: project.color }}>
                    {project.role}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "10px",
                    padding: "3px 10px",
                    border: `1px solid ${project.color}40`,
                    borderRadius: "999px",
                    color: project.color,
                    background: `${project.color}10`,
                  }}>
                    {project.highlight}
                  </span>
                </div>
              </div>
            </div>

            {/* Tagline */}
            <p style={{
              fontFamily: "var(--font-display)", fontSize: "18px",
              fontStyle: "italic", color: "var(--muted)",
              marginBottom: "20px", lineHeight: 1.5,
            }}>
              {project.tagline}
            </p>

            {/* Description */}
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "14px",
              color: "var(--text)", lineHeight: 1.85,
              marginBottom: "28px",
              paddingTop: "20px",
              borderTop: "1px solid var(--border)",
            }}>
              {project.description}
            </p>

            {/* Tech stack */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "10px",
                color: "var(--muted)", letterSpacing: "0.15em",
                textTransform: "uppercase", marginBottom: "12px",
              }}>
                Tech Stack
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {project.stack.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {project.github && (
                <a
                  href={project.github} target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: "12px",
                    letterSpacing: "0.06em", padding: "10px 24px",
                    border: `1px solid ${project.color}55`,
                    borderRadius: "8px", color: project.color,
                    transition: "background 0.2s, transform 0.2s",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${project.color}14`;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  GitHub ↗
                </a>
              )}
              {project.live && (
                <a
                  href={project.live} target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: "12px",
                    letterSpacing: "0.06em", padding: "10px 24px",
                    background: project.color,
                    color: "#0d1117", borderRadius: "8px",
                    fontWeight: 700,
                    transition: "opacity 0.2s, transform 0.2s",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "0.85";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  Open Live Site ↗
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Main component ── */
export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [modal, setModal] = useState<Project | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = vercelProjects.filter((p) => {
    if (filter === "client") return clientIds.has(p.id);
    if (filter === "deployed") return !clientIds.has(p.id);
    return true;
  });

  return (
    <>
      <section id="projects" className="s-pad" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal>
          <div className="section-label" style={{ marginBottom: "16px" }}>
            02 / projects
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 800, marginBottom: "8px",
          }}>
            Things I&apos;ve Built
          </h2>
          <p style={{
            color: "var(--muted)", fontSize: "14px",
            marginBottom: "32px", fontFamily: "var(--font-mono)",
          }}>
            Click any card to open full details & live preview.
          </p>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "48px" }}>
            {filters.map(({ key, label }) => {
              const count =
                key === "all" ? vercelProjects.length
                : key === "client" ? vercelProjects.filter((p) => clientIds.has(p.id)).length
                : vercelProjects.filter((p) => !clientIds.has(p.id)).length;
              return (
                <button key={key} className={`filter-tab${filter === key ? " active" : ""}`} onClick={() => setFilter(key)}>
                  {label}
                  <span style={{ marginLeft: "6px", opacity: 0.65, fontSize: "10px" }}>{count}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "20px",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((proj, i) => {
              const isHovered = hovered === proj.id;
              return (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                >
                  <ScrollReveal delay={i * 50}>
                    <div
                      data-hover
                      onClick={() => setModal(proj)}
                      onMouseEnter={() => setHovered(proj.id)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        background: isHovered ? "var(--bg3)" : "var(--card)",
                        border: `1px solid ${isHovered ? proj.color + "80" : "var(--border)"}`,
                        borderRadius: "12px",
                        padding: "20px",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
                        boxShadow: isHovered ? `0 16px 48px ${proj.color}18` : "none",
                        position: "relative", overflow: "hidden",
                      }}
                    >
                      {/* Color accent top line */}
                      <div style={{
                        position: "absolute", top: 0, left: 0, right: 0,
                        height: "2px",
                        background: `linear-gradient(90deg, ${proj.color}, transparent)`,
                        opacity: isHovered ? 1 : 0.4,
                        transition: "opacity 0.25s",
                      }} />

                      {/* Mini preview */}
                      <BrowserPreview url={proj.live} color={proj.color} name={proj.name} compact />

                      {/* Card info */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", marginTop: "16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontSize: "20px" }}>{proj.emoji}</span>
                          <div>
                            <h3 style={{
                              fontFamily: "var(--font-display)", fontSize: "17px",
                              fontWeight: 700, marginBottom: "1px",
                            }}>
                              {proj.name}
                            </h3>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: proj.color, letterSpacing: "0.06em" }}>
                              {proj.role}
                            </span>
                          </div>
                        </div>
                        <span style={{
                          fontFamily: "var(--font-mono)", fontSize: "9px",
                          padding: "3px 9px",
                          border: `1px solid ${proj.color}35`,
                          borderRadius: "999px",
                          color: proj.color, background: `${proj.color}0e`,
                          whiteSpace: "nowrap",
                        }}>
                          {proj.highlight}
                        </span>
                      </div>

                      <p style={{
                        fontFamily: "var(--font-body)", fontSize: "13px",
                        color: "var(--muted)", lineHeight: 1.6, marginBottom: "14px",
                      }}>
                        {proj.tagline}
                      </p>

                      {/* Stack tags - show first 4 */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
                        {proj.stack.slice(0, 4).map((t) => (
                          <span key={t} className="tag">{t}</span>
                        ))}
                        {proj.stack.length > 4 && (
                          <span className="tag">+{proj.stack.length - 4}</span>
                        )}
                      </div>

                      {/* Hover CTA */}
                      <div style={{
                        fontFamily: "var(--font-mono)", fontSize: "10px",
                        color: "var(--accent)", opacity: isHovered ? 1 : 0,
                        transition: "opacity 0.2s",
                        letterSpacing: "0.06em",
                      }}>
                        Click to view details →
                      </div>
                    </div>
                  </ScrollReveal>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </>
  );
}
