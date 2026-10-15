import type { CSSProperties } from "react";
import { Accent, ButtonLink } from "@/components/ui";
import { CardFace, fanPose, travelCards } from "@/components/travel-cards/cards";

export function Hero() {
  return (
    <section
      id="top"
      className="grain relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-12 text-center sm:px-8"
    >
      <div
        aria-hidden
        className="bg-brand/15 pointer-events-none absolute top-1/2 left-1/2 h-[36rem] w-[60rem] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
      />

      <h1 className="animate-fade-up relative max-w-5xl text-[clamp(2.5rem,min(6vw,9svh),6rem)] leading-[0.95] font-medium tracking-[-0.045em] text-balance">
        Building Brands. Creating Influence. <Accent>Driving Growth.</Accent>
      </h1>

      {/* Card fan */}
      <ul
        aria-label="Selected work"
        className="relative mt-[min(3.5rem,6svh)] flex justify-center pb-[calc(var(--w)*0.3)] [--w:clamp(6.5rem,min(15vw,20svh),15rem)]"
      >
        {travelCards.map((c, i) => {
          const { off, yRem, r, z } = fanPose(i);
          return (
            // Slot measured by <TravelLayer>; its static card is the no-motion fallback.
            <li
              key={c.title}
              data-slot={`fan-${i}`}
              data-yrem={yRem}
              data-r={r}
              className="-mx-[calc(var(--w)*0.135)] w-(--w) shrink-0"
              style={{ zIndex: z }}
            >
              <div
                className="fan-card slot-static"
                style={
                  {
                    "--off": off,
                    "--y": `${yRem}rem`,
                    "--r": `${r}deg`,
                    "--d": `${300 + Math.abs(off) * 110}ms`,
                  } as CSSProperties
                }
              >
                <CardFace
                  image={c.image}
                  title={c.title}
                  sizes="(min-width: 768px) 15vw, 30vw"
                  priority={Math.abs(off) <= 1}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <p className="animate-fade-up text-paper/70 relative mt-6 max-w-2xl text-lg leading-relaxed text-balance [animation-delay:900ms]">
        A Bengaluru-based digital marketing &amp; creative agency helping brands build visibility
        through Strategy | Content | Performance | Digital Experiences.
      </p>

      <div className="animate-fade-up relative mt-8 flex flex-wrap justify-center gap-3 [animation-delay:1000ms]">
        <ButtonLink href="#journey">Explore Our Journey</ButtonLink>
        <ButtonLink href="#media" variant="outline">
          Media &amp; PR Enquiries
        </ButtonLink>
      </div>
    </section>
  );
}
