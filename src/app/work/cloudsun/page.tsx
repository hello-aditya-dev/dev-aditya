import type { Metadata } from "next";
import { CaseStudyContent, caseStudyBreadcrumb } from "@/components/case-study-content";
import { getProject } from "@/config/projects";

const slug = "cloudsun";
const project = getProject(slug);

export const metadata: Metadata = {
  title: project ? `${project.name} — ${project.industry.split("·")[0].trim()} case study` : "Cloudsun",
  description: project?.outcomeHeadline ?? "Cloudsun case study",
  alternates: { canonical: `/work/${slug}` },
  openGraph: project
    ? {
        title: `${project.name} — case study`,
        description: project.outcomeHeadline,
        url: `/work/${slug}`,
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
