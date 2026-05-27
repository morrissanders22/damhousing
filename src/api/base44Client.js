import { createClient } from "@base44/sdk";

// Public Dam Housing app (public_without_login). The SDK issues relative
// "/api/..." requests, which next.config.ts rewrites to https://app.base44.com.
export const base44 = createClient({
  appId: "69de2de67917694d33fdfed5",
  serverUrl: "",
  requiresAuth: false,
});
