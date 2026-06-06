"use client";
import React from "react";
import { Link } from '@/lib/router';

const LOGO_URL = "/dam-logo.png";

export default function DamLogo({ variant = "dark", size = "md", asLink = true }) {
  const isLight = variant === "light";

  const logo = (
    <span className="relative block h-16 w-[120px]">
      {/* White text logo — visible before scroll */}
      <span
        className={`absolute inset-0 flex flex-col justify-center leading-none select-none transition-opacity duration-300 ${isLight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <span className="font-display text-2xl tracking-wider text-white">DAM</span>
        <span className="font-body font-light text-[10px] tracking-[0.25em] uppercase text-white/80">housing</span>
      </span>
      {/* PNG logo — visible after scroll */}
      <img
        src={LOGO_URL}
        alt="DAM housing"
        className={`absolute h-[72px] object-contain object-left transition-opacity duration-300 ${isLight ? "opacity-0" : "opacity-100"}`} style={{ left: '-4px', top: '-4px' }}
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