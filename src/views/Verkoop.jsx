"use client";
import React from "react";
import { Link } from '@/lib/router';
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import FeaturedListings from "../components/home/FeaturedListings";

export default function Verkoop() {
  const sections = [
    {
      id: 1,
      title: "Jouw huis verkopen in Amstelveen, Aalsmeer e.o.",
      content: (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-base text-foreground leading-relaxed"
        >
          Je hebt de knoop doorgehakt: je gaat je huis verkopen. Een grote stap — en een die je het liefst goed doet. Met de juiste makelaar aan je zij haal je er meer uit, zonder gedoe. Iemand die jouw situatie begrijpt én de lokale markt kent tot in de details.
        </motion.p>
      )
    },
    {
      id: 1.5,
      title: "Verkopen doe je niet alleen — ik denk met je mee",
      content: (
        <motion.p 
          className="text-base text-foreground leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Bij het intensieve proces van een huis verkopen draait het naast kennis om vertrouwen. Om een sparringpartner die een eerlijk en persoonlijk advies geeft. Ik ben behulpzaam, open-minded en discreet, en heb oprechte interesse in jou en jouw situatie. Ik denk met je mee en ik denk vooruit.
        </motion.p>
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
      title: "Wat kan ik als verkoopmakelaar voor je doen?",
      content: (
        <div className="space-y-8">
        <motion.p 
          className="text-base text-foreground leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Een huis verkopen doe je hooguit een paar keer in je leven. Er komt heel wat bij kijken, op juridisch, bouwkundig, financieel en ook emotioneel gebied. Niet voor niets kiest in Nederland 90% van de mensen ervoor om bij de verkoop van de woning een professional in te schakelen.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:ml-12">
            {[
              { title: "Advies over een passende verkoopstrategie", desc: "Iedere situatie is uniek en vraagt om een strategie die daarbij past." },
              { title: "Eventuele taxatie", desc: "Ik ben gecertificeerd taxateur, op deze pagina lees je er meer over." },
              { title: "Advies voor het aantrekkelijk presenteren van de woning", desc: "Ik adviseer je op over opruimen en styling, zodat een geïnteresseerde koper een goede indruk krijgt van de mogelijkheden van je huis." },
              { title: "Presentatie van de woning door middel van een brochure", desc: "Goede foto's en duidelijke, pakkende teksten zijn een onmisbaar visitekaartje voor je huis." },
              { title: "Promotie van de woning op Funda en social media", desc: "Naast Funda, zijn Facebook en Instagram belangrijke media. Aantrekkelijke foto's en uitnodigende teksten spreken een groot publiek direct aan." },
              { title: "Contact met geïnteresseerden en begeleiding bij bezichtigingen", desc: "Ik presenteer jouw woning met enthousiasme en wijs op de positieve aspecten. Jijzelf hebt er geen omkijken naar." },
              { title: "Professionele onderhandeling door verkoopmakelaar", desc: "Als verkoopmakelaar is onderhandelen mijn werk, en ik doe het zonder de emoties die jij als eigenaar van het huis wellicht hebt. Dat komt de uiteindelijke opbrengst ten goede." },
              { title: "Begeleiding bij een eventuele bouwkundige inspectie", desc: "Mocht een potentële koper een bouwkundige inspectie wensen, dan kan ik daarbij aanwezig zijn." },
              { title: "Opstellen koopcontract", desc: "Een waterdicht koopcontract is essentieel en vergt actuele kennis van alle juridische zaken en clausules." },
              { title: "Begeleiding bij de eindoplevering", desc: "Als de verkoop rond is, maak ik samen met jou en de koper een laatste ronde door de woning. Ik neem de meterstanden op en geef alles door aan de notaris." },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="relative pl-8 py-4 border-l-2 border-primary/30 hover:border-primary transition-colors duration-300"
              >
                <div className="absolute -left-4 top-4 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  {i + 1}
                </div>
                <h4 className="font-display text-lg text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Ik werk van Haarlem tot Wilnis — en ken elke straat",
      content: (
        <motion.p 
          className="text-base text-foreground leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Mijn werkgebied is de regio rond Amstelveen: van Amsterdam en Haarlem tot Aalsmeer, Uithoorn, Ouderkerk aan de Amstel, Badhoevedorp en Wilnis. Ik woon zelf in Aalsmeer en werk vanuit Amstelveen — ik zit er dus letterlijk middenin. Dat maakt me niet alleen een makelaar, maar ook een echte lokale kenner. En dat verschil merk je.
        </motion.p>
      ),
      image: true
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-cover bg-center flex items-center justify-center" style={{
        backgroundImage: 'url(https://hayweb.blob.core.windows.net/public/0siutw/1/DAMhousing-00.jpg)'
      }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.h1 
          className="font-display text-5xl lg:text-6xl text-white relative z-10 text-center px-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Verkoop
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
                    src="https://media.base44.com/images/public/69de2de67917694d33fdfed5/6cb3ce362_DAMhousing-04.jpg"
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
                        src={idx === 1 ? "https://media.base44.com/images/public/69de2de67917694d33fdfed5/faf467e6b_FDB-8655.jpg" : "https://media.base44.com/images/public/69de2de67917694d33fdfed5/82ea6e490_DAMhousing-22.jpg"}
                        alt={idx === 1 ? "Woninggebouw" : "Karen Dam"}
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
              <div className="max-w-4xl">
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