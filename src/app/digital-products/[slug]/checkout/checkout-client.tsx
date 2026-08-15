"use client";

import { useState } from "react";
import { type DigitalProduct, accentColors, SUPPORT_EMAIL } from "@/config/digital-products";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Shield,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function CheckoutClient({ product }: { product: DigitalProduct }) {
  const accent = accentColors[product.accent];
  const displayPrice = product.launchPrice ?? product.regularPrice;
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!name.trim() || name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // Create order on server
      const res = await fetch("/api/digital-products/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug: product.slug,
          customerName: name.trim(),
          customerEmail: email.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create order.");
      }

      const { orderId, razorpayOrderId, amount, currency, keyId } = await res.json();

      // Load Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const RazorpayConstructor = (window as unknown as Record<string, unknown>).Razorpay as unknown as new (options: Record<string, unknown>) => { open: () => void; on: (event: string, handler: () => void) => void };
        const rzp = new RazorpayConstructor({
          key: keyId,
          amount: amount,
          currency: currency,
          name: "Aditya Digital Products",
          description: product.name,
          order_id: razorpayOrderId,
          prefill: {
            name: name.trim(),
            email: email.trim(),
          },
          handler: async function (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) {
            try {
              // Verify payment server-side
              const verifyRes = await fetch("/api/digital-products/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  orderId,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              });

              if (!verifyRes.ok) {
                const data = await verifyRes.json();
                throw new Error(data.error || "Payment verification failed.");
              }

              // Redirect to success page
              router.push(
                `/digital-products/success?orderId=${orderId}&productId=${product.id}`
              );
            } catch (err) {
              setError(err instanceof Error ? err.message : "Payment verification failed. Please contact support.");
              setLoading(false);
            }
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
              setError("Payment was cancelled. You can try again.");
            },
          },
          theme: {
            color: "#0B0B0B",
          },
        });
        rzp.open();
      };

      script.onerror = () => {
        setError("Failed to load payment gateway. Please try again.");
        setLoading(false);
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          href={`/digital-products/${product.slug}`}
          className="inline-flex items-center gap-2 text-sm mb-8 hover:underline"
          style={{ color: "#5E5E5F" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {product.name}
        </Link>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Product info (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#5E5E5F" }}>
                Checkout
              </span>
              <h1 className="text-3xl font-bold mt-2" style={{ color: "#0B0B0B" }}>
                {product.name}
              </h1>
            </div>

            {/* Package contents */}
            {product.includes.length > 0 && (
              <div className="rounded-xl border-2 p-5" style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6" }}>
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider" style={{ color: "#5E5E5F" }}>What you get</h3>
                <div className="space-y-2">
                  {product.includes.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm" style={{ color: "#0B0B0B" }}>
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: accent.bg }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* License + formats + delivery */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-lg border-2 p-4" style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6" }}>
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#5E5E5F" }}>License</h3>
                <p className="text-sm" style={{ color: "#0B0B0B" }}>{product.licenseType || "Single-user commercial license"}</p>
              </div>
              <div className="rounded-lg border-2 p-4" style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6" }}>
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#5E5E5F" }}>Formats</h3>
                <p className="text-sm" style={{ color: "#0B0B0B" }}>{product.formats.join(", ")}</p>
              </div>
              <div className="rounded-lg border-2 p-4" style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6" }}>
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#5E5E5F" }}>Delivery</h3>
                <p className="text-sm" style={{ color: "#0B0B0B" }}>Digital download (ZIP)</p>
              </div>
            </div>

            {/* Support/refund links */}
            <div className="flex gap-4 text-sm" style={{ color: "#5E5E5F" }}>
              <Link href="/digital-products/refund-policy" className="underline hover:no-underline">Refund policy</Link>
              <Link href="/digital-products/delivery-policy" className="underline hover:no-underline">Delivery policy</Link>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="underline hover:no-underline">Contact support</a>
            </div>
          </div>

          {/* Right: Order form (2 cols) */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border-2 p-6 sticky top-24" style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6", boxShadow: "4px 4px 0px 0px #0B0B0B" }}>
              {/* Order summary */}
              <h2 className="font-semibold text-lg mb-4" style={{ color: "#0B0B0B" }}>Order summary</h2>
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm" style={{ color: "#0B0B0B" }}>{product.name}</span>
                <span className="font-semibold" style={{ color: "#0B0B0B" }}>${displayPrice}</span>
              </div>
              {product.launchPrice && (
                <div className="flex justify-between items-center mb-4 text-xs" style={{ color: "#5E5E5F" }}>
                  <span>Regular price</span>
                  <span className="line-through">${product.regularPrice}</span>
                </div>
              )}
              <div className="border-t-2 pt-4 mb-6" style={{ borderColor: "#0B0B0B" }}>
                <div className="flex justify-between items-center">
                  <span className="font-semibold" style={{ color: "#0B0B0B" }}>Total</span>
                  <span className="text-xl font-bold" style={{ color: accent.text }}>${displayPrice}</span>
                </div>
              </div>

              {/* Customer info form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: "#0B0B0B" }}>
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1"
                    style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6" }}
                    placeholder="Your full name"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: "#0B0B0B" }}>
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1"
                    style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6" }}
                    placeholder="you@email.com"
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 text-sm rounded-lg p-3" style={{ backgroundColor: "#FF4A6015", color: "#FF4A60" }}>
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-base border-2 transition-all hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#0B0B0B",
                    color: "#FAF9F6",
                    borderColor: "#0B0B0B",
                    boxShadow: "3px 3px 0px 0px #0B0B0B",
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      Continue to secure payment
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-center mt-4" style={{ color: "#5E5E5F" }}>
                Secure payment powered by Razorpay. Card data never touches our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
