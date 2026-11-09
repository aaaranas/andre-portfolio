"use client";
import { useState } from "react";
import { projects, dataAnalystProjects, automationProjects } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import ProjectsGrid from "./Projects";
import DataGrid from "./DataAnalystSection";
import AutomationGrid from "./AutomationSection";

/**
 * One body of work, three collections.
 *
 * These used to be three full-page sections stacked on top of each other, which
 * put roughly 3,800px between the hero and the first job. Showing one at a time
 * behind a switcher keeps every card and every modal while giving the page back
 * about two thirds of that height.
 */
const COLLECTIONS = [
  {
    id: "builds",
    label: "builds",
    count: projects.length,
    blurb: (
      <>
        Every one is a public repository on{" "}
        <a
          href="https://github.com/aaaranas"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent)" }}
        >
          github.com/aaaranas
        </a>
        . Click a card to expand it — previews link to the deployed site.
      </>
    ),
  },
  {
    id: "data",
    label: "data",
    count: dataAnalystProjects.length,
    blurb: (
      <>
        Python spatial analysis, cohort modelling and exploratory work. Each one opens as a
        runnable Jupyter notebook, cells and outputs intact.
      </>
    ),
  },
  {
    id: "automation",
    label: "automation",
    count: automationProjects.length,
    blurb: (
      <>
        n8n orchestrations with Gemini agents, tool-calling and webhook routing. Open one to
        walk the nodes and run the execution simulator.
      </>
    ),
  },
] as const;

type CollectionId = (typeof COLLECTIONS)[number]["id"];

export default function Work() {
  const [active, setActive] = useState<CollectionId>("builds");
  const current = COLLECTIONS.find((c) => c.id === active)!;

  return (
    <section id="work" className="s-pad" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <ScrollReveal>
        <div className="section-label" style={{ marginBottom: "16px" }}>
          01 / work
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 600,
            marginBottom: "18px",
          }}
        >
          Things I&apos;ve Built
        </h2>
      </ScrollReveal>

      {/* ── collection switcher ── */}
      <ScrollReveal delay={60}>
        <div
          role="tablist"
          aria-label="Work collections"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
            borderBottom: "1px solid var(--border)",
            marginBottom: "22px",
          }}
        >
          {COLLECTIONS.map((c) => {
            const on = c.id === active;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={on}
                data-hover
                onClick={() => setActive(c.id)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  padding: "10px 16px",
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  borderBottom: `2px solid ${on ? "var(--accent)" : "transparent"}`,
                  color: on ? "var(--accent)" : "var(--muted)",
                  fontWeight: on ? 700 : 400,
                  marginBottom: "-1px",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {c.label} <span style={{ opacity: 0.55 }}>{c.count}</span>
              </button>
            );
          })}
        </div>

        <p
          style={{
            color: "var(--muted)",
            fontSize: "15px",
            lineHeight: 1.7,
            maxWidth: "620px",
            marginBottom: "40px",
          }}
        >
          {current.blurb}
        </p>
      </ScrollReveal>

      {active === "builds" && <ProjectsGrid />}
      {active === "data" && <DataGrid />}
      {active === "automation" && <AutomationGrid />}
    </section>
  );
}
