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
 * offset vertically and pushed toward the screen edges. Rows alternate which
 * side gets the large image. Scrolling drives a parallax: frames float at
 * different speeds and each photo drifts inside its frame.
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
    <Section id="industries" tone="cream" className="overflow-x-clip">
      <SectionHeading
        eyebrow="Industries We Work With"
        title={
          <>
            Built Across <Accent>Industries</Accent>
          </>
        }
      />

      {/* Wider than the content column so the images sit near the screen edges */}
      <div
        ref={sectionRef}
        className="space-y-24 md:mx-[calc(50%-50vw+2rem)] md:space-y-32 xl:mx-[calc(50%-50vw+3rem)]"
      >
        {rows.map((pair, r) => {
          const smallFirst = r % 2 === 0;
          return (
            <div
              key={r}
              className={cn(
                "grid gap-14 md:items-start md:gap-x-[12%]",
                smallFirst ? "md:grid-cols-[32%_1fr]" : "md:grid-cols-[1fr_32%]",
              )}
            >
              {pair.map((ind, k) => {
                const large = smallFirst ? k === 1 : k === 0;
                return (
                  <Reveal
                    key={ind.title}
                    delay={k * 120}
                    // The small piece sits lower, so the pair reads as a staggered spread.
                    className={cn(!large && "md:mt-40")}
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
          "--speed": large ? "-28px" : "56px",
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
      <div
        className={cn(
          "relative mt-6 overflow-hidden rounded-xl",
          large ? "aspect-[10/9]" : "aspect-[6/5]",
        )}
      >
        {/* Photo drifts inside its frame (oversized so edges never show) */}
        <div
          className="absolute inset-x-0 -inset-y-[8%]"
          style={{ transform: "translate3d(0, calc(var(--t, 0) * -6%), 0)" }}
        >
          <Image
            src={industry.image}
            alt={industry.title}
            fill
            sizes={large ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 32vw, 100vw"}
            className="object-cover transition-transform duration-1000 ease-(--ease-premium) group-hover:scale-[1.04]"
          />
        </div>
      </div>
    </article>
  );
}
