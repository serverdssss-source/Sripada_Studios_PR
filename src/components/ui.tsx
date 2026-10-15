import type { ComponentProps, ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

export { cn };

type SectionProps = {
  id?: string;
  tone?: "ink" | "soft" | "paper" | "cream";
  className?: string;
  children: ReactNode;
};

export function Section({ id, tone = "ink", className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative px-4 py-24 sm:px-8 md:py-36",
        tone === "ink" && "text-paper",
        tone === "soft" && "text-paper",
        tone === "paper" && "bg-paper text-ink",
        tone === "cream" && "bg-cream text-ink",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

type HeadingProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
  wide?: boolean;
  /** Overrides the default display size of the title. */
  titleClassName?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  aside,
  wide,
  titleClassName,
  className,
}: HeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={wide ? "max-w-6xl" : "max-w-3xl"}>
        <p className="mb-6 flex items-center gap-3 text-xs font-medium tracking-[0.25em] uppercase opacity-60">
          {eyebrow}
        </p>
        <h2
          className={cn(
            "text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.04em] text-balance",
            titleClassName,
          )}
        >
          {title}
        </h2>
        {intro && <div className="mt-6 max-w-xl text-lg leading-relaxed opacity-65">{intro}</div>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </Reveal>
  );
}

/** Serif italic accent used inside headings. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-serif font-normal tracking-[-0.02em] italic">{children}</em>;
}

type ButtonLinkProps = ComponentProps<"a"> & { variant?: "solid" | "outline" | "light" };

export function ButtonLink({ variant = "solid", className, children, ...props }: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "group focus-visible:outline-brand inline-flex items-center gap-3 rounded-full py-2 pr-2 pl-6 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2",
        variant === "solid" && "bg-paper text-ink hover:bg-white",
        variant === "light" && "bg-paper text-ink hover:bg-white",
        variant === "outline" && "border border-current/25 hover:border-current",
        className,
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "grid h-9 w-9 place-items-center rounded-full transition-transform duration-500 ease-(--ease-premium) group-hover:rotate-[-45deg]",
          variant === "outline" ? "bg-current/10" : "bg-ink text-paper",
        )}
      >
        →
      </span>
    </a>
  );
}
