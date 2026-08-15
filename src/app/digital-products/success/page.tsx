import type { Metadata } from "next";
import SuccessClient from "./success-client";

export const metadata: Metadata = {
  title: "Purchase Successful | Aditya Digital Products",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return <SuccessClient />;
}
