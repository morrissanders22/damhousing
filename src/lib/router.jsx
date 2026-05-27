"use client";

// Compatibility shim that maps the small react-router-dom surface this app
// used onto Next.js' App Router primitives, so the ported pages/components
// keep working unchanged (Link `to=`, useLocation, useNavigate, useParams).
import { useMemo } from "react";
import NextLink from "next/link";
import {
  usePathname,
  useRouter,
  useParams as useNextParams,
} from "next/navigation";

export function Link({ to, href, ...props }) {
  return <NextLink href={to ?? href ?? "#"} {...props} />;
}

export function useLocation() {
  const pathname = usePathname();
  // `search` is intentionally not derived from useSearchParams(): that would
  // force a CSR bailout/Suspense boundary on every page (Navbar uses this).
  return useMemo(() => ({ pathname, search: "" }), [pathname]);
}

export function useNavigate() {
  const router = useRouter();
  return (to, options) => {
    if (typeof to === "number") {
      if (to < 0) router.back();
      else router.forward();
      return;
    }
    if (options?.replace) router.replace(to);
    else router.push(to);
  };
}

export function useParams() {
  return useNextParams();
}
