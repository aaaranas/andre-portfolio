"use client";
import { experience } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import Mark from "./ui/mark";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="s-pad"
      style={{ maxWidth: "1200px", margin: "0 auto" }}
    >
      <ScrollReveal>
        <div className="section-label" style={{ marginBottom: "16px" }}>
          04 / work experience
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 600,
            marginBottom: "20px",
          }}
        >
          Work Experience
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "15px",
            lineHeight: 1.7,
            maxWidth: "620px",
            marginBottom: "64px",
          }}
        >
          Product work for a Cebu software team, front-end AI engineering, and freelance
          builds for local clients — in parallel with the degree.
        </p>
      </ScrollReveal>

      <div style={{ position: "relative" }}>
        {/* the spine the whole timeline hangs from */}
        <div
          style={{
            position: "absolute",
            left: "6px",
            top: "10px",
            bottom: "10px",
            width: "1px",
            background: "linear-gradient(to bottom, var(--accent), var(--border) 70%, transparent)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "44px" }}>
          {experience.map((company, c) => {
            const live = company.roles.some((r) => r.current);
            return (
              <ScrollReveal key={company.company} delay={c * 70}>
                <div style={{ paddingLeft: "40px", position: "relative" }}>
                  {/* company marker on the spine */}
                  <div
                    className={live ? "pulse" : ""}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "7px",
                      width: "13px",
                      height: "13px",
                      background: live ? "var(--accent)" : "var(--bg)",
                      border: "2px solid var(--accent)",
                      borderRadius: "50%",
                    }}
                  />

                  {/* ── company header ── */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      flexWrap: "wrap",
                      gap: "12px",
                      marginBottom: "18px",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "var(--text)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {company.company}
                    </h3>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--dim)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {company.span}
                    </span>
                    {company.roles.length > 1 && (
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          color: "var(--accent)",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--r)",
                          padding: "2px 8px",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {company.roles.length} roles
                      </span>
                    )}
                  </div>

                  {/* ── roles ── */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {company.roles.map((r) => (
                      <article
                        key={r.role + r.period}
                        className="card-glow exp-card"
                        style={{
                          background: "var(--card)",
                          border: `1px solid ${r.current ? "var(--accent)" : "var(--border)"}`,
                          borderRadius: "var(--r)",
                          padding: "22px 26px",
                          transition: "border-color 0.2s",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                            gap: "10px",
                            marginBottom: "14px",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "7px",
                                fontFamily: "var(--font-mono)",
                                fontSize: "11px",
                                color: r.current ? "var(--ok)" : "var(--muted)",
                                letterSpacing: "0.08em",
                                marginBottom: "6px",
                              }}
                            >
                              {r.current && (
                                <span
                                  style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    background: "var(--ok)",
                                    display: "inline-block",
                                    boxShadow: "0 0 6px var(--ok)",
                                  }}
                                />
                              )}
                              {r.period}
                            </div>
                            <h4
                              style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "17px",
                                fontWeight: 600,
                                color: "var(--text)",
                                marginBottom: "3px",
                              }}
                            >
                              {r.role}
                            </h4>
                            <p
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "11px",
                                color: "var(--dim)",
                                letterSpacing: "0.04em",
                              }}
                            >
                              {r.location}
                            </p>
                          </div>
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "10px",
                              padding: "3px 10px",
                              border: "1px solid var(--border)",
                              borderRadius: "var(--r)",
                              color: "var(--muted)",
                              background: "var(--bg3)",
                              letterSpacing: "0.08em",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {r.type}
                          </span>
                        </div>

                        <ul
                          style={{
                            paddingLeft: 0,
                            listStyle: "none",
                            display: "flex",
                            flexDirection: "column",
                            gap: "9px",
                            margin: 0,
                          }}
                        >
                          {r.highlights.map((h, j) => (
                            <li
                              key={j}
                              style={{
                                fontSize: "13.5px",
                                color: "var(--muted)",
                                lineHeight: 1.7,
                                display: "flex",
                                gap: "10px",
                              }}
                            >
                              <Mark
                                name="arrow"
                                size={12}
                                color="var(--accent)"
                                style={{ marginTop: "6px" }}
                              />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
