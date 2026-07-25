"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { personal } from "@/lib/data";
import ParticleCanvas from "./ParticleCanvas";

const roles = [
  "Web Developer Intern",
  "Frontend Engineer",
  "React & Next.js Dev",
  "Full Stack Builder",
  "UI Craftsman",
];

const EASE: [number,number,number,number] = [0.22, 1, 0.36, 1];

/* Magnetic button wrapper */
function MagneticBtn({
  children, href, primary, target, rel,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.38);
    y.set((e.clientY - (r.top  + r.height / 2)) * 0.38);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      style={{
        x: sx, y: sy,
        display: "inline-block",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        letterSpacing: "0.08em",
        padding: "14px 36px",
        borderRadius: "999px",
        fontWeight: 700,
        ...(primary
          ? { background: "var(--accent)", color: "#080c10" }
          : { border: "1px solid var(--border)", color: "var(--text)" }),
        transition: "box-shadow 0.25s, background 0.25s",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={primary
        ? { boxShadow: "0 10px 36px rgba(45,212,191,0.4)" }
        : { borderColor: "var(--accent)", background: "rgba(45,212,191,0.06)" }}
    >
      {children}
    </motion.a>
  );
}

/* Split-char name animation */
function SplitName({ text, color }: { text: string; color?: boolean }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.4 + i * 0.04, duration: 0.55, ease: EASE }}
          style={{
            display: "inline-block",
            color: color ? "var(--accent)" : undefined,
          }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </>
  );
}

