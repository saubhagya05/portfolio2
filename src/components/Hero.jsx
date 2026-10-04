"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "./BlurText";
import { HERO, PERSON, SOCIAL_LINKS } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-label", { y: 18, opacity: 0, duration: 0.6 }, 0.15)
        .from(".hero-line",  { y: 60, opacity: 0, duration: 0.8 }, 0.25)
        .from(".hero-letter", {
          y: 80,
          opacity: 0,
          rotateX: -35,
          stagger: 0.045,
          duration: 0.9,
          ease: "power4.out",
        }, 0.3)
        .from(".hero-sub",  { y: 24, opacity: 0, duration: 0.7 }, 0.7)
        .from(".hero-link", { y: 18, opacity: 0, stagger: 0.06, duration: 0.5 }, 0.9);

      // Fade the hero out as it leaves — one scrubbed tween, not a per-frame loop
      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "bottom 70%",
          end: "bottom 15%",
          scrub: 0.8,
        },
        opacity: 0,
        y: -40,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      ref={ref}
      className="relative min-h-[108vh] flex flex-col justify-center px-6 sm:px-10 md:px-20 pt-32 pb-24 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-6xl">
        {/* Eyebrow */}
        <div className="hero-label flex flex-wrap items-center gap-3 mb-7">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff6b1a] opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ff6b1a]" />
          </span>
          <p className="text-[12px] text-white/55 tracking-[0.28em] uppercase font-medium">
            {PERSON.school} &middot; {PERSON.location}
          </p>
        </div>

        {/* Name */}
        <h1 className="font-black tracking-tighter leading-[0.78] mb-10 flex flex-col relative z-10 hero-clamp-text">
          <span className="hero-line block ghost z-0">{HERO.greeting}</span>
          <span className="block text-white -mt-1 md:-mt-4 z-10 hero-perspective">
            {HERO.name.split("").map((char, i) => (
              <span key={i} className="hero-letter inline-block">
                {char === " " ? " " : char}
              </span>
            ))}
          </span>
        </h1>

        {/* Intro copy */}
        <div className="max-w-xl hero-sub flex flex-col gap-5">
          {HERO.lines.map((line, i) => (
            <BlurText
              key={i}
              text={line}
              delay={i === 0 ? 26 : 18}
              animateBy="words"
              direction="bottom"
              stepDuration={0.2}
              className={
                i === 0
                  ? "text-[17px] md:text-[19px] text-white/85 font-medium leading-[1.7]"
                  : "text-[15px] md:text-[16px] text-white/65 font-normal leading-[1.75]"
              }
            />
          ))}

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <a
              href={`mailto:${PERSON.email}`}
              className="group inline-flex items-center gap-2.5 px-6 py-3 bg-[#ff6b1a] text-black text-[12px] font-black uppercase tracking-[0.18em] rounded-full hover:bg-white transition-colors duration-300"
            >
              Email me
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5">
                <path d="M2.5 6.5h8M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Profiles */}
        {SOCIAL_LINKS.length > 0 && (
          <div className="mt-16 flex flex-wrap gap-2.5 max-w-2xl">
            {SOCIAL_LINKS.map(({ key, label, url, icon: Icon }) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-link group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/12 text-[12px] text-white/70 tracking-widest uppercase transition-colors duration-300 hover:bg-white hover:text-[#ff6b1a] hover:border-white"
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                {label}
              </a>
            ))}
          </div>
        )}

        <p className="mt-16 text-[12px] text-white/60 tracking-[0.42em] uppercase font-medium">
          {HERO.scrollHint} &darr;
        </p>
      </div>
    </section>
  );
}
