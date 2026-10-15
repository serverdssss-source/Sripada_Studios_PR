"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500",
          scrolled || open
            ? "border-ink-line bg-teal-deep/80 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto box-content flex h-18 max-w-7xl items-center justify-between px-4 sm:px-8">
          <a href="#top" className="flex items-baseline gap-2 text-lg font-semibold tracking-tight">
            Sripada
            <span className="font-serif font-normal italic opacity-70">Studios</span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-paper/65 hover:text-paper text-sm transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="bg-paper text-ink hidden rounded-full px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white sm:inline-block"
            >
              Start a Project
            </a>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-6">
                <span
                  className={cn(
                    "absolute left-0 h-px w-6 bg-current transition-transform",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-6 bg-current transition-transform",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="border-ink-line h-[calc(100svh-4.5rem)] border-t px-4 pt-6 pb-10 lg:hidden"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-ink-line block border-b py-4 text-4xl font-medium tracking-tight"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="bg-paper text-ink mt-8 block rounded-full py-4 text-center font-medium"
            >
              Start a Project
            </a>
            <p className="text-paper/50 mt-6 text-center text-sm">{site.contact.email}</p>
          </nav>
        )}
      </header>

      {/* Persistent mobile CTA once the hero is out of view. */}
      <a
        href="#contact"
        className={cn(
          "bg-paper text-ink fixed inset-x-4 bottom-4 z-40 rounded-full py-4 text-center text-sm font-semibold shadow-2xl shadow-black/50 transition-all duration-500 sm:hidden",
          pastHero && !open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-24 opacity-0",
        )}
      >
        Start a Project →
      </a>
    </>
  );
}
