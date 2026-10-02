"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, EXPERIENCE, PERSON } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * Projects — case-study layout.
 *
 * Replaces the template's WebGL CircularGallery, which needed a database full
 * of project images to show anything at all and shipped an entire GL renderer
 * to do it. This is plain DOM: instant paint, no shaders, no image pipeline.
 */

const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

function TechTag({ children }) {
  return (
    <span className="px-3 py-1.5 rounded-md bg-white/[0.05] border border-white/[0.09] text-[12px] text-white/70 tracking-wider uppercase">
      {children}
    </span>
  );
}

export default function ProjectsPage() {
  const ref = useRef(null);
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");

  const initial = useMemo(() => {
    if (!catParam) return "All";
    const hit = CATEGORIES.find(
      (c) => c.toLowerCase().replace(/[^a-z]/g, "") === catParam.toLowerCase().replace(/[^a-z]/g, "")
    );
    return hit || "All";
  }, [catParam]);

  const [active, setActive] = useState(initial);
  useEffect(() => setActive(initial), [initial]);

  const visible = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pp-head", { y: 26, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.15 });
      ScrollTrigger.batch(".pp-card", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, { y: 30, opacity: 0, duration: 0.6, stagger: 0.09, ease: "power3.out" }),
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full px-6 sm:px-10 md:px-20 pt-36 pb-32">
      <div className="max-w-6xl mx-auto w-full">
        {/* ── Header ── */}
        <p className="pp-head text-[12px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-5 font-bold">
          Selected Work
        </p>
        <h1
          className="pp-head h-page font-black tracking-tighter leading-[0.85] mb-6"
        >
          <span className="block text-white">Things I</span>
          <span className="block ghost">shipped.</span>
        </h1>
        <p className="pp-head text-white/75 text-[17px] md:text-[18px] font-normal leading-[1.75] max-w-2xl mb-12">
          Backend systems, full-stack products, and a hackathon build that placed
          second nationally. Each one got used by someone other than me.
        </p>

        {/* ── Filters ── */}
        <div className="pp-head flex flex-wrap gap-2 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-[12px] font-medium tracking-[0.2em] uppercase transition-all duration-300 border ${
                active === cat
                  ? "bg-[#ff6b1a] text-black border-[#ff6b1a]"
                  : "bg-transparent text-white/62 border-white/10 hover:text-white hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Project case studies ── */}
        <div className="flex flex-col gap-6 mb-28">
          {visible.map((p) => (
            <article
              key={p.id}
              className="pp-card group panel relative overflow-hidden p-7 md:p-10 transition-colors duration-500 hover:border-white/15"
            >
              <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#ff6b1a] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />

              <div className="flex flex-col md:flex-row gap-7 md:gap-12">
                {/* left rail */}
                <div className="md:w-40 shrink-0 flex md:flex-col items-center md:items-start gap-4 md:gap-3">
                  <span className="font-mono text-5xl md:text-6xl font-black text-white/[0.07] group-hover:text-[#ff6b1a]/20 leading-none transition-colors duration-500">
                    {p.num}
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="text-[12px] text-white/55 tracking-[0.3em] uppercase">
                      {p.category}
                    </span>
                    {p.award && (
                      <span className="inline-block w-fit px-2.5 py-1 rounded-full bg-[#ff6b1a]/12 border border-[#ff6b1a]/25 text-[12px] text-[#ff6b1a] tracking-[0.12em] uppercase font-bold">
                        {p.award}
                      </span>
                    )}
                  </div>
                </div>

                {/* body */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl md:text-[2.1rem] font-black text-white tracking-tighter leading-none mb-1.5">
                    {p.title}
                  </h2>
                  <p className="text-white/70 text-[15px] font-normal mb-5">{p.subtitle}</p>

                  <p className="text-white/80 text-[17px] font-normal leading-[1.75] mb-7">
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

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-5 border-t border-white/[0.07]">
                    <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                      {p.tech.map((t) => (
                        <TechTag key={t}>{t}</TechTag>
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

        {/* ── Professional work ── */}
        <div className="mb-12">
          <p className="text-[12px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-4 font-bold">
            In Production
          </p>
          <h2
            className="h-sub font-black tracking-tighter text-white leading-none mb-4"
          >
            Work that shipped.
          </h2>
          <p className="text-white/62 text-base font-light max-w-2xl">
            Systems built on the job, running in production and used by real customers.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {EXPERIENCE.map((job) => (
            <div key={job.company} className="pp-card panel p-7 md:p-9">
              <div className="flex flex-wrap items-center gap-3 mb-1.5">
                <h3 className="text-xl font-black text-white tracking-tight">{job.company}</h3>
                {job.current && (
                  <span className="px-2 py-0.5 rounded-full bg-[#ff6b1a]/12 border border-[#ff6b1a]/30 text-[11px] text-[#ff6b1a] tracking-[0.2em] uppercase font-bold">
                    Now
                  </span>
                )}
              </div>
              <p className="text-[#ff6b1a] text-base font-semibold mb-1.5">{job.role}</p>
              <p className="text-white/55 text-[12px] tracking-[0.16em] uppercase mb-5">
                {job.period} &middot; {job.location}
              </p>

              <ul className="flex flex-col gap-3.5 mb-6">
                {job.points.map((pt, i) => (
                  <li key={i} className="flex gap-3 text-white/75 text-[16px] font-normal leading-[1.7]">
                    <span className="text-[#ff6b1a]/70 shrink-0 mt-[7px] text-[9px]">&#9679;</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-5 border-t border-white/[0.07]">
                {job.stack.map((t) => (
                  <TechTag key={t}>{t}</TechTag>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="mt-24 panel p-10 md:p-14 text-center">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-white mb-3">
            Want the full picture?
          </h2>
          <p className="text-white/62 text-base font-light mb-8 max-w-lg mx-auto">
            The resume has everything — coursework, achievements, and the rest of the stack.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#ff6b1a] text-black text-[12px] font-black uppercase tracking-[0.18em] rounded-full hover:bg-white transition-colors duration-300"
            >
              View Resume
            </a>
            <a
              href={`mailto:${PERSON.email}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white/70 text-[12px] font-bold uppercase tracking-[0.18em] rounded-full hover:border-white/40 hover:text-white transition-colors duration-300"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
