import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

// Tilted sticker tags scattered over the big words (desktop), in brand colours.
const stickers = [
  {
    label: "Title Sponsor",
    position: "top-[30%] left-[4%]",
    tilt: "-rotate-12",
    tone: "bg-[#8b5cf6] text-white",
  },
  {
    label: "Red Carpet",
    position: "top-[36%] left-[44%]",
    tilt: "rotate-6",
    tone: "bg-brand-lime text-brand-night",
  },
  {
    label: "Co-Sponsor",
    position: "top-[30%] right-[6%]",
    tilt: "rotate-12",
    tone: "bg-[#216974] text-white",
  },
  {
    label: "2M+ Impressions",
    position: "top-[2%] right-[18%]",
    tilt: "-rotate-6",
    tone: "bg-[#f5f5f3] text-brand-night",
  },
];

const badgeText = "Cini-Mini 2026 • Kannada Short Film Competition • ";

export function FlagshipBanner() {
  return (
    <section
      id="flagship"
      aria-label="Flagship Sponsorship Opportunity"
      className="text-brand-night relative z-20 overflow-x-clip bg-[#54c4b6] px-4 pt-16 pb-12 sm:px-8 md:pt-24 md:pb-22 lg:pb-26"
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Top row: the Cini-Mini 2026 logo in a small round badge (dark, so the gold reads on
            the aqua) with the intro beside it on the left, "FLAGSHIP" on the right. */}
        <div className="flex items-start justify-between gap-6">
          <Reveal className="flex items-start gap-4 md:gap-6">
            <div className="grid aspect-square w-20 shrink-0 place-items-center rounded-full border-4 border-[#f5f5f3] bg-[#000202] p-3 shadow-[0_14px_24px_-14px_rgb(11_11_15/0.6)] md:w-28 md:p-4 lg:w-32">
              <Image
                src="/images/cini-mini-logo-cropped.webp"
                alt="Cini-Mini 2026 — Kannada Short Film Competition"
                width={1080}
                height={830}
                className="h-auto w-full"
              />
            </div>
            <p className="mt-2 hidden max-w-[14rem] text-sm leading-snug font-semibold sm:block">
              Cini-Mini 2026 — Kannada Short Film Competition with Sripada Studios.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="sr-only">Flagship Sponsorship Opportunity</h2>
            <p
              aria-hidden
              className="text-right text-[length:min(11vw,8.5rem)] leading-[0.85] font-bold tracking-[-0.06em] uppercase"
            >
              Flagship
            </p>
          </Reveal>
        </div>

        {/* The two giant words, each sized (about 6.6em wide) to fill the width exactly. */}
        <div aria-hidden className="relative mt-4 md:mt-6">
          <Reveal delay={150}>
            <p className="text-center text-[length:min(calc((100vw-2rem)/6.7),12rem)] leading-[0.85] font-bold tracking-[-0.065em] uppercase sm:text-[length:min(calc((100vw-4rem)/6.7),12rem)]">
              Sponsorship
            </p>
          </Reveal>
          <Reveal delay={250}>
            <p className="text-center text-[length:min(calc((100vw-2rem)/6.7),12rem)] leading-[0.85] font-bold tracking-[-0.065em] uppercase sm:text-[length:min(calc((100vw-4rem)/6.7),12rem)]">
              Opportunity
            </p>
          </Reveal>

          {stickers.map((s, i) => (
            <Reveal
              key={s.label}
              effect="pop"
              delay={400 + i * 150}
              className={cn("absolute hidden md:block", s.position)}
            >
              <span
                className={cn(
                  "block rounded-full px-4 py-2 text-xs font-bold tracking-[0.12em] whitespace-nowrap uppercase shadow-[0_10px_24px_-12px_rgb(11_11_15/0.5)] lg:text-sm",
                  s.tone,
                  s.tilt,
                )}
              >
                {s.label}
              </span>
            </Reveal>
          ))}

          <Image
            src="/elements/golden-shiny-starburst.png"
            alt=""
            aria-hidden
            width={300}
            height={300}
            className="star-float pointer-events-none absolute top-[-18%] left-[38%] hidden w-16 md:block lg:w-24"
          />
        </div>

        {/* Phones: the stickers sit in a row under the words instead of over them. */}
        <ul className="mt-6 flex flex-wrap gap-2 md:hidden">
          {stickers.map((s) => (
            <li
              key={s.label}
              className={cn(
                "rounded-full px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.12em] uppercase",
                s.tone,
              )}
            >
              {s.label}
            </li>
          ))}
        </ul>

        {/* Spinning round badge just below "OPPORTUNITY" (clear of the letters), centred on the top
            edge of the Cini-Mini card, with a clapperboard at its centre. The section's z-20 keeps it
            above the card's z-10 play overlay. */}
        <div className="absolute -bottom-40 left-1/2 hidden -translate-x-1/2 md:block lg:-bottom-48">
          <div className="relative grid h-36 w-36 place-items-center rounded-full bg-[#f5f5f3] shadow-[0_20px_40px_-20px_rgb(11_11_15/0.5)] lg:h-44 lg:w-44">
            <svg
              aria-hidden
              viewBox="0 0 200 200"
              className="badge-spin absolute inset-0 h-full w-full"
            >
              <defs>
                <path
                  id="flagship-badge-circle"
                  d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
                />
              </defs>
              <text className="fill-brand-night text-[13px] font-semibold tracking-[0.18em] uppercase">
                {/* Stretch the text to wrap the full circle (2π × 78 ≈ 490). */}
                <textPath href="#flagship-badge-circle" textLength={488} lengthAdjust="spacing">
                  {badgeText}
                </textPath>
              </text>
            </svg>
            <Image
              src="/elements/cinema-clapperboard.png"
              alt=""
              aria-hidden
              width={160}
              height={160}
              className="w-20 lg:w-24"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
