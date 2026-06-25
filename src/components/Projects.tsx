"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

type Project = (typeof projects)[0] & { featured?: boolean };
const allProjects = projects as Project[];
const featuredProject = allProjects.find((p) => p.featured)!;
const gridProjects = allProjects.filter((p) => !p.featured);
const vercelProjects = gridProjects.filter((p) => p.live !== "");
const clientIds = new Set(["7gb-construction", "myle-photography"]);

type Filter = "all" | "deployed" | "client";
const filters: { key: Filter; label: string }[] = [
  { key: "all",      label: "All"         },
  { key: "deployed", label: "Personal"    },
  { key: "client",   label: "Client Work" },
];

/* ── Animated terminal for the featured project ── */
const TERMINAL_LINES = [
  { delay: 0,    el: <><span className="t-prompt">$ </span><span className="t-dim">waiting for scan...</span></> },
  { delay: 1200, el: <><span className="t-prompt">✓ </span><span className="t-key">QR_CODE </span><span className="t-dim">detected</span></> },
  { delay: 1800, el: <><span className="t-key">guest_id  </span><span className="t-dim">: </span><span className="t-val">GS-0042</span></> },
  { delay: 2300, el: <><span className="t-key">name      </span><span className="t-dim">: </span><span className="t-val">&quot;Maria Santos&quot;</span></> },
  { delay: 2700, el: <><span className="t-key">table     </span><span className="t-dim">: </span><span className="t-val">VIP-7</span></> },
  { delay: 3100, el: <><span className="t-key">status    </span><span className="t-dim">: </span><span className="t-ok">ADMITTED ✓</span></> },
  { delay: 3600, el: <><span className="t-celebrate">🎊 celebratory reveal triggered</span></> },
  { delay: 4400, el: <><span className="t-dim">— reacting to Firestore write in </span><span className="t-ok">12ms</span></> },
];

function TerminalAnimation() {
  const [shown, setShown] = useState(0);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    setShown(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    TERMINAL_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setShown(i + 1), line.delay));
    });
    timers.push(setTimeout(() => setLoop((l) => l + 1), 6200));
    return () => timers.forEach(clearTimeout);
  }, [loop]);

  return (
    <div className="terminal-window" style={{ userSelect: "none" }}>
      <div className="terminal-bar">
        {["#ff5f57","#febc2e","#28c840"].map((c) => (
          <div key={c} style={{ width: "11px", height: "11px", borderRadius: "50%", background: c }} />
        ))}
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted)", marginLeft: "8px" }}>
          event-qr-display — live
        </span>
        <span style={{ marginLeft: "auto", width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
      </div>
      <div className="terminal-body" style={{ minHeight: "220px" }}>
        {TERMINAL_LINES.slice(0, shown).map((line, i) => (
          <div key={`${loop}-${i}`} style={{ display: "flex", gap: "4px" }}>
            {line.el}
          </div>
        ))}
        {shown < TERMINAL_LINES.length && (
          <span className="blink" style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>▋</span>
        )}
      </div>
    </div>
  );
}

