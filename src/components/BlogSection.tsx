"use client";
import React, { useState } from "react";
import { blogPosts } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [likes, setLikes] = useState<Record<string, number>>({
    "n8n-ai-agent-automation": 24,
    "cebu-transit-data-analysis": 38,
    "websocket-offline-sync": 19,
  });

  const categories = ["All", "AI & Automation", "Data Analytics", "Web Development"];

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === selectedCategory);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <section id="blog" className="s-pad" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", gap: "20px" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--accent2)", fontFamily: "var(--font-mono)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
                <span>✍️</span> Technical Writing & Thoughts
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "var(--text)" }}>
                Articles & Blog Posts
              </h2>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontFamily: "var(--font-mono)",
                    border: "1px solid " + (selectedCategory === cat ? "var(--accent2)" : "var(--border)"),
                    background: selectedCategory === cat ? "rgba(167, 139, 250, 0.12)" : "var(--card)",
                    color: selectedCategory === cat ? "var(--accent2)" : "var(--muted)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
          {filteredPosts.map((post, idx) => (
            <ScrollReveal key={post.id} delay={idx * 80}>
              <div
                onClick={() => setSelectedPost(post)}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "28px",
                  cursor: "pointer",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "var(--accent2)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(167, 139, 250, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--accent2)", background: "rgba(167, 139, 250, 0.1)", padding: "4px 10px", borderRadius: "12px", border: "1px solid rgba(167, 139, 250, 0.2)" }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
                      {post.readTime}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--text)", lineHeight: 1.35, marginBottom: "12px" }}>
                    {post.title}
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
                    {post.excerpt}
                  </p>
                </div>
                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                    {post.tags.map((tag) => (
                      <span key={tag} style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)", background: "var(--bg3)", padding: "2px 8px", borderRadius: "4px" }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid var(--border)", fontSize: "12px", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
                    <span>{post.date}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <button
                        onClick={(e) => handleLike(post.id, e)}
                        style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                      >
                        ❤️ <span>{likes[post.id] || 0}</span>
                      </button>
                      <span style={{ color: "var(--accent2)", fontWeight: 600 }}>Read Article →</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {selectedPost && (
        <div className="modal-backdrop" onClick={() => setSelectedPost(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "780px", padding: "36px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
              <div>
                <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--accent2)", background: "rgba(167, 139, 250, 0.12)", padding: "4px 12px", borderRadius: "14px", border: "1px solid rgba(167, 139, 250, 0.3)", display: "inline-block", marginBottom: "12px" }}>
                  {selectedPost.category}
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 700, color: "var(--text)", lineHeight: 1.3 }}>
                  {selectedPost.title}
                </h2>
                <div style={{ display: "flex", gap: "16px", marginTop: "12px", fontSize: "13px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
                  <span>📅 {selectedPost.date}</span>
                  <span>⏱️ {selectedPost.readTime}</span>
                  <span>❤️ {likes[selectedPost.id] || 0}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text)", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}
              >
                ✕
              </button>
            </div>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "24px", color: "var(--text)", fontSize: "15px", lineHeight: 1.85, whiteSpace: "pre-line", maxHeight: "55vh", overflowY: "auto" }}>
              {selectedPost.content}
            </div>
            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button
                onClick={(e) => handleLike(selectedPost.id, e)}
                style={{ background: "rgba(167, 139, 250, 0.15)", border: "1px solid var(--accent2)", color: "var(--accent2)", padding: "8px 18px", borderRadius: "8px", fontSize: "13px", fontFamily: "var(--font-mono)", cursor: "pointer", fontWeight: 600 }}
              >
                ❤️ Like ({likes[selectedPost.id] || 0})
              </button>
              <button
                onClick={() => setSelectedPost(null)}
                style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text)", padding: "8px 18px", borderRadius: "8px", fontSize: "13px", fontFamily: "var(--font-mono)", cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
