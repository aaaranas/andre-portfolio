"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { personal } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

const roles = [
  "Web Developer Intern",
  "Frontend Engineer",
  "React & Next.js Dev",
  "Full Stack Builder",
  "UI Craftsman",
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: EASE },
  }),
};

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const tickRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = roles[roleIdx];
    if (!deleting && displayed.length < current.length) {
      tickRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
    } else if (!deleting && displayed.length === current.length) {
      tickRef.current = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      tickRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => { if (tickRef.current) clearTimeout(tickRef.current); };
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
      {/* Ambient glows */}
      <div style={{
        position: "absolute", top: "10%", right: "5%",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(45,212,191,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "0%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "780px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Avatar */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="show"
          style={{
            width: "112px", height: "112px",
            borderRadius: "50%",
            border: "2px solid var(--accent)",
            boxShadow: "0 0 0 4px rgba(45,212,191,0.12), 0 0 40px rgba(45,212,191,0.15)",
            marginBottom: "28px",
            position: "relative", overflow: "hidden", flexShrink: 0,
          }}
          className="pulse"
        >
          <Image
            src="/photo.jpg"
            alt="Andre Milan Arañas"
            fill sizes="112px" priority
            style={{ objectFit: "cover", objectPosition: "50% 18%" }}
          />
          <div style={{
            position: "absolute", bottom: "7px", right: "7px",
            width: "13px", height: "13px",
            background: "#4ade80", borderRadius: "50%",
            border: "2px solid var(--bg)",
          }} />
        </motion.div>

        {/* Internship badge */}
        <motion.div
          custom={1} variants={fadeUp} initial="hidden" animate="show"
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px",
            border: "1px solid rgba(45,212,191,0.35)",
            borderRadius: "999px", marginBottom: "32px",
            background: "rgba(45,212,191,0.07)",
          }}
        >
          <span style={{
            width: "7px", height: "7px", borderRadius: "50%",
            background: "#4ade80", display: "inline-block",
            boxShadow: "0 0 8px #4ade80",
          }} />
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "11px",
            color: "var(--accent)", letterSpacing: "0.1em",
          }}>
            Web Developer Intern · eComia · Cebu City, PH
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.div
          custom={2} variants={fadeUp} initial="hidden" animate="show"
          style={{
            fontFamily: "var(--font-mono)", fontSize: "13px",
            color: "var(--muted)", marginBottom: "12px", letterSpacing: "0.06em",
          }}
        >
          &gt; hello, I&apos;m
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={3} variants={fadeUp} initial="hidden" animate="show"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(52px, 9vw, 112px)",
            fontWeight: 900, lineHeight: 0.9,
            letterSpacing: "-0.04em", marginBottom: "28px",
          }}
        >
          Andre Milan
          <br />
          <span style={{ color: "var(--accent)" }}>Arañas</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate="show"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(14px, 2.2vw, 20px)",
            color: "var(--muted)",
            marginBottom: "32px", height: "30px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "2px",
          }}
        >
          <span style={{ color: "var(--accent2)" }}>{displayed}</span>
          <span className="blink" style={{ color: "var(--accent2)", fontWeight: 700 }}>_</span>
        </motion.div>

        {/* Bio */}
        <motion.p
          custom={5} variants={fadeUp} initial="hidden" animate="show"
          style={{
            maxWidth: "520px", color: "var(--muted)",
            fontSize: "15px", lineHeight: 1.85,
            marginBottom: "44px",
            fontFamily: "var(--font-body)",
          }}
        >
          {personal.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={6} variants={fadeUp} initial="hidden" animate="show"
          style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}
        >
          <a
            href="#projects"
            style={{
              fontFamily: "var(--font-mono)", fontSize: "12px",
              letterSpacing: "0.08em", padding: "14px 32px",
              background: "var(--accent)", color: "#0d1117",
              borderRadius: "8px", fontWeight: 700,
              transition: "opacity 0.2s, transform 0.2s, box-shadow 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(45,212,191,0.35)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            View Projects →
          </a>
          <a
            href={personal.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)", fontSize: "12px",
              letterSpacing: "0.08em", padding: "14px 32px",
              border: "1px solid var(--border)", color: "var(--text)",
              borderRadius: "8px",
              transition: "border-color 0.2s, transform 0.2s, background 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLElement).style.background = "rgba(45,212,191,0.06)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            GitHub ↗
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={7} variants={fadeUp} initial="hidden" animate="show"
          className="hero-stats"
          style={{
            display: "flex", gap: "56px",
            marginTop: "72px", paddingTop: "40px",
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
              <div style={{
                fontFamily: "var(--font-display)", fontSize: "40px",
                fontWeight: 800, color: "var(--accent)",
                lineHeight: 1, fontStyle: "italic",
              }}>
                {n}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "11px",
                color: "var(--muted)", marginTop: "6px", letterSpacing: "0.05em",
              }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "40px",
        right: "clamp(20px, 5vw, 64px)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
      }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "10px",
          color: "var(--muted)", writingMode: "vertical-rl", letterSpacing: "0.15em",
        }}>
          scroll
        </div>
        <div style={{
          width: "1px", height: "60px",
          background: "linear-gradient(to bottom, var(--muted), transparent)",
        }} />
      </div>
    </section>
  );
}
