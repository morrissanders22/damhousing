"use client";
import React from "react";
import { Link } from '@/lib/router';
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchRealworksProperties } from "@/lib/realworks";
import PropertyCard from "../shared/PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedListings() {
  const { data: allProperties = [], isLoading } = useQuery({
    queryKey: ["properties", "realworks"],
    queryFn: fetchRealworksProperties,
  });
  const properties = allProperties.slice(0, 6);

  return (
    <section className="pt-12 lg:pt-16 pb-12 lg:pb-16 bg-mist">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Uitgelicht Aanbod</p>
            <h2 className="font-display text-3xl lg:text-5xl text-foreground">
              Recent woningaanbod
            </h2>
          </div>
          <Link
            to="/aanbod"
            className="mt-6 lg:mt-0 inline-flex items-center gap-2 text-sm text-primary hover:text-foreground transition-colors duration-300"
          >
            Bekijk volledig aanbod <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-[4/3] w-full" />
                <Skeleton className="h-5 w-48 mt-4" />
                <Skeleton className="h-4 w-32 mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {properties.map((property, i) => (
              <PropertyCard
                key={property.id}
                property={property}
                featured={i === 0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}