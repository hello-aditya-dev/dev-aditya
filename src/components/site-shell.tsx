"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

/**
 * SiteShell — wraps page content with the paperfolio Navigation + Footer
 * everywhere EXCEPT the /digital-products store, which renders its own
 * StoreNav + StoreFooter via src/app/digital-products/layout.tsx.
 *
 * /templates uses the same shared Navigation + Footer as the rest of the
 * site (the header includes a Templates item site-wide per the owner's
 * request), so it needs no special casing.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStore = pathname?.startsWith("/digital-products") ?? false;

  if (isStore) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Navigation />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
