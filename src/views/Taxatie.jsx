"use client";
import React from "react";
import { Link } from '@/lib/router';
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import FeaturedListings from "../components/home/FeaturedListings";

export default function Taxatie() {
  const sections = [
    {
      id: 1,
      title: "Een taxatierapport nodig?",
      content: (
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-base text-foreground leading-relaxed"
          >
            Of je nu een huis koopt, verkoopt, je hypotheek oversluit of gewoon wilt weten wat je woning waard is — een officieel taxatierapport geeft je de zekerheid die je nodig hebt. De woningmarkt beweegt snel, en de werkelijke waarde van je woning kan flink afwijken van wat je ooit betaald hebt.
            <br /><br />
            Als Registermakelaar Taxateur (RMT) — ingeschreven bij het NRVT — lever ik NWWI-gevalideerde rapporten die alle banken accepteren. Objectief, helder en betrouwbaar.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-foreground transition-colors duration-500"
            >
              Neem direct contact op <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      )
    },
    {
      id: 1.5,
      title: "Ik taxeer in de hele regio rond Amstelveen",
      content: (
        <div className="space-y-6 text-base text-foreground leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Naast mijn werk als makelaar, stel ik zeer regelmatig taxatierapporten op. Ik ben NWWI-gecertificeerd en sta ingeschreven bij het NRVT, het Nederlands Register Vastgoed Taxateurs. Een makelaar-taxateur met het NWWI-certificaat mag taxatierapporten opstellen in het gebied dat twintig kilometer rond de vestigingsplaats ligt.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Omdat mijn kantoor zich in Amstelveen bevindt, strekt mijn werkgebied zich uit van Haarlem tot Wilnis. Dat betekent dat ik in onder andere in Amstelveen, Haarlem, Aalsmeer, Ouderkerk aan de Amstel, Badhoevedorp, Uithoorn, Mijdrecht, Weesp, Wilnis en Amsterdam taxatierapporten mag opstellen.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 mt-6 bg-primary text-primary-foreground px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-foreground transition-colors duration-500"
            >
              Neem direct contact op <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      ),
      image: true
    },
    {
      id: 2,
      title: "Heldere communicatie en persoonlijk contact",
      content: (
        <div className="space-y-6 text-base text-foreground leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Mijn naam is Karen Dam. Sinds 2010 werk ik in de makelaardij, het leukste werk dat er is. Of het nu gaat om een groot object of een klein appartement, je krijgt van mij de onverdeelde aandacht. In mijn eenmanszaak bepaal ik zelf mijn agenda. Dat betekent dat ik alle tijd voor je heb; ik ben nooit bezig met een volgende afspraak.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Hoe moeizaam of hoe overspannen de markt ook is, een huis verkopen heeft alle tijd en aandacht nodig. Heldere communicatie en kwaliteit bij de begeleiding staan voorop. Persoonlijk contact is de basis. Daarom maak ik uitsluitend een-op-eenafspraken en doe ik niet aan Open Huizen-dagen. Ook na werktijd en in het weekend kun je me bereiken.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 mt-6 bg-primary text-primary-foreground px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-foreground transition-colors duration-500"
            >
              Neem direct contact op <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      ),
      image: true
    },
    {
      id: 3,
      title: "Wanneer heb je een taxatierapport nodig?",
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {[
              { 
                title: "Taxatierapport bij de aankoop van een woning", 
                desc: "Als je voor de aankoop van een bestaande woning en hypotheek nodig hebt, wil de hypotheeksverstrekker weten wat de waarde van het huis is. Daarom is een taxatie meest wenselijk." 
              },
              { 
                title: "De verkoop van een woning", 
                desc: "Bij de verkoop van je woning wil je weten wat de marktwaarde van je huis is. Mede op basis daarvan kan een schatting worden vastgesteld. Een taxatierapport geeft duidelijkheid aan alle partijen." 
              },
              { 
                title: "Oversluitten van een hypotheek", 
                desc: "Het oversluiten van een hypotheek kan in sommige vallen voordelig uitpakken. Ook hierbij is een taxatierapport van grote waarde." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="border border-border p-8 lg:p-7 hover:shadow-2xl hover:bg-secondary/50 hover:scale-105 hover:-translate-y-1 transition-all duration-300"
              >
                <h4 className="font-display text-base lg:text-lg text-foreground mb-4 leading-snug">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7 mt-6 lg:mt-7">
            {[
              { 
                title: "Waardebepaling bij een echtscheiding", 
                desc: "Een scheiding is al lastig genoeg. Als bij een echtscheiding het huis wordt verkocht, of als één van de partners er wil blijven wonen en de ander moet uitkopen, geeft een NWWI-taxateur zekerheid over de werkelijke waarde van de woning. Dat voorkomt discussies." 
              },
              { 
                title: "Waardebepaling bij twijfel tussen verhuizen of verbouwen", 
                desc: "Volgt je huis niet aan de woonwensen die je hebt en twijfel je tussen verhuizen en verbouwen? Met een taxatierapport weet je precies waar je aan toe bent met je huidge huis. Ook maakt een taxatierapport de waardering van je woning na een verbouwing inzichtelijk." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i + 3}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i + 3) * 0.05 }}
                className="border border-border p-8 lg:p-7 hover:shadow-2xl hover:bg-secondary/50 hover:scale-105 hover:-translate-y-1 transition-all duration-300"
              >
                <h4 className="font-display text-base lg:text-lg text-foreground mb-4 leading-snug">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7 mt-6 lg:mt-7">
            {[
              { 
                title: "Financiering van een verbouwing", 
                desc: "Als je je woning wilt verbouwen kan je een geldgever nodig zijn om de financiering door gezet in de waardeering van je woning na verbouwing." 
              },
              { 
                title: "Taxatie bij overlijden", 
                desc: "In het geval van een overlijden, geeft een taxatierapport uitsluitsel over de waarde van een woning ten behoeve van de verdeling van de erfenis." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i + 5}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i + 5) * 0.05 }}
                className="border border-border p-8 lg:p-7 hover:shadow-2xl hover:bg-secondary/50 hover:scale-105 hover:-translate-y-1 transition-all duration-300"
              >
                <h4 className="font-display text-base lg:text-lg text-foreground mb-4 leading-snug">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Alle banken accepteren mijn taxatierapport",
      content: (
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-base text-foreground leading-relaxed"
          >
            Een NWWI-gevalideerd taxatierapport wordt door alle geldverstrekkers in Nederland geaccepteerd — ook voor financieringen zonder NHG (Nationale Hypotheek Garantie). Dat is handig om te weten als je een hypotheek aanvraagt of oversluit.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base text-foreground leading-relaxed"
          >
            Heb je een taxatie nodig, of wil je gewoon weten wat je woning momenteel waard is? Ik help je snel verder — neem gerust contact op.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 mt-6 bg-primary text-primary-foreground px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-foreground transition-colors duration-500"
            >
              Neem direct contact op <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      ),
      image: true
    },

  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-cover bg-center flex items-center justify-center" style={{
        backgroundImage: 'url(https://media.base44.com/images/public/69de2de67917694d33fdfed5/6dc9f1f4a_DAMhousing-16.jpg)'
      }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.h1 
          className="font-display text-5xl lg:text-6xl text-white relative z-10 text-center px-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Taxatie
        </motion.h1>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {sections.map((section, idx) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`${idx === 1 || idx === 3 ? 'bg-secondary lg:bg-mist -mx-6 lg:-mx-10 px-6 lg:px-10' : ''}`}
          >
            <div className="py-16 lg:py-20">
            {idx === 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <div className="lg:col-span-6">
                  <h2 className="font-display text-2xl lg:text-3xl text-foreground mb-8">
                    {section.title}
                  </h2>
                  {section.content}
                </div>
                <div className="lg:col-span-6">
                  <img
                    src="https://media.base44.com/images/public/69de2de67917694d33fdfed5/793817bd2_DAMhousing-18.jpg"
                    alt="Karen Dam"
                    className="w-full object-contain rounded-sm"
                  />
                </div>
              </div>
            ) : section.image ? (
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start ${idx === 1 ? 'lg:grid-cols-12' : ''}`}>
                {idx === 1 || idx === 4 ? (
                  <>
                    <div className="lg:col-span-6 flex items-center overflow-hidden">
                      <img
                        src={idx === 1 ? "https://media.base44.com/images/public/69de2de67917694d33fdfed5/d651f5d66_DAMhousing-17.jpg" : "https://media.base44.com/images/public/69de2de67917694d33fdfed5/d7d7f8c3e_DAMhousing-19.jpg"}
                        alt={idx === 1 ? "Woninggebouw" : "Amsterdam"}
                        className="w-full object-contain rounded-sm"
                        style={idx === 1 ? { objectPosition: '-1px 0' } : {}}
                      />
                    </div>
                    <div className="lg:col-span-6">
                      <h2 className="font-display text-2xl lg:text-3xl text-foreground mb-8">
                        {section.title}
                      </h2>
                      {section.content}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="lg:col-span-6">
                      <h2 className="font-display text-2xl lg:text-3xl text-foreground mb-8">
                        {section.title}
                      </h2>
                      {section.content}
                    </div>
                    <div className="lg:col-span-6 flex items-center justify-center">
                      <img
                        src="https://media.base44.com/images/public/69de2de67917694d33fdfed5/699a5269c_FDB-9914.jpg"
                        alt="Karen Dam"
                        className="w-4/5 object-contain rounded-sm"
                      />
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div>
                <h2 className="font-display text-2xl lg:text-3xl text-foreground mb-8">
                  {section.title}
                </h2>
                {section.content}
              </div>
            )}
            </div>
          </motion.section>
        ))}
      </div>

      {/* Featured Listings */}
      <FeaturedListings />

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20 text-center">
        <motion.h2 
          className="font-display text-3xl lg:text-4xl text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Zullen we kennismaken?
        </motion.h2>
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 mt-8 bg-primary text-primary-foreground px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-foreground transition-colors duration-500"
        >
          Contact opnemen <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}