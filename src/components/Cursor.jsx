"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Cursor — the blend-mode follower dot.
 *
 * Hover detection uses event delegation on document rather than a
 * MutationObserver that re-queried every <a> and <button> on each DOM change,
 * so adding nodes to the page costs nothing here.
 */
export default function Cursor() {
  const cursorRef = useRef(null);
  // null = unknown (SSR), true = touch device, false = mouse device
  const [isTouch, setIsTouch] = useState(null);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isTouch !== false) return; // skip on touch, or while still unknown
    const el = cursorRef.current;
    if (!el) return;

    let mx = -200, my = -200;
    let cx = -200, cy = -200;
    let scale = 1;
    let targetScale = 1;
    let raf = null;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    // One pair of delegated listeners covers every interactive element,
    // including anything React mounts later.
    const INTERACTIVE = "a, button, input, textarea, select, [role='button']";
    const onOver = (e) => {
      if (e.target.closest?.(INTERACTIVE)) targetScale = 2.6;
    };
    const onOut = (e) => {
      if (e.target.closest?.(INTERACTIVE)) targetScale = 1;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    const frame = () => {
      raf = requestAnimationFrame(frame);
      cx += (mx - cx) * 0.14;
      cy += (my - cy) * 0.14;
      scale += (targetScale - scale) * 0.12;
      el.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%) scale(${scale})`;
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [isTouch]);

  if (isTouch !== false) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 34,
        height: 34,
        borderRadius: "50%",
        background: "#fff",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 99999,
        willChange: "transform",
      }}
    />
  );
}
