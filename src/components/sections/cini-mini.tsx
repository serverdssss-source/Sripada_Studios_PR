import { Section } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { PromoVideo } from "@/components/promo-video";
import { MetricRoll } from "@/components/metric-roll";
import type { StickerTone } from "@/components/metric-sticker";

const metrics = [
  ["5,000+", "Footfall"],
  ["300+", "Short Film Submissions"],
  ["3", "Theatres"],
  ["2M – 3M", "Target Brand Impressions"],
];

// Sticker colours for the metrics, from the brand palette: face, text, inner ring, accent.
const stickerTones: StickerTone[] = [
  { face: "#8b5cf6", ink: "#ffffff", ring: "#adfa3b", accent: "#adfa3b" },
  { face: "#216974", ink: "#ffffff", ring: "#54c4b6", accent: "#adfa3b" },
  { face: "#54c4b6", ink: "#0b0b0f", ring: "#8b5cf6", accent: "#8b5cf6" },
  { face: "#adfa3b", ink: "#0b0b0f", ring: "#216974", accent: "#8b5cf6" },
];

const jury = [
  "Nagatihalli Chandrashekhar",
  "Satya Hegde",
  "Simple Suni",
  "Sruthi Hariharan",
];

export function CiniMini() {
  return (
    <>
      {/* Showcase card straddling the teal Flagship section and this one: the band behind it is
          teal on top, cream below. A soft violet container holds the pill-shaped promo video (looping preview + play). */}
      <div className="bg-[linear-gradient(to_bottom,#54c4b6_50%,var(--color-cream)_50%)] px-4 sm:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <div className="rounded-[1.25rem] bg-[#a78bfa] p-2.5 shadow-[0_30px_60px_-30px_rgb(11_11_15/0.45)] sm:p-4 md:rounded-[1.75rem] md:p-5">
            {/* Pill-shaped while the preview loops; once played (the video gains controls) it
                eases into the video's own 16:9 with small corners, so the whole frame shows. */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] transition-all duration-700 ease-(--ease-premium) has-[video[controls]]:aspect-video has-[video[controls]]:rounded-[1rem] sm:aspect-[16/9] sm:rounded-[6rem] sm:has-[video[controls]]:rounded-[1.25rem] lg:aspect-[2.3/1] lg:rounded-[18rem] lg:has-[video[controls]]:aspect-video lg:has-[video[controls]]:rounded-[1.25rem]">
              <PromoVideo
                preview={{
                  webm: "/media/cini-mini/preview.webm",
                  mp4: "/media/cini-mini/preview.mp4",
                }}
                full={{
                  webm: "/media/cini-mini/cini-mini-promo.webm",
                  mp4: "/media/cini-mini/cini-mini-promo.mp4",
                }}
                poster="/media/cini-mini/poster.jpg"
                label="Cini-Mini 2026 promo video"
              />
            </div>
          </div>
        </Reveal>
      </div>

      <Section
        id="cini-mini"
        tone="cream"
        className="overflow-x-clip pt-12! pb-12! md:pt-16! md:pb-16!"
      >
        <Reveal>
          <p className="text-ink mx-auto mb-12 max-w-4xl text-center text-xl leading-snug font-bold text-balance md:mb-16 md:text-3xl">
            Cini-Mini 2026 – Kannada Short Film Competition presented by Tent Cinema &amp; Satya
            Hegde Studios <br /> in partnership with Sripada Studios.
          </p>
        </Reveal>

        {/* Pinned while scrolling: the stickers roll in one by one (4-3-2-1) with the jury and
            timeline on the same screen, then the page moves on. */}
        <MetricRoll
          title="Key Event Metrics"
          items={metrics.map(([value, label], i) => ({
            value,
            label,
            tone: stickerTones[i % stickerTones.length],
            peel: i === 1 ? "top-right" : i === 3 ? "bottom-right" : undefined,
            burst: i % 2 === 0,
          }))}
        >
          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-teal text-xs font-medium tracking-[0.25em] uppercase">
                Distinguished Jury &amp; Guests
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-base leading-relaxed lg:text-lg">
                {jury.map((name, i) => (
                  <li key={name}>
                    {name}
                    {i < jury.length - 1 && (
                      <span className="text-teal/50 ml-3" aria-hidden>
                        ·
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-teal text-xs font-medium tracking-[0.25em] uppercase">
                Event Timeline Highlights
              </p>
              <p className="mt-4 max-w-2xl text-[clamp(1.4rem,2.4vw,2rem)] leading-tight font-medium tracking-[-0.03em]">
                Multi-phase roll-out from June poster launches to the November 22 Grand Finale &amp;
                Red Carpet.
              </p>
            </div>
          </div>
        </MetricRoll>
      </Section>
    </>
  );
}
