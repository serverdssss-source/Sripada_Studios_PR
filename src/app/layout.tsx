import type { Metadata, Viewport } from "next";
import { Geom, Playfair_Display } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// The only two typefaces on the site: Geom (UI/body/headings, variable weight
// with italics) and Playfair Display (serif accents).
const geom = Geom({
  variable: "--font-geom",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: `${site.name} — Cultural Events & Cinematic Media, ${site.location}`,
  description: `${site.name}: ${site.headline}`,
  openGraph: {
    title: site.name,
    description: site.headline,
    type: "website",
    locale: "en_IN",
    images: [site.heroImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // The inline script adds `js` before paint so scroll-reveal never hides content without JS.
      suppressHydrationWarning
      className={`${geom.variable} ${playfair.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <noscript>
          <style>
            {
              ".slot-static{visibility:visible!important}.travel-layer{display:none}.showreel-experience{height:100svh!important}"
            }
          </style>
        </noscript>
      </head>
      <body className="bg-ink text-paper min-h-screen font-sans">
        {/* Site-wide brand gradient, pinned so every section shares one seamless backdrop. */}
        <div
          aria-hidden
          className="from-ink via-teal-deep to-teal pointer-events-none fixed inset-0 -z-10 bg-linear-to-br"
        />
        {children}
      </body>
    </html>
  );
}
