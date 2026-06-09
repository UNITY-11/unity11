import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";

// Import your Navbar and the new Footer component
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CustomeCursor } from "@/components/ui/CustomeCursor";
import { ScrollProgress } from "@/components/ui/MagicUi/ScrollProgress";

import SmoothScroll from "@/components/providers/SmoothScroll";

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="en" className={comfortaa.variable} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${comfortaa.className} font-sans bg-white text-gray-900 antialiased`}
      >
        <SmoothScroll>
          <CustomeCursor />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <ScrollProgress />
            <main className="w-full overflow-x-hidden">{children}</main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
