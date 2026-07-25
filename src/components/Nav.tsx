"use client";
import { useState, useEffect } from "react";

const links = ["about", "projects", "experience", "education", "skills", "contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") setTheme("light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", next);
  };

  const navBg = scrolled
    ? theme === "dark"
      ? "rgba(12,12,15,0.88)"
      : "rgba(248,248,245,0.92)"
    : "transparent";

  return (
    <>
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
          background: navBg,
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

        {/* Desktop links */}
        <div className="nav-desktop-links">
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

          {/* Dark / light toggle */}
          <button
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              color: "var(--muted)",
              cursor: "pointer",
              padding: "6px 10px",
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              lineHeight: 1,
              transition: "border-color 0.2s, color 0.2s",
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
            {theme === "dark" ? "☀" : "●"}
          </button>

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

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <div className={`nav-mobile-menu${menuOpen ? " open" : ""}`}>
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{
            position: "absolute",
            top: "20px",
            right: "24px",
            background: "none",
            border: "none",
            color: "var(--muted)",
            fontSize: "28px",
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          ×
        </button>

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
          onClick={toggleTheme}
          style={{
            background: "none",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            color: "var(--muted)",
            cursor: "pointer",
            padding: "10px 20px",
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
          }}
        >
          {theme === "dark" ? "☀ Light Mode" : "● Dark Mode"}
        </button>
      </div>
    </>
  );
}
