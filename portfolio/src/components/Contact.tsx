"use client";
import { personal } from "@/lib/data";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "120px 64px",
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
        <div
          className="section-label"
          style={{ marginBottom: "16px", justifyContent: "center" }}
        >
          05 / contact
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 800,
            marginBottom: "24px",
            lineHeight: 1,
          }}
        >
          Let&apos;s Work
          <br />
          <span style={{ color: "var(--accent)" }}>Together.</span>
        </h2>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            color: "var(--muted)",
            marginBottom: "48px",
            lineHeight: 1.8,
          }}
        >
          I&apos;m actively looking for a software developer internship this
          summer. If you&apos;re hiring or just want to connect, my inbox is open.
        </p>

        <a
          href={`mailto:${personal.email}`}
          style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            letterSpacing: "0.08em",
            padding: "16px 40px",
            background: "var(--accent)",
            color: "#000",
            borderRadius: "4px",
            fontWeight: 700,
            transition: "opacity 0.2s, transform 0.2s",
            marginBottom: "64px",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.opacity = "0.85";
            (e.target as HTMLElement).style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          Say Hello →
        </a>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            paddingTop: "40px",
            borderTop: "1px solid var(--border)",
          }}
        >
          {[
            { label: "Email", value: personal.email, href: `mailto:${personal.email}` },
            { label: "GitHub", value: personal.github, href: personal.githubUrl },
            { label: "Phone", value: personal.phone, href: `tel:${personal.phone}` },
          ].map(({ label, value, href }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--muted)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
                {label}
              </div>
              <a
                href={href}
                target={label === "GitHub" ? "_blank" : undefined}
                rel={label === "GitHub" ? "noopener noreferrer" : undefined}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  color: "var(--accent2)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "var(--accent2)";
                }}
              >
                {value}
              </a>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "64px",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--muted)",
          }}
        >
          Built with Next.js · TypeScript · Tailwind CSS
          <br />
          Andre Milan A. Arañas · {new Date().getFullYear()}
        </div>
      </div>
    </section>
  );
}
