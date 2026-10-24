"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// Share of the scroll distance spent zooming; the rest holds the video full screen
// before the page carries on scrolling.
const ZOOM_SHARE = 0.65;

/**
 * Scroll-driven showreel: the video starts inside the small frame in the hero
 * headline (`[data-showreel-trigger]`) and grows from that exact spot to fill the
 * screen, holds, then scrolls away with the page.
 *
 * A full-panel "window" inside the sticky panel is clipped (clip-path, in screen
 * pixels, rounded so its edges never shimmer) to the frame's rect, and the video
 * inside it is scaled and moved with a transform to cover that window. Both are
 * measured against the sticky panel, so the start always lines up with the frame
 * whatever the scroll position, and nothing triggers layout while scrolling.
 */
export function ShowreelExperience({ children }: { children: ReactNode }) {
  const experienceRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const experience = experienceRef.current;
    const stage = stageRef.current;
    const win = windowRef.current;
    const video = videoRef.current;
    const trigger = stage?.querySelector<HTMLElement>("[data-showreel-trigger]");
    if (!experience || !stage || !win || !video || !trigger) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      win.style.visibility = "hidden";
      experience.style.height = "100svh";
      return;
    }

    // Frame rect relative to the sticky stage, plus the stage size.
    let frameRect = { x: 0, y: 0, w: 1, h: 1, r: 0 };
    let stageW = 1;
    let stageH = 1;
    let scrollDistance = 1;
    let frame = 0;

    const measure = () => {
      const s = stage.getBoundingClientRect();
      const t = trigger.getBoundingClientRect();
      stageW = s.width;
      stageH = s.height;
      frameRect = {
        x: t.left - s.left,
        y: t.top - s.top,
        w: t.width,
        h: t.height,
        r: parseFloat(getComputedStyle(trigger).borderTopLeftRadius) || 0,
      };
      scrollDistance = Math.max(1, experience.offsetHeight - stage.offsetHeight);
      update();
    };

    const update = () => {
      frame = 0;
      const scrolled = -experience.getBoundingClientRect().top;
      const p = easeInOut(clamp01(scrolled / (scrollDistance * ZOOM_SHARE)));

      // On-screen window: from the frame to the whole stage.
      const w = lerp(frameRect.w, stageW, p);
      const h = lerp(frameRect.h, stageH, p);
      const cx = lerp(frameRect.x + frameRect.w / 2, stageW / 2, p);
      const cy = lerp(frameRect.y + frameRect.h / 2, stageH / 2, p);
      const radius = lerp(frameRect.r, 0, p);

      // Window edges snapped to whole pixels so they hold still from frame to frame.
      const left = Math.round(cx - w / 2);
      const top = Math.round(cy - h / 2);
      const right = Math.round(cx + w / 2);
      const bottom = Math.round(cy + h / 2);
      win.style.clipPath = `inset(${top}px ${stageW - right}px ${stageH - bottom}px ${left}px round ${radius}px)`;

      // Video scaled (uniformly) to cover exactly that snapped window, centred on it.
      const scale = Math.max((right - left) / stageW, (bottom - top) / stageH);
      const dx = (left + right) / 2 - stageW / 2;
      const dy = (top + bottom) / 2 - stageH / 2;
      video.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`;

      if (win.style.visibility !== "visible") {
        win.style.visibility = "visible";
        // The video now sits over the frame; drop the still behind it so its
        // edges can't peek out.
        trigger.classList.add("is-live");
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(stage);
    resizeObserver.observe(trigger);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={experienceRef} className="showreel-experience relative h-[260svh]">
      <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden">
        {children}
        <div
          ref={windowRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[45] overflow-hidden"
          // Hidden until the first measure places it over the frame.
          style={{ visibility: "hidden", willChange: "clip-path" }}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full origin-center object-cover"
            src="/media/showreel/concert-sample.mp4"
            poster="/media/showreel/concert-poster.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            tabIndex={-1}
            style={{ willChange: "transform" }}
          />
        </div>
      </div>
    </div>
  );
}
