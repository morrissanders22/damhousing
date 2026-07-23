"use client";
import { useEffect, useRef } from "react";

// Move.nl bezichtigingsplanner widget.
//
// Realworks/Move serve a loader (bezichtigingsplanner.js) that, on module
// evaluation, calls `createRoot(getElementById("viewingplanner-widget"))` once
// and reads the data-* attributes a single time. That design assumes a classic
// full-page load. This site navigates client-side (next/link), so two problems
// have to be solved:
//
//  1. The widget renders its own DOM into #viewingplanner-widget. We keep that
//     node OUTSIDE React's control (created imperatively, appended to a host
//     ref) so React never reconciles away the widget's children.
//  2. To show a different listing after a soft navigation we must re-run the
//     widget's top-level init. Re-importing the same module URL is a no-op (ES
//     modules evaluate once), and cache-busting the loader doesn't help because
//     it imports the inner chunk by a fixed relative path. So we discover the
//     inner chunk URL from the loader and import IT with a per-object query,
//     which forces a fresh evaluation against the current widget node.
const LOADER_URL =
  "https://cdn.move.nl/external/bezichtigingsplanner/bezichtigingsplanner.js";

// DAM primary red (globals.css --primary: 353 83% 27%).
const BRAND_COLOR = "#7e0c19";

// Discover the hashed inner-module URL from the loader once. CORS is open
// (access-control-allow-origin: *), so a plain fetch works.
let innerModuleUrlPromise;
function getInnerModuleUrl() {
  if (!innerModuleUrlPromise) {
    innerModuleUrlPromise = fetch(LOADER_URL)
      .then((r) => r.text())
      .then((src) => {
        const m = src.match(/import\(\s*["']([^"']+)["']\s*\)/);
        if (!m) throw new Error("Move loader: inner module import not found");
        return new URL(m[1], LOADER_URL).href;
      });
  }
  return innerModuleUrlPromise;
}

// Re-evaluate the inner module against the current #viewingplanner-widget node.
// Injecting a module <script> with an inline dynamic import keeps the URL opaque
// to the bundler and runs the import natively (no eval / no CSP 'unsafe-eval').
function bootWidget(objectId) {
  return getInnerModuleUrl().then((url) => {
    const busted = `${url}${url.includes("?") ? "&" : "?"}vp=${encodeURIComponent(objectId)}`;
    const script = document.createElement("script");
    script.type = "module";
    script.dataset.viewingplanner = "1";
    script.textContent = `import(${JSON.stringify(busted)});`;
    document.head.appendChild(script);
    return script;
  });
}

export default function ViewingPlanner({ objectId, departmentId, token }) {
  const hostRef = useRef(null);

  useEffect(() => {
    if (!objectId || !departmentId || !token || !hostRef.current) return;

    const host = hostRef.current;
    const el = document.createElement("div");
    el.id = "viewingplanner-widget";
    el.setAttribute("data-viewingplanner-widget-token", token);
    el.setAttribute("data-object-id", String(objectId));
    el.setAttribute("data-department-id", String(departmentId));
    el.setAttribute("data-brand-color", BRAND_COLOR);
    el.setAttribute("data-button-text", "Plan een bezichtiging");
    host.appendChild(el);

    let cancelled = false;
    let scriptEl;
    bootWidget(objectId)
      .then((s) => {
        if (cancelled) s.remove();
        else scriptEl = s;
      })
      .catch((err) => {
        // Non-fatal: the listing keeps the phone CTA. Log for diagnosis.
        console.error("Bezichtigingsplanner kon niet laden:", err);
      });

    return () => {
      cancelled = true;
      if (scriptEl) scriptEl.remove();
      el.remove();
    };
  }, [objectId, departmentId, token]);

  // The widget positions itself fixed to the viewport; this host stays empty.
  return <div ref={hostRef} aria-hidden />;
}
