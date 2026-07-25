"use client";
import React from "react";
import ScrollReveal from "./ScrollReveal";
import { Code2, BarChart3, Zap, BookOpen, Award, Sparkles, GraduationCap, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PortfolioTracks() {
  const professions = [
    {
      id: "developer",
      title: "Developer Portfolio",
      icon: Code2,
      roleLabel: "Profession 01",
      description: "Full-Stack Web Development, React, Next.js, Node.js, WebSockets, and real-time civic tech.",
      color: "var(--accent)",
      badge: "Software Engineering",
    },
    {
      id: "data-analyst",
      title: "Data Analyst Portfolio",
      icon: BarChart3,
      roleLabel: "Profession 02",
      description: "Python Data Science, spatial mobility analysis, retention modeling, Jupyter notebooks & live web analytics.",
      color: "#38bdf8",
      badge: "Data Science & Viz",
    },
    {
      id: "automation",
      title: "AI & Automation Engineer",
      icon: Zap,
      roleLabel: "Profession 03",
      description: "n8n AI Engineer Specialist, autonomous Gemini LLM agents, webhooks, and tool-calling pipelines.",
      color: "var(--accent3)",
      badge: "n8n & AI Orchestration",
    },
  ];

  const resources = [
    {
      id: "blog",
      title: "Technical Blog & Articles",
      icon: BookOpen,
      description: "Deep dives on n8n agent architectures, spatial transit data cleaning, and offline-first WebSocket sync.",
      color: "var(--accent2)",
      badge: "Writing",
    },
    {
      id: "certifications",
      title: "Certifications & Accreditation",
      icon: Award,
      description: "Verified certificates in AI Engineering, Data Analytics, GitHub Foundations, and Civil Service Eligibility.",
      color: "#4ade80",
      badge: "Credentials",
    },
  ];

  return (
    <section style={{ padding: "60px clamp(20px, 5vw, 64px) 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <ScrollReveal>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>
            <Sparkles style={{ width: "14px", height: "14px" }} /> Professional Tracks
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, color: "var(--text)", marginBottom: "8px" }}>
            Three Core Professions
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "14px", fontFamily: "var(--font-mono)", maxWidth: "560px", margin: "0 auto" }}>
            Explore dedicated portfolios featuring live applications, interactive notebooks, and automated AI workflows.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginBottom: "36px" }}>
          {professions.map((prof) => {
            const Icon = prof.icon;
            return (
              <a
                key={prof.id}
                href={`#${prof.id}`}
                style={{
                  textDecoration: "none",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = prof.color;
                  e.currentTarget.style.boxShadow = `0 12px 30px -5px ${prof.color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <div style={{ background: `${prof.color}15`, padding: "10px", borderRadius: "12px", display: "inline-flex" }}>
                      <Icon style={{ width: "24px", height: "24px", color: prof.color }} />
                    </div>
                    <Badge variant="outline" style={{ color: prof.color, borderColor: `${prof.color}40` }}>
                      {prof.roleLabel}
                    </Badge>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>
                    {prof.title}
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: "13px", lineHeight: 1.6, margin: 0 }}>
                    {prof.description}
                  </p>
                </div>
                <div style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid var(--border)", fontSize: "12px", fontFamily: "var(--font-mono)", color: prof.color, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span>Explore {prof.title.replace(" Portfolio", "")}</span>
                  <ArrowRight style={{ width: "14px", height: "14px" }} />
                </div>
              </a>
            );
          })}
        </div>

        <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
            <GraduationCap style={{ width: "15px", height: "15px" }} /> Additional Publications & Qualifications
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {resources.map((res) => {
              const ResIcon = res.icon;
              return (
                <a
                  key={res.id}
                  href={`#${res.id}`}
                  style={{
                    textDecoration: "none",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = res.color; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ background: `${res.color}15`, padding: "8px", borderRadius: "8px" }}>
                      <ResIcon style={{ width: "20px", height: "20px", color: res.color }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 700, color: "var(--text)" }}>{res.title}</div>
                      <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>{res.badge}</div>
                    </div>
                  </div>
                  <ArrowRight style={{ color: res.color, width: "16px", height: "16px" }} />
                </a>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
