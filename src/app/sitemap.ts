import type { MetadataRoute } from "next";
import { getAllProperties } from "@/lib/realworks-server";

const BASE_URL = "https://damhousing.nl";

// Generated at request time so the live Realworks listings are always included
// (the token is a runtime env var, not present during the static build).
export const dynamic = "force-dynamic";

const STATIC_PATHS = [
  "",
  "/aanbod",
  "/diensten",
  "/verkoop",
  "/aankoop",
  "/verhuur",
  "/taxatie",
  "/over-dam-housing",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/aanbod" || path === "" ? "daily" : "monthly",
    priority: path === "" ? 1 : path === "/aanbod" ? 0.9 : 0.7,
  }));

  let propertyEntries: MetadataRoute.Sitemap = [];
  try {
    const properties = await getAllProperties();
    propertyEntries = properties.map((p) => ({
      url: `${BASE_URL}/woning/${p.id}`,
      lastModified: p.listed_date ? new Date(p.listed_date) : now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    // If Realworks is unreachable at build/request time, still serve the
    // static sitemap rather than failing the whole route.
  }

  return [...staticEntries, ...propertyEntries];
}
