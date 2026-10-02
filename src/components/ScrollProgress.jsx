"use client";
import { useEffect, useRef } from "react";

/**
 * ScrollProgress — right-hand rail showing how far down the page you are.
 *
 * Desktop: a vertical track whose fill glows and grows as you scroll, with a
 * marker per section that lights up when that section is the active one.
 * Mobile: the rail collapses to a thin glowing line across the top.
 *
 * Perf: one passive scroll listener, rAF-throttled, writing a single CSS
 * custom property. The fill is a `scaleY` transform (GPU-composited), so
 * scrolling never triggers layout or paint here. Marker state is only touched
 * when the active index actually changes.
 */
// Module-level constant: a fresh [] default would be a new reference on every
// render and would re-run the effect each time.
const NO_SECTIONS = [];

export default function ScrollProgress({ sections = NO_SECTIONS }) {
  const rootRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let raf = null;
    let queued = false;
    let lastActive = -1;

    // Cache section elements; re-resolve on resize in case layout shifted.
    let nodes = sections.map((s) => document.getElementById(s.id));
    const refresh = () => {
      nodes = sections.map((s) => document.getElementById(s.id));
    };

    const apply = () => {
      raf = null;
      queued = false;

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      root.style.setProperty("--sp", p.toFixed(4));

      if (!sections.length) return;

      // Active section = the last one whose top has passed the viewport middle.
      const mid = y + window.innerHeight * 0.45;
      let active = 0;
      for (let i = nodes.length - 1; i >= 0; i--) {
        const el = nodes[i];
        if (el && el.offsetTop <= mid) { active = i; break; }
      }

      if (active !== lastActive) {
        lastActive = active;
        markersRef.current.forEach((m, i) => {
          if (!m) return;
          m.dataset.state = i === active ? "active" : i < active ? "past" : "ahead";
        });
      }
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { refresh(); onScroll(); }, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={rootRef} className="scroll-rail" aria-hidden="true">
      {/* Mobile: thin glowing line pinned to the top edge */}
      <div className="scroll-rail__top">
        <span className="scroll-rail__top-fill" />
      </div>

      {/* Desktop: vertical track */}
      <div className="scroll-rail__side">
        <div className="scroll-rail__track">
          <span className="scroll-rail__fill" />
          <span className="scroll-rail__thumb" />
        </div>

        {sections.length > 0 && (
          <div className="scroll-rail__markers">
            {sections.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => { markersRef.current[i] = el; }}
                data-state={i === 0 ? "active" : "ahead"}
                onClick={() => goTo(s.id)}
                className="scroll-rail__marker"
                aria-label={`Jump to ${s.label}`}
                tabIndex={-1}
              >
                <span className="scroll-rail__dot" />
                <span className="scroll-rail__label">{s.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
