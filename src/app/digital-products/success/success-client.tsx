"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Download,
  ArrowRight,
  Loader2,
  AlertCircle,
  Mail,
} from "lucide-react";

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const productId = searchParams.get("productId");

  const [loading, setLoading] = useState(true);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [productName, setProductName] = useState<string>("your product");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrderStatus() {
      if (!orderId) {
        setError("Missing order information. Check your email for the download link.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `/api/digital-products/order-status?orderId=${orderId}`
        );
        if (!res.ok) {
          throw new Error("Could not retrieve order status.");
        }
        const data = await res.json();
        setProductName(data.productName || "your product");
        setCustomerEmail(data.customerEmail || "");
        setDownloadUrl(data.downloadUrl || null);
      } catch (err) {
        setError("Could not retrieve download details. Check your email for the download link, or contact support.");
      } finally {
        setLoading(false);
      }
    }

    fetchOrderStatus();
  }, [orderId]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-6">
      <div className="max-w-lg w-full">
        <div
          className="rounded-xl border-2 p-8 text-center"
          style={{
            borderColor: "#0B0B0B",
            backgroundColor: "#FAF9F6",
            boxShadow: "6px 6px 0px 0px #0B0B0B",
          }}
        >
          {loading ? (
            <div className="py-8">
              <Loader2
                className="w-8 h-8 animate-spin mx-auto mb-4"
                style={{ color: "#5E5E5F" }}
              />
              <p className="text-sm" style={{ color: "#5E5E5F" }}>
                Finalising your order…
              </p>
            </div>
          ) : error ? (
            <>
              <AlertCircle
                className="w-12 h-12 mx-auto mb-4"
                style={{ color: "#FF4A60" }}
              />
              <h1 className="text-2xl font-bold mb-2" style={{ color: "#0B0B0B" }}>
                Almost there
              </h1>
              <p className="text-sm mb-6" style={{ color: "#5E5E5F" }}>
                {error}
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:support@dev-aditya.com"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm border-2"
                  style={{
                    backgroundColor: "#0B0B0B",
                    color: "#FAF9F6",
                    borderColor: "#0B0B0B",
                  }}
                >
                  Contact support
                </a>
                <Link
                  href="/digital-products"
                  className="text-sm underline"
                  style={{ color: "#5E5E5F" }}
                >
                  Back to digital products
                </Link>
              </div>
            </>
          ) : (
            <>
              <CheckCircle2
                className="w-12 h-12 mx-auto mb-4"
                style={{ color: "#1C92FF" }}
              />
              <h1 className="text-2xl font-bold mb-2" style={{ color: "#0B0B0B" }}>
                Payment successful.
              </h1>
              <p className="text-lg font-medium mb-1" style={{ color: "#0B0B0B" }}>
                {productName} is yours.
              </p>
              {orderId && (
                <p className="text-xs mb-6" style={{ color: "#5E5E5F" }}>
                  Order reference: {orderId}
                </p>
              )}

              {downloadUrl ? (
                <a
                  href={downloadUrl}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-base border-2 transition-all hover:translate-x-[2px] hover:translate-y-[2px] mb-6"
                  style={{
                    backgroundColor: "#0B0B0B",
                    color: "#FAF9F6",
                    borderColor: "#0B0B0B",
                    boxShadow: "3px 3px 0px 0px #0B0B0B",
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download files
                </a>
              ) : (
                <p className="text-sm mb-6" style={{ color: "#5E5E5F" }}>
                  Your download link is being prepared. Please check your email.
                </p>
              )}

              {customerEmail && (
                <div
                  className="rounded-lg border-2 p-4 mb-4 text-left"
                  style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6" }}
                >
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#5E5E5F" }} />
                    <p className="text-xs" style={{ color: "#5E5E5F" }}>
                      A copy of the download link has been sent to{" "}
                      <strong style={{ color: "#0B0B0B" }}>{customerEmail}</strong>.
                    </p>
                  </div>
                </div>
              )}

              <Link
                href="/digital-products"
                className="inline-flex items-center gap-1 text-sm"
                style={{ color: "#5E5E5F" }}
              >
                <ArrowRight className="w-3 h-3" />
                Browse more products
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
