"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeaturedListings from "@/components/home/FeaturedListings";
import { Link } from '@/lib/router';

const services = [
  {
    title: "Zoeken",
    items: [
      "het opstellen van een zoekprofiel voor jouw ideale woning in Amstelveen, Aalsmeer e.o.",
      "actief zoeken naar een geschikte woning",
      "begeleiding bij de bezichtigingen"
    ]
  },
  {
    title: "Bieden & Kopen",
    items: [
      "advies over een goed bod en reële aankoopwaarde voor een woning",
      "een onderhandelingsstrategie voorleggen en uitvoeren",
      "begeleiding bij een bouwkundige inspectie",
      "de koopovereenkomst en andere documenten controleren"
    ]
  }
];

export default function Aankoop() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-cover bg-center flex items-center justify-center" style={{
        backgroundImage: 'url(https://hayweb.blob.core.windows.net/public/0siutw/1/DAMhousing-03.jpg)'
      }}>
        <div className="absolute inset-0 bg-black/15"></div>
        <motion.h1 
          className="font-display text-5xl lg:text-6xl text-white relative z-10 text-center px-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Aankoop
        </motion.h1>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        {/* Header + Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 items-start"
        >
          <div className="lg:col-span-5">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Diensten</p>
            <h1 className="font-display text-2xl lg:text-4xl xl:text-5xl text-foreground">
              Je droomhuis kopen?<br />Ik help je erbij.
            </h1>
            <p className="mt-3 text-muted-foreground mb-8">
              Aankoopmakelaar in Amstelveen, Aalsmeer e.o.
            </p>
            <p className="text-lg text-foreground leading-relaxed mb-6">
              Op zoek naar een woning in of rond Amstelveen? De markt hier is competitief — maar met mij aan je zijde ben je beter voorbereid dan de meeste kopers. Ik ken de buurt, de prijzen en de makelaars.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              Van het opstellen van jouw zoekprofiel tot de sleuteloverdracht: ik regel het samen met je.
            </p>
          </div>
          <div className="lg:col-span-7">
            <img 
              src="https://media.base44.com/images/public/69de2de67917694d33fdfed5/de86ca2df_DAMhousing-13.jpg"
              alt="Aankoop"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-16 lg:space-y-20">
          {/* Section 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          >
            <div className="lg:col-span-7">
              <img 
                src="https://media.base44.com/images/public/69de2de67917694d33fdfed5/a6626fc5a_Screenshot2026-04-15at020111.png" 
                alt="Aankoop"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl lg:text-4xl text-foreground mb-4">
                Waarom je een aankoopmakelaar wilt in deze markt
              </h2>
              <div className="space-y-4 text-foreground text-lg leading-relaxed">
                <p>
                  In Aalsmeer, Amstelveen en omgeving gaan woningen snel — soms nog voordat ze officieel op Funda staan. Als je hier wil kopen, is het slim om iemand aan je kant te hebben die de markt kent én de goede contacten heeft.
                </p>
                <p>
                  Ik help je niet alleen bij het vinden van de juiste woning, maar ook bij de vraag: is dit echt wat ik wil, en betaal ik een eerlijke prijs? Is de woning bouwkundig in orde? Wat is een slim bod? Die vragen beantwoord ik samen met jou.
                </p>
                <p>
                  Met mijn netwerk van taxateurs en bouwkundigen regel ik het hele aankoopproces voor je. Zodat jij je kunt focussen op het leukste deel: jouw nieuwe thuis vinden.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-secondary/30 px-8 lg:px-12 py-12 lg:py-16 rounded-lg"
          >
            <h2 className="font-display text-2xl lg:text-4xl text-foreground mb-6">
              Hulp precies waar je het nodig hebt
            </h2>
            <p className="text-foreground text-lg leading-relaxed mb-8">
              Ik werk altijd op maat. Wil je alleen hulp bij het bieden en onderhandelen? Prima. Liever dat ik het hele traject pak? Dat kan ook. We kijken samen wat voor jou het meeste oplevert — en wat het beste past bij jouw situatie.
            </p>
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground px-8 py-4 h-auto text-sm font-medium tracking-wide uppercase hover:bg-foreground transition-colors duration-500">
                Direct contact opnemen
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Section 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          >
            <div className="lg:col-span-6">
              <h2 className="font-display text-2xl lg:text-4xl text-foreground mb-6">
                  Lokale kennis maakt het verschil
                </h2>
              <p className="text-foreground text-lg leading-relaxed">
                In Amstelveen en Aalsmeer ken ik de markt van binnen en buiten — welke wijken in trek zijn, wat woningen echt waard zijn en welke makelaars er actief zijn. Die kennis zet ik voor jou in. Zodat jij een stap voor bent op andere kopers.
              </p>

            </div>
            <div className="lg:col-span-6 self-start">
              <img
                src="https://media.base44.com/images/public/69de2de67917694d33fdfed5/75a73478f_DAMhousing-23.jpg"
                alt="Sleutel van jouw droomhuis"
                className="w-full h-full rounded-lg object-cover"
                style={{ minHeight: '400px', objectPosition: 'center' }}
              />
            </div>
          </motion.div>

          {/* Section 3b - new background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start rounded-lg px-8 lg:px-12 py-12 lg:py-16"
            style={{ backgroundColor: '#efede9' }}
          >
            <div className="lg:col-span-6">
              <img
                src="https://media.base44.com/images/public/69de2de67917694d33fdfed5/f49ccd34a_DAMhousing-20.jpg"
                alt="Woningen in Amstelveen"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            <div className="lg:col-span-6 self-start">
              <p className="text-foreground text-lg leading-relaxed">
                Ik signaleer woningen die jij misschien nog niet op je radar had — maar die perfect bij je passen. Ik let op bouwkundige details, check de prijzen van vergelijkbare woningen in de buurt en adviseer je over een bod dat klopt. Zo koop je met vertrouwen.
              </p>
            </div>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="space-y-8"
          >
            <h2 className="font-display text-2xl lg:text-4xl text-foreground mb-8">
              Welke diensten bied ik aan?
            </h2>
            <p className="text-foreground text-lg mb-8">
              Geef zelf maar aan bij welke stappen in het aankoopproces je mijn hulp kunt gebruiken:
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  className="bg-secondary/30 px-8 py-8 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + idx * 0.1 }}
                >
                  <h3 className="font-display text-xl lg:text-2xl text-foreground mb-6">
                    {service.title}
                  </h3>
                  <ul className="space-y-3">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex gap-3 text-foreground text-base leading-relaxed">
                        <span className="text-primary font-bold mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-secondary/30 px-8 lg:px-12 py-12 lg:py-16 rounded-lg text-center"
          >
            <h2 className="font-display text-2xl lg:text-4xl text-foreground mb-4">
              Zullen we even sparren?
            </h2>
            <p className="text-foreground text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Nog niet zeker of je een aankoopmakelaar nodig hebt? Geen probleem. Neem gerust contact op — ik denk vrijblijvend met je mee. Geen verplichtingen, gewoon een eerlijk gesprek over wat ik voor je kan doen.
            </p>
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground px-8 py-4 h-auto text-sm font-medium tracking-wide uppercase hover:bg-foreground transition-colors duration-500">
                Hoe kan ik je helpen?
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Featured Listings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-20"
        >
          <FeaturedListings />
        </motion.div>
      </div>
    </div>
  );
}