"use client";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from '@/lib/router';
import { Menu, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SlidingMenu from "./SlidingMenu";
import DamLogo from "../shared/DamLogo";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [location.pathname]);

  // The header is always a solid white bar with the full-colour logo.
  const navBg = "bg-background/95 backdrop-blur-md border-b hairline border-border";
  const textColor = "text-foreground";
  const hoverColor = "hover:text-primary";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            <DamLogo variant="dark" />

            <div className="hidden md:flex items-center gap-10">
              <Link to="/aanbod" className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${hoverColor} ${textColor}`}>
                Aanbod
              </Link>
              <div 
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link to="/diensten" className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${hoverColor} flex items-center gap-1 ${textColor}`}>
                  Diensten <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                </Link>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full rounded-sm min-w-[150px] overflow-hidden bg-background shadow-lg"
                    >
                      {[
                        { to: "/verkoop", label: "Verkoop" },
                        { to: "/aankoop", label: "Aankoop" },
                        { to: "/verhuur", label: "Verhuur" },
                        { to: "/taxatie", label: "Taxatie" },
                      ].map(({ to, label }) => (
                        <Link
                          key={to}
                          to={to}
                          className="block px-4 py-3 text-sm transition-colors text-foreground hover:bg-secondary"
                        >
                          {label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link to="/over-dam-housing" className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${hoverColor} ${textColor}`}>
                Over
              </Link>
              <Link to="/contact" className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${hoverColor} ${textColor}`}>
                Contact
              </Link>
              {/* Move.nl — primary call-to-action for bidding, kept on the top row. */}
              <a
                href="https://www.move.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium tracking-wide uppercase px-4 py-2 border transition-colors duration-300 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Move.nl
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a href="tel:+31208200159" className={`hidden lg:flex items-center gap-2 text-sm transition-colors duration-300 ${hoverColor} ${textColor}`}>
                <Phone className="w-4 h-4" />
                <span>020 - 820 0159</span>
              </a>
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Menu openen"
                className={`p-2 transition-colors duration-300 ${textColor} ${hoverColor}`}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SlidingMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}