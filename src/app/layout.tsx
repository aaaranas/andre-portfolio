import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andre Milan Aranas | Full-Stack, Data & AI Engineer",
  description:
    "Portfolio of Andre Milan Aranas: full-stack development, data analytics, and AI automation.",
  openGraph: {
    title: "Andre Milan Aranas | Portfolio",
    description: "Full-Stack Development, Data Analytics, and AI Automation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
