import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nilo Design System",
  description: "Design system and component library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {/* Global SVG gradient definitions for AI icons */}
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            <linearGradient id="ai-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--ai-start)" />
              <stop offset="50%" stopColor="var(--ai-mid)" />
              <stop offset="100%" stopColor="var(--ai-end)" />
            </linearGradient>
          </defs>
        </svg>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
