import type { Metadata } from "next";
import { ResourceArticleContent } from "@/components/resource-article-content";
import { getResource } from "@/config/resources";

const slug = "ai-website-agency";
const resource = getResource(slug);

export const metadata: Metadata = {
  title: resource?.title ?? "ai-website-agency",
  description: resource?.description ?? "",
  alternates: { canonical: `/resources/${slug}` },
};

export default function Page() {
  return <ResourceArticleContent slug={slug} />;
}
