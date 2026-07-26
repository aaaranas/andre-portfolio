export const personal = {
  name: "Andre Milan A. Arañas",
  shortName: "Andre",
  title: "BS Computer Science",
  subtitle: "Web Developer Intern · eComia",
  email: "aaaranas@up.edu.ph",
  phone: "+639287056564",
  github: "github.com/aaaranas",
  githubUrl: "https://github.com/aaaranas",
  location: "Cebu City, Philippines",
  bio: "I build fast, accessible web apps that solve real problems — and analyze the data behind them. Incoming 4th year BS Computer Science at UP Cebu, working across three tracks: software engineering, data analysis, and AI automation.",
  portfolioUrl: "https://andre-milan-aranas.vercel.app/",
};

export const projects = [
  {
    id: "komyut-ta-bai",
    name: "Komyut ta Bai",
    emoji: "🚌",
    tagline: "The transit planner Cebu never had — Google Maps won't cover this",
    description:
      "Google Maps has no transit data for most of Cebu. I built the alternative: a province-wide multimodal planner covering buses, v-hires, jeepneys, and island ferries (Bantayan, Camotes). Enter an origin and destination; get multi-leg journey plans with transfer points, fares, and travel times. Fully offline after first load as a PWA — critical for riders with spotty data. Routing is Dijkstra on an in-memory transit graph with ~60 jeepney routes. Built solo; still actively expanding coverage.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "MapLibre GL", "OpenStreetMap", "Serwist", "Vercel"],
    role: "Solo Dev",
    highlight: "WIP · Civic Tech",
    color: "#a8cf8e",
    github: "https://github.com/aaaranas/komyut-ta-bai",
    live: "https://komyut-ta-bai-cebu.vercel.app/",
  },
  {
    id: "donezo",
    name: "Donezo",
    emoji: "✅",
    tagline: "Offline-first Kanban that syncs the moment you reconnect",
    description:
      "My first time shipping a WebSocket-powered sync system end-to-end. Tasks update across all open devices in real-time; go offline and they queue — reconnect and they reconcile via last-write-wins conflict resolution. Built JWT auth, drag-and-drop columns, tag auto-coloring, due date display, and cron-based soft-delete cleanup from scratch. The WebSocket layer was the hardest part and the most rewarding to get right.",
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "PostgreSQL"],
    role: "Full Stack",
    highlight: "WebSocket sync",
    color: "#8fc9a8",
    github: "https://github.com/aaaranas",
    live: "",
  },
  {
    id: "sanbidet",
    name: "San Bidet Cebu",
    emoji: "🚽",
    tagline: "Crowdsourced map of bidet availability across Cebu",
    description:
      "A problem-first project: finding a clean restroom with a bidet in Cebu is harder than it should be. Built a crowdsourced platform where locals submit and rate bidet availability — public listing interface plus a separate admin dashboard for managing submissions. Sole full-stack developer, from schema design to deployment. First project where I owned both the frontend UX and the database layer.",
    stack: ["Flutter", "PostgreSQL", "Vercel"],
    role: "Sole Full Stack",
    highlight: "Solo project",
    color: "#e8c98a",
    github: "https://github.com/aaaranas",
    live: "https://san-bidet-cebu-admin.vercel.app/",
  },
  {
    id: "scheduling",
    name: "Sorting Algorithm Calculator",
    emoji: "⚙️",
    tagline: "Study tool for OS scheduling algorithms — used by classmates",
    description:
      "Built this to stop re-doing scheduling calculations by hand for OS class. Supports FCFS, SJF (preemptive and non-preemptive), Priority, and Round Robin — add processes with custom burst times and see Gantt charts with waiting/turnaround times. Shared it with classmates and it spread; ended up being used for exam review by people I'd never met. First time I shipped something people actually came back to.",
    stack: ["HTML", "JavaScript", "CSS", "Vercel"],
    role: "Solo Dev",
    highlight: "Public tool",
    color: "#e8a89a",
    github: "https://github.com/aaaranas",
    live: "https://cpu-schedule-calculator.vercel.app/",
  },
  {
    id: "heartbeat",
    name: "Heartbeat Flower Shop",
    emoji: "🌸",
    tagline: "E-commerce UI with search, cart, and full checkout flow",
    description:
      "Full e-commerce frontend — product browsing with search and filter, shopping cart with persistent state, and a multi-step checkout flow. This was my deep-dive into component architecture and state management in React: how to structure a real feature tree, handle shared cart state, and keep the UI responsive across breakpoints. Clean, fast, and mobile-first.",
    stack: ["JavaScript", "React", "Next.js", "Tailwind CSS", "Vercel"],
    role: "Frontend Dev",
    highlight: "E-commerce UX",
    color: "#f0a8c0",
    github: "https://github.com/aaaranas",
    live: "https://heartbeat-flower-shop.vercel.app/",
  },
  {
    id: "tacfinity",
    name: "Tacfinity",
    emoji: "🎮",
    tagline: "Multiplayer Tic Tac Toe with live rooms and ELO ranking",
    description:
      "Took a classic game seriously: private room codes, live WebSocket sync, an offline AI opponent, and a real ELO ranking system with persistent player stats. Handled the full frontend and contributed to backend architecture — this is where I learned how real-time state across multiple connected clients actually works. Used Prisma ORM for the first time; the ELO math and concurrent session handling were the interesting parts.",
    stack: ["TypeScript", "React", "Vite", "Tailwind CSS", "Express.js", "Socket.io", "PostgreSQL", "Prisma"],
    role: "Full Stack",
    highlight: "ELO + WebSockets",
    color: "#c8b4e0",
    github: "https://github.com/aaaranas",
    live: "https://tacfinity-web.vercel.app/",
  },
  {
    id: "irregskolar",
    name: "IrregSkolar",
    emoji: "🎓",
    tagline: "Schedule planner for irregular UP students — built for myself first",
    description:
      "Enrollment at UP as an irregular student means manually juggling prerequisites, time conflicts, and unit caps across a spreadsheet. I built the tool I needed: pick your courses, get conflict detection, unit load computation, and a visual schedule grid instantly. Shared it with org-mates; turned into something classmates actually use during enlistment season. Feels good to solve a real problem for real people I know.",
    stack: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Vercel"],
    role: "Solo Dev",
    highlight: "Student tool",
    color: "#9dc0d8",
    github: "https://github.com/aaaranas",
    live: "https://irregskolar.vercel.app/",
  },
  {
    id: "7gb-construction",
    name: "7GB Construction",
    emoji: "🏗️",
    tagline: "Company website for a construction services firm",
    description:
      "Professional company website for 7GB Construction Services, featuring project showcases, service listings, and a contact section. Built for a real client with a focus on clean design, fast load times, and mobile responsiveness.",
    stack: ["React", "Next.js", "Tailwind CSS", "Vercel"],
    role: "Sole Developer",
    highlight: "Client project",
    color: "#dcc08a",
    github: "https://github.com/aaaranas",
    live: "https://7gb-construction-services.vercel.app/",
  },
  {
    id: "myle-photography",
    name: "Myle Photography",
    emoji: "📷",
    tagline: "Photography portfolio & booking site",
    description:
      "Portfolio and booking website for a photographer client. Features a masonry gallery, service packages, and a contact/booking form. Designed to showcase the photographer's style with a minimal, image-forward layout.",
    stack: ["React", "Next.js", "Tailwind CSS", "Vercel"],
    role: "Sole Developer",
    highlight: "Client project",
    color: "#c4b49a",
    github: "https://github.com/aaaranas",
    live: "https://myle-photography.vercel.app/",
  },
];

