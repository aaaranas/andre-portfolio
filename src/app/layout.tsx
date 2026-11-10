import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { personal, projects } from "@/lib/data";

/*
 * Fonts are self-hosted variable files — one request per family, served from
 * this origin, preloaded, with no stylesheet round-trip to a third party.
 * Each exposes a private --ff-* variable; globals.css maps those onto the
 * --font-* tokens the rest of the site uses.
 */
const display = localFont({
  src: "./fonts/space-grotesk-latin-wght-normal.woff2",
  variable: "--ff-display",
  weight: "300 700",
  display: "swap",
});
const body = localFont({
  src: "./fonts/instrument-sans-latin-wght-normal.woff2",
  variable: "--ff-body",
  weight: "400 700",
  display: "swap",
});
const mono = localFont({
  src: "./fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--ff-mono",
  weight: "100 800",
  display: "swap",
  // The default fallback is metric-matched Arial, which is wrong for a
  // monospace face; name real monospace fallbacks instead.
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});

const SITE = "https://andre-milan-aranas.vercel.app";
const DESCRIPTION =
  "A portfolio that boots like the operating system its author wrote. Andre Milan Arañas is a frontend-leaning full-stack developer at UP Cebu: a province-wide Cebu transit planner, a local-first camera PWA, explainable fragrance analytics, and a 32-bit OS from scratch.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Andre Milan Arañas — Software Developer",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Andre Milan Arañas — Software Developer",
    description: DESCRIPTION,
    type: "website",
    url: SITE,
    siteName: "AMA-OS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andre Milan Arañas — Software Developer",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0d0f" },
    { media: "(prefers-color-scheme: light)", color: "#f2f1ed" },
  ],
  colorScheme: "dark light",
};

/** Structured data, so a search engine reads a person and not just a shell. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  url: SITE,
  email: `mailto:${personal.email}`,
  jobTitle: "Software Developer",
  address: { "@type": "PostalAddress", addressLocality: "Cebu City", addressCountry: "PH" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of the Philippines Cebu" },
  sameAs: [personal.githubUrl],
  knowsAbout: Array.from(new Set(projects.flatMap((p) => p.stack))).slice(0, 16),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t==='light')d.setAttribute('data-theme','light');var seen=sessionStorage.getItem('ama-booted')==='1';var deep=location.hash.length>1;var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!seen&&!deep&&!reduced)d.setAttribute('data-boot','1')}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#pane" className="skip-nav">Skip to content</a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
