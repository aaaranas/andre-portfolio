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
  /** Month the credential was issued, e.g. "Aug 2026". */
  date: string;
  /** Only set for credentials that lapse. */
  expires?: string;
  credentialId: string;
  category: string;
  /** Drives the accent used by the card, badge and certificate preview. */
  badgeColor: string;
  iconType: string;
  skills: string[];
  verificationUrl: string;
  description: string;
  /**
   * Path under /public to a scan of the issued certificate. When absent the
   * section renders its own summary panel instead.
   */
  previewImage?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  highlights: string[];
}
