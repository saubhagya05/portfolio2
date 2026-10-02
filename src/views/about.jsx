"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PERSON, ABOUT, SKILL_GROUPS, FUNDAMENTALS,
  EXPERIENCE, EDUCATION, ACHIEVEMENTS, POSITIONS, SOCIAL_LINKS,
} from "@/content/site";

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
 * Portrait slot — shows your image once you drop one at
 * public/photo/portrait.webp. Until then it renders a designed
 * placeholder with your monogram instead of a broken image.
 */
function Portrait() {
  // Starts as "no image" unless site.js says one has been added, so a missing
  // file never costs a 404 on every page load.
  const [failed, setFailed] = useState(!ABOUT.hasPortrait);

  return (
    <div className="portrait-slot aspect-[4/5] w-full">
      {!failed && (
        <Image
          src={ABOUT.portrait}
          alt={PERSON.fullName}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover object-center"
          onError={() => setFailed(true)}
          priority
        />
      )}

      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-center px-6">
          <span className="monogram text-7xl md:text-8xl">{PERSON.initials}</span>
          <div>
            <p className="text-white/72 text-sm tracking-[0.3em] uppercase font-medium">
              {PERSON.firstName}
            </p>
            <p className="mt-3 text-white/52 text-[12px] tracking-wide leading-relaxed max-w-[15rem]">
              Drop a photo at{" "}
              <code className="text-white/55">public/photo/portrait.webp</code>{" "}
              to fill this slot.
            </p>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent" />
    </div>
  );
}

