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
 *      asked for reduced motion. Any key or click skips it. It is CSS on
 *      server-rendered markup, started by the pre-paint script, so it plays
 *      while the JavaScript loads instead of queueing up behind it.
 *   2. One app fills the pane at a time. Stacking long windows in a scroll
 *      column would rebuild the endless page this replaced.
 *   3. The location hash *is* the window state, so every app is a shareable
 *      link and back/forward move between them for free.
 */
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { personal } from "@/lib/data/personal";
import type { Summary } from "@/lib/summary";
import { APPS, type AppId, isAppId, prefetch } from "./apps";
import { useTheme } from "./useTheme";
import Mark from "../ui/mark";

const bootLines = (s: Summary) => [
  "GRUB loading stage2 ...",
  "multiboot header ok · i386 protected mode",
  "GDT 5 entries · IDT 256 entries · PIC remapped 32–47",
  "PS/2 keyboard attached on IRQ1",
  `mounting /dev/portfolio · ${s.counts.builds} builds · ${s.counts.roles} roles · ${s.counts.credentials} credentials`,
  "starting ama-shell ...",
];

/*
 * The splash belongs to the inline script in layout.tsx: it decides before
 * first paint, sets data-boot on <html>, and clears it on a timer or on the
 * first key or click. The stylesheet animates everything off that attribute.
 * React only reads it, to hold keyboard shortcuts until the desktop is up.
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

export default function Desktop({ summary }: { summary: Summary }) {
  const BOOT_LINES = useMemo(() => bootLines(summary), [summary]);
  const hash = useSyncExternalStore(subscribeHash, readHash, () => "");
  const active: AppId = isAppId(hash) ? hash : "readme";

  // The desktop always renders, so a crawler is never served only a splash.
  const booting = useSyncExternalStore(subscribeBoot, readBoot, () => false);
  const [visited, setVisited] = useState<AppId[]>([]);
  const [clock, setClock] = useState("");
  const pane = useRef<HTMLElement>(null);
  const launcher = useRef<HTMLElement>(null);
  const firstPaint = useRef(true);
  const { theme, toggle } = useTheme();

  const opened = useMemo(
    () => Array.from(new Set<AppId>(["readme", ...visited, active])),
    [visited, active],
  );

  const launch = useCallback((id: AppId) => {
    setVisited((v) => (v.includes(id) ? v : [...v, id]));
    // Assigning the hash fires hashchange, which drives the store above.
    if (readHash() !== id) window.location.hash = id;
  }, []);

  const quit = useCallback((id: AppId) => {
    setVisited((v) => v.filter((x) => x !== id));
    if (readHash() === id) window.location.hash = "readme";
  }, []);

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

  /* ── switching apps is a navigation: land focus in the new content ── */
  useEffect(() => {
    if (firstPaint.current) {
      firstPaint.current = false;
      return;
    }
    // The shell focuses its own prompt when it mounts.
    if (active !== "shell") pane.current?.focus({ preventScroll: true });
  }, [active]);

  /* ── on a phone the launcher is a scrolling strip: keep the open app's tab in view ── */
  useEffect(() => {
    launcher.current
      ?.querySelector(".is-active")
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active]);

  /* ── once the page is idle, warm the app most visitors open next ── */
  useEffect(() => {
    if (booting) return;
    const warm = () => prefetch("work");
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(warm, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(warm, 2500);
    return () => clearTimeout(id);
  }, [booting]);

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

  return (
    <>
      {/* Decorative, and already in the server HTML so it can paint before any
          script runs. Hidden unless the pre-paint script set data-boot. */}
      <div className="boot" aria-hidden="true">
        <pre className="boot-log">
          {BOOT_LINES.map((l, i) => (
            <div key={i} style={{ animationDelay: `${i * 0.13}s` }}>
              <span className="boot-ok">[ ok ]</span> {l}
            </div>
          ))}
          <span className="boot-caret">_</span>
        </pre>
        <p className="boot-skip">press any key to skip</p>
      </div>

    <div className="desk">
      <header className="desk-bar">
        <span className="desk-brand">AMA&#8209;OS</span>
        <span className="desk-sep">·</span>
        <span className="desk-name">{personal.name}</span>
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
        <nav className="desk-launcher" aria-label="Applications" ref={launcher}>
          <ul>
            {APPS.map((a, i) => {
              const isActive = a.id === active;
              return (
                <li key={a.id}>
                  <button
                    className={`desk-app${isActive ? " is-active" : ""}`}
                    onClick={() => launch(a.id)}
                    onPointerEnter={() => prefetch(a.id)}
                    onFocus={() => prefetch(a.id)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="desk-app-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="desk-app-text">
                      <span className="desk-app-label">{a.label}</span>
                      <span className="desk-app-hint">{a.hint(summary)}</span>
                    </span>
                    {opened.includes(a.id) && <span className="desk-app-dot" aria-hidden />}
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="desk-launcher-foot">
            <kbd>/</kbd> shell · <kbd>1</kbd>–<kbd>{APPS.length}</kbd> switch
          </p>
        </nav>

        <main className="desk-pane" id="pane" ref={pane} tabIndex={-1}>
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
              <Content launch={launch} summary={summary} />
            </div>
          </article>
        </main>
      </div>
    </div>
    </>
  );
}
