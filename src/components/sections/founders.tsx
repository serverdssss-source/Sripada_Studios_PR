import Image from "next/image";
import { founders, type Founder } from "@/content/site";
import { ButtonLink, Section } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { StickerBurst } from "@/components/sticker-burst";
import { cn } from "@/lib/cn";

// Poster-style card per founder: a giant serif first name across the top, the cut-out portrait
// standing in front of it (head over the letters), and a short uppercase block of their focus.
const cards: {
  card: string;
  name: string;
  text: string;
  /** Where the portrait stands, and how tall it is relative to the card. */
  photo: string;
  /** Where the uppercase text block sits. */
  copy: string;
  /** Giant-name size in container-width units, so the name always spans the card. */
  nameSize: string;
  /** Starburst sticker stuck on one corner of the card. */
  burst: { color: string; position: string };
}[] = [
  {
    card: "bg-[#e9e3ff]",
    name: "text-[#8b5cf6]",
    text: "text-[#216974]",
    photo: "-left-[3%] h-[74%]",
    copy: "top-[31%] left-[54%] max-w-[40%] items-start text-left",
    nameSize: "text-[21cqw]",
    burst: { color: "#54c4b6", position: "-top-6 -left-5 md:-top-8 md:-left-7" },
  },
  {
    card: "bg-[#216974]",
    name: "text-[#f5f5f3]",
    text: "text-[#f5f5f3]",
    photo: "-right-[9%] h-[74%]",
    copy: "top-[31%] left-[7%] max-w-[42%] items-start text-left",
    nameSize: "text-[21cqw]",
    burst: { color: "#8b5cf6", position: "-bottom-6 -left-5 md:-bottom-8 md:-left-7" },
  },
];

export function Founders() {
  return (
    <Section id="founders" tone="cream">
      <Reveal>
        {/* Same big, bold, tight uppercase type as "FLAGSHIP", cut out like a sticker (thick
            white outline + soft shadow), with a small floating star on its corner. Sizes are
            in em so they scale with the heading. */}
        <div className="relative mb-8 inline-block text-[length:min(11vw,8.5rem)] md:mb-12">
          <h2 className="sticker-text text-brand-night leading-[0.85] font-bold tracking-[-0.06em] uppercase">
            The Founders
          </h2>
          <Image
            src="/elements/golden-shiny-starburst.png"
            alt=""
            aria-hidden
            width={160}
            height={160}
            className="star-float pointer-events-none absolute -top-[0.38em] -left-[0.3em] w-[0.5em]"
          />
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {founders.map((founder, i) => (
          <Reveal key={founder.name} delay={i * 120} className="relative">
            <FounderCard founder={founder} style={cards[i % cards.length]} />
            <StickerBurst
              color={cards[i % cards.length].burst.color}
              className={cn(
                "pointer-events-none absolute z-10 w-14 md:w-20",
                cards[i % cards.length].burst.position,
              )}
            />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex flex-wrap gap-4 md:mt-14">
        <ButtonLink href="#journey" variant="outline">
          Explore Our Journey
        </ButtonLink>
        <ButtonLink href="#contact" variant="outline">
          Media &amp; PR Enquiries
        </ButtonLink>
      </Reveal>
    </Section>
  );
}

function FounderCard({ founder, style }: { founder: Founder; style: (typeof cards)[number] }) {
  const [first, ...rest] = founder.name.split(" ");
  return (
    <figure
      className={cn(
        "@container relative aspect-[3/4] overflow-hidden rounded-[2rem] md:rounded-[2.5rem]",
        style.card,
      )}
    >
      {/* Giant first name, behind the portrait. */}
      <p
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-[9%] text-center font-serif leading-[0.85] font-semibold tracking-[-0.03em]",
          style.name,
          style.nameSize,
        )}
      >
        {first}
      </p>

      <Image
        src={founder.cutout}
        alt={`Portrait of ${founder.name}`}
        width={800}
        height={1400}
        sizes="(min-width: 768px) 30vw, 70vw"
        className={cn("absolute bottom-0 w-auto max-w-none object-contain", style.photo)}
      />

      {/* Name, role and focus, in front of everything. */}
      <figcaption
        className={cn(
          "absolute z-10 flex flex-col gap-[1cqw] text-[2.9cqw] leading-[1.15] font-bold uppercase",
          style.text,
          style.copy,
        )}
      >
        <span className="text-[2.1cqw] font-semibold tracking-[0.22em] opacity-80">
          {founder.role}
        </span>
        <span className="text-[4cqw] leading-none tracking-[-0.02em]">
          {first} {rest.join(" ")}
        </span>
        <span className="mt-[1cqw] flex flex-col gap-[0.6cqw] tracking-[-0.01em]">
          {founder.points.slice(0, 3).map((point) => (
            <span key={point}>{point}</span>
          ))}
        </span>
      </figcaption>
    </figure>
  );
}
