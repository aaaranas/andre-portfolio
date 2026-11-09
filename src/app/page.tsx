import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Work from "@/components/Work";
import ExperienceSection from "@/components/ExperienceSection";
import Background from "@/components/Background";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Work />
        <ExperienceSection />
        <Background />
        <Contact />
      </main>
    </>
  );
}
