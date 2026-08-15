import type { Metadata } from "next";
import { Suspense } from "react";
import SuccessClient from "./success-client";

export const metadata: Metadata = {
  title: "Purchase Successful | Aditya Digital Products",
  robots: { index: false, follow: false },
};

function SuccessFallback() {
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
          <div className="py-8">
            <div
              className="w-8 h-8 animate-spin mx-auto mb-4 rounded-full border-2 border-t-transparent"
              style={{ borderColor: "#E8E7E4", borderTopColor: "transparent" }}
            />
            <p className="text-sm" style={{ color: "#5E5E5F" }}>
              Loading order details…
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessFallback />}>
      <SuccessClient />
    </Suspense>
  );
}
