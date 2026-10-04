"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import dynamic from "next/dynamic";
import Cursor from "../components/Cursor";
import Navbar from "../components/Navbar";
import Backdrop from "../components/Backdrop";
import ScrollProgress from "../components/ScrollProgress";

// Client-only: touches window/video APIs at mount and is meaningfully
// heavier than the CSS backdrop it replaces, so it is never part of the
// server-rendered or initial client bundle.
const VideoScrub = dynamic(() => import("../components/VideoScrub"), {
  ssr: false,
  loading: () => <Backdrop />,
});
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Work from "../components/Work";
import Achievements from "../components/Achievements";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import SeoContent from "../components/SeoContent";

const SECTIONS = [
  { id: "hero-section",         label: "Intro"        },
  { id: "about-section",        label: "About"        },
  { id: "experience-section",   label: "Experience"   },
  { id: "work-section",         label: "Work"         },
  { id: "achievements-section", label: "Achievements" },
  { id: "contact-section",      label: "Contact"      },
];

export default function Home() {
  useEffect(() => {
    // Skip smooth scrolling entirely when the OS asks for reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false, // native scrolling on touch — far smoother on phones
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
      {/* SEO-crawlable structured content (visually hidden) */}
      <SeoContent />

      {/* grain */}
      <div className="grain-overlay" />

      {/* difference cursor */}
      <Cursor />

      {/* cinematic background — lives behind everything */}
      <VideoScrub />

      {/* scroll progress rail */}
      <ScrollProgress sections={SECTIONS} />

      {/* fixed nav */}
      <Navbar />

      {/* scrollable sections */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Work />
        <Achievements />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
