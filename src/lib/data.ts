export const personal = {
  name: "Andre Milan A. Arañas",
  shortName: "Andre",
  title: "BS Computer Science",
  subtitle: "Frontend-leaning Full Stack Developer",
  email: "aaaranas@up.edu.ph",
  phone: "+639287056564",
  github: "github.com/aaaranas",
  githubUrl: "https://github.com/aaaranas",
  location: "Cebu City, Philippines",
  bio: "Third-year BS Computer Science student at UP Cebu. I build things for the web — primarily owning frontend architecture with React and Next.js, while shipping full-stack features end-to-end. Currently seeking a software developer internship.",
};

export const projects = [
  {
    id: "iskoarena",
    name: "IskoArena",
    emoji: "🏟️",
    tagline: "Live intramurals management system for UP Cebu",
    description:
      "Led frontend development for UP Cebu's Iskolaro intramurals — serving as a live score tracking and results hub. Built leaderboard UI with sorting and filtering, player profile pages, and full match management (create, edit, delete, finalize). Also contributed to database design.",
    stack: ["TypeScript", "React", "Tailwind CSS", "PostgreSQL"],
    role: "Frontend Lead",
    highlight: "Led frontend",
    color: "#7fff6f",
  },
  {
    id: "donezo",
    name: "Donezo",
    emoji: "✅",
    tagline: "Offline-first Kanban with real-time cross-device sync",
    description:
      "Personal Kanban app with offline support and real-time cross-device sync via WebSockets. Implemented last-write-wins conflict resolution. Drag-and-drop columns, tag system with auto-coloring, due date display. Backend includes JWT auth, cron-based soft-delete cleanup, and a WebSocket sync layer.",
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "PostgreSQL"],
    role: "Full Stack",
    highlight: "WebSocket sync",
    color: "#4fffbf",
  },
  {
    id: "sanbidet",
    name: "San Bidet Cebu",
    emoji: "🚽",
    tagline: "Crowdsourced bidet-rating platform for Cebu restrooms",
    description:
      "Built a crowdsourced platform for rating bidet availability in Cebu restrooms. Public-facing listing interface and a separate admin dashboard for managing submissions and ratings. Sole full-stack developer from UI to database.",
    stack: ["Flutter", "PostgreSQL", "Vercel"],
    role: "Sole Full Stack",
    highlight: "Solo project",
    color: "#ffdf5f",
  },
  {
    id: "scheduling",
    name: "Sorting Algorithm Calculator",
    emoji: "⚙️",
    tagline: "Interactive OS scheduling algorithm visualizer",
    description:
      "Interactive calculator supporting FCFS, SJF (Non-preemptive), SJF (Preemptive), Priority, and Round Robin. Users add processes with custom burst times, run calculations, and compare algorithm behavior. Designed as a study tool; deployed publicly for student use. Fully responsive.",
    stack: ["HTML", "JavaScript", "CSS", "Vercel"],
    role: "Solo Dev",
    highlight: "Public tool",
    color: "#ff8f6f",
  },
  {
    id: "heartbeat",
    name: "Heartbeat Flower Shop",
    emoji: "🌸",
    tagline: "E-commerce frontend with cart & checkout flow",
    description:
      "Frontend for a flower shop e-commerce site featuring product browsing, search and filter, shopping cart, and full checkout flow. Focused on component architecture, layout responsiveness, and UX using Next.js and Tailwind CSS.",
    stack: ["JavaScript", "React", "Next.js", "Tailwind CSS", "Vercel"],
    role: "Frontend Dev",
    highlight: "E-commerce UX",
    color: "#ff6faf",
  },
  {
    id: "tacfinity",
    name: "Tacfinity",
    emoji: "🎮",
    tagline: "Multiplayer Tic Tac Toe with ELO ranking",
    description:
      "Online multiplayer Tic Tac Toe with private room codes, live WebSocket sync, and an offline AI opponent. Handled frontend UI and contributed to backend logic including an ELO-based ranking system and player stats. Used Prisma ORM; learned real-time state management across connected clients.",
    stack: [
      "TypeScript",
      "React",
      "Vite",
      "Tailwind CSS",
      "Express.js",
      "Socket.io",
      "PostgreSQL",
      "Prisma",
    ],
    role: "Full Stack",
    highlight: "ELO + WebSockets",
    color: "#bf6fff",
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
    "Supabase",
    "tRPC",
    "bcrypt",
    "Socket.io Server",
    "Prisma ORM",
  ],
  Tools: ["Git", "GitHub", "Vercel", "Docker", "Postman", "VS Code"],
};

export const education = [
  {
    school: "University of the Philippines Cebu",
    degree: "Bachelor of Science in Computer Science",
    period: "Expected: Jul 2027",
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
