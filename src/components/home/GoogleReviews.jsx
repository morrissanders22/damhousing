"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    name: "Jan Pieters",
    text: "Uitstekende service en zeer professioneel. Karen begrijpt precies wat je nodig hebt.",
    rating: 5
  },
  {
    name: "Marie van der Berg",
    text: "Persoonlijke aandacht en geen gedoe. Precies wat je van een makelaar hoopt!",
    rating: 5
  },
  {
    name: "Robert Straaten",
    text: "Zeer tevreden met de taxatie en advies. Knowledgeable en betrouwbaar.",
    rating: 5
  },
  {
    name: "Sophia Janssen",
    text: "Geweldige ervaring van begin tot eind. Karen zet zich echt voor je in.",
    rating: 5
  },
  {
    name: "Paul de Vries",
    text: "Professioneel, snel en eerlijk. Zeker aan te bevelen voor iedereen in Amstelveen.",
    rating: 5
  }
];

export default function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(reviews.length / itemsPerSlide);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const visibleReviews = reviews.slice(
    currentIndex * itemsPerSlide,
    currentIndex * itemsPerSlide + itemsPerSlide
  );

  return (
    <div className="bg-mist">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Reviews</p>
          <h2 className="font-display text-2xl lg:text-3xl text-foreground mb-12">
            Wat klanten zeggen
          </h2>
        </motion.div>

        <div className="relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visibleReviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-background p-8 rounded-sm border hairline border-border"
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                  </div>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#EA4335"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#4285F4"/>
                  </svg>
                </div>
                <p className="text-foreground text-base leading-relaxed mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="text-sm font-medium text-foreground">
                  {review.name}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={goToPrevious}
              className="p-2 border hairline border-border hover:bg-mist transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-3">
              {Array(totalSlides)
                .fill(0)
                .map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex ? "bg-primary w-6" : "bg-border w-2 hover:bg-muted"
                    }`}
                  />
                ))}
            </div>

            <button
              onClick={goToNext}
              className="p-2 border hairline border-border hover:bg-mist transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}