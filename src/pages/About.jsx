import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Award, MapPin, Handshake, Star, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";
import GoogleReviews from "../components/home/GoogleReviews.jsx";

const values = [
  { icon: Handshake, title: "Persoonlijk", description: "Elke klant krijgt mijn onverdeelde aandacht, ongeacht de omvang van het object." },
  { icon: Star, title: "Ervaren", description: "Ruime ervaring in de makelaardij met diepgaande kennis van de lokale markt." },
  { icon: Shield, title: "Betrouwbaar", description: "Gecertificeerd en transparant, je weet altijd waar je aan toe bent." },
  { icon: MapPin, title: "Lokaal", description: "Van Haarlem tot Wilnis, van Amsterdam tot Aalsmeer, dit is mijn werkgebied." },
];

const certifications = [
  "VBO Makelaar",
  "NWWI Gevalideerd Taxateur",
  "AVG OK Gecertificeerd",
  "MMCEPI Gecertificeerd",
  "Vastgoed Nederland",
  "Funda Partner",
];

export default function About() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Over</p>
              <motion.h1 
                className="font-display text-3xl lg:text-5xl xl:text-6xl text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Over DAM housing
              </motion.h1>
              <motion.p 
                className="text-base text-muted-foreground mt-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                DAM housing: jouw makelaar/taxateur in regio Amstelveen. Sinds 2010 werkzaam in de makelaardij, met passie en expertise als kernwaarden.
              </motion.p>
              <motion.p 
                className="text-base text-muted-foreground mt-4 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Of het nu gaat om een groot object of een klein appartement, je krijgt onverdeelde aandacht. Als eenmanszaak bepaal ik zelf mijn agenda. Dat betekent dat ik alle tijd voor je heb; ik ben nooit bezig met een volgende afspraak.
              </motion.p>
            </div>
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img
                  src="https://media.base44.com/images/public/69de2de67917694d33fdfed5/7bb595249_champ2lr.jpg"
                  alt="DAM Housing Team"
                  className="w-full object-cover rounded-sm"
                />
              </motion.div>
            </div>
          </div>
          </motion.div>
        </div>

          {/* About Content */}
          <div className="bg-mist" id="karen" style={{ scrollMarginTop: '60px' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <img
                src="https://media.base44.com/images/public/69de2de67917694d33fdfed5/dcbdf9dc9_FDB-9914.jpg"
                alt="Karen Dam"
                className="w-full object-contain mb-6"
                style={{ maxHeight: '450px' }}
              />
              <motion.p 
                className="text-xs tracking-widest uppercase text-muted-foreground mb-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Makelaar &amp; Taxateur
              </motion.p>
              <motion.p 
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Actief in Amstelveen, Aalsmeer, Amsterdam en de wijde omgeving.
              </motion.p>
            </div>
            <div className="lg:col-span-8">
              <motion.h2 
                className="font-display text-2xl lg:text-3xl text-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Karen Dam, founder DAM housing
              </motion.h2>
              <motion.p 
                className="text-foreground leading-relaxed text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Als betrokken en professionele makelaar en taxateur leef ik mij in jouw persoonlijke situatie
                en ken ik de lokale woningmarkt rondom Amstelveen op mijn duimpje.
              </motion.p>
              <motion.p 
                className="text-foreground leading-relaxed text-base mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                 Of het nu gaat om een groot object of een klein appartement, je krijgt van mij de onverdeelde aandacht.
                 Met jarenlange ervaring, diepgaande lokale kennis en een netwerk van betrouwbare professionals
                 zorg ik ervoor dat jouw woning- of vastgoedtraject soepel en succesvol verloopt.
               </motion.p>
              <motion.p 
                className="text-foreground leading-relaxed text-base mt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Ik geloof in een persoonlijke benadering waarbij eerlijkheid en transparantie centraal staan.
                Jouw belangen zijn mijn prioriteit, altijd.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <motion.p 
          className="text-xs tracking-widest uppercase text-muted-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Waarden
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background p-8 lg:p-10"
            >
              <v.icon className="w-6 h-6 text-primary mb-6" />
              <motion.h3 
                className="font-display text-xl text-foreground mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 + 0.05 }}
              >
                {v.title}
              </motion.h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-mist">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <motion.p 
                className="text-xs tracking-widest uppercase text-muted-foreground mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Certificeringen
              </motion.p>
              <motion.h2 
               className="font-display text-2xl lg:text-3xl text-foreground"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.1 }}
              >
               Kwaliteit gegarandeerd
              </motion.h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="space-y-0">
                {certifications.map((cert, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center gap-4 py-4 border-b hairline border-border"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                  >
                    <Award className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-foreground">{cert}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20" style={{ backgroundColor: '#f5f3ef' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-6 items-start">
          <div className="lg:col-span-6">
            <motion.p 
              className="text-xs tracking-widest uppercase text-muted-foreground mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Mijn team
            </motion.p>
            <motion.h2
              className="font-display text-2xl lg:text-3xl text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Ontmoet mijn dreamteam
            </motion.h2>
            <motion.p 
              className="text-base text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Een woning die er op z&apos;n best uitziet, verkoopt sneller en voor een betere prijs. Daarom werk ik samen met een vaste, professionele fotograaf en styliste. Samen zorgen we ervoor dat jouw woning optimaal in beeld wordt gebracht: van de juiste belichting tot een verzorgde styling die kopers én huurders direct aanspreekt. Geen gedoe met het zoeken naar externen, geen miscommunicatie. Ik coördineer het hele proces voor je, zodat jij je nergens zorgen over hoeft te maken. Het resultaat? Prachtige beelden die jouw woning laten stralen — en de aandacht trekken die het verdient!
            </motion.p>
          </div>
          <div className="lg:col-span-6">
            <motion.img
              src="https://media.base44.com/images/public/69de2de67917694d33fdfed5/53260f8df_master4lr.jpg"
              alt="Fotografen en stylisten team"
              className="w-full object-cover rounded-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>

      </div>

      {/* Google Reviews */}
      <GoogleReviews />

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-2 lg:pt-3 pb-16 lg:pb-24 text-center">
        <motion.h2 
          className="font-display text-3xl lg:text-4xl text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Zullen we kennismaken?

        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 mt-8 bg-primary text-primary-foreground px-8 py-4 text-sm font-medium tracking-wide uppercase transition-colors duration-500"
            style={{}}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#9b0e1a'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = ''}
          >
            Contact opnemen <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}