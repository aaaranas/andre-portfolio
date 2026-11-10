"use client";
import { useCallback, useState } from "react";
import Image from "next/image";
import { PREVIEWS } from "@/lib/previews";
import { projects, type Project } from "@/lib/data/projects";
import ScrollReveal from "./ScrollReveal";
import Mark, { Numeral } from "./ui/mark";

/* ── live site preview in a fake browser chrome ── */
function BrowserPreview({ project }: { project: Project }) {
  const { id, live: url, name } = project;
  /**
   * Three stages, tried in order:
   *   local  — our own capture, if the manifest says one exists. Asking the
   *            manifest first means an uncaptured project costs no request;
   *            probing for the file used to 404 once per card on every load.
   *   remote — the hosted screenshot service, as a stand-in until captured.
   *   none   — a plain card.
   */
  const local = PREVIEWS[id];
  const [stage, setStage] = useState<"local" | "remote" | "none">(local ? "local" : "remote");
  const imgError = stage === "none";
  const remoteSrc = `https://image.thum.io/get/width/800/crop/450/noanimate/allowJPG/${url}`;

  /**
   * The server renders the remote <img>, so the browser can finish failing it
   * before React hydrates and an onError handler exists to hear it. The ref
   * runs on commit and catches that already-broken case.
   */
  const checkLoaded = useCallback((el: HTMLImageElement | null) => {
    if (el && el.complete && el.naturalWidth === 0) setStage("none");
  }, []);

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
          border: "1px solid var(--border)",
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
        <Mark name="external" size={11} color="var(--accent)" style={{ opacity: 0.7 }} />
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
          border: "1px solid var(--border)",
          borderRadius: "0 0 6px 6px",
          background: "var(--bg)",
        }}
      >
        {stage === "local" && local ? (
          <Image
            src={local.src}
            width={local.width}
            height={local.height}
            alt={`${name} home page`}
            sizes="(max-width: 820px) 100vw, 420px"
            onError={() => setStage("remote")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
            }}
          />
        ) : !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={checkLoaded}
            src={remoteSrc}
            alt={`${name} home page`}
            loading="lazy"
            decoding="async"
            onError={() => setStage("none")}
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
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.08em" }}>
              Preview unavailable
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                color: "var(--accent)",
                opacity: 0.7,
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              Click to visit
              <Mark name="arrow" size={12} />
            </span>
          </div>
        )}

        <div
          className="preview-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--accent-soft)",
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
              color: "var(--accent)",
              background: "var(--bg)",
              padding: "6px 14px",
              borderRadius: "4px",
              border: "1px solid var(--accent)",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            Open site
            <Mark name="external" size={12} />
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
          border: "1px solid var(--border)",
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
        <Mark name="external" size={11} color="var(--accent)" style={{ opacity: 0.7 }} />
      </div>

      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          border: "1px solid var(--border)",
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
          <span style={{ color: "var(--accent)" }}>$</span> make && qemu-system-i386 -kernel dug_os
        </div>
        <div style={{ color: "var(--text)" }}>[  ok  ] GRUB 2 multiboot handoff</div>
        <div style={{ color: "var(--text)" }}>[  ok  ] protected mode · GDT · IDT</div>
        <div style={{ color: "var(--text)" }}>[  ok  ] 8259A PIC remapped to 32–47</div>
        <div style={{ color: "var(--text)" }}>[  ok  ] PS/2 keyboard · FAT mounted</div>
        <div>
          <span style={{ color: "var(--accent)" }}>dugos&gt;</span> _
        </div>
      </div>
    </a>
  );
}

export default function ProjectsGrid() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {projects.map((proj, i) => {
          const isHovered = hovered === proj.id;
          const isExpanded = expanded === proj.id;

          return (
            <ScrollReveal key={proj.id} delay={i * 60}>
              <div
                data-hover
                onClick={() => setExpanded(isExpanded ? null : proj.id)}
                style={{
                  background: isHovered || isExpanded ? "var(--bg3)" : "var(--card)",
                  border: `1px solid ${isHovered || isExpanded ? "var(--accent)" : "var(--border)"}`,
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
                    background: "var(--accent)",
                    opacity: isHovered || isExpanded ? 1 : 0,
                    transition: "opacity 0.25s",
                  }}
                />

                {proj.live ? (
                  <BrowserPreview project={proj} />
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
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <Numeral n={i + 1} color="var(--accent)" size={14} style={{ marginTop: "3px" }} />
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
                          color: "var(--accent)",
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
                      border: "1px solid var(--border)",
                      borderRadius: "var(--r)",
                      color: "var(--accent)",
                      background: "var(--accent-soft)",
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
                      <Mark name="chevron" size={13} color="var(--accent)" style={{ marginTop: "1px" }} />
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
                          border: "1px solid var(--accent)",
                          borderRadius: "3px",
                          color: "var(--accent)",
                          transition: "background 0.2s",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "var(--accent-soft)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                        }}
                      >
                        {l.label}
                        <Mark name="external" size={11} />
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
  );
}
