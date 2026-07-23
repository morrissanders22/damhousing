"use client";
import React from "react";
import { Link } from '@/lib/router';
import { X, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import DamLogo from "../shared/DamLogo";

const menuLinks = [
  { label: "Home", path: "/" },
  { label: "Woningaanbod", path: "/aanbod" },
  { label: "Diensten", path: "/diensten" },
  { label: "Over Ons", path: "/over-dam-housing" },
  { label: "Contact", path: "/contact" },
];

export default function SlidingMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full sm:w-[400px] bg-obsidian text-limestone overflow-y-auto"
          >
            <div className="p-8 lg:p-12 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <DamLogo variant="light" size="sm" asLink={false} />
                <button onClick={onClose} aria-label="Menu sluiten" className="p-2 hover:text-primary transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1">
                <ul className="space-y-1">
                  {menuLinks.map((link, i) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        onClick={onClose}
                        className="group flex items-center justify-between py-4 pl-4 border-b hairline border-limestone/10 hover:border-primary/50 transition-all duration-300"
                      >
                        <span className="font-display text-xl lg:text-2xl group-hover:text-primary transition-colors duration-300">
                          {link.label}
                        </span>
                        <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto pt-12 space-y-4 text-sm text-limestone/60">
                <div className="flex items-center gap-3">
                   <Phone className="w-4 h-4" />
                   <a href="tel:+31208200159" className="hover:text-primary transition-colors duration-300">020 - 820 0159</a>
                 </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:info@damhousing.nl" className="hover:text-primary transition-colors duration-300">info@damhousing.nl</a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>Amstelveen, Nederland</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}