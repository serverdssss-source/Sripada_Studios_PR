"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { work } from "@/content/site";

export type CaseStudy = {
  /** Small oval label at the top of the page. */
  label: string;
  /** Headline lines; `highlight` puts a selection-style bar behind that line. */
  headline: { text: string; highlight?: "violet" | "teal" }[];
  intro: string;
  services: string[];
  /** Line written on the strip of tape at the bottom. */
  note: string;
  poster: string;
};

export type CaseStudyItem = {
  client: string;
  study: CaseStudy;
};

const highlights = {
  violet: { bar: "bg-[#c9b8ff]", dot: "bg-[#8b5cf6]" },
  // Light tint of the Case Study section's brand teal.
  teal: { bar: "bg-[#a9dcd6]", dot: "bg-brand-teal" },
};

const defaultStudies: CaseStudyItem[] = work
  .filter((item): item is typeof item & { caseStudy: CaseStudy } =>
    Boolean("caseStudy" in item && item.caseStudy),
  )
  .map((item) => ({ client: item.client, study: item.caseStudy }));

/**
 * Opens a case study over the page (a native modal <dialog>): a clipped stack of paper over the
 * blurred page, with the headline, the work we handled, a taped note, and previous/next navigation arrows.
 * The trigger covers the whole card it sits in; Escape, the close button, or a click outside the paper closes it.
 */
