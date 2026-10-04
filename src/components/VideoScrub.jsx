"use client";
import { useEffect, useRef, useState } from "react";
import Backdrop from "./Backdrop";

/**
 * VideoScrub — scroll-scrubbed cinematic background for the home page.
 *
 * Two copies of the same clip (forward + pre-reversed) are cross-faded so the
 * background can play backward as smoothly as forward without decoding video
 * in reverse, which browsers don't support. Scroll position maps to a target
 * timestamp; velocity decides whether to snap-seek (slow scrub), free-run the
 * decoder at a matched playback rate (fast scroll), or freeze (near-stationary).
 *
 * Desktop only. Mobile, a loading window, and prefers-reduced-motion all fall
 * back to the plain CSS backdrop — video scrubbing never ships to a phone.
 *
 * Source files: public/videos/optimized*.mp4, 1920px/30fps/CRF24, re-encoded
 * with an 8-frame keyframe interval (~0.27s) to match the density the original
 * clips used, so arbitrary-position seeks stay cheap. ~4.3MB each, down from
 * ~9.5MB in the uncompressed source.
 */
export default function VideoScrub() {
  const fwdRef = useRef(null);
  const revRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768 || window.matchMedia("(pointer: coarse)").matches);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isMobile) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fwd = fwdRef.current;
    const rev = revRef.current;
    if (!fwd || !rev) return;

    let duration = 0;
    let raf = null;
    let prevY = window.scrollY;
    let prevT = performance.now();
    let vel = 0;
    let frozenSnap = null;
    let activeEl = fwd;

    const FREEZE_VEL = 5;
    const PLAY_VEL = 90;
    const EDGE = 0.12;

    // Video completes as the contact section's midpoint reaches the viewport
    // centre, so the clip doesn't run out before the page does.
    let videoEndScroll = 1;
    const calcVideoEnd = () => {
      const contact = document.getElementById("contact-section");
      videoEndScroll = contact
        ? Math.max(1, contact.offsetTop + contact.offsetHeight * 0.5 - window.innerHeight * 0.5)
        : document.documentElement.scrollHeight - window.innerHeight;
    };
    calcVideoEnd();
    window.addEventListener("load", calcVideoEnd, { once: true });
    window.addEventListener("resize", calcVideoEnd, { passive: true });

    const show = (el) => {
      if (activeEl === el) return;
      activeEl = el;
      fwd.style.opacity = el === fwd ? "1" : "0";
      rev.style.opacity = el === rev ? "1" : "0";
    };

    let fwdSeeking = false, fwdPend = null;
    const seekFwd = (t, fast = false) => {
      fwdPend = { t: Math.max(0, Math.min(duration, t)), fast };
      if (!fwdSeeking) flushFwd();
    };
    const flushFwd = () => {
      if (!fwdPend) { fwdSeeking = false; return; }
      const { t, fast } = fwdPend; fwdPend = null;
      if (Math.abs(fwd.currentTime - t) < 0.033) { fwdSeeking = false; return; }
      fwdSeeking = true;
      fast && fwd.fastSeek ? fwd.fastSeek(t) : (fwd.currentTime = t);
    };
    fwd.addEventListener("seeked", flushFwd);

    let revSeeking = false, revPend = null;
    const seekRev = (t, fast = false) => {
      revPend = { t: Math.max(0, Math.min(duration, t)), fast };
      if (!revSeeking) flushRev();
    };
    const flushRev = () => {
      if (!revPend) { revSeeking = false; return; }
      const { t, fast } = revPend; revPend = null;
      if (Math.abs(rev.currentTime - t) < 0.033) { revSeeking = false; return; }
      revSeeking = true;
      fast && rev.fastSeek ? rev.fastSeek(t) : (rev.currentTime = t);
    };
    rev.addEventListener("seeked", flushRev);

    let fwdSyncAt = 0, revSyncAt = 0;
    const bgSyncFwd = (t, now) => {
      if (now - fwdSyncAt < 300 || Math.abs(fwd.currentTime - t) < 0.3) return;
      fwd.fastSeek ? fwd.fastSeek(t) : (fwd.currentTime = t);
      fwdSyncAt = now;
    };
    const bgSyncRev = (t, now) => {
      if (now - revSyncAt < 300 || Math.abs(rev.currentTime - t) < 0.3) return;
      rev.fastSeek ? rev.fastSeek(t) : (rev.currentTime = t);
      revSyncAt = now;
    };

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (!duration) return;

      const dt = Math.max((now - prevT) / 1000, 0.001);
      prevT = now;
      const scrollY = window.scrollY;
      vel = vel * 0.82 + ((scrollY - prevY) / dt) * 0.18;
      prevY = scrollY;

      const progress = videoEndScroll > 0 ? Math.min(1, scrollY / videoEndScroll) : 0;
      const tgt = progress * duration;
      const revTgt = duration - tgt;
      const absVel = Math.abs(vel);
      const atStart = tgt <= EDGE;
      const atEnd = progress >= 1;

      if (atEnd) {
        if (!fwd.paused) fwd.pause();
        if (!rev.paused) rev.pause();
        show(fwd);
        frozenSnap = null;
        return;
      }

      if (absVel < FREEZE_VEL || atStart) {
        if (!fwd.paused) fwd.pause();
        if (!rev.paused) rev.pause();
        show(fwd);
        if (frozenSnap === null) {
          frozenSnap = atStart ? 0 : tgt;
          seekFwd(frozenSnap);
        }
        return;
      }
      frozenSnap = null;

      if (absVel < PLAY_VEL) {
        if (!fwd.paused) fwd.pause();
        if (!rev.paused) rev.pause();
        if (vel > 0) {
          if (tgt > fwd.currentTime + 0.033) seekFwd(tgt);
          show(fwd);
          bgSyncRev(revTgt, now);
        } else {
          if (revTgt > rev.currentTime + 0.033) seekRev(revTgt, true);
          show(rev);
          bgSyncFwd(tgt, now);
        }
        return;
      }

      const invM = duration / videoEndScroll;
      if (vel > 0) {
        const rate = Math.min(8, Math.max(0.25, vel * invM));
        if (Math.abs(fwd.playbackRate - rate) > 0.05) fwd.playbackRate = rate;
        if (Math.abs(fwd.currentTime - tgt) > 1.5) fwd.currentTime = tgt;
        if (fwd.paused) fwd.play().catch(() => {});
        if (!rev.paused) rev.pause();
        show(fwd);
        bgSyncRev(revTgt, now);
      } else {
        const rate = Math.min(8, Math.max(0.25, absVel * invM));
        if (Math.abs(rev.playbackRate - rate) > 0.05) rev.playbackRate = rate;
        if (Math.abs(rev.currentTime - revTgt) > 1.5) rev.currentTime = revTgt;
        if (rev.paused) rev.play().catch(() => {});
        if (!fwd.paused) fwd.pause();
        show(rev);
        bgSyncFwd(tgt, now);
      }
    };

    const onFwdEnded = () => { fwd.pause(); fwd.currentTime = duration; };
    const onRevEnded = () => { rev.pause(); rev.currentTime = duration; };
    fwd.addEventListener("ended", onFwdEnded);
    rev.addEventListener("ended", onRevEnded);

    const setup = () => {
      duration = fwd.duration;
      fwd.currentTime = 0;
      rev.currentTime = duration;
      raf = requestAnimationFrame(frame);

      // Defer loading the reverse clip until the forward one has settled, so
      // the initial page load isn't competing with a second video fetch.
      setTimeout(() => {
        rev.play().then(() => { rev.pause(); rev.currentTime = duration; }).catch(() => {});
      }, 2000);
    };

    if (fwd.readyState >= 1) setup();
    else fwd.addEventListener("loadedmetadata", setup, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", calcVideoEnd);
      fwd.removeEventListener("seeked", flushFwd);
      rev.removeEventListener("seeked", flushRev);
      fwd.removeEventListener("ended", onFwdEnded);
      rev.removeEventListener("ended", onRevEnded);
    };
  }, [isMobile, mounted]);

  // Before we know the device type (SSR) and on mobile/reduced-motion,
  // use the plain CSS backdrop — never ship video scrubbing to a phone.
  if (!mounted || isMobile) return <Backdrop />;

  const cls = "absolute inset-0 w-full h-full object-cover";
  const sty = { willChange: "transform", transform: "translateZ(0)" };

  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0a]">
      <video
        ref={fwdRef}
        src="/videos/optimized.mp4"
        poster="/photo/hero-poster.webp"
        className={cls}
        style={{ ...sty, opacity: 1 }}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <video
        ref={revRef}
        src="/videos/optimized-rev.mp4"
        className={cls}
        style={{ ...sty, opacity: 0 }}
        muted
        playsInline
        preload="none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/15 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
    </div>
  );
}
