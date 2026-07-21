import { Project, SkillCategory, Experience, Testimonial } from '../types';
import avatarImg from '../assets/images/developer_avatar_1784660023143.jpg';

export const PERSONAL_INFO = {
  name: 'Andre M. Aranas',
  role: 'Senior Full-Stack & AI Systems Engineer',
  tagline: 'Architecting high-performance web applications, cloud pipelines, and intelligent AI features.',
  bio: 'I specialize in bridging the gap between cutting-edge AI models and production-grade full-stack architecture. With 6+ years of experience in TypeScript, React, Node.js, and LLM engineering, I craft resilient digital products that scale seamlessly.',
  location: 'San Francisco, CA (Remote Available)',
  email: 'andremilanaranas@gmail.com',
  github: 'https://github.com/andre-aranas',
  linkedin: 'https://linkedin.com/in/andre-aranas',
  twitter: 'https://twitter.com/andre_aranas',
  avatarUrl: avatarImg,
  availabilityStatus: 'Available for Select Projects & Senior Roles',
  quickStats: [
    { label: 'Years Experience', value: '6+' },
    { label: 'Projects Shipped', value: '28+' },
    { label: 'API Requests / Day', value: '1.2M+' },
    { label: 'Avg System Uptime', value: '99.98%' },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'synthetix-ai',
    title: 'Synthetix AI Studio',
    tagline: 'Multi-agent LLM orchestration canvas & real-time content engine',
    category: 'AI & ML',
    featured: true,
    description: 'An enterprise workspace for designing, testing, and chaining autonomous Gemini AI agents with live visual debugging.',
    longDescription: 'Synthetix AI Studio allows product teams to build complex multi-step generative workflows without writing boilerplate code. Powered by Google Gemini 2.5 API, SSE streaming, and a node-based DAG editor.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    metrics: ['Sub-200ms TTFT streaming', 'Used by 1,400+ developers', '4.9/5 User Satisfaction'],
    techStack: ['React', 'TypeScript', 'Gemini API', 'Express', 'Tailwind CSS', 'WebSockets'],
    githubUrl: 'https://github.com/andre-aranas/synthetix-ai-studio',
    demoUrl: 'https://synthetix.demo.app',
    architecture: [
      'Node.js Express proxy with encrypted API key vaults',
      'Client-side state machine using React Context and custom hooks',
      'Server-Sent Events (SSE) for low-latency AI token streaming',
      'PostgreSQL database for saved workspace templates',
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'ai-orchestrator.ts',
      code: `import { GoogleGenAI } from '@google/genai';

export async function executeAgentPipeline(prompt: string, context: string[]) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      { role: 'user', parts: [{ text: \`Context: \${context.join('\\n')}\\nQuery: \${prompt}\` }] }
    ]
  });
  return response.text;
}`,
    },
  },
  {
    id: 'nexus-analytics',
    title: 'Nexus Stream Dashboard',
    tagline: 'High-frequency telemetry visualizer for microservice clusters',
    category: 'Cloud & Data',
    featured: true,
    description: 'Real-time monitoring platform rendering 100k+ system metrics/sec with custom WebGL charts and automated anomaly alerts.',
    longDescription: 'Nexus stream provides DevOps and SRE teams instant visibility into Kubernetes cluster throughput, CPU bottlenecks, and API error rates using web sockets and optimized canvas charts.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    metrics: ['100k events/sec processed', '<10ms canvas render loop', '-35% mean time to resolution'],
    techStack: ['React', 'TypeScript', 'Recharts', 'Redis', 'Express', 'Tailwind CSS'],
    githubUrl: 'https://github.com/andre-aranas/nexus-stream',
    demoUrl: 'https://nexus.demo.app',
    architecture: [
      'Redis Pub/Sub ingestion pipeline',
      'Offscreen Canvas rendering loop for zero UI lag',
      'Adaptive time-series data rollup in worker threads',
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'useMetricsStream.ts',
      code: `export function useMetricsStream(bufferSize = 100) {
  const [data, setData] = useState<MetricPoint[]>([]);
  useEffect(() => {
    const ws = new WebSocket(STREAM_URL);
    ws.onmessage = (evt) => {
      const point = JSON.parse(evt.data);
      setData((prev) => [...prev.slice(-bufferSize), point]);
    };
    return () => ws.close();
  }, [bufferSize]);
  return data;
}`,
    },
  },
  {
    id: 'flowstate-ide',
    title: 'FlowState Code Canvas',
    tagline: 'Browser-based visual IDE with multiplayer AI pair programming',
    category: 'Developer Tools',
    featured: true,
    description: 'A lightning-fast web code editor featuring instant preview, Monaco integration, CRDT real-time collaboration, and AI code completion.',
    longDescription: 'FlowState lets engineering teams collaborate on full-stack apps directly in the browser with synchronized state, hot reloads, and intelligent inline code transformations.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    metrics: ['Zero-lag typing speed', 'WebRTC peer mesh sync', '45% faster code reviews'],
    techStack: ['React', 'TypeScript', 'Monaco Editor', 'Vite', 'Tailwind CSS'],
    githubUrl: 'https://github.com/andre-aranas/flowstate-canvas',
    demoUrl: 'https://flowstate.demo.app',
    architecture: [
      'In-browser WebContainer runtime environment',
      'Yjs CRDT protocol for conflict-free multiplayer editing',
      'Gemini API powered auto-complete engine',
    ],
  },
  {
    id: 'aura-commerce',
    title: 'Aura Headless E-Commerce',
    tagline: 'Ultra-fast headless commerce platform with smart search',
    category: 'Full-Stack Web',
    featured: false,
    description: 'Modern storefront architecture delivering 99+ Lighthouse performance scores with intelligent product recommendations.',
    longDescription: 'Designed for high-growth brands, Aura combines sub-second page transitions, dynamic cart state management, and edge-side AI personalization.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    metrics: ['99 Lighthouse Performance', '+38% checkout conversion', '<300ms global load time'],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Stripe API'],
    githubUrl: 'https://github.com/andre-aranas/aura-commerce',
    demoUrl: 'https://aura.demo.app',
    architecture: [
      'Edge SSR and Incremental Static Regeneration',
      'Stripe Elements & secure webhook handling',
      'Algolia vector search with AI similarity ranking',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Architecture',
    iconName: 'Layout',
    skills: [
      { name: 'React 19 / Next.js', level: 96, years: 6, description: 'Hooks, Server Components, Concurrent Mode, Context & State optimization', highlight: true },
      { name: 'TypeScript', level: 95, years: 5, description: 'Strict typing, Generics, Utility types, Custom AST transformers', highlight: true },
      { name: 'Tailwind CSS', level: 98, years: 5, description: 'Custom design systems, CSS container queries, fluid typography', highlight: true },
      { name: 'State Management (Zustand/Redux)', level: 90, years: 5, description: 'Slices, persistent middleware, state machine patterns' },
      { name: 'Motion / Animations', level: 88, years: 4, description: 'Layout shifts, gesture physics, micro-interactions' },
    ],
  },
  {
    title: 'Backend & APIs',
    iconName: 'Server',
    skills: [
      { name: 'Node.js & Express', level: 92, years: 6, description: 'RESTful endpoints, middleware, rate-limiting, authentication', highlight: true },
      { name: 'Python & FastAPI', level: 85, years: 4, description: 'Async endpoints, Pydantic validation, AI pipeline triggers' },
      { name: 'PostgreSQL & Drizzle/Prisma', level: 88, years: 5, description: 'Relational schemas, query indexing, migration safety', highlight: true },
      { name: 'Redis & Caching', level: 86, years: 4, description: 'Pub/Sub queues, distributed locking, rate limit buffers' },
      { name: 'GraphQL & WebSockets', level: 84, years: 4, description: 'Real-time subscriptions, schema stitching, SSE fallbacks' },
    ],
  },
  {
    title: 'AI & Machine Learning',
    iconName: 'Cpu',
    skills: [
      { name: 'Google Gemini API', level: 94, years: 2, description: 'Prompt engineering, Function calling, Streaming SSE, Structured JSON mode', highlight: true },
      { name: 'Vector DBs (Pinecone/pgvector)', level: 85, years: 2, description: 'RAG pipelines, embeddings indexing, cosine similarity search' },
      { name: 'LangChain / LlamaIndex', level: 82, years: 2, description: 'Agentic workflows, memory persistence, tool routing' },
      { name: 'AI UX Integration', level: 92, years: 3, description: 'Optimistic UI, streaming text parsing, graceful fallback handling' },
    ],
  },
  {
    title: 'Cloud & Infrastructure',
    iconName: 'Cloud',
    skills: [
      { name: 'Docker & Containers', level: 88, years: 4, description: 'Multi-stage builds, minimal images, local compose setups', highlight: true },
      { name: 'GCP & Cloud Run', level: 90, years: 4, description: 'Serverless deployment, secret manager, IAM security rules' },
      { name: 'CI/CD Pipelines', level: 86, years: 4, description: 'GitHub Actions, automated test suites, staging preview deployments' },
      { name: 'Vite & Build Tools', level: 92, years: 5, description: 'Custom plugins, esbuild bundling, code-splitting strategies' },
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-flyrank',
    role: 'Front-End AI Engineering Intern',
    company: 'FlyRank AI',
    period: 'Jul 2026 — Present (1 mo)',
    location: 'Remote / Internship',
    type: 'Internship',
    description: 'Focusing on Front-End AI Engineering, developing UI architectures and integrating Generative AI capabilities.',
    achievements: [
      'Currently interning at FlyRank AI as an AI intern, focusing on Front-end AI Engineering.',
      'Implementing UI components that dynamically stream and render AI workflow outputs.',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'AI Models', 'Front-End AI'],
  },
  {
    id: 'exp-ecomia',
    role: 'Web Development Intern',
    company: 'eComia',
    period: 'Jun 2026 — Present (2 mos)',
    location: 'Cebu City, PH',
    type: 'Internship',
    description: 'Project manager on two internal systems, leading a five-person team from planning through delivery.',
    achievements: [
      'Project manager on two internal systems, leading a five-person team from planning through delivery.',
      'Set the frontend architecture and authentication layer on a web platform for tracking company resources, delegating feature work to teammates while holding review and architecture decisions.',
      'Coordinated a real-time check-in system spanning a live display, a mobile scanner, and an admin panel on a shared backend — and built the display myself.',
    ],
    technologies: ['React', 'Next.js', 'Vite', 'Firebase / Firestore', 'Flutter', 'JetAdmin'],
  },
  {
    id: 'exp-upwork',
    role: 'Software Developer',
    company: 'Upwork',
    period: 'Aug 2024 — Present (2 yrs)',
    location: 'Cebu City / Freelance',
    type: 'Freelance',
    description: 'Freelance web and mobile developer working with Cebu-based clients and civic projects, scoping and shipping each build solo.',
    achievements: [
      'Built a multimodal public transport planner for Cebu Province with Next.js, using MapLibre GL for route rendering.',
      'Built a community-driven Flutter app that crowdsources and maps bidet locations across Cebu.',
      'Built a portfolio and booking site for a Cebu-based event photographer with Next.js.',
      'Built a professional website for a Cebu-based contracting firm with Next.js.',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'MapLibre GL', 'Flutter', 'Tailwind CSS'],
  },
  {
    id: 'exp-usc',
    role: 'Electronics & Communications Engineering Intern',
    company: 'University of San Carlos',
    period: 'Jun 2019 — Jul 2019 (2 mos)',
    location: 'Cebu City, PH',
    type: 'Research Immersion',
    description: 'Two-month research immersion in electronics and IoT — Arduino prototyping and sensor integration.',
    achievements: [
      'Two-month research immersion in electronics and IoT — Arduino prototyping and sensor integration.',
      'Groundwork for SIMOY, an air-quality monitor for communities near landfill sites that later earned a Philippine industrial design patent (PH32020050104) and an International Award of Merit at the Malaysia Technology Expo.',
    ],
    technologies: ['Arduino', 'IoT Sensors', 'C/C++', 'Hardware Prototyping', 'Patent Research'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Chen',
    role: 'VP of Product',
    company: 'Nova Tech Labs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    content: 'Andre is an exceptional engineering talent. He seamlessly turns complex AI concepts into intuitive, rock-solid web interfaces that users love. His attention to detail and system performance is outstanding.',
    relationship: 'Managed Andre directly at Nova Tech Labs',
  },
  {
    id: 'test-2',
    name: 'Marcus Vance',
    role: 'Principal Architect',
    company: 'CyberPulse',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content: 'Working with Andre was a game changer for our backend throughput. His work on our real-time streaming pipeline saved us months of refactoring and drastically lowered infrastructure costs.',
    relationship: 'Collaborated on Nexus Stream platform',
  },
  {
    id: 'test-3',
    name: 'Elena Rostova',
    role: 'Founder & CEO',
    company: 'Aura Digital',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    content: 'Andre built our flagship e-commerce platform from scratch. Not only did we achieve a sub-300ms page load speed, but our checkout conversions surged by 38% immediately after launch.',
    relationship: 'Client for Aura Commerce Platform',
  },
];
