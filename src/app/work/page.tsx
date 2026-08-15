import type { Metadata } from "next";
import { WorkContent } from "./WorkContent";

export const metadata: Metadata = {
  title: "Work — Selected case studies and live websites",
  description:
    "Real business websites, ecommerce platforms and digital products — each one honestly labelled, with a short case study and a link to the live site.",
  alternates: { canonical: "/work" },
};

export default function Page() {
  return <WorkContent />;
}
