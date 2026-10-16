"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { industries } from "@/content/site";
import { Accent, Section, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

type Industry = (typeof industries)[number];

/**
 * Editorial pairs: each row holds two industries, one small and one large,
 * offset vertically and pushed to the edges of the content column. Rows alternate which
 * side gets the large cluster. Scrolling drives a parallax: clusters float at
 * different speeds.
 */
export function Industries() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rows: Industry[][] = [];
  for (let i = 0; i < industries.length; i += 2) rows.push(industries.slice(i, i + 2));

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pieces = [...root.querySelectorAll<HTMLElement>("[data-parallax]")];
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of pieces) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        // -1 when the piece's centre is at the bottom of the screen, +1 at the top.
        const t = Math.max(-1.5, Math.min(1.5, (vh / 2 - (r.top + r.height / 2)) / (vh / 2)));
        el.style.setProperty("--t", t.toFixed(4));
      }
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
    <Section id="industries" tone="cream" className="overflow-x-clip py-16! md:py-24!">
      <SectionHeading
        className="mb-10! md:mb-14!"
        eyebrow="Industries We Work With"
        title={
          <>
            Built Across <Accent>Industries</Accent>
          </>
        }
      />

      {/* Same width as the heading, so the pairs line up with its left and right edges */}
      <div ref={sectionRef} className="space-y-10 md:space-y-12">
        {rows.map((pair, r) => {
          const smallFirst = r % 2 === 0;
          return (
            <div
              key={r}
              className={cn(
                "grid gap-10 md:items-start md:justify-between",
                smallFirst ? "md:grid-cols-[34%_48%]" : "md:grid-cols-[48%_34%]",
              )}
            >
              {pair.map((ind, k) => {
                const large = smallFirst ? k === 1 : k === 0;
                return (
                  <Reveal
                    key={ind.title}
                    delay={k * 120}
                    // The small piece sits lower, so the pair reads as a staggered spread.
                    className={cn(!large && "md:mt-10")}
                  >
                    <IndustryPiece industry={ind} large={large} />
                  </Reveal>
                );
              })}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function IndustryPiece({ industry, large }: { industry: Industry; large: boolean }) {
  return (
    <article
      data-parallax
      // Small frames rise faster than large ones as you scroll: depth.
      className="group"
      style={
        {
          "--speed": large ? "-14px" : "28px",
          transform: "translate3d(0, calc(var(--t, 0) * var(--speed)), 0)",
        } as CSSProperties
      }
    >
      <p className="text-muted text-xs font-medium tracking-[0.25em] uppercase">{industry.title}</p>
      <h3
        className={cn(
          "mt-3 leading-snug font-medium tracking-[-0.02em]",
          large ? "text-[clamp(1.25rem,2vw,1.75rem)]" : "text-[clamp(1.125rem,1.6vw,1.5rem)]",
        )}
      >
        {industry.items.join(" | ")}
      </h3>
      <TileCluster industry={industry} />
    </article>
  );
}

/*
 * Tile cluster: rows of 2-3-2 image tiles around the Sripada mark, set in a
 * staggered grid of dashed placeholder tiles that fade out toward the edges.
 * Positions are in tile units from the centre; odd rows sit half a tile over.
 */
const UNIT = 20; // % of the cluster width per tile step
const TILE = 17; // % of the cluster width per tile
// Order matches `tiles`: top-left, top-right, mid-left, mid-right, bottom-left, bottom-right.
const FILLED: [number, number][] = [
  [-0.5, -1],
  [0.5, -1],
  [-1, 0],
  [1, 0],
  [-0.5, 1],
  [0.5, 1],
];
const GHOSTS: [number, number][] = [
  ...[-2, -1, 0, 1, 2].flatMap((x) => [
    [x, -2] as [number, number],
    [x, 2] as [number, number],
  ]),
  ...[-2.5, -1.5, 1.5, 2.5].flatMap((x) => [
    [x, -1] as [number, number],
    [x, 1] as [number, number],
  ]),
  [-2, 0],
  [2, 0],
];

// Square "stage" the tiles are placed in, centred vertically in the 3:2 frame.
const STAGE = "absolute top-1/2 left-0 aspect-square w-full -translate-y-1/2";
const place = ([x, y]: [number, number]): CSSProperties => ({
  left: `${50 + x * UNIT - TILE / 2}%`,
  top: `${50 + y * UNIT - TILE / 2}%`,
  width: `${TILE}%`,
});

function TileCluster({ industry }: { industry: Industry }) {
  const [topTag, bottomTag] = industry.tags;
  return (
    <div className="relative mt-2 aspect-[3/2]">
      {/* Placeholder grid, faded out radially */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden [mask-image:radial-gradient(closest-side,#000_60%,transparent)]"
      >
        <div className={STAGE}>
          {GHOSTS.map((g) => (
            <span
              key={g.join()}
              className="border-ink/25 absolute aspect-square rounded-[24%] border border-dashed bg-[repeating-linear-gradient(135deg,rgb(8_24_22/0.09)_0_1px,transparent_1px_7px)]"
              style={place(g)}
            />
          ))}
        </div>
      </div>

      <div className={STAGE}>
        <span
          className="ring-ink/10 absolute aspect-square rounded-[24%] bg-white shadow-[0_12px_30px_-12px_rgb(8_24_22/0.35)] ring-1"
          style={place([0, 0])}
        >
          <Image
            src="/images/ss-mark.png"
            alt=""
            fill
            sizes="10vw"
            className="object-contain p-[22%]"
          />
        </span>
        {FILLED.map((pos, k) => (
          <span
            key={k}
            className="ring-ink/10 absolute aspect-square rounded-[24%] bg-white p-[3px] shadow-[0_12px_30px_-12px_rgb(8_24_22/0.35)] ring-1 transition-transform md:p-1 duration-500 ease-(--ease-premium) hover:-translate-y-1"
            style={place(pos)}
          >
            <span className="relative block h-full w-full overflow-hidden rounded-[21%]">
              <Image
                src={industry.tiles[k]}
                alt={k === 0 ? `${industry.title} work` : ""}
                fill
                sizes="(min-width: 768px) 9vw, 20vw"
                className="object-cover object-top"
              />
            </span>
          </span>
        ))}

        {/* Tags beside the top-left and bottom-right tiles */}
        <Tag label={topTag} className="top-[32%] right-[70%]" />
        <Tag label={bottomTag} className="top-[75%] left-[66%]" />
      </div>
    </div>
  );
}

function Tag({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={cn(
        "bg-ink text-paper absolute z-10 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap shadow-lg md:px-4 md:py-2 md:text-sm",
        className,
      )}
    >
      {label}
    </span>
  );
}
