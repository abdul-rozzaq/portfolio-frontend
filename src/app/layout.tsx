import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abdurazzoq — Fullstack Engineer",
  description:
    "Portfolio of Abdurazzoq, a fullstack engineer specializing in Next.js, NestJS, PostgreSQL, and production-grade web systems.",
  openGraph: {
    title: "Abdurazzoq — Fullstack Engineer",
    description: "Building reliable, scalable web systems from APIs to interfaces.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans min-h-screen bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
