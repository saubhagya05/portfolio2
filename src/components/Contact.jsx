"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT, PERSON, SOCIAL_LINKS } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

const field =
  "contact-field w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/52 focus:outline-none focus:border-[#ff6b1a]/60 transition-colors duration-300 text-base";

export default function Contact() {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMsg(data.error || "Could not send. Email me directly instead.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Could not send. Email me directly instead.");
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        defaults: { ease: "power3.out" },
      });

      tl.from(".contact-label", { y: 14, opacity: 0, duration: 0.35 })
        .from(".contact-h",     { y: 34, opacity: 0, duration: 0.45, ease: "power4.out" }, 0.05)
        .from(".contact-field", { y: 22, opacity: 0, stagger: 0.07, duration: 0.4 }, 0.15)
        .from(".contact-side",  { y: 22, opacity: 0, stagger: 0.07, duration: 0.4 }, 0.2);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact-section"
      ref={ref}
      className="relative w-full px-6 sm:px-10 md:px-20 py-32 md:py-40"
    >
      <div className="max-w-6xl mx-auto w-full">
        <p className="contact-label text-[12px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-6 font-bold">
          {CONTACT.label}
        </p>

        <h2
          className="contact-h h-section font-black tracking-tighter leading-[0.88] mb-6"
        >
          <span className="block text-white">{CONTACT.heading.line1}</span>
          <span className="block text-white">{CONTACT.heading.line2}</span>
          <span className="block ghost-orange">{CONTACT.heading.line3}</span>
        </h2>

        <p className="contact-h text-white/75 text-[17px] md:text-[18px] font-normal leading-[1.75] max-w-xl mb-16">
          {CONTACT.blurb}
        </p>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* ── Form ── */}
          <div className="w-full lg:w-[52%]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" aria-label="Contact form">
              <div className="flex flex-col gap-1.5">
                <span className="contact-field text-[12px] text-white/62 tracking-[0.24em] uppercase font-medium">Name</span>
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
                <span className="contact-field text-[12px] text-white/62 tracking-[0.24em] uppercase font-medium">Email</span>
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
                <span className="contact-field text-[12px] text-white/62 tracking-[0.24em] uppercase font-medium">Message</span>
                <textarea
                  suppressHydrationWarning
                  className={`${field} resize-none`}
                  rows={5}
                  placeholder="Role, project, or question — a couple of lines is plenty."
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button
                suppressHydrationWarning
                type="submit"
                disabled={status === "sending"}
                className="contact-field group mt-2 inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#ff6b1a] text-black text-[12px] font-black uppercase tracking-[0.18em] rounded-full hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending…" : status === "sent" ? "Message sent ✓" : "Send message"}
                {status === "idle" && (
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5">
                    <path d="M2.5 6.5h8M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

              {status === "error" && (
                <p className="text-[12px] text-red-400/80 leading-relaxed">
                  {errorMsg}{" "}
                  <a href={`mailto:${PERSON.email}`} className="underline hover:text-red-300">
                    {PERSON.email}
                  </a>
                </p>
              )}
              {status === "sent" && (
                <p className="text-[12px] text-[#ff6b1a]/90">
                  Thanks — I&rsquo;ll get back to you within a day.
                </p>
              )}
            </form>
          </div>

          {/* ── Direct channels ── */}
          <div className="w-full lg:w-[48%] flex flex-col gap-3">
            <a
              href={`mailto:${PERSON.email}`}
              className="contact-side group panel px-6 py-5 flex items-center gap-5 transition-colors duration-300 hover:border-[#ff6b1a]/30"
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
              className="contact-side group panel px-6 py-5 flex items-center gap-5 transition-colors duration-300 hover:border-[#ff6b1a]/30"
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

            <div className="contact-side panel px-6 py-5">
              <p className="text-[12px] text-white/60 tracking-[0.26em] uppercase mb-2 font-medium">Based in</p>
              <p className="text-white/90 text-[17px] font-semibold">{PERSON.location}</p>
              <p className="text-white/55 text-sm font-light mt-1">
                {PERSON.school} &middot; open to relocating
              </p>
            </div>

            {SOCIAL_LINKS.length > 0 && (
              <div className="contact-side panel px-6 py-5">
                <p className="text-[12px] text-white/60 tracking-[0.26em] uppercase mb-4 font-medium">Profiles</p>
                <div className="flex flex-wrap gap-2">
                  {SOCIAL_LINKS.map(({ key, label, url, icon: Icon }) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/12 text-[12px] text-white/72 hover:text-[#ff6b1a] hover:border-[#ff6b1a]/35 tracking-wider uppercase transition-colors duration-300"
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