/* Counter animation */
function Counter({ target, suffix = "" }: { target: number | string; suffix?: string }) {
  const [val, setVal] = useState(0);
  const isNum = typeof target === "number";

  useEffect(() => {
    if (!isNum) return;
    let start = 0;
    const end = target as number;
    const step = Math.ceil(end / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(timer); }
      else setVal(start);
    }, 40);
    return () => clearInterval(timer);
  }, [target, isNum]);

  return <>{isNum ? `${val}${suffix}` : target}</>;
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const tickRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const cur = roles[roleIdx];
    if (!deleting && displayed.length < cur.length) {
      tickRef.current = setTimeout(() => setDisplayed(cur.slice(0, displayed.length + 1)), 72);
    } else if (!deleting && displayed.length === cur.length) {
      tickRef.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      tickRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 34);
    } else {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => { if (tickRef.current) clearTimeout(tickRef.current); };
  }, [displayed, deleting, roleIdx]);

  return (
    <section
      id="about"
      className="hero-pad"
      style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Dot-grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(45,212,191,0.07) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
        zIndex: 0,
      }} />

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Ambient glows */}
      <div style={{
        position:"absolute",top:"8%",right:"4%",
        width:"640px",height:"640px",pointerEvents:"none",zIndex:0,
        background:"radial-gradient(circle,rgba(45,212,191,0.07) 0%,transparent 65%)",
      }}/>
      <div style={{
        position:"absolute",bottom:"8%",left:"-2%",
        width:"480px",height:"480px",pointerEvents:"none",zIndex:0,
        background:"radial-gradient(circle,rgba(167,139,250,0.06) 0%,transparent 65%)",
      }}/>

      {/* Content */}
      <div style={{ position:"relative", zIndex:1, maxWidth:"820px", width:"100%", display:"flex", flexDirection:"column", alignItems:"center" }}>

        {/* Avatar */}
        <motion.div
          initial={{ opacity:0, scale:0.7 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ delay:0.1, duration:0.6, ease:EASE }}
          className="pulse"
          style={{
            width:"116px",height:"116px",borderRadius:"50%",
            border:"2px solid var(--accent)",
            boxShadow:"0 0 0 6px rgba(45,212,191,0.08), 0 0 48px rgba(45,212,191,0.18)",
            marginBottom:"28px",position:"relative",overflow:"hidden",flexShrink:0,
          }}
        >
          <Image src="/photo.jpg" alt="Andre Milan Arañas" fill sizes="116px" priority style={{objectFit:"cover",objectPosition:"50% 18%"}} />
          <div style={{position:"absolute",bottom:"7px",right:"7px",width:"14px",height:"14px",background:"#4ade80",borderRadius:"50%",border:"2.5px solid var(--bg)"}} />
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity:0, y:12 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.2, duration:0.5, ease:EASE }}
          style={{
            display:"inline-flex",alignItems:"center",gap:"8px",
            padding:"6px 18px",
            border:"1px solid rgba(45,212,191,0.3)",
            borderRadius:"999px",marginBottom:"36px",
            background:"rgba(45,212,191,0.06)",
          }}
        >
          <span style={{width:"7px",height:"7px",borderRadius:"50%",background:"#4ade80",display:"inline-block",boxShadow:"0 0 8px #4ade80"}} />
          <span style={{fontFamily:"var(--font-mono)",fontSize:"11px",color:"var(--accent)",letterSpacing:"0.1em"}}>
            Web Developer Intern · eComia · Cebu City, PH
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.div
          initial={{opacity:0}} animate={{opacity:1}}
          transition={{delay:0.35, duration:0.4}}
          style={{fontFamily:"var(--font-mono)",fontSize:"13px",color:"var(--muted)",marginBottom:"10px",letterSpacing:"0.08em"}}
        >
          &gt; hello, I&apos;m
        </motion.div>

        {/* Name — split chars */}
        <h1
          data-text="Andre Milan Arañas"
          className="glitch"
          style={{
            fontFamily:"var(--font-display)",
            fontSize:"clamp(52px,9.5vw,118px)",
            fontWeight:900,lineHeight:0.88,
            letterSpacing:"-0.04em",marginBottom:"28px",
            perspective:"600px",
          }}
        >
          <div><SplitName text="Andre Milan" /></div>
          <div><SplitName text="Arañas" color /></div>
        </h1>

        {/* Typewriter */}
        <motion.div
          initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.9}}
          style={{
            fontFamily:"var(--font-mono)",
            fontSize:"clamp(13px,2vw,19px)",
            color:"var(--muted)",marginBottom:"32px",
            height:"28px",display:"flex",alignItems:"center",justifyContent:"center",gap:"2px",
          }}
        >
          <span style={{color:"var(--accent2)"}}>{displayed}</span>
          <span className="blink" style={{color:"var(--accent2)",fontWeight:700}}>_</span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
          transition={{delay:1.0,duration:0.5,ease:EASE}}
          style={{
            maxWidth:"520px",color:"var(--muted)",
            fontSize:"15px",lineHeight:1.85,marginBottom:"44px",
            fontFamily:"var(--font-body)",
          }}
        >
          {personal.bio}
        </motion.p>

        {/* Magnetic CTAs */}
        <motion.div
          initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
          transition={{delay:1.1,duration:0.5,ease:EASE}}
          style={{display:"flex",gap:"16px",flexWrap:"wrap",justifyContent:"center"}}
        >
          <MagneticBtn href="#projects" primary>View Projects →</MagneticBtn>
          <MagneticBtn href={personal.githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</MagneticBtn>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3,duration:0.6}}
          className="hero-stats"
          style={{
            display:"flex",gap:"60px",
            marginTop:"72px",paddingTop:"40px",
            borderTop:"1px solid var(--border)",
            justifyContent:"center",
          }}
        >
          {([
            { val: 9, suffix: "+", label: "Projects" },
            { val: "3rd",  suffix: "",  label: "Year · UP Cebu" },
            { val: 1,  suffix: "",  label: "Active Internship" },
          ] as const).map(({ val, suffix, label }) => (
            <div key={label} style={{textAlign:"center"}}>
              <div style={{fontFamily:"var(--font-display)",fontSize:"42px",fontWeight:900,color:"var(--accent)",lineHeight:1,fontStyle:"italic"}}>
                <Counter target={val as number} suffix={suffix} />
              </div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:"11px",color:"var(--muted)",marginTop:"6px",letterSpacing:"0.05em"}}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll line */}
      <div style={{position:"absolute",bottom:"36px",right:"clamp(20px,5vw,64px)",display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",zIndex:1}}>
        <div style={{fontFamily:"var(--font-mono)",fontSize:"10px",color:"var(--muted)",writingMode:"vertical-rl",letterSpacing:"0.15em"}}>scroll</div>
        <div style={{width:"1px",height:"60px",background:"linear-gradient(to bottom, var(--muted), transparent)"}} />
      </div>
    </section>
  );
}
