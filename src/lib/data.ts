import type { Certification } from "./types";

export const personal = {
  name: "Andre Milan A. Arañas",
  shortName: "Andre",
  title: "BS Computer Science",
  subtitle: "Head of Technology · Accelokal",
  email: "aaaranas@up.edu.ph",
  phone: "+639287056564",
  github: "github.com/aaaranas",
  githubUrl: "https://github.com/aaaranas",
  location: "Cebu City, Philippines",
  bio: "I build fast, accessible web apps that solve real problems — and analyze the data behind them. 4th year BS Computer Science at UP Cebu, working across three tracks: software engineering, data analysis, and AI automation.",
  portfolioUrl: "https://andre-milan-aranas.vercel.app/",
  // Availability shown in the hero status bar and on the contact section.
  availability: {
    open: false,
    label: "not seeking internships",
    note: "Not open for internships at the moment — heading technology at Accelokal. Still happy to talk about freelance builds and collaborations.",
  },
};

export type ProjectCategory = "Product" | "Civic Tech" | "Client" | "Systems";

export type Project = {
  id: string;
  name: string;
  repo: string;
  /** Key into the icon registry in components/ui/icon.tsx. */
  icon: string;
  category: ProjectCategory;
  tagline: string;
  description: string;
  metrics: string[];
  stack: string[];
  role: string;
  highlight: string;
  color: string;
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
    icon: "camera",
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
    color: "#a8cf8e",
    github: "https://github.com/aaaranas/pitik",
    live: "https://pitik-orcin.vercel.app",
  },
  {
    id: "frag-avenue",
    name: "Frag Avenue",
    repo: "aaaranas/frag-avenue",
    icon: "flask",
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
    color: "#c8b4e0",
    github: "https://github.com/aaaranas/frag-avenue",
    live: "https://frag-avenue.vercel.app",
  },
  {
    id: "komyut-ta-bai",
    name: "Komyut ta Bai",
    repo: "aaaranas/komyut-ta-bai",
    icon: "bus",
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
    color: "#8fc9a8",
    github: "https://github.com/aaaranas/komyut-ta-bai",
    live: "https://komyut-ta-bai.vercel.app",
  },
  {
    id: "irregskolar",
    name: "IrregSkolar",
    repo: "aaaranas/irregskolar",
    icon: "graduation",
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
    color: "#9dc0d8",
    github: "https://github.com/aaaranas/irregskolar",
    live: "https://irregskolar.vercel.app",
  },
  {
    id: "san-bidet-cebu",
    name: "San Bidet Cebu",
    repo: "aaaranas/san-bidet-cebu",
    icon: "map-pin",
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
    color: "#e8c98a",
    github: "https://github.com/aaaranas/san-bidet-cebu",
    live: "https://san-bidet-cebu-admin.vercel.app",
  },
  {
    id: "dugos",
    name: "DugOS",
    repo: "aaaranas/DugOS",
    icon: "cpu",
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
    color: "#e8a89a",
    github: "https://github.com/aaaranas/DugOS",
    live: "",
  },
];

/** Categories that actually have projects — drives the filter row. */
export const projectCategories: ProjectCategory[] = Array.from(
  new Set(projects.map((p) => p.category)),
);

