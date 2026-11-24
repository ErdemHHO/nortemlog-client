import type { Metadata } from "next";
import { site } from "@/lib/site";

interface PageMeta {
  title: string;
  description: string;
  path: string;
}

/** Builds complete per-page metadata: title, description, canonical, Open Graph, Twitter. */
export function buildMetadata({ title, description, path }: PageMeta): Metadata {
  const fullTitle = path === "/" ? title : `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title: fullTitle,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export const absoluteUrl = (path: string): string => new URL(path, site.url).toString();
