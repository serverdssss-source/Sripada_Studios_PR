import { work } from "@/content/site";
import { Accent, ButtonLink, Section } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";
import { FolderGallery } from "@/components/sections/folder-gallery";

// Folder tab's sloped right edge with rounded shoulder and a concave foot
// where it flows into the folder body (viewBox 0 0 40 48, stretched to fit).
const TAB_EAR = "M0 0H4C12 0 15 3 18 11L26 39C28.5 45.5 32 48 40 48H0Z";

/** Case studies, each laid out as its own file folder with details beside it. */
export function Work() {
  return (
    <Section id="work" tone="soft">
      <Reveal className="mb-16 md:mb-24">
        <p className="mb-6 text-xs font-medium tracking-[0.25em] uppercase opacity-60">
          Work / Impact
        </p>
        <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-medium tracking-[-0.04em]">
          Ideas. Campaigns. <Accent>Results.</Accent>
        </h2>
      </Reveal>

      <div className="space-y-20 md:space-y-28">
        {work.map((w, i) => {
          // Zig-zag: odd rows put the folder on the left and the details on the right.
          const flip = i % 2 === 1;
          return (
            <article
              key={w.client}
              className={cn(
                "grid gap-10 lg:items-start lg:gap-16",
                flip ? "lg:grid-cols-[1fr_36%]" : "lg:grid-cols-[36%_1fr]",
              )}
            >
              {/* Details, aligned with the top of the folder body */}
              <Reveal className={cn("lg:pt-16", flip && "lg:order-2")}>
                <p className="text-brand-soft text-xs font-medium tracking-[0.25em] uppercase">
                  {w.category}
                </p>
                <h3 className="mt-3 text-3xl font-medium tracking-[-0.03em] md:text-4xl">
                  {w.client}
                </h3>
                <p className="text-paper/85 mt-4 max-w-md text-lg leading-relaxed">{w.summary}</p>
                <p className="text-paper/85 mt-10 max-w-md text-justify text-base leading-relaxed font-normal hyphens-auto md:text-lg lg:mt-[120px]">
                  {w.description}
                </p>
              </Reveal>

              {/* The folder */}
              <Reveal delay={120} className={cn("min-w-0", flip && "lg:order-1")}>
                <div className="relative z-10 -mb-0.5 flex w-fit">
                  <div className="bg-paper text-ink rounded-tl-xl py-3 pr-2 pl-5 text-sm font-medium md:py-3.5">
                    {w.category}
                  </div>
                  <svg
                    aria-hidden
                    viewBox="0 0 40 48"
                    preserveAspectRatio="none"
                    className="text-paper -ml-px h-auto w-10 fill-current"
                  >
                    <path d={TAB_EAR} />
                  </svg>
                </div>
                <div className="bg-paper relative rounded-2xl rounded-tl-none p-3 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] sm:p-4">
                  <FolderGallery gallery={w.gallery} client={w.client} />
                  <div className="text-ink flex items-center justify-between px-1 pt-3 text-sm sm:pt-4">
                    <span className="font-medium">{w.client}</span>
                    <span className="text-ink/45 tabular-nums">
                      {String(i + 1).padStart(2, "0")} / {String(work.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </Reveal>
            </article>
          );
        })}
      </div>

      <Reveal className="mt-16 md:mt-24">
        {/* TODO: point to a full case-studies page once it exists */}
        <ButtonLink href="#contact" variant="outline">
          View Selected Work
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
