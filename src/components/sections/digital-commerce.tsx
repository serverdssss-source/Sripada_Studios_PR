import { Accent, Section } from "@/components/ui";
import { Reveal } from "@/components/reveal";

const requirements = ["Products - 5", "RAZOR PAY - PAYMENT", "SEO & AEO"];

export function DigitalCommerce() {
  return (
    <Section id="e-commerce" className="py-16! md:py-20!">
      <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-medium tracking-[-0.045em]">
            E-commerce <Accent>Website</Accent>
          </h2>
        </div>
        <ul className="border-paper/15 w-full max-w-2xl space-y-2 border-t pt-5 text-base font-medium md:w-auto md:text-lg">
          {requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
