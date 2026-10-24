import Image from "next/image";
import { founders, founderVoice } from "@/content/site";
import { Accent, Section } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

/** Founder quote on cream background without carousel rotation or progress bar indicators. */
export function FounderVoice() {
  return (
    <Section id="voice" tone="cream" className="py-6! text-center sm:py-8! md:py-10!">
      <Reveal>
        <p className="mb-2 text-xs font-medium tracking-[0.25em] uppercase opacity-60">
          {founderVoice.eyebrow}
        </p>
        <h2 className="text-[clamp(1.85rem,3.8vw,3.25rem)] leading-none font-medium tracking-[-0.04em]">
          What We <Accent>Believe</Accent>
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <figure className="relative mx-auto mt-6 max-w-5xl md:mt-8">
          <span
            aria-hidden
            className="text-teal/15 pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 font-serif text-[8rem] leading-none select-none md:-top-14 md:text-[12rem]"
          >
            “
          </span>
          <blockquote className="text-ink relative font-serif text-[clamp(1.5rem,3.6vw,3.25rem)] leading-[1.2] tracking-[-0.02em] text-balance italic">
            “{founderVoice.quote}”
          </blockquote>

          <figcaption className="mt-5 flex flex-col items-center gap-2.5 md:mt-6">
            <span className="flex -space-x-2.5">
              {founders.map((f) => (
                <span
                  key={f.name}
                  className="ring-cream relative h-10 w-10 overflow-hidden rounded-full ring-3"
                >
                  <Image
                    src={f.image}
                    alt={f.name}
                    fill
                    sizes="40px"
                    className={cn("object-cover", f.imagePosition ?? "object-top")}
                  />
                </span>
              ))}
            </span>
            <span>
              <span className="text-ink block text-base font-medium sm:text-lg">
                — {founderVoice.by}
              </span>
              <span className="text-muted mt-0.5 block text-xs sm:text-sm">{founderVoice.sub}</span>
            </span>
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}
