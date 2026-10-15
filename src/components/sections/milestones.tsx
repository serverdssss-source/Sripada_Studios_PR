"use client";

import { useEffect, useRef, useState } from "react";
import { milestones } from "@/content/site";
import { Reveal } from "@/components/reveal";
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
    <div
      ref={sectionRef}
      id="journey"
      className="relative min-h-[260vh] bg-cream text-ink"
    >
      {/* Sticky viewport frame: vertically balanced, with clearance for fixed site header */}
      <div className="sticky top-0 flex min-h-screen flex-col justify-center items-center overflow-hidden px-4 pt-20 pb-8 sm:px-8">
        {/* Section Header & Selector Pills */}
        <div className="flex w-full max-w-4xl flex-col items-center text-center">
          <Reveal className="mb-2">
            <p className="mb-1.5 text-xs font-medium tracking-[0.25em] uppercase text-teal">
              Milestones
            </p>
            <h2 className="text-[clamp(1.85rem,3.8vw,3.25rem)] leading-none font-medium tracking-[-0.04em] text-ink">
              The Sripada Journey
            </h2>
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
                  "cursor-pointer rounded-full px-3 py-1 text-xs font-mono transition-all duration-300",
                  activeIdx === i
                    ? "bg-teal text-white font-bold shadow-md shadow-teal/20 scale-105"
                    : "bg-ink/5 text-muted hover:bg-ink/10 hover:text-ink",
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
            <div className="rounded-full bg-linear-to-b from-[#fdf7ed] via-[#f3e1c4] to-[#e4c084] px-3.5 py-1 text-[11px] sm:text-xs font-semibold text-[#3d2908] shadow-md shadow-[#e4c084]/30">
              {currentMilestone.tagline}
            </div>
          </div>

          <div
            key={`badge-quote-${activeIdx}`}
            className={cn(
              "pointer-events-none absolute z-40 hidden sm:block transition-all duration-500 ease-out",
              badgePos.quotePos,
            )}
          >
            <div className="rounded-full bg-linear-to-b from-[#fdf7ed] via-[#f3e1c4] to-[#e4c084] px-3.5 py-1 text-[11px] sm:text-xs font-semibold text-[#3d2908] shadow-md shadow-[#e4c084]/30">
              {currentMilestone.quote}
            </div>
          </div>

          {/* Folder Tab matching Work/Impact section */}
          <div className="relative z-10 -mb-0.5 flex w-fit">
            <div className="rounded-tl-2xl bg-linear-to-b from-[#0c353b] to-[#124850] py-2.5 pr-2 pl-6 font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-paper">
              SRIPADA ARCHIVE · 2019–NOW
            </div>
            <svg
              aria-hidden
              viewBox="0 0 40 48"
              preserveAspectRatio="none"
              className="-ml-px h-auto w-10 text-[#0c353b] fill-current"
            >
              <path d={TAB_EAR} />
            </svg>
          </div>

          {/* Folder Body matching Work/Impact section */}
          <div className="relative h-[290px] sm:h-[320px] md:h-[340px] w-full rounded-3xl rounded-tl-none border border-teal/20 bg-linear-to-b from-[#0c353b] via-[#124850] to-[#195963] shadow-2xl">
            {/* Pocket Cards Emerging Out of the File — tuned so it leaves clean clearance below selector pills */}
            <div className="absolute inset-x-3 sm:inset-x-6 top-8 z-10">
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
                    <div className="rounded-2xl sm:rounded-3xl border border-ink/10 bg-white p-4 sm:p-6 text-ink shadow-2xl transition-all duration-300">
                      {/* Card Header */}
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-teal/10 px-2.5 py-0.5 font-mono text-[11px] sm:text-xs font-bold tracking-wider text-teal uppercase">
                          Phase {String(i + 1).padStart(2, "0")}
                        </span>

                        {m.isCurrent ? (
                          <span className="flex items-center gap-1.5 rounded-full border border-teal/20 bg-teal/10 px-2.5 py-0.5 text-[11px] sm:text-xs font-medium text-teal uppercase">
                            <span className="h-2 w-2 rounded-full bg-teal animate-ping" />
                            Active Era
                          </span>
                        ) : (
                          <span className="font-mono text-xs text-muted">
                            Milestone #{i + 1}
                          </span>
                        )}
                      </div>

                      {/* Card Title */}
                      <h3 className="mt-2.5 text-lg sm:text-2xl font-medium tracking-tight text-ink">
                        {m.phase}
                      </h3>

                      {/* Card Detail */}
                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted line-clamp-2 sm:line-clamp-none">
                        {m.detail}
                      </p>

                      {/* Card Footer Tag */}
                      <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-2.5 text-[11px] font-mono text-muted/70">
                        <span>Sripada Studios</span>
                        <span>{m.isCurrent ? "Present Day" : `Step ${i + 1} of 6`}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Front Pocket Flap (with strict top-to-bottom gradient) */}
            <div className="absolute inset-x-0 bottom-0 z-30 h-[160px] sm:h-[180px] md:h-[195px] rounded-b-3xl rounded-t-2xl border-t border-white/20 bg-linear-to-b from-[#185e6a] via-[#217582] to-[#3cb5a5] p-4 sm:p-6 shadow-2xl">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-brand-soft">
                    Milestones Dossier
                  </span>
                  <h4 className="mt-0.5 text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-paper">
                    The Sripada Archive
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
                  <span className="font-mono text-xs font-medium text-white/80 shrink-0">
                    {String(activeIdx + 1).padStart(2, "0")} / {String(totalCards).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => goToStep(Math.max(0, activeIdx - 1))}
                      disabled={activeIdx === 0}
                      aria-label="Previous milestone"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 disabled:opacity-25 cursor-pointer text-sm transition-colors"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => goToStep(Math.min(totalCards - 1, activeIdx + 1))}
                      disabled={activeIdx === totalCards - 1}
                      aria-label="Next milestone"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 disabled:opacity-25 cursor-pointer text-sm transition-colors"
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
        <p className="mt-6 text-center text-[11px] font-mono tracking-widest text-muted/60 uppercase">
          Scroll to pull milestones out of file
        </p>
      </div>
    </div>
  );
}
