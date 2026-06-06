"use client";
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRealworksProperties } from "@/lib/realworks";
import PropertyCard from "../components/shared/PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Properties() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("-created_date");
  const [showFilters, setShowFilters] = useState(false);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties", "realworks"],
    queryFn: fetchRealworksProperties,
  });

  const statusOrder = { beschikbaar: 0, nieuw: 0, onder_bod: 1, verhuurd: 2, verkocht: 3 };

  const filtered = useMemo(() => {
    let result = properties;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.city?.toLowerCase().includes(q) ||
        p.street?.toLowerCase().includes(q) ||
        p.neighborhood?.toLowerCase().includes(q) ||
        p.title?.toLowerCase().includes(q)
      );
    }
    if (typeFilter !== "all") {
      result = result.filter(p => p.type === typeFilter);
    }
    if (sortBy === "price_asc") {
      result = [...result].sort((a, b) => {
        const statusDiff = (statusOrder[a.status] ?? 1) - (statusOrder[b.status] ?? 1);
        if (statusDiff !== 0) return statusDiff;
        return (a.price || 0) - (b.price || 0);
      });
    } else if (sortBy === "price_desc") {
      result = [...result].sort((a, b) => {
        const statusDiff = (statusOrder[a.status] ?? 1) - (statusOrder[b.status] ?? 1);
        if (statusDiff !== 0) return statusDiff;
        return (b.price || 0) - (a.price || 0);
      });
    } else {
      // Default: beschikbaar/nieuw first, oldest listings first (stille verkoop prioriteit)
      result = [...result].sort((a, b) => {
        const statusDiff = (statusOrder[a.status] ?? 1) - (statusOrder[b.status] ?? 1);
        if (statusDiff !== 0) return statusDiff;
        return new Date(a.created_date) - new Date(b.created_date);
      });
    }
    return result;
  }, [properties, search, typeFilter, sortBy]);

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-mist">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Woningaanbod</p>
            <motion.h1 
              className="font-display text-3xl lg:text-5xl text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ontdek jouw nieuwe thuis
            </motion.h1>
          </motion.div>

          {/* Search & Filters */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Zoek op stad, straat of wijk..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-11 bg-background border-border h-12 text-sm"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 h-12 border hairline border-border bg-background text-sm text-foreground hover:border-primary transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 flex flex-wrap gap-4"
            >
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48 h-10 bg-background text-sm">
                  <SelectValue placeholder="Type woning" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle types</SelectItem>
                  <SelectItem value="appartement">Appartement</SelectItem>
                  <SelectItem value="woonhuis">Woonhuis</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 h-10 bg-background text-sm">
                  <SelectValue placeholder="Sorteren" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-created_date">Langst online eerst</SelectItem>
                  <SelectItem value="price_asc">Prijs oplopend</SelectItem>
                  <SelectItem value="price_desc">Prijs aflopend</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <p className="text-sm text-muted-foreground mb-8">
          {filtered.length} {filtered.length === 1 ? "woning" : "woningen"} gevonden
        </p>

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
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Geen woningen gevonden.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {filtered.map((property, i) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}