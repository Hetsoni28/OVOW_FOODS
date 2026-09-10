import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/api/", "/order-action/", "/receipt/"],
      },
    ],
    sitemap: "https://ovow-foods.vercel.app/sitemap.xml",
  };
}
