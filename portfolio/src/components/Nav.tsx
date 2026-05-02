"use client";
import { useState, useEffect } from "react";

const links = ["about", "projects", "skills", "education", "contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "16px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled ? "rgba(12,12,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "18px",
          fontWeight: 800,
          color: "var(--accent)",
          letterSpacing: "-0.03em",
        }}
      >
        AMA<span style={{ color: "var(--text)" }}>.</span>
      </span>

      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {links.map((link) => (
          <a
            key={link}
            href={`#${link}`}
            onClick={() => setActive(link)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: active === link ? "var(--accent)" : "var(--muted)",
              transition: "color 0.2s",
            }}
          >
            {link}
          </a>
        ))}
        <a
          href="mailto:aaaranas@up.edu.ph"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.1em",
            padding: "8px 16px",
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            borderRadius: "3px",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = "var(--accent)";
            (e.target as HTMLElement).style.color = "#000";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = "transparent";
            (e.target as HTMLElement).style.color = "var(--accent)";
          }}
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
}
