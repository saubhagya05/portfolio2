"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PERSON } from "@/content/site";
import gsap from "gsap";
import ContactPopup from "./ContactPopup";

/**
 * Navbar — logo + a single "Start Now" CTA.
 *
 * The site is a single scrollable page now, so there are no route links to
 * hold (the old Projects/About/Contact items, and the hamburger menu that
 * existed only to hold them on mobile, are both gone). Section-to-section
 * navigation lives in the scroll rail (see ScrollProgress.jsx) instead.
 */
export default function Navbar() {
  const navRef = useRef(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-[60] flex justify-between items-center px-6 md:px-20 py-7"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

        <Link
          href="/"
          aria-label={`${PERSON.fullName} — home`}
          className="relative group flex items-baseline gap-2 hover:opacity-80 transition-opacity duration-300"
        >
          <span className="monogram text-2xl leading-none">{PERSON.initials}</span>
          <span className="hidden sm:block text-[12px] text-white/55 tracking-[0.3em] uppercase font-medium">
            {PERSON.firstName}
          </span>
        </Link>

        <button
          suppressHydrationWarning
          onClick={() => setIsContactOpen(true)}
          className="relative px-5 py-2.5 bg-[#ff6b1a] text-black text-[12px] font-bold uppercase tracking-[0.1em] rounded-full hover:bg-white transition-colors duration-300"
        >
          Start Now
        </button>
      </nav>

      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