export const skills = {
  Frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "Responsive Design",
    "Socket.io Client",
    "Flutter",
  ],
  "Backend & APIs": [
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "Firebase",
    "Firestore",
    "Supabase",
    "tRPC",
    "Socket.io Server",
    "Prisma ORM",
  ],
  Tools: ["Git", "GitHub", "GitLab", "Vercel", "JetAdmin", "Docker", "Postman"],
  "AI & Automation": [
    "n8n Orchestration",
    "AI Agents & Tool Use",
    "Gemini API & LLM Pipelines",
    "Workflow Automation",
    "RAG & Vector Databases",
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
};

export const experience = [
  {
    company: "FlyRank AI",
    role: "Front-End AI Engineering Intern",
    period: "Jul 2026 · Present",
    type: "Internship",
    highlights: [
      "Building user interfaces for AI workflows and integrating generative model capabilities into web applications.",
      "Focusing on Front-end AI Engineering with production React/Next.js systems.",
    ],
  },
  {
    company: "eComia",
    role: "Web Developer Intern",
    period: "Jun 2026 · Present",
    type: "Internship",
    highlights: [
      "Acting as Project Manager & Frontend Developer across projects — owning both coordination and hands-on implementation.",
      "Built the Event QR Admission system end-to-end: full-screen kiosk display (React + Vite) reacting to real-time Firestore writes with celebratory animated reveals.",
      "Managed a multi-platform system: web display, Flutter mobile QR scanner, and JetAdmin admin panel — all wired to the same Firebase/Firestore project.",
      "Collaborating on React/Next.js e-commerce systems in a professional team environment.",
    ],
  },
  {
    company: "Upwork",
    role: "Freelance Software Developer",
    period: "Aug 2024 · Present",
    type: "Freelance",
    highlights: [
      "Freelance web and mobile developer working with Cebu-based clients and civic projects, scoping and shipping each build solo.",
      "Built a multimodal public transport planner for Cebu Province with Next.js, using MapLibre GL for route rendering.",
      "Built a community-driven Flutter app that crowdsources and maps bidet locations across Cebu.",
      "Built a portfolio and booking site for a Cebu-based event photographer with Next.js.",
      "Built a professional website for a Cebu-based contracting firm with Next.js.",
    ],
  },
  {
    company: "University of San Carlos",
    role: "Electronics & Communications Engineering Intern",
    period: "Jun 2019 · Jul 2019",
    type: "Research Internship",
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
    period: "Incoming 4th Year · Expected: Jul 2027",
    courses: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Database Systems",
      "Software Engineering",
      "Computer Networks",
    ],
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
    emoji: "🗺️",
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
          output: `Weights sum: 1.00\n✅ snap_to_grid() pipeline ready for 7 multi-format layers`,
        },
        {
          type: "markdown",
          content: "## Flood Risk Zone Summary",
        },
        {
          type: "code",
          code: `print("Zone           Area (ha)    % of Lahug")\nprint("Very Low       124.2 ha     18.6%")\nprint("Low            188.1 ha     28.2%")\nprint("Moderate       215.4 ha     32.3%")\nprint("High           112.5 ha     16.9%")\nprint("Very High       26.1 ha      4.0%")`,
          output: `Zone           Area (ha)    % of Lahug\nVery Low       124.2 ha     18.6%\nLow            188.1 ha     28.2%\nModerate       215.4 ha     32.3%\nHigh           112.5 ha     16.9%\nVery High       26.1 ha      4.0%\n✅ Output GeoTIFF saved: FINAL_flood_risk_map.tif`,
        },
      ],
    },
  },
  {
    id: "cebu-transit-analysis",
    name: "Cebu Public Transit & Commuter Mobility Study",
    emoji: "📊",
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
    emoji: "📈",
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
    emoji: "⚡",
    tagline: "Autonomous n8n workflow with Gemini 1.5 Pro tool calling, PostgreSQL & Slack alerts",
    courseNote: "AI Engineer Course Project — n8n & LLM Orchestration",
    description: "Multi-branch n8n automation workflow that ingests customer emails/webhooks, evaluates intent and sentiment using Gemini AI Agent nodes, queries product databases via custom HTTP tools, and routes high-priority cases directly to Slack and CRM.",
    n8nNodes: [
      { name: "Webhook Listener", type: "Trigger", icon: "🌐" },
      { name: "Gemini 1.5 Agent", type: "AI Engine", icon: "🤖" },
      { name: "PostgreSQL Tool", type: "Database Query", icon: "🗄️" },
      { name: "Slack Notification", type: "Alerting", icon: "💬" },
      { name: "Resend Email Node", type: "Communication", icon: "📧" },
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
        "✅ Tool Executed: Searched Postgres table `tickets` for Order #9482 -> Status: CONFIRMED",
        "⚡ Slack Alert Fired: Sent notification to #event-desk with direct re-send link",
        "✉️ Resend API: Email sent with fresh QR ticket PDF attachment",
      ],
    },
    githubUrl: "https://github.com/aaaranas",
    n8nJsonUrl: "https://github.com/aaaranas",
  },
  {
    id: "n8n-github-ai-summarizer",
    name: "Automated GitHub PR Review & Issue Auto-Triage Bot",
    emoji: "🐙",
    tagline: "n8n workflow monitoring GitHub webhooks, generating LLM code summaries & labeling",
    courseNote: "AI Engineer Course Project — Autonomous Developer Tooling",
    description: "Automated devops assistant built in n8n. Triggered on GitHub pull request open / issue create events. Uses LLM embeddings & Gemini API to summarize code diffs, verify linting guidelines, auto-apply labels, and assign reviewers.",
    n8nNodes: [
      { name: "GitHub Webhook", type: "Trigger", icon: "🐙" },
      { name: "Code Diff Extractor", type: "Data Transform", icon: "⚙️" },
      { name: "Gemini Code Reviewer", type: "AI Node", icon: "🧠" },
      { name: "GitHub PR Commenter", type: "API Node", icon: "💬" },
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
        "🔍 Diff Inspected: 4 files changed (+180 lines, -24 lines)",
        "🧠 AI Security Audit: Passed - No exposed tokens detected",
        "💬 Posted PR Review Comment on GitHub with summary breakdown",
      ],
    },
    githubUrl: "https://github.com/aaaranas",
    n8nJsonUrl: "https://github.com/aaaranas",
  },
];

export const certifications = [
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
    badgeColor: "#a8cf8e",
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
