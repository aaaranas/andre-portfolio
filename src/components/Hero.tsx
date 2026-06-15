"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { personal } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

const roles = [
  "Web Developer Intern",
  "Frontend Engineer",
  "React & Next.js Dev",
  "Full Stack Builder",
  "UI Craftsman",
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
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
      className="grid-bg hero-pad"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Glow blobs */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(232,168,56,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "0%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(94,207,176,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "760px",
          width: "100%",
          animation: "slide-up 0.8s ease forwards",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Profile avatar */}
        <div
          style={{
            width: "108px",
            height: "108px",
            borderRadius: "50%",
            border: "2px solid var(--accent)",
            boxShadow: "0 0 40px rgba(232,168,56,0.18)",
            marginBottom: "28px",
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Image
            src="/photo.jpg"
            alt="Andre Milan Arañas"
            fill
            sizes="108px"
            priority
            style={{ objectFit: "cover", objectPosition: "50% 18%" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "7px",
              right: "7px",
              width: "13px",
              height: "13px",
              background: "#4ade80",
              borderRadius: "50%",
              border: "2px solid var(--bg)",
            }}
          />
        </div>

        {/* Internship badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            border: "1px solid var(--accent)",
            borderRadius: "999px",
            marginBottom: "32px",
            background: "rgba(232,168,56,0.08)",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#4ade80",
              display: "inline-block",
              boxShadow: "0 0 6px #4ade80",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--accent)",
              letterSpacing: "0.12em",
            }}
          >
            Web Developer Intern · eComia · Cebu City, PH
          </span>
        </div>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            color: "var(--accent)",
            marginBottom: "14px",
            letterSpacing: "0.06em",
          }}
        >
          &gt; hello, I&apos;m
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(52px, 9vw, 110px)",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            marginBottom: "28px",
          }}
        >
          Andre Milan
          <br />
          <span style={{ color: "var(--accent)" }}>Arañas</span>
        </h1>

        {/* Typewriter */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(14px, 2.2vw, 20px)",
            color: "var(--muted)",
            marginBottom: "36px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2px",
          }}
        >
          <span style={{ color: "var(--accent2)" }}>{displayed}</span>
          <span className="blink" style={{ color: "var(--accent2)", fontWeight: 700 }}>
            _
          </span>
        </div>

        <p
          style={{
            maxWidth: "520px",
            color: "var(--muted)",
            fontSize: "15px",
            lineHeight: 1.85,
            marginBottom: "44px",
          }}
        >
          {personal.bio}
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="#projects"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              letterSpacing: "0.08em",
              padding: "14px 32px",
              background: "var(--accent)",
              color: "#1e1b12",
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
              padding: "14px 32px",
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
          className="hero-stats"
          style={{
            display: "flex",
            gap: "56px",
            marginTop: "72px",
            paddingTop: "40px",
            borderTop: "1px solid var(--border)",
            justifyContent: "center",
          }}
        >
          {[
            { n: "8+", label: "Projects Built" },
            { n: "3rd", label: "Year CS · UP Cebu" },
            { n: "1", label: "Internship Active" },
          ].map(({ n, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "38px",
                  fontWeight: 800,
                  color: "var(--accent)",
                  lineHeight: 1,
                  fontStyle: "italic",
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--muted)",
                  marginTop: "6px",
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
          right: "clamp(20px, 5vw, 64px)",
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
