"use client";
import { useCallback, useState } from "react";
import Image from "next/image";
import { PREVIEWS } from "@/lib/previews";
import { projects, type Project } from "@/lib/data/projects";
import ScrollReveal from "./ScrollReveal";
import Mark from "./ui/mark";

/** The window chrome both previews share. */
function Chrome({ label }: { label: string }) {
  return (
    <span className="pv-bar">
      <span className="pv-dots" aria-hidden="true">
        <i /><i /><i />
      </span>
      <span className="pv-url">{label}</span>
      <Mark name="external" size={11} color="var(--accent)" />
    </span>
  );
}

/* ── the deployed site, in a browser frame ── */
function BrowserPreview({ project }: { project: Project }) {
  const { id, live: url, name } = project;
  const host = url.replace("https://", "");
  /**
   * A title card is always painted, and a screenshot fades in over it once
   * one has actually loaded. So a slow capture, a blocked request and a dead
   * screenshot service all look the same: a finished card, never a hole.
   *
   *   local  — our own capture, if the manifest says one exists. Asking the
   *            manifest first means an uncaptured project costs no request.
   *   remote — the hosted screenshot service, as a stand-in until captured.
   *   none   — the title card alone.
   */
  const local = PREVIEWS[id];
  const [stage, setStage] = useState<"local" | "remote" | "none">(local ? "local" : "remote");
  const [loaded, setLoaded] = useState(false);

  /**
   * The server renders the remote <img>, so the browser can finish loading or
   * failing it before React hydrates and a handler exists to hear about it.
   * The ref runs on commit and settles that already-decided case.
   */
  const settle = useCallback((el: HTMLImageElement | null) => {
    if (!el || !el.complete) return;
    if (el.naturalWidth === 0) setStage("none");
    else setLoaded(true);
  }, []);

  const shot = `pv-shot${loaded ? " is-in" : ""}`;

  return (
    <a
      className="pv"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      <Chrome label={host} />
      <span className="pv-screen">
        <span className="pv-poster" aria-hidden="true">
          <span className="pv-poster-kicker">{project.category}</span>
          <span className="pv-poster-name">{name}</span>
          <span className="pv-poster-foot">{host}</span>
        </span>

        {stage === "local" && local && (
          <Image
            className={shot}
            src={local.src}
            width={local.width}
            height={local.height}
            alt=""
            sizes="(max-width: 820px) 100vw, 420px"
            onLoad={() => setLoaded(true)}
            onError={() => setStage("remote")}
          />
        )}
        {stage === "remote" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={settle}
            className={shot}
            src={`https://image.thum.io/get/width/800/crop/450/noanimate/allowJPG/${url}`}
            alt=""
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setStage("none")}
          />
        )}

        <span className="pv-open" aria-hidden="true">
          <span>Open site <Mark name="external" size={12} /></span>
        </span>
      </span>
    </a>
  );
}

/* ── stand-in for a project with nothing to deploy: an OS that boots in QEMU ── */
function TerminalPreview({ project }: { project: Project }) {
  return (
    <a
      className="pv"
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      <Chrome label={project.repo} />
      <span className="pv-screen pv-term" aria-hidden="true">
        <span><b>$</b> make &amp;&amp; qemu-system-i386 -kernel dug_os</span>
        <span className="pv-term-ok">[  ok  ] GRUB 2 multiboot handoff</span>
        <span className="pv-term-ok">[  ok  ] protected mode · GDT · IDT</span>
        <span className="pv-term-ok">[  ok  ] 8259A PIC remapped to 32–47</span>
        <span className="pv-term-ok">[  ok  ] PS/2 keyboard · FAT mounted</span>
        <span><b>dugos&gt;</b> _</span>
      </span>
    </a>
  );
}

export default function ProjectsGrid() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="proj-grid">
      {projects.map((proj, i) => {
        const isOpen = expanded === proj.id;
        const toggle = () => setExpanded(isOpen ? null : proj.id);
        const links = [
          { label: "GitHub", href: proj.github },
          { label: "Live", href: proj.live },
        ].filter((l) => l.href);

        return (
          <ScrollReveal key={proj.id} delay={i * 60}>
            {/* The whole card toggles for a pointer; the button in its footer
                is the same control for a keyboard or a screen reader. */}
            <article className={`proj${isOpen ? " is-open" : ""}`} onClick={toggle}>
              {proj.live ? <BrowserPreview project={proj} /> : <TerminalPreview project={proj} />}

              <header className="proj-head">
                <span className="proj-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="proj-name">{proj.name}</h2>
                <span className="proj-chip">{proj.highlight}</span>
                <p className="proj-role">{proj.role} · {proj.category}</p>
              </header>

              <p className="proj-tagline">{proj.tagline}</p>

              <ul className="proj-metrics">
                {proj.metrics.map((m) => (
                  <li key={m}>
                    <Mark name="chevron" size={13} color="var(--accent)" />
                    {m}
                  </li>
                ))}
              </ul>

              {/* Grid rows animate to any height, which max-height cannot. */}
              <div className="proj-more" id={`proj-more-${proj.id}`} aria-hidden={!isOpen}>
                <div>
                  <p>{proj.description}</p>
                </div>
              </div>

              <div className="proj-stack">
                {proj.stack.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>

              <footer className="proj-foot" onClick={(e) => e.stopPropagation()}>
                {links.map((l) => (
                  <a key={l.label} className="proj-link" href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label} <Mark name="external" size={11} />
                  </a>
                ))}
                <button
                  type="button"
                  className="proj-toggle"
                  onClick={toggle}
                  aria-expanded={isOpen}
                  aria-controls={`proj-more-${proj.id}`}
                >
                  {isOpen ? "[ collapse ]" : "[ details ]"}
                </button>
              </footer>
            </article>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
