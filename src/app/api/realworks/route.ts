import { NextRequest, NextResponse } from "next/server";
import { fetch as undiciFetch, ProxyAgent, type Dispatcher } from "undici";

// Realworks calls run server-side only (the token is secret) on the Node
// runtime, and are never cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REALWORKS_BASE = "https://api.realworks.nl/wonen/v3";

export async function GET(req: NextRequest) {
  const token = process.env.REALWORKS_API_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "REALWORKS_API_TOKEN is niet ingesteld" },
      { status: 500 }
    );
  }

  // Pass through query params (bv. ?aantal=25&start=0).
  const url = `${REALWORKS_BASE}/objecten${req.nextUrl.search}`;

  // Optional static-IP egress proxy. Set REALWORKS_PROXY_URL in production so
  // Realworks sees a fixed IP — Vercel functions have dynamic outbound IPs and
  // cannot be IP-whitelisted directly.
  const proxyUrl = process.env.REALWORKS_PROXY_URL;
  let dispatcher: Dispatcher | undefined;
  if (proxyUrl) {
    dispatcher = new ProxyAgent(proxyUrl);
  }

  // NB: we use undici's own fetch, not Node's global fetch. The ProxyAgent
  // comes from this package's undici; passing it as `dispatcher` to Node 24's
  // built-in (older) undici fetch throws "invalid onRequestStart method"
  // (UND_ERR_INVALID_ARG). undici's fetch + undici's ProxyAgent are matched.
  const init: Parameters<typeof undiciFetch>[1] = {
    headers: {
      Authorization: `rwauth ${token}`,
      "Content-Type": "application/json",
    },
  };
  if (dispatcher) init.dispatcher = dispatcher;

  let res: Awaited<ReturnType<typeof undiciFetch>>;
  try {
    res = await undiciFetch(url, init);
  } catch (err) {
    const e = err as Error & { cause?: { message?: string; code?: string } };
    return NextResponse.json(
      {
        error: "Realworks-aanvraag mislukt",
        detail: e.message,
        cause: e.cause?.message ?? e.cause?.code,
      },
      { status: 502 }
    );
  }

  const body = await res.text();
  try {
    return NextResponse.json(JSON.parse(body), { status: res.status });
  } catch {
    return new NextResponse(body, {
      status: res.status,
      headers: {
        "content-type": res.headers.get("content-type") ?? "text/plain",
      },
    });
  }
}
