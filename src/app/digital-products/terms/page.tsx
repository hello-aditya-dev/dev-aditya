import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SUPPORT_EMAIL, SITE_ORIGIN } from "@/config/digital-products";

export const metadata: Metadata = {
  title: "Terms of Service | Aditya Digital Products",
  description: "Terms of service for digital products purchased from Aditya.",
  alternates: {
    canonical: `${SITE_ORIGIN}/digital-products/terms`,
  },
};

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <div className="prose max-w-none space-y-6" style={{ color: "#5E5E5F" }}>
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Scope</h2>
            <p>These terms apply to all digital products purchased from the Aditya digital products store. By completing a purchase, you agree to these terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Products and delivery</h2>
            <p>All products are digital and delivered electronically as downloadable files. No physical goods are shipped. Product contents and file formats are described on each product page.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>License</h2>
            <p>Individual tools are sold under a single-user commercial license: one person may use the product for their own commercial work. Bundles grant a single-user commercial license for each included tool. Templates are sold under a single-site commercial license: the template may be used for one end website. Redistribution, resale, or sharing of product files is prohibited.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Payment</h2>
            <p>Payments are processed by <a href="https://razorpay.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#1C92FF" }}>Razorpay</a>. Card and banking details are handled entirely by Razorpay and never stored on our servers. All prices are listed in USD. Applicable taxes, if any, are included in the displayed price.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Data we collect</h2>
            <p>We collect only the information necessary to process and deliver your purchase: your name and email address. This data is used to send order confirmation, delivery email (via <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#1C92FF" }}>Resend</a>), and download access. We do not sell or share your personal data with third parties beyond what is required for payment processing and email delivery.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Intellectual property</h2>
            <p>All product content, design, and code remain the intellectual property of Aditya. Your purchase grants a license to use the product as described above, not a transfer of ownership.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Disclaimer</h2>
            <p>Products are provided &ldquo;as is&rdquo; without warranty of any kind, express or implied. We do not guarantee specific results from using any product. Our total liability for any claim arising from your purchase is limited to the amount you paid for that product.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Changes to terms</h2>
            <p>We may update these terms from time to time. Continued use of purchased products after changes constitutes acceptance of the updated terms. Material changes will be noted on this page with an updated date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "#0B0B0B" }}>Contact</h2>
            <p>For questions about these terms, contact <a href={`mailto:${SUPPORT_EMAIL}`} className="underline" style={{ color: "#1C92FF" }}>{SUPPORT_EMAIL}</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
