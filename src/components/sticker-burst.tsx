/** Small starburst with a white die-cut edge, stuck on a corner like a sticker. */
export function StickerBurst({ color, className }: { color: string; className?: string }) {
  const points = Array.from({ length: 20 }, (_, i) => {
    const r = i % 2 === 0 ? 48 : 30;
    const a = (Math.PI * 2 * i) / 20 - Math.PI / 2;
    return `${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className}>
      <polygon
        points={points}
        fill={color}
        stroke="#fff"
        strokeWidth="4"
        strokeLinejoin="round"
        className="origin-center rotate-12"
      />
    </svg>
  );
}
