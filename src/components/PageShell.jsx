"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from "./Cursor";
import Navbar from "./Navbar";
import Backdrop from "./Backdrop";
import ScrollProgress from "./ScrollProgress";

gsap.registerPlugin(ScrollTrigger);

export default function PageShell({ children }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <main>
      <div className="grain-overlay" />
      <Cursor />
      <Backdrop />
      <ScrollProgress />
      <Navbar />
      <div className="relative z-10">{children}</div>
    </main>
  );
}