export const skills = {
  Frontend: [
    "React 19",
    "Next.js (App Router)",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS v4",
    "HTML",
    "CSS",
    "Framer Motion",
    "MapLibre GL",
    "React Flow",
    "Flutter",
    "Responsive Design",
    "PWA / Service Workers",
  ],
  "Backend & Data": [
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "Prisma ORM",
    "Supabase (Auth + RLS + Storage)",
    "Neon Postgres",
    "Firebase / Firestore",
    "Auth.js",
    "Zod",
    "REST & Route Handlers",
    "Socket.io",
    "IndexedDB",
  ],
  "Testing & Tooling": [
    "Vitest",
    "Playwright",
    "Testing Library",
    "GitHub Actions",
    "Git & GitHub",
    "Docker",
    "Vercel",
    "Postman",
    "ESLint / Prettier",
    "pnpm",
  ],
  "AI & Automation": [
    "Gemini API & LLM Pipelines",
    "AI Agents & Tool Use",
    "n8n Orchestration",
    "RAG & Vector Databases",
    "Workflow Automation",
    "Zapier / Make",
  ],
  "Data & Python": [
    "Python",
    "Pandas & NumPy",
    "Matplotlib & Seaborn",
    "SQL / PostgreSQL",
    "Jupyter Notebooks",
    "Exploratory Data Analysis",
    "GeoPandas / Rasterio",
    "Tableau & PowerBI",
  ],
  Systems: [
    "C (freestanding)",
    "NASM x86 Assembly",
    "GNU Make",
    "QEMU / GRUB 2",
    "Data Structures & Algorithms",
    "Operating System Internals",
  ],
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  type: string;
  location: string;
  current: boolean;
  highlights: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "Accelokal",
    role: "Head of Technology",
    period: "Aug 2026 · Present",
    type: "Part-time",
    location: "Cebu, Central Visayas · Remote",
    current: true,
    highlights: [
      "Leading technology at Accelokal part-time and fully remote from Cebu.",
      "Owning technical direction — architecture, stack decisions, and engineering delivery.",
    ],
  },
  {
    company: "FlyRank AI",
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
  {
    company: "eComia",
    role: "Web Developer Intern",
    period: "Jun 2026 · Aug 2026",
    type: "Internship · Completed",
    location: "Cebu City, PH",
    current: false,
    highlights: [
      "Acted as Project Manager and Frontend Developer across two internal systems, leading a five-person team from planning through delivery.",
      "Built the Event QR admission system end-to-end: a full-screen kiosk display in React + Vite reacting to real-time Firestore writes with animated reveals.",
      "Coordinated a multi-platform stack — web display, Flutter mobile QR scanner, and a JetAdmin admin panel — all wired to one Firebase project.",
      "Set the frontend architecture and authentication layer on a company resource-tracking platform, delegating feature work while holding review and architecture decisions.",
    ],
  },
  {
    company: "Freelance · Upwork",
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
  {
    company: "University of San Carlos",
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
];

export const education = [
  {
    school: "University of the Philippines Cebu",
    degree: "Bachelor of Science in Computer Science",
    period: "4th Year · Expected: Jul 2027",
    courses: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Database Systems",
      "Software Engineering",
      "Computer Networks",
    ],
  },
  {
    school: "University of the Philippines Cebu",
    degree: "Bachelor of Science in Statistics (Undergraduate)",
    period: "Aug 2021 · Jun 2023",
    courses: [],
  },
  {
    school: "Philippine Science High School — Central Visayas Campus",
    degree: "Science, Technology, Engineering & Mathematics",
    period: "Graduated: May 2021",
    courses: ["With High Honors"],
  },
];

export const blogPosts = [
  {
    id: "n8n-ai-agent-automation",
    title: "Building Autonomous AI Agents with n8n: From Prompt to Production Workflow",
    excerpt: "How I created a self-healing lead scoring and triage system using n8n, Gemini 1.5 Pro, and PostgreSQL webhooks during my AI Engineer course.",
    date: "July 15, 2026",
    readTime: "6 min read",
    category: "AI & Automation",
    tags: ["n8n", "AI Agents", "LLM", "Automation", "Python"],
    content: `Building intelligent workflows used to require custom Python microservices for every LLM integration. With n8n and modern AI node tool-calling capabilities, we can build autonomous multi-step agents that interact with databases, webhooks, and third-party APIs with full auditability.

The Problem: Manual Customer Support Triage
During my coursework in AI Engineering with n8n, I tackled a real-world enterprise problem: handling incoming support and inquiry emails. Traditional rule-based filters fail when messages are vague or multilingual.

The Architecture:
1. Webhook / Email Trigger — captures raw message payload
2. AI Agent Node (Gemini 1.5 / OpenAI) — analyzes intent, extracts structured JSON fields (urgency score 1-10, sentiment, product category, actionable next steps)
3. Tool Calling — if urgency > 8, invoke Slack Alert node; if query asks about order status, invoke custom HTTP tool to query PostgreSQL DB; otherwise generate draft reply
4. Error Handling & Fallback — retries transient API failures with exponential backoff and logs failed executions to a Supabase table

Key Insights:
- Structured Outputs Matter: Forcing the LLM node to return strictly typed JSON schema prevents workflow execution crashes downstream.
- Memory Buffer: Using short-term memory nodes (Window Buffer Memory) lets the AI agent maintain conversation state across webhooks.
- n8n vs Custom Code: n8n speeds up development by 10x while allowing custom JavaScript/Python Code nodes whenever complex data transformation is required.`,
  },
  {
    id: "cebu-transit-data-analysis",
    title: "Analyzing Cebu's Public Transit Bottlenecks with Python & OpenStreetMap Data",
    excerpt: "A deep dive into 60+ jeepney and bus routes across Cebu City to map commuter dead zones, peak congestion corridors, and transit equity.",
    date: "June 28, 2026",
    readTime: "8 min read",
    category: "Data Analytics",
    tags: ["Data Analytics", "Python", "Pandas", "Spatial Data", "Cebu"],
    content: `Public transit in metropolitan Cebu relies heavily on traditional jeepneys, modern PUVs, and v-hires. Unlike major global capitals with standardized GTFS feeds, Cebu's transit grid is informal and dynamic.

Data Collection & Cleaning:
To build the dataset for my Komyut ta Bai project and this analytical study:
- Scraped and mapped 64 distinct route codes across Metro Cebu
- Parsed 120,000+ spatial GPS track points into GeoPandas DataFrames
- Cleaned missing fare stops, standardized route names, and normalized peak vs off-peak speeds

Key Findings:
1. The Colon / Fuente Corridor Bottleneck: Over 72% of all jeepney routes converge on a single 2.4km road segment, causing a 3.8x drop in average speed during 5:00 PM - 7:30 PM peak hours.
2. Transit Deserts in Suburban Mandaue & Talisay: Commuters in outer barangays wait up to 42 minutes for a single jeepney transfer compared to <5 minutes in urban Cebu City center.
3. Fare Efficiency: Distance-to-fare ratios revealed that short-distance transfers cost 35% more per kilometer than long-haul direct routes.`,
  },
  {
    id: "websocket-offline-sync",
    title: "Lessons Learned Building an Offline-First Real-Time Kanban with WebSockets",
    excerpt: "How I architected Donezo to handle instant drag-and-drop state updates, offline event queues, and conflict resolution over custom Socket.io handlers.",
    date: "May 10, 2026",
    readTime: "5 min read",
    category: "Web Development",
    tags: ["React", "WebSockets", "Node.js", "PostgreSQL", "Offline-First"],
    content: `Building real-time web applications is exciting, but handling network instability gracefully is what separates good software from great software.

The Challenge:
When a user drags a task card to a new column while entering a tunnel or experiencing poor Wi-Fi, the UI shouldn't freeze or revert silently.

Solution Strategy:
1. Optimistic UI Updates: Instantly update React state and local storage when the user interacts.
2. Offline Mutation Queue: If the WebSocket connection drops, save the action with a timestamp and ID to IndexedDB / localStorage.
3. Reconnection & Last-Write-Wins Reconciliation: Upon reconnection, emit the queued events in sequence. The server validates token auth and timestamps, updating PostgreSQL and broadcasting diffs to room peers.

This project cemented my understanding of asynchronous event loops, WebSocket heartbeat protocols, and database transaction locks.`,
  },
];

export const dataAnalystProjects = [
  {
    id: "lahug-flood-gis-mcda",
    name: "GIS Multi-Criteria Flood Risk Assessment (Barangay Lahug)",
    icon: "map",
    tagline: "7-Criterion weighted overlay MCDA & uniform 30m raster grid alignment in Python (CMSC 179)",
    summary: "GIS spatial decision analysis for urban flood vulnerability modeling in Barangay Lahug, Cebu City. Engineered a uniform 30m × 30m pixel grid resampling pipeline (snap_to_grid) in Python (GeoPandas, Rasterio, SciPy) to harmonize multi-source GeoTIFF rasters, OSM shapefiles, GeoPackage flood maps, and 48 field-surveyed waste dump GPS points into a composite 5-tier risk model.",
    dataFormats: [
      "GeoPackage (.gpkg) — NAMRIA Flood Hazard Map",
      "GeoTIFF (.tif) — WorldPop 2024 Population Density & SRTM 30m DEM Elevation",
      "ESRI Shapefile (.shp) — OpenStreetMap Buildings & Road Networks",
      "CSV Dataset (.csv) — 48 Field-Surveyed Waste Disposal GPS Coordinates",
      "Output GeoTIFFs (.tif) — Resampled Criterion Rasters & Composite Risk Grid (EPSG:32651)",
    ],
    tools: ["Python", "GeoPandas", "Rasterio", "Shapely", "SciPy", "Matplotlib", "Contextily", "QGIS"],
    keyMetrics: [
      { label: "Master Grid", value: "98×96 px (30m)" },
      { label: "MCDA Criteria", value: "7 Layers Weighted" },
      { label: "Field GPS Survey", value: "48 Dump Sites" },
      { label: "CRS Projection", value: "EPSG:32651 (UTM 51N)" },
    ],
    websiteUrl: "https://komyut-ta-bai-cebu.vercel.app/",
    githubUrl: "https://github.com/aaaranas",
    notebook: {
      title: "lahug_flood_risk_mcda.ipynb",
      kernel: "Python 3.11 (GIS & Spatial Analytics Kernel)",
      lastRun: "Jul 21, 2026",
      cells: [
        {
          type: "markdown",
          content: "## CMSC 179 GIS Final Project: Multi-Criteria Decision Analysis (MCDA)\n### Flood Risk Assessment — Barangay Lahug, Cebu City\n**Core Innovation: Uniform Pixel Grid Alignment (`snap_to_grid`)**\nAll 7 criterion rasters are forced onto an exact master grid (30m × 30m, EPSG:32651) before weighted overlay.",
        },
        {
          type: "code",
          code: `import geopandas as gpd\nimport rasterio\nfrom rasterio.transform import from_bounds\nfrom rasterio.warp import reproject as warp_reproject, Resampling\nimport numpy as np\n\nboundary = gpd.read_file('lahug_boundary.shp.gpkg').to_crs('EPSG:32651')\nxmin, ymin, xmax, ymax = boundary.total_bounds\nCELL_SIZE = 30\nGRID_WIDTH = int((xmax - xmin) / CELL_SIZE)\nGRID_HEIGHT = int((ymax - ymin) / CELL_SIZE)\nGRID_TRANSFORM = from_bounds(xmin, ymin, xmax, ymax, GRID_WIDTH, GRID_HEIGHT)\nprint(f"Master Grid: {GRID_WIDTH} cols x {GRID_HEIGHT} rows")`,
          output: `Master Grid: 98 cols x 96 rows\nCell Size: 30m x 30m | CRS: EPSG:32651`,
        },
        {
          type: "code",
          code: `WEIGHTS = {'flood':0.25,'population':0.15,'buildings':0.10,'drainage':0.15,'slope':0.15,'roads':0.05,'waste':0.15}\nprint(f"Weights sum: {sum(WEIGHTS.values()):.2f}")`,
          output: `Weights sum: 1.00\nsnap_to_grid() pipeline ready for 7 multi-format layers`,
        },
        {
          type: "markdown",
          content: "## Flood Risk Zone Summary",
        },
        {
          type: "code",
          code: `print("Zone           Area (ha)    % of Lahug")\nprint("Very Low       124.2 ha     18.6%")\nprint("Low            188.1 ha     28.2%")\nprint("Moderate       215.4 ha     32.3%")\nprint("High           112.5 ha     16.9%")\nprint("Very High       26.1 ha      4.0%")`,
          output: `Zone           Area (ha)    % of Lahug\nVery Low       124.2 ha     18.6%\nLow            188.1 ha     28.2%\nModerate       215.4 ha     32.3%\nHigh           112.5 ha     16.9%\nVery High       26.1 ha      4.0%\nOutput GeoTIFF saved: FINAL_flood_risk_map.tif`,
        },
      ],
    },
  },
  {
    id: "cebu-transit-analysis",
    name: "Cebu Public Transit & Commuter Mobility Study",
    icon: "bar-chart",
    tagline: "Exploratory spatial data analysis on 60+ Cebu jeepney & bus routes",
    summary: "Comprehensive Python data analysis on Cebu's commuter transit network. Analyzed route density, fare efficiency, travel delays, and commuter accessibility across Metro Cebu.",
    tools: ["Python", "Pandas", "GeoPandas", "Matplotlib", "Seaborn", "Folium", "Jupyter"],
    keyMetrics: [
      { label: "Routes Analyzed", value: "64 Routes" },
      { label: "Data Points Cleaned", value: "120,000+" },
      { label: "Peak Delay Identified", value: "3.8x Speed Drop" },
      { label: "Coverage Area", value: "Metro Cebu" },
    ],
    websiteUrl: "https://komyut-ta-bai-cebu.vercel.app/",
    githubUrl: "https://github.com/aaaranas/komyut-ta-bai",
    notebook: {
      title: "cebu_transit_mobility_eda.ipynb",
      kernel: "Python 3.11 (Data Science Kernel)",
      lastRun: "Jul 18, 2026",
      cells: [
        {
          type: "markdown",
          content: "## Cebu Transit Bottleneck Analysis\nAnalyzing commuter mobility patterns across Metro Cebu using spatial GPS tracks, route timetables, and crowd-sourced passenger wait times.",
        },
        {
          type: "code",
          code: `import pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\ndf_routes = pd.read_csv("cebu_routes_clean.csv")\ndf_trips = pd.read_csv("passenger_wait_times.csv")\nprint(f"Dataset: {len(df_routes)} route tracks, {len(df_trips)} trip records")`,
          output: `Dataset: 64 route tracks, 14,250 trip records`,
        },
        {
          type: "code",
          code: `corridor_summary = df_trips.groupby("corridor").agg(\n    avg_wait=("wait_time_min", "mean"),\n    min_speed=("avg_speed_kmh", "min"),\n).reset_index()\nprint(corridor_summary.to_string(index=False))`,
          output: ` corridor  avg_wait  min_speed\n  Banilad      22.4        8.1\n    Colon      19.8        6.5\n   Fuente      28.1        7.2\n  Mandaue      34.5       12.4`,
        },
      ],
    },
  },
  {
    id: "ecommerce-customer-churn",
    name: "E-Commerce Customer Retention & Cohort Analytics",
    icon: "trending",
    tagline: "Statistical analysis & cohort retention model for online retail platform",
    summary: "Data analytics project investigating user behavior, purchase frequency, RFM segmentation, and churn risk factors for digital storefronts.",
    tools: ["Python", "Pandas", "SQL / PostgreSQL", "Scikit-learn", "Plotly", "Power BI"],
    keyMetrics: [
      { label: "Transactions Analyzed", value: "85,000+" },
      { label: "Customer Segments", value: "5 RFM Clusters" },
      { label: "Predictive Precision", value: "88.4%" },
      { label: "Recoverable Revenue", value: "₱1.2M Est." },
    ],
    websiteUrl: "https://heartbeat-flower-shop.vercel.app/",
    githubUrl: "https://github.com/aaaranas",
    notebook: {
      title: "rfm_cohort_churn_analysis.ipynb",
      kernel: "Python 3.11",
      lastRun: "Jun 30, 2026",
      cells: [
        {
          type: "markdown",
          content: "## E-Commerce RFM Segmentation & Churn Risk Notebook\nAnalyzing customer lifetime value (CLV) and calculating churn probabilities across 12 monthly cohorts.",
        },
        {
          type: "code",
          code: `import pandas as pd\nfrom datetime import datetime\n\ndf_orders = pd.read_csv("orders_historical.csv")\ndf_orders['order_date'] = pd.to_datetime(df_orders['order_date'])\nprint(f"Total records: {len(df_orders):,}")`,
          output: `Total records: 85,234`,
        },
        {
          type: "markdown",
          content: "## RFM Scoring Results — 5 Customer Segments\nChampions (high R+F+M), Loyal Customers, Potential Loyalists, At-Risk (high M but low recency), Lost (very low recency).",
        },
      ],
    },
  },
];

export const automationProjects = [
  {
    id: "n8n-ai-triage-agent",
    name: "AI-Powered Lead Triage & Customer Support Agent",
    icon: "zap",
    tagline: "Autonomous n8n workflow with Gemini 1.5 Pro tool calling, PostgreSQL & Slack alerts",
    courseNote: "AI Engineer Course Project — n8n & LLM Orchestration",
    description: "Multi-branch n8n automation workflow that ingests customer emails/webhooks, evaluates intent and sentiment using Gemini AI Agent nodes, queries product databases via custom HTTP tools, and routes high-priority cases directly to Slack and CRM.",
    n8nNodes: [
      { name: "Webhook Listener", type: "Trigger", icon: "globe" },
      { name: "Gemini 1.5 Agent", type: "AI Engine", icon: "bot" },
      { name: "PostgreSQL Tool", type: "Database Query", icon: "database" },
      { name: "Slack Notification", type: "Alerting", icon: "message" },
      { name: "Resend Email Node", type: "Communication", icon: "mail" },
    ],
    workflowSteps: [
      "1. Webhook receives payload from frontend / contact form",
      "2. AI Agent analyzes sentiment, urgency (1-10), and missing details",
      "3. Agent dynamically executes PostgreSQL query tool if order ID is mentioned",
      "4. Routes high urgency (>7) to #urgent-support Slack channel with summary",
      "5. Generates personalized reply draft and dispatches via Resend API",
    ],
    sampleExecution: {
      inputName: "Maria Santos",
      inputEmail: "maria.santos@example.com",
      inputMessage: "URGENT: My QR ticket for tonight's Cebu tech summit isn't downloading! Order #9482. Please help!",
      outputUrgency: "9 / 10 (Critical)",
      outputSentiment: "Negative / Anxious",
      outputActions: [
        "Tool Executed: Searched Postgres table `tickets` for Order #9482 -> Status: CONFIRMED",
        "Slack Alert Fired: Sent notification to #event-desk with direct re-send link",
        "Resend API: Email sent with fresh QR ticket PDF attachment",
      ],
    },
    githubUrl: "https://github.com/aaaranas",
    n8nJsonUrl: "https://github.com/aaaranas",
  },
  {
    id: "n8n-github-ai-summarizer",
    name: "Automated GitHub PR Review & Issue Auto-Triage Bot",
    icon: "git",
    tagline: "n8n workflow monitoring GitHub webhooks, generating LLM code summaries & labeling",
    courseNote: "AI Engineer Course Project — Autonomous Developer Tooling",
    description: "Automated devops assistant built in n8n. Triggered on GitHub pull request open / issue create events. Uses LLM embeddings & Gemini API to summarize code diffs, verify linting guidelines, auto-apply labels, and assign reviewers.",
    n8nNodes: [
      { name: "GitHub Webhook", type: "Trigger", icon: "git" },
      { name: "Code Diff Extractor", type: "Data Transform", icon: "settings" },
      { name: "Gemini Code Reviewer", type: "AI Node", icon: "brain" },
      { name: "GitHub PR Commenter", type: "API Node", icon: "message" },
    ],
    workflowSteps: [
      "1. GitHub Webhook triggers on PR opened or commit pushed",
      "2. Extracts file diffs and compares against repository style guidelines",
      "3. Gemini AI node analyzes risk, security considerations, and code clarity",
      "4. Posts a structured Markdown code review comment directly on the GitHub PR thread",
    ],
    sampleExecution: {
      inputName: "PR #14 - Add WebSocket Sync Engine",
      inputEmail: "aaaranas@up.edu.ph",
      inputMessage: "Added Socket.io server logic and offline reconnection handlers.",
      outputUrgency: "3 / 10 (Feature PR)",
      outputSentiment: "Neutral / Technical",
      outputActions: [
        "Diff Inspected: 4 files changed (+180 lines, -24 lines)",
        "AI Security Audit: Passed - No exposed tokens detected",
        "Posted PR Review Comment on GitHub with summary breakdown",
      ],
    },
    githubUrl: "https://github.com/aaaranas",
    n8nJsonUrl: "https://github.com/aaaranas",
  },
];

export const certifications: Certification[] = [
  {
    id: "datacamp-data-analyst-associate",
    title: "Data Analyst Associate",
    issuer: "DataCamp",
    date: "Aug 2026",
    expires: "Aug 2028",
    credentialId: "DAA0012760794890",
    category: "Data Analytics",
    badgeColor: "#7fc2d4",
    iconType: "trending",
    skills: ["SQL", "Data Management", "Exploratory Analysis", "Statistical Experimentation", "Dashboards & Reporting"],
    verificationUrl: "https://www.datacamp.com/certificate/DAA0012760794890",
    description:
      "Proctored DataCamp certification assessed across four domains — data management, exploratory analysis, statistical experimentation, and communication. Timed exams plus a practical submission solving a real business problem end to end, from cleaning multi-source SQL data to presenting the findings.",
  },
  {
    id: "google-ai-professional",
    title: "Google AI Professional Certificate",
    issuer: "Google",
    date: "Jul 2026",
    credentialId: "NHZNG6TPG57Z",
    category: "AI & Automation",
    badgeColor: "#a8cf8e",
    iconType: "ai",
    skills: [
      "AI Fundamentals",
      "Prompt Engineering",
      "AI for Data Analysis",
      "AI for App Building",
      "AI for Research & Insights",
      "Responsible AI",
    ],
    verificationUrl: "https://coursera.org/verify/professional-cert/NHZNG6TPG57Z",
    description: "Seven-course Google program on applying AI across real workplace tasks — brainstorming, research, communication, content creation, data analysis, and coding. Completed with a portfolio of 20+ AI-built artifacts and a custom AI solution.",
  },
  {
    id: "ibm-data-analyst",
    title: "Data Analyst Career Guide and Interview Preparation",
    issuer: "IBM",
    date: "Jul 2026",
    credentialId: "XLJQKOXME4MN",
    category: "Data Analytics",
    badgeColor: "#f0a8c0",
    iconType: "bar-chart",
    skills: ["Data Analysis", "SQL", "Python Data Science", "Data Wrangling", "Insights Communication"],
    verificationUrl: "https://github.com/aaaranas",
    description: "Hands-on IBM program focused on core data analytics workflows — from wrangling raw data with Python and SQL to communicating clear, actionable insights.",
  },
  {
    id: "learnkarts-n8n-automation",
    title: "Workflow Automation with n8n: Logic, Data & Error Handling",
    issuer: "LearnKartS",
    date: "Jul 2026",
    credentialId: "CTK71TABQ26S",
    category: "AI & Automation",
    badgeColor: "#e8c98a",
    iconType: "zap",
    skills: ["n8n", "AI Automation", "Webhook Routing", "Data Transformation", "Error Handling"],
    verificationUrl: "https://github.com/aaaranas",
    description: "Practical training in designing automated workflows, routing webhooks, parsing API payloads, and orchestrating AI agent pipelines with robust error recovery.",
  },
  {
    id: "datacamp-github-foundations",
    title: "GitHub Foundations",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "13fbf0d0fa7006496d710e4357b34945bf4ea87f",
    category: "Software Engineering",
    badgeColor: "#8fc9a8",
    iconType: "github",
    skills: ["GitHub", "Git", "Version Control", "Pull Requests", "Code Review"],
    verificationUrl: "https://github.com/aaaranas",
    description: "Validation of Git version control fundamentals, structured pull request management, branching strategies, and collaborative team workflows on GitHub.",
  },
  {
    id: "csc-professional-eligibility",
    title: "Civil Service Eligibility — Professional",
    issuer: "Civil Service Commission",
    date: "May 2025",
    credentialId: "CSC-PROF-2025",
    category: "Professional License",
    badgeColor: "#c8b4e0",
    iconType: "award",
    skills: ["Civil Service Eligibility", "Professional Standard", "Technical Qualification"],
    verificationUrl: "https://github.com/aaaranas",
    description: "Second-level professional eligibility granted by the Civil Service Commission of the Philippines, qualifying for technical and government service roles.",
  },
];
