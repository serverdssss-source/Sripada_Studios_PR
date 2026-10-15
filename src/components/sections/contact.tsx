"use client";

import { useState, type FormEvent } from "react";
import { expertise, site } from "@/content/site";
import { Accent } from "@/components/ui";
import { cn } from "@/lib/cn";

const budgets = ["Under ₹1L / month", "₹1L – ₹3L / month", "₹3L – ₹10L / month", "₹10L+ / month"];

const field =
  "border-paper/20 focus:border-brand placeholder:text-paper/35 w-full border-b bg-transparent py-4 text-lg outline-none transition-colors";

export function Contact() {
  const [type, setType] = useState<"project" | "press">("project");
  const [services, setServices] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggle = (s: string) =>
    setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  // TODO: post to a form backend/CRM (e.g. Resend, HubSpot) instead of opening the mail app.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const to = type === "press" ? site.contact.pressEmail : site.contact.email;
    const subject = `${type === "press" ? "Media / PR enquiry" : "New project"} — ${data.get("name")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Company: ${data.get("company") || "-"}`,
      type === "project" && `Services: ${services.join(", ") || "-"}`,
      type === "project" && `Budget: ${data.get("budget") || "-"}`,
      "",
      `${data.get("message")}`,
    ]
      .filter((l) => l !== false)
      .join("\n");
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="contact" className="grain relative overflow-hidden px-4 py-24 sm:px-8 md:py-36">
      <div
        aria-hidden
        className="bg-brand/15 pointer-events-none absolute -top-40 -right-40 h-[40rem] w-[40rem] rounded-full blur-[140px]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col justify-between gap-12">
          <div>
            <p className="mb-6 flex items-center gap-3 text-xs font-medium tracking-[0.25em] uppercase opacity-60">
              Now taking new projects
            </p>
            <h2 className="text-[clamp(3rem,5.5vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.04em]">
              Have a brand <br />
              worth <Accent>building?</Accent>
            </h2>
            <p className="text-paper/65 mt-8 max-w-md text-lg leading-relaxed">
              Let&apos;s turn your next idea into something people see, remember and act on. We
              reply within one working day.
            </p>
          </div>

          <dl className="grid gap-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-paper/40 mb-1">New business</dt>
              <dd>
                <a href={`mailto:${site.contact.email}`} className="hover:text-brand text-lg">
                  {site.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-paper/40 mb-1">Media & PR</dt>
              <dd>
                <a href={`mailto:${site.contact.pressEmail}`} className="hover:text-brand text-lg">
                  {site.contact.pressEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-paper/40 mb-1">Phone</dt>
              <dd>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="hover:text-brand text-lg"
                >
                  {site.contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-paper/40 mb-1">Studio</dt>
              <dd className="text-lg">{site.location}, India</dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={onSubmit}
          className="border-ink-line bg-ink-soft rounded-3xl border p-6 backdrop-blur md:p-10"
        >
          <div
            role="radiogroup"
            aria-label="Enquiry type"
            className="bg-ink/40 mb-8 inline-flex rounded-full p-1"
          >
            {(
              [
                ["project", "Start a project"],
                ["press", "Media / PR"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={type === value}
                onClick={() => setType(value)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                  type === value ? "bg-paper text-ink" : "text-paper/60 hover:text-paper",
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
              <span className="sr-only">Company or publication</span>
              <input
                name="company"
                autoComplete="organization"
                placeholder={type === "press" ? "Publication / outlet" : "Company / brand"}
                className={field}
              />
            </label>
          </div>

          {type === "project" && (
            <>
              <fieldset className="mt-8">
                <legend className="text-paper/50 mb-3 text-sm">What do you need?</legend>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((e) => (
                    <button
                      key={e.title}
                      type="button"
                      aria-pressed={services.includes(e.title)}
                      onClick={() => toggle(e.title)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm transition-colors",
                        services.includes(e.title)
                          ? "bg-brand text-ink border-brand"
                          : "border-paper/20 text-paper/75 hover:border-paper/50",
                      )}
                    >
                      {e.title}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="mt-6 block">
                <span className="text-paper/50 text-sm">Monthly budget</span>
                <select name="budget" defaultValue="" className={cn(field, "appearance-none")}>
                  <option value="" disabled className="bg-ink">
                    Select a range
                  </option>
                  {budgets.map((b) => (
                    <option key={b} className="bg-ink">
                      {b}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}

          <label className="mt-2 block">
            <span className="sr-only">Message</span>
            <textarea
              name="message"
              required
              rows={4}
              placeholder={
                type === "press"
                  ? "Tell us about the story, interview or feature*"
                  : "Tell us about your brand and goals*"
              }
              className={cn(field, "resize-none")}
            />
          </label>

          <button
            type="submit"
            className="bg-paper text-ink group mt-10 flex w-full items-center justify-between rounded-full py-2 pr-2 pl-7 text-base font-semibold transition-colors hover:bg-white"
          >
            {type === "press" ? "Send Press Enquiry" : "Send Project Enquiry"}
            <span className="bg-ink text-paper grid h-12 w-12 place-items-center rounded-full transition-transform duration-500 group-hover:-rotate-45">
              →
            </span>
          </button>
          <p className="text-paper/40 mt-4 text-center text-xs" aria-live="polite">
            {sent
              ? "Your email app should open with the enquiry ready to send."
              : "No spam. Your details are only used to reply to you."}
          </p>
        </form>
      </div>
    </section>
  );
}
