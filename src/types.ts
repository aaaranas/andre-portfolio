export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'AI & ML' | 'Full-Stack Web' | 'Cloud & Data' | 'Developer Tools';
  description: string;
  longDescription: string;
  featured: boolean;
  image: string;
  metrics: string[];
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
  architecture: string[];
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    years: number;
    description: string;
    highlight?: boolean;
  }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  relationship: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
