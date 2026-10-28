import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { StickerBurst } from "@/components/sticker-burst";
import { PromoVideo } from "@/components/promo-video";

// The teams behind his personal brand (from the services on sripadastudios.com), as tilted
// colour blocks with one rounded end, stuck around the headline (stacked under it on phones). A black flower sticker sits
// on some corners.
const services: {
  title: string;
  tone: string;
  /** Tilt, and which end is rounded (alternating left/right). */
  shape: string;
  /** Desktop spot around the headline. */
  position: string;
  flower?: string;
}[] = [
  {
    title: "Strategy & Reputation",
    position: "top-[-2%] left-[10%]",
    tone: "bg-[#a78bfa] text-brand-night",
    shape: "-rotate-2 rounded-[0.5rem_2.75rem_2.75rem_0.5rem]",
    flower: "-top-5 -right-4",
  },
  {
    title: "Event Production",
    position: "top-[36%] right-[-3%]",
    tone: "bg-[#f5a623] text-brand-night",
    shape: "rotate-2 rounded-[2.75rem_0.5rem_0.5rem_2.75rem]",
  },
  {
    title: "YouTube & Social Publishing",
    position: "top-[103%] left-[3%]",
    tone: "bg-[#54c4b6] text-brand-night",
    shape: "rotate-1 rounded-[0.5rem_2.75rem_2.75rem_0.5rem]",
  },
  {
    title: "Video Editing",
    position: "top-[4%] right-[3%]",
    tone: "bg-brand-lime text-brand-night",
    shape: "-rotate-3 rounded-[2.75rem_0.5rem_0.5rem_2.75rem]",
    flower: "-bottom-5 -left-4",
  },
  {
    title: "Social Media Management",
    position: "top-[103%] left-[52%]",
    tone: "bg-[#216974] text-white",
    shape: "-rotate-1 rounded-[0.5rem_2.75rem_2.75rem_0.5rem]",
  },
  {
    title: "Graphic Design",
    position: "top-[33%] left-[-2%]",
    tone: "bg-[#8b5cf6] text-white",
    shape: "rotate-3 rounded-[2.75rem_0.5rem_0.5rem_2.75rem]",
    flower: "-top-5 -right-5",
  },
];

function ServiceBlock({ service }: { service: (typeof services)[number] }) {
  return (
    <>
      <span
        className={`block px-5 py-2.5 text-base leading-none font-bold tracking-[-0.03em] whitespace-nowrap shadow-[0_14px_24px_-16px_rgb(11_11_15/0.5)] lg:px-6 lg:py-3 lg:text-xl ${service.tone} ${service.shape}`}
      >
        {service.title}
      </span>
      {service.flower && (
        <Flower
          className={`badge-spin fill-brand-night absolute size-8 lg:size-10 ${service.flower}`}
        />
      )}
    </>
  );
}