export function CaseStudyDialog({
  client,
  study,
  studies = defaultStudies,
  initialIndex,
}: {
  client: string;
  study: CaseStudy;
  studies?: CaseStudyItem[];
  initialIndex?: number;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const studiesList = studies.length > 0 ? studies : [{ client, study }];
  const total = studiesList.length;

  const resolvedInitialIndex =
    initialIndex ??
    Math.max(
      0,
      studiesList.findIndex((item) => item.client === client),
    );
  const [currentIndex, setCurrentIndex] = useState(resolvedInitialIndex);

  const current = studiesList[currentIndex] ?? { client, study };
  const currentClient = current.client;
  const currentStudy = current.study;

  const prevItem = studiesList[(currentIndex - 1 + total) % total];
  const nextItem = studiesList[(currentIndex + 1) % total];

  const goNext = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
    ref.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [total]);

  const goPrev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    ref.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [total]);

  // Keep the page behind from scrolling while the dialog is open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [open]);

  // Arrow keys for switching case study when open.
  useEffect(() => {
    if (!open || total <= 1) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, total, goNext, goPrev]);

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    touchStartX.current = null;
  };

  const show = () => {
    const idx = studiesList.findIndex((item) => item.client === client);
    if (idx >= 0) {
      setCurrentIndex(idx);
    }
    ref.current?.showModal();
    setOpen(true);
  };

  const close = () => ref.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-label={`Open the ${client} case study`}
        className="absolute inset-0 z-10 cursor-pointer rounded-[1.5rem] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white"
      />

      <dialog
        ref={ref}
        aria-label={`${currentClient} case study`}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="case-dialog fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-x-hidden overflow-y-auto bg-transparent px-6 py-12 backdrop:bg-[rgb(11_11_15/0.5)] backdrop:backdrop-blur-md sm:px-6 sm:py-10 md:px-8 md:py-12"
      >
        {/* Floating close button */}
        <button
          type="button"
          onClick={close}
          aria-label="Close case study"
          className="text-brand-night fixed top-3 right-3 z-30 grid size-10 place-items-center rounded-full bg-white text-xl shadow-lg transition-transform hover:rotate-90 sm:top-5 sm:right-5 sm:size-12 sm:text-2xl md:top-6 md:right-6"
        >
          ×
        </button>

        {/* Desktop floating side arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label={`Previous case study: ${prevItem.client}`}
              title={`Previous: ${prevItem.client}`}
              className="group text-brand-night fixed top-1/2 left-3 z-30 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_12px_28px_rgb(0_0_0/0.3)] transition-all duration-300 hover:scale-110 hover:bg-[#8b5cf6] hover:text-white md:left-6 md:grid lg:left-8"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="size-6 fill-none stroke-current stroke-[2.5] transition-transform group-hover:-translate-x-0.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label={`Next case study: ${nextItem.client}`}
              title={`Next: ${nextItem.client}`}
              className="group text-brand-night fixed top-1/2 right-3 z-30 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_12px_28px_rgb(0_0_0/0.3)] transition-all duration-300 hover:scale-110 hover:bg-[#8b5cf6] hover:text-white md:right-6 md:grid lg:right-8"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="size-6 fill-none stroke-current stroke-[2.5] transition-transform group-hover:translate-x-0.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        <div
          className="relative mx-auto flex min-h-full w-full max-w-3xl flex-col justify-center py-4 sm:py-6 lg:max-w-5xl lg:py-8"
          onClick={(e) => e.target === e.currentTarget && close()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top header with brand and counter */}
          <div className="mb-4 flex items-center justify-between px-1 sm:mb-6 lg:mb-4">
            <p className="text-xs font-semibold tracking-[0.04em] text-white/90 sm:text-sm md:text-base">
              @sripadastudios
            </p>
            {total > 1 && (
              <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[0.7rem] font-bold tracking-wider text-white uppercase backdrop-blur-xs">
                <span>{currentIndex + 1}</span>
                <span className="opacity-40">/</span>
                <span>{total}</span>
              </div>
            )}
          </div>

          <div key={currentClient} className="case-paper relative">
            {/* Loose sheets underneath. */}
            <div
              aria-hidden
              className="absolute inset-0 translate-x-[-2%] translate-y-[1%] -rotate-2 rounded-sm bg-white shadow-[0_20px_40px_-24px_rgb(0_0_0/0.45)] sm:translate-x-[-3%] sm:translate-y-[1.5%] sm:-rotate-3"
            />
            <div
              aria-hidden
              className="rotate-1.5 absolute inset-0 translate-x-[1.5%] translate-y-[1.5%] rounded-sm bg-[#f3f3f3] shadow-[0_20px_40px_-24px_rgb(0_0_0/0.45)] sm:translate-x-[2.5%] sm:translate-y-[2.5%] sm:rotate-2"
            />

            {/* The page itself: warm paper with a faint grain. */}
            <article className="text-brand-night relative rounded-[0.35rem_1.25rem_1.25rem_0.35rem] bg-[#f4f1ea] bg-[radial-gradient(rgb(0_0_0/0.035)_1px,transparent_1px)] [background-size:5px_5px] px-5 pt-11 pb-9 shadow-[0_30px_60px_-28px_rgb(0_0_0/0.55)] sm:px-12 sm:pt-16 sm:pb-12 md:px-16 md:pt-20 md:pb-16 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12 lg:py-14">
              <PaperClip className="absolute -top-5 left-5 h-18 w-7 rotate-[8deg] sm:-top-7 sm:left-8 sm:h-24 sm:w-10 md:left-12 md:h-28" />
              <BinderClip className="absolute top-[42%] -right-12 hidden w-24 sm:block" />

              {/* Poster, clipped to the page like a photo. */}
              <div className="absolute top-6 right-4 w-16 rotate-6 bg-white p-1 pb-3 shadow-[0_10px_20px_-10px_rgb(0_0_0/0.5)] sm:top-8 sm:right-6 sm:w-24 sm:p-1.5 sm:pb-4 md:top-10 md:right-12 md:w-32 lg:-top-10 lg:right-16 lg:w-28">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={currentStudy.poster}
                    alt={`${currentClient} poster`}
                    fill
                    sizes="(min-width: 1024px) 112px, (min-width: 768px) 128px, 96px"
                    className="object-cover object-[center_20%]"
                  />
                </div>
              </div>

              {/* Left: label, headline and intro. Right (large screens): the work and the note. */}
              <div>
                {/* Oval label, with the bookmark sticker beside it */}
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <p className="border-brand-teal inline-block -rotate-3 rounded-[50%] border-[1.5px] px-3.5 py-1.5 text-center text-[0.7rem] leading-tight font-medium sm:px-5 sm:py-2 sm:text-xs md:text-sm">
                    {currentStudy.label}
                  </p>
                  <svg
                    aria-hidden
                    viewBox="0 0 24 30"
                    className="w-5 shrink-0 rotate-12 sm:w-6 md:w-7"
                  >
                    <path d="M2 2h20v26l-10-7-10 7z" fill="#8b5cf6" />
                  </svg>
                </div>

                <h2 className="mt-5 text-[clamp(1.75rem,7vw,2.5rem)] leading-[0.92] font-bold tracking-[-0.05em] sm:mt-6 sm:text-[clamp(2.6rem,9vw,5.25rem)] sm:leading-[0.9] sm:tracking-[-0.055em] lg:text-[length:min(4.6vw,8.5vh)]">
                  {currentStudy.headline.map((line) => {
                    const h = line.highlight && highlights[line.highlight];
                    return (
                      <span key={line.text} className="block">
                        <span className={cn("relative inline-block px-[0.06em]", h && h.bar)}>
                          {line.text}
                          {h && (
                            <>
                              <span
                                aria-hidden
                                className={cn(
                                  "absolute -top-[0.08em] -left-[0.08em] size-[0.14em] rounded-full",
                                  h.dot,
                                )}
                              />
                              <span
                                aria-hidden
                                className={cn(
                                  "absolute -right-[0.08em] -bottom-[0.08em] size-[0.14em] rounded-full",
                                  h.dot,
                                )}
                              />
                            </>
                          )}
                        </span>
                      </span>
                    );
                  })}
                </h2>

                <p className="text-brand-night/75 mt-4 max-w-lg text-xs leading-relaxed sm:mt-6 sm:text-sm md:text-base">
                  {currentStudy.intro}
                </p>
              </div>

              <div className="lg:pt-16">
                <ul className="mt-6 grid gap-x-8 gap-y-2 sm:mt-8 sm:grid-cols-2 sm:gap-y-2.5 lg:mt-0 lg:grid-cols-1 lg:gap-y-2">
                  {currentStudy.services.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2.5 text-xs font-semibold sm:gap-3 sm:text-sm md:text-base"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.3em] size-2.5 shrink-0 rotate-12 rounded-[2px] bg-[#8b5cf6] sm:size-3 sm:rounded-[3px]"
                      />
                      {s}
                    </li>
                  ))}
                </ul>

                {/* Masking tape note. */}
                <p className="mx-auto mt-7 w-fit max-w-full -rotate-2 bg-[#d8d0c0]/80 px-4 py-2 text-center text-xs leading-snug font-medium shadow-[0_6px_10px_-8px_rgb(0_0_0/0.4)] [clip-path:polygon(2%_0,98%_4%,100%_50%,98%_96%,2%_100%,0_50%)] sm:mt-10 sm:px-6 sm:py-2.5 sm:text-sm lg:mx-0 lg:mt-8">
                  {currentStudy.note}
                </p>
              </div>

              {/* Small cut-out stickers. */}
              <svg
                aria-hidden
                viewBox="0 0 40 32"
                className="absolute right-[2%] bottom-[2%] hidden w-12 rotate-12 drop-shadow-[0_6px_6px_rgb(0_0_0/0.25)] sm:block"
              >
                <path
                  d="M2 6a3 3 0 0 1 3-3h10l4 4h16a3 3 0 0 1 3 3v17a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z"
                  fill="#2e8c99"
                />
              </svg>
            </article>
          </div>
        </div>
      </dialog>
    </>
  );
}

function PaperClip({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 110" className={className} fill="none">
      <path
        d="M14 30V14a8 8 0 0 1 16 0v74a14 14 0 0 1-28 0V24"
        stroke="#7a7f86"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path d="M22 26v58" stroke="#7a7f86" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function BinderClip({ className }: { className?: string }) {
  // Unique per dialog: several case studies on the page each draw their own clip.
  const metal = useId();
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 80"
      className={cn("drop-shadow-[0_8px_8px_rgb(0_0_0/0.3)]", className)}
    >
      <defs>
        <linearGradient id={metal} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#d9dcdf" />
          <stop offset="0.5" stopColor="#8d9399" />
          <stop offset="1" stopColor="#c7cbcf" />
        </linearGradient>
      </defs>
      <rect x="4" y="14" width="34" height="52" rx="4" fill={`url(#${metal})`} />
      <path
        d="M38 22h40a14 14 0 0 1 0 28H38M38 58h30"
        fill="none"
        stroke="#9aa0a6"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
