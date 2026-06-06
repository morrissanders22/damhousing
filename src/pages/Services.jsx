import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Home, FileText, Key, ShoppingBag } from "lucide-react";

const services = [
  {
    id: "verkoop",
    icon: Home,
    title: "IK VERKOOP",
    subtitle: "Verkoop",
    description: "Ik verkoop jouw woning slim — van de eerste foto tot de handtekening bij de notaris zit je goed.",
    benefits: [
      "Gratis en vrijblijvende waardebepaling",
      "Professionele fotografie en presentatie",
      "Publicatie op Funda en alle relevante platformen",
      "Persoonlijke begeleiding tijdens bezichtigingen",
      "Onderhandeling en juridische afhandeling",
      "Transparante communicatie gedurende het hele proces",
    ],
    steps: [
      { step: "01", title: "Kennismaking", desc: "Gratis kennismakingsgesprek en waardebepaling van jouw woning." },
      { step: "02", title: "Voorbereiding", desc: "Professionele fotografie, plattegronden en woningpresentatie." },
      { step: "03", title: "In de markt", desc: "Publicatie op Funda, social media en mijn netwerk." },
      { step: "04", title: "Verkoop", desc: "Onderhandeling, juridische afhandeling en overdracht." },
    ],
  },
  {
    id: "taxatie",
    icon: FileText,
    title: "IK WAARDEER",
    subtitle: "Taxatie",
    description: "Als NWWI-gecertificeerd taxateur maak ik rapporten die alle banken accepteren — snel en betrouwbaar.",
    benefits: [
      "Gecertificeerd en beëdigd taxateur",
      "NWWI-gevalideerde taxatierapporten",
      "Snelle doorlooptijd",
      "Taxaties voor diverse doeleinden",
      "Uitgebreide marktkennis",
      "Onafhankelijk en objectief",
    ],
    steps: [
      { step: "01", title: "Aanvraag", desc: "Je dient jouw taxatieaanvraag in via het contactformulier." },
      { step: "02", title: "Opname", desc: "Inspectie van de woning en directe omgeving." },
      { step: "03", title: "Rapport", desc: "Opstellen van het taxatierapport met volledige onderbouwing." },
      { step: "04", title: "Validatie", desc: "NWWI-validatie en oplevering aan jou en jouw adviseur." },
    ],
  },
  {
    id: "verhuur",
    icon: Key,
    title: "IK VERHUUR",
    subtitle: "Verhuur",
    description: "Ik neem de verhuur volledig uit handen — van huurprijsbepaling en marketing tot een waterdicht contract.",
    benefits: [
      "Uitgebreide screening van huurders",
      "Opstellen huurcontracten",
      "Begeleiding bij oplevering",
      "Optioneel verhuurbeheer",
      "Marktconforme huurprijsbepaling",
      "Kennis van actuele huurwetgeving",
    ],
    steps: [
      { step: "01", title: "Inventarisatie", desc: "Beoordeling van jouw woning en marktconforme huurprijsbepaling." },
      { step: "02", title: "Marketing", desc: "Professionele presentatie en publicatie op verhuurplatformen." },
      { step: "03", title: "Selectie", desc: "Screening en selectie van betrouwbare huurders." },
      { step: "04", title: "Overdracht", desc: "Contractopstelling, sleuteloverdracht en optioneel beheer." },
    ],
  },
  {
    id: "aankoop",
    icon: ShoppingBag,
    title: "IK BEGELEID",
    subtitle: "Aankoop",
    description: "Ik sta aan jouw kant — van de zoektocht tot het bod en de handtekening. Zodat je niet teveel betaalt.",
    benefits: [
      "Zoekprofiel en woningalerts",
      "Begeleiding bij bezichtigingen",
      "Bouwkundige inspectie",
      "Professionele onderhandeling",
      "Juridische controle koopakte",
      "Begeleiding tot en met de notaris",
    ],
    steps: [
      { step: "01", title: "Intake", desc: "Bespreking van jouw wensen, budget en zoekcriteria." },
      { step: "02", title: "Zoeken", desc: "Actief zoeken en begeleiden bij bezichtigingen." },
      { step: "03", title: "Bieden", desc: "Strategisch bieden en professioneel onderhandelen." },
      { step: "04", title: "Afronding", desc: "Juridische controle, taxatie en begeleiding naar de notaris." },
    ],
  },
];

function ServiceBlock({ service }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-t hairline border-border">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full py-10 lg:py-14 group"
      >
        <div className="flex items-center justify-between gap-4 px-6 lg:px-10">
          <div className="flex items-center gap-6 lg:gap-10">
            <service.icon className="w-6 h-6 text-primary flex-shrink-0" />
            <div className="text-left">
              <motion.p 
                className="font-display text-2xl lg:text-4xl text-foreground group-hover:text-primary transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {service.title}
              </motion.p>
              <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${expanded ? "rotate-180" : ""}`} />
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="pb-12 lg:pb-16 pl-12 lg:pl-16">
              {/* Benefits */}
              <div className="mb-10">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">Voordelen</p>
                <ul className="space-y-3">
                  {service.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-foreground border-b hairline border-border/50 pb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process Steps */}
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">Het Proces</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {service.steps.map((s) => (
                    <div key={s.step}>
                      <p className="font-display text-3xl text-primary/30">{s.step}</p>
                      <p className="font-medium text-foreground mt-2">{s.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>


            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Services() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Mijn Diensten</p>
          <motion.h1 
            className="font-display text-3xl lg:text-5xl xl:text-6xl text-foreground max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Wat kan ik voor je betekenen?
          </motion.h1>
          <p className="mt-6 text-muted-foreground max-w-lg">
            Of je nou verkoopt, koopt, verhuurt of een taxatie nodig hebt — ik ben er bij elke stap. Persoonlijk, eerlijk en zonder gedoe.
          </p>
        </motion.div>

        <div>
          {services.map(service => (
            <ServiceBlock key={service.id} service={service} />
          ))}
          <div className="border-t hairline border-border" />
        </div>
      </div>
    </div>
  );
}