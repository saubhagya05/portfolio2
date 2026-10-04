"use client";
import { useEffect, useRef } from "react";
import { PERSON, SOCIAL_LINKS } from "@/content/site";

// Single-page site: these jump to sections on the same page rather than
// linking to routes that no longer exist.
const LINKS = [
  { label: "About",      id: "about-section"        },
  { label: "Work",       id: "work-section"         },
  { label: "Contact",    id: "contact-section"      },
];

export default function Footer() {
  const ref = useRef(null);

  const jumpTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Socials come from src/content/site.js now — no network request on mount.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition =
      "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={ref} className="relative border-t border-white/8 px-6 sm:px-10 md:px-20 py-16">
      <div className="max-w-6xl mx-auto">
        {/* top row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-14">
          <div>
            <p className="text-[12px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-4 font-bold">
              {PERSON.role}
            </p>
            <h2
              className="font-black tracking-tighter leading-[0.85] text-white"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
            >
              {PERSON.firstName}
            </h2>
            <p className="mt-3 text-white/60 text-sm tracking-[0.2em] uppercase">
              {PERSON.school} &middot; {PERSON.location}
            </p>
          </div>

          <div className="flex flex-col gap-7 md:items-end">
            <nav className="flex flex-wrap gap-7 text-[12px] uppercase tracking-[0.3em] font-medium">
              {LINKS.map(({ label, id }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => jumpTo(e, id)}
                  className="text-white/62 hover:text-[#ff6b1a] transition-colors duration-300"
                >
                  {label}
                </a>
              ))}
            </nav>

            {SOCIAL_LINKS.length > 0 && (
              <div className="flex flex-wrap gap-6 md:justify-end text-[12px] uppercase tracking-[0.3em] font-medium">
                {SOCIAL_LINKS.map(({ key, label, url }) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/58 hover:text-white/70 transition-colors duration-300"
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-white/8 mb-8" />

        {/* bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <a
            href={`mailto:${PERSON.email}`}
            className="text-[12px] text-white/60 hover:text-[#ff6b1a] tracking-widest transition-colors duration-300"
            style={{ fontFamily: '"Times New Roman", Times, serif', fontStyle: "italic" }}
          >
            {PERSON.email}
          </a>
          <p className="text-[12px] text-white/45 tracking-[0.3em] uppercase">
            &copy; {new Date().getFullYear()} {PERSON.fullName}
          </p>
        </div>
      </div>
    </footer>
  );
}
