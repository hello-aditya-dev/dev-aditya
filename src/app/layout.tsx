import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_ORIGIN } from "@/config/digital-products";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: "Aditya — Web Designer & Developer",
  description: "Web designer and developer based in India. Clean design, solid code, clear process.",
  keywords: ["web designer", "web developer", "freelance web designer", "India web developer", "website design", "Aditya"],
  authors: [{ name: "Aditya" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Aditya — Web Designer & Developer",
    description: "Web designer and developer based in India. Clean design, solid code, clear process.",
    url: SITE_ORIGIN,
    siteName: "Aditya",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya — Web Designer & Developer",
    description: "Web designer and developer based in India. Clean design, solid code, clear process.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
