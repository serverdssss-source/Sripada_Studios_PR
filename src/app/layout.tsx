import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// The only two typefaces on the site: Poppins (UI/body/headings) and
// Playfair Display (serif accents).
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: `${site.name} — Digital & Creative Growth Studio, ${site.location}`,
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
  themeColor: "#081816",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // The inline script adds `js` before paint so scroll-reveal never hides content without JS.
      suppressHydrationWarning
      className={`${poppins.variable} ${playfair.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <noscript>
          <style>{".slot-static{visibility:visible!important}.travel-layer{display:none}"}</style>
        </noscript>
      </head>
      <body className="bg-ink text-paper min-h-screen font-sans">
        {/* Site-wide brand gradient, pinned so every section shares one seamless backdrop. */}
        <div
          aria-hidden
          className="from-teal-deep via-teal to-brand pointer-events-none fixed inset-0 -z-10 bg-linear-to-br"
        />
        {children}
      </body>
    </html>
  );
}
