import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  Sparkles, 
  Code2, 
  Briefcase, 
  Cpu, 
  Terminal, 
  Send, 
  FileText, 
  Bot, 
  Menu, 
  X,
  Circle
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAIAssistant: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenAIAssistant,
  onOpenResume,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'demos', label: 'Live Demos', icon: Terminal },
    { id: 'skills', label: 'Tech Stack', icon: Cpu },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Send },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          id="nav-logo-btn"
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/10 group-hover:shadow-cyan-500/25 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-bold text-slate-100 text-lg group-hover:text-cyan-400 transition-colors">
              AA
            </div>
          </div>
          <div>
            <div className="font-semibold text-slate-100 tracking-tight text-base flex items-center gap-2">
              <span>{PERSONAL_INFO.name}</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Available for hire" />
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Full-Stack & AI Engineer</p>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            id="open-ai-assistant-btn"
            onClick={onOpenAIAssistant}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-indigo-300 border border-indigo-500/30 hover:border-indigo-400/60 hover:bg-indigo-500/30 transition-all shadow-sm"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>AI Assistant</span>
          </button>

          <button
            id="view-resume-nav-btn"
            onClick={onOpenResume}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="mobile-ai-assistant-btn"
            onClick={onOpenAIAssistant}
            className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs flex items-center gap-1"
          >
            <Bot className="w-4 h-4 text-indigo-400" />
          </button>

          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 mt-2 backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2 mt-2">
              <button
                id="mobile-view-resume-btn"
                onClick={() => {
                  onOpenResume();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-slate-800 text-slate-200"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Resume</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
