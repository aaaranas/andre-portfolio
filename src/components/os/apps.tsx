"use client";
/**
 * The applications.
 *
 * Each one wraps content that already existed as a page section. The grids and
 * blocks were stripped of their own headers in an earlier refactor, so they
 * drop into a window unchanged — the shell supplies the chrome.
 */
import { useState } from "react";
import {
  personal, projects, dataAnalystProjects, automationProjects,
  experience, allRoles, certifications,
} from "@/lib/data";
import ProjectsGrid from "../Projects";
import DataGrid from "../DataAnalystSection";
import AutomationGrid from "../AutomationSection";
import ExperienceList from "../ExperienceSection";
import EducationBlock from "../Education";
import SkillsBlock from "../Skills";
import CertificationsBlock from "../CertificationsSection";
import ContactForm from "../Contact";
import Shell from "../Terminal";

export type AppProps = { launch: (id: AppId) => void };

export const APP_IDS = ["readme", "work", "experience", "background", "shell", "contact"] as const;
export type AppId = (typeof APP_IDS)[number];
export function isAppId(v: string): v is AppId {
  return (APP_IDS as readonly string[]).includes(v);
}

/* ── readme ── */
function Readme({ launch }: AppProps) {
  const deployed = projects.filter((p) => p.live).length;
  const stats: [string, string][] = [
    [String(projects.length), "builds"],
    [String(deployed), "deployed"],
    [String(allRoles.filter((r) => r.current).length), "roles running"],
    [String(certifications.length), "credentials"],
    ["2027", "expected grad"],
  ];
  return (
    <div className="rd">
      <p className="rd-lede">{personal.bio}</p>

      <dl className="rd-stats">
        {stats.map(([v, l]) => (
          <div key={l}>
            <dt>{v}</dt>
            <dd>{l}</dd>
          </div>
        ))}
      </dl>

      <p className="rd-note">{personal.availability.note}</p>

      <div className="rd-jump">
        <button onClick={() => launch("work")}>open /work →</button>
        <button onClick={() => launch("shell")}>open /shell →</button>
        <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer">
          {personal.github} ↗
        </a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          résumé ↗
        </a>
      </div>
    </div>
  );
}

/* ── work: three collections, one at a time ── */
const COLLECTIONS = [
  { id: "builds", label: "builds", count: projects.length,
    blurb: "Public repositories. Click a card to expand it — previews link to the deployed site." },
  { id: "data", label: "data", count: dataAnalystProjects.length,
    blurb: "Python spatial analysis and cohort modelling. Each opens as a runnable notebook." },
  { id: "automation", label: "automation", count: automationProjects.length,
    blurb: "n8n orchestrations with Gemini agents. Open one to walk the nodes and run the simulator." },
] as const;

function Work() {
  const [tab, setTab] = useState<(typeof COLLECTIONS)[number]["id"]>("builds");
  const current = COLLECTIONS.find((c) => c.id === tab)!;
  return (
    <>
      <div className="seg" role="tablist" aria-label="Work collections">
        {COLLECTIONS.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={tab === c.id}
            className={`seg-btn${tab === c.id ? " is-on" : ""}`}
            onClick={() => setTab(c.id)}
          >
            {c.label} <span>{c.count}</span>
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

/* ── shell: the terminal, now a first-class app rather than an overlay ── */
function ShellApp() {
  return <Shell embedded />;
}

export const APPS: {
  id: AppId;
  label: string;
  title: string;
  hint: string;
  content: (p: AppProps) => React.ReactNode;
}[] = [
  { id: "readme", label: "readme", title: "~/readme", hint: "start here", content: Readme },
  { id: "work", label: "work", title: "~/work", hint: `${projects.length} builds`, content: Work },
  { id: "experience", label: "experience", title: "~/experience",
    hint: `${experience.length} employers`, content: ExperienceList },
  { id: "background", label: "background", title: "~/background", hint: "school · stack · certs", content: Background },
  { id: "shell", label: "shell", title: "~/ama — ama-shell", hint: "run commands", content: ShellApp },
  { id: "contact", label: "contact", title: "~/contact", hint: "say hello", content: ContactForm },
];
