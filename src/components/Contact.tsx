"use client";
import { useState } from "react";
import { personal } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="s-pad"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "660px", margin: "0 auto" }}>
        <ScrollReveal>
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
              textAlign: "center",
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
              textAlign: "center",
            }}
          >
            I&apos;m actively looking for a software developer internship.
            Fill in the form below or reach me directly.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          {submitted ? (
            <div
              style={{
                background: "rgba(127,255,111,0.07)",
                border: "1px solid var(--accent)",
                borderRadius: "8px",
                padding: "40px",
                textAlign: "center",
                marginBottom: "48px",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>✓</div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "10px",
                  color: "var(--accent)",
                }}
              >
                Message Sent!
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  color: "var(--muted)",
                }}
              >
                Thanks, {form.name}! I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "48px",
              }}
            >
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="form-input"
                />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="form-input"
                />
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>
              <div>
                <textarea
                  placeholder="Your message..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="form-input"
                />
                {errors.message && (
                  <div className="form-error">{errors.message}</div>
                )}
              </div>
              <button
                type="submit"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  padding: "14px 32px",
                  background: "var(--accent)",
                  color: "#000",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "opacity 0.2s, transform 0.2s",
                  alignSelf: "flex-end",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.85";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Send Message →
              </button>
            </form>
          )}
        </ScrollReveal>

        <div
          className="contact-links"
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
            textAlign: "center",
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
