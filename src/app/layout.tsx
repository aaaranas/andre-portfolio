import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Andre Milan Arañas | Web Developer",
  description:
    "Frontend-leaning full-stack developer at UP Cebu. Built a province-wide transit planner for Cebu, a real-time event check-in kiosk, and 8+ deployed projects. Interning at eComia.",
  openGraph: {
    title: "Andre Milan Arañas | Web Developer Portfolio",
    description: "React · Next.js · TypeScript · Firebase · Currently interning at eComia, Cebu City.",
    type: "website",
    url: "https://andre-milan-aranas.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andre Milan Arañas | Web Developer",
    description: "React · Next.js · TypeScript · Firebase · Currently interning at eComia, Cebu City.",
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
