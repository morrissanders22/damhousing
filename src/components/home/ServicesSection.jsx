"use client";
import React from "react";
import { Link } from '@/lib/router';
import { ArrowRight, Home, FileText, Key, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Verkoop",
    subtitle: "Ik verkoop",
    description: "Ik verkoop jouw woning slim en snel — van fotografie tot de handtekening bij de notaris.",
    icon: Home,
    path: "/verkoop",
  },
  {
    title: "Taxatie",
    subtitle: "Ik waardeer",
    description: "NWWI-gecertificeerde taxatie die alle banken accepteren — snel, helder en betrouwbaar.",
    icon: FileText,
    path: "/taxatie",
  },
  {
    title: "Verhuur",
    subtitle: "Ik verhuur",
    description: "Ik regel alles rondom de verhuur van jouw woning — van huurprijsbepaling tot een goed contract.",
    icon: Key,
    path: "/verhuur",
  },
  {
    title: "Aankoop",
    subtitle: "Ik begeleid",
    description: "Ik sta aan jouw kant bij het zoeken, bieden en kopen — zodat je nooit teveel betaalt.",
    icon: ShoppingBag,
    path: "/aankoop",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Mijn Diensten</p>
            <motion.h2 
              className="font-display text-3xl lg:text-5xl text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Wat kan ik<br />voor je betekenen?
            </motion.h2>
          </div>
          <Link
            to="/diensten"
            className="mt-6 lg:mt-0 inline-flex items-center gap-2 text-sm text-primary hover:text-foreground transition-colors duration-300"
          >
            Alle diensten <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                to={service.path}
                className="group block bg-background p-8 lg:p-10 h-full hover:bg-mist transition-colors duration-500"
              >
                <service.icon className="w-6 h-6 text-primary mb-8" />
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  {service.subtitle}
                </p>
                <motion.h3 
                  className="font-display text-2xl text-foreground mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {service.title}
                </motion.h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  {service.description}
                </p>
                <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}