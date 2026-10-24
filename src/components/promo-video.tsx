"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Sources = { webm: string; mp4: string };

/** WebM (VP9) where supported, otherwise the H.264 MP4 (older Safari / iOS). */
function pick(video: HTMLVideoElement, s: Sources) {
  return video.canPlayType('video/webm; codecs="vp9"') ? s.webm : s.mp4;
}

/**
 * Promo video card. Before it's played, a short silent clip loops like a GIF (loaded only
 * once it nears the screen, and paused while off screen) under a big play button. Clicking
 * play swaps in the full video with sound and the browser's own controls; the swap and
 * play() happen inside the click so browsers allow the sound. Pausing (or reaching the end)
 * returns it to the looping preview; playing again resumes where it stopped.
 */
export function PromoVideo({
  preview,
  full,
  poster,
  label,
  className,
}: {
  preview: Sources;
  full: Sources;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const playingRef = useRef(false);
  const switchingRef = useRef(false);
  const resumeRef = useRef(0);
  const { webm: previewWebm, mp4: previewMp4 } = preview;
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Start fetching the preview a little before it scrolls into view.
    const nearby = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        nearby.disconnect();
        if (playingRef.current) return;
        video.src = pick(video, { webm: previewWebm, mp4: previewMp4 });
        video.load();
      },
      { rootMargin: "400px 0px" },
    );
    // Loop the preview only while visible; pause either video when scrolled away.
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.pause();
        else if (!playingRef.current && !reduce && video.src) video.play().catch(() => {});
      },
      { threshold: 0.25 },
    );
    nearby.observe(video);
    seen.observe(video);
    return () => {
      nearby.disconnect();
      seen.disconnect();
    };
  }, [previewWebm, previewMp4]);

  const play = () => {
    const video = ref.current;
    if (!video) return;
    playingRef.current = true;
    // Swapping sources fires a "pause" on the preview; ignore it until the full video plays.
    switchingRef.current = true;
    video.src = pick(video, full);
    video.loop = false;
    video.muted = false;
    video.load();
    // Carry on from where the visitor stopped last time.
    const resumeAt = resumeRef.current;
    if (resumeAt) {
      video.addEventListener("loadedmetadata", () => (video.currentTime = resumeAt), {
        once: true,
      });
    }
    video.play().catch(() => {});
    setPlaying(true);
  };

  // Back to the looping silent preview, pill shape and play button (on pause or at the end).
  const reset = (resumeAt: number) => {
    const video = ref.current;
    if (!video) return;
    resumeRef.current = resumeAt;
    playingRef.current = false;
    video.src = pick(video, preview);
    video.loop = true;
    video.muted = true;
    video.load(); // onCanPlay restarts it if it's on screen
    setPlaying(false);
  };

  return (
    <>
      <video
        ref={ref}
        aria-label={label}
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
        poster={poster}
        muted
        loop
        controls={playing}
        playsInline
        preload="none"
        onPlaying={() => (switchingRef.current = false)}
        onPause={(e) => {
          const v = e.currentTarget;
          if (!playingRef.current || switchingRef.current || v.ended) return;
          reset(v.currentTime);
        }}
        onEnded={() => {
          if (playingRef.current) reset(0);
        }}
        onCanPlay={(e) => {
          if (playingRef.current) return;
          const r = e.currentTarget.getBoundingClientRect();
          const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (!reduce && r.top < innerHeight && r.bottom > 0)
            e.currentTarget.play().catch(() => {});
        }}
      />

      {!playing && (
        <button
          type="button"
          onClick={play}
          aria-label={`Play ${label} with sound`}
          className="group absolute inset-0 z-10 grid place-items-center bg-[rgb(0_2_2/0.25)] transition-colors hover:bg-[rgb(0_2_2/0.15)]"
        >
          {/* Die-cut sticker play button, like the other round badges on the site. */}
          <span className="grid size-20 place-items-center rounded-full border-4 border-white bg-[#f5f5f3] shadow-[0_18px_30px_-12px_rgb(0_2_2/0.6)] transition-transform duration-500 ease-(--ease-premium) group-hover:scale-110 md:size-28">
            <svg aria-hidden viewBox="0 0 24 24" className="size-8 fill-[#216974] md:size-11">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
            </svg>
          </span>
        </button>
      )}
    </>
  );
}
