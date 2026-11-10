"use client";
import React, { useState } from "react";
import { certifications } from "@/lib/data/certifications";
import ScrollReveal from "./ScrollReveal";
import Mark, { Monogram } from "./ui/mark";
import { Badge } from "@/components/ui/badge";
import CertificatePreview from "./CertificatePreview";
import type { Certification } from "@/lib/types";

export default function CertificationsBlock() {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  return (
    <>


        <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--border)" }}>
          {certifications.map((cert, idx) => (
            <li key={cert.id}>
              <ScrollReveal delay={idx * 50}>
                <button
                  data-hover
                  onClick={() => setActiveCert(cert)}
                  className="cert-row"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    textAlign: "left",
                    padding: "18px 10px",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid var(--border)",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  <Monogram text={cert.issuer} color="var(--accent)" size={38} />

                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 600, color: "var(--text)", marginBottom: "3px" }}>
                      {cert.title}
                    </span>
                    <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11.5px", color: "var(--muted)" }}>
                      {cert.issuer} · {cert.date}
                      {cert.expires ? ` · expires ${cert.expires}` : ""}
                    </span>
                  </span>

                  <span className="cert-row-cat">
                    <Badge variant="outline" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
                      {cert.category}
                    </Badge>
                  </span>

                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent)", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    view <Mark name="arrow" size={12} />
                  </span>
                </button>
              </ScrollReveal>
            </li>
          ))}
        </ul>

      {activeCert && (
        <div className="modal-backdrop" onClick={() => setActiveCert(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "640px", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Monogram text={activeCert.issuer} color="var(--accent)" size={44} />
                <div>
                  <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>Official Credential</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--muted)" }}>{activeCert.issuer}</div>
                </div>
              </div>
              <button onClick={() => setActiveCert(null)} style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text)", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Mark name="close" size={16} />
              </button>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <CertificatePreview cert={activeCert} />
            </div>
            <p style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--dim)", marginBottom: "20px", lineHeight: 1.6 }}>
              {activeCert.previewImage
                ? "Scan of the issued certificate."
                : "Summary rendered from the credential record — open the issuer's page for the original."}
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 700, color: "var(--text)", marginBottom: "8px", lineHeight: 1.3 }}>
              {activeCert.title}
            </h2>
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6, marginBottom: "20px" }}>{activeCert.description}</p>
            <div style={{ background: "var(--bg3)", padding: "18px", borderRadius: "var(--r)", border: "1px solid var(--border)", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>CREDENTIAL ID</div>
                  <div style={{ fontSize: "13px", fontFamily: "var(--font-mono)", color: "var(--text)", fontWeight: 700 }}>{activeCert.credentialId}</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>ISSUE DATE</div>
                  <div style={{ fontSize: "13px", fontFamily: "var(--font-mono)", color: "var(--text)", fontWeight: 600 }}>{activeCert.date}</div>
                </div>
                {activeCert.expires && (
                  <div>
                    <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>VALID THROUGH</div>
                    <div style={{ fontSize: "13px", fontFamily: "var(--font-mono)", color: "var(--text)", fontWeight: 600 }}>{activeCert.expires}</div>
                  </div>
                )}
              </div>
              <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: "8px" }}>VERIFIED SKILLS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {activeCert.skills.map((s) => (
                  <span key={s} style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--accent)", background: `var(--accent)15`, padding: "3px 10px", borderRadius: "6px" }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", flexWrap: "wrap" }}>
              <button onClick={() => setActiveCert(null)} style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text)", padding: "10px 18px", borderRadius: "var(--r)", fontFamily: "var(--font-mono)", fontSize: "12px", cursor: "pointer" }}>
                Close
              </button>
              <a
                href={activeCert.verificationUrl}
                target="_blank"
                rel="noreferrer"
                style={{ background: "var(--accent)", color: "var(--bg)", padding: "10px 20px", borderRadius: "var(--r)", fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: "12px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <Mark name="check" size={12} />
                Verify Credential
                <Mark name="external" size={11} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
