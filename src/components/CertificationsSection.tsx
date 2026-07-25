"use client";
import React, { useState } from "react";
import { certifications } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import { Award, BarChart3, Zap, ExternalLink, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Badge } from "@/components/ui/badge";

function getCertIcon(iconType: string, color: string) {
  const style = { width: "22px", height: "22px", color };
  switch (iconType) {
    case "bar-chart": return <BarChart3 style={style} />;
    case "zap": return <Zap style={style} />;
    case "github": return <SiGithub style={{ width: "22px", height: "22px", color }} />;
    default: return <Award style={style} />;
  }
}

export default function CertificationsSection() {
  const [activeCert, setActiveCert] = useState<typeof certifications[0] | null>(null);

  return (
    <section id="certifications" className="s-pad" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ marginBottom: "40px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#4ade80", fontFamily: "var(--font-mono)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
              <Award style={{ width: "16px", height: "16px" }} /> Certifications & Accreditation
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "var(--text)", marginBottom: "12px" }}>
              Certifications & Qualifications
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: "680px", fontSize: "15px", lineHeight: 1.6 }}>
              Professional certifications, specialized coursework, and government eligibility credentials.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {certifications.map((cert, idx) => (
            <ScrollReveal key={cert.id} delay={idx * 80}>
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = cert.badgeColor;
                  e.currentTarget.style.boxShadow = `0 12px 30px -5px ${cert.badgeColor}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div style={{ background: `${cert.badgeColor}18`, padding: "10px", borderRadius: "12px", display: "inline-flex" }}>
                      {getCertIcon(cert.iconType, cert.badgeColor)}
                    </div>
                    <Badge variant="outline" style={{ color: cert.badgeColor, borderColor: `${cert.badgeColor}40` }}>
                      {cert.category}
                    </Badge>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 700, color: "var(--text)", lineHeight: 1.3, marginBottom: "8px" }}>
                    {cert.title}
                  </h3>
                  <div style={{ fontSize: "13px", fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: "4px", fontWeight: 600 }}>
                    {cert.issuer}
                  </div>
                  <div style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--muted)", opacity: 0.8, marginBottom: "16px" }}>
                    Issued {cert.date}
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6, marginBottom: "20px" }}>
                    {cert.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                    {cert.skills.map((skill) => (
                      <span key={skill} style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text)", background: "var(--bg3)", padding: "3px 8px", borderRadius: "6px", border: "1px solid var(--border)" }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setActiveCert(cert)}
                  style={{
                    width: "100%",
                    background: `${cert.badgeColor}12`,
                    border: `1px solid ${cert.badgeColor}50`,
                    color: cert.badgeColor,
                    padding: "10px 14px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `${cert.badgeColor}22`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = `${cert.badgeColor}12`; }}
                >
                  <ShieldCheck style={{ width: "15px", height: "15px" }} />
                  View Certificate Details
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {activeCert && (
        <div className="modal-backdrop" onClick={() => setActiveCert(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "560px", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ background: `${activeCert.badgeColor}20`, padding: "12px", borderRadius: "14px", display: "inline-flex" }}>
                  {getCertIcon(activeCert.iconType, activeCert.badgeColor)}
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: activeCert.badgeColor, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>Official Credential</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--muted)" }}>{activeCert.issuer}</div>
                </div>
              </div>
              <button onClick={() => setActiveCert(null)} style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text)", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X style={{ width: "16px", height: "16px" }} />
              </button>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 700, color: "var(--text)", marginBottom: "8px", lineHeight: 1.3 }}>
              {activeCert.title}
            </h2>
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6, marginBottom: "20px" }}>{activeCert.description}</p>
            <div style={{ background: "var(--bg3)", padding: "18px", borderRadius: "12px", border: "1px solid var(--border)", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>CREDENTIAL ID</div>
                  <div style={{ fontSize: "13px", fontFamily: "var(--font-mono)", color: "var(--text)", fontWeight: 700 }}>{activeCert.credentialId}</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>ISSUE DATE</div>
                  <div style={{ fontSize: "13px", fontFamily: "var(--font-mono)", color: "var(--text)", fontWeight: 600 }}>{activeCert.date}</div>
                </div>
              </div>
              <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: "8px" }}>VERIFIED SKILLS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {activeCert.skills.map((s) => (
                  <span key={s} style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: activeCert.badgeColor, background: `${activeCert.badgeColor}15`, padding: "3px 10px", borderRadius: "6px" }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", flexWrap: "wrap" }}>
              <button onClick={() => setActiveCert(null)} style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text)", padding: "10px 18px", borderRadius: "8px", fontFamily: "var(--font-mono)", fontSize: "12px", cursor: "pointer" }}>
                Close
              </button>
              <a
                href={activeCert.verificationUrl}
                target="_blank"
                rel="noreferrer"
                style={{ background: activeCert.badgeColor, color: "#080c10", padding: "10px 20px", borderRadius: "8px", fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: "12px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <CheckCircle2 style={{ width: "14px", height: "14px" }} />
                Verify Credential
                <ExternalLink style={{ width: "12px", height: "12px" }} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
