import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SUPPORT_EMAIL, SITE_ORIGIN } from "@/config/digital-products";

export const metadata: Metadata = {
  title: "Digital Delivery / Shipping Policy | Aditya Digital Products",
  description: "Delivery policy for digital products purchased from Aditya.",
  alternates: {
    canonical: `${SITE_ORIGIN}/digital-products/delivery-policy`,
  },
};

export default function DeliveryPolicyPage() {
  return (
    <div className="min-h-[80vh] py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/digital-products"
          className="inline-flex items-center gap-2 text-sm mb-8 hover:underline"
          style={{ color: "#5E5E5F" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to digital products
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#0B0B0B" }}>
          Digital Delivery / Shipping Policy
        </h1>

        <div className="prose max-w-none space-y-6" style={{ color: "#5E5E5F" }}>
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Digital products only</h2>
            <p>All products available on this store are digital products. No physical goods are shipped or will be shipped at any point.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Delivery method</h2>
            <p>After successful payment verification, you will receive immediate access to download your purchased files through a secure download link. The download link is also sent to the email address you provided during checkout via <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#1C92FF" }}>Resend</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Delivery timeframe</h2>
            <p>Downloads are available within seconds of payment verification. In rare cases where server processing is delayed, delivery may take up to a few minutes. If you do not receive access within 10 minutes of successful payment, please contact support.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Download access</h2>
            <p>Download links are valid for 7 days from the date of purchase and allow a reasonable number of download attempts. If your link expires or you need additional downloads, contact support with your order reference.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>If access fails</h2>
            <p>If your payment succeeds but you cannot access the download page or link:</p>
            <ol className="list-decimal pl-6 space-y-1 mt-2">
              <li>Check your email inbox and spam folder for the download email.</li>
              <li>Return to the success page using your browser&apos;s back button.</li>
              <li>Contact <a href={`mailto:${SUPPORT_EMAIL}`} className="underline" style={{ color: "#1C92FF" }}>{SUPPORT_EMAIL}</a> with your order reference for manual assistance.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>File formats</h2>
            <p>Products are delivered as ZIP archives containing the files described on each product page. Ensure you have software capable of opening ZIP files and the specific formats listed (e.g., Excel for .xlsx files).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Contact</h2>
            <p>For delivery issues or questions, contact <a href={`mailto:${SUPPORT_EMAIL}`} className="underline" style={{ color: "#1C92FF" }}>{SUPPORT_EMAIL}</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
