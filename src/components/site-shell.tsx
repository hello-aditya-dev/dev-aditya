"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

/**
 * SiteShell — wraps page content with the paperfolio Navigation + Footer
 * everywhere EXCEPT:
 *   - the /digital-products store, which renders its own StoreNav +
 *     StoreFooter via src/app/digital-products/layout.tsx
 *   - the /templates showcase, which renders its own route-local
 *     TemplatesNav + TemplatesFooter via src/app/templates/layout.tsx
 *
 * Both exceptions use the same established escape hatch so their routes
 * can own their chrome. Every other route keeps the shared Navigation +
 * Footer exactly as before.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStore = pathname?.startsWith("/digital-products") ?? false;
  const isTemplates = pathname?.startsWith("/templates") ?? false;

  if (isStore || isTemplates) {
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
