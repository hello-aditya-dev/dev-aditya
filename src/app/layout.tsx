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
  title: "Aditya — Digital Products for Web Designers & Agencies",
  description: "Pricing systems, agency operations tools and website templates for web designers, developers and small studios.",
  keywords: ["web design tools", "agency tools", "pricing calculator", "scope creep", "client onboarding", "digital products", "web designer resources"],
  authors: [{ name: "Aditya" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Aditya — Digital Products for Web Designers & Agencies",
    description: "Pricing systems, agency operations tools and website templates for web designers, developers and small studios.",
    url: SITE_ORIGIN,
    siteName: "Aditya",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya — Digital Products for Web Designers & Agencies",
    description: "Pricing systems, agency operations tools and website templates for web designers, developers and small studios.",
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
