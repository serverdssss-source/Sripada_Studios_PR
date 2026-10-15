# Sripada Studios — PR Website

Single-page digital press profile for Sripada Studios.

## Stack

- **Next.js 16** (App Router, Turbopack, statically prerendered) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — theme tokens in `src/app/globals.css`
- **Fonts** — Fraunces (display serif) + Geist (sans) via `next/font`
- **Testing** — Vitest + Testing Library (unit), Playwright (e2e, desktop + mobile)
- **Tooling** — ESLint, Prettier (with Tailwind class sorting)

## Scripts

```bash
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
npm run typecheck
npm test           # unit tests
npm run test:e2e   # builds, starts and runs Playwright (first run: npx playwright install chromium)
npm run format
```

## Images

`public/images/` holds **sample stock photos** (Unsplash) so the layout reads properly. Replace each
file with a real one under the same name — e.g. `founder-phani.jpg`, `work-hearfon.jpg` — and the
site picks it up. Paths are listed in `src/content/site.ts`.

## Enquiry form

The contact form currently opens the visitor's email app with the enquiry pre-filled (project
enquiries → `hello@`, press → `press@`). Wire it to a form backend/CRM before launch (see the TODO in
`src/components/sections/contact.tsx`).

## Editing content

All copy lives in [`src/content/site.ts`](src/content/site.ts). Search for `TODO` to find
placeholders that need real data: contact details, social links, founder portraits, milestone
dates, media logos, client logos and case-study imagery.

Each page section is a component in `src/components/sections/`, assembled in
`src/app/page.tsx`.
