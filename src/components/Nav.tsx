"use client";
import { useState, useEffect } from "react";
import Terminal from "./Terminal";
import { ArrowUp, ArrowUpRight, Moon, Sun } from "lucide-react";

/**
 * Sections reachable from the bar. "about" is the top of the page and "contact"
 * is where the Get in Touch CTA already lands, so neither earns a slot here —
 * they stay in the scroll-spy list below so the bar still tracks them.
 */
const links = ["projects", "experience", "education", "skills"];

/** Every section the active-link indicator watches, including the two not linked. */
const observed = ["about", ...links, "contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [termOpen, setTermOpen] = useState(false);

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
    observed.forEach((id) => {
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

  const applyTheme = (next: "dark" | "light") => {
    setTheme(next);
    if (next === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", next);
  };

  const toggleTheme = () => applyTheme(theme === "dark" ? "light" : "dark");

  // Global shortcuts: "/" or Cmd-K / Ctrl-K open the shell, from anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el instanceof HTMLElement && el.isContentEditable);
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setTermOpen((v) => !v);
        return;
      }
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setTermOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navBg = scrolled
    ? theme === "dark"
      ? "color-mix(in srgb, var(--bg) 88%, transparent)"
      : "color-mix(in srgb, var(--bg) 88%, transparent)"
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
        <button
          onClick={() => setTermOpen(true)}
          aria-label="Open the portfolio terminal"
          title="Run commands against this portfolio  ( / )"
          className="nav-shell-trigger"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r)",
            padding: "7px 12px",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: "12.5px",
            color: "var(--text)",
            letterSpacing: "0.04em",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
            (e.currentTarget as HTMLElement).style.background = "var(--bg3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.background = "var(--card)";
          }}
        >
          <span style={{ color: "var(--accent)", fontWeight: 700 }}>~/</span>
          <span style={{ fontWeight: 700 }}>ama</span>
          <span style={{ color: "var(--accent)" }}>$</span>
          <span className="nav-shell-hint" style={{ color: "var(--dim)" }}>
            run a command
          </span>
          <span className="nav-shell-key" style={{
            border: "1px solid var(--border)",
            borderRadius: "2px",
            padding: "1px 5px",
            fontSize: "10px",
            color: "var(--dim)",
          }}>
            /
          </span>
          <span className="term-caret" style={{ width: "5px", height: "13px", background: "var(--accent)", display: "inline-block" }} />
        </button>

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
              display: "inline-flex", alignItems: "center", gap: "5px",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
          >
            résumé
            <ArrowUpRight aria-hidden style={{ width: "12px", height: "12px" }} />
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "var(--r)",
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
            {theme === "dark"
              ? <Sun aria-hidden style={{ width: "14px", height: "14px" }} />
              : <Moon aria-hidden style={{ width: "14px", height: "14px" }} />}
          </button>

          <a
            href="#contact"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              padding: "8px 18px",
              background: "var(--accent)",
              color: "var(--bg)",
              borderRadius: "var(--r)",
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
            Get in Touch
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
        <a
          href="#contact"
          className="nav-mobile-link"
          onClick={() => { setActive("contact"); setMenuOpen(false); }}
        >
          contact
        </a>
        <button
          onClick={() => { setMenuOpen(false); setTermOpen(true); }}
          className="nav-mobile-link"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
          }}
        >
          <span style={{ color: "var(--accent)" }}>~/</span>terminal
        </button>
        <button
          onClick={() => { toggleTheme(); setMenuOpen(false); }}
          style={{
            background: "none",
            border: "1px solid var(--border)",
            borderRadius: "var(--r)",
            color: "var(--muted)",
            cursor: "pointer",
            padding: "12px 24px",
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
          }}
        >
          {theme === "dark" ? (
            <>
              <Sun aria-hidden style={{ width: "15px", height: "15px" }} /> Light Mode
            </>
          ) : (
            <>
              <Moon aria-hidden style={{ width: "15px", height: "15px" }} /> Dark Mode
            </>
          )}
        </button>
      </div>

      <Terminal
        open={termOpen}
        onClose={() => setTermOpen(false)}
        theme={theme}
        onTheme={applyTheme}
      />

      {/* Back to top */}
      <button
        className={`back-to-top${showTop ? "" : " hidden"}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        title="Back to top"
      >
        <ArrowUp aria-hidden style={{ width: "16px", height: "16px" }} />
      </button>
    </>
  );
}
