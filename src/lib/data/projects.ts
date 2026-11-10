export type ProjectCategory = "Product" | "Civic Tech" | "Client" | "Systems";

export type Project = {
  id: string;
  name: string;
  repo: string;
  category: ProjectCategory;
  tagline: string;
  description: string;
  metrics: string[];
  stack: string[];
  role: string;
  highlight: string;
  github: string;
  live: string;
};

/**
 * Every entry below maps 1:1 to a public repository on github.com/aaaranas.
 * Stacks are read off each repo's package.json / pubspec.yaml, not from memory.
 */
export const projects: Project[] = [
  {
    id: "pitik",
    name: "Pitik",
    repo: "aaaranas/pitik",
    category: "Product",
    tagline: "A digital camera that lives in the browser — 37 looks, nothing uploaded",
    description:
      "A nostalgic digital camera and photobooth PWA built to be opened during a moment rather than after it: you name the moment, shoot a roll into it, and the frames stay on your device. The filter engine treats looks as data — a preset is a plain object, so adding one never touches a component — and every one of the 37 presets is covered by a test proving it is visibly distinct from Natural. IndexedDB owns every photo; Supabase only mirrors, and only if you sign in. Camera capability (torch, zoom, manual focus) is feature-detected per device instead of assumed, so a control that cannot work is never shown.",
    metrics: [
      "37 filter presets, each test-verified distinct",
      "100% on-device storage — IndexedDB is the source of truth",
      "Vitest unit suite + Playwright E2E against real capture",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS 4",
      "IndexedDB",
      "Canvas API",
      "Supabase",
      "PWA",
      "Vitest",
      "Playwright",
    ],
    role: "Solo Dev",
    highlight: "Local-first PWA",
    github: "https://github.com/aaaranas/pitik",
    live: "https://pitik-orcin.vercel.app",
  },
  {
    id: "frag-avenue",
    name: "Frag Avenue",
    repo: "aaaranas/frag-avenue",
    category: "Product",
    tagline: "Explainable fragrance analytics — every recommendation shows its work",
    description:
      "A fragrance wardrobe and personal analytics PWA running one loop: collect, wear, record, learn, recommend. The differentiator is not another collection tracker — it is turning longitudinal wear data into intelligence you can audit. The advisor scores each bottle across five sub-scores with a cold-start path and user-tunable weights, and every recommendation decomposes into named reasons derived from real numbers: no LLM narration, no fabricated precision. Weather auto-fills from Open-Meteo on each wear entry and every field stays overridable. Modular monolith on Prisma + Postgres — no Redis, no microservices, none needed.",
    metrics: [
      "5 weighted sub-scores behind every suggestion",
      "242 unit tests + 37 Playwright tests, all green",
      "CI: typecheck / lint / unit / E2E with a Postgres service container",
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "PostgreSQL 16",
      "Prisma 6",
      "Auth.js v5",
      "Zod",
      "Tailwind CSS 4",
      "Vitest",
      "Playwright",
    ],
    role: "Solo Dev",
    highlight: "279 tests green",
    github: "https://github.com/aaaranas/frag-avenue",
    live: "https://frag-avenue.vercel.app",
  },
  {
    id: "komyut-ta-bai",
    name: "Komyut ta Bai",
    repo: "aaaranas/komyut-ta-bai",
    category: "Civic Tech",
    tagline: "The transit planner Cebu never had — Google Maps has zero coverage here",
    description:
      "Enter an origin and a destination — Argao to Santa Fe on Bantayan Island, say — and get a multi-leg journey plan: which buses, v-hires, jeepneys and ferries to take, where to transfer, total fare, total travel time. Covers the southern corridor into Cebu South Bus Terminal, the northern corridor out to Hagnaya port, and the island ferries to Bantayan and Camotes. The ~60 Metro Cebu jeepney routes are scraped and geocoded through OSM Nominatim, and they are flagged unverified everywhere they surface — approximated fares should not be dressed up as facts. Routing is Dijkstra over an in-memory transit graph: no backend, no API calls, fully offline after the first visit.",
    metrics: [
      "~60 jeepney routes + provincial bus and ferry links",
      "Dijkstra planner, 100% client-side",
      "Dataset integrity checks run on every change",
    ],
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS 4",
      "MapLibre GL",
      "OpenStreetMap",
      "Serwist",
      "PWA",
    ],
    role: "Solo Dev",
    highlight: "WIP · Civic tech",
    github: "https://github.com/aaaranas/komyut-ta-bai",
    live: "https://komyut-ta-bai.vercel.app",
  },
  {
    id: "irregskolar",
    name: "IrregSkolar",
    repo: "aaaranas/irregskolar",
    category: "Product",
    tagline: "Upload your study plan, see exactly what you can enroll in next",
    description:
      "Being an irregular student means hand-juggling prerequisites, and the source of truth is a PDF nobody can query. IrregSkolar parses that study plan with pdf.js, tracks what you have passed, and computes which subjects you are eligible for — ranked by how many downstream subjects each one unlocks, so the highest-leverage course is at the top. Ships an interactive prerequisite graph in React Flow, a drag-to-plan semester builder, GPA and final-grade calculators, and full dark mode. Per-student isolation is enforced in the database with Supabase row-level security rather than trusted to the client.",
    metrics: [
      "Eligibility ranked by downstream unlock impact",
      "RLS-enforced per-student records",
      "Curriculum imported straight from a study-plan PDF",
    ],
    stack: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL + RLS",
      "React Flow",
      "pdf.js",
    ],
    role: "Solo Dev",
    highlight: "Student tool",
    github: "https://github.com/aaaranas/irregskolar",
    live: "https://irregskolar.vercel.app",
  },
  {
    id: "san-bidet-cebu",
    name: "San Bidet Cebu",
    repo: "aaaranas/san-bidet-cebu",
    category: "Civic Tech",
    tagline: "Crowdsourcing clean bidets across Cebu, one spray at a time",
    description:
      "A community-driven Flutter app that maps bidet locations across Cebu sorted by proximity. Contributors submit locations with photos and rate them across four axes — cleanliness, pressure, accessibility, privacy — and nothing reaches the public map until it clears an admin moderation queue, which is the part that keeps the dataset trustworthy. Handles the three real-world fixtures here (spray hose, tabo, bidet seat), exports GIS data for researchers and urban planners looking at sanitation infrastructure, and builds for iOS, Android, macOS, Linux, Windows and Web from a single codebase.",
    metrics: [
      "4-axis community rating system",
      "Pending-to-approved moderation workflow",
      "One Dart codebase, six build targets",
    ],
    stack: [
      "Flutter",
      "Dart",
      "Supabase",
      "PostgreSQL",
      "flutter_map",
      "geolocator",
      "go_router",
    ],
    role: "Sole Full Stack",
    highlight: "Flutter · 6 platforms",
    github: "https://github.com/aaaranas/san-bidet-cebu",
    live: "https://san-bidet-cebu-admin.vercel.app",
  },
  {
    id: "dugos",
    name: "DugOS",
    repo: "aaaranas/DugOS",
    category: "Systems",
    tagline: "A 32-bit operating system booted from scratch — no host OS, no libc",
    description:
      "A freestanding x86 operating system for CMSC 125 that boots directly through GRUB 2 into 32-bit protected mode and takes full control of the hardware. Sets up a 5-entry GDT and a 256-entry IDT, handles CPU exceptions 0–31, remaps the 8259A PIC so hardware IRQs land on vectors 32–47, and drives a PS/2 keyboard off IRQ1 through a scan-code ring buffer into an interactive shell with line editing and hardware VGA cursor tracking. Implements the MINIX 3.1.0 boot sequence and an in-memory FAT file system with linked allocation — fwrite, fread, fedit, fdel, rename, copy — plus directory operations and a graceful ACPI power-off. Built with a team of four.",
    metrics: [
      "Boots bare metal in QEMU via GRUB 2 Multiboot",
      "GDT + 256-entry IDT + 8259A PIC remap",
      "FAT file system and shell written from scratch",
    ],
    stack: [
      "C (freestanding)",
      "NASM x86",
      "GNU Make",
      "GRUB 2 Multiboot",
      "QEMU",
      "i386 protected mode",
    ],
    role: "Team of 4",
    highlight: "Bare metal",
    github: "https://github.com/aaaranas/DugOS",
    live: "",
  },
];

/** Categories that actually have projects — drives the filter row. */
export const projectCategories: ProjectCategory[] = Array.from(
  new Set(projects.map((p) => p.category)),
);
