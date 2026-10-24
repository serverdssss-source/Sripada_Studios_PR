"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { MetricSticker, type PeelCorner, type StickerTone } from "@/components/metric-sticker";

export type MetricItem = {
  value: string;
  label: string;
  tone: StickerTone;
  peel?: PeelCorner;
  burst?: boolean;
};

// Scroll distance that the stage stays pinned for.
const PIN_DISTANCE = "180svh";
// Fixed site header height, plus a little breathing room: the stage pins this far from the top.
const HEADER = 72;
const TOP_GAP = 24;
const STICKY_TOP = HEADER + TOP_GAP;
// Room kept free at the bottom: the floating mobile "Sponsor an Event" bar below 640px wide.
const bottomReserve = () => (innerWidth < 640 ? 84 : 32);

/**
 * Key metrics as stickers on a pinned stage: the block (stickers plus any `children` below
 * them) sticks to the screen while the visitor scrolls, and that scroll rolls the stickers in
 * from off-screen left one by one, last first (4-3-2-1), each making one full turn. Once all
 * have landed the page scrolls on. Because the rightmost goes first, each sticker stops short of
 * the one before it and none overlap.
 *
 * It only pins when the whole stage fits on screen; on short screens (most phones), or with
 * reduced motion, everything simply sits in place.
 */
export function MetricRoll({
  title,
  items,
  children,
}: {
  title: string;
  items: MetricItem[];
  children?: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pinned, setPinned] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  // Decide whether to pin: only if motion is allowed and the content fits below the header.
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      setContentHeight(content.offsetHeight);
      setPinned(
        !reduce.matches && content.offsetHeight + STICKY_TOP + bottomReserve() <= innerHeight,
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(content);
    addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      removeEventListener("resize", measure);
    };
  }, []);

  // While pinned, map scroll progress through the track to each sticker's roll.
  useEffect(() => {
    const track = trackRef.current;
    const els = itemRefs.current;
    if (!track) return;
    if (!pinned) {
      els.forEach((el) => el && (el.style.transform = ""));
      return;
    }
    const count = els.length;
    // Each sticker rolls over a window of this share of the scroll; windows overlap so one
    // sticker is still settling as the next sets off. The last 10% is a rest with all in place.
    const WINDOW = 0.42;
    const step = (0.9 - WINDOW) / Math.max(1, count - 1);
    const smoothstep = (t: number) => t * t * (3 - 2 * t); // gentle start and stop
    let frame = 0;
    let shown = -1; // progress currently drawn; glides towards the scroll target

    // 0 when the stage first pins, 1 when it lets go (the track's extra height has scrolled by).
    const target = () => {
      const rect = track.getBoundingClientRect();
      const range = rect.height - contentHeight;
      return range <= 0 ? 1 : Math.min(1, Math.max(0, (STICKY_TOP - rect.top) / range));
    };

    const draw = (progress: number) => {
      els.forEach((el, i) => {
        if (!el) return;
        const order = count - 1 - i; // last sticker first
        const t = Math.min(1, Math.max(0, (progress - order * step) / WINDOW));
        const left = 1 - smoothstep(t); // fraction of the roll still to go
        el.style.transform = left ? `translateX(${-left * 100}vw) rotate(${-left * 360}deg)` : "";
      });
    };

    // Ease the drawn progress towards the scroll position each frame, so wheel steps glide
    // instead of jumping. (The order of landing still keeps every sticker clear of the others.)
    const tick = () => {
      const goal = target();
      shown = shown < 0 ? goal : shown + (goal - shown) * 0.1;
      if (Math.abs(goal - shown) < 0.0005) shown = goal;
      draw(shown);
      frame = shown === goal ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    tick();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pinned, contentHeight]);

  return (
    <div
      ref={trackRef}
      className="relative"
      // The stage is only as tall as its content, so there's no empty band above or below it;
      // the track adds the pin distance on top.
      style={pinned ? { height: `calc(${contentHeight}px + ${PIN_DISTANCE})` } : undefined}
    >
      <div
        className={pinned ? "sticky" : undefined}
        style={pinned ? { top: STICKY_TOP } : undefined}
      >
        <div ref={contentRef}>
          <p className="text-muted mb-5 text-xs font-medium tracking-[0.25em] uppercase">{title}</p>
          <dl className="grid grid-cols-2 gap-5 sm:gap-8 lg:grid-cols-4 lg:gap-10">
            {items.map((item, i) => (
              <div
                key={item.label}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="aspect-square will-change-transform"
              >
                <dt className="sr-only">{item.label}</dt>
                <dd className="sr-only">{item.value}</dd>
                <div className="h-full w-full transition-transform duration-500 ease-(--ease-premium) hover:-translate-y-1 hover:-rotate-3">
                  <MetricSticker
                    id={`metric-${i}`}
                    value={item.value}
                    label={item.label}
                    tone={item.tone}
                    peel={item.peel}
                    burst={item.burst}
                  />
                </div>
              </div>
            ))}
          </dl>
          {children}
        </div>
      </div>
    </div>
  );
}
