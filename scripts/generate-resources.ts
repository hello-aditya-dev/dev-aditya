/**
 * Generates the 3 resource article page.tsx files.
 * Each is a thin wrapper around ResourceArticleContent.
 */

import * as fs from "node:fs";
import * as path from "node:path";

const RESOURCES_TS = "src/config/resources.ts";
const OUT_DIR = "src/app/resources";

const file = fs.readFileSync(RESOURCES_TS, "utf-8");
const slugMatches = [...file.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
const slugs = slugMatches.map((m) => m[1]);

for (const slug of slugs) {
  const dir = path.join(OUT_DIR, slug);
  fs.mkdirSync(dir, { recursive: true });

  const content = `import type { Metadata } from "next";
import { ResourceArticleContent } from "@/components/resource-article-content";
import { getResource } from "@/config/resources";

const slug = ${JSON.stringify(slug)};
const resource = getResource(slug);

export const metadata: Metadata = {
  title: resource?.title ?? ${JSON.stringify(slug)},
  description: resource?.description ?? "",
  alternates: { canonical: \`/resources/\${slug}\` },
};

export default function Page() {
  return <ResourceArticleContent slug={slug} />;
}
`;

  fs.writeFileSync(path.join(dir, "page.tsx"), content);
  console.log(`✓ ${slug}`);
}

console.log(`\nGenerated ${slugs.length} resource articles.`);
