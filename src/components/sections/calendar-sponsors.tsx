import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

// Tilted sticker tags over the big words (desktop): what a sponsor's brand rides on.
const stickers = [
  {
    label: "Wall Calendar",
    position: "top-[-6%] left-[38%]",
    tilt: "-rotate-6",
    tone: "bg-brand-lime text-brand-night",
  },
  {
    label: "Desk Calendar",
    position: "top-[40%] left-[2%]",
    tilt: "rotate-[-12deg]",
    tone: "bg-[#8b5cf6] text-white",
  },
  {
    label: "Sticker Packs",
    position: "top-[10%] right-[0%]",
    tilt: "rotate-12",
    tone: "bg-[#f5a623] text-brand-night",
  },
  {
    label: "Bookmarks",
    position: "top-[60%] left-[40%]",
    tilt: "rotate-3",
    tone: "bg-[#f5f5f3] text-brand-night",
  },
];

// "MEME" as die-cut sticker letters, each stuck on at its own angle.
const memeLetters = [
  { letter: "M", tilt: "-rotate-6" },
  { letter: "E", tilt: "rotate-3" },
  { letter: "M", tilt: "-rotate-2" },
  { letter: "E", tilt: "rotate-6" },
  { letter: "C", tilt: "-rotate-3" },
  { letter: "A", tilt: "rotate-2" },
  { letter: "L", tilt: "-rotate-6" },
  { letter: "E", tilt: "rotate-3" },
  { letter: "N", tilt: "rotate-2" },
  { letter: "D", tilt: "rotate-6" },
  { letter: "A", tilt: "rotate-3" },
  { letter: "R", tilt: "rotate-2" },

];

const badgeText = "Kannada Meme Calendar • 2026 • 3rd Edition • ";