export default function AboutPage() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ap-head", { y: 26, opacity: 0, duration: 0.6, stagger: 0.07, ease: "power3.out", delay: 0.15 });
      gsap.from(".ap-portrait", { scale: 0.96, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.25 });

      ScrollTrigger.batch(".ap-reveal", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, { y: 24, opacity: 0, duration: 0.55, stagger: 0.05, ease: "power3.out" }),
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full px-6 sm:px-10 md:px-20 pt-36 pb-32">
      <div className="max-w-6xl mx-auto w-full">
        {/* ── Hero row ── */}
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 mb-28">
          <div className="w-full lg:w-[58%]">
            <p className="ap-head text-[12px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-5 font-bold">
              {ABOUT.label}
            </p>
            <h1
              className="ap-head h-page font-black tracking-tighter leading-[0.85] mb-8"
            >
              <span className="block text-white">{ABOUT.heading.line1}</span>
              <span className="block text-white">{ABOUT.heading.line2}</span>
              <span className="block ghost">{ABOUT.heading.line3}</span>
            </h1>

            <div className="ap-head flex flex-wrap items-center gap-x-5 gap-y-2 mb-10 text-[12px] tracking-[0.25em] uppercase">
              <span className="text-white/80 font-medium">{PERSON.role}</span>
              <span className="w-6 h-px bg-white/15" />
              <span className="text-white/55">{PERSON.school}</span>
              <span className="w-6 h-px bg-white/15" />
              <span className="text-white/55">{PERSON.location}</span>
            </div>

            <div className="flex flex-col gap-5">
              {ABOUT.bio.map((text, i) => (
                <p key={i} className="ap-reveal text-[16px] md:text-[17px] text-white/75 font-normal leading-[1.85]">
                  {renderParsed(text)}
                </p>
              ))}
            </div>

            <div className="ap-reveal mt-10 flex flex-wrap gap-3">
              <a
                href={ABOUT.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff6b1a] text-black text-[12px] font-black uppercase tracking-[0.18em] rounded-full hover:bg-white transition-colors duration-300"
              >
                View Resume
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white/70 text-[12px] font-bold uppercase tracking-[0.18em] rounded-full hover:border-white/40 hover:text-white transition-colors duration-300"
              >
                Get in touch
              </Link>
            </div>
          </div>

          {/* Portrait + quick facts */}
          <div className="w-full lg:w-[42%] flex flex-col gap-5">
            <div className="ap-portrait">
              <Portrait />
            </div>

            <div className="ap-reveal panel p-6 flex flex-col gap-4">
              {[
                { k: "Degree",   v: PERSON.degree },
                { k: "Institute",v: "Indian Institute of Technology, Patna" },
                { k: "Years",    v: PERSON.years },
                { k: "Email",    v: PERSON.email, href: `mailto:${PERSON.email}` },
              ].map((row) => (
                <div key={row.k} className="flex flex-col gap-1">
                  <span className="text-[12px] text-white/62 tracking-[0.24em] uppercase font-medium">{row.k}</span>
                  {row.href ? (
                    <a href={row.href} className="text-white/80 hover:text-[#ff6b1a] text-[15px] font-medium transition-colors break-all">
                      {row.v}
                    </a>
                  ) : (
                    <span className="text-white/80 text-[15px] font-medium leading-snug">{row.v}</span>
                  )}
                </div>
              ))}
            </div>

            {SOCIAL_LINKS.length > 0 && (
              <div className="ap-reveal panel p-6">
                <p className="text-[12px] text-white/62 tracking-[0.24em] uppercase font-medium mb-4">Profiles</p>
                <div className="flex flex-wrap gap-2">
                  {SOCIAL_LINKS.map(({ key, label, url, icon: Icon }) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/12 text-[12px] text-white/72 hover:text-[#ff6b1a] hover:border-[#ff6b1a]/35 tracking-wider uppercase transition-colors duration-300"
                    >
                      <Icon className="w-3 h-3" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Experience ── */}
        <div className="mb-24">
          <p className="ap-reveal text-[12px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-4 font-bold">
            Where I&rsquo;ve Worked
          </p>
          <h2
            className="ap-reveal h-section font-black tracking-tighter text-white leading-none mb-14"
          >
            Experience.
          </h2>
          <div className="flex flex-col gap-5">
            {EXPERIENCE.map((job) => (
              <div key={job.company} className="ap-reveal panel p-7 md:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <h3 className="text-2xl md:text-[2rem] font-black text-white tracking-tighter leading-none">{job.company}</h3>
                  {job.current && (
                    <span className="px-2 py-0.5 rounded-full bg-[#ff6b1a]/12 border border-[#ff6b1a]/30 text-[11px] text-[#ff6b1a] tracking-[0.2em] uppercase font-bold">
                      Now
                    </span>
                  )}
                </div>
                <p className="text-[#ff6b1a] text-[17px] font-semibold mb-2">{job.role}</p>
                <p className="text-white/55 text-[13px] tracking-[0.16em] uppercase mb-7">
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
                    <span key={t} className="px-3 py-1.5 rounded-md bg-white/[0.05] border border-white/[0.09] text-[12px] text-white/70 tracking-wider uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Skills ── */}
        <div className="mb-24">
          <p className="ap-reveal text-[13px] tracking-[0.3em] uppercase mb-8 font-medium">
            <span className="border-b border-white/25 pb-2 inline-block text-white/72">Technical Skills</span>
          </p>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-9">
            {SKILL_GROUPS.map((group) => (
              <div key={group.title} className="ap-reveal">
                <p className="text-[13px] tracking-[0.28em] uppercase mb-4 text-white/72 font-medium">{group.title}</p>
                <div className="flex gap-2 flex-wrap">
                  {group.items.map(({ name, icon: Icon }) => (
                    <span key={name} className="px-3.5 py-1.5 flex items-center gap-2 border border-white/12 rounded-full text-[12px] text-white/72 tracking-wider uppercase hover:bg-white hover:text-[#ff6b1a] hover:border-white transition-colors duration-300 cursor-default">
                      <Icon className="w-3 h-3 shrink-0" />
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <div className="ap-reveal">
              <p className="text-[13px] tracking-[0.28em] uppercase mb-4 text-white/72 font-medium">CS Fundamentals</p>
              <div className="flex gap-2 flex-wrap">
                {FUNDAMENTALS.map(({ name, icon: Icon }) => (
                  <span key={name} className="px-3.5 py-1.5 flex items-center gap-2 border border-white/12 rounded-full text-[12px] text-white/72 tracking-wider uppercase hover:bg-white hover:text-[#ff6b1a] hover:border-white transition-colors duration-300 cursor-default">
                    <Icon className="w-3 h-3 shrink-0" />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Education ── */}
        <div className="mb-24">
          <p className="ap-reveal text-[13px] tracking-[0.3em] uppercase mb-8 font-medium">
            <span className="border-b border-white/25 pb-2 inline-block text-white/72">Education</span>
          </p>
          <div className="flex flex-col gap-4">
            {EDUCATION.map((e) => (
              <div key={e.degree} className="ap-reveal panel p-6 flex flex-wrap items-baseline justify-between gap-5">
                <div className="min-w-0">
                  <p className="text-white/90 text-[17px] font-semibold leading-snug">{e.degree}</p>
                  <p className="text-white/55 text-sm mt-1 font-light">{e.org}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[#ff6b1a] text-base font-bold tabular-nums">{e.score}</p>
                  <p className="text-white/60 text-[12px] tracking-wider uppercase mt-1">{e.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Achievements ── */}
        <div className="mb-24">
          <p className="ap-reveal text-[13px] tracking-[0.3em] uppercase mb-8 font-medium">
            <span className="border-b border-white/25 pb-2 inline-block text-white/72">Achievements</span>
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.label} className="ap-reveal panel p-6">
                <p className="text-2xl font-black tracking-tighter text-[#ff6b1a] tabular-nums mb-3 leading-none">
                  {a.value}
                </p>
                <p className="text-white/90 text-[16px] font-semibold leading-snug mb-2">{a.label}</p>
                <p className="text-white/60 text-[14px] font-normal leading-relaxed">{a.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Positions ── */}
        <div>
          <p className="ap-reveal text-[13px] tracking-[0.3em] uppercase mb-8 font-medium">
            <span className="border-b border-white/25 pb-2 inline-block text-white/72">
              Positions of Responsibility
            </span>
          </p>
          <div className="flex flex-col gap-5">
            {POSITIONS.map((p) => (
              <div key={p.role} className="ap-reveal border-b border-white/[0.06] pb-5 last:border-0">
                <div className="flex flex-wrap items-baseline gap-x-3 mb-1.5">
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
      </div>
    </section>
  );
}
