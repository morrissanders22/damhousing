"use client";
import React from "react";
import { Link } from '@/lib/router';

const LOGO_COLOR = "/dam-logo.png";
// White building + HOUSING with the brand-red "DAM" block, for dark/transparent
// surfaces (the hero header before scroll).
const LOGO_WHITE = "/dam-logo-whitered.png";

export default function DamLogo({ variant = "dark", asLink = true }) {
  const isLight = variant === "light";

  const logo = (
    <span className="relative block h-16 w-[120px]">
      {/* White logo — over the dark/transparent header before scroll. */}
      <img
        src={LOGO_WHITE}
        alt="DAM housing"
        className={`absolute h-[72px] object-contain object-left transition-opacity duration-300 ${isLight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{ left: '-4px', top: '-4px' }}
      />
      {/* Colour logo — on the light scrolled navbar background. */}
      <img
        src={LOGO_COLOR}
        alt="DAM housing"
        className={`absolute h-[72px] object-contain object-left transition-opacity duration-300 ${isLight ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        style={{ left: '-4px', top: '-4px' }}
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
