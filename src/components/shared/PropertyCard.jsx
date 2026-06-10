"use client";
import React, { useState } from "react";
import { Link } from '@/lib/router';
import { Bed, Bath, Maximize, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const statusLabels = {
  nieuw: "Nieuw",
  onder_bod: "Onder bod",
  verkocht: "Verkocht",
  verhuurd: "Verhuurd",
  beschikbaar: null,
};

const statusColors = {
  nieuw: "bg-primary text-primary-foreground",
  onder_bod: "bg-foreground text-background",
  verkocht: "bg-muted-foreground text-background",
  verhuurd: "bg-muted-foreground text-background",
};

export default function PropertyCard({ property, featured = false, pullUp = false }) {
  const [imageIndex, setImageIndex] = useState(0);
  const images = property.images?.length ? property.images : [property.main_image];
  const statusLabel = statusLabels[property.status];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={pullUp ? "-mt-16" : ""}
    >
      <Link
        to={`/woning/${property.id}`}
        className="group block h-full"
        onMouseEnter={() => images.length > 1 && setImageIndex(1)}
        onMouseLeave={() => setImageIndex(0)}
      >
        <div className={`relative overflow-hidden aspect-[4/3]`}>
          <img
            src={images[imageIndex] || "/placeholder.jpg"}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Only the status badge sits on the photo — price/m² moved below. */}
          {statusLabel && (
            <div className="absolute top-0 left-0 p-4">
              <span className={`text-xs tracking-widest uppercase px-3 py-1.5 ${statusColors[property.status]}`}>
                {statusLabel}
              </span>
            </div>
          )}
        </div>

        <div className="pt-4 pb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                {property.street} {property.house_number}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">{property.city}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 mt-1 flex-shrink-0" />
          </div>

          {/* Price + key specs bundled on one line below the photo. */}
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1.5 mt-3 text-sm">
            {property.price != null && (
              <span className="font-display text-foreground">
                {formatPrice(property.price)}
                {property.price_suffix && (
                  <span className="text-muted-foreground text-xs ml-1">{property.price_suffix}</span>
                )}
              </span>
            )}
            {(property.bedrooms || property.bathrooms || property.area_sqm) && (
              <span className="text-border">·</span>
            )}
            <span className="flex items-center gap-3 text-xs text-muted-foreground">
              {property.bedrooms && (
                <span className="flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5" /> {property.bedrooms}
                </span>
              )}
              {property.bathrooms && (
                <span className="flex items-center gap-1.5">
                  <Bath className="w-3.5 h-3.5" /> {property.bathrooms}
                </span>
              )}
              {property.area_sqm && (
                <span className="flex items-center gap-1.5">
                  <Maximize className="w-3.5 h-3.5" /> {property.area_sqm} m²
                </span>
              )}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}