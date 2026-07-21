import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Cpu, Layout, Server, Cloud, Search, Sparkles, CheckCircle } from 'lucide-react';

export const TechStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [skillSearch, setSkillSearch] = useState<string>('');

  const iconsMap: Record<string, React.ReactNode> = {
    Layout: <Layout className="w-4 h-4 text-cyan-400" />,
    Server: <Server className="w-4 h-4 text-indigo-400" />,
    Cpu: <Cpu className="w-4 h-4 text-teal-400" />,
    Cloud: <Cloud className="w-4 h-4 text-emerald-400" />,
  };

  const categories = ['All', ...SKILL_CATEGORIES.map((c) => c.title)];

  const filteredCategories = SKILL_CATEGORIES.filter((cat) => {
    if (selectedCategory !== 'All' && cat.title !== selectedCategory) return false;
    return true;
  }).map((cat) => ({
    ...cat,
    skills: cat.skills.filter((skill) =>
      skill.name.toLowerCase().includes(skillSearch.toLowerCase()) ||
      skill.description.toLowerCase().includes(skillSearch.toLowerCase())
    ),
  })).filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
            Engineering & Tech Stack Matrix
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Deep technical proficiency across frontend state engines, resilient node APIs, generative AI integrations, and cloud deployments.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 p-2.5 rounded-2xl border border-slate-800/80 backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`skill-cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="skill-search-input"
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              placeholder="Search skill or framework..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((catGroup) => (
            <div
              key={catGroup.title}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    {iconsMap[catGroup.iconName] || <Cpu className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <h3 className="text-lg font-bold text-slate-100">{catGroup.title}</h3>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {catGroup.skills.length} skills
                </span>
              </div>

              <div className="space-y-5">
                {catGroup.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-200">{skill.name}</span>
                        {skill.highlight && (
                          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-mono border border-cyan-500/20">
                            Core
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400 font-mono text-[11px]">
                        {skill.years} yrs exp · {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <div
                        style={{ width: `${skill.level}%` }}
                        className={`h-full rounded-full transition-all duration-700 ${
                          skill.level >= 90
                            ? 'bg-gradient-to-r from-cyan-500 to-teal-400'
                            : 'bg-gradient-to-r from-indigo-500 to-cyan-500'
                        }`}
                      />
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed pt-0.5">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
