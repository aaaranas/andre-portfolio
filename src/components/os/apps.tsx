"use client";
/**
 * The applications.
 *
 * Only the home screen ships with the shell. Every other app is its own chunk,
 * fetched when it is opened — and a beat earlier, when the pointer or focus
 * reaches its launcher entry, so the wait is rarely seen.
 */
import { useState } from "react";
import dynamic from "next/dynamic";
import { personal } from "@/lib/data/personal";
import type { Summary } from "@/lib/summary";

export type AppProps = { launch: (id: AppId) => void; summary: Summary };

export const APP_IDS = ["readme", "work", "experience", "background", "shell", "contact"] as const;
export type AppId = (typeof APP_IDS)[number];
export function isAppId(v: string): v is AppId {
  return (APP_IDS as readonly string[]).includes(v);
}

/* ── chunk loaders: one place, used for both rendering and prefetching ── */
const load = {
  builds: () => import("../Projects"),
  data: () => import("../DataAnalystSection"),
  automation: () => import("../AutomationSection"),
  experience: () => import("../ExperienceSection"),
  education: () => import("../Education"),
  skills: () => import("../Skills"),
  certifications: () => import("../CertificationsSection"),
  contact: () => import("../Contact"),
  shell: () => import("../Terminal"),
};

function Loading({ what }: { what: string }) {
  return (
    <p className="win-loading" role="status">
      <span aria-hidden>$</span> loading {what} <span className="boot-caret" aria-hidden>_</span>
    </p>
  );
}

const ProjectsGrid = dynamic(load.builds, { loading: () => <Loading what="~/work/builds" /> });
const DataGrid = dynamic(load.data, { loading: () => <Loading what="~/work/data" /> });
const AutomationGrid = dynamic(load.automation, { loading: () => <Loading what="~/work/automation" /> });
const ExperienceList = dynamic(load.experience, { loading: () => <Loading what="~/experience" /> });
const EducationBlock = dynamic(load.education, { loading: () => <Loading what="education" /> });
const SkillsBlock = dynamic(load.skills, { loading: () => <Loading what="stack" /> });
const CertificationsBlock = dynamic(load.certifications, { loading: () => <Loading what="certifications" /> });
const ContactForm = dynamic(load.contact, { loading: () => <Loading what="~/contact" /> });
const Shell = dynamic(load.shell, { loading: () => <Loading what="ama-shell" /> });

/** Warm an app's chunk before it is opened. Safe to call repeatedly. */
export function prefetch(id: AppId) {
  const jobs: Record<AppId, (() => Promise<unknown>)[]> = {
    readme: [],
    work: [load.builds],
    experience: [load.experience],
    background: [load.education, load.skills, load.certifications],
    shell: [load.shell],
    contact: [load.contact],
  };
  for (const job of jobs[id]) void job().catch(() => {});
}

/* ── home ── */
function Readme({ launch, summary }: AppProps) {
  const { counts, running, pinned } = summary;
  const stats: [number | string, string][] = [
    [counts.builds, "builds"],
    [counts.deployed, "deployed"],
    [counts.rolesRunning, "roles running"],
    [counts.credentials, "credentials"],
    ["2027", "expected grad"],
  ];

  return (
    <div className="home">
      <p className="home-lede">{personal.bio}</p>

      <dl className="home-stats">
        {stats.map(([v, l]) => (
          <div key={l}>
            <dt>{v}</dt>
            <dd>{l}</dd>
          </div>
        ))}
      </dl>

      <div className="home-grid">
        <section aria-labelledby="home-running">
          <h2 id="home-running" className="home-h">running now</h2>
          <ul className="home-list">
            {running.map((r) => (
              <li key={r.company + r.role}>
                <button onClick={() => launch("experience")} onPointerEnter={() => prefetch("experience")}>
                  <span className="home-pid" aria-hidden />
                  <span className="home-main">
                    <strong>{r.role}</strong>
                    <span>{r.company} · {r.type} · since {r.since}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="home-pinned">
          <h2 id="home-pinned" className="home-h">pinned builds</h2>
          <ul className="home-list">
            {pinned.map((p, i) => (
              <li key={p.id}>
                <button onClick={() => launch("work")} onPointerEnter={() => prefetch("work")}>
                  <span className="home-n" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                  <span className="home-main">
                    <strong>{p.name}</strong>
                    <span>{p.tagline}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className="home-note">{personal.availability.note}</p>

      <div className="home-jump">
        <button onClick={() => launch("work")} onPointerEnter={() => prefetch("work")}>open ~/work →</button>
        <button onClick={() => launch("shell")} onPointerEnter={() => prefetch("shell")}>open ~/shell →</button>
        <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer">{personal.github} ↗</a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">résumé ↗</a>
      </div>
    </div>
  );
}

/* ── work: three collections, one at a time ── */
type Collection = "builds" | "data" | "automation";

function Work({ summary }: AppProps) {
  const [tab, setTab] = useState<Collection>("builds");
  const collections: { id: Collection; count: number; blurb: string }[] = [
    { id: "builds", count: summary.counts.builds,
      blurb: "Public repositories. Click a card to expand it — previews link to the deployed site." },
    { id: "data", count: summary.counts.analyses,
      blurb: "Python spatial analysis and cohort modelling. Each opens as a runnable notebook." },
    { id: "automation", count: summary.counts.workflows,
      blurb: "n8n orchestrations with Gemini agents. Open one to walk the nodes and run the simulator." },
  ];
  const current = collections.find((c) => c.id === tab)!;

  return (
    <>
      <div className="seg" role="tablist" aria-label="Work collections">
        {collections.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={tab === c.id}
            className={`seg-btn${tab === c.id ? " is-on" : ""}`}
            onClick={() => setTab(c.id)}
            onPointerEnter={() => void load[c.id]().catch(() => {})}
            onFocus={() => void load[c.id]().catch(() => {})}
          >
            {c.id} <span>{c.count}</span>
          </button>
        ))}
      </div>
      <p className="win-blurb">{current.blurb}</p>
      {tab === "builds" && <ProjectsGrid />}
      {tab === "data" && <DataGrid />}
      {tab === "automation" && <AutomationGrid />}
    </>
  );
}

/* ── background: school, stack, credentials ── */
function Background() {
  return (
    <div className="bg-stack">
      <section>
        <h2 className="win-h2">Education</h2>
        <EducationBlock />
      </section>
      <section>
        <h2 className="win-h2">Tech stack</h2>
        <SkillsBlock />
      </section>
      <section>
        <h2 className="win-h2">Certifications</h2>
        <CertificationsBlock />
      </section>
    </div>
  );
}

export const APPS: {
  id: AppId;
  label: string;
  title: string;
  hint: (s: Summary) => string;
  content: (p: AppProps) => React.ReactNode;
}[] = [
  { id: "readme", label: "readme", title: "~/readme", hint: () => "start here", content: Readme },
  { id: "work", label: "work", title: "~/work",
    hint: (s) => `${s.counts.builds} builds · ${s.counts.analyses + s.counts.workflows} more`, content: Work },
  { id: "experience", label: "experience", title: "~/experience",
    hint: (s) => `${s.counts.roles} roles · ${s.counts.rolesRunning} running`, content: () => <ExperienceList /> },
  { id: "background", label: "background", title: "~/background",
    hint: () => "school · stack · certs", content: Background },
  { id: "shell", label: "shell", title: "~/ama — ama-shell",
    hint: () => "run commands", content: () => <Shell embedded /> },
  { id: "contact", label: "contact", title: "~/contact", hint: () => "say hello", content: () => <ContactForm /> },
];
