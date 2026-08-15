import type { Metadata } from "next";
import { ResourceArticleContent } from "@/components/resource-article-content";
import { getResource } from "@/config/resources";

const slug = "frontend-qa";
const resource = getResource(slug);

export const metadata: Metadata = {
  title: resource?.title ?? "frontend-qa",
  description: resource?.description ?? "",
  alternates: { canonical: `/resources/${slug}` },
};

export default function Page() {
  return <ResourceArticleContent slug={slug} />;
}
