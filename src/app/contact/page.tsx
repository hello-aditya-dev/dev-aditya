import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact — start a project",
  description:
    "Send the company, current website, project goal and expected timing. Aditya reviews every enquiry and replies within 1–2 business days.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <ContactContent />;
}
