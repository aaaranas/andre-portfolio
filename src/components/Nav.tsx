"use client";
import { useState, useEffect, useRef } from "react";
import { personal } from "@/lib/data";

const links = ["about", "projects", "skills", "education", "contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  // Scroll progress + back-to-top visibility
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
      setScrolled(scrolled > 40);
      setShowTop(scrolled > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    links.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Persist theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", next);
  };

  const navBg = scrolled
    ? theme === "dark"
      ? "rgba(13,17,23,0.92)"
      : "rgba(255,255,255,0.92)"
    : "transparent";

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${progress}%` }}
      />

      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: navBg,
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <a
          href="#about"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "20px",
            fontWeight: 900,
            fontStyle: "italic",
            color: "var(--accent)",
            letterSpacing: "-0.03em",
            textDecoration: "none",
          }}
        >
          AMA<span style={{ color: "var(--text)", fontStyle: "normal" }}>.</span>
        </a>

        {/* Desktop links */}
        <div className="nav-desktop-links">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: active === link ? "var(--accent)" : "var(--muted)",
                transition: "color 0.2s",
                position: "relative",
                paddingBottom: "3px",
              }}
            >
              {link}
              {active === link && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    height: "1px",
                    background: "var(--accent)",
                    borderRadius: "1px",
                  }}
                />
              )}
            </a>
          ))}

          {/* Resume */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)", fontSize: "11px",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "var(--muted)", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
          >
            résumé ↗
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "999px",
              color: "var(--muted)",
              cursor: "pointer",
              padding: "6px 12px",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              lineHeight: 1,
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--muted)";
            }}
          >
            {theme === "dark" ? "☀" : "◑"}
          </button>

          <a
            href={`mailto:${personal.email}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              padding: "8px 18px",
              background: "var(--accent)",
              color: "#1e1b12",
              borderRadius: "999px",
              fontWeight: 700,
              transition: "opacity 0.2s, transform 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.85";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`nav-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <div className={`nav-mobile-menu${menuOpen ? " open" : ""}`}>
        {links.map((link) => (
          <a
            key={link}
            href={`#${link}`}
            className="nav-mobile-link"
            onClick={() => {
              setActive(link);
              setMenuOpen(false);
            }}
          >
            {link}
          </a>
        ))}
        <button
          onClick={() => { toggleTheme(); setMenuOpen(false); }}
          style={{
            background: "none",
            border: "1px solid var(--border)",
            borderRadius: "999px",
            color: "var(--muted)",
            cursor: "pointer",
            padding: "12px 24px",
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
          }}
        >
          {theme === "dark" ? "☀ Light Mode" : "◑ Dark Mode"}
        </button>
      </div>

      {/* Back to top */}
      <button
        className={`back-to-top${showTop ? "" : " hidden"}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        title="Back to top"
      >
        ↑
      </button>
    </>
  );
}
