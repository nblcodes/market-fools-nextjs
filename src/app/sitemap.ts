import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const homeUrl = absoluteUrl("/");
  if (!homeUrl) return [];

  return [
    {
      url: homeUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

