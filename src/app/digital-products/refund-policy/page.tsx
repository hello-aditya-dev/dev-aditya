import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SUPPORT_EMAIL, SITE_ORIGIN } from "@/config/digital-products";

export const metadata: Metadata = {
  title: "Refund / Cancellation Policy | Aditya Digital Products",
  description: "Refund and cancellation policy for digital products purchased from Aditya.",
  alternates: {
    canonical: `${SITE_ORIGIN}/digital-products/refund-policy`,
  },
};

export default function RefundPolicyPage() {
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
          Refund / Cancellation Policy
        </h1>

        <div className="prose max-w-none space-y-6" style={{ color: "#5E5E5F" }}>
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Digital products only</h2>
            <p>All products on this store are digital products delivered electronically. No physical goods are shipped. Due to the digital nature of these products, all sales are generally considered final once the product has been downloaded or accessed. Unlike physical goods, digital products can be reproduced without return of the original.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Before download</h2>
            <p>If you have not yet downloaded the product files, you may request a full refund within 24 hours of purchase. Contact <a href={`mailto:${SUPPORT_EMAIL}`} className="underline" style={{ color: "#1C92FF" }}>{SUPPORT_EMAIL}</a> with your order reference.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>After download</h2>
            <p>Refund requests after the product has been downloaded will be evaluated on a case-by-case basis. Valid reasons may include:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Product significantly differs from its description on the product page.</li>
              <li>Files are corrupted or inaccessible and a replacement cannot be provided.</li>
              <li>Duplicate purchase (same product purchased twice accidentally).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>How to request a refund</h2>
            <p>Email <a href={`mailto:${SUPPORT_EMAIL}`} className="underline" style={{ color: "#1C92FF" }}>{SUPPORT_EMAIL}</a> with:</p>
            <ol className="list-decimal pl-6 space-y-1 mt-2">
              <li>Your order reference number.</li>
              <li>The email address used for the purchase.</li>
              <li>The reason for your refund request.</li>
            </ol>
            <p className="mt-2">Refund requests are reviewed within 3 business days. Approved refunds are processed via Razorpay through the original payment method and may take 5–10 business days to appear, depending on your payment provider.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Payment processing</h2>
            <p>Payments are processed by <a href="https://razorpay.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#1C92FF" }}>Razorpay</a>. Card and banking details are handled entirely by Razorpay and never touch our servers. We collect only your name and email address to deliver your purchase and send order communications via <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#1C92FF" }}>Resend</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Cancellation</h2>
            <p>Since these are one-time purchases (not subscriptions), there is no recurring billing to cancel. If you wish to cancel a pending order that has not yet been fulfilled, contact support immediately.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Contact</h2>
            <p>For refund questions or requests, contact <a href={`mailto:${SUPPORT_EMAIL}`} className="underline" style={{ color: "#1C92FF" }}>{SUPPORT_EMAIL}</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
