"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link } from '@/lib/router';
import { ArrowRight, Search } from "lucide-react";

const HERO_IMAGE = "https://media.base44.com/images/public/69de2de67917694d33fdfed5/4bc4a4c02_generated_b3c79806.png";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Luxurious Amsterdam canal house interior with large windows and afternoon sunlight"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/30 to-obsidian/10" />
      </div>

      {/* Move.nl button - fixed top right */}
      <a
        href="https://www.move.nl"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-24 right-6 lg:right-10 z-20 bg-limestone/10 backdrop-blur-md border hairline border-limestone/20 px-5 py-2.5 text-limestone text-sm font-medium tracking-wide hover:bg-limestone/20 transition-all duration-300"
      >
        Move.nl
      </a>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-limestone/60 text-sm tracking-widest uppercase mb-4">
              Makelaar &amp; Taxateur · Amstelveen
            </p>
            <motion.h1 
              className="font-display text-4xl sm:text-5xl lg:text-7xl text-limestone leading-tight max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Jouw volgende thuis begint hier
            </motion.h1>
            <p className="mt-6 text-limestone/70 max-w-lg text-base lg:text-lg">
              Op zoek naar woningen in Amstelveen en omgeving? Of je nu wilt kopen, verkopen, verhuren of een taxatie nodig hebt — ik help je verder met persoonlijke aandacht en lokale kennis.
            </p>
          </motion.div>

          {/* Search Bar - "Desire Engine" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            <Link
              to="/aanbod"
              className="group inline-flex items-center gap-4 bg-limestone/10 backdrop-blur-md border hairline border-limestone/20 rounded-sm px-6 py-4 hover:bg-limestone/15 transition-all duration-500"
            >
              <Search className="w-5 h-5 text-limestone/50" />
              <span className="text-limestone/60 text-base">
                Ik zoek een <span className="text-limestone font-medium">woning</span> in <span className="text-limestone font-medium">Amsterdam</span>
              </span>
              <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}