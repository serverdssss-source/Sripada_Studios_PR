import Image from "next/image";
import { site, spotlight } from "@/content/site";
import { Accent, ButtonLink, Section } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

/** The press room: a headline-sized title and eight spotlight categories. */
export function Media() {
  const pressHref = `mailto:${site.contact.people.map((p) => p.email).join(",")}?subject=Media%20Kit%20%26%20Press%20Enquiry`;

  return (
    <Section id="media">
      <Reveal className="mb-14 flex flex-col gap-10 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-6 text-xs font-medium tracking-[0.25em] uppercase opacity-60">
            Media / PR
          </p>
          <h2 className="text-[clamp(3.25rem,10vw,9rem)] leading-[0.88] font-medium tracking-[-0.05em]">
            In the <br className="hidden sm:block" />
            <Accent>Spotlight</Accent>
          </h2>
        </div>
        <ButtonLink href={pressHref} className="self-start md:self-end">
          Media Kit &amp; Press Enquiries
        </ButtonLink>
      </Reveal>

      {/* Eight categories in a bento: wide tiles at 1 and 8, plus 5 and 7 on desktop, fill every row */}
      <ul className="grid auto-rows-[minmax(13rem,auto)] grid-cols-2 gap-3 md:auto-rows-[16rem] md:grid-cols-4">
        {spotlight.map((s, i) => (
          <Reveal
            key={s.title}
            as="li"
            delay={(i % 4) * 80}
            className={cn(
              "group relative overflow-hidden rounded-2xl",
              (i === 0 || i === spotlight.length - 1) && "col-span-2",
              (i === 4 || i === 6) && "md:col-span-2",
            )}
          >
            <Image
              src={s.image}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-1000 ease-(--ease-premium) group-hover:scale-105"
            />
            <div className="from-ink/90 via-ink/30 absolute inset-0 bg-linear-to-t to-transparent" />
            <span className="text-paper/70 absolute top-4 left-5 text-xs tracking-[0.2em]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="absolute inset-x-5 bottom-5 text-[clamp(1.25rem,2.2vw,2rem)] leading-tight font-medium tracking-[-0.02em]">
              {s.title}
            </h3>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
