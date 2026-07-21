"use client";
import React, { useState } from "react";
import { personal } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

function CopyField({ label, value, href, isExternal }: {
  label: string;
  value: string;
  href: string;
  isExternal?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copy = (e: React.MouseEvent) => {
    e.preventDefault();
    /* Clipboard API with execCommand fallback */
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      const ta = document.createElement("textarea");
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: "10px",
        color: "var(--muted)", letterSpacing: "0.15em",
        textTransform: "uppercase", marginBottom: "6px",
      }}>
        {label}
      </div>
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        style={{
          fontFamily: "var(--font-mono)", fontSize: "13px",
          color: "var(--accent2)", transition: "color 0.2s",
          display: "block", marginBottom: "6px",
        }}
        onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--accent)"; }}
        onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--accent2)"; }}
      >
        {value}
      </a>
      {!isExternal && (
        <button
          className={`copy-btn${copied ? " copied" : ""}`}
          onClick={copy}
          aria-label={copied ? "Copied!" : `Copy ${label.toLowerCase()}`}
        >
          {copied ? "✓ copied" : "copy"}
        </button>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setServerError("");
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unknown error");
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Try emailing directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="s-pad"
      style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}
    >
      <div style={{ maxWidth: "660px", margin: "0 auto" }}>
        <ScrollReveal>
          <div className="section-label" style={{ marginBottom: "16px", justifyContent: "center" }}>
            05 / contact
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 800, marginBottom: "24px", lineHeight: 1, textAlign: "center",
          }}>
            Let&apos;s Work<br />
            <span style={{ color: "var(--accent)" }}>Together.</span>
          </h2>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--muted)",
            marginBottom: "48px", lineHeight: 1.8, textAlign: "center",
          }}>
            Currently interning at eComia and open to exciting opportunities.
            Fill in the form or reach me directly.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          {submitted ? (
            <div style={{
              background: "rgba(45,212,191,0.07)", border: "1px solid var(--accent)",
              borderRadius: "12px", padding: "48px 40px", textAlign: "center", marginBottom: "48px",
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
              <h3 style={{
                fontFamily: "var(--font-display)", fontSize: "24px",
                fontWeight: 700, marginBottom: "10px", color: "var(--accent)",
              }}>
                Message Sent!
              </h3>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--muted)" }}>
                Thanks, {form.name}! I&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
              style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px" }}
            >
              <div className="contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label htmlFor="contact-name" style={{
                    display: "block", fontFamily: "var(--font-mono)", fontSize: "10px",
                    color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase",
                    marginBottom: "6px",
                  }}>
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Andre Arañas"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-input"
                    aria-describedby={errors.name ? "err-name" : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <div id="err-name" className="form-error" role="alert">{errors.name}</div>}
                </div>
                <div>
                  <label htmlFor="contact-email" style={{
                    display: "block", fontFamily: "var(--font-mono)", fontSize: "10px",
                    color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase",
                    marginBottom: "6px",
                  }}>
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="form-input"
                    aria-describedby={errors.email ? "err-email" : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <div id="err-email" className="form-error" role="alert">{errors.email}</div>}
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" style={{
                  display: "block", fontFamily: "var(--font-mono)", fontSize: "10px",
                  color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase",
                  marginBottom: "6px",
                }}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Tell me about the opportunity or project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="form-input"
                  style={{ minHeight: "140px" }}
                  aria-describedby={errors.message ? "err-message" : undefined}
                  aria-invalid={!!errors.message}
                />
                {errors.message && <div id="err-message" className="form-error" role="alert">{errors.message}</div>}
              </div>

              {serverError && (
                <div role="alert" style={{
                  fontFamily: "var(--font-mono)", fontSize: "12px",
                  color: "#f87171", padding: "10px 14px",
                  background: "rgba(248,113,113,0.08)", borderRadius: "6px",
                  border: "1px solid rgba(248,113,113,0.25)",
                }}>
                  {serverError}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: "13px",
                  letterSpacing: "0.08em", padding: "14px 32px",
                  background: "var(--accent)", color: "#0d1117",
                  border: "none", borderRadius: "4px", fontWeight: 700,
                  cursor: sending ? "wait" : "pointer",
                  opacity: sending ? 0.7 : 1,
                  transition: "opacity 0.2s, transform 0.2s",
                  alignSelf: "flex-end",
                }}
                onMouseEnter={(e) => { if (!sending) (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                {sending ? "Sending…" : "Send Message →"}
              </button>
            </form>
          )}
        </ScrollReveal>

        {/* Contact links */}
        <div className="contact-links" style={{
          display: "flex", justifyContent: "center",
          gap: "40px", paddingTop: "40px", borderTop: "1px solid var(--border)",
          flexWrap: "wrap",
        }}>
          <CopyField label="Email" value={personal.email} href={`mailto:${personal.email}`} />
          <CopyField label="GitHub" value={personal.github} href={personal.githubUrl} isExternal />
          <CopyField label="Phone" value={personal.phone} href={`tel:${personal.phone}`} />
        </div>

        {/* Footer */}
        <div style={{
          marginTop: "64px", paddingTop: "32px", borderTop: "1px solid var(--border)",
          fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted)",
          textAlign: "center", lineHeight: 2,
        }}>
          <div>
            Designed &amp; Built by{" "}
            <span style={{ color: "var(--accent)" }}>Andre Milan A. Arañas</span>
          </div>
          <div style={{ opacity: 0.6 }}>
            Next.js · TypeScript · Tailwind CSS · {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </section>
  );
}
