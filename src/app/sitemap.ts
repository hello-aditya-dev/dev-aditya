import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { PROJECTS } from "@/config/projects";
import { RESOURCES } from "@/config/resources";
import { digitalProducts, SITE_ORIGIN } from "@/config/digital-products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Paperfolio static routes ──
  const staticRoutes: { route: string; priority: number }[] = [
    { route: "", priority: 1 },
    { route: "/work", priority: 0.9 },
    { route: "/capabilities", priority: 0.9 },
    { route: "/process", priority: 0.9 },
    { route: "/contact", priority: 0.9 },
    { route: "/about", priority: 0.8 },
    { route: "/resources", priority: 0.8 },
    { route: "/mentoring", priority: 0.7 },
    { route: "/privacy", priority: 0.4 },
    { route: "/terms", priority: 0.4 },
    { route: "/accessibility", priority: 0.4 },
    { route: "/audit", priority: 0.5 },
  ];

  const projectRoutes = PROJECTS.map((p) => ({
    route: p.caseStudyUrl,
    priority: 0.7,
  }));

  const resourceRoutes = RESOURCES.map((r) => ({
    route: `/resources/${r.slug}`,
    priority: 0.6,
  }));

  const paperfolio = [...staticRoutes, ...projectRoutes, ...resourceRoutes].map(
    ({ route, priority }) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    }),
  );

  // ── Digital-products store routes ──
  const storeRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_ORIGIN}/digital-products`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  const activeProducts = digitalProducts.filter((p) => p.status === "active");
  for (const product of activeProducts) {
    storeRoutes.push({
      url: `${SITE_ORIGIN}/digital-products/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    });
  }

  return [...paperfolio, ...storeRoutes];
}
