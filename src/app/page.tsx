import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import GitHubRepos from "@/components/GitHubRepos";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
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
        <GitHubRepos />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  );
}
