/**
 * What the shell needs to know about the portfolio, and nothing more.
 *
 * Computed on the server and handed to the desktop as a prop. The shell shows
 * counts in its boot log and launcher and a few headline rows on the home
 * screen; importing the full data modules into the client just to call
 * `.length` on them was costing every visitor the notebooks, the workflow
 * fixtures and all six project write-ups before they had opened a window.
 */
import {
  projects, experience, allRoles, certifications,
  dataAnalystProjects, automationProjects,
} from "./data";

export type Summary = {
  counts: {
    builds: number;
    deployed: number;
    employers: number;
    roles: number;
    rolesRunning: number;
    credentials: number;
    analyses: number;
    workflows: number;
    technologies: number;
  };
  /** Roles held right now, newest first. */
  running: { role: string; company: string; type: string; since: string }[];
  /** The builds worth seeing first. */
  pinned: { id: string; name: string; tagline: string; category: string }[];
};

export function getSummary(): Summary {
  return {
    counts: {
      builds: projects.length,
      deployed: projects.filter((p) => p.live).length,
      employers: experience.length,
      roles: allRoles.length,
      rolesRunning: allRoles.filter((r) => r.current).length,
      credentials: certifications.length,
      analyses: dataAnalystProjects.length,
      workflows: automationProjects.length,
      technologies: new Set(projects.flatMap((p) => p.stack)).size,
    },
    running: experience.flatMap((c) =>
      c.roles
        .filter((r) => r.current)
        .map((r) => ({
          role: r.role,
          company: c.company.replace(/^Freelance · /, ""),
          type: r.type,
          since: r.period.split(" · ")[0],
        })),
    ),
    pinned: projects.slice(0, 3).map((p) => ({
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      category: p.category,
    })),
  };
}
