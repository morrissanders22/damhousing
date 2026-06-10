"use client";
import React from "react";
import { Link } from '@/lib/router';

// Trimmed assets (transparent margins removed) so the logo reads noticeably
// larger at the same height.
const LOGO_COLOR = "/dam-logo-trim.png";
// White building + HOUSING with the brand-red "DAM" block, for dark/transparent
// surfaces (the hero header before scroll).
const LOGO_WHITE = "/dam-logo-whitered-trim.png";

export default function DamLogo({ variant = "dark", asLink = true }) {
  const isLight = variant === "light";

  const logo = (
    <span className="relative flex items-center h-20 w-[150px]">
      {/* White logo — over the dark/transparent header before scroll. */}
      <img
        src={LOGO_WHITE}
        alt="DAM housing"
        className={`absolute left-0 h-[76px] w-auto object-contain object-left transition-opacity duration-300 ${isLight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      {/* Colour logo — on the light scrolled navbar background. */}
      <img
        src={LOGO_COLOR}
        alt="DAM housing"
        className={`absolute left-0 h-[76px] w-auto object-contain object-left transition-opacity duration-300 ${isLight ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      />
    </span>
  );

  if (!asLink) return logo;

  return (
    <Link to="/" className="hover:opacity-80 transition-opacity duration-300">
      {logo}
    </Link>
  );
}
