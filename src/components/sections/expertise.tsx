"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { expertise } from "@/content/site";
import { Accent, Section } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const SIDES = ["left", "right"] as const;

/**
 * Pinned list of big centred titles. As the page scrolls through the section,
 * the active service advances one by one; two images (left and right ends)
 * slide to the active row and swap to that service. Titles are drawn twice:
 * the base layer under the images, and a mint copy on top clipped to the two
 * image boxes, so the active title's letters crossing an image read
 * "inverted". The images sit above the inactive titles but under the active one.
 */
export function Expertise() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Move both images to the active row and clip the overlay to their boxes.
  const place = useCallback((index: number) => {
    const stage = stageRef.current;
    const overlay = overlayRef.current;
    const row = rowRefs.current[index];
    if (!stage || !overlay || !row) return;

    const W = stage.clientWidth;
    const H = stage.clientHeight;
    const boxes = SIDES.map((side, s) => {
      const img = imageRefs.current[s];
      if (!img) return null;
      const w = img.offsetWidth;
      const h = img.offsetHeight;
      const centre = row.offsetTop + row.offsetHeight / 2;
      // Stagger vertically a touch so the pair feels composed, not mirrored.
      const nudge = (s === 0 ? -1 : 1) * h * 0.12;
      const top = Math.min(Math.max(centre - h / 2 + nudge, 0), Math.max(0, H - h));
      const left = side === "left" ? 0 : W - w;
      img.style.transform = `translate(${left}px, ${top}px)`;
      return { left, top, w, h };
    });

    const rects = boxes
      .filter((b) => b !== null)
      .map((b) => `M${b.left} ${b.top}H${b.left + b.w}V${b.top + b.h}H${b.left}Z`)
      .join("");
    overlay.style.clipPath = `path("${rects}")`;
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    place(active);
    const ro = new ResizeObserver(() => place(active));
    ro.observe(stage);
    return () => ro.disconnect();
  }, [active, place]);

  // Scroll progress through the pinned track picks the active service.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = track.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      if (span <= 0) return;
      const p = Math.min(1, Math.max(0, -r.top / span));
      // Continuous progress drives the titles' drift (see .drift in globals.css).
      stageRef.current?.style.setProperty("--p", String(p));
      setActive(Math.min(expertise.length - 1, Math.floor(p * expertise.length)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Active row sits above the images (z-20); the rest sit beneath them.
  const rows = (overlay: boolean) =>
    expertise.map((e, i) => (
      <li
        key={e.title}
        ref={
          overlay
            ? undefined
            : (el) => {
                rowRefs.current[i] = el;
              }
        }
        className={cn("relative", !overlay && (active === i ? "z-20" : "z-0"))}
      >
        <RowText index={i} title={e.title} tags={e.tags} active={active === i} overlay={overlay} />
      </li>
    ));

  return (
    <Section id="expertise" className="overflow-x-clip pb-0! md:pb-0!">
      <Reveal className="mx-auto text-center">
        <p className="mb-6 text-xs font-medium tracking-[0.25em] uppercase opacity-60">
          Our Expertise
        </p>
        <h2 className="text-[clamp(1.5rem,5.6vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.04em] whitespace-nowrap">
          What Sripada Studios <Accent>Does</Accent>
        </h2>
      </Reveal>

      {/* Tall track: the stage stays pinned while scrolling through all services */}
      <div ref={trackRef} style={{ height: `${expertise.length * 60}svh` }}>
        <div className="sticky top-0 flex h-svh items-center pt-16">
          <div ref={stageRef} className="relative w-full">
            {/* Base titles */}
            <ol>{rows(false)}</ol>

            {/* Two images per service: left and right ends */}
            {SIDES.map((side, s) => (
              <div
                key={side}
                ref={(el) => {
                  imageRefs.current[s] = el;
                }}
                aria-hidden
                className="pointer-events-none absolute top-0 left-0 z-10 aspect-[4/5] w-[clamp(6.5rem,17vw,15rem)] overflow-hidden rounded-xl shadow-[0_30px_70px_-20px_rgb(0_0_0/0.7)]"
                style={{ transition: `transform 700ms ${EASE}` }}
              >
                {expertise.map((e, i) => (
                  <Image
                    key={e.title}
                    src={s === 0 ? e.image : e.image2}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 15rem, 30vw"
                    className={cn(
                      "object-cover transition-[opacity,scale] duration-700",
                      active === i ? "scale-100 opacity-100" : "scale-110 opacity-0",
                    )}
                  />
                ))}
              </div>
            ))}

            {/* Inverted active title: same layout, clipped to both image boxes */}
            <div
              ref={overlayRef}
              aria-hidden
              className="pointer-events-none absolute inset-0 z-30"
              style={{ transition: `clip-path 700ms ${EASE}`, clipPath: "inset(100%)" }}
            >
              <ol>{rows(true)}</ol>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function RowText({
  index,
  title,
  tags,
  active,
  overlay,
}: {
  index: number;
  title: string;
  tags: string[];
  active: boolean;
  overlay?: boolean;
}) {
  return (
    <span
      // Alternate rows drift in opposite directions as the section scrolls.
      className="drift block py-1.5 text-center md:py-2"
      style={{ "--dir": index % 2 ? -1 : 1 } as CSSProperties}
    >
      <span className="flex items-baseline justify-center gap-3 md:gap-5">
        <span
          className={cn(
            "text-xs tracking-[0.15em] md:text-sm",
            overlay
              ? active
                ? "text-brand-soft/80"
                : "text-transparent"
              : active
                ? "text-paper"
                : "text-paper/30",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "text-[clamp(1.5rem,min(6vw,8.5svh),5.5rem)] leading-[1] font-medium tracking-[-0.04em] whitespace-nowrap uppercase transition-colors duration-500",
            overlay
              ? active
                ? "text-brand-soft"
                : "text-transparent"
              : active
                ? "text-paper"
                : "text-paper/20",
          )}
        >
          {title}
        </span>
      </span>
      {/* This service's details, directly under its title */}
      <span
        className={cn(
          "mt-1 block text-[11px] tracking-wide transition-colors duration-500 sm:text-xs md:mt-1.5 md:text-sm",
          overlay
            ? active
              ? "text-brand-soft"
              : "text-transparent"
            : active
              ? "text-paper/80"
              : "text-paper/25",
        )}
      >
        {tags.join(" | ")}
      </span>
    </span>
  );
}
