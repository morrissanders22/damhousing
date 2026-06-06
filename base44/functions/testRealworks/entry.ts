import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = Deno.env.get("REALWORKS_API_TOKEN");

    // Try the Realworks v3 API for aanbod
    const response = await fetch("https://api.realworks.nl/wonen/v3/objecten", {
      headers: {
        "Authorization": `rwauth ${token}`,
        "Content-Type": "application/json",
      }
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    return Response.json({
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data: data
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});