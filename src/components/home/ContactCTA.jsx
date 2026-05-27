"use client";
import React from "react";
import { Link } from '@/lib/router';
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactCTA() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Contact</p>
          <h2 className="font-display text-3xl lg:text-5xl xl:text-6xl text-foreground max-w-2xl mx-auto">
            Even kennismaken?
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md mx-auto">
            Geen verplichtingen, gewoon een goed gesprek.
          </p>
          <p className="mt-1 text-muted-foreground max-w-md mx-auto">
            Bel, mail of stuur me een appje — ik reageer snel.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 mt-8 bg-primary text-primary-foreground px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-foreground transition-colors duration-500"
          >
            Contact opnemen <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}