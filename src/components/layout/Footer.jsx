"use client";
import React from "react";
import { Link, useNavigate, useLocation } from '@/lib/router';
import { ArrowUpRight } from "lucide-react";

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";

  return (
    <footer className="bg-obsidian text-limestone">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16 pb-6 lg:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-block mb-6 hover:opacity-80 transition-opacity duration-300"
            >
              {/* White logo with the red DAM block — no panel needed on the dark footer. */}
              <img
                src="/dam-logo-whitered-trim.png"
                alt="DAM housing"
                className="h-24 w-auto object-contain"
              />
            </Link>
            <p className="text-limestone/50 max-w-md leading-relaxed" style={{ fontSize: '15px' }}>
              Persoonlijk, ervaren en betrokken. Jouw vertrouwde makelaar &amp; taxateur in de regio Amstelveen en omstreken.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://www.facebook.com/damhousing/" target="_blank" rel="noopener noreferrer" className="text-limestone/40 hover:text-limestone transition-colors duration-300">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/damhousing/" target="_blank" rel="noopener noreferrer" className="text-limestone/40 hover:text-limestone transition-colors duration-300">
                <InstagramIcon />
              </a>
              <a href="https://nl.linkedin.com/in/karen-brussee-dam" target="_blank" rel="noopener noreferrer" className="text-limestone/40 hover:text-limestone transition-colors duration-300">
                <LinkedInIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium tracking-widest uppercase text-limestone/40 mb-6">Navigatie</h3>
            <ul className="space-y-3">
              {[
                { label: "Woningaanbod", path: "/aanbod" },
                { label: "Diensten", path: "/diensten" },
                { label: "Over Ons", path: "/over-dam-housing" },
                { label: "Contact", path: "/contact" },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-limestone/60 hover:text-primary transition-colors duration-300 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium tracking-widest uppercase text-limestone/40 mb-6">Contact</h3>
            <ul className="space-y-3 text-sm text-limestone/60">
              <li><a href="tel:+31208200159" className="hover:text-primary transition-colors duration-300">020 - 820 0159</a></li>
              <li><a href="mailto:info@damhousing.nl" className="hover:text-primary transition-colors duration-300">info@damhousing.nl</a></li>
              <li>Amstelveen, Nederland</li>
            </ul>
            {!isContactPage && (
              <div className="mt-8">
                <button
                  onClick={() => navigate("/contact")}
                  className="inline-flex items-center gap-2 px-3 py-2 text-xs font-normal tracking-wider cursor-pointer"
                  style={{ backgroundColor: 'transparent', color: '#f5f0eb', border: '0.5px solid rgba(245,240,235,0.4)', transition: 'border-color 0.3s, color 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,240,235,0.9)'; e.currentTarget.style.color = '#ffffff'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,240,235,0.4)'; e.currentTarget.style.color = '#f5f0eb'; }}
                >
                  Neem contact op <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 pt-8 border-t hairline border-limestone/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6">
            <p className="text-xs text-limestone/30">© {new Date().getFullYear()} DAM housing. Alle rechten voorbehouden.</p>
            <div className="flex gap-6 text-xs text-limestone/30">
              <span>Privacy</span>
              <span>Voorwaarden</span>
            </div>
          </div>
          <div className="mt-8 w-full h-px relative overflow-hidden">
            <svg viewBox="0 0 1200 30" className="w-full h-8 text-limestone/10" preserveAspectRatio="none">
              <path
                d="M0,28 L50,28 L50,20 L55,15 L60,20 L60,28 L100,28 L100,18 L103,12 L106,18 L106,28 L140,28 L140,22 L150,8 L160,22 L160,28 L200,28 L200,16 L205,10 L210,16 L210,28 L280,28 L280,20 L285,14 L290,20 L290,28 L350,28 L350,22 L360,6 L370,22 L370,28 L450,28 L450,18 L455,12 L460,18 L460,28 L520,28 L520,20 L530,10 L540,20 L540,28 L600,28 L600,16 L605,10 L610,16 L610,28 L700,28 L700,22 L710,4 L720,22 L720,28 L800,28 L800,18 L805,12 L810,18 L810,28 L880,28 L880,20 L885,14 L890,20 L890,28 L950,28 L950,22 L960,8 L970,22 L970,28 L1050,28 L1050,16 L1055,10 L1060,16 L1060,28 L1120,28 L1120,20 L1125,15 L1130,20 L1130,28 L1200,28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}