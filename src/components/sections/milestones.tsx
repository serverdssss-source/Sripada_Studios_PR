"use client";

import { useEffect, useRef, useState } from "react";
import { milestones } from "@/content/site";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { StickerBurst } from "@/components/sticker-burst";
import { cn } from "@/lib/cn";

// Folder tab's sloped right edge with rounded shoulder and concave foot
// identical to the Work / Impact section
const TAB_EAR = "M0 0H4C12 0 15 3 18 11L26 39C28.5 45.5 32 48 40 48H0Z";

// Natural resting tilt angles for each card when tucked inside the folder
const TILT_ANGLES = [-6, 5, -5, 5, -4, 4];

// Distinct, organic positions and slight tilt angles for the badges per card
const BADGE_POSITIONS = [
  {
    taglinePos: "left-2 -top-7 rotate-[-4deg]",
    quotePos: "right-3 -top-6 rotate-[3deg]",
  },
  {
    taglinePos: "right-4 -top-8 rotate-[5deg]",
    quotePos: "left-6 -top-5 rotate-[-3deg]",
  },
  {
    taglinePos: "left-8 -top-8 rotate-[2deg]",
    quotePos: "right-2 -top-7 rotate-[-4deg]",
  },
  {
    taglinePos: "right-6 -top-6 rotate-[-3deg]",
    quotePos: "left-3 -top-8 rotate-[4deg]",
  },
  {
    taglinePos: "left-5 -top-7 rotate-[-5deg]",
    quotePos: "right-8 -top-6 rotate-[3deg]",
  },
  {
    taglinePos: "right-3 -top-8 rotate-[4deg]",
    quotePos: "left-6 -top-6 rotate-[-2deg]",
  },
];

