import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Private / transactional pages — also marked noindex in their metadata
        disallow: ["/studio/", "/api/", "/order-action/", "/receipt/", "/checkout", "/cart", "/orders"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
