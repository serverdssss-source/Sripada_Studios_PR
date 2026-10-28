import Image from "next/image";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { StickerBurst } from "@/components/sticker-burst";
import { work } from "@/content/site";
import { cn } from "@/lib/cn";
import { CaseStudyDialog } from "@/components/case-study-dialog";

export function StudioCaseStudy() {
  return (
    <Section id="sripada-case-study" className="py-20! md:py-28!">
      <Reveal className="max-w-5xl">
        {/* "Case Study" as a tilted, die-cut sticker: white edge, violet face, a peeled-up
            bottom-right corner and the floating golden star stuck on its top corner. */}
        <div className="relative mt-2 inline-block -rotate-3 text-[clamp(2.75rem,6vw,5.5rem)] drop-shadow-[0_18px_22px_rgb(0_2_2/0.45)]">
          <div className="rounded-[0.55em] bg-white p-[0.09em] [clip-path:polygon(0_0,100%_0,100%_calc(100%-0.6em),calc(100%-0.6em)_100%,0_100%)]">
            <h2 className="rounded-[0.46em] bg-[#8b5cf6] pt-[0.12em] pr-[0.75em] pb-[0.2em] pl-[0.42em] leading-none font-bold tracking-[-0.05em] text-white">
              Case Study
            </h2>
          </div>
          {/* The lifted corner: the cut-off corner folded back over the cut line. The shadow sits
              on a wrapper because clip-path would otherwise clip it away. */}
          <span
            aria-hidden
            className="absolute right-0 bottom-0 size-[0.6em] drop-shadow-[-3px_-3px_4px_rgb(11_11_15/0.35)]"
          >
            <span className="block size-full bg-linear-to-br from-white via-[#eef0f0] to-[#c3caca] [clip-path:polygon(0_0,100%_0,0_100%)]" />
          </span>
          <Image
            src="/elements/golden-shiny-starburst.png"
            alt=""
            aria-hidden
            width={200}
            height={200}
            className="star-float pointer-events-none absolute -top-[0.45em] -right-[0.35em] w-[0.8em]"
          />
        </div>
      </Reveal>

      <Reveal delay={100} className="mt-12 max-w-4xl md:mt-16">
        <p className="text-paper/75 max-w-3xl text-lg leading-relaxed md:text-xl">
          Snippets from filmmakers, jury members, and past sponsors highlighting platform reach and
          credibility.
        </p>
      </Reveal>

      {/* Selected work: a violet panel holding four case-study cards. SAMPLE content for now,
          taken from the existing work list; swap in real case studies when ready. */}
      <Reveal delay={150} className="mt-10 md:mt-14">
        <div className="relative rounded-[2rem] bg-[#8b5cf6] p-4 sm:p-6 md:rounded-[2.5rem] md:p-8">
          <StickerBurst
            color="#54c4b6"
            className="absolute -top-9 -right-6 hidden w-16 sm:block md:w-20"
          />
          {/* 3D arrow stuck on the opposite (bottom-left) corner, pointing into the panel. */}
          <Image
            src="/elements/arrow.png"
            alt=""
            aria-hidden
            width={200}
            height={200}
            className="pointer-events-none absolute -bottom-10 -left-8 z-10 hidden w-20 drop-shadow-[0_10px_14px_rgb(0_2_2/0.35)] sm:block md:w-24"
          />

          <div className="mb-5 flex flex-wrap items-center justify-between gap-4 sm:pr-12 md:mb-7 md:pr-14">
            <h3 className="text-xl font-bold tracking-[-0.02em] text-white uppercase md:text-2xl">
              Selected Work
            </h3>
            <a
              href="#contact"
              className="rounded-full border border-white/70 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-white hover:text-[#8b5cf6]"
            >
              Start a project
            </a>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {work.map((item) => (
              <li
                key={item.client}
                className="group text-brand-night relative flex flex-col rounded-[1.5rem] bg-[#f5f5f3] p-4"
              >
                <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-[#216974] uppercase">
                  {item.category}
                </p>
                {/* Name and summary keep a fixed height (2 lines each), and the image is pinned to
                    the bottom, so every card's image lines up. */}
                <h4 className="mt-2 line-clamp-2 text-[1.35rem] leading-[1.05] font-bold tracking-[-0.04em] text-[#8b5cf6] uppercase sm:min-h-[2lh]">
                  {item.client}
                </h4>
                <p className="text-brand-night/60 mt-2 mb-4 line-clamp-2 text-sm leading-snug sm:min-h-[2lh]">
                  {item.summary}
                </p>
                <div className="relative mt-auto aspect-[4/5] overflow-hidden rounded-[1.1rem] bg-[#e6e6e2]">
                  <Image
                    src={item.image}
                    alt={`${item.client} campaign creative`}
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                    className={cn(
                      "object-cover transition-transform duration-700 ease-(--ease-premium) group-hover:scale-105",
                      "imagePosition" in item && item.imagePosition,
                    )}
                  />
                  <span
                    aria-hidden
                    className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-[#8b5cf6] text-lg text-white shadow-lg transition-transform duration-500 ease-(--ease-premium) group-hover:-rotate-45"
                  >
                    →
                  </span>
                </div>
                {"caseStudy" in item && item.caseStudy && (
                  <CaseStudyDialog client={item.client} study={item.caseStudy} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
