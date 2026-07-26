"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const blob = blobRef.current;
    const label = labelRef.current;
    if (!dot || !blob || !label) return;

    let mx = 0, my = 0, bx = 0, by = 0, raf: number;

    let woken = false;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (!woken) {
        // avoid the flash at (0,0) before the pointer is ever seen
        woken = true;
        bx = mx; by = my;
        dot.style.opacity = "1";
        blob.style.opacity = "1";
      }
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    };

    const animate = () => {
      bx += (mx - bx) * 0.1;
      by += (my - by) * 0.1;
      blob.style.transform = `translate(${bx}px,${by}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(animate);
    };

    const setProject = () => {
      document.body.classList.add("cursor-on-project");
      document.body.classList.remove("cursor-on-link");
      label.textContent = "VIEW";
    };
    const setLink = () => {
      document.body.classList.add("cursor-on-link");
      document.body.classList.remove("cursor-on-project");
      label.textContent = "";
    };
    const clearState = () => {
      document.body.classList.remove("cursor-on-project","cursor-on-link");
      label.textContent = "";
    };

    const bindAll = () => {
      document.querySelectorAll("[data-cursor='project']").forEach((el) => {
        (el as HTMLElement).addEventListener("mouseenter", setProject);
        (el as HTMLElement).addEventListener("mouseleave", clearState);
      });
      document.querySelectorAll("a,button").forEach((el) => {
        (el as HTMLElement).addEventListener("mouseenter", setLink);
        (el as HTMLElement).addEventListener("mouseleave", clearState);
      });
    };

    const obs = new MutationObserver(bindAll);
    obs.observe(document.body, { childList: true, subtree: true });

    bindAll();
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
      <div ref={blobRef} className="cursor-blob" style={{ opacity: 0 }}>
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  );
}
