import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SUPPORT_EMAIL, SITE_ORIGIN } from "@/config/digital-products";

export const metadata: Metadata = {
  title: "Privacy Policy | Aditya Digital Products",
  description: "Privacy policy for digital products purchased from Aditya.",
  alternates: {
    canonical: `${SITE_ORIGIN}/digital-products/privacy`,
  },
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>

        <div className="prose max-w-none space-y-6" style={{ color: "#5E5E5F" }}>
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Data we collect</h2>
            <p>When you purchase a digital product, we collect only:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Your name</strong> — to personalise the order confirmation and delivery email.</li>
              <li><strong>Your email address</strong> — to send order confirmation, download link, and respond to support requests.</li>
            </ul>
            <p className="mt-2">We do not collect, store, or have access to your card or banking details. Payment information is handled entirely by <a href="https://razorpay.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#1C92FF" }}>Razorpay</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>How we use your data</h2>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>To process and deliver your purchase.</li>
              <li>To send order confirmation and download link emails via <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#1C92FF" }}>Resend</a>.</li>
              <li>To respond to support or refund requests.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Data sharing</h2>
            <p>We do not sell, rent, or share your personal data with third parties for marketing purposes. Your data is shared only with service providers essential to processing your purchase:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Razorpay</strong> — payment processing. Razorpay&apos;s privacy policy applies to payment data they handle.</li>
              <li><strong>Resend</strong> — transactional email delivery. Resend&apos;s privacy policy applies to email delivery data they handle.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Cookies and analytics</h2>
            <p>This store does not use advertising trackers. Essential cookies may be used for the checkout session. Analytics, if present, are first-party only and do not share data with third-party advertising networks.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Data retention</h2>
            <p>We retain your name, email, and order records for as long as necessary to fulfil the purchase, handle support requests, and comply with legal obligations. Download tokens expire after 7 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Your rights</h2>
            <p>You may request access to, correction of, or deletion of your personal data by contacting <a href={`mailto:${SUPPORT_EMAIL}`} className="underline" style={{ color: "#1C92FF" }}>{SUPPORT_EMAIL}</a>. We will respond within a reasonable timeframe.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Changes to this policy</h2>
            <p>We may update this privacy policy from time to time. Material changes will be noted on this page with an updated date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Contact</h2>
            <p>For privacy questions or data requests, contact <a href={`mailto:${SUPPORT_EMAIL}`} className="underline" style={{ color: "#1C92FF" }}>{SUPPORT_EMAIL}</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
