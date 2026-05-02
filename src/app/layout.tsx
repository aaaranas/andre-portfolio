import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andre Milan Arañas | CS Intern",
  description:
    "Third-year BS Computer Science student at UP Cebu. Frontend-leaning full stack developer seeking internship.",
  openGraph: {
    title: "Andre Milan Arañas | Portfolio",
    description: "CS Intern Candidate · React · Next.js · TypeScript",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
