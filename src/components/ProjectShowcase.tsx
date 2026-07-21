import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { 
  Code2, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Search, 
  Layers, 
  CheckCircle2, 
  X, 
  Copy, 
  Check, 
  Cpu, 
  ArrowUpRight 
} from 'lucide-react';

export const ProjectShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = ['All', 'AI & ML', 'Full-Stack Web', 'Cloud & Data', 'Developer Tools'];

  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Code2 className="w-3.5 h-3.5" />
            <span>Featured Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
            Production Software & AI Systems
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Detailed case studies of scalable architectures, custom AI agents, and developer tools built for performance.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 p-2.5 rounded-2xl border border-slate-800/80 backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`project-category-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="project-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech or title..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="group bg-slate-900/80 border border-slate-800/90 hover:border-slate-700/90 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5"
            >
              <div>
                {/* Image & Category Tag */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-cyan-300">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-1 rounded-md bg-amber-500/20 border border-amber-500/30 text-[10px] font-mono text-amber-300 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 text-left">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Metrics Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.metrics.map((metric, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 text-[10px] font-mono border border-slate-800/80 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                        {metric}
                      </span>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-300 text-[10px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-slate-800/50 mt-4 pt-4">
                <button
                  id={`view-details-${project.id}`}
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                >
                  <span>Architecture & Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="GitHub Code"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Live Preview"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No projects found matching your search query or category.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-cyan-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Detail & Architecture Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6 text-left relative">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-xs font-mono">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs text-slate-400">Case Study</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-100 mt-1">{selectedProject.title}</h3>
                <p className="text-xs text-slate-400">{selectedProject.tagline}</p>
              </div>

              <button
                id="close-project-modal-btn"
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-6 text-xs text-slate-300">
              {/* Overview */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>System Architecture Overview</span>
                </h4>
                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                  {selectedProject.longDescription}
                </p>
              </div>

              {/* Architecture Pillars */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  Key Technical Pillars
                </div>
                <ul className="space-y-1.5 pt-1">
                  {selectedProject.architecture.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet if Available */}
              {selectedProject.codeSnippet && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-400">
                      {selectedProject.codeSnippet.filename}
                    </span>
                    <button
                      onClick={() => handleCopyCode(selectedProject.codeSnippet?.code || '')}
                      className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto font-mono text-[11px] text-emerald-300 leading-relaxed">
                    <code>{selectedProject.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {/* Links */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Live App</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
