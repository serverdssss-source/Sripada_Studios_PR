import { Accent, Section } from "@/components/ui";
import { Reveal } from "@/components/reveal";

const integrations = [
  {
    title: "Digital & Content Integration",
    items: [
      "Intro & Extro video cards on event media assets.",
      "Co-branded social media posts and influencer collaborations.",
      "Description link placements and direct call-to-action campaigns.",
    ],
  },
  {
    title: "On-Ground & Event Integration",
    items: [
      "Logo placement on event posters, banners, and standees.",
      "Red carpet background logo inclusion.",
      "Custom stall activations and product sampling zones.",
    ],
  },
  {
    title: "VIP & VIP Hospitality Integration",
    items: [
      "Co-presentation of major award categories.",
      "Exclusive product gift hamper placement for celebrity guests.",
      "VIP dinner branding and networking access.",
    ],
  },
];

export function BrandIntegrations() {
  return (
    <Section id="brand-integrations" tone="cream" className="py-20! md:py-28!">
      <Reveal className="max-w-5xl">
        <p className="text-teal mb-6 text-xs font-medium tracking-[0.25em] uppercase">
          For Prospective Sponsors
        </p>
        <h2 className="text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.05em]">
          How Brands Can <Accent>Integrate</Accent>
        </h2>
      </Reveal>

      <ol className="border-ink/15 mt-14 border-t">
        {integrations.map((group, i) => (
          <Reveal
            key={group.title}
            as="li"
            delay={i * 80}
            className="border-ink/15 grid gap-6 border-b py-8 md:grid-cols-[1fr_1.2fr] md:gap-14 md:py-10"
          >
            <div>
              <p className="text-teal text-xs font-medium tracking-[0.22em] uppercase">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-2xl leading-tight font-medium tracking-[-0.03em] md:text-3xl">
                {group.title}
              </h3>
            </div>
            <ul className="text-muted space-y-3 text-base leading-relaxed md:text-lg">
              {group.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="text-teal">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
