import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Github, Linkedin, Twitter, ArrowUp, Activity, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const [serverStatus, setServerStatus] = useState<'online' | 'checking' | 'offline'>('checking');

  useEffect(() => {
    fetch('/api/health')
      .then((res) => {
        if (res.ok) setServerStatus('online');
        else setServerStatus('offline');
      })
      .catch(() => setServerStatus('offline'));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand */}
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-slate-100 text-base flex items-center justify-center sm:justify-start gap-2">
              <span>{PERSONAL_INFO.name}</span>
              <span className="text-slate-500 font-normal">| Portfolio</span>
            </div>
            <p className="text-slate-500 text-xs">{PERSONAL_INFO.tagline}</p>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>API Server:</span>
            {serverStatus === 'checking' && <span className="text-amber-400">Checking...</span>}
            {serverStatus === 'online' && <span className="text-emerald-400 font-bold">Online (99.98%)</span>}
            {serverStatus === 'offline' && <span className="text-rose-400 font-bold">Offline</span>}
          </div>

          {/* Socials & Top Scroll */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.twitter}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>

            <button
              id="footer-back-to-top-btn"
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-colors ml-2"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React 19, TypeScript, Express, Tailwind CSS & Google Gemini API.
          </div>
          <div className="flex items-center gap-1 text-slate-600 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Encrypted Production Build</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
