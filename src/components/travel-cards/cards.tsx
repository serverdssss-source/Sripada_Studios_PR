import Image from "next/image";
import { cn } from "@/lib/cn";

// Client creatives that start as the hero fan and land as the About collage.
// Left → right across the fan; index i in the fan travels to collage slot i.
export const travelCards = [
  { title: "Aryamba IVF", image: "/media/creatives/aryamba-ivf-creatives.webp" },
  { title: "HearFon", image: "/media/creatives/hf.webp" },
  { title: "Fitness Factory", image: "/media/creatives/ff.webp" },
  { title: "Little Kidz", image: "/media/creatives/lk.webp" },
  { title: "Aanya Hospitals", image: "/media/creatives/aanya.webp" },
  { title: "Samrat Restaurant", image: "/media/creatives/samrat.webp" },
  { title: "Svatantra", image: "/media/creatives/svatantra.webp" },
  { title: "WMN Doctors", image: "/media/creatives/wmn.webp" },
];

/** Card height ÷ width (creatives are 4:5 portrait). */
export const cardRatio = 5 / 4;

export const fanMid = (travelCards.length - 1) / 2;

/** Fan pose for card i: arc drop (rem), tilt (deg), stacking. */
export function fanPose(i: number) {
  const off = i - fanMid;
  return { off, yRem: off * off * 0.45, r: off * 4, z: 10 - Math.ceil(Math.abs(off)) };
}

/**
 * Landing pose for card i in the About section, as % of the box width (left)
 * and height (top). Cards step diagonally from top-left to bottom-right, each
 * overlapping the one before it; the last card ends flush with the bottom-right
 * of the 10:11 box.
 */
const collageW = 30;
const collageH = (collageW * cardRatio * 10) / 11;
const collageSteps = travelCards.length - 1;
export const collagePoses = travelCards.map((_, i) => ({
  left: (i * (100 - collageW)) / collageSteps,
  top: (i * (100 - collageH)) / collageSteps,
  w: collageW,
  r: 0,
  z: i + 1,
}));

export function CardFace({
  image,
  title,
  sizes,
  priority,
  className,
}: {
  image: string;
  title: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "ring-paper/15 bg-ink-soft relative aspect-[4/5] overflow-hidden rounded-xl shadow-[0_24px_50px_-16px_rgb(0_0_0/0.6)] ring-1 sm:rounded-2xl",
        className,
      )}
    >
      <Image
        src={image}
        alt={title}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
