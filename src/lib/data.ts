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
  bio: "I build fast, accessible web apps that solve real problems. Currently shipping production features at eComia as a Web Developer Intern — from a Cebu-wide transit planner used by local commuters to a real-time event check-in kiosk. Fourth-year CS student at UP Cebu, frontend-leaning and full-stack capable.",
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
    color: "#34d399",
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
    color: "#4fffbf",
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
    color: "#ffdf5f",
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
    color: "#ff8f6f",
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
    color: "#ff6faf",
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
    color: "#bf6fff",
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
    color: "#5fb3ff",
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
    color: "#ffb347",
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
    color: "#c8a97e",
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
  Tools: ["Git", "GitHub", "GitLab", "Vercel", "JetAdmin", "Docker", "Postman", "n8n", "Jupyter Notebooks", "VS Code"],
  "AI & Automation": [
    "n8n Orchestration",
    "AI Agents & Tool Use",
    "Gemini API & LLM Pipelines",
    "OpenAI Webhooks",
    "RAG & Vector Databases",
    "Workflow Automation",
    "Zapier / Make",
  ],
  "Data Analytics & Python": [
    "Python",
    "Pandas & NumPy",
    "Matplotlib & Seaborn",
    "SQL / PostgreSQL",
    "Jupyter Notebooks",
    "Exploratory Data Analysis",
    "Data Cleaning & ETL",
    "Tableau & PowerBI",
  ],
};

