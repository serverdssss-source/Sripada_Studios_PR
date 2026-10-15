import { clientCategories, clients } from "@/content/site";

export function ClientMarquee() {
  // Rendered twice so the -50% translate loops seamlessly.
  const row = [...clients, ...clients];

  return (
    <section aria-label="Brands we've worked with" className="border-ink-line border-y py-8">
      <p className="text-paper/40 mb-6 px-4 text-center text-xs tracking-[0.25em] uppercase">
        Trusted by brands across {clientCategories.join(" · ")}
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        {/* TODO: replace names with client logo SVGs */}
        <ul className="animate-marquee flex w-max gap-16 hover:[animation-play-state:paused]">
          {row.map((c, i) => (
            <li
              key={`${c}-${i}`}
              aria-hidden={i >= clients.length}
              className="text-paper/45 hover:text-paper text-2xl font-semibold tracking-tight whitespace-nowrap transition-colors"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
