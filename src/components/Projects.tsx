"use client";
import { useMemo, useState } from "react";
import { projects, projectCategories, type Project } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight, ArrowUpRight, ChevronRight, Globe } from "lucide-react";
import Icon from "./ui/icon";

const FILTERS = ["All", ...projectCategories] as const;
type Filter = (typeof FILTERS)[number];

/* ── live site preview in a fake browser chrome ── */
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
      <div
        style={{
          borderRadius: "var(--r) var(--r) 0 0",
          background: "var(--bg3)",
          border: `1px solid ${color}33`,
          borderBottom: "none",
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div
              key={c}
              style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }}
            />
          ))}
        </div>
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
        <ArrowUpRight aria-hidden style={{ width: "11px", height: "11px", color, opacity: 0.7 }} />
      </div>

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
          // eslint-disable-next-line @next/next/no-img-element
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
            <Globe aria-hidden style={{ width: "28px", height: "28px", color }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}>
              Preview unavailable
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                color: color,
                opacity: 0.7,
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              Click to visit
              <ArrowRight aria-hidden style={{ width: "12px", height: "12px" }} />
            </span>
          </div>
        )}

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
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            Open site
            <ArrowUpRight aria-hidden style={{ width: "12px", height: "12px" }} />
          </span>
        </div>
      </div>

      <style>{`
        a:hover .preview-overlay { opacity: 1 !important; }
      `}</style>
    </a>
  );
}

/* ── stand-in for projects with no deployed URL (e.g. an OS that boots in QEMU) ── */
function TerminalPreview({ project }: { project: Project }) {
  return (
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      style={{ display: "block", textDecoration: "none", marginBottom: "20px" }}
    >
      <div
        style={{
          borderRadius: "var(--r) var(--r) 0 0",
          background: "var(--bg3)",
          border: `1px solid ${project.color}33`,
          borderBottom: "none",
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          color: "var(--muted)",
          letterSpacing: "0.08em",
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div
              key={c}
              style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }}
            />
          ))}
        </div>
        <span style={{ flex: 1 }}>{project.repo}</span>
        <ArrowUpRight aria-hidden style={{ width: "11px", height: "11px", color: project.color, opacity: 0.7 }} />
      </div>

      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          border: `1px solid ${project.color}33`,
          borderRadius: "0 0 6px 6px",
          background: "var(--bg)",
          padding: "18px 20px",
          fontFamily: "var(--font-mono)",
          fontSize: "10.5px",
          lineHeight: 1.9,
          color: "var(--muted)",
          overflow: "hidden",
        }}
      >
        <div>
          <span style={{ color: project.color }}>$</span> make && qemu-system-i386 -kernel dug_os
        </div>
        <div style={{ color: "var(--text)" }}>[  ok  ] GRUB 2 multiboot handoff</div>
        <div style={{ color: "var(--text)" }}>[  ok  ] protected mode · GDT · IDT</div>
        <div style={{ color: "var(--text)" }}>[  ok  ] 8259A PIC remapped to 32–47</div>
        <div style={{ color: "var(--text)" }}>[  ok  ] PS/2 keyboard · FAT mounted</div>
        <div>
          <span style={{ color: project.color }}>dugos&gt;</span> _
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

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
            fontWeight: 600,
            marginBottom: "8px",
          }}
        >
          Things I&apos;ve Built
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "14px",
            marginBottom: "28px",
            fontFamily: "var(--font-mono)",
            lineHeight: 1.7,
          }}
        >
          Every project here is a public repository on{" "}
          <a
            href="https://github.com/aaaranas"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)" }}
          >
            github.com/aaaranas
          </a>
          . Click a card to expand it — previews link to the deployed site.
        </p>
      </ScrollReveal>

      {/* ── category filter ── */}
      <ScrollReveal delay={60}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "48px",
          }}
        >
          {FILTERS.map((f) => {
            const active = filter === f;
            const count = f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
            return (
              <button
                key={f}
                data-hover
                onClick={() => setFilter(f)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  padding: "7px 14px",
                  borderRadius: "var(--r)",
                  cursor: "pointer",
                  border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                  background: active ? "var(--accent-soft)" : "transparent",
                  color: active ? "var(--accent)" : "var(--muted)",
                  transition: "all 0.2s ease",
                }}
              >
                {f.toLowerCase()}{" "}
                <span style={{ opacity: 0.55 }}>{count}</span>
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {visible.map((proj, i) => {
          const isHovered = hovered === proj.id;
          const isExpanded = expanded === proj.id;

          return (
            <ScrollReveal key={proj.id} delay={i * 60}>
              <div
                data-hover
                onClick={() => setExpanded(isExpanded ? null : proj.id)}
                style={{
                  background: isHovered || isExpanded ? "var(--bg3)" : "var(--card)",
                  border: `1px solid ${isHovered || isExpanded ? proj.color : "var(--border)"}`,
                  borderRadius: "var(--r)",
                  padding: "24px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                }}
                onMouseEnter={() => setHovered(proj.id)}
                onMouseLeave={() => setHovered(null)}
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

                {proj.live ? (
                  <BrowserPreview url={proj.live} color={proj.color} name={proj.name} />
                ) : (
                  <TerminalPreview project={proj} />
                )}

                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "14px",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <Icon name={proj.icon} size={24} style={{ color: proj.color }} />
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
                        {proj.role} · {proj.category}
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      padding: "4px 10px",
                      border: `1px solid ${proj.color}33`,
                      borderRadius: "var(--r)",
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

                {/* Metrics — always visible, they carry the substance */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  {proj.metrics.map((m) => (
                    <li
                      key={m}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--text)",
                        lineHeight: 1.6,
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <ChevronRight aria-hidden style={{ width: "13px", height: "13px", color: proj.color, flexShrink: 0, marginTop: "3px" }} />
                      {m}
                    </li>
                  ))}
                </ul>

                {/* Expanded description — grid trick so any length animates cleanly */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isExpanded ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.35s ease",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        color: "var(--text)",
                        lineHeight: 1.85,
                        margin: "0 0 16px",
                        paddingTop: "12px",
                        borderTop: "1px solid var(--border)",
                      }}
                    >
                      {proj.description}
                    </p>
                  </div>
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
                  {[
                    { label: "GitHub", href: proj.github },
                    { label: "Live", href: proj.live },
                  ]
                    .filter((l) => l.href)
                    .map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
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
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = `${proj.color}18`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                        }}
                      >
                        {l.label}
                        <ArrowUpRight aria-hidden style={{ width: "11px", height: "11px" }} />
                      </a>
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
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
