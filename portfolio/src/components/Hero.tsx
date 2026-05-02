"use client";
import { useEffect, useRef, useState } from "react";
import { personal } from "@/lib/data";

const roles = [
  "Frontend Developer",
  "React Enthusiast",
  "Full Stack Builder",
  "UI Craftsman",
  "CS Intern Candidate",
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const tickRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = roles[roleIdx];
    if (!deleting && displayed.length < current.length) {
      tickRef.current = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80
      );
    } else if (!deleting && displayed.length === current.length) {
      tickRef.current = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      tickRef.current = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        40
      );
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => {
      if (tickRef.current) clearTimeout(tickRef.current);
    };
  }, [displayed, deleting, roleIdx]);

  return (
    <section
      id="about"
      className="grid-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 64px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow blobs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(127,255,111,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "5%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(79,255,191,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "900px", animation: "slide-up 0.8s ease forwards" }}>
        <div className="section-label" style={{ marginBottom: "32px" }}>
          available for internship · cebu city, ph
        </div>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            color: "var(--accent)",
            marginBottom: "16px",
          }}
        >
          &gt; hello, I&apos;m
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(56px, 8vw, 100px)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            marginBottom: "24px",
          }}
        >
          Andre Milan
          <br />
          <span style={{ color: "var(--accent)" }}>Arañas</span>
        </h1>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(16px, 2.5vw, 22px)",
            color: "var(--muted)",
            marginBottom: "40px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            gap: "2px",
          }}
        >
          <span style={{ color: "var(--accent2)" }}>{displayed}</span>
          <span
            className="blink"
            style={{ color: "var(--accent2)", fontWeight: 700 }}
          >
            _
          </span>
        </div>

        <p
          style={{
            maxWidth: "560px",
            color: "var(--muted)",
            fontSize: "15px",
            lineHeight: 1.8,
            marginBottom: "48px",
          }}
        >
          {personal.bio}
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a
            href="#projects"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              letterSpacing: "0.08em",
              padding: "14px 28px",
              background: "var(--accent)",
              color: "#000",
              borderRadius: "3px",
              fontWeight: 700,
              transition: "opacity 0.2s, transform 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.opacity = "0.85";
              (e.target as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.opacity = "1";
              (e.target as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            View Projects →
          </a>
          <a
            href={personal.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              letterSpacing: "0.08em",
              padding: "14px 28px",
              border: "1px solid var(--border)",
              color: "var(--text)",
              borderRadius: "3px",
              transition: "border-color 0.2s, transform 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = "var(--accent)";
              (e.target as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = "var(--border)";
              (e.target as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            GitHub ↗
          </a>
        </div>

        {/* Quick stats */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "80px",
            paddingTop: "40px",
            borderTop: "1px solid var(--border)",
          }}
        >
          {[
            { n: "6", label: "Projects Built" },
            { n: "3rd", label: "Year CS Student" },
            { n: "UP", label: "Cebu Campus" },
          ].map(({ n, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "36px",
                  fontWeight: 800,
                  color: "var(--accent)",
                  lineHeight: 1,
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--muted)",
                  marginTop: "4px",
                  letterSpacing: "0.05em",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "64px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--muted)",
            writingMode: "vertical-rl",
            letterSpacing: "0.15em",
          }}
        >
          scroll
        </div>
        <div
          style={{
            width: "1px",
            height: "60px",
            background: "linear-gradient(to bottom, var(--muted), transparent)",
          }}
        />
      </div>
    </section>
  );
}
