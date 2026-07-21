import React from 'react';
import Hero from '@/components/Hero';
import Nav from '@/components/Nav';
import PortfolioTracks from '@/components/PortfolioTracks';
import Projects from '@/components/Projects';
import DataAnalystSection from '@/components/DataAnalystSection';
import AutomationSection from '@/components/AutomationSection';
import BlogSection from '@/components/BlogSection';
import CertificationsSection from '@/components/CertificationsSection';
import Skills from '@/components/Skills';
import ExperienceSection from '@/components/ExperienceSection';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Cursor from '@/components/Cursor';

export default function App() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <PortfolioTracks />
        <Projects />
        <DataAnalystSection />
        <AutomationSection />
        <ExperienceSection />
        <Education />
        <BlogSection />
        <CertificationsSection />
        <Skills />
        <Contact />
      </main>
    </>
  );
}

