"use client";
import { useEffect, useRef } from "react";

/**
 * A pointer that belongs to the OS: a dot that tracks exactly and a ring that
 * trails it, squaring up over anything clickable.
 *
 * The previous version ran requestAnimationFrame for the life of the page —
 * including on phones, where the cursor is never drawn — and re-queried every
 * link and button on each DOM mutation to rebind hover listeners. This one
 * only animates while the ring is catching up, uses one delegated listener,
 * and never starts for touch input or reduced motion.
 */
const INTERACTIVE = "a, button, [role='button'], [role='tab'], input, textarea, select, summary, label";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return; // CSS leaves the native cursor alone

    const root = document.documentElement;
    root.classList.add("has-cursor");

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf = 0;
    let awake = false;

    const frame = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      // Settled: stop until the pointer moves again.
      raf = Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1 ? requestAnimationFrame(frame) : 0;
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!awake) {
        // First sighting: start the ring on the pointer, not at the corner.
        awake = true;
        rx = mx;
        ry = my;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      root.classList.toggle("cursor-active", !!target?.closest(INTERACTIVE));
    };

    const onLeave = () => {
      awake = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    root.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove("has-cursor", "cursor-active");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
