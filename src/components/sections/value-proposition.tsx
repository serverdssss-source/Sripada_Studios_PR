import Image from "next/image";
import { Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/reveal";

const valueNodes = [
  {
    audience: "For Brands",
    benefits: [
      [
        "Targeted Exposure",
        "Reach regional & Gen-Z audiences via high-visibility event placements.",
      ],
      [
        "High ROI",
        "High-impression brand placement across digital, physical, and red carpet spaces.",
      ],
      [
        "Custom Integration",
        "Title branding, jury/guest hampers, social collaborations, and custom CTAs.",
      ],
    ],
  },
  {
    audience: "For Sponsorships & Events",
    benefits: [
      ["Event Strategy & Execution", "Full-scale digital, marketing, and event execution."],
      [
        "Sponsorship Curation",
        "Structuring and securing Title, Co-Sponsor, and Category partners.",
      ],
      [
        "Audience Engagement",
        "Managing multi-phase campaign launches, early-bird drives, and live reveals.",
      ],
    ],
  },
  {
    audience: "By Sripada Studios",
    benefits: [
      [
        "Full-Stack Production",
        "End-to-end creative production, digital marketing, and distribution — built and delivered by Sripada Studios.",
      ],
      [
        "Mainstream Network",
        "Direct connections to premier film institutes, studios, and industry leaders, powered by Sripada Studios.",
      ],
      [
        "Innovator in Formats",
        "Pioneering short films, mini-series, vertical cinema, and AI film integrations — crafted by Sripada Studios.",
      ],
    ],
  },
];

// Card colours from the brand palette, with text colours chosen for contrast on each.
const cardTones = [
  {
    card: "bg-[#8b5cf6] text-white",
    detail: "text-white/80",
    tilt: "md:-rotate-3",
    lift: "md:mt-10",
  },
  {
    card: "bg-[#216974] text-white",
    detail: "text-white/75",
    tilt: "md:rotate-2",
    lift: "md:mt-0",
  },
  {
    card: "bg-[#54c4b6] text-brand-night",
    detail: "text-brand-night/75",
    tilt: "md:-rotate-2",
    lift: "md:mt-14",
  },
];

export function ValueProposition() {
  return (
    <Section
      id="value-proposition" // Soft off-white (not pure white) that sits well beside the teal and violet.
      className="text-brand-night! overflow-hidden bg-[#f5f5f3] py-16! md:py-28!"
    >
      <div className="relative">
        {/* Golden starburst layered over the top of "brands", towards the right. */}
        <Image
          src="/elements/golden-shiny-starburst.png"
          alt=""
          aria-hidden
          width={400}
          height={400}
          className="star-float pointer-events-none absolute -top-[0.75rem] right-[1%] z-10 hidden w-16 rotate-12 md:block lg:-top-[1.25rem] lg:right-[2%] lg:w-24"
        />

        {/* Two-line headline in the site font, each line sized to fit on one line (line 1 is
            ~10.7em wide); line two sits indented to the right, as in a magazine spread. */}
        <Reveal>
          <h2 className="text-[length:calc((100vw-2rem)/11)] leading-[0.95] font-medium tracking-[-0.055em] sm:text-[length:min(7.25rem,calc((100vw-4rem)/11))]">
            <span className="block whitespace-nowrap">
              Dynamic value for{" "}
              {/* Brand-violet gradient text, bottom to top (light lilac → #8b5cf6). */}
              <span className="bg-linear-to-t from-[#c4b5fd] to-[#8b5cf6] bg-clip-text pr-[0.06em] text-transparent">
                brands
              </span>
              ,
            </span>
            <span className="block whitespace-nowrap md:pl-[34%]">
              {/* Deep-teal gradient text, bottom to top (light teal → #216974). */}
              <span className="bg-linear-to-t from-[#6fb0b9] to-[#216974] bg-clip-text pr-[0.06em] text-transparent">
                events
              </span>{" "}
              &amp; {/* Brand-teal gradient text, bottom to top (light aqua → #05b8a0). */}
              <span className="bg-linear-to-t from-[#7fdccd] to-[#05b8a0] bg-clip-text pr-[0.06em] text-transparent">
                studios
              </span>
            </span>
          </h2>
        </Reveal>

        {/* Two columns under the indented headline line: lead on the left, detail on the right. */}
        <Reveal delay={100} className="mt-10 grid gap-4 md:ml-[34%] md:grid-cols-2 md:gap-10">
          <p className="text-lg font-semibold md:text-xl">Brands × Events × Sripada Studios.</p>
          <p className="text-brand-night/65 leading-relaxed">
            A structured breakdown of how <br /> Sripada Studios drives value across all three nodes.
          </p>
        </Reveal>

        {/* Three tilted cards, staggered in height and slightly overlapping on desktop. */}
        <ol className="mt-14 grid gap-6 md:mt-20 md:grid-cols-3 md:gap-0">
          {valueNodes.map((node, i) => {
            const tone = cardTones[i % cardTones.length];
            return (
              <Reveal
                key={node.audience}
                as="li"
                effect="pop"
                // Left to right, one after another: 1, then 2, then 3.
                delay={i * 200}
                className={cn(tone.lift, "md:-mx-2")}
              >
                {/* Tilt lives on an inner element so it doesn't fight Reveal's own transform. */}
                <div
                  className={cn(
                    "flex h-full flex-col rounded-[1.75rem] p-7 shadow-[0_24px_50px_-28px_rgb(11_11_15/0.45)] transition-transform duration-500 ease-(--ease-premium) hover:rotate-0 md:p-8",
                    tone.card,
                    tone.tilt,
                  )}
                >
                  <p className="text-xs font-semibold tracking-[0.22em] opacity-70">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-[clamp(1.5rem,2.2vw,2rem)] leading-tight font-semibold tracking-[-0.035em]">
                    {node.audience}
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {node.benefits.map(([title, detail]) => (
                      <li key={title}>
                        <h4 className="font-semibold">{title}</h4>
                        <p className={cn("mt-1 text-sm leading-relaxed", tone.detail)}>{detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
