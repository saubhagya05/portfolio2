"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ACHIEVEMENTS, POSITIONS, SOCIAL_LINKS } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".ach-item", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 26,
            opacity: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: "power3.out",
          }),
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="achievements-section"
      className="relative w-full px-6 sm:px-10 md:px-20 py-32 md:py-40"
    >
      <div className="max-w-6xl mx-auto w-full">
        <p className="text-[12px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-4 font-bold">
          Track Record
        </p>
        <h2
          className="h-section font-black tracking-tighter leading-none mb-16"
        >
          <span className="text-white">Receipts, </span>
          <span className="ghost">not claims.</span>
        </h2>

        {/* ── Achievements grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.label}
              className="ach-item group panel p-6 flex flex-col transition-colors duration-500 hover:border-[#ff6b1a]/25"
            >
              <p className="text-3xl font-black tracking-tighter text-[#ff6b1a] tabular-nums mb-3 leading-none">
                {a.value}
              </p>
              <p className="text-white/90 text-[16px] font-semibold leading-snug mb-2">
                {a.label}
              </p>
              <p className="text-white/60 text-[14px] font-normal leading-relaxed">
                {a.note}
              </p>
            </div>
          ))}
        </div>

        {/* ── Positions of responsibility ── */}
        <div className="grid lg:grid-cols-2 gap-14">
          <div>
            <p className="text-[13px] tracking-[0.3em] uppercase mb-7 font-medium">
              <span className="border-b border-white/25 pb-2 inline-block text-white/72">
                Positions of Responsibility
              </span>
            </p>
            <div className="flex flex-col gap-6">
              {POSITIONS.map((p) => (
                <div key={p.role} className="ach-item border-b border-white/[0.06] pb-5 last:border-0">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 mb-1.5">
                    <h3 className="text-white/90 text-base font-bold tracking-tight">{p.role}</h3>
                    <span className="text-[#ff6b1a]/75 text-[12px] tracking-[0.2em] uppercase font-medium">
                      {p.org}
                    </span>
                  </div>
                  <p className="text-white/65 text-[16px] font-normal leading-[1.7]">{p.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Competitive programming profiles ── */}
          {SOCIAL_LINKS.length > 0 && (
            <div>
              <p className="text-[13px] tracking-[0.3em] uppercase mb-7 font-medium">
                <span className="border-b border-white/25 pb-2 inline-block text-white/72">
                  Find Me Online
                </span>
              </p>
              <div className="flex flex-col gap-2.5">
                {SOCIAL_LINKS.map(({ key, label, url, icon: Icon }) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ach-item group flex items-center gap-4 px-5 py-4 panel transition-colors duration-300 hover:border-[#ff6b1a]/30"
                  >
                    <Icon className="w-4 h-4 text-white/62 group-hover:text-[#ff6b1a] transition-colors duration-300 shrink-0" />
                    <span className="text-white/70 group-hover:text-white text-sm tracking-[0.2em] uppercase font-medium transition-colors duration-300 flex-1">
                      {label}
                    </span>
                    <svg width="11" height="11" viewBox="0 0 10 10" fill="none"
                      className="text-white/52 group-hover:text-[#ff6b1a] transition-all duration-300 group-hover:translate-x-0.5 shrink-0">
                      <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