// Eight-petal flower sticker.
function Flower({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className}>
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx="50" cy="26" rx="11" ry="24" transform={`rotate(${i * 45} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="14" />
    </svg>
  );
}

// Portfolio case study for Dr. Ramesh Aravind: "P⊂⊃rtfolio" wordmark (the first "o" drawn as a
// long outlined pill), then a soft violet panel with the two portraits bursting out of its top.
export function RameshPortfolio() {
  return (
    <section
      id="ramesh-aravind"
      aria-label="Portfolio case study: Dr. Ramesh Aravind"
      className="text-brand-night relative overflow-x-clip bg-[#f5f5f3] bg-[radial-gradient(rgb(11_11_15/0.12)_1px,transparent_1.5px)] [background-size:22px_22px] px-4 pt-16 pb-16 sm:px-8 md:pt-24 md:pb-24"
    >
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-4 inline-block -rotate-2 rounded-full border-[3px] border-white bg-[#8b5cf6] px-4 py-1.5 text-[0.65rem] font-bold tracking-[0.16em] text-white uppercase shadow-[0_8px_16px_-6px_rgb(11_11_15/0.3)] sm:text-xs">
            Portfolio Case Study
          </p>
          <h2 className="sr-only">Portfolio — Dr. Ramesh Aravind</h2>
          <p
            aria-hidden
            className="flex items-center text-[length:min(16vw,11rem)] leading-none font-bold tracking-[-0.05em]"
          >
            P
            <span className="mx-[0.03em] inline-block h-[0.56em] w-[1.9em] shrink-0 translate-y-[0.06em] rounded-full border-[0.11em] border-current" />
            rtfolio
          </p>
        </Reveal>

        {/* The panel: portraits stand on it and rise above its top edge. */}
        <div className="relative mt-20 h-[17rem] rounded-[1.75rem] border-[6px] border-white bg-[#e2dbff] shadow-[0_30px_60px_-30px_rgb(11_11_15/0.35)] sm:h-[26rem] md:mt-32 md:h-[clamp(26rem,38vw,32rem)] md:rounded-[2.25rem]">
          <Reveal
            effect="pop"
            delay={100}
            className="absolute bottom-[40%] left-[3%] z-10 w-[74%] sm:w-[60%] md:bottom-[22%] md:left-[4%] md:w-[54%]"
          >
            {/* Motivational reel: loops silently, plays with sound on click. Cropped to 2.2:1 so the
                video's own black letterbox bars stay out of the frame. */}
            <div className="relative aspect-[2.2/1] -rotate-3 overflow-hidden rounded-[1.25rem] border-[5px] border-white bg-black shadow-[0_24px_40px_-20px_rgb(11_11_15/0.55)] md:rounded-[1.75rem]">
              <PromoVideo
                preview={{
                  webm: "/media/ramesh/preview.webm",
                  mp4: "/media/ramesh/preview.mp4",
                }}
                // Only an MP4 of the full reel exists, so both slots point at it.
                full={{
                  webm: "/RA/RA%20motivational%20vid.mp4",
                  mp4: "/RA/RA%20motivational%20vid.mp4",
                }}
                poster="/media/ramesh/poster.jpg"
                label="Dr. Ramesh Aravind motivational reel"
              />
            </div>
          </Reveal>

          <Reveal
            effect="pop"
            delay={250}
            className="absolute right-[3%] bottom-[6%] z-20 w-[40%] sm:w-[34%] md:right-[9%] md:bottom-[14%] md:w-[28%]"
          >
            <div className="rotate-6 overflow-hidden rounded-[1.25rem] border-[5px] border-white shadow-[0_24px_40px_-20px_rgb(11_11_15/0.55)] md:rounded-[1.75rem]">
              <Image
                src="/RA/ra.png"
                alt="Portrait of Dr. Ramesh Aravind"
                width={1080}
                height={1350}
                sizes="(min-width: 768px) 28vw, 48vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>

          {/* Stickers between and around the portraits. */}
          <Reveal
            effect="pop"
            delay={450}
            className="absolute top-[-7%] left-[30%] z-30 hidden md:block"
          >
            <span className="block rotate-[-8deg] rounded-2xl border-[3px] border-white bg-[#f5f5f3] px-4 py-3 shadow-[0_12px_24px_-12px_rgb(11_11_15/0.5)]">
              <Image
                src="/media/entertainment-logos/hello-ramesh-speaking.png"
                alt="Hello Ramesh Speaking"
                width={116}
                height={47}
                className="h-auto w-28 lg:w-32"
              />
            </span>
          </Reveal>
          <Image
            src="/elements/cinema-clapperboard.png"
            alt=""
            aria-hidden
            width={240}
            height={240}
            className="pointer-events-none absolute bottom-[-6%] left-[40%] z-30 w-20 rotate-[-10deg] drop-shadow-[0_12px_16px_rgb(11_11_15/0.35)] md:left-[44%] md:w-28"
          />
          <Image
            src="/elements/golden-shiny-starburst.png"
            alt=""
            aria-hidden
            width={200}
            height={200}
            className="star-float pointer-events-none absolute top-[-14%] left-[4%] z-30 w-12 md:w-16"
          />
          <StickerBurst
            color="#54c4b6"
            className="absolute -top-7 -right-5 z-30 w-14 md:-top-9 md:-right-7 md:w-20"
          />
        </div>

        {/* Bottom row: name pill, then the year. */}
        <Reveal delay={200} className="mt-8 flex flex-wrap items-center justify-end gap-4 md:gap-6">
          <div className="rounded-full bg-white px-6 py-3 text-right shadow-[0_10px_30px_-16px_rgb(11_11_15/0.45)]">
            <p className="text-lg leading-tight font-bold tracking-[-0.02em] md:text-xl">
              Dr. Ramesh Aravind
            </p>
            <p className="text-brand-night/60 text-xs font-semibold md:text-sm">
              Actor · Director · Speaker
            </p>
          </div>
          <p className="text-[length:min(12vw,4.5rem)] leading-none font-bold tracking-[-0.05em]">
            2026
          </p>
        </Reveal>

        {/* What we handle: a poster-style stacked headline (serif lines with one bold, highlighted
            word), the teams as colour blocks, then the intro. */}
        <div className="mt-10 md:mt-14">
          <p className="text-center text-xs font-bold tracking-[0.18em] text-[#8b5cf6] uppercase">
            What we handle
          </p>
          <div className="relative mx-auto mt-6 max-w-5xl md:mt-10">
            <Reveal>
              <h3 className="text-center text-[length:min(11vw,8.5rem)] leading-[0.88] tracking-[-0.045em]">
                <span className="block font-serif font-semibold">personal</span>
                <span className="relative isolate block">
                  {/* Highlight bar behind the bold word, with a round handle like a text selection. */}
                  <span
                    aria-hidden
                    className="absolute inset-x-[4%] top-[12%] bottom-[2%] -z-10 bg-[#e2dbff]"
                  >
                    <span className="absolute -top-[0.12em] -left-[0.12em] size-[0.22em] rounded-full bg-[#8b5cf6]" />
                  </span>
                  <span className="font-bold tracking-[-0.06em]">branding</span>
                </span>
                <span className="block font-serif font-semibold">from production</span>
                <span className="block font-serif font-semibold">to every post.</span>
              </h3>
            </Reveal>

            {services.map((s, i) => (
              <Reveal
                key={s.title}
                effect="pop"
                delay={300 + i * 120}
                className={`absolute z-10 hidden md:block ${s.position}`}
              >
                <ServiceBlock service={s} />
              </Reveal>
            ))}

            {/* Stickers on the letters, like the poster's cut-outs. */}
            <Image
              src="/elements/golden-shiny-starburst.png"
              alt=""
              aria-hidden
              width={200}
              height={200}
              className="star-float pointer-events-none absolute top-[-2%] right-[27%] w-10 md:w-16"
            />
            <Image
              src="/elements/cinema-clapperboard.png"
              alt=""
              aria-hidden
              width={240}
              height={240}
              className="pointer-events-none absolute bottom-[-6%] left-[-1%] w-10 -rotate-12 drop-shadow-[0_10px_14px_rgb(11_11_15/0.35)] md:w-20"
            />
          </div>

          {/* Phones: the blocks stack under the headline instead of sitting around it. */}
          <ul className="mt-10 flex flex-wrap justify-center gap-x-3 gap-y-4 md:hidden">
            {services.map((s) => (
              <li key={s.title} className="relative">
                <ServiceBlock service={s} />
              </li>
            ))}
          </ul>

          <Reveal delay={200}>
            <p className="text-brand-night/70 mx-auto mt-10 max-w-2xl text-center text-lg leading-relaxed md:mt-28">
              We handle{" "}
              <strong className="text-brand-night font-bold">
                Dr. Ramesh Aravind&apos;s personal branding end to end.
              </strong>{" "}
              Our team is on the ground at his events and appearances, and we produce, edit and post
              every moment across his{" "}
              <strong className="text-brand-night font-bold">YouTube channel</strong>,{" "}
              <strong className="text-brand-night font-bold">social media</strong> and other
              platforms, delivered{" "}
              <strong className="text-brand-night font-bold">the same day</strong>.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
