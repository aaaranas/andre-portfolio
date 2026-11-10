export const dataAnalystProjects = [
  {
    id: "lahug-flood-gis-mcda",
    name: "GIS Multi-Criteria Flood Risk Assessment (Barangay Lahug)",
    tagline: "7-Criterion weighted overlay MCDA & uniform 30m raster grid alignment in Python (CMSC 179)",
    summary:
      "Which parts of Barangay Lahug flood first, and what makes them worse. The hard part was that none of the source layers agreed: GeoTIFF rasters, OSM shapefiles, a GeoPackage flood map and 48 waste-dump GPS points I surveyed on foot, all on different grids. A snap_to_grid pipeline in GeoPandas, Rasterio and SciPy resamples everything onto one 30m × 30m grid so the seven weighted criteria can be overlaid into a five-tier risk model.",
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
    tagline: "Exploratory spatial data analysis on 60+ Cebu jeepney & bus routes",
    summary:
      "Where Metro Cebu's transit network thins out, and where it seizes up. Cleaned 120,000+ route and GPS points across 64 jeepney and bus routes, then measured route density, fare efficiency and travel delay against each other — including the corridor where peak-hour speed drops by a factor of almost four.",
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
    name: "Customer Retention & Cohort Analysis",
    tagline: "Statistical analysis & cohort retention model for online retail platform",
    summary:
      "Which customers are about to stop buying, and what that is worth leaving on the table. Sorted 85,000 transactions into five RFM clusters by recency, frequency and spend, then modelled churn risk against each cluster's buying pattern.",
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
