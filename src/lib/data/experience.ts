/** One role. A company may hold several of them. */
export type ExperienceRole = {
  role: string;
  period: string;
  type: string;
  location: string;
  current: boolean;
  highlights: string[];
};

/**
 * Roles are grouped under their employer rather than listed flat, so a second
 * role at the same company reads as a promotion rather than a separate job.
 */
export type ExperienceEntry = {
  company: string;
  span: string;
  /** Set when one engagement became another, e.g. an internship converting to contract work. */
  progression?: string[];
  roles: ExperienceRole[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "eComia",
    span: "Jun 2026 · Present",
    /** Reads left to right in the company header: where the engagement started, where it is now. */
    progression: ["Internship", "Project-Based"],
    roles: [
      {
        role: "Web Developer",
        period: "Sep 2026 · Present",
        type: "Project-Based",
        location: "Cebu City, PH · Hybrid",
        current: true,
        highlights: [
          "Co-lead architecture and full-stack delivery of two internal web and mobile systems in a three-engineer team, from planning through deployment.",
          "Refactored legacy codebases into a cross-platform mobile scanner with offline sync, paired with a web portal for real-time tracking.",
          "Engineered a high-availability web platform with real-time data sync, dynamic visual feedback, and background processing for automated distribution.",
        ],
      },
      {
        role: "Web Developer",
        period: "Jun 2026 · Aug 2026",
        type: "Internship",
        location: "Cebu City, PH",
        current: false,
        highlights: [
          "Project manager on two internal systems, leading a five-person team from planning through delivery.",
          "Set the frontend architecture and authentication layer on a company resource-tracking platform, delegating feature work while holding review and architecture decisions.",
          "Coordinated a real-time check-in system spanning a live display, a mobile scanner, and an admin panel on one shared backend — and built the display myself.",
        ],
      },
    ],
  },
  {
    company: "FlyRank AI",
    span: "Jul 2026 · Present",
    roles: [
      {
        role: "Front-End AI Engineering Intern",
        period: "Jul 2026 · Present",
        type: "Internship",
        location: "Remote",
        current: true,
        highlights: [
          "Building front-end interfaces for AI workflows and wiring generative model capabilities into production React/Next.js systems.",
          "Focused on front-end AI engineering — streaming output, tool-call state, and the UI patterns that make model behaviour legible.",
        ],
      },
    ],
  },
  {
    company: "Freelance · Upwork",
    span: "Aug 2024 · Present",
    roles: [
      {
        role: "Software Developer",
        period: "Aug 2024 · Present",
        type: "Freelance",
        location: "Cebu City, PH · Remote",
        current: true,
        highlights: [
          "Web and mobile developer for Cebu-based clients and civic projects, scoping and shipping each build solo.",
          "Built a province-wide multimodal transport planner for Cebu with Next.js and MapLibre GL.",
          "Built a crowdsourced Flutter app mapping bidet locations across Cebu, backed by Supabase.",
          "Built a portfolio and booking site with a private photo CMS for a Cebu event photographer.",
        ],
      },
    ],
  },
  {
    company: "University of San Carlos",
    span: "Jun 2019 · Jul 2019",
    roles: [
      {
        role: "Electronics & Communications Engineering Intern",
        period: "Jun 2019 · Jul 2019",
        type: "Research Internship",
        location: "Cebu City, PH",
        current: false,
        highlights: [
          "Two-month research immersion in electronics and IoT — Arduino prototyping and sensor integration.",
          "Contributed to SIMOY, an air-quality monitor for communities near landfill sites that earned a Philippine industrial design patent (PH32020050104) and an International Award of Merit at the Malaysia Technology Expo.",
        ],
      },
    ],
  },
];

/** Flattened view for counts and the shell's listings. */
export const allRoles: ExperienceRole[] = experience.flatMap((e) => e.roles);
