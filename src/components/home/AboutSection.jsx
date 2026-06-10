"use client";
import React from "react";
import { Link } from '@/lib/router';
import { ArrowRight, Award, MapPin, Handshake, Star } from "lucide-react";
import { motion } from "framer-motion";

const qualities = [
  { icon: Handshake, text: "Advies dat je kunt vertrouwen, altijd eerlijk en direct" },
  { icon: Star, text: "Al meer dan 15 jaar actief in de makelaardij" },
  { icon: MapPin, text: "De regio van Haarlem tot Wilnis ken ik op mijn duimpje" },
  { icon: Award, text: "Registermakelaar Taxateur (RMT), aangesloten bij Vastgoed Nederland" },
];

export default function AboutSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left column - narrow metadata */}
          <div className="lg:col-span-3 bg-background p-6 lg:p-8 lg:border-r border-border">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Over DAM Housing</p>
            <div className="space-y-4">
              {qualities.map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <q.icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">{q.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column - content with photo */}
          <div className="lg:col-span-9 p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Text content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7"
              >
                <motion.h2 
                  className="font-display text-3xl lg:text-5xl text-foreground mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Ik ben Karen —<br />en ik doe het anders
                </motion.h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-3">
                  Geen groot kantoor, geen roulatiesysteem. Jij werkt met mij — van het eerste gesprek tot de sleuteloverdracht.
                </p>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Of je nu koopt, verkoopt, verhuurt of een taxatie nodig hebt, ik neem alle tijd voor je.
                </p>
                <Link
                  to="/over-dam-housing#karen"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-primary hover:text-foreground transition-colors duration-300"
                >
                  Meer over mij <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Karen's photo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="lg:col-span-5"
              >
                <img
                  src="https://media.base44.com/images/public/69de2de67917694d33fdfed5/dcbdf9dc9_FDB-9914.jpg"
                  alt="Karen Dam"
                  className="w-full object-cover rounded-sm"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}