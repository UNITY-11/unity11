import type { Metadata } from "next";
import { Geist, Geist_Mono, Comfortaa } from "next/font/google";
import "./globals.css";

// Import your Navbar and the new Footer component
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CustomeCursor } from "@/components/ui/CustomeCursor";
import { ScrollProgress } from "@/components/ui/MagicUi/ScrollProgress";

import SmoothScroll from "@/components/providers/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Unity11 | Software Development & Services",
    template: "%s | Unity11", // This adds " | Unity11" to all sub-pages
  },
  description:
    "Your expert partner for custom software development, cloud solutions, and technology services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${comfortaa.variable} font-sans bg-white text-gray-900 antialiased`}
      >
        <SmoothScroll>
          <CustomeCursor />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <ScrollProgress />
            <main>{children}</main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