export function CalendarSponsors() {
  return (
    <section
      id="calendar"
      aria-label="Kannada Meme Calendar Sponsorship"
      className="bg-brand-teal-light relative z-10 overflow-hidden px-4 pt-14 pb-20 text-[#f5f5f3] sm:px-8 md:pt-18 md:pb-24 lg:pt-20 lg:pb-28"
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Top row: intro on the left, "MEME" stickers on the right. */}
        <div className="flex items-start justify-between gap-6">
          <Reveal className="mt-1.5 max-w-[16rem]">
            <p className="text-brand-night text-xs font-bold tracking-[0.18em] uppercase">
              Innomme · 2026
            </p>
            <p className="mt-2 text-sm leading-snug font-semibold">
              The first-of-its-kind Kannada Meme Calendar by Sripada Studios — now in its 3rd
              edition.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="sr-only">Calendar Sponsorship</h2>
            <p
              aria-hidden
              className="sticker-text font-meme flex justify-end gap-[0.06em] pt-[0.1em] text-[length:min(7vw,4rem)] leading-[0.9] text-[#f5a623] uppercase"
            >
              {memeLetters.map(({ letter, tilt }, i) => (
                <span key={i} className={cn("inline-block", tilt)}>
                  {letter}
                </span>
              ))}
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid items-center gap-10 lg:mt-10 lg:grid-cols-[1.18fr_0.82fr] lg:gap-10">
          {/* The two giant words, with the sticker tags scattered over them. */}
          <div aria-hidden className="relative">
            <Reveal delay={150}>
              <p className="text-[length:min(calc((100vw-2rem)/7.2),6.85rem)] leading-[0.85] font-bold tracking-[-0.065em] uppercase sm:text-[length:min(calc((100vw-4rem)/7.2),6.85rem)] lg:text-[length:min(calc((100vw-4rem)*0.53/7.2),6.85rem)]">
                Calendar
              </p>
            </Reveal>
            <Reveal delay={250}>
              <p className="text-[length:min(calc((100vw-2rem)/7.2),6.85rem)] leading-[0.85] font-bold tracking-[-0.065em] uppercase sm:text-[length:min(calc((100vw-4rem)/7.2),6.85rem)] lg:text-[length:min(calc((100vw-4rem)*0.53/7.2),6.85rem)]">
                Sponsorship
              </p>
            </Reveal>

            {stickers.map((s, i) => (
              <Reveal
                key={s.label}
                effect="pop"
                delay={400 + i * 150}
                className={cn("absolute hidden md:block", s.position)}
              >
                <span
                  className={cn(
                    "block rounded-full px-3.5 py-1.5 text-xs font-bold tracking-[0.11em] whitespace-nowrap uppercase shadow-[0_9px_20px_-10px_rgb(0_0_0/0.5)] lg:text-[0.8rem]",
                    s.tone,
                    s.tilt,
                  )}
                >
                  {s.label}
                </span>
              </Reveal>
            ))}

            <Image
              src="/elements/golden-shiny-starburst.png"
              alt=""
              aria-hidden
              width={300}
              height={300}
              className="star-float pointer-events-none absolute top-[-20%] right-[8%] hidden w-12 md:block lg:w-16"
            />

            {/* Phones: the stickers sit in a row under the words instead of over them. */}
            <ul className="mt-6 flex flex-wrap gap-2 md:hidden">
              {stickers.map((s) => (
                <li
                  key={s.label}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.11em] uppercase",
                    s.tone,
                  )}
                >
                  {s.label}
                </li>
              ))}
            </ul>

            <Reveal delay={300}>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-[#f5f5f3] sm:text-base md:mt-8">
                Put your brand on every page — wall and desk calendars, meme sticker packs and
                bookmarks that live on Kannadiga desks and walls for all twelve months of 2026.
              </p>
            </Reveal>
          </div>

          {/* Calendar card: tilted, with the spinning badge on its corner and samasye popping in
              on the other corner. */}
          <Reveal
            effect="pop"
            delay={200}
            className="relative mx-auto mt-10 w-full max-w-[320px] sm:max-w-[360px] lg:mt-0 lg:max-w-[390px]"
          >
            {/* samasye stuck on the card's top-right corner, in front of it. */}
            <Image
              src="/calendar/stickers/samasye.png"
              alt=""
              aria-hidden
              width={1080}
              height={1350}
              className="peep-pop pointer-events-none absolute -top-14 -right-4 z-20 w-32 drop-shadow-[0_12px_18px_rgb(0_0_0/0.4)] sm:-top-16 sm:-right-8 sm:w-38 lg:-top-18 lg:-right-10 lg:w-44"
            />

            <div className="relative z-10 rotate-2 overflow-hidden rounded-[1.35rem] border-[3.5px] border-[#f5f5f3] shadow-[0_26px_52px_-22px_rgb(0_0_0/0.7)] md:rounded-[1.75rem]">
              <Image
                src="/calendar/2026_calender%20(1).png"
                alt="Sripada Studios Innomme Kannada Meme Calendar 2026 — wall calendar, desk calendar, sticker pack and bookmark"
                width={1080}
                height={1350}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 24rem, 85vw"
                className="h-auto w-full"
              />
            </div>

            <div className="absolute -top-8 -left-7 z-30 hidden md:block">
              <div className="text-brand-night relative grid h-24 w-24 place-items-center rounded-full bg-[#f5a623] shadow-[0_18px_36px_-18px_rgb(0_0_0/0.6)] lg:h-28 lg:w-28">
                <svg
                  aria-hidden
                  viewBox="0 0 200 200"
                  className="badge-spin absolute inset-0 h-full w-full"
                >
                  <defs>
                    <path
                      id="calendar-badge-circle"
                      d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"
                    />
                  </defs>
                  <text className="fill-brand-night text-[14px] font-semibold tracking-[0.16em] uppercase">
                    {/* Stretch the text to wrap the full circle (2π × 76 ≈ 477). */}
                    <textPath href="#calendar-badge-circle" textLength={475} lengthAdjust="spacing">
                      {badgeText}
                    </textPath>
                  </text>
                </svg>
                <span className="text-xl font-bold tracking-[-0.04em] lg:text-2xl">2026</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* yeno peeping in from the bottom-right corner of the screen. */}
      <Reveal
        effect="none"
        delay={300}
        className="pointer-events-none absolute right-0 bottom-0 z-20"
      >
        <Image
          src="/calendar/stickers/yeno.png"
          alt=""
          aria-hidden
          width={1080}
          height={1350}
          className="peep-corner w-36 drop-shadow-[0_12px_18px_rgb(0_0_0/0.38)] sm:w-48 lg:w-56"
        />
      </Reveal>
    </section>
  );
}
