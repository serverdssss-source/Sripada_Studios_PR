import { stats, statsTagline } from "@/content/site";
import { Accent, Section } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CardFace, collagePoses, travelCards } from "@/components/travel-cards/cards";

export function About() {
  return (
    <Section id="about" tone="cream" className="py-16! md:py-20!">
      <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
        {/* Left: heading with the collage directly beneath it */}
        <div>
          <Reveal>
            <p className="mb-6 text-xs font-medium tracking-[0.25em] uppercase opacity-60">
              About Sripada Studios
            </p>
            <h2 className="text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.95] font-medium tracking-[-0.04em] text-balance">
              More Than a Digital <Accent>Agency.</Accent>
            </h2>
          </Reveal>

          {/* Collage: hero fan cards land here as you scroll (see <TravelLayer>). */}
          <div data-collage className="relative mt-10 aspect-[10/11] w-full">
            {collagePoses.map((pose, i) => (
              <div
                key={i}
                data-slot={`collage-${i}`}
                data-r={pose.r}
                className="absolute"
                style={{
                  left: `${pose.left}%`,
                  top: `${pose.top}%`,
                  width: `${pose.w}%`,
                  zIndex: pose.z,
                }}
              >
                <div className="slot-static" style={{ transform: `rotate(${pose.r}deg)` }}>
                  <CardFace
                    image={travelCards[i].image}
                    title={travelCards[i].title}
                    sizes="(min-width: 768px) 20vw, 40vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: story, then key numbers */}
        <div className="md:pt-10">
          <Reveal delay={120} className="text-muted space-y-6 text-lg leading-relaxed">
            <p>
              Sripada Studios is a full-service digital marketing and creative studio built around
              one idea:
            </p>
            <p className="text-ink font-serif text-[clamp(1.75rem,3vw,2.5rem)] leading-tight italic">
              Turn ideas into brands people remember.
            </p>
            <p>
              From strategy and social media to performance marketing, content production and
              digital growth, Sripada Studios works with businesses across Cinema, Healthcare,
              Education, Entertainment, Consumer Brands, B2B and D2C.
            </p>
          </Reveal>

          <Reveal delay={150} className="mt-12">
            <p className="text-muted mb-6 text-xs font-medium tracking-[0.25em] uppercase">
              Key Numbers
            </p>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-8">
              {stats.map((s) => (
                <div key={s.label} className="border-ink/15 border-t pt-5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-[clamp(2.25rem,4.5vw,3.75rem)] leading-none font-medium tracking-[-0.04em]">
                    {s.value.replace("+", "")}
                    {s.value.includes("+") && <span className="text-teal">+</span>}
                  </dd>
                  <p aria-hidden className="text-muted mt-3 text-sm">
                    {s.label}
                  </p>
                </div>
              ))}
            </dl>
            <p className="bg-ink text-paper mt-8 rounded-2xl px-6 py-5 text-lg font-medium tracking-tight">
              {statsTagline}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
