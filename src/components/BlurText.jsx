"use client";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

/**
 * BlurText — word-by-word blur/fade reveal.
 *
 * Driven by GSAP, which the site already loads for its scroll animations.
 * (This used to pull in the whole `motion` library for one effect.)
 *
 * `*word*` in the text renders as highlighted serif italic.
 *
 * Once a paragraph has finished revealing, its inline filter/transform are
 * cleared so the browser can drop the compositing layers — a long page of
 * permanently blurred spans is what makes this kind of effect feel heavy.
 */
export default function BlurText({
  text = "",
  delay = 20,              // ms between words
  className = "",
  animateBy = "words",
  direction = "bottom",
  threshold = 0.1,
  rootMargin = "0px",
  stepDuration = 0.22,
  animateOnMount = false,
  onAnimationComplete,
}) {
  const ref = useRef(null);

  const segments = useMemo(() => {
    if (animateBy !== "words") {
      return text.split("").map((char) => ({ word: char, punctuation: "", isItalic: false }));
    }

    let inItalic = false;
    return text.split(" ").map((raw) => {
      let currentItalic = inItalic;
      let word = raw;
      let punctuation = "";

      if (word.startsWith("*")) {
        word = word.slice(1);
        inItalic = true;
        currentItalic = true;
      }

      const trailing = word.match(/^(.*?)\*([.,/#!$%^&*;:{}=\-_`~()]*)$/);
      if (trailing) {
        word = trailing[1];
        punctuation = trailing[2];
        inItalic = false;
      }

      return { word, punctuation, isItalic: currentItalic };
    });
  }, [text, animateBy]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const spans = el.querySelectorAll("[data-bt]");
    if (!spans.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(spans, { clearProps: "all" });
      onAnimationComplete?.();
      return;
    }

    const y = direction === "top" ? -40 : 40;
    let tween = null;

    const run = () => {
      tween = gsap.fromTo(
        spans,
        { opacity: 0, y, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: stepDuration * 2,
          ease: "power3.out",
          stagger: delay / 1000,
          onComplete: () => {
            // Drop the inline styles so no compositing layers linger.
            gsap.set(spans, { clearProps: "filter,transform,opacity,willChange" });
            onAnimationComplete?.();
          },
        }
      );
    };

    if (animateOnMount) {
      run();
      return () => tween?.kill();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          run();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      tween?.kill();
    };
  }, [segments, delay, direction, stepDuration, threshold, rootMargin, animateOnMount, onAnimationComplete]);

  return (
    <p ref={ref} className={className}>
      {segments.map((segment, i) => (
        <span key={i} data-bt style={{ display: "inline-block", opacity: 0 }}>
          {segment.isItalic ? (
            <span className="font-serif italic text-white/90">{segment.word}</span>
          ) : (
            segment.word
          )}
          {segment.punctuation}
          &nbsp;
        </span>
      ))}
    </p>
  );
}
