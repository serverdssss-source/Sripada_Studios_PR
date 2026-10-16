import Image from "next/image";
import { founders, type Founder } from "@/content/site";
import { Accent, Section, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

export function Founders() {
  return (
    <Section id="founders" tone="cream">
      <SectionHeading
        eyebrow="The Founders"
        titleClassName="text-[clamp(2.25rem,4.7vw,67px)]"
        title={
          <>
            The People Behind <Accent>Sripada</Accent>
          </>
        }
      />

      <div className="space-y-28 md:space-y-40">
        {founders.map((f) => (
          <FounderBlock key={f.name} founder={f} />
        ))}
      </div>
    </Section>
  );
}

/**
 * Split a point into a sans lead and a serif-italic accent at a natural break:
 * keep "X & Y" pairs together, never split "|" lists, otherwise accent the
 * last word or two.
 */
function splitPhrase(text: string): [string, string] {
  const words = text.split(" ");
  if (words.includes("|") || words.length < 2) return [text, ""];
  const take = words.at(-2) === "&" ? 3 : words.length >= 4 ? 2 : 1;
  return [words.slice(0, -take).join(" "), words.slice(-take).join(" ")];
}

function FounderBlock({ founder: f }: { founder: Founder }) {
  const [firstName, lastName] = [
    f.name.split(" ").slice(0, -1).join(" "),
    f.name.split(" ").at(-1),
  ];

  return (
    <article className="grid gap-10 md:grid-cols-2 md:gap-16">
      {/* Left: name + role, the points stacked beneath, CTA at the foot */}
      <div>
        <Reveal>
          <h3 className="text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-medium tracking-[-0.03em]">
            {firstName} <Accent>{lastName}.</Accent>
            <span className="text-teal mt-3 block text-[0.55em] leading-tight font-normal tracking-[-0.01em]">
              {f.role}
            </span>
          </h3>
        </Reveal>

        {/* Points: plain rows on the section background, hairline dividers */}
        <ol className="border-ink/10 divide-ink/10 mt-8 divide-y border-y">
          {f.points.map((point, i) => {
            const [lead, accent] = splitPhrase(point);
            return (
              <Reveal key={point} as="li" delay={i * 80} className="py-3.5">
                <p className="flex-1 text-base leading-snug font-medium tracking-[-0.01em] md:text-lg">
                  {lead}
                  {accent && (
                    <>
                      {" "}
                      <span className="text-teal font-serif font-normal italic">{accent}</span>
                    </>
                  )}
                </p>
              </Reveal>
            );
          })}
        </ol>

        <a
          href={f.profileHref}
          className="border-teal text-teal hover:bg-teal hover:text-paper mt-8 inline-block rounded-full border px-6 py-2.5 font-serif text-lg italic transition-colors"
        >
          View Profile
        </a>
      </div>

      {/* Right: one portrait spanning the bio's full width, bio as a large statement beneath */}
      <Reveal delay={120}>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
          {/* SAMPLE portrait — replace with the founder's photo */}
          <Image
            src={f.image}
            alt={`Portrait of ${f.name}`}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className={cn("object-cover", f.imagePosition ?? "object-top")}
          />
        </div>
        <p className="mt-8 text-[clamp(1.375rem,2.4vw,2rem)] leading-snug font-medium tracking-[-0.02em]">
          {f.bio}
        </p>
      </Reveal>
    </article>
  );
}
