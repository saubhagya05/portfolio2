"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

/** First 4-digit year in the period string, used as the card's index marker. */
const startYear = (period) => (period.match(/\d{4}/) || [""])[0];

export default function Experience() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".exp-item", {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 34,
            opacity: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: "power3.out",
          }),
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="experience-section"
      className="relative w-full px-6 sm:px-10 md:px-20 py-32 md:py-40"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* ── Header ── */}
        <div className="mb-16 md:mb-20">
          <p className="text-[12px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-4 font-bold">
            Where I&rsquo;ve Worked
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2
              className="h-section font-black tracking-tighter text-white leading-none"
            >
              Experience.
            </h2>
            <p className="shrink-0 text-[13px] text-white/55 tracking-[0.2em] uppercase lg:pb-4">
              {EXPERIENCE.length} roles &middot; backend &amp; full-stack
            </p>
          </div>
        </div>

        {/* ── Role cards ── */}
        <div className="flex flex-col gap-5">
          {EXPERIENCE.map((job) => (
            <article
              key={job.company}
              className="exp-item group panel relative overflow-hidden p-7 md:p-10 transition-colors duration-500 hover:border-white/15"
            >
              {/* hover accent bar */}
              <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#ff6b1a] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />

              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                {/* year marker */}
                <div className="shrink-0 md:w-24 flex md:flex-col items-center md:items-start gap-3 md:gap-2">
                  <span className="font-mono text-4xl md:text-5xl font-black text-white/[0.09] group-hover:text-[#ff6b1a]/25 leading-none transition-colors duration-500 tabular-nums">
                    {startYear(job.period)}
                  </span>
                  {job.current && (
                    <span className="px-2.5 py-1 rounded-full bg-[#ff6b1a]/12 border border-[#ff6b1a]/30 text-[11px] text-[#ff6b1a] tracking-[0.2em] uppercase font-bold">
                      Now
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl md:text-[2rem] font-black text-white tracking-tighter leading-none mb-2">
                    {job.company}
                  </h3>
                  <p className="text-[#ff6b1a] text-[17px] font-semibold mb-2">{job.role}</p>
                  <p className="text-white/55 text-[13px] tracking-[0.16em] uppercase mb-7">
                    {job.period} &middot; {job.location}
                  </p>

                  <ul className="flex flex-col gap-3.5 mb-7">
                    {job.points.map((pt, i) => (
                      <li key={i} className="flex gap-3 text-white/75 text-[16px] font-normal leading-[1.7]">
                        <span className="text-[#ff6b1a]/70 shrink-0 mt-[7px] text-[9px]">&#9679;</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-5 border-t border-white/[0.07]">
                    {job.stack.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-md bg-white/[0.05] border border-white/[0.09] text-[12px] text-white/70 tracking-wider uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
