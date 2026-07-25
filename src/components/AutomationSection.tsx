"use client";
import React, { useState } from "react";
import { automationProjects } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import { Zap, Bot, Workflow, Cpu, Github, X, Play, Terminal } from "lucide-react";

function getAutomationIcon(id: string) {
  const iconProps = { style: { width: "24px", height: "24px", color: "var(--accent3)" } };
  switch (id) {
    case "support-ticket-agent":
      return <Bot {...iconProps} />;
    case "lead-enrichment-pipeline":
      return <Workflow {...iconProps} />;
    default:
      return <Zap {...iconProps} />;
  }
}

export default function AutomationSection() {
  const [selectedProj, setSelectedProj] = useState<typeof automationProjects[0] | null>(null);
  const [testInput, setTestInput] = useState<string>("URGENT: Order #9482 ticket not downloading. Need assistance immediately!");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "simulator" | "n8n_nodes">("overview");

  const runSimulation = (proj: typeof automationProjects[0]) => {
    setIsSimulating(true);
    setSimLogs([]);

    const steps = [
      `[00:00.02s] Webhook Triggered: Payload received from contact form`,
      `[00:00.18s] Gemini 1.5 Agent Node Invoked -> Parsing intent, urgency, and extraction targets...`,
      `[00:00.42s] AI Agent Assessment: Urgency Score = 9/10 | Sentiment = Anxious | Extracted Order = #9482`,
      `[00:00.65s] Tool Call: Executed PostgreSQL Query 'SELECT * FROM tickets WHERE order_id = 9482'`,
      `[00:00.89s] Slack Alert Fired: Dispatched urgent alert to #event-desk channel`,
      `[00:01.12s] Resend Email Node Executed: Dispatched custom ticket link to customer email. Workflow complete!`
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimLogs((prev) => [...prev, step]);
        if (idx === steps.length - 1) {
          setIsSimulating(false);
        }
      }, (idx + 1) * 350);
    });
  };

  return (
    <section id="automation" className="s-pad" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ marginBottom: "40px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--accent3)", fontFamily: "var(--font-mono)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
              <Zap style={{ width: "16px", height: "16px" }} /> AI Engineering & Automation
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "var(--text)", marginBottom: "12px" }}>
              Automation & AI Engineer (n8n)
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: "720px", fontSize: "15px", lineHeight: 1.6 }}>
              Currently completing an intensive course as an <strong style={{ color: "var(--accent3)" }}>AI Engineer specializing in n8n</strong>. Designing autonomous agent workflows, webhook integrations, Gemini LLM tool calling, and self-healing backend automations.
            </p>
          </div>
        </ScrollReveal>

        {/* Automation Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "28px" }}>
          {automationProjects.map((proj, idx) => (
            <ScrollReveal key={proj.id} delay={idx * 0.1}>
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                    <div style={{ background: "rgba(251, 146, 60, 0.12)", padding: "10px", borderRadius: "12px", display: "inline-flex" }}>
                      {getAutomationIcon(proj.id)}
                    </div>
                    <div>
                      <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--accent3)", background: "rgba(251, 146, 60, 0.1)", padding: "2px 8px", borderRadius: "4px" }}>
                        {proj.courseNote}
                      </span>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--text)", marginTop: "4px" }}>
                        {proj.name}
                      </h3>
                    </div>
                  </div>

                  <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
                    {proj.description}
                  </p>

                  {/* n8n Nodes Chain */}
                  <div style={{ marginBottom: "20px" }}>
                    <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: "8px" }}>
                      n8n WORKFLOW NODES CHAIN:
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {proj.n8nNodes.map((node) => (
                        <div key={node.name} style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "var(--bg3)", border: "1px solid var(--border)", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text)" }}>
                          <Cpu style={{ width: "13px", height: "13px", color: "var(--accent3)" }} />
                          <span>{node.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Workflow Steps Preview */}
                  <div style={{ background: "var(--bg3)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border)", marginBottom: "24px" }}>
                    <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--accent3)", marginBottom: "8px", fontWeight: 700 }}>
                      WORKFLOW PIPELINE STEPS:
                    </div>
                    <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--muted)", lineHeight: 1.7 }}>
                      {proj.workflowSteps.map((step, sIdx) => (
                        <li key={sIdx}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
                  <button
                    onClick={() => {
                      setSelectedProj(proj);
                      setActiveTab("simulator");
                      runSimulation(proj);
                    }}
                    style={{
                      flex: 1,
                      background: "rgba(251, 146, 60, 0.15)",
                      border: "1px solid var(--accent3)",
                      color: "var(--accent3)",
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
                    <Zap style={{ width: "14px", height: "14px" }} /> Test n8n Simulator
                  </button>

                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: "var(--bg3)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      padding: "10px 16px",
                      borderRadius: "10px",
                      fontSize: "13px",
                      fontFamily: "var(--font-mono)",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Github style={{ width: "14px", height: "14px" }} /> GitHub
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Interactive Simulator Modal */}
      {selectedProj && (
        <div className="modal-backdrop" onClick={() => setSelectedProj(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "800px", padding: "0" }}>
            {/* Window Bar */}
            <div style={{ background: "#18181b", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #27272a", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Zap style={{ width: "20px", height: "20px", color: "var(--accent3)" }} />
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "#f4f4f5", fontWeight: 700 }}>
                    n8n Workflow Execution Test — {selectedProj.name}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#a1a1aa" }}>
                    Engine: n8n Node Orchestration + Gemini 1.5 Agent
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedProj(null)}
                style={{ background: "#27272a", border: "none", color: "#f4f4f5", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <X style={{ width: "16px", height: "16px" }} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "28px", background: "#09090b", color: "#f4f4f5" }}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--accent3)", marginBottom: "6px", fontWeight: 600 }}>
                  TEST WEBHOOK PAYLOAD (INPUT PROMPT):
                </label>
                <div style={{ display: "flex", gap: "12px" }}>
                  <input
                    type="text"
                    value={testInput}
                    onChange={(e) => setTestInput(e.target.value)}
                    style={{
                      flex: 1,
                      background: "#18181b",
                      border: "1px solid #27272a",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      color: "#f4f4f5",
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                    }}
                  />
                  <button
                    onClick={() => runSimulation(selectedProj)}
                    disabled={isSimulating}
                    style={{
                      background: "var(--accent3)",
                      color: "#000",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: isSimulating ? "not-allowed" : "pointer",
                      opacity: isSimulating ? 0.6 : 1,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Play style={{ width: "14px", height: "14px" }} /> {isSimulating ? "Running..." : "Execute Workflow"}
                  </button>
                </div>
              </div>

              {/* Execution Log Output */}
              <div>
                <div style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "#a1a1aa", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Terminal style={{ width: "14px", height: "14px", color: "var(--accent3)" }} /> LIVE n8n EXECUTION TERMINAL LOGS:
                </div>
                <div style={{ background: "#000", border: "1px solid #27272a", borderRadius: "10px", padding: "16px", fontFamily: "var(--font-mono)", fontSize: "12px", minHeight: "220px", maxHeight: "320px", overflowY: "auto", lineHeight: 1.8 }}>
                  {simLogs.length === 0 && <span style={{ color: "#52525b" }}>Click "Execute Workflow" to trigger real-time n8n agent execution steps...</span>}
                  {simLogs.map((log, i) => (
                    <div key={i} style={{ color: log.includes("Error") ? "#ef4444" : log.includes("Complete") ? "#4ade80" : "#e4e4e7" }}>
                      {log}
                    </div>
                  ))}
                  {isSimulating && (
                    <div style={{ color: "var(--accent3)", marginTop: "8px" }} className="blink">
                      Executing next n8n node...
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ background: "#18181b", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #27272a", borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}>
              <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "#a1a1aa" }}>
                Course: AI Engineer using n8n
              </span>
              <button
                onClick={() => setSelectedProj(null)}
                style={{ background: "#27272a", color: "#fff", border: "none", padding: "8px 18px", borderRadius: "6px", fontFamily: "var(--font-mono)", fontSize: "12px", cursor: "pointer" }}
              >
                Close Simulator
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
