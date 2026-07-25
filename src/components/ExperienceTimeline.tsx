import React from 'react';
import { EXPERIENCES, TESTIMONIALS } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, Quote, Star, ArrowUpRight } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Path & Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
            Work Experience & Endorsements
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Track record of technical leadership, system architecture, and product impact across high-growth engineering teams.
          </p>
        </div>

        {/* Experience Timeline Grid */}
        <div className="max-w-4xl mx-auto relative border-l border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-12 text-left">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:scale-125 transition-transform" />

              <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-mono border border-cyan-500/20">
                        {exp.type}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-cyan-400 mt-0.5">{exp.company}</div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Achievements Bullet List */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    Key Achievements
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technology Badges */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 text-[11px] font-mono border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials / Endorsements Section */}
        <div className="pt-12 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-slate-100 flex items-center justify-center gap-2">
              <Quote className="w-5 h-5 text-cyan-400" />
              <span>Colleague & Leader Endorsements</span>
            </h3>
            <p className="text-xs text-slate-400">Direct feedback from directors, founders, and senior architects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-lg hover:border-slate-700 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-100">{t.name}</div>
                    <div className="text-[11px] text-cyan-400">{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
