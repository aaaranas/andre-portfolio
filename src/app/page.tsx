import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import DataAnalystSection from "@/components/DataAnalystSection";
import AutomationSection from "@/components/AutomationSection";
import ExperienceSection from "@/components/ExperienceSection";
import Education from "@/components/Education";
import CertificationsSection from "@/components/CertificationsSection";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <DataAnalystSection />
        <AutomationSection />
        <ExperienceSection />
        <Education />
        <CertificationsSection />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
