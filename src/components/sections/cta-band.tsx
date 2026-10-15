import { Accent, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export function CtaBand() {
  return (
    <section className="from-teal-deep via-teal to-brand text-paper bg-linear-to-br px-4 py-20 sm:px-8 md:py-24">
      <Reveal className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-3xl text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] font-medium tracking-[-0.04em] text-balance">
          Your brand could be <Accent>next.</Accent>
        </h2>
        <div className="flex flex-col gap-4 md:items-end">
          <p className="max-w-sm text-lg md:text-right">
            Tell us where you want to grow. We&apos;ll come back with a plan — not a pitch deck.
          </p>
          <ButtonLink href="#contact" variant="light">
            Book a Strategy Call
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