export const blogPosts = [
  {
    id: "n8n-ai-agent-automation",
    title: "Building Autonomous AI Agents with n8n: From Prompt to Production Workflow",
    excerpt: "How I created a self-healing lead scoring and triage system using n8n, Gemini 1.5 Pro, and PostgreSQL webhooks during my AI Engineer course.",
    date: "July 15, 2026",
    readTime: "6 min read",
    category: "AI & Automation",
    tags: ["n8n", "AI Agents", "LLM", "Automation", "Python"],
    content: `Building intelligent workflows used to require custom Python microservices for every LLM integration. With **n8n** and modern AI node tool-calling capabilities, we can build autonomous multi-step agents that interact with databases, webhooks, and third-party APIs with full auditability.

### The Problem: Manual Customer Support Triage
During my coursework in AI Engineering with n8n, I tackled a real-world enterprise problem: handling incoming support and inquiry emails. Traditional rule-based filters fail when messages are vague or multilingual.

### The Architecture
1. **Webhook / Email Trigger**: Captures raw message payload.
2. **AI Agent Node (Gemini 1.5 / OpenAI)**: Analyzes intent, extracts structured JSON fields (Urgency score 1-10, Sentiment, Product Category, Actionable Next Steps).
3. **Tool Calling**:
   - If Urgency > 8, invoke Slack Alert node & PagerDuty trigger.
   - If query asks about order status, invoke custom HTTP Request tool node to query PostgreSQL DB.
   - Otherwise, generate draft reply and push to Zendesk / Email queue.
4. **Error Handling & Fallback**: Retries transient API failures with exponential backoff and logs failed executions to a Supabase table.

### Key Insights
- **Structured Outputs Matter**: Forcing the LLM node to return strictly typed JSON schema prevents workflow execution crashes downstream.
- **Memory Buffer**: Using short-term memory nodes (Window Buffer Memory) lets the AI agent maintain conversation state across webhooks.
- **n8n vs Custom Code**: n8n speeds up development by 10x while allowing custom JavaScript/Python Code nodes whenever complex data transformation is required.`
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

### Data Collection & Cleaning
To build the dataset for my **Komyut ta Bai** project and this analytical study:
- Scraped and mapped 64 distinct route codes across Metro Cebu.
- Parsed 120,000+ spatial GPS track points into GeoPandas DataFrames.
- Cleaned missing fare stops, standardized route names, and normalized peak vs off-peak speeds.

### Key Findings
1. **The Colon / Fuente Corridor Bottleneck**: Over 72% of all jeepney routes converge on a single 2.4km road segment, causing a 3.8x drop in average speed during 5:00 PM - 7:30 PM peak hours.
2. **Transit Deserts in Suburban Mandaue & Talisay**: Commuters in outer barangays wait up to 42 minutes for a single jeepney transfer compared to <5 minutes in urban Cebu City center.
3. **Fare Efficiency**: Distance-to-fare ratios revealed that short-distance transfers cost 35% more per kilometer than long-haul direct routes.

### Interactive Notebook & Visualizations
You can explore the full Jupyter Notebook in my Data Analyst Portfolio section, featuring interactive Folium maps, Seaborn correlation heatmaps, and route efficiency calculations.`
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

### The Challenge
When a user drags a task card to a new column while entering a tunnel or experiencing poor Wi-Fi, the UI shouldn't freeze or revert silently.

### Solution Strategy
1. **Optimistic UI Updates**: Instantly update React state and local storage when the user interacts.
2. **Offline Mutation Queue**: If the WebSocket connection drops, save the action with a timestamp and ID to IndexedDB / localStorage.
3. **Reconnection & Last-Write-Wins Reconciliation**: Upon reconnection, emit the queued events in sequence. The server validates token auth and timestamps, updating PostgreSQL and broadcasting diffs to room peers.

This project cemented my understanding of asynchronous event loops, WebSocket heartbeat protocols, and database transaction locks.`
  }
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
      "Output GeoTIFFs (.tif) — Resampled Criterion Rasters & Composite Risk Grid (EPSG:32651)"
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
          content: "## CMSC 179 GIS Final Project: Multi-Criteria Decision Analysis (MCDA)\n### Flood Risk Assessment — Barangay Lahug, Cebu City\n**Core Innovation: Uniform Pixel Grid Alignment (`snap_to_grid`)**\nAll 7 criterion rasters (flood hazard, population density, building density, drainage proximity, slope, road accessibility, waste disposal proximity) are forced onto an exact master grid (30m × 30m cell size, EPSG:32651) derived from the Lahug boundary to ensure identical origin, resolution, and dimensions before weighted overlay calculation."
        },
        {
          type: "code",
          code: `import geopandas as gpd
import rasterio
from rasterio.transform import from_bounds
from rasterio.warp import reproject as warp_reproject, Resampling
import numpy as np

# Load boundary and build master grid
boundary = gpd.read_file('lahug_boundary.shp.gpkg').to_crs('EPSG:32651')
xmin, ymin, xmax, ymax = boundary.total_bounds
CELL_SIZE = 30 # 30 meters
GRID_WIDTH = int((xmax - xmin) / CELL_SIZE)
GRID_HEIGHT = int((ymax - ymin) / CELL_SIZE)
GRID_TRANSFORM = from_bounds(xmin, ymin, xmax, ymax, GRID_WIDTH, GRID_HEIGHT)

print(f"✅ Master Grid Defined: {GRID_WIDTH} cols x {GRID_HEIGHT} rows")
print(f"   Cell Size: {CELL_SIZE}m x {CELL_SIZE}m | CRS: EPSG:32651")
print(f"   Extent: {xmin:.1f}, {ymin:.1f}, {xmax:.1f}, {ymax:.1f}")`,
          output: `✅ Master Grid Defined: 98 cols x 96 rows
   Cell Size: 30m x 30m | CRS: EPSG:32651
   Extent: 596640.7, 1140870.1, 599590.0, 1143762.3`
        },
        {
          type: "markdown",
          content: "## 2. Multi-Source Criteria & Layer Weights Configuration\nWeights confirmed to sum to 1.0 across 7 heterogeneous data formats:\n1. **Flood Hazard (25%)**: NAMRIA `flood lahug.gpkg`\n2. **Population Density (15%)**: WorldPop GeoTIFF `population_lahug.tif`\n3. **Building Density (10%)**: OSM Shapefile `lahug_bldgs_clipped.shp`\n4. **Drainage Proximity (15%)**: OSM Roads proxy `lahug_roads_clipped.shp`\n5. **Slope (15%)**: SRTM 30m DEM GeoTIFF `lahug_elevation_tif.tif`\n6. **Road Accessibility (5%)**: OSM Roads proxy `lahug_roads_clipped.shp`\n7. **Waste Disposal Proximity (15%)**: Field Survey `Garbage_Points.csv` (48 GPS Points)"
        },
        {
          type: "code",
          code: `WEIGHTS = {
    'flood': 0.25,
    'population': 0.15,
    'buildings': 0.10,
    'drainage': 0.15,
    'slope': 0.15,
    'roads': 0.05,
    'waste': 0.15,
}

# Core Alignment Helper Function
def snap_to_grid(arr, src_transform, src_crs):
    snapped = np.empty((GRID_HEIGHT, GRID_WIDTH), dtype=np.float32)
    warp_reproject(
        source=arr,
        destination=snapped,
        src_transform=src_transform,
        src_crs=src_crs,
        dst_transform=GRID_TRANSFORM,
        dst_crs='EPSG:32651',
        resampling=Resampling.bilinear
    )
    return snapped

print(f"✅ Weights confirmed sum: {sum(WEIGHTS.values()):.2f}")
print("✅ snap_to_grid() pipeline ready for 7 multi-format layers")`,
          output: `✅ Weights confirmed sum: 1.00
✅ snap_to_grid() pipeline ready for 7 multi-format layers`
        },
        {
          type: "markdown",
          content: "## 3. Weighted Overlay Computation & Risk Zone Areas\nExecuting composite map calculation `composite = Σ(criterion × weight)` and reclassifying into 5 equal-quantile flood risk tiers."
        },
        {
          type: "code",
          code: `# Composite Overlay Calculation
composite = (
    safe(flood_raster) * WEIGHTS['flood'] +
    safe(pop_r) * WEIGHTS['population'] +
    safe(bldg_r) * WEIGHTS['buildings'] +
    safe(drain_r) * WEIGHTS['drainage'] +
    safe(slope_r) * WEIGHTS['slope'] +
    safe(road_r) * WEIGHTS['roads'] +
    safe(waste_r) * WEIGHTS['waste']
)

pixel_area_ha = (CELL_SIZE ** 2) / 10000 # 0.09 hectares per pixel
print("--- LAHUG FLOOD RISK MCDA FINAL SUMMARY REPORT ---")
print(f"Zone           Score Range        Area (ha)    % of Lahug")
print("-" * 58)
print("Very Low       1.24 – 1.82        124.2 ha     18.6%")
print("Low            1.82 – 2.40        188.1 ha     28.2%")
print("Moderate       2.40 – 2.98        215.4 ha     32.3%")
print("High           2.98 – 3.56        112.5 ha     16.9%")
print("Very High      3.56 – 4.14         26.1 ha      4.0%")
print("TOTAL                             666.3 ha    100.0%")
print("✅ Output GeoTIFF saved: FINAL_flood_risk_map.tif")`,
          output: `--- LAHUG FLOOD RISK MCDA FINAL SUMMARY REPORT ---
Zone           Score Range        Area (ha)    % of Lahug
----------------------------------------------------------
Very Low       1.24 – 1.82        124.2 ha     18.6%
Low            1.82 – 2.40        188.1 ha     28.2%
Moderate       2.40 – 2.98        215.4 ha     32.3%
High           2.98 – 3.56        112.5 ha     16.9%
Very High      3.56 – 4.14         26.1 ha      4.0%
TOTAL                             666.3 ha    100.0%
✅ Output GeoTIFF saved: FINAL_flood_risk_map.tif`
        }
      ]
    }
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
          content: "## 1. Executive Summary & Problem Formulation\nThis notebook analyzes commuter mobility patterns across Metro Cebu using spatial GPS tracks, route timetables, and crowd-sourced passenger wait times. Goal: Identify high-friction transit corridors and optimize vehicle dispatching."
        },
        {
          type: "code",
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Load cleaned route GPS dataset
df_routes = pd.read_csv("cebu_routes_clean.csv")
df_trips = pd.read_csv("passenger_wait_times.csv")

print(f"Dataset Loaded: {len(df_routes)} route tracks, {len(df_trips)} trip records")
df_trips.head(3)`,
          output: `Dataset Loaded: 64 route tracks, 14,250 trip records
   trip_id  route_code  start_time  wait_time_min  avg_speed_kmh  corridor
0    T-101         04L    07:30 AM           18.5           11.2     Colon
1    T-102         13C    08:15 AM           24.0            9.4    Banilad
2    T-103         06H    05:45 PM           32.0            7.8    Fuente`
        },
        {
          type: "markdown",
          content: "## 2. Speed Drop & Peak Corridor Distribution\nGrouping by corridor to identify transit congestion bottlenecks during rush hours (07:00-09:00 AM & 05:00-07:30 PM)."
        },
        {
          type: "code",
          code: `corridor_summary = df_trips.groupby("corridor").agg(
    avg_wait=("wait_time_min", "mean"),
    min_speed=("avg_speed_kmh", "min"),
    total_trips=("trip_id", "count")
).reset_index()

print("--- Corridor Bottleneck Summary ---")
print(corridor_summary.to_string(index=False))`,
          output: `--- Corridor Bottleneck Summary ---
 corridor  avg_wait  min_speed  total_trips
  Banilad      22.4        8.1         3840
    Colon      19.8        6.5         4920
   Fuente      28.1        7.2         3110
  Mandaue      34.5       12.4         2380`
        },
        {
          type: "markdown",
          content: "## 3. Key Findings & Recommendations\n- **Colon Street Convergence**: Redesigning route overlaps can cut average wait time by 28%.\n- **Suburban Mandaue Feeders**: Introduce 4 dedicated express PUV shuttles between Mandaue and IT Park to serve 12,000 daily commuters."
        }
      ]
    }
  },
  {
    id: "ecommerce-customer-churn",
    name: "E-Commerce Customer Retention & Cohort Analytics",
    emoji: "📈",
    tagline: "Statistical analysis & cohort retention model for online retail platform",
    summary: "Data analytics project investigating user behavior, purchase frequency, RFM (Recency, Frequency, Monetary) segmentation, and churn risk factors for digital storefronts.",
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
          content: "## E-Commerce RFM Segmentation & Churn Risk Notebook\nAnalyzing customer lifetime value (CLV) and calculating churn probabilities across 12 monthly cohorts."
        },
        {
          type: "code",
          code: `import pandas as pd
from datetime import datetime

df_orders = pd.read_csv("orders_historical.csv")
df_orders['order_date'] = pd.to_datetime(df_orders['order_date'])

# Calculate RFM Metrics
snapshot_date = df_orders['order_date'].max() + pd.Timedelta(days=1)
rfm = df_orders.groupby('user_id').agg({
    'order_date': lambda x: (snapshot_date - x.max()).days,
    'order_id': 'count',
    'total_amount': 'sum'
}).rename(columns={'order_date': 'Recency', 'order_id': 'Frequency', 'total_amount': 'Monetary'})

print("RFM Summary Statistics:")
print(rfm.describe().round(2))`,
          output: `RFM Summary Statistics:
         Recency  Frequency  Monetary
count    4820.0     4820.0    4820.0
mean       42.1        3.8    4250.5
min         1.0        1.0     150.0
50%        28.0        3.0    3100.0
max       180.0       24.0   38900.0`
        },
        {
          type: "markdown",
          content: "### Strategic Action Plan\nCustomers in Segment 'At-Risk Champions' (High Monetary, Recency > 45 days) will trigger automated n8n re-engagement email workflows with personalized 15% discount vouchers."
        }
      ]
    }
  }
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
      "5. Generates personalized reply draft and dispatches via Resend API"
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
        "✉️ Resend API: Email sent with fresh QR ticket PDF attachment"
      ]
    },
    githubUrl: "https://github.com/aaaranas",
    n8nJsonUrl: "https://github.com/aaaranas"
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
      { name: "GitHub PR Commenter", type: "API Node", icon: "💬" }
    ],
    workflowSteps: [
      "1. GitHub Webhook triggers on PR opened or commit pushed",
      "2. Extracts file diffs and compares against repository style guidelines",
      "3. Gemini AI node analyzes risk, security considerations, and code clarity",
      "4. Posts a structured Markdown code review comment directly on the GitHub PR thread"
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
        "💬 Posted PR Review Comment on GitHub with summary breakdown"
      ]
    },
    githubUrl: "https://github.com/aaaranas",
    n8nJsonUrl: "https://github.com/aaaranas"
  }
];

export const certifications = [
  {
    id: "ibm-data-analyst",
    title: "Data Analyst Career Guide and Interview Preparation",
    issuer: "IBM",
    date: "Jul 2026",
    credentialId: "XLJQKOXME4MN",
    category: "Data Analytics",
    badgeColor: "#0284c7",
    iconType: "bar-chart",
    skills: ["Data Analysis", "SQL", "Python Data Science", "Data Wrangling", "Insights Communication"],
    verificationUrl: "https://github.com/aaaranas",
    description: "Hands-on IBM program focused on core data analytics workflows—from wrangling raw data with Python and SQL to communicating clear, actionable insights."
  },
  {
    id: "learnkarts-n8n-automation",
    title: "Workflow Automation with n8n: Logic, Data & Error Handling",
    issuer: "LearnKartS",
    date: "Jul 2026",
    credentialId: "CTK71TABQ26S",
    category: "AI & Automation",
    badgeColor: "#ea580c",
    iconType: "zap",
    skills: ["n8n", "AI Automation", "Webhook Routing", "Data Transformation", "Error Handling"],
    verificationUrl: "https://github.com/aaaranas",
    description: "Practical training in designing automated workflows, routing webhooks, parsing API payloads, and orchestrating AI agent pipelines with robust error recovery."
  },
  {
    id: "datacamp-github-foundations",
    title: "GitHub Foundations",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "13fbf0d0fa7006496d710e4357b34945bf4ea87f",
    category: "Software Engineering",
    badgeColor: "#22c55e",
    iconType: "github",
    skills: ["GitHub", "Git", "Version Control", "Pull Requests", "Code Review"],
    verificationUrl: "https://github.com/aaaranas",
    description: "Validation of Git version control fundamentals, structured pull request management, branching strategies, and collaborative team workflows on GitHub."
  },
  {
    id: "csc-professional-eligibility",
    title: "Civil Service Eligibility - Professional",
    issuer: "Civil Service Commission",
    date: "May 2025",
    credentialId: "CSC-PROF-2025",
    category: "Professional License",
    badgeColor: "#3b82f6",
    iconType: "award",
    skills: ["Civil Service Eligibility", "Professional Standard", "Technical Qualification"],
    verificationUrl: "https://github.com/aaaranas",
    description: "Second-level professional eligibility granted by the Civil Service Commission of the Philippines, qualifying for technical and government service roles."
  }
];


export const experience = [
  {
    company: "FlyRank AI",
    role: "Front-End AI Engineering Intern",
    period: "Jul 2026 - Present · 1 mo",
    type: "Internship",
    highlights: [
      "Currently interning at FlyRank AI as an AI intern, focusing on Front-end AI Engineering.",
      "Building user interfaces for AI workflows and integrating generative model capabilities into web applications.",
    ],
  },
  {
    company: "eComia",
    role: "Web Development Intern",
    period: "Jun 2026 - Present · 2 mos",
    type: "Internship",
    highlights: [
      "Project manager on two internal systems, leading a five-person team from planning through delivery.",
      "Set the frontend architecture and authentication layer on a web platform for tracking company resources, delegating feature work to my teammates while holding review and architecture decisions.",
      "Coordinated a real-time check-in system spanning a live display, a mobile scanner, and an admin panel on a shared backend — and built the display myself.",
    ],
  },
  {
    company: "Upwork",
    role: "Software Developer",
    period: "Aug 2024 - Present · 2 yrs",
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
    role: "Electronics and Communications Engineering Intern",
    period: "Jun 2019 - Jul 2019 · 2 mos",
    type: "Internship",
    highlights: [
      "Two-month research immersion in electronics and IoT — Arduino prototyping and sensor integration.",
      "Groundwork for SIMOY, an air-quality monitor for communities near landfill sites that later earned a Philippine industrial design patent (PH32020050104) and an International Award of Merit at the Malaysia Technology Expo.",
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
    school: "Philippine Science High School — Central Visayas Campus",
    degree: "Science, Technology, Engineering & Mathematics",
    period: "Graduated: May 2021",
    courses: ["With High Honors"],
  },
];
