import React, { useState } from 'react';
import { PERSONAL_INFO, EXPERIENCES, SKILL_CATEGORIES } from '../data/portfolioData';
import { X, Download, Copy, Check, FileText, Printer, Mail, MapPin, Globe } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyFormattedText = () => {
    const text = `
${PERSONAL_INFO.name.toUpperCase()}
${PERSONAL_INFO.role} | ${PERSONAL_INFO.location}
Email: ${PERSONAL_INFO.email} | GitHub: ${PERSONAL_INFO.github}

SUMMARY:
${PERSONAL_INFO.bio}

EXPERIENCE:
${EXPERIENCES.map(
  (e) => `
- ${e.role} @ ${e.company} (${e.period})
  ${e.description}
  Achievements:
  ${e.achievements.map((a) => `  * ${a}`).join('\n')}
  Tech: ${e.technologies.join(', ')}
`
).join('\n')}

TECHNICAL SKILLS:
${SKILL_CATEGORIES.map(
  (c) => `${c.title}: ${c.skills.map((s) => s.name).join(', ')}`
).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 text-left relative">
        
        {/* Header Actions */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-slate-100">Curriculum Vitae</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyFormattedText}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Text Copied!' : 'Copy Plain Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>

            <button
              id="close-resume-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div id="printable-resume" className="space-y-6 text-slate-200 text-xs sm:text-sm">
          
          {/* Header Info */}
          <div className="border-b border-slate-800 pb-4 space-y-2">
            <h1 className="text-2xl font-bold text-slate-100">{PERSONAL_INFO.name}</h1>
            <p className="text-cyan-400 font-medium text-sm">{PERSONAL_INFO.role}</p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-400 font-mono pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                {PERSONAL_INFO.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {PERSONAL_INFO.location}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                github.com/andre-aranas
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-xs font-mono uppercase tracking-wider text-slate-400">
              Executive Summary
            </h4>
            <p className="text-slate-300 leading-relaxed">{PERSONAL_INFO.bio}</p>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1">
              Professional Experience
            </h4>
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="space-y-1.5">
                <div className="flex justify-between font-semibold text-slate-100">
                  <span>
                    {exp.role} — <span className="text-cyan-400">{exp.company}</span>
                  </span>
                  <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                </div>
                <p className="text-slate-300 text-xs">{exp.description}</p>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 pl-2">
                  {exp.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Core Technical Stack */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1">
              Core Technical Competencies
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.title} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-semibold text-slate-200">{cat.title}</div>
                  <div className="text-slate-400 leading-relaxed text-[11px]">
                    {cat.skills.map((s) => s.name).join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="font-bold text-xs font-mono uppercase tracking-wider text-slate-400">
              Education & Certifications
            </h4>
            <div className="flex justify-between text-xs">
              <div>
                <span className="font-semibold text-slate-100">B.S. in Computer Science & Artificial Intelligence</span>
                <p className="text-slate-400">University of California · Magna Cum Laude</p>
              </div>
              <span className="text-slate-500 font-mono">2014 — 2018</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
