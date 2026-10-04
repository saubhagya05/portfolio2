"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT, EDUCATION } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

/** Renders *highlighted* spans inside the bio copy. */
const renderParsed = (text) =>
  text.split(/\*([^*]+)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-serif italic text-white/90">{part}</span>
    ) : (
      part
    )
  );

/**
 * About — compact bio + education.
 *
 * Deliberately short: the day-to-day detail (Fourth Frontier, Tradylytics,
 * the LTTB fix) lives in the Experience section below, so this is just the
 * two-paragraph version of who I am, plus education and the resume link.
 */
export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        defaults: { ease: "power3.out" },
      });

      tl.from(".about-label", { y: 14, opacity: 0, duration: 0.35 })
        .from(".about-h",     { y: 34, opacity: 0, duration: 0.45, ease: "power4.out" }, 0.05)
        .from(".about-p",     { y: 20, opacity: 0, duration: 0.4, stagger: 0.06 }, 0.15)
        .from(".about-edu",   { y: 16, opacity: 0, stagger: 0.07, duration: 0.35 }, 0.25);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about-section"
      ref={ref}
      className="relative w-full px-6 sm:px-10 md:px-20 py-32 md:py-40"
    >
      <div className="max-w-6xl mx-auto w-full">
        <p className="about-label text-[12px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-4 font-bold">
          {ABOUT.label}
        </p>

        <h2 className="about-h h-section font-black tracking-tighter leading-none mb-14">
          <span className="block text-white">{ABOUT.heading.line1}</span>
          <span className="block text-white">{ABOUT.heading.line2}</span>
          <span className="block ghost">{ABOUT.heading.line3}</span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20">
          {/* ── Bio + resume ── */}
          <div className="w-full lg:w-[52%] flex flex-col">
            {ABOUT.bio.map((text, i) => (
              <p
                key={i}
                className="about-p text-[16px] md:text-[17px] text-white/75 mb-6 font-normal leading-[1.8]"
              >
                {renderParsed(text)}
              </p>
            ))}

            <a
              href={ABOUT.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="about-p inline-flex items-center gap-2 w-fit px-6 py-3 border border-[#ff6b1a]/35 text-[#ff6b1a] text-[11px] font-bold uppercase tracking-[0.18em] rounded-full hover:bg-[#ff6b1a] hover:text-black transition-colors duration-300"
            >
              View Resume
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* ── Education ── */}
          <div className="w-full lg:w-[48%]">
            <p className="about-p text-[13px] tracking-[0.3em] uppercase mb-7 font-medium">
              <span className="border-b border-white/25 pb-2 inline-block text-white/60">Education</span>
            </p>
            <div className="flex flex-col gap-5">
              {EDUCATION.map((e) => (
                <div
                  key={e.degree}
                  className="about-edu flex items-baseline justify-between gap-6 border-b border-white/[0.06] pb-4"
                >
                  <div className="min-w-0">
                    <p className="text-white/90 text-[16px] font-semibold leading-snug">{e.degree}</p>
                    <p className="text-white/55 text-[14px] mt-1 font-normal">{e.org}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[#ff6b1a] text-sm font-bold tabular-nums">{e.score}</p>
                    <p className="text-white/45 text-[11px] tracking-wider uppercase mt-1">{e.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
