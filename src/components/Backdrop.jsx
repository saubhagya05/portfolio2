"use client";
import { useEffect, useRef } from "react";

/**
 * Backdrop — the cinematic background layer.
 *
 * Replaces the old dual-video scroll-scrub (18MB of MP4 being seeked every
 * frame). Everything here is composited on the GPU: the ambient drift is pure
 * CSS keyframes on `transform`, and the only JS is a single passive scroll
 * listener that writes one CSS variable per frame. No video decode, no seeking,
 * no layout thrash.
 */
export default function Backdrop() {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // Respect the OS "reduce motion" setting — skip the scroll parallax.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = null;
    let queued = false;

    const apply = () => {
      raf = null;
      queued = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      // One custom property drives every layer's parallax offset.
      el.style.setProperty("--p", p.toFixed(4));
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={rootRef} className="backdrop-root" aria-hidden="true">
      {/* Ambient colour fields — large, soft, GPU-composited */}
      <div className="backdrop-blob backdrop-blob--amber" />
      <div className="backdrop-blob backdrop-blob--ember" />
      <div className="backdrop-blob backdrop-blob--steel" />

      {/* Engineering grid — fades out as you scroll down */}
      <div className="backdrop-grid" />

      {/* Horizon glow anchored to the bottom of the viewport */}
      <div className="backdrop-horizon" />

      {/* Vignette + readability scrims */}
      <div className="backdrop-vignette" />
      <div className="backdrop-scrim" />
    </div>
  );
}
