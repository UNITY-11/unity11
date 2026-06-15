import type { Metadata } from "next";
import { Geist, Geist_Mono, Comfortaa } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

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
  title: "Unity11 IT Solutions - Admin",
  description: "IT Service Agency Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${comfortaa.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="h-full flex bg-background font-sans text-foreground overflow-hidden">
        <ThemeProvider attribute="class" defaultTheme="dark">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 relative">
          
          <HeaderShell />
          <main className="flex-1 overflow-y-auto relative z-10">
            {children}
          </main>
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
