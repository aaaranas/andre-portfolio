"use client";
/**
 * AMA-OS — the shell.
 *
 * The portfolio runs as an operating system because Andre wrote one: DugOS
 * boots through GRUB into its own shell. The conceit is earned, so it has to
 * behave like a real environment rather than a costume.
 *
 * Three rules keep it usable for someone who only wants to read a CV:
 *   1. The boot sequence runs once per session and never for a visitor who
 *      asked for reduced motion. Any key or click skips it.
 *   2. One app fills the pane at a time. Stacking long windows in a scroll
 *      column would rebuild the endless page this replaced.
 *   3. The location hash *is* the window state, so every app is a shareable
 *      link and back/forward move between them for free.
 */
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { personal, projects, allRoles, certifications } from "@/lib/data";
import { APPS, type AppId, isAppId } from "./apps";
import { useTheme } from "./useTheme";
import Mark from "../ui/mark";

const BOOT_LINES = [
  "GRUB loading stage2 ...",
  "multiboot header ok · i386 protected mode",
  "GDT 5 entries · IDT 256 entries · PIC remapped 32–47",
  "PS/2 keyboard attached on IRQ1",
  `mounting /dev/portfolio · ${projects.length} builds · ${allRoles.length} roles · ${certifications.length} credentials`,
  "starting ama-shell ...",
];

const BOOT_KEY = "ama-booted";

/*
 * Whether to show the splash is decided by the inline script in layout.tsx,
 * before first paint, and recorded as data-boot on <html>. That keeps the
 * decision out of a mount-time setState and out of hydration, and CSS hides
 * the desktop while the attribute is set so nothing flashes behind it.
 */
function subscribeBoot(onChange: () => void) {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-boot"] });
  return () => obs.disconnect();
}
function readBoot() {
  return document.documentElement.hasAttribute("data-boot");
}

/* ── the hash is the window manager's state, read as an external store ── */
function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
function readHash() {
  return window.location.hash.replace("#", "");
}

export default function Desktop() {
  const hash = useSyncExternalStore(subscribeHash, readHash, () => "");
  const active: AppId = isAppId(hash) ? hash : "readme";

  // The desktop always renders, so a crawler is never served only a splash.
  const booting = useSyncExternalStore(subscribeBoot, readBoot, () => false);
  const [line, setLine] = useState(0);
  const [visited, setVisited] = useState<AppId[]>([]);
  const [clock, setClock] = useState("");
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const { theme, toggle } = useTheme();

  const opened = useMemo(
    () => Array.from(new Set<AppId>(["readme", ...visited, active])),
    [visited, active],
  );

  const finishBoot = useCallback(() => {
    if (tick.current) clearInterval(tick.current);
    try { sessionStorage.setItem(BOOT_KEY, "1"); } catch { /* private mode */ }
    document.documentElement.removeAttribute("data-boot");
  }, []);

  const launch = useCallback((id: AppId) => {
    setVisited((v) => (v.includes(id) ? v : [...v, id]));
    // Assigning the hash fires hashchange, which drives the store above.
    if (readHash() !== id) window.location.hash = id;
  }, []);

  const quit = useCallback((id: AppId) => {
    setVisited((v) => v.filter((x) => x !== id));
    if (readHash() === id) window.location.hash = "readme";
  }, []);

  /* ── run the boot log ── */
  useEffect(() => {
    if (!booting) return;
    tick.current = setInterval(() => {
      setLine((n) => {
        if (n < BOOT_LINES.length) return n + 1;
        if (tick.current) clearInterval(tick.current);
        window.setTimeout(finishBoot, 360);
        return n;
      });
    }, 190);
    return () => { if (tick.current) clearInterval(tick.current); };
  }, [booting, finishBoot]);

  /* ── any key or pointer skips the splash ── */
  useEffect(() => {
    if (!booting) return;
    window.addEventListener("keydown", finishBoot);
    window.addEventListener("pointerdown", finishBoot);
    return () => {
      window.removeEventListener("keydown", finishBoot);
      window.removeEventListener("pointerdown", finishBoot);
    };
  }, [booting, finishBoot]);

  /* ── "/" or Cmd-K opens the shell; 1–6 switch apps ── */
  useEffect(() => {
    if (booting) return;
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el instanceof HTMLElement && el.isContentEditable);
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        launch("shell");
        return;
      }
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "/") {
        e.preventDefault();
        launch("shell");
        return;
      }
      const n = Number(e.key);
      if (n >= 1 && n <= APPS.length) {
        e.preventDefault();
        launch(APPS[n - 1].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [booting, launch]);

  /* ── status-bar clock ── */
  useEffect(() => {
    const set = () =>
      setClock(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
    set();
    const id = setInterval(set, 30_000);
    return () => clearInterval(id);
  }, []);

  const App = APPS.find((a) => a.id === active) ?? APPS[0];
  const Content = App.content;

  if (booting) {
    return (
      <main className="boot" aria-label="System starting">
        <pre className="boot-log">
          {BOOT_LINES.slice(0, line).map((l, i) => (
            <div key={i}>
              <span className="boot-ok">[ ok ]</span> {l}
            </div>
          ))}
          <span className="boot-caret">_</span>
        </pre>
        <button className="boot-skip" onClick={finishBoot}>
          press any key to skip
        </button>
      </main>
    );
  }

  return (
    <div className="desk">
      <header className="desk-bar">
        <span className="desk-brand">AMA&#8209;OS</span>
        <span className="desk-sep">·</span>
        <span>{personal.name}</span>
        <span className="desk-spacer" />
        <span className="desk-quiet desk-hide-sm">{personal.subtitle}</span>
        <span className="desk-sep desk-hide-sm">·</span>
        <span className="desk-quiet desk-hide-sm">{personal.availability.label}</span>
        <span className="desk-sep desk-hide-sm">·</span>
        <time className="desk-quiet">{clock || "--:--"}</time>
        <button
          className="desk-theme"
          onClick={toggle}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          <Mark name={theme === "dark" ? "sun" : "moon"} size={13} />
        </button>
      </header>

      <div className="desk-body">
        <nav className="desk-launcher" aria-label="Applications">
          <ul>
            {APPS.map((a, i) => {
              const isActive = a.id === active;
              return (
                <li key={a.id}>
                  <button
                    className={`desk-app${isActive ? " is-active" : ""}`}
                    onClick={() => launch(a.id)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="desk-app-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="desk-app-text">
                      <span className="desk-app-label">{a.label}</span>
                      <span className="desk-app-hint">{a.hint}</span>
                    </span>
                    {opened.includes(a.id) && <span className="desk-app-dot" aria-hidden />}
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="desk-launcher-foot">
            {opened.length} running · <kbd>/</kbd> shell · <kbd>1</kbd>–<kbd>{APPS.length}</kbd> switch
          </p>
        </nav>

        <main className="desk-pane">
          <article className="win" aria-label={App.label}>
            <header className="win-bar">
              <span className="win-dots" aria-hidden>
                <i /><i /><i />
              </span>
              <h1 className="win-title">{App.title}</h1>
              {active !== "readme" && (
                <button className="win-close" onClick={() => quit(App.id)} aria-label={`Quit ${App.label}`}>
                  ×
                </button>
              )}
            </header>
            <div className="win-body" key={App.id}>
              <Content launch={launch} />
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
