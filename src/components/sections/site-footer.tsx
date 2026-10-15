import { nav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="bg-ink/30 border-ink-line border-t px-4 pt-16 pb-28 sm:px-8 sm:pb-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-[clamp(3.5rem,14vw,13rem)] leading-[0.85] font-semibold tracking-[-0.06em]">
          Sripada<span className="text-brand">.</span>
        </p>
        <div className="text-paper/55 mt-12 flex flex-col gap-8 text-sm md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-paper">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-paper">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
          <p>
            © {site.name}, {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
