"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, FEATURED_SKILLS } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // One batched trigger instead of one per card
      ScrollTrigger.batch(".work-item", {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 34,
            opacity: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
          }),
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="work-section"
      className="relative w-full px-6 sm:px-10 md:px-20 py-32 md:py-40"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* ── Header ── */}
        <div className="mb-16 md:mb-20">
          <p className="text-[12px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-4 font-bold">
            Selected Work
          </p>
          <h2 className="h-section font-black tracking-tighter text-white leading-none">
            Projects.
          </h2>
        </div>

        {/* ── Project cards ── */}
        <div className="flex flex-col gap-5 mb-28">
          {PROJECTS.map((p) => (
            <article
              key={p.id}
              className="work-item group panel relative overflow-hidden p-7 md:p-10 transition-colors duration-500 hover:border-white/15"
            >
              {/* hover accent bar */}
              <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#ff6b1a] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />

              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                {/* number */}
                <span className="font-mono text-[12px] text-white/52 group-hover:text-[#ff6b1a] tracking-widest transition-colors duration-300 shrink-0 md:pt-2">
                  {p.num}
                </span>

                <div className="flex-1 min-w-0">
                  {/* category + award */}
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className="text-[12px] text-white/55 tracking-[0.35em] uppercase font-light">
                      {p.category}
                    </span>
                    {p.award && (
                      <span className="px-2.5 py-1 rounded-full bg-[#ff6b1a]/12 border border-[#ff6b1a]/25 text-[12px] text-[#ff6b1a] tracking-[0.15em] uppercase font-bold">
                        {p.award}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl md:text-[2rem] font-black text-white tracking-tighter leading-none mb-1.5">
                    {p.title}
                  </h3>
                  <p className="text-white/70 text-[15px] font-normal mb-5">{p.subtitle}</p>

                  <p className="text-white/80 text-[17px] font-normal leading-[1.75] max-w-3xl mb-7">
                    {p.description}
                  </p>

                  <ul className="flex flex-col gap-3.5 mb-7">
                    {p.points.map((pt, i) => (
                      <li key={i} className="flex gap-3 text-white/75 text-[16px] font-normal leading-[1.7]">
                        <span className="text-[#ff6b1a]/70 shrink-0 mt-[7px] text-[9px]">&#9679;</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* tech + links */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-5 border-t border-white/[0.07]">
                    <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                      {p.tech.map((t) => (
                        <span key={t} className="px-3 py-1.5 rounded-md bg-white/[0.05] border border-white/[0.09] text-[12px] text-white/70 tracking-wider uppercase">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      {p.repo && (
                        <a href={p.repo} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[12px] text-white/72 hover:text-white tracking-[0.18em] uppercase font-medium transition-colors">
                          Code
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                        </a>
                      )}
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[12px] text-[#ff6b1a] hover:text-white tracking-[0.18em] uppercase font-medium transition-colors">
                          Live
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── What I do ── */}
        <div className="mb-14">
          <p className="text-[12px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-4 font-bold">
            What I Do
          </p>
          <h2
            className="h-sub font-black tracking-tighter text-white leading-none"
          >
            Where I&rsquo;m useful.
          </h2>
        </div>

        <div className="work-item flex flex-wrap gap-2.5">
          {FEATURED_SKILLS.map(({ name, icon: Icon }) => (
            <span
              key={name}
              className="group px-4 py-2 flex items-center gap-2 border border-white/12 rounded-full text-[12px] text-white/70 tracking-widest uppercase transition-colors duration-300 hover:bg-white hover:text-[#ff6b1a] hover:border-white cursor-default"
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
