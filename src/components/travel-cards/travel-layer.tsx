"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { CardFace, collagePoses, fanPose, travelCards } from "./cards";

type Pose = { x: number; y: number; w: number; r: number };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const collageZ = collagePoses.map((p) => p.z);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Scroll-linked layer that moves the hero fan cards into the About collage.
 *
 * Hero and About render invisible "slot" placeholders (`data-slot="fan-i"` /
 * `"collage-i"`); this layer measures them and draws the real cards on top,
 * interpolating each card from its fan pose to its collage pose as the page
 * scrolls. It must sit inside the same positioned wrapper as both sections.
 * With reduced motion the layer stays off and the static slots show instead.
 */
export function TravelLayer() {
  const layerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // React-owned so a re-render (e.g. Fast Refresh) can't wipe it, unlike a DOM class.
  const [live, setLive] = useState(false);

  useEffect(() => {
    const layer = layerRef.current;
    const wrap = layer?.parentElement;
    if (!layer || !wrap) return;
    // Reduced motion: CSS hides this layer and shows the static slots instead.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let from: Pose[] = [];
    let to: Pose[] = [];
    let start = 0;
    let end = 1;
    let frame = 0;

    const measure = () => {
      const wr = wrap.getBoundingClientRect();
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const pose = (el: Element | null): Pose => {
        const r = el!.getBoundingClientRect();
        const d = (el as HTMLElement).dataset;
        return {
          x: r.left - wr.left + r.width / 2,
          y: r.top - wr.top + r.height / 2 + parseFloat(d.yrem ?? "0") * rem,
          w: r.width,
          r: parseFloat(d.r ?? "0"),
        };
      };
      from = travelCards.map((_, i) => pose(wrap.querySelector(`[data-slot="fan-${i}"]`)));
      to = travelCards.map((_, i) => pose(wrap.querySelector(`[data-slot="collage-${i}"]`)));

      // Finish when the collage is centred in the viewport.
      const collage = wrap.querySelector("[data-collage]")!.getBoundingClientRect();
      const collageCentre = collage.top + window.scrollY + collage.height / 2;
      start = 0;
      end = Math.max(1, collageCentre - window.innerHeight / 2);

      cardRefs.current.forEach((el, i) => {
        if (el) el.style.width = `${from[i].w}px`;
      });
    };

    const update = () => {
      frame = 0;
      const p = clamp01((window.scrollY - start) / (end - start));
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        // Stagger left → right: the leftmost card lands first, the rightmost last.
        const delay = 0.04 + i * 0.06;
        const t = easeInOut(clamp01((p - delay) / 0.58));
        const a = from[i];
        const b = to[i];
        const x = lerp(a.x, b.x, t);
        const y = lerp(a.y, b.y, t);
        const s = lerp(a.w, b.w, t) / a.w;
        const r = lerp(a.r, b.r, t);
        el.style.transform = `translate(${x - a.w / 2}px, ${y - a.w / 2}px) rotate(${r}deg) scale(${s})`;
        el.style.zIndex = String(t > 0.5 ? 20 + (collageZ[i] ?? 0) : 10 + fanPose(i).z);
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const remeasure = () => {
      measure();
      update();
    };

    remeasure();
    // Reveal on the next frame, once every card has its measured transform.
    const reveal = requestAnimationFrame(() => setLive(true));

    const ro = new ResizeObserver(remeasure);
    ro.observe(wrap);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(reveal);
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden
      className={cn("travel-layer pointer-events-none absolute inset-0 z-30", !live && "invisible")}
    >
      {travelCards.map((c, i) => {
        const { off } = fanPose(i);
        return (
          <div
            key={c.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute top-0 left-0 will-change-transform"
          >
            <div
              className="fan-deal"
              style={{ "--off": off, "--d": `${300 + Math.abs(off) * 110}ms` } as CSSProperties}
            >
              <CardFace
                image={c.image}
                title=""
                sizes="(min-width: 768px) 20vw, 40vw"
                priority={Math.abs(off) <= 1}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
