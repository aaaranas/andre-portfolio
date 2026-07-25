export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'Full-Stack' | 'Web Dev' | 'AI & ML';
  image: string;
  tags: string[];
  metrics: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export interface DataAnalystProject {
  id: string;
  title: string;
  subtitle: string;
  tools: string[];
  keyDataset: string;
  insights: string[];
  sqlSnippet?: string;
  chartData?: { label: string; value: number }[];
  dashboardUrl?: string;
}

export interface AutomationProject {
  id: string;
  title: string;
  description: string;
  impact: string;
  techStack: string[];
  workflowSteps: string[];
  timeSaved: string;
  codeSnippet?: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  topics: string[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; icon?: string }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  badgeUrl: string;
  verifyUrl: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}
