import Image from "next/image";

import { clientCategories, clients } from "@/content/site";

export function ClientMarquee() {
  // Rendered twice so the -50% translate loops seamlessly.
  const row = [...clients, ...clients];

  return (
    <section
      aria-label="Brands we've worked with"
      className="bg-cream text-ink border-ink/10 border-b py-10"
    >
      <p className="text-ink/50 mb-8 px-4 text-center text-xs tracking-[0.25em] uppercase">
        Trusted by brands across {clientCategories.join(" · ")}
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        {/* Duration scales with the logo count so the speed stays the same as logos are added. */}
        <ul
          className="animate-marquee flex w-max items-center [--logo-scale:0.8] hover:[animation-play-state:paused] sm:[--logo-scale:1]"
          style={{ animationDuration: `${clients.length * 1.9}s` }}
        >
          {row.map((c, i) => (
            // Spacing as padding (not gap) so both halves are equal width and the -50% loop is seamless.
            <li
              key={`${c.name}-${i}`}
              aria-hidden={i >= clients.length}
              className="flex h-20 shrink-0 items-center pr-12 sm:pr-16"
            >
              <Image
                src={c.logo}
                alt={i >= clients.length ? "" : c.name}
                width={c.width}
                height={c.height}
                unoptimized
                style={{
                  width: `calc(${c.width}px * var(--logo-scale))`,
                  height: `calc(${c.height}px * var(--logo-scale))`,
                }}
                className="opacity-90 transition-opacity duration-300 hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
