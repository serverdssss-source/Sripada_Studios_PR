/**
 * A round, die-cut "sticker" for a metric, drawn in SVG so the text stays editable: white rim,
 * coloured face with a thin inner ring, the label curving along the top edge, the value in the
 * middle, a small asterisk, a soft shine, and optionally a peeled-up corner (bottom-right or
 * top-right) or a starburst stuck on its edge. Geometry is in a 200×200 box; the sticker circle
 * has radius 98.
 */

export type StickerTone = {
  face: string;
  ink: string;
  ring: string;
  accent: string;
};

// Peel: the bottom-right segment beyond the chord x + y = 310.3 is lifted and folded back over.
// The chord meets the rim at A (197.1, 113.2) and B (113.2, 197.1); the folded flap is that
// segment mirrored across the chord (an arc of the same radius centred at (210.3, 210.3)).
// Kept small enough that the curl clears the value in the middle.
// The top-right peel is the same shape mirrored top-to-bottom (y → 200 − y).
const PEELS = {
  "bottom-right": {
    clip: "M0 0 H200 V110.3 L110.3 200 H0 Z",
    flap: "M197.1 113.2 A98 98 0 0 0 113.2 197.1 Z",
    // Flap shading runs from the lifted tip (white) to the fold (grey), shadow cast inwards.
    shade: { x1: 1, y1: 1, x2: 0.35, y2: 0.35 },
    shadowDy: -4,
  },
  "top-right": {
    clip: "M0 0 H110.3 L200 89.7 V200 H0 Z",
    flap: "M197.1 86.8 A98 98 0 0 1 113.2 2.9 Z",
    shade: { x1: 1, y1: 0, x2: 0.35, y2: 0.65 },
    shadowDy: 4,
  },
} as const;

export type PeelCorner = keyof typeof PEELS;

// Eight-point burst for the little stuck-on star.
const BURST = Array.from({ length: 16 }, (_, i) => {
  const r = i % 2 === 0 ? 24 : 13;
  const a = (Math.PI * 2 * i) / 16 - Math.PI / 2;
  return `${(172 + r * Math.cos(a)).toFixed(1)},${(30 + r * Math.sin(a)).toFixed(1)}`;
}).join(" ");

// One size for every label and every value, so the stickers read as a set. Sized so the longest
// label ("Target Brand Impressions") and widest value ("2,000+") still fit.
export function MetricSticker({
  id,
  value,
  label,
  tone,
  peel,
  burst = false,
}: {
  id: string;
  value: string;
  label: string;
  tone: StickerTone;
  peel?: PeelCorner;
  burst?: boolean;
}) {
  const curl = peel ? PEELS[peel] : undefined;
  // A top-right curl would cover the end of a label along the top, so the label moves to the
  // bottom edge and the asterisk goes above the value instead.
  const labelAtBottom = peel === "top-right";

  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      className="h-full w-full overflow-visible drop-shadow-[0_14px_18px_rgb(11_11_15/0.28)]"
    >
      <defs>
        <clipPath id={`${id}-peel`}>
          <path d={curl?.clip} />
        </clipPath>
        <radialGradient id={`${id}-shine`} cx="30%" cy="22%" r="75%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.38" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.08" />
        </radialGradient>
        <linearGradient id={`${id}-flap`} {...curl?.shade}>
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#e9ecec" />
          <stop offset="100%" stopColor="#c9d0d0" />
        </linearGradient>
        <filter id={`${id}-flap-shadow`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="-4"
            dy={curl?.shadowDy ?? -4}
            stdDeviation="4"
            floodColor="#0b0b0f"
            floodOpacity="0.3"
          />
        </filter>
        {/* Label runs left to right just inside the ring: over the top, or along the bottom
            (a larger radius there, since the letters then stand inwards from the path). */}
        <path
          id={`${id}-arc`}
          d={labelAtBottom ? "M26 100 A74 74 0 0 0 174 100" : "M34 100 A66 66 0 0 1 166 100"}
        />
      </defs>

      <g clipPath={curl ? `url(#${id}-peel)` : undefined}>
        <circle cx="100" cy="100" r="98" fill="#fff" />
        <circle cx="100" cy="100" r="90" fill={tone.face} />
        <circle cx="100" cy="100" r="83" fill="none" stroke={tone.ring} strokeWidth="2.5" />
        <circle cx="100" cy="100" r="90" fill={`url(#${id}-shine)`} />

        <text
          fill={tone.ink}
          fontSize={10.5}
          fontWeight={700}
          letterSpacing={1}
          className="uppercase"
        >
          <textPath href={`#${id}-arc`} startOffset="50%" textAnchor="middle">
            {label}
          </textPath>
        </text>
        <text
          x="100"
          y={labelAtBottom ? 118 : 121}
          fill={tone.ink}
          fontSize={36}
          fontWeight={700}
          letterSpacing={-2}
          textAnchor="middle"
        >
          {value}
        </text>
        {/* Small six-point asterisk under the value (above it when the label is at the bottom). */}
        <g
          transform={labelAtBottom ? "translate(100 50)" : "translate(100 154)"}
          stroke={tone.accent}
          strokeWidth="4"
          strokeLinecap="round"
        >
          <line x1="0" y1="-9" x2="0" y2="9" />
          <line x1="-7.8" y1="-4.5" x2="7.8" y2="4.5" />
          <line x1="-7.8" y1="4.5" x2="7.8" y2="-4.5" />
        </g>
      </g>

      {curl && <path d={curl.flap} fill={`url(#${id}-flap)`} filter={`url(#${id}-flap-shadow)`} />}

      {burst && (
        <polygon
          points={BURST}
          fill={tone.accent}
          stroke="#fff"
          strokeWidth="4"
          strokeLinejoin="round"
          transform="rotate(12 172 30)"
        />
      )}
    </svg>
  );
}
