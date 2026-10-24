"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import Image from "next/image";
import { StickerBurst } from "@/components/sticker-burst";
import { cn } from "@/lib/cn";

type EnquiryType = "brand" | "event";

const field =
  "border-ink/15 placeholder:text-ink/40 text-ink w-full border-b bg-transparent py-4 text-lg outline-none transition-colors focus:border-[#216974]";

export function Contact() {
  const [type, setType] = useState<EnquiryType>("brand");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const isBrand = type === "brand";
    const subject = isBrand
      ? `Request Pitch Deck - ${data.get("name")}`
      : `Event Pitch / Collaboration Proposal - ${data.get("name")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Company / Organization: ${data.get("organization") || "-"}`,
      isBrand && `Event Interest: ${data.get("eventInterest") || "-"}`,
      isBrand && `Preferred Sponsorship Budget Bracket: ${data.get("budget") || "-"}`,
      "",
      `${data.get("message")}`,
    ]
      .filter((line) => line !== false)
      .join("\n");

    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    // Soft aqua (a light tint of the brand teal), so it stands apart from the off-white
    // section above it.
    <section
      id="contact"
      className="text-ink relative overflow-hidden bg-[#e8f6f3] px-4 py-24 sm:px-8 md:py-32"
    >
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col justify-between gap-12">
          <div>
            {/* Label as a small die-cut sticker pill, then the heading in the site's sticker type. */}
            <p className="mb-8 inline-block -rotate-2 rounded-full border-[3px] border-white bg-[#216974] px-4 py-1.5 text-[0.65rem] font-bold tracking-[0.12em] text-white uppercase shadow-[0_8px_16px_-6px_rgb(11_11_15/0.3)] sm:text-xs sm:tracking-[0.18em]">
              Interactive Contact &amp; Onboarding Hub
            </p>
            <div className="relative inline-block text-[clamp(2.75rem,6vw,5rem)]">
              <h2 className="sticker-text text-brand-night leading-[0.9] font-bold tracking-[-0.06em] uppercase">
                Start a<br />
                Conversation.
              </h2>
              <Image
                src="/elements/golden-shiny-starburst.png"
                alt=""
                aria-hidden
                width={160}
                height={160}
                className="star-float pointer-events-none absolute -top-[0.45em] left-[4.3em] w-[0.55em]"
              />
            </div>
            <p className="text-ink/65 mt-8 max-w-md text-lg leading-relaxed">
              Choose the path that fits: brand partnerships or an event pitch / collaboration
              proposal.
            </p>
          </div>

          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_-20px_rgb(11_11_15/0.4)]">
              <dt className="mb-1 text-xs font-semibold tracking-[0.16em] text-[#216974] uppercase">
                Email
              </dt>
              <dd>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-lg font-medium break-all hover:text-[#216974]"
                >
                  {site.contact.email}
                </a>
              </dd>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_-20px_rgb(11_11_15/0.4)]">
              <dt className="mb-1 text-xs font-semibold tracking-[0.16em] text-[#216974] uppercase">
                Phone
              </dt>
              <dd>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="text-lg font-medium break-all hover:text-[#216974]"
                >
                  {site.contact.phone}
                </a>
              </dd>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_-20px_rgb(11_11_15/0.4)]">
              <dt className="mb-1 text-xs font-semibold tracking-[0.16em] text-[#216974] uppercase">
                Office Location
              </dt>
              <dd className="text-lg font-medium">Bengaluru</dd>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_-20px_rgb(11_11_15/0.4)]">
              <dt className="mb-1 text-xs font-semibold tracking-[0.16em] text-[#216974] uppercase">
                Media &amp; PR Enquiries
              </dt>
              <dd>
                <a
                  href={`mailto:${site.contact.pressEmail}`}
                  className="text-lg font-medium break-all hover:text-[#216974]"
                >
                  {site.contact.pressEmail}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={onSubmit}
          className="relative rounded-[2rem] bg-white p-6 shadow-[0_30px_60px_-30px_rgb(11_11_15/0.35)] md:p-10"
        >
          {/* Aqua starburst stuck on the form's corner, like the other sections. */}
          <StickerBurst
            color="#54c4b6"
            className="pointer-events-none absolute -top-7 -right-5 w-14 md:-top-9 md:-right-7 md:w-20"
          />
          <div
            role="radiogroup"
            aria-label="Enquiry type"
            className="mb-8 flex flex-wrap rounded-2xl bg-[#e8f6f3] p-1"
          >
            {(
              [
                ["brand", "For Brands seeking Partnerships"],
                ["event", "For Event Organizers / Creators"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={type === value}
                onClick={() => {
                  setType(value);
                  setSent(false);
                }}
                className={cn(
                  "flex-1 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                  type === value
                    ? "bg-[#216974] text-white shadow-md shadow-[#216974]/25"
                    : "text-ink/60 hover:text-ink",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid gap-2 sm:grid-cols-2 sm:gap-x-6">
            <label className="block">
              <span className="sr-only">Your name</span>
              <input
                name="name"
                required
                autoComplete="name"
                placeholder="Your name*"
                className={field}
              />
            </label>
            <label className="block">
              <span className="sr-only">Email</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Email*"
                className={field}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="sr-only">Company or organization</span>
              <input
                name="organization"
                autoComplete="organization"
                placeholder={type === "brand" ? "Brand / Company" : "Organization / Event"}
                className={field}
              />
            </label>
          </div>

          {type === "brand" && (
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-ink/55 text-sm">Select Event Interest</span>
                <select
                  name="eventInterest"
                  defaultValue=""
                  required
                  className={cn(field, "appearance-none")}
                >
                  <option value="" disabled className="bg-white">
                    Select an event
                  </option>
                  <option className="bg-white">Cini-Mini 2026</option>
                  <option className="bg-white">SS Calendar</option>
                  <option className="bg-white">Upcoming IPs</option>
                </select>
              </label>
              <label className="block">
                <span className="text-ink/55 text-sm">Preferred Sponsorship Budget Bracket</span>
                <select
                  name="budget"
                  defaultValue=""
                  required
                  className={cn(field, "appearance-none")}
                >
                  <option value="" disabled className="bg-white">
                    Select a range
                  </option>
                  <option className="bg-white">₹15K–₹2.5L+</option>
                </select>
              </label>
            </div>
          )}

          <label className="mt-6 block">
            <span className="sr-only">
              {type === "brand" ? "Partnership details" : "Event pitch"}
            </span>
            <textarea
              name="message"
              required
              rows={4}
              placeholder={
                type === "brand"
                  ? "Tell us about your brand and partnership goals*"
                  : "Submit Your Event Pitch / Collaboration Proposal*"
              }
              className={cn(field, "resize-none")}
            />
          </label>

          <button
            type="submit"
            className="group mt-10 flex w-full items-center justify-between rounded-full bg-[#216974] py-2 pr-2 pl-7 text-left text-base font-semibold text-white transition-colors hover:bg-[#1b5a64]"
          >
            {type === "brand"
              ? "Request Pitch Deck"
              : "Submit Your Event Pitch / Collaboration Proposal"}
            <span className="text-brand-night grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white transition-transform duration-500 group-hover:-rotate-45">
              →
            </span>
          </button>
          <p className="text-ink/50 mt-4 text-center text-xs" aria-live="polite">
            {sent && "Your email app should open with the enquiry ready to send."}
          </p>
        </form>
      </div>
    </section>
  );
}
