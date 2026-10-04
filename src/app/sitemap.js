import { getSiteUrl } from "@/lib/siteUrl";

const BASE = getSiteUrl();

// Single-page site — one URL to list.
export default function sitemap() {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
  ];
}
