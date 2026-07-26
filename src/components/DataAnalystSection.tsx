"use client";
import React, { useState } from "react";
import { dataAnalystProjects } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import { BarChart3, X, FileText } from "lucide-react";

type Project = (typeof dataAnalystProjects)[0];
type Cell = { type: string; content?: string; code?: string; output?: string };

function NotebookViewer({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "860px", padding: "0", overflow: "hidden" }}
      >
        <div style={{ background: "var(--bg3)", borderBottom: "1px solid var(--border)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FileText style={{ width: "18px", height: "18px", color: "var(--accent2)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text)", fontWeight: 600 }}>{project.notebook.title}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted)" }}>
              Kernel: {project.notebook.kernel} · Last run: {project.notebook.lastRun}
            </span>
            <button
              onClick={onClose}
              style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text)", width: "30px", height: "30px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <X style={{ width: "14px", height: "14px" }} />
            </button>
          </div>
        </div>
        <div style={{ padding: "24px", maxHeight: "70vh", overflowY: "auto" }}>
          {project.notebook.cells.map((cell: Cell, i: number) => (
            <div key={i} style={{ marginBottom: "16px" }}>
              {cell.type === "markdown" ? (
                <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "16px 20px", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                  {cell.content}
                </div>
              ) : (
                <div>
                  <div style={{ background: "#0d1117", border: "1px solid var(--border)", borderRadius: "var(--r) var(--r) 0 0", padding: "14px 18px" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#79c0ff", whiteSpace: "pre", overflowX: "auto" }}>{cell.code}</div>
                  </div>
                  {cell.output && (
                    <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderTop: "none", borderRadius: "0 0 var(--r) var(--r)", padding: "10px 18px" }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ok)", whiteSpace: "pre" }}>{cell.output}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DataAnalystSection() {
  const [activeNotebook, setActiveNotebook] = useState<Project | null>(null);

  return (
    <section id="data-analyst" className="s-pad" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ marginBottom: "48px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--accent2)", fontFamily: "var(--font-mono)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "12px" }}>
              <BarChart3 style={{ width: "16px", height: "16px" }} /> Data Analyst Track
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 600, color: "var(--text)", marginBottom: "12px" }}>
              Data Projects & Analysis
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: "600px", fontSize: "14px", lineHeight: 1.7, fontFamily: "var(--font-mono)" }}>
              Python-based spatial analysis, cohort modeling, and exploratory data science — with interactive Jupyter notebooks.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
          {dataAnalystProjects.map((proj, idx) => (
            <ScrollReveal key={proj.id} delay={idx * 80}>
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r)",
                  padding: "28px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "var(--accent2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <div>
                  <div style={{ fontSize: "28px", marginBottom: "14px" }}>{proj.emoji}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "19px", fontWeight: 700, color: "var(--text)", lineHeight: 1.3, marginBottom: "8px" }}>
                    {proj.name}
                  </h3>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent2)", marginBottom: "12px" }}>
                    {proj.tagline}
                  </p>
                  <p style={{ color: "var(--muted)", fontSize: "13px", lineHeight: 1.6, marginBottom: "16px" }}>
                    {proj.summary}
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
                    {proj.keyMetrics.map((m) => (
                      <div key={m.label} style={{ background: "var(--bg3)", borderRadius: "var(--r)", padding: "10px 12px" }}>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "16px", fontWeight: 700, color: "var(--accent2)" }}>{m.value}</div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--muted)", marginTop: "2px" }}>{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                    {proj.tools.map((t) => (
                      <span key={t} className="tag" style={{ borderColor: "var(--border)", color: "var(--accent2)" }}>{t}</span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setActiveNotebook(proj)}
                  style={{
                    width: "100%",
                    background: "var(--accent2-soft)",
                    border: "1px solid var(--accent2)",
                    color: "var(--accent2)",
                    padding: "10px 14px",
                    borderRadius: "var(--r)",
                    fontSize: "12px",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent2-soft)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent2-soft)"; }}
                >
                  <FileText style={{ width: "15px", height: "15px" }} />
                  View Jupyter Notebook
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {activeNotebook && (
        <NotebookViewer project={activeNotebook} onClose={() => setActiveNotebook(null)} />
      )}
    </section>
  );
}
