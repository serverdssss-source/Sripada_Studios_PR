import Image from "next/image";
import { reasons, site, teams } from "@/content/site";
import { Accent, Section, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export function TeamWhy() {
  return (
    <Section id="team" tone="cream">
      <SectionHeading
        eyebrow="Team & Ecosystem"
        title={
          <>
            Built by people. <Accent>Powered by ideas.</Accent>
          </>
        }
      />

      {/* Dark backdrop shows through the photo's transparent background */}
      <Reveal className="bg-ink relative aspect-[16/9] overflow-hidden rounded-2xl">
        <Image
          src={site.teamImage}
          alt="The Sripada Studios team"
          fill
          sizes="(min-width: 1280px) 80rem, 100vw"
          className="object-cover"
        />
        <div className="from-ink/80 absolute inset-0 bg-linear-to-t to-transparent" />
        <ul className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2 md:inset-x-8 md:bottom-8">
          {teams.map((t) => (
            <li
              key={t}
              className="bg-ink/60 rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white backdrop-blur md:text-sm"
            >
              {t}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-24 grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="text-teal mb-6 flex items-center gap-3 text-xs font-medium tracking-[0.25em] uppercase">
            Why Sripada Studios
          </p>
          <h3 className="text-ink text-[clamp(2rem,4vw,3.5rem)] leading-none font-medium tracking-[-0.04em]">
            One team. <Accent>Multiple capabilities.</Accent>
          </h3>
        </Reveal>
        <ul className="bg-ink/10 border-ink/10 grid gap-px overflow-hidden rounded-2xl border shadow-sm sm:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal
              key={r}
              as="li"
              delay={i * 60}
              className="text-ink flex items-center gap-4 bg-white p-6 text-lg font-medium tracking-tight"
            >
              <span className="bg-teal/10 text-teal grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold">
                ✓
              </span>
              {r}
            </Reveal>
          ))}
          <li className="bg-ink text-paper hover:bg-teal transition-colors">
            <a
              href="#contact"
              className="flex h-full items-center justify-between gap-4 p-6 text-lg font-semibold tracking-tight"
            >
              Start a project <span aria-hidden>→</span>
            </a>
          </li>
        </ul>
      </div>
    </Section>
  );
}
