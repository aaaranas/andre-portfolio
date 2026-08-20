import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://andre-milan-aranas.vercel.app"),
  title: "Andre Milan Arañas | Software Developer",
  description:
    "Frontend-leaning full-stack developer at UP Cebu and Head of Technology at Accelokal. Nine public repositories — a province-wide Cebu transit planner, a local-first camera PWA, an explainable fragrance analytics app, and a 32-bit OS booted from scratch.",
  openGraph: {
    title: "Andre Milan Arañas | Software Developer Portfolio",
    description:
      "React · Next.js · TypeScript · Flutter · Head of Technology at Accelokal and Front-End AI Engineering Intern at FlyRank AI, from Cebu City.",
    type: "website",
    url: "https://andre-milan-aranas.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andre Milan Arañas | Software Developer",
    description:
      "React · Next.js · TypeScript · Flutter · Head of Technology at Accelokal and Front-End AI Engineering Intern at FlyRank AI, from Cebu City.",
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}`,
          }}
        />
      </head>
      <body>
        <a href="#about" className="skip-nav">Skip to content</a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
