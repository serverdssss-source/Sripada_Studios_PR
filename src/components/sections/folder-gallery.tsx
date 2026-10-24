"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";

// Resting vertical stagger per column (% of the column's height).
const REST = [-14, 6, -3, 6, -14];

/**
 * Gallery inside a Work folder: five staggered columns of campaign tiles.
 * Scroll-linked: as the folder enters the viewport the columns slide in from
 * outside the frame (alternately from below and above) and settle into their
 * staggered rest positions once the folder reaches the middle of the screen.
 */
export function FolderGallery({ gallery, client }: { gallery: string[]; client: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // Always fill all 15 tiles; short galleries wrap round to their first images.
  const columns = REST.map((_, c) => [0, 1, 2].map((k) => gallery[(c * 3 + k) % gallery.length]));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the folder's top meets the bottom of the screen, 1 when it's centred.
      const p = (vh - r.top) / (vh / 2 + r.height / 2);
      el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="bg-paper-dim relative aspect-[16/11] overflow-hidden rounded-xl"
      style={{ "--p": 0 } as CSSProperties}
    >
      <div className="absolute inset-0 grid grid-cols-5 gap-2 p-2 sm:gap-3 sm:p-3">
        {columns.map((col, c) => {
          // Even columns arrive from below, odd ones from above.
          const from = c % 2 === 0 ? 110 : -110;
          return (
            <div
              key={c}
              className="flex flex-col gap-2 will-change-transform sm:gap-3"
              style={{
                transform: `translateY(calc(${REST[c]}% + (1 - var(--p)) * ${from}%))`,
              }}
            >
              {col.map((src, k) => (
                <div key={k} className="group relative aspect-[4/5] overflow-hidden rounded-lg">
                  <Image
                    src={src}
                    alt={k === 0 && c === 0 ? `${client} campaign` : ""}
                    fill
                    sizes="12vw"
                    className="object-cover transition-transform duration-700 ease-(--ease-premium) group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
