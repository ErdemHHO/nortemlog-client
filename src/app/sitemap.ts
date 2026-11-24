import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const routes = [
  { path: "/", priority: 1 },
  { path: "/hizmetler", priority: 0.9 },
  { path: "/teklif-al", priority: 0.9 },
  { path: "/hakkimizda", priority: 0.7 },
  { path: "/iletisim", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
  }));
}
