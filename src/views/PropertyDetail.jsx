"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRealworksProperty } from "@/lib/realworks";
import { Link, useParams } from '@/lib/router';
import {
  ArrowLeft, Bed, Bath, Maximize, Calendar, Zap,
  MapPin, ChevronLeft, ChevronRight, Phone
} from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyDetail() {
  const { id: propertyId } = useParams();
  const [imageIndex, setImageIndex] = useState(0);

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => fetchRealworksProperty(propertyId),
    enabled: !!propertyId,
  });

  const formatPrice = (price) =>
    new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(price);

  if (isLoading) {
    return (
      <div className="pt-20 max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <Skeleton className="w-full aspect-[16/9]" />
        <Skeleton className="h-10 w-64 mt-8" />
        <Skeleton className="h-6 w-48 mt-4" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-20 max-w-7xl mx-auto px-6 lg:px-10 py-20 text-center">
        <p className="text-muted-foreground">Woning niet gevonden.</p>
        <Link to="/aanbod" className="text-primary mt-4 inline-block">Terug naar aanbod</Link>
      </div>
    );
  }

  const images = property.images?.length ? property.images : (property.main_image ? [property.main_image] : []);

  return (
    <div className="pt-20">
      {/* Back navigation */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
        <Link to="/aanbod" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Terug naar aanbod
        </Link>
      </div>

      {/* Image Gallery - Cinematic */}
      {images.length > 0 && (
        <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-mist">
          <motion.img
            key={imageIndex}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={images[imageIndex]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={() => setImageIndex((imageIndex - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 hover:bg-background transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setImageIndex((imageIndex + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 hover:bg-background transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === imageIndex ? "bg-limestone" : "bg-limestone/40"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Property Details */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="font-display text-3xl lg:text-4xl text-foreground">
                    {property.street} {property.house_number}
                  </h1>
                  <p className="flex items-center gap-2 text-muted-foreground mt-2">
                    <MapPin className="w-4 h-4" />
                    {property.city}{property.neighborhood ? `, ${property.neighborhood}` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl lg:text-3xl text-primary">
                    {formatPrice(property.price)}
                  </p>
                  <p className="text-sm text-muted-foreground">{property.price_suffix}</p>
                </div>
              </div>

              {/* Specs bar */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border">
                {[
                  { icon: Bed, label: "Slaapkamers", value: property.bedrooms },
                  { icon: Bath, label: "Badkamers", value: property.bathrooms },
                  { icon: Maximize, label: "Woonoppervlakte", value: property.area_sqm ? `${property.area_sqm} m²` : null },
                  { icon: Calendar, label: "Bouwjaar", value: property.year_built },
                ].filter(s => s.value).map((spec, i) => (
                  <div key={i} className="bg-background p-6">
                    <spec.icon className="w-5 h-5 text-primary mb-3" />
                    <p className="text-xs tracking-widest uppercase text-muted-foreground">{spec.label}</p>
                    <p className="font-display text-xl text-foreground mt-1">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              {property.description && (
                <div className="mt-12">
                  <h2 className="font-display text-2xl text-foreground mb-6">Omschrijving</h2>
                  <div className="border-t hairline border-border pt-6 pl-6 pb-6">
                    <p className="text-foreground leading-relaxed whitespace-pre-line pr-6" style={{fontSize: '15px'}}>
                      {property.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Features */}
              {property.features?.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-display text-2xl text-foreground mb-6">Kenmerken</h2>
                  <div className="border-t hairline border-border pt-6 pl-6 pb-6">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {property.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Energy label */}
              {property.energy_label && (
                <div className="mt-12 flex items-center gap-4">
                  <Zap className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs tracking-widest uppercase text-muted-foreground">Energielabel</p>
                    <p className="font-display text-xl text-foreground">{property.energy_label}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar - Sticky CTA */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="bg-mist p-8">
                <h3 className="font-display text-xl text-foreground mb-4">Interesse?</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Neem contact met ons op voor een bezichtiging of meer informatie over deze woning.
                </p>
                <a
                  href="tel:+31625138259"
                  className="flex items-center justify-center gap-3 w-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-wide uppercase hover:bg-foreground transition-colors duration-500"
                >
                  <Phone className="w-4 h-4" />
                  Bel voor bezichtiging
                </a>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-3 w-full border hairline border-border bg-background text-foreground py-4 mt-3 text-sm font-medium tracking-wide uppercase hover:border-primary transition-colors duration-500"
                >
                  Stuur een bericht
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}