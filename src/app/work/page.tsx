import type { Metadata } from "next";
import { WorkContent } from "./WorkContent";

export const metadata: Metadata = {
  title: "Work — Flagship case studies and laboratory experiments",
  description:
    "Selected corporate websites, commerce platforms, brand experiences and creative experiments — each one honestly labelled and walked through in detail.",
  alternates: { canonical: "/work" },
};

export default function Page() {
  return <WorkContent />;
}
