import "server-only";
import { cache } from "react";
import { fetch as undiciFetch, ProxyAgent, type Dispatcher } from "undici";
import { isPubliclyVisible, mapRealworksObject } from "./realworks";

// Server-side Realworks fetch for SEO needs (generateMetadata, JSON-LD,
// sitemap). The client lib talks to our /api/realworks proxy via a relative
// URL, which doesn't resolve server-side, so here we call Realworks directly
// with the same token + optional static-IP proxy as the route handler.
// Wrapped in React `cache()` so a single render (metadata + page + JSON-LD)
// only hits Realworks once.

const REALWORKS_BASE = "https://api.realworks.nl/wonen/v3";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RealworksObject = any;

async function fetchObjecten(): Promise<RealworksObject[]> {
  const token = process.env.REALWORKS_API_TOKEN;
  if (!token) return [];

  const proxyUrl = process.env.REALWORKS_PROXY_URL;
  let dispatcher: Dispatcher | undefined;
  if (proxyUrl) dispatcher = new ProxyAgent(proxyUrl);

  const init: Parameters<typeof undiciFetch>[1] = {
    headers: {
      Authorization: `rwauth ${token}`,
      "Content-Type": "application/json",
    },
  };
  if (dispatcher) init.dispatcher = dispatcher;

  try {
    const res = await undiciFetch(`${REALWORKS_BASE}/objecten?aantal=100`, init);
    if (!res.ok) return [];
    const data = (await res.json()) as { resultaten?: RealworksObject[] };
    return data.resultaten || [];
  } catch {
    return [];
  }
}

// Zelfde zichtbaarheidsfilter als de client-kant: ingetrokken, geannuleerde en
// handmatig geblokkeerde objecten komen niet in metadata, JSON-LD of sitemap.
export const getAllProperties = cache(async () => {
  const objecten = await fetchObjecten();
  return objecten.filter(isPubliclyVisible).map(mapRealworksObject);
});

export const getProperty = cache(async (id: string) => {
  const all = await getAllProperties();
  return all.find((p) => String(p.id) === String(id)) || null;
});
