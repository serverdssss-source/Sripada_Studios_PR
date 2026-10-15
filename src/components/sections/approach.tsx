"use client";

import { useEffect, useRef } from "react";
import { approach } from "@/content/site";
import { Accent, Section } from "@/components/ui";
import { Reveal } from "@/components/reveal";

// Winding ribbon (viewBox 0 0 1440 420) with one loop, starting off-screen left.
const RIBBON =
  "M-160 300 C40 300 120 110 270 110 C420 110 420 330 560 320 C680 312 650 150 760 130 C860 112 900 210 840 250 C780 290 720 200 800 160 C900 110 980 330 1110 320 C1250 309 1290 120 1460 130";
// Scroll progress at which each step appears (roughly where the ribbon's head
// passes under it).
const STEP_AT = [0.14, 0.38, 0.62, 0.84];

/**
 * Four steps laid out horizontally over a thick winding ribbon. The ribbon is
 * scroll-linked: its head travels from off-screen left to the right edge as
 * you scroll through the section (and back when scrolling up); each step
 * fades up as the head passes it.
 */
export function Approach() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const steps = [...el.querySelectorAll<HTMLElement>("[data-step]")];
    const ribbon = el.querySelector<SVGPathElement>("[data-ribbon]");
    // Dash in real path units, so the drawn length is exact in every browser.
    const len = ribbon?.getTotalLength?.() ?? 0;
    if (ribbon) ribbon.style.strokeDasharray = `${len} ${len}`;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the flow's centre enters at the bottom, 1 when it reaches 35% from the top.
      const centre = r.top + r.height / 2;
      const p = reduce ? 1 : Math.min(1, Math.max(0, (vh - centre) / (vh * 0.65)));
      if (ribbon) ribbon.style.strokeDashoffset = String(len * (1 - p));
      steps.forEach((s, i) => {
        const on = p >= STEP_AT[i];
        s.style.opacity = on ? "1" : "0";
        s.style.transform = on ? "none" : "translateY(16px)";
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <Section id="approach" tone="cream" className="overflow-x-clip">
      <Reveal className="mx-auto mb-14 max-w-4xl text-center md:mb-20">
        <p className="mb-6 text-xs font-medium tracking-[0.25em] uppercase opacity-60">
          Our Approach
        </p>
        <h2 className="text-[clamp(1.75rem,5vw,4.5rem)] leading-[1] font-medium tracking-[-0.04em] text-balance">
          Strategy → Story → Distribution → <Accent>Growth</Accent>
        </h2>
      </Reveal>

      <div ref={ref} className="approach-flow relative">
        {/* Ribbon: a thick winding line from off-screen left to the right edge, behind the steps */}
        <svg
          aria-hidden
          viewBox="0 0 1440 420"
          preserveAspectRatio="none"
          className="pointer-events-none absolute top-1/2 left-[calc(50%-50vw)] hidden h-[clamp(16rem,29vw,28rem)] w-screen -translate-y-1/2 overflow-visible md:block"
        >
          <path
            data-ribbon
            d={RIBBON}
            fill="none"
            stroke="currentColor"
            strokeWidth="44"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-brand/30"
            // Hidden until JS sets the dash (no flash of the full ribbon).
            style={{ strokeDasharray: "0 99999" }}
          />
        </svg>

        <ol className="relative grid gap-12 md:grid-cols-4 md:gap-6">
          {approach.map((a, i) => (
            <li
              key={a.step}
              data-step
              className="relative text-center opacity-0 transition-[opacity,transform] duration-700 ease-(--ease-premium) motion-reduce:opacity-100"
            >
              <div>
                <p className="text-teal font-serif text-xl italic">
                  {String(i + 1).padStart(2, "0")}.
                </p>
                <h3 className="mt-2 text-[clamp(1.5rem,2.4vw,2.25rem)] leading-none font-medium tracking-[-0.03em] uppercase">
                  {a.step}
                </h3>
                <p className="text-muted mx-auto mt-3 max-w-60 text-base leading-relaxed">
                  {a.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <Reveal>
        <p className="mx-auto mt-20 max-w-4xl text-center text-[clamp(1.75rem,3.5vw,3rem)] leading-tight font-medium tracking-[-0.03em] text-balance md:mt-28">
          We don&apos;t just create content.{" "}
          <span className="text-teal">
            We create <Accent>reasons for people to care.</Accent>
          </span>
        </p>
      </Reveal>
    </Section>
  );
}
