import Image from "next/image";
import type { CSSProperties } from "react";
import { industries, type Industry } from "@/content/site";
import { Accent, Section, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

/**
 * Editorial pairs: each row holds two industries, one small and one large,
 * offset vertically and pushed to the edges of the content column. Rows alternate which
 * side gets the large cluster. No scroll-driven motion, so the section stays light.
 */
export function Industries() {
  const rows: Industry[][] = [];
  for (let i = 0; i < industries.length; i += 2) rows.push(industries.slice(i, i + 2));

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
      <div className="space-y-10 md:space-y-12">
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
    <article>
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
 * Tile cluster: rows of 2-3-2 (or 4-2-4) tiles around the Sripada mark, set in a
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
  ...[-2, -1, 0, 1, 2].flatMap((x) => [[x, -2] as [number, number], [x, 2] as [number, number]]),
  ...[-2.5, -1.5, 1.5, 2.5].flatMap((x) => [
    [x, -1] as [number, number],
    [x, 1] as [number, number],
  ]),
  [-2, 0],
  [2, 0],
  // Inner ring too, so any slot a smaller cluster leaves empty still shows a placeholder.
  [-0.5, -1],
  [0.5, -1],
  [-1, 0],
  [1, 0],
  [-0.5, 1],
  [0.5, 1],
];
// Up to three tiles: a triangle evenly spaced round the centre (bottom-right left
// free for the bottom tag).
const FILLED_FEW: [number, number][] = [
  [-0.5, -1],
  [1, 0],
  [-0.5, 1],
];
// Four tiles: a point-symmetric "Z" (top-left, mid-left, mid-right, bottom-right).
const FILLED_FOUR: [number, number][] = [
  [-0.5, -1],
  [-1, 0],
  [1, 0],
  [0.5, 1],
];
// Eight tiles: 4-2-2, with the bottom pair centred.
const FILLED_EIGHT: [number, number][] = [
  [-1.5, -1],
  [-0.5, -1],
  [0.5, -1],
  [1.5, -1],
  [-1, 0],
  [1, 0],
  [-0.5, 1],
  [0.5, 1],
];
// Wider 4-2-4 layout for clusters with more than six tiles; the last slot stays
// free for the bottom tag.
const FILLED_WIDE: [number, number][] = [
  [-1.5, -1],
  [-0.5, -1],
  [0.5, -1],
  [1.5, -1],
  [-1, 0],
  [1, 0],
  [-1.5, 1],
  [-0.5, 1],
  [0.5, 1],
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
  const count = industry.tiles.length;
  const wide = count > FILLED.length;
  const slots = wide
    ? count === FILLED_EIGHT.length
      ? FILLED_EIGHT
      : FILLED_WIDE
    : count <= FILLED_FEW.length
      ? FILLED_FEW
      : count === FILLED_FOUR.length
        ? FILLED_FOUR
        : FILLED;
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
        {slots.slice(0, industry.tiles.length).map((pos, k) => {
          const src = industry.tiles[k];
          const logo = src.includes("-logos/");
          return (
            <span
              key={k}
              className="ring-ink/10 absolute aspect-square rounded-[24%] bg-white p-[3px] shadow-[0_12px_30px_-12px_rgb(8_24_22/0.35)] ring-1 transition-transform duration-500 ease-(--ease-premium) hover:-translate-y-1 md:p-1"
              style={place(pos)}
            >
              <span className="relative block h-full w-full overflow-hidden rounded-[21%]">
                <Image
                  src={src}
                  alt={logo ? "" : k === 0 ? `${industry.title} work` : ""}
                  fill
                  sizes="(min-width: 768px) 9vw, 20vw"
                  className={logo ? "object-contain p-[7%]" : "object-cover object-top"}
                />
              </span>
            </span>
          );
        })}

        {/* Tags beside the top-left and bottom-right tiles */}
        {wide ? (
          <>
            <Tag label={topTag} className="top-[15%] left-[4%]" />
            <Tag label={bottomTag} className="top-[66%] left-[68%]" />
          </>
        ) : (
          <>
            <Tag label={topTag} className="top-[32%] right-[70%]" />
            <Tag label={bottomTag} className="top-[75%] left-[66%]" />
          </>
        )}
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