export function Milestones() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          const el = sectionRef.current;
          if (!el) return;

          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight;
          const totalScrollable = rect.height - vh;

          if (totalScrollable <= 0) return;

          const current = -rect.top;
          const p = Math.min(1, Math.max(0, current / totalScrollable));
          setProgress(p);
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const totalCards = milestones.length; // 6
  const numSteps = totalCards - 1; // 5 transitions
  const stepVal = progress * numSteps;
  const activeIdx = Math.min(totalCards - 1, Math.floor(progress * (totalCards - 0.001)));
  const currentMilestone = milestones[activeIdx];
  const badgePos = BADGE_POSITIONS[activeIdx];

  const goToStep = (targetIdx: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const totalScrollable = rect.height - vh;
    const targetP = targetIdx / numSteps;
    const targetScrollTop = window.scrollY + rect.top + targetP * totalScrollable;
    window.scrollTo({ top: targetScrollTop, behavior: "smooth" });
  };

  return (
    <div ref={sectionRef} id="journey" className="text-ink relative min-h-[260vh] bg-[#e8f6f3]">
      {/* Sticky viewport frame: vertically balanced, with clearance for fixed site header */}
      <div className="sticky top-0 flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-8 sm:px-8">
        {/* Section Header & Selector Pills */}
        <div className="flex w-full max-w-6xl flex-col items-center text-center">
          {/* Heading in the same die-cut sticker type as "THE FOUNDERS", with the floating star. */}
          {/* One line: the heading is ~16.5em wide, so it's sized to the screen width (capped). */}
          <Reveal className="relative mb-2 inline-block text-[length:min(calc((100vw-2rem)/17),4.25rem)]">
            <h2 className="sticker-text text-brand-night leading-[0.9] font-bold tracking-[-0.06em] whitespace-nowrap uppercase">
              The Sripada Studios Journey
            </h2>
            <Image
              src="/elements/golden-shiny-starburst.png"
              alt=""
              aria-hidden
              width={160}
              height={160}
              className="star-float pointer-events-none absolute -top-[0.45em] -right-[0.35em] w-[0.6em]"
            />
          </Reveal>

          {/* Quick Step Selector Pills with generous clearance so cards never overlap */}
          <div className="mt-3 mb-9 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {milestones.map((m, i) => (
              <button
                key={m.phase}
                type="button"
                onClick={() => goToStep(i)}
                aria-label={`Jump to Milestone ${i + 1}`}
                className={cn(
                  "cursor-pointer rounded-full px-3 py-1 font-mono text-xs transition-all duration-300",
                  activeIdx === i
                    ? "scale-105 bg-[#8b5cf6] font-bold text-white shadow-md shadow-[#8b5cf6]/30"
                    : "border-ink/10 text-ink/60 hover:text-ink border bg-white hover:border-[#8b5cf6]/40",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>

        {/* The File Folder Stage — styled like Work / Impact section with TAB_EAR */}
        <div className="relative mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl">
          {/* Dynamic Quote & Tagline Badges in distinct positions per card, rounded corners, no arrow */}
          <div
            key={`badge-tag-${activeIdx}`}
            className={cn(
              "pointer-events-none absolute z-40 transition-all duration-500 ease-out",
              badgePos.taglinePos,
            )}
          >
            <div className="rounded-full border-[3px] border-white bg-[#8b5cf6] px-3.5 py-1 text-[11px] font-bold text-white shadow-[0_8px_16px_-6px_rgb(11_11_15/0.35)] sm:text-xs">
              {currentMilestone.tagline}
            </div>
          </div>

          <div
            key={`badge-quote-${activeIdx}`}
            className={cn(
              "pointer-events-none absolute z-40 hidden transition-all duration-500 ease-out sm:block",
              badgePos.quotePos,
            )}
          >
            <div className="text-brand-night rounded-full border-[3px] border-white bg-[#54c4b6] px-3.5 py-1 text-[11px] font-bold shadow-[0_8px_16px_-6px_rgb(11_11_15/0.35)] sm:text-xs">
              {currentMilestone.quote}
            </div>
          </div>

          {/* Folder Tab matching Work/Impact section */}
          <div className="relative z-10 -mb-0.5 flex w-fit">
            <div className="text-paper rounded-tl-2xl bg-[#1b5a64] py-2.5 pr-2 pl-6 font-mono text-[11px] font-semibold tracking-wider sm:text-xs">
              SRIPADA STUDIOS ARCHIVE · 2019–NOW
            </div>
            <svg
              aria-hidden
              viewBox="0 0 40 48"
              preserveAspectRatio="none"
              className="-ml-px h-auto w-10 fill-current text-[#1b5a64]"
            >
              <path d={TAB_EAR} />
            </svg>
          </div>

          {/* Aqua starburst stuck on the folder's bottom-left corner, like the other sections. */}
          <StickerBurst
            color="#54c4b6"
            className="pointer-events-none absolute -bottom-7 -left-6 z-40 w-14 md:-bottom-9 md:-left-9 md:w-20"
          />

          {/* Folder Body matching Work/Impact section */}
          <div className="relative h-[290px] w-full rounded-3xl rounded-tl-none border border-white/10 bg-linear-to-b from-[#1b5a64] via-[#216974] to-[#2a7f8b] shadow-2xl sm:h-[320px] md:h-[340px]">
            {/* Pocket Cards Emerging Out of the File — tuned so it leaves clean clearance below selector pills */}
            <div className="absolute inset-x-3 top-8 z-10 sm:inset-x-6">
              {milestones.map((m, i) => {
                const initialTilt = TILT_ANGLES[i % TILT_ANGLES.length];
                let translateY = 50;
                let scale = 0.88;
                let opacity = 0;
                let rotate = initialTilt;
                let zIndex = i;

                if (stepVal < i - 1) {
                  // Inside pocket waiting its turn
                  translateY = 50;
                  scale = 0.88;
                  opacity = 0;
                  rotate = initialTilt;
                  zIndex = i;
                } else if (stepVal >= i - 1 && stepVal <= i) {
                  // Emerging OUT of the folder mouth and rotating to STRAIGHT!
                  const t = stepVal - (i - 1); // 0 to 1
                  const ease = t * t * (3 - 2 * t);
                  // Rises from +50px inside folder to -28px (comfortably below the title numbers)
                  translateY = 50 - ease * 78;
                  scale = 0.92 + ease * 0.08;
                  opacity = Math.min(1, 0.25 + ease * 0.75);
                  // Tilted card straightens to exactly 0deg
                  rotate = (1 - ease) * initialTilt;
                  zIndex = 20 + i;
                } else {
                  // Settles into the upper fan stack behind active card without touching pills
                  const past = stepVal - i;
                  translateY = -28 - Math.min(past * 6, 14);
                  scale = Math.max(0.88, 1 - past * 0.025);
                  opacity = Math.max(0.35, 1 - past * 0.22);
                  rotate = Math.min(past, 1) * (initialTilt * 0.3);
                  zIndex = 10 + i;
                }

                return (
                  <div
                    key={m.phase}
                    className="absolute inset-x-0 top-0 transition-transform duration-100 ease-out will-change-transform"
                    style={{
                      transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate.toFixed(2)}deg)`,
                      opacity,
                      zIndex,
                      transformOrigin: "center bottom",
                    }}
                  >
                    <div className="border-ink/10 text-ink rounded-2xl border bg-white p-4 shadow-2xl transition-all duration-300 sm:rounded-3xl sm:p-6">
                      {/* Card Header */}
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-[#8b5cf6]/10 px-2.5 py-0.5 font-mono text-[11px] font-bold tracking-wider text-[#8b5cf6] uppercase sm:text-xs">
                          Phase {String(i + 1).padStart(2, "0")}
                        </span>

                        {m.isCurrent ? (
                          <span className="flex items-center gap-1.5 rounded-full border border-[#54c4b6]/40 bg-[#54c4b6]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#216974] uppercase sm:text-xs">
                            <span className="h-2 w-2 animate-ping rounded-full bg-[#05b8a0]" />
                            Active Era
                          </span>
                        ) : (
                          <span className="text-muted font-mono text-xs">Milestone #{i + 1}</span>
                        )}
                      </div>

                      {/* Card Title */}
                      <h3 className="text-ink mt-2.5 text-lg font-bold tracking-[-0.03em] sm:text-2xl">
                        {m.phase}
                      </h3>

                      {/* Card Detail */}
                      <p className="text-muted mt-1.5 line-clamp-2 text-xs leading-relaxed sm:line-clamp-none sm:text-sm">
                        {m.detail}
                      </p>

                      {/* Card Footer Tag */}
                      <div className="border-ink/10 text-muted/70 mt-3 flex items-center justify-between border-t pt-2.5 font-mono text-[11px]">
                        <span>Sripada Studios</span>
                        <span>{m.isCurrent ? "Present Day" : `Step ${i + 1} of 6`}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Front Pocket Flap (with strict top-to-bottom gradient) */}
            <div className="absolute inset-x-0 bottom-0 z-30 h-[160px] rounded-t-2xl rounded-b-3xl border-t border-white/25 bg-linear-to-b from-[#8b5cf6] to-[#7546e8] p-4 shadow-2xl sm:h-[180px] sm:p-6 md:h-[195px]">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] font-semibold tracking-[0.25em] text-white/75 uppercase sm:text-xs">
                    Milestones Dossier
                  </span>
                  <h4 className="mt-0.5 text-lg font-bold tracking-[-0.03em] text-white uppercase sm:text-xl md:text-2xl">
                    The Sripada Studios Archive
                  </h4>
                </div>

                {/* Progress Bar with controls — thin white line style */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-white transition-all duration-300"
                      style={{ width: `${((activeIdx + 1) / totalCards) * 100}%` }}
                    />
                  </div>
                  <span className="shrink-0 font-mono text-xs font-medium text-white/80">
                    {String(activeIdx + 1).padStart(2, "0")} / {String(totalCards).padStart(2, "0")}
                  </span>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => goToStep(Math.max(0, activeIdx - 1))}
                      disabled={activeIdx === 0}
                      aria-label="Previous milestone"
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/10 text-sm text-white transition-colors hover:bg-white/25 disabled:opacity-25"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => goToStep(Math.min(totalCards - 1, activeIdx + 1))}
                      disabled={activeIdx === totalCards - 1}
                      aria-label="Next milestone"
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/10 text-sm text-white transition-colors hover:bg-white/25 disabled:opacity-25"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Helper Note */}
        <p className="text-muted/60 mt-6 text-center font-mono text-[11px] tracking-widest uppercase">
          Scroll to pull milestones out of file
        </p>
      </div>
    </div>
  );
}