/* ── Browser chrome preview ── */
function BrowserPreview({ url, color, name }: { url: string; color: string; name: string }) {
  const [imgError, setImgError] = useState(false);
  const src = `https://image.thum.io/get/width/900/crop/506/noanimate/allowJPG/${url}`;
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{
        borderRadius: "8px 8px 0 0", background: "var(--bg3)",
        border: `1px solid ${color}28`, borderBottom: "none",
        padding: "7px 10px", display: "flex", alignItems: "center", gap: "8px",
      }}>
        <div style={{ display: "flex", gap: "4px" }}>
          {["#ff5f57","#febc2e","#28c840"].map((c) => (
            <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1, background: "var(--bg)", borderRadius: "4px",
          padding: "2px 8px", fontFamily: "var(--font-mono)", fontSize: "9px",
          color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          border: "1px solid var(--border)",
        }}>
          {url.replace("https://","")}
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
          style={{ fontSize: "10px", color, opacity: 0.8, flexShrink: 0 }}>↗</a>
      </div>
      <div style={{
        position: "relative", width: "100%", aspectRatio: "16/9",
        overflow: "hidden", border: `1px solid ${color}28`,
        borderRadius: "0 0 6px 6px", background: "var(--bg)",
      }}>
        {!imgError
          ? <img src={src} alt={`${name} preview`} onError={() => setImgError(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          : <div style={{
              width:"100%",height:"100%",display:"flex",flexDirection:"column",
              alignItems:"center",justifyContent:"center",gap:"8px",color:"var(--muted)",
            }}>
              <span style={{fontSize:"28px"}}>🌐</span>
              <span style={{fontFamily:"var(--font-mono)",fontSize:"10px"}}>Preview unavailable</span>
            </div>
        }
      </div>
    </div>
  );
}

/* ── 3D Tilt card wrapper ── */
function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateZ(8px)`;
    ref.current.style.transition = "transform 0.05s ease-out";
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateZ(0)";
    ref.current.style.transition = "transform 0.45s ease-out";
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transformStyle: "preserve-3d", ...style }}>
      {children}
    </div>
  );
}

/* ── Project detail modal ── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-box"
        initial={{ opacity: 0, y: 48, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 48, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
        onClick={(e) => e.stopPropagation()}
        style={{ borderTop: `3px solid ${project.color}` }}
      >
        <button onClick={onClose} style={{
          position:"absolute",top:"16px",right:"16px",
          width:"32px",height:"32px",borderRadius:"50%",
          background:"var(--bg3)",border:"1px solid var(--border)",
          color:"var(--muted)",cursor:"pointer",zIndex:10,
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:"20px",lineHeight:1,
          transition:"color 0.2s,border-color 0.2s",
        }}
          onMouseEnter={(e)=>{(e.currentTarget as HTMLElement).style.color="var(--text)";(e.currentTarget as HTMLElement).style.borderColor="var(--accent)";}}
          onMouseLeave={(e)=>{(e.currentTarget as HTMLElement).style.color="var(--muted)";(e.currentTarget as HTMLElement).style.borderColor="var(--border)";}}
        >×</button>

        <div style={{ padding: "32px" }}>
          {project.live ? (
            <div style={{ marginBottom: "28px" }}>
              <BrowserPreview url={project.live} color={project.color} name={project.name} />
            </div>
          ) : (
            <div style={{ marginBottom: "28px" }}>
              <TerminalAnimation />
            </div>
          )}

          <div style={{ display:"flex",alignItems:"flex-start",gap:"16px",marginBottom:"16px",flexWrap:"wrap" }}>
            <span style={{ fontSize: "36px" }}>{project.emoji}</span>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily:"var(--font-display)",fontSize:"30px",fontWeight:800,marginBottom:"4px" }}>{project.name}</h2>
              <div style={{ display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap" }}>
                <span style={{ fontFamily:"var(--font-mono)",fontSize:"12px",color:project.color }}>{project.role}</span>
                <span style={{ fontFamily:"var(--font-mono)",fontSize:"10px",padding:"3px 10px",border:`1px solid ${project.color}40`,borderRadius:"999px",color:project.color,background:`${project.color}0e` }}>{project.highlight}</span>
              </div>
            </div>
          </div>

          <p style={{ fontFamily:"var(--font-display)",fontSize:"17px",fontStyle:"italic",color:"var(--muted)",marginBottom:"20px",lineHeight:1.5 }}>{project.tagline}</p>
          <p style={{ fontFamily:"var(--font-body)",fontSize:"14px",color:"var(--text)",lineHeight:1.85,marginBottom:"28px",paddingTop:"20px",borderTop:"1px solid var(--border)" }}>{project.description}</p>

          <div style={{ marginBottom: "28px" }}>
            <div style={{ fontFamily:"var(--font-mono)",fontSize:"10px",color:"var(--muted)",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:"12px" }}>Tech Stack</div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:"8px" }}>
              {project.stack.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>

          <div style={{ display:"flex",gap:"12px",flexWrap:"wrap" }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:"var(--font-mono)",fontSize:"12px",letterSpacing:"0.06em",padding:"10px 24px",border:`1px solid ${project.color}55`,borderRadius:"8px",color:project.color,transition:"background 0.2s" }}
                onMouseEnter={(e)=>(e.currentTarget as HTMLElement).style.background=`${project.color}12`}
                onMouseLeave={(e)=>(e.currentTarget as HTMLElement).style.background="transparent"}
              >GitHub ↗</a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:"var(--font-mono)",fontSize:"12px",letterSpacing:"0.06em",padding:"10px 24px",background:project.color,color:"#080c10",borderRadius:"8px",fontWeight:700,transition:"opacity 0.2s" }}
                onMouseEnter={(e)=>(e.currentTarget as HTMLElement).style.opacity="0.85"}
                onMouseLeave={(e)=>(e.currentTarget as HTMLElement).style.opacity="1"}
              >Open Live Site ↗</a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main ── */
export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [modal, setModal] = useState<Project | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = vercelProjects.filter((p) => {
    if (filter === "client")   return clientIds.has(p.id);
    if (filter === "deployed") return !clientIds.has(p.id);
    return true;
  });

  return (
    <>
      <section id="projects" className="s-pad" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal>
          <div className="section-label" style={{ marginBottom: "16px" }}>02 / projects</div>
          <h2 style={{ fontFamily:"var(--font-display)",fontSize:"clamp(36px,5vw,60px)",fontWeight:800,marginBottom:"8px" }}>
            Things I&apos;ve Built
          </h2>
          <p style={{ color:"var(--muted)",fontSize:"14px",marginBottom:"48px",fontFamily:"var(--font-mono)" }}>
            Click any card to open full details.
          </p>
        </ScrollReveal>

        {/* ★ Internship spotlight ── */}
        <ScrollReveal>
          <div
            data-cursor="project"
            onClick={() => setModal(featuredProject)}
            className="spotlight-card"
            style={{ marginBottom: "64px", cursor: "none" }}
          >
            <div className="spotlight-glow" />
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"48px",alignItems:"center" }}>
              {/* Left: content */}
              <div>
                <div style={{ display:"inline-flex",alignItems:"center",gap:"8px",padding:"5px 14px",border:"1px solid rgba(251,191,36,0.4)",borderRadius:"999px",marginBottom:"24px",background:"rgba(251,191,36,0.07)" }}>
                  <span style={{width:"7px",height:"7px",borderRadius:"50%",background:"#4ade80",display:"inline-block",boxShadow:"0 0 6px #4ade80"}} />
                  <span style={{fontFamily:"var(--font-mono)",fontSize:"10px",color:"#fbbf24",letterSpacing:"0.12em"}}>★ eComia Internship · 2026</span>
                </div>
                <h3 style={{ fontFamily:"var(--font-display)",fontSize:"clamp(28px,3.5vw,48px)",fontWeight:900,marginBottom:"12px",lineHeight:1 }}>
                  Event QR<br/>
                  <span style={{color:"#fbbf24"}}>Admission</span>
                </h3>
                <p style={{ fontFamily:"var(--font-body)",fontSize:"14px",color:"var(--muted)",lineHeight:1.8,marginBottom:"24px",maxWidth:"360px" }}>
                  Full-screen kiosk display for event check-in. Reacts to real-time Firestore writes — celebrates guests with an animated reveal the instant their QR is scanned.
                </p>
                <div style={{ display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"28px" }}>
                  {featuredProject.stack.map((t) => (
                    <span key={t} className="tag" style={{borderColor:"rgba(251,191,36,0.3)",color:"#fbbf24"}}>{t}</span>
                  ))}
                </div>
                <div style={{ display:"flex",gap:"8px",alignItems:"center" }}>
                  <span style={{ fontFamily:"var(--font-mono)",fontSize:"12px",color:"var(--muted)" }}>+ JetAdmin (admin) · Flutter (scanner)</span>
                </div>
                <div style={{ marginTop:"24px",fontFamily:"var(--font-mono)",fontSize:"11px",color:"#fbbf24",letterSpacing:"0.06em",opacity:0.7 }}>
                  Click to see full details →
                </div>
              </div>
              {/* Right: terminal */}
              <div>
                <TerminalAnimation />
              </div>
            </div>

            {/* Mobile stack */}
            <style>{`
              @media(max-width:720px){
                .spotlight-grid-inner{grid-template-columns:1fr!important}
              }
            `}</style>
          </div>
        </ScrollReveal>

        {/* Filter tabs */}
        <ScrollReveal>
          <div style={{ display:"flex",gap:"10px",flexWrap:"wrap",marginBottom:"40px" }}>
            {filters.map(({ key, label }) => {
              const count = key==="all" ? vercelProjects.length : key==="client" ? vercelProjects.filter((p)=>clientIds.has(p.id)).length : vercelProjects.filter((p)=>!clientIds.has(p.id)).length;
              return (
                <button key={key} className={`filter-tab${filter===key?" active":""}`} onClick={()=>setFilter(key)}>
                  {label} <span style={{marginLeft:"5px",opacity:0.65,fontSize:"10px"}}>{count}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Cards grid with 3D tilt */}
        <motion.div layout style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:"20px" }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((proj, i) => (
              <motion.div key={proj.id} layout
                initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}}
                transition={{duration:0.25,delay:i*0.05}}
              >
                <ScrollReveal delay={i * 50}>
                  <TiltCard style={{ height:"100%" }}>
                    <div
                      data-cursor="project"
                      onClick={() => setModal(proj)}
                      onMouseEnter={() => setHovered(proj.id)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        background: hovered===proj.id ? "var(--bg3)" : "var(--card)",
                        border: `1px solid ${hovered===proj.id ? proj.color+"70" : "var(--border)"}`,
                        borderRadius:"14px",padding:"20px",
                        cursor:"none",
                        boxShadow: hovered===proj.id ? `0 20px 60px ${proj.color}1a` : "none",
                        transition:"background 0.2s,border-color 0.2s,box-shadow 0.2s",
                        position:"relative",overflow:"hidden",height:"100%",
                      }}
                    >
                      <div style={{ position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,${proj.color},transparent)`,opacity:hovered===proj.id?1:0.35,transition:"opacity 0.2s" }} />
                      <BrowserPreview url={proj.live} color={proj.color} name={proj.name} />

                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"10px" }}>
                        <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
                          <span style={{fontSize:"20px"}}>{proj.emoji}</span>
                          <div>
                            <h3 style={{fontFamily:"var(--font-display)",fontSize:"17px",fontWeight:700,marginBottom:"1px"}}>{proj.name}</h3>
                            <span style={{fontFamily:"var(--font-mono)",fontSize:"10px",color:proj.color,letterSpacing:"0.06em"}}>{proj.role}</span>
                          </div>
                        </div>
                        <span style={{fontFamily:"var(--font-mono)",fontSize:"9px",padding:"3px 9px",border:`1px solid ${proj.color}35`,borderRadius:"999px",color:proj.color,background:`${proj.color}0d`,whiteSpace:"nowrap"}}>{proj.highlight}</span>
                      </div>

                      <p style={{fontFamily:"var(--font-body)",fontSize:"13px",color:"var(--muted)",lineHeight:1.6,marginBottom:"14px"}}>{proj.tagline}</p>

                      <div style={{display:"flex",flexWrap:"wrap",gap:"5px",marginBottom:"12px"}}>
                        {proj.stack.slice(0,4).map((t)=><span key={t} className="tag">{t}</span>)}
                        {proj.stack.length>4 && <span className="tag">+{proj.stack.length-4}</span>}
                      </div>

                      <div style={{fontFamily:"var(--font-mono)",fontSize:"10px",color:"var(--accent)",opacity:hovered===proj.id?1:0,transition:"opacity 0.2s",letterSpacing:"0.05em"}}>
                        Click to view →
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>
        {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </>
  );
}
