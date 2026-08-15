/**
 * Generates a case-study page.tsx for every project in projects.ts.
 *
 * Output: src/app/work/<slug>/page.tsx
 * Each file imports CaseStudyContent and the project's slug, exports
 * metadata + JSON-LD breadcrumb.
 */

import * as fs from "node:fs";
import * as path from "node:path";

const PROJECTS_TS = "src/config/projects.ts";
const OUT_DIR = "src/app/work";

const file = fs.readFileSync(PROJECTS_TS, "utf-8");
// Pull slugs from the file (regex on the slug: '...' line)
const slugMatches = [...file.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
const slugs = slugMatches.map((m) => m[1]);

if (slugs.length === 0) {
  console.error("No project slugs found.");
  process.exit(1);
}

// Capitalize slug into a display name fallback for metadata.
function titleCase(slug: string): string {
  return slug
    .split(/[-_]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

for (const slug of slugs) {
  const dir = path.join(OUT_DIR, slug);
  fs.mkdirSync(dir, { recursive: true });

  const content = `import type { Metadata } from "next";
import { CaseStudyContent, caseStudyBreadcrumb } from "@/components/case-study-content";
import { getProject } from "@/config/projects";

const slug = ${JSON.stringify(slug)};
const project = getProject(slug);

export const metadata: Metadata = {
  title: project ? \`\${project.name} — \${project.industry.split("·")[0].trim()} case study\` : ${JSON.stringify(titleCase(slug))},
  description: project?.outcomeHeadline ?? ${JSON.stringify(titleCase(slug) + " case study")},
  alternates: { canonical: \`/work/\${slug}\` },
  openGraph: project
    ? {
        title: \`\${project.name} — case study\`,
        description: project.outcomeHeadline,
        url: \`/work/\${slug}\`,
      }
    : undefined,
};

export default function Page() {
  return (
    <>
      {project && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyBreadcrumb(project)) }}
        />
      )}
      <CaseStudyContent slug={slug} />
    </>
  );
}
`;

  fs.writeFileSync(path.join(dir, "page.tsx"), content);
  console.log(`✓ ${slug}`);
}

console.log(`\nGenerated ${slugs.length} case study pages.`);
