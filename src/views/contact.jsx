"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { openMailDraft } from "@/lib/composeMail";
import { PERSON, CONTACT, SOCIAL_LINKS, EXPERIENCE } from "@/content/site";

const field =
  "cp-field w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/52 focus:outline-none focus:border-[#ff6b1a]/60 transition-colors duration-300 text-base";

export default function ContactPage() {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    openMailDraft({ to: PERSON.email, ...form });
    setStatus("sent");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cp-head",  { y: 26, opacity: 0, duration: 0.6, stagger: 0.07, ease: "power3.out", delay: 0.15 });
      gsap.from(".cp-field", { y: 22, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power3.out", delay: 0.35 });
      gsap.from(".cp-side",  { y: 22, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power3.out", delay: 0.45 });
    }, ref);
    return () => ctx.revert();
  }, []);

  const currentRole = EXPERIENCE.find((e) => e.current);

  return (
    <section ref={ref} className="relative w-full px-6 sm:px-10 md:px-20 pt-36 pb-32">
      <div className="max-w-6xl mx-auto w-full">
        <p className="cp-head text-[12px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-5 font-bold">
          {CONTACT.label}
        </p>

        <h1
          className="cp-head h-page font-black tracking-tighter leading-[0.85] mb-7"
        >
          <span className="block text-white">{CONTACT.heading.line1}</span>
          <span className="block text-white">{CONTACT.heading.line2}</span>
          <span className="block ghost-orange">{CONTACT.heading.line3}</span>
        </h1>

        <p className="cp-head text-white/75 text-[17px] md:text-[18px] font-normal leading-[1.75] max-w-xl mb-16">
          {CONTACT.blurb}
        </p>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* ── Form ── */}
          <div className="w-full lg:w-[52%]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" aria-label="Contact form">
              <div className="flex flex-col gap-1.5">
                <span className="cp-field text-[12px] text-white/62 tracking-[0.24em] uppercase font-medium">Name</span>
                <input
                  suppressHydrationWarning
                  className={field}
                  type="text"
                  placeholder="Your full name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="cp-field text-[12px] text-white/62 tracking-[0.24em] uppercase font-medium">Email</span>
                <input
                  suppressHydrationWarning
                  className={field}
                  type="email"
                  placeholder="you@company.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="cp-field text-[12px] text-white/62 tracking-[0.24em] uppercase font-medium">Message</span>
                <textarea
                  suppressHydrationWarning
                  className={`${field} resize-none`}
                  rows={6}
                  placeholder="Role, project, or question — a couple of lines is plenty."
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button
                suppressHydrationWarning
                type="submit"
                className="cp-field group mt-2 inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#ff6b1a] text-black text-[12px] font-black uppercase tracking-[0.18em] rounded-full hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sent" ? "Draft opened ✓" : "Compose message"}
              </button>
              {status === "sent" ? (
                <p className="text-[12px] text-[#ff6b1a]/90 leading-relaxed">
                  Your mail app should have opened with the message ready. If it
                  didn&rsquo;t, write to{" "}
                  <a href={`mailto:${PERSON.email}`} className="underline hover:text-[#ff6b1a]">
                    {PERSON.email}
                  </a>
                  .
                </p>
              ) : (
                <p className="text-[12px] text-white/48 leading-relaxed">
                  This opens a draft in your own mail app — nothing is sent until
                  you press send.
                </p>
              )}
            </form>
          </div>

          {/* ── Direct channels ── */}
          <div className="w-full lg:w-[48%] flex flex-col gap-3">
            <a
              href={`mailto:${PERSON.email}`}
              className="cp-side group panel px-6 py-5 flex items-center gap-5 transition-colors duration-300 hover:border-[#ff6b1a]/30"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-white/60 tracking-[0.26em] uppercase mb-2 font-medium">Email</p>
                <p className="text-white/90 group-hover:text-[#ff6b1a] text-[17px] font-semibold transition-colors duration-300 truncate">
                  {PERSON.email}
                </p>
              </div>
              <svg width="13" height="13" viewBox="0 0 10 10" fill="none" className="text-white/52 group-hover:text-[#ff6b1a] transition-all duration-300 group-hover:translate-x-0.5 shrink-0">
                <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </a>

            <a
              href={`https://wa.me/${PERSON.phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cp-side group panel px-6 py-5 flex items-center gap-5 transition-colors duration-300 hover:border-[#ff6b1a]/30"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-white/60 tracking-[0.26em] uppercase mb-2 font-medium">Phone / WhatsApp</p>
                <p className="text-white/90 group-hover:text-[#ff6b1a] text-[17px] font-semibold transition-colors duration-300">
                  {PERSON.phone}
                </p>
              </div>
              <svg width="13" height="13" viewBox="0 0 10 10" fill="none" className="text-white/52 group-hover:text-[#ff6b1a] transition-all duration-300 group-hover:translate-x-0.5 shrink-0">
                <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </a>

            <div className="cp-side panel px-6 py-5">
              <p className="text-[12px] text-white/60 tracking-[0.26em] uppercase mb-2 font-medium">Currently</p>
              {currentRole ? (
                <>
                  <p className="text-white/90 text-[17px] font-semibold">{currentRole.role}</p>
                  <p className="text-white/55 text-sm font-light mt-1">
                    {currentRole.company} &middot; {currentRole.location}
                  </p>
                </>
              ) : (
                <p className="text-white/90 text-[17px] font-semibold">{PERSON.role}</p>
              )}
            </div>

            <div className="cp-side panel px-6 py-5">
              <p className="text-[12px] text-white/60 tracking-[0.26em] uppercase mb-2 font-medium">Based in</p>
              <p className="text-white/90 text-[17px] font-semibold">{PERSON.location}</p>
              <p className="text-white/55 text-sm font-light mt-1">
                {PERSON.school} &middot; open to relocating
              </p>
            </div>

            {SOCIAL_LINKS.length > 0 && (
              <div className="cp-side panel px-6 py-5">
                <p className="text-[12px] text-white/60 tracking-[0.26em] uppercase mb-4 font-medium">Profiles</p>
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
      </div>
    </section>
  );
}
