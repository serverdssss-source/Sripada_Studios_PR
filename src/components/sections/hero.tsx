import { ButtonLink } from "@/components/ui";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export function Hero() {
  return (
    <section
      id="top"
      // Mostly black, with brand teal rising only at the bottom into the next section.
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-[linear-gradient(180deg,#000202_0%,#000202_62%,#0f3f45_84%,#216974_100%)] px-4 pt-24 pb-10 text-white sm:px-8 lg:px-10"
    >
      <HeroSwirl />

      {/* Headline and intro sit together as one block, centred in the screen. */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* One weight (bold) and upright throughout, like the other section headings; accent
            words in brand violet and aqua, which read well on the dark gradient. */}
        <h1 className="text-left text-[length:min(6.3vw,2.6rem)] leading-[0.95] font-bold tracking-[-0.06em] uppercase sm:text-[clamp(2.6rem,5.3vw,5.75rem)]">
          <span className="block">Connecting Iconic Brands</span>
          <span className="block">
            with <em className="pr-[0.06em] text-[#8b5cf6] not-italic">Cultural</em>{" "}
            <em className="pr-[0.06em] text-[#8b5cf6] not-italic">Events</em>
          </span>
          <span className="block">
            <em className="pr-[0.06em] not-italic">&amp;</em>{" "}
            <span
              data-showreel-trigger
              className="showreel-frame"
              aria-hidden="true"
              // Frame size before scrolling, relative to the headline (about cap height tall).
              style={{ width: "2.2em", height: "0.74em", verticalAlign: "-0.04em" }}
            >
              <span className="showreel-still" />
            </span>{" "}
            <em className="pr-[0.06em] text-[#54c4b6] not-italic">Cinematic Media.</em>
          </span>
        </h1>

        {/* Matches the reference: no divider, generous gap under the headline. */}
        <div className="mt-10 flex w-full flex-col items-start gap-8 sm:mt-16 sm:gap-10">
          <p className="max-w-2xl text-left text-base leading-relaxed text-white/75 sm:text-lg">
            Sripada Studios is the ultimate event &amp; digital partner bridging brands,
            high-visibility IP festivals, and top-tier content creation.
          </p>

          <div className="flex w-full flex-col items-stretch gap-5 sm:w-auto sm:flex-row sm:items-end sm:gap-10">
            {site.heroCtas.map((cta, i) => (
              <div key={cta.label} className="flex flex-col gap-2 sm:w-64">
                <span className="text-[0.65rem] font-medium tracking-[0.18em] text-white/55 uppercase sm:text-[0.7rem]">
                  {cta.audience}
                </span>
                <ButtonLink
                  href={cta.href}
                  variant={i === 0 ? "solid" : "outline"}
                  // Same size for both: equal width, and a transparent border on the solid one
                  // so its height matches the outlined button.
                  className={cn(
                    "w-full justify-between",
                    i === 0
                      ? "bg-brand-lime! text-brand-night! border border-transparent hover:bg-white!"
                      : "border-white/30! text-white hover:border-white!",
                  )}
                >
                  {cta.label}
                </ButtonLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Decorative brand-green line that draws itself in once on load (pathLength 1 +
 * dash offset 1 → 0). From sm up it spans the whole hero, entering from the
 * left edge about three-quarters down, dipping under the buttons, looping twice, and leaving at the
 * top-right corner; on phones a shorter version loops under the buttons.
 */
const SWIRL_DESKTOP =
  "M -40 675 C 60 700 160 830 360 860 C 560 890 760 860 900 832 C 960 820 1010 800 1000 760 C 990 720 900 730 920 790 C 945 860 1080 840 1140 720 C 1200 600 1180 470 1270 420 C 1370 365 1420 500 1330 520 C 1250 538 1240 420 1310 330 C 1390 230 1500 120 1640 40";
const SWIRL_MOBILE =
  "M -10 200 C 80 230 170 400 230 330 C 300 250 330 150 270 120 C 200 85 140 170 190 240 C 250 320 400 330 500 270 C 600 210 640 120 720 120 C 820 120 830 250 760 290 C 690 330 640 260 690 210 C 760 140 900 200 940 300 C 970 380 990 430 1020 450";

function HeroSwirl() {
  return (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
      >
        <SwirlPath d={SWIRL_DESKTOP} />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 600"
        fill="none"
        className="pointer-events-none absolute right-[-25%] bottom-[-11%] w-[130vw] max-w-none sm:hidden"
      >
        <SwirlPath d={SWIRL_MOBILE} />
      </svg>
    </>
  );
}

function SwirlPath({ d }: { d: string }) {
  return (
    <path
      d={d}
      stroke="#83cd15"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={0}
    >
      <animate
        attributeName="stroke-dashoffset"
        from="1"
        to="0"
        dur="2.6s"
        begin="0.2s"
        fill="freeze"
        calcMode="spline"
        keyTimes="0;1"
        keySplines="0.16 1 0.3 1"
      />
    </path>
  );
}
