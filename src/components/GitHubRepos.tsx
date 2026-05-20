"use client";
import { useEffect, useState } from "react";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Dart: "#00B4AB",
  CSS: "#563d7c",
  HTML: "#e34c26",
};

export default function GitHubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.github.com/users/aaaranas/repos?sort=updated&per_page=12&type=owner"
    )
      .then((r) => {
        if (!r.ok) throw new Error("api error");
        return r.json();
      })
      .then((data: Repo[]) => {
        setRepos(data.filter((r) => !r.fork && !r.name.startsWith(".")).slice(0, 6));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (error || (!loading && repos.length === 0)) return null;

  return (
    <section
      id="github"
      className="s-pad"
      style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: "16px" }}>
          // live repos
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 800,
            marginBottom: "8px",
          }}
        >
          On GitHub
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "14px",
            marginBottom: "48px",
            fontFamily: "var(--font-mono)",
          }}
        >
          Fetched live from the GitHub API · most recently updated.
        </p>

        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "16px",
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  height: "110px",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  opacity: 0.5,
                }}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "16px",
            }}
          >
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "20px",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--accent2)",
                      wordBreak: "break-all",
                    }}
                  >
                    {repo.name}
                  </span>
                  {repo.stargazers_count > 0 && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--muted)",
                        marginLeft: "8px",
                        flexShrink: 0,
                      }}
                    >
                      ★ {repo.stargazers_count}
                    </span>
                  )}
                </div>
                {repo.description && (
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: "var(--muted)",
                      lineHeight: 1.6,
                      marginBottom: "12px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {repo.description}
                  </p>
                )}
                {repo.language && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: LANG_COLORS[repo.language] ?? "var(--muted)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--muted)",
                      }}
                    >
                      {repo.language}
                    </span>
                  </div>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
