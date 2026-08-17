import type { Metadata } from "next";
import { ForAgenciesContent } from "./for-agencies-content";

export const metadata: Metadata = {
  title: "For Agencies — White-Label Frontend Development",
  description:
    "White-label frontend development and design implementation for agencies that need extra capacity, fast execution and a developer who can work within their existing workflow.",
  alternates: { canonical: "/for-agencies" },
  openGraph: {
    title: "For Agencies — White-Label Frontend Development | Aditya",
    description:
      "White-label frontend development and design implementation for agencies that need extra capacity, fast execution and a developer who can work within their existing workflow.",
    url: "/for-agencies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "For Agencies — White-Label Frontend Development | Aditya",
    description:
      "White-label frontend development and design implementation for agencies that need extra capacity, fast execution and a developer who can work within their existing workflow.",
  },
};

export default function ForAgenciesPage() {
  return <ForAgenciesContent />;
}
