import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeaturedListings from "@/components/home/FeaturedListings";
import { Link } from 'react-router-dom';

const services = [
  {
    title: "Begeleiding",
    items: [
      "De huidige en te verwachten wet- en regelgeving",
      "Het vaststellen van de huurprijs van je woning",
      "Het onder de aandacht brengen van je woning bij de juiste kanalen",
      "De geldende verplichtingen voor huurders en verhuurders"
    ]
  },
  {
    title: "Verhuurproces",
    items: [
      "Een lopende huurovereenkomst controleren",
      "Een nieuwe huurovereenkomst juridisch waterdicht opstellen",
      "Geïnteresseerden begeleiden bij het bezichtigen van de woning",
      "Screenen van een potentiële huurder",
      "Inspectie van de woning bij het begin en het einde van de huurperiode"
    ]
  }
];

export default function Verhuur() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-cover bg-center flex items-center justify-center" style={{
        backgroundImage: 'url(https://hayweb.blob.core.windows.net/public/0siutw/1/DAMhousing-15.jpg)'
      }}>
        <div className="absolute inset-0 bg-black/15"></div>
        <motion.h1 
          className="font-display text-5xl lg:text-6xl text-white relative z-10 text-center px-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Verhuur
        </motion.h1>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-20 pb-16 lg:pb-20">
        {/* Header with Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
        >
          <div className="lg:col-span-5">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Diensten</p>
            <motion.h1 
              className="font-display text-3xl lg:text-5xl xl:text-6xl text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Je woning verhuren?<br />Ik regel het.
            </motion.h1>
            <p className="mt-3 text-muted-foreground mb-6">
              Amstelveen, Aalsmeer en Amsterdam
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              De huurmarkt in Amstelveen, Aalsmeer en Amsterdam is groot — maar ook complex. Er zijn veel regels, en die veranderen regelmatig. Als je je woning wil verhuren, is het slim om iemand in te schakelen die het klappen van de zweep kent.
            </p>
          </div>
          <div className="lg:col-span-7">
            <img 
              src="https://media.base44.com/images/public/69de2de67917694d33fdfed5/f0efaa6b3_DAMhousing-13.jpg"
              alt="Karen Dam Verhuurmakelaar"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Section with contrast background - full width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-secondary/30 py-16 lg:py-20 mb-16"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4 lg:order-2">
              <p className="text-lg text-foreground leading-relaxed mb-6">
                Als verhuurder krijg je te maken met wetswijzigingen, belastingregels en woonpunten voor de middenhuur. Het is een jungle — maar je hoeft het niet alleen uit te zoeken. Ik leg je alles uit in gewone taal en zorg dat je nergens voor verrast wordt.
              </p>
              <Link to="/contact">
                <Button className="bg-primary text-primary-foreground px-8 py-4 h-auto text-sm font-medium tracking-wide uppercase hover:bg-foreground transition-colors duration-500">
                  Neem direct contact op
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="lg:col-span-8 lg:order-1">
              <img 
                src="https://media.base44.com/images/public/69de2de67917694d33fdfed5/82afdfefb_DAMhousing-16.jpg"
                alt="Woning met tuin"
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-16 lg:pb-20">

        {/* Content Sections */}
        <div className="space-y-16 lg:space-y-20">
          {/* Services Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-display text-2xl lg:text-4xl text-foreground mb-8">
                Als verhuurmakelaar kan ik je bijstaan met:
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  className="bg-secondary/30 px-8 py-8 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
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

          {/* Section 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-secondary/30 px-8 lg:px-12 py-12 lg:py-16 rounded-lg"
          >
            <h2 className="font-display text-2xl lg:text-4xl text-foreground mb-6">
              Geen verrassingen achteraf
            </h2>
            <p className="text-foreground text-lg leading-relaxed mb-6">
              Ik adviseer je over alle geldende én aankomende regels, zodat je goed voorbereid de markt op gaat. Wil je meer weten, of gewoon even sparren? Neem gerust contact op.
            </p>
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground px-8 py-4 h-auto text-sm font-medium tracking-wide uppercase hover:bg-foreground transition-colors duration-500">
                Contact opnemen
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl lg:text-4xl text-foreground mb-6">
                Verhuurmakelaar in Amstelveen, Aalsmeer en Amsterdam
              </h2>
              <p className="text-foreground text-lg leading-relaxed">
                Ik verhuur woningen in Amstelveen, Aalsmeer en Amsterdam — en heb daarbij veel ervaring met expats en internationale huurders. Ik zorg dat jij de juiste huurder vindt en dat alles contractueel goed geregeld is.
              </p>
            </div>
            <div className="lg:col-span-7">
              <img 
                src="https://media.base44.com/images/public/69de2de67917694d33fdfed5/15ed4e78c_DAMhousing-13.jpg"
                alt="Verhuurmakelaar Amstelveen"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          </motion.div>

          {/* Final CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-secondary/30 px-8 lg:px-12 py-12 lg:py-16 rounded-lg text-center"
          >
            <h2 className="font-display text-2xl lg:text-4xl text-foreground mb-4">
              Denk je erover na om te verhuren?
            </h2>
            <p className="text-foreground text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Neem gewoon even contact op. Ik denk graag vrijblijvend met je mee — en vertel je eerlijk wat de mogelijkheden zijn.
            </p>
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground px-8 py-4 h-auto text-sm font-medium tracking-wide uppercase hover:bg-foreground transition-colors duration-500">
                Contact opnemen
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Featured Listings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-20"
        >
          <FeaturedListings />
        </motion.div>
      </div>
    </div>
  );
}