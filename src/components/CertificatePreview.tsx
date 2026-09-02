"use client";
import Image from "next/image";
import { Check } from "lucide-react";
import type { Certification } from "@/lib/types";
import { personal } from "@/lib/data";

/**
 * Visual stand-in for a credential.
 *
 * When a scan of the issued certificate is on file (`cert.previewImage`, a path
 * under /public) that image is what renders. Otherwise this draws the site's own
 * summary panel from the credential metadata — deliberately in the portfolio's
 * type and palette rather than any issuer's certificate design, so it reads as a
 * portfolio card and never as a reproduction of the real document. The issuer's
 * verification link is always the source of truth.
 */
export default function CertificatePreview({
  cert,
  compact = false,
}: {
  cert: Certification;
  compact?: boolean;
}) {
  const c = cert.badgeColor;

  if (cert.previewImage) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1.55 / 1",
          borderRadius: "var(--r)",
          overflow: "hidden",
          border: `1px solid ${c}33`,
          background: "var(--bg3)",
        }}
      >
        <Image
          src={cert.previewImage}
          alt={`${cert.title} certificate issued by ${cert.issuer}`}
          fill
          sizes={compact ? "(max-width: 700px) 90vw, 340px" : "(max-width: 860px) 90vw, 720px"}
          style={{ objectFit: "contain" }}
        />
      </div>
    );
  }

  const pad = compact ? 14 : 26;
  // long titles wrap far enough to shove the footer out of a fixed-aspect panel,
  // so step the type down and cap the line count instead of letting it overflow
  const long = cert.title.length > 46;
  const mid = cert.title.length > 28;
  const titleSize = compact ? (long ? 10 : mid ? 11.5 : 13) : (long ? 16 : mid ? 19 : 22);

  return (
    <div
      aria-label={`${cert.title} — ${cert.issuer}, credential ${cert.credentialId}`}
      role="img"
      className="cert-preview"
      style={{
        ["--cert" as string]: c,
        position: "relative",
        width: "100%",
        aspectRatio: "1.55 / 1",
        borderRadius: "var(--r)",
        overflow: "hidden",
        border: `1px solid ${c}33`,
        background: `
          radial-gradient(ellipse 120% 90% at 50% 0%, ${c}14, transparent 70%),
          repeating-linear-gradient(45deg, ${c}08 0 1px, transparent 1px 7px),
          var(--bg3)
        `,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: `${pad}px ${pad + 2}px`,
      }}
    >
      {/* double hairline frame — certificate cadence, drawn in our own palette */}
      <span aria-hidden style={{ position: "absolute", inset: compact ? "5px" : "8px", border: `1px solid ${c}38`, borderRadius: "2px", pointerEvents: "none" }} />
      <span aria-hidden style={{ position: "absolute", inset: compact ? "8px" : "12px", border: `1px solid ${c}16`, borderRadius: "1px", pointerEvents: "none" }} />

      {/* issuer line */}
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: compact ? "8.5px" : "11px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--cert-ink)",
            fontWeight: 700,
          }}
        >
          {cert.issuer}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: compact ? "7.5px" : "9.5px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--dim)",
            whiteSpace: "nowrap",
          }}
        >
          {cert.category}
        </span>
      </div>

      {/* title + holder */}
      <div style={{ position: "relative", textAlign: "center", padding: compact ? "2px 4px" : "6px 12px", flex: "0 1 auto", minHeight: 0, overflow: "hidden" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: compact ? "7px" : "9px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--dim)",
            marginBottom: compact ? "5px" : "10px",
          }}
        >
          Awarded to
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: compact ? "12px" : "19px",
            fontWeight: 600,
            color: "var(--text)",
            letterSpacing: "-0.02em",
            marginBottom: compact ? "6px" : "12px",
          }}
        >
          {personal.name}
        </div>
        <div aria-hidden style={{ height: "1px", width: compact ? "38%" : "30%", margin: `0 auto ${compact ? 6 : 12}px`, background: `linear-gradient(90deg, transparent, ${c}66, transparent)` }} />
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: `${titleSize}px`,
            fontWeight: 700,
            color: "var(--cert-ink)",
            lineHeight: 1.25,
            letterSpacing: "-0.025em",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
          }}
        >
          {cert.title}
        </div>
      </div>

      {/* footer: date, seal, credential id */}
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "8px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: compact ? "7.5px" : "9.5px", color: "var(--muted)", lineHeight: 1.7 }}>
          <div style={{ color: "var(--dim)", letterSpacing: "0.14em" }}>ISSUED</div>
          <div style={{ color: "var(--text)" }}>{cert.date}</div>
        </div>

        <div
          aria-hidden
          style={{
            width: compact ? "26px" : "40px",
            height: compact ? "26px" : "40px",
            borderRadius: "50%",
            border: `1px solid ${c}55`,
            display: "grid",
            placeItems: "center",
            color: "var(--cert-ink)",
            background: `${c}10`,
            flexShrink: 0,
          }}
        >
          <Check style={{ width: compact ? "12px" : "18px", height: compact ? "12px" : "18px" }} />
        </div>

        <div style={{ fontFamily: "var(--font-mono)", fontSize: compact ? "7.5px" : "9.5px", color: "var(--muted)", lineHeight: 1.7, textAlign: "right", minWidth: 0 }}>
          <div style={{ color: "var(--dim)", letterSpacing: "0.14em" }}>{cert.expires ? "VALID THRU" : "CREDENTIAL"}</div>
          <div style={{ color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {cert.expires ?? cert.credentialId}
          </div>
        </div>
      </div>
    </div>
  );
}
