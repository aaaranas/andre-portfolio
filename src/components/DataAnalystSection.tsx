"use client";
import React, { useState } from "react";
import { dataAnalystProjects } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import { BarChart3, TrendingUp, PieChart, Layers, BookOpen, Globe, Github, ExternalLink, X, FileText, FileCode2 } from "lucide-react";

function getAnalystIcon(id: string) {
  const iconProps = { style: { width: "24px", height: "24px", color: "var(--accent)" } };
  switch (id) {
    case "lahug-flood-gis-mcda":
      return <Layers {...iconProps} />;
    case "cebu-transit-analysis":
    case "cebu-transit-eda":
      return <TrendingUp {...iconProps} />;
    case "ecommerce-customer-churn":
    case "customer-retention-cohort":
      return <PieChart {...iconProps} />;
    default:
      return <BarChart3 {...iconProps} />;
  }
}

export default function DataAnalystSection() {
  const [activeNotebook, setActiveNotebook] = useState<typeof dataAnalystProjects[0] | null>(null);
  const [activeDemoModal, setActiveDemoModal] = useState<typeof dataAnalystProjects[0] | null>(null);

  return (
    <section id="data-analyst" className="s-pad" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ marginBottom: "40px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
              <BarChart3 style={{ width: "16px", height: "16px" }} /> Analytics & Insights
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "var(--text)", marginBottom: "12px" }}>
              Data Analyst Portfolio
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: "680px", fontSize: "15px", lineHeight: 1.6 }}>
              Exploratory Data Analysis (EDA), spatial analytics, retention modeling, and predictive reporting built using Python, Pandas, SQL, and interactive dashboards.
            </p>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "28px" }}>
          {dataAnalystProjects.map((proj, idx) => (
            <ScrollReveal key={proj.id} delay={idx * 0.1}>
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  justify: "space-between",
                  height: "100%",
                  transition: "transform 0.2s, border-color 0.2s",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <div style={{ background: "rgba(45, 212, 191, 0.1)", padding: "10px", borderRadius: "12px", display: "inline-flex" }}>
                      {getAnalystIcon(proj.id)}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 700, color: "var(--text)", lineHeight: 1.25 }}>
                        {proj.name}
                      </h3>
                      <p style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--accent)", marginTop: "2px" }}>
                        {proj.tagline}
                      </p>
                    </div>
                  </div>

                  <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
                    {proj.summary}
                  </p>

                  {/* Key Metrics Banner */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px", background: "var(--bg3)", padding: "16px", borderRadius: "12px", marginBottom: "16px", border: "1px solid var(--border)" }}>
                    {proj.keyMetrics.map((m) => (
                      <div key={m.label}>
                        <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>{m.label}</div>
                        <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text)", marginTop: "2px" }}>{m.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Data Formats (if available) */}
                  {proj.dataFormats && proj.dataFormats.length > 0 && (
                    <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "12px 14px", borderRadius: "10px", border: "1px solid var(--border)", marginBottom: "16px" }}>
                      <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--accent)", fontWeight: 600, marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <FileCode2 style={{ width: "13px", height: "13px" }} /> Data Formats & Layers:
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {proj.dataFormats.map((df) => (
                          <div key={df} style={{ fontSize: "12px", color: "var(--text)", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ color: "var(--accent)" }}>•</span> {df}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tools list */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
                    {proj.tools.map((t) => (
                      <span key={t} style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--accent)", background: "rgba(45, 212, 191, 0.08)", padding: "3px 10px", borderRadius: "6px", border: "1px solid rgba(45, 212, 191, 0.2)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
                  <button
                    onClick={() => setActiveNotebook(proj)}
                    style={{
                      flex: 1,
                      background: "rgba(45, 212, 191, 0.12)",
                      border: "1px solid var(--accent)",
                      color: "var(--accent)",
                      padding: "10px 16px",
                      borderRadius: "10px",
                      fontSize: "13px",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      transition: "background 0.2s",
                    }}
                  >
                    <BookOpen style={{ width: "14px", height: "14px" }} /> View Notebook
                  </button>

                  <button
                    onClick={() => setActiveDemoModal(proj)}
                    style={{
                      flex: 1,
                      background: "var(--bg3)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      padding: "10px 16px",
                      borderRadius: "10px",
                      fontSize: "13px",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                  >
                    <Globe style={{ width: "14px", height: "14px" }} /> View Website
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Jupyter Notebook Reader Modal */}
      {activeNotebook && (
        <div className="modal-backdrop" onClick={() => setActiveNotebook(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "860px", padding: "0" }}>
            {/* Notebook Window Bar */}
            <div style={{ background: "#1e1e1e", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #333", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FileText style={{ width: "20px", height: "20px", color: "var(--accent)" }} />
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "#e2e8f0", fontWeight: 700 }}>
                    {activeNotebook.notebook.title}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#94a3b8" }}>
                    Kernel: {activeNotebook.notebook.kernel} · Executed: {activeNotebook.notebook.lastRun}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveNotebook(null)}
                style={{ background: "#2a2a2a", border: "1px solid #444", color: "#e2e8f0", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <X style={{ width: "16px", height: "16px" }} />
              </button>
            </div>

            {/* Notebook Body */}
            <div style={{ padding: "28px", background: "#0f172a", color: "#f8fafc", maxHeight: "75vh", overflowY: "auto" }}>
              {activeNotebook.notebook.cells.map((cell, idx) => (
                <div key={idx} style={{ marginBottom: "24px" }}>
                  {cell.type === "markdown" ? (
                    <div style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: 1.7, background: "rgba(255, 255, 255, 0.03)", padding: "16px", borderRadius: "8px", borderLeft: "3px solid var(--accent)" }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent)", marginBottom: "6px" }}>[Markdown Cell]</div>
                      <div style={{ whiteSpace: "pre-wrap" }}>{cell.content}</div>
                    </div>
                  ) : (
                    <div>
                      {/* Code Cell */}
                      <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", padding: "14px 18px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "#38bdf8", position: "relative" }}>
                        <div style={{ fontSize: "10px", color: "#64748b", marginBottom: "8px" }}>In [{idx + 1}]:</div>
                        <pre style={{ margin: 0, whiteSpace: "pre-wrap", overflowX: "auto", fontFamily: "inherit" }}>
                          <code>{cell.code}</code>
                        </pre>
                      </div>

                      {/* Output Cell */}
                      {cell.output && (
                        <div style={{ marginTop: "8px", background: "#090d16", border: "1px dashed #334155", borderRadius: "8px", padding: "14px 18px", fontFamily: "var(--font-mono)", fontSize: "12px", color: "#4ade80" }}>
                          <div style={{ fontSize: "10px", color: "#64748b", marginBottom: "6px" }}>Out [{idx + 1}]:</div>
                          <pre style={{ margin: 0, whiteSpace: "pre-wrap", overflowX: "auto" }}>
                            {cell.output}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ background: "#1e1e1e", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #333", borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}>
              <a
                href={activeNotebook.githubUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "13px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <Github style={{ width: "16px", height: "16px" }} /> Open Full Notebook on GitHub <ExternalLink style={{ width: "12px", height: "12px" }} />
              </a>
              <button
                onClick={() => setActiveNotebook(null)}
                style={{ background: "#334155", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontFamily: "var(--font-mono)", fontSize: "12px", cursor: "pointer" }}
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Website / Live Demo Modal */}
      {activeDemoModal && (
        <div className="modal-backdrop" onClick={() => setActiveDemoModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "720px", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
                  Analytics Live Web Demo
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: 700, color: "var(--text)" }}>
                  {activeDemoModal.name}
                </h2>
              </div>
              <button
                onClick={() => setActiveDemoModal(null)}
                style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text)", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <X style={{ width: "16px", height: "16px" }} />
              </button>
            </div>

            <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
              {activeDemoModal.summary}
            </p>

            {activeDemoModal.dataFormats && activeDemoModal.dataFormats.length > 0 && (
              <div style={{ background: "var(--bg3)", padding: "18px", borderRadius: "12px", border: "1px solid var(--border)", marginBottom: "20px" }}>
                <div style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--accent)", fontWeight: 700, marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <FileCode2 style={{ width: "15px", height: "15px" }} /> Heterogeneous Data Formats Ingested:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {activeDemoModal.dataFormats.map((fmt) => (
                    <div key={fmt} style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text)", background: "var(--bg2)", padding: "6px 12px", borderRadius: "6px", border: "1px solid var(--border)" }}>
                      {fmt}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ background: "var(--bg3)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border)", marginBottom: "24px" }}>
              <div style={{ fontSize: "13px", fontFamily: "var(--font-mono)", color: "var(--text)", fontWeight: 600, marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                <Globe style={{ width: "15px", height: "15px", color: "var(--accent)" }} /> Live Deployment Target:
              </div>
              <a
                href={activeDemoModal.websiteUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--accent)", wordBreak: "break-all", fontFamily: "var(--font-mono)", fontSize: "14px", textDecoration: "underline" }}
              >
                {activeDemoModal.websiteUrl}
              </a>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <a
                href={activeDemoModal.websiteUrl}
                target="_blank"
                rel="noreferrer"
                style={{ background: "var(--accent)", color: "#080c10", padding: "10px 20px", borderRadius: "8px", fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: "13px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                Launch Live Website <ExternalLink style={{ width: "14px", height: "14px" }} />
              </a>
              <button
                onClick={() => setActiveDemoModal(null)}
                style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text)", padding: "10px 20px", borderRadius: "8px", fontFamily: "var(--font-mono)", fontSize: "13px", cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
