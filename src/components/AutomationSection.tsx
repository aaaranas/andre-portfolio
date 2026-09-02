"use client";
import React, { useState } from "react";
import { automationProjects } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import { Zap, Bot, X, Play, Terminal, ArrowRight } from "lucide-react";
import Icon from "./ui/icon";

type Project = (typeof automationProjects)[0];

export default function AutomationSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [simRunning, setSimRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "simulator" | "nodes">("overview");

  function runSimulation(proj: Project) {
    setSimLogs([]);
    setSimRunning(true);
    setActiveTab("simulator");
    const steps = [
      `Webhook received — ${proj.sampleExecution.inputName} <${proj.sampleExecution.inputEmail}>`,
      `Message: "${proj.sampleExecution.inputMessage.slice(0, 80)}..."`,
      `Gemini Agent analyzing intent, urgency, and sentiment...`,
      `Urgency Score: ${proj.sampleExecution.outputUrgency}`,
      `Sentiment: ${proj.sampleExecution.outputSentiment}`,
      ...proj.sampleExecution.outputActions,
      `Workflow execution complete.`,
    ];
    steps.forEach((step, i) => {
      setTimeout(() => {
        setSimLogs((prev) => [...prev, step]);
        if (i === steps.length - 1) setSimRunning(false);
      }, i * 600);
    });
  }

  return (
    <section id="automation" className="s-pad" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ marginBottom: "48px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--accent3)", fontFamily: "var(--font-mono)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "12px" }}>
              <Zap style={{ width: "16px", height: "16px" }} /> AI & Automation Track
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 600, color: "var(--text)", marginBottom: "12px" }}>
              n8n AI Automation Projects
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: "600px", fontSize: "14px", lineHeight: 1.7, fontFamily: "var(--font-mono)" }}>
              Production-grade n8n workflows with Gemini LLM agents, webhook routing, tool-calling pipelines, and live execution simulators.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
          {automationProjects.map((proj, idx) => (
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
                  e.currentTarget.style.borderColor = "var(--accent3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                    <Icon name={proj.icon} size={28} style={{ color: "var(--accent3)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", padding: "3px 10px", border: "1px solid var(--accent3)", borderRadius: "var(--r)", color: "var(--accent3)", background: "transparent" }}>
                      {proj.courseNote}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "19px", fontWeight: 700, color: "var(--text)", lineHeight: 1.3, marginBottom: "8px" }}>
                    {proj.name}
                  </h3>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent3)", marginBottom: "12px" }}>
                    {proj.tagline}
                  </p>
                  <p style={{ color: "var(--muted)", fontSize: "13px", lineHeight: 1.6, marginBottom: "16px" }}>
                    {proj.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                    {proj.n8nNodes.map((node) => (
                      <span key={node.name} style={{ fontFamily: "var(--font-mono)", fontSize: "11px", padding: "3px 10px", border: "1px solid var(--accent3)", borderRadius: "6px", color: "var(--accent3)", background: "transparent", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Icon name={node.icon} size={13} />
                        {node.name}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => { setActiveProject(proj); setActiveTab("overview"); setSimLogs([]); }}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "1px solid var(--accent3)",
                    color: "var(--accent3)",
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
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <Bot style={{ width: "15px", height: "15px" }} />
                  View Workflow & Run Simulator
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {activeProject && (
        <div className="modal-backdrop" onClick={() => setActiveProject(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "760px", padding: "0", overflow: "hidden" }}>
            <div style={{ background: "var(--bg3)", borderBottom: "1px solid var(--border)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Zap style={{ width: "18px", height: "18px", color: "var(--accent3)" }} />
                <span style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 700, color: "var(--text)" }}>{activeProject.name}</span>
              </div>
              <button onClick={() => setActiveProject(null)} style={{ background: "none", border: "1px solid var(--border)", color: "var(--text)", width: "30px", height: "30px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X style={{ width: "14px", height: "14px" }} />
              </button>
            </div>

            <div style={{ borderBottom: "1px solid var(--border)", display: "flex" }}>
              {(["overview", "simulator", "nodes"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "12px 20px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    background: "none",
                    border: "none",
                    borderBottom: activeTab === tab ? "2px solid var(--accent3)" : "2px solid transparent",
                    color: activeTab === tab ? "var(--accent3)" : "var(--muted)",
                    cursor: "pointer",
                    letterSpacing: "0.05em",
                  }}
                >
                  {tab === "nodes" ? "n8n_nodes" : tab}
                </button>
              ))}
            </div>

            <div style={{ padding: "24px", maxHeight: "60vh", overflowY: "auto" }}>
              {activeTab === "overview" && (
                <div>
                  <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>{activeProject.description}</p>
                  <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Workflow Steps</h4>
                  {activeProject.workflowSteps.map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "8px" }}>
                      <ArrowRight aria-hidden style={{ width: "13px", height: "13px", color: "var(--accent3)", flexShrink: 0, marginTop: "3px" }} />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--muted)", lineHeight: 1.6 }}>{step}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "simulator" && (
                <div>
                  <div style={{ background: "#0d1117", borderRadius: "var(--r)", border: "1px solid var(--border)", padding: "18px", marginBottom: "16px", minHeight: "200px" }}>
                    {simLogs.length === 0 && !simRunning && (
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--muted)" }}>Click "Run Simulation" to see the workflow execute live.</p>
                    )}
                    {simLogs.map((log, i) => (
                      <div key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--ok)", lineHeight: 1.8 }}>{log}</div>
                    ))}
                    {simRunning && <div className="blink" style={{ width: "7px", height: "14px", background: "var(--accent3)" }} />}
                  </div>
                  <button
                    onClick={() => runSimulation(activeProject)}
                    disabled={simRunning}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      background: simRunning ? "var(--bg3)" : "var(--accent3)",
                      color: simRunning ? "var(--muted)" : "var(--bg)",
                      border: "none", padding: "10px 20px", borderRadius: "var(--r)",
                      fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 700,
                      cursor: simRunning ? "not-allowed" : "pointer",
                    }}
                  >
                    {simRunning ? <Terminal style={{ width: "15px", height: "15px" }} /> : <Play style={{ width: "15px", height: "15px" }} />}
                    {simRunning ? "Running..." : "Run Simulation"}
                  </button>
                </div>
              )}

              {activeTab === "nodes" && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                  {activeProject.n8nNodes.map((node) => (
                    <div key={node.name} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "14px 16px" }}>
                      <Icon name={node.icon} size={22} style={{ color: "var(--accent3)", marginBottom: "6px" }} />
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 700, color: "var(--text)", marginBottom: "4px" }}>{node.name}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--accent3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{node.type}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
