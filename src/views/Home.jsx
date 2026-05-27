"use client";
import React from "react";
import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import FeaturedListings from "../components/home/FeaturedListings";
import AboutSection from "../components/home/AboutSection";
import GoogleReviews from "../components/home/GoogleReviews";
import ContactCTA from "../components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FeaturedListings />
      <AboutSection />
      <GoogleReviews />
      <ContactCTA />
    </>
  );
}