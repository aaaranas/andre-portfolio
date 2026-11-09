"use client";
import ScrollReveal from "./ScrollReveal";
import EducationBlock from "./Education";
import SkillsBlock from "./Skills";
import CertificationsBlock from "./CertificationsSection";

/**
 * Education, stack and credentials in one section.
 *
 * These were three separate full-page sections; certifications alone ran longer
 * than the project grid, which put a DataCamp badge on equal footing with a
 * year of shipped work. They are supporting evidence, so they read as one block
 * of background rather than three destinations.
 */
function SubHeading({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "14px",
        marginBottom: "28px",
        paddingBottom: "12px",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <span
        aria-hidden
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "0.14em",
          color: "var(--accent)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {n}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(22px, 2.6vw, 30px)",
          fontWeight: 600,
          letterSpacing: "-0.03em",
        }}
      >
        {children}
      </h3>
    </div>
  );
}

export default function Background() {
  return (
    <section
      id="background"
      className="s-pad"
      style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal>
          <div className="section-label" style={{ marginBottom: "16px" }}>
            03 / background
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 600,
              marginBottom: "20px",
            }}
          >
            Background
          </h2>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "15px",
              lineHeight: 1.7,
              maxWidth: "620px",
              marginBottom: "72px",
            }}
          >
            Computer science at UP Cebu, after two years of statistics — which is where the
            data side of this portfolio comes from.
          </p>
        </ScrollReveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "76px" }}>
          <div>
            <ScrollReveal>
              <SubHeading n="3.1">Education</SubHeading>
            </ScrollReveal>
            <EducationBlock />
          </div>

          <div>
            <ScrollReveal>
              <SubHeading n="3.2">Tech stack</SubHeading>
            </ScrollReveal>
            <SkillsBlock />
          </div>

          <div>
            <ScrollReveal>
              <SubHeading n="3.3">Certifications</SubHeading>
            </ScrollReveal>
            <CertificationsBlock />
          </div>
        </div>
      </div>
    </section>
  );
}
