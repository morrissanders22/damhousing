import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const contactInfo = [
  { icon: Phone, label: "Telefoon", values: [{ value: "020 - 820 0159", href: "tel:+31208200159" }, { value: "06 - 2513 8259", href: "tel:+31625138259" }] },
  { icon: Mail, label: "E-mail", values: [{ value: "info@damhousing.nl", href: "mailto:info@damhousing.nl" }] },
  { icon: MapPin, label: "Locatie", values: [{ value: "Amstelveen, Nederland", href: null }] },
  { icon: Clock, label: "Bereikbaar", values: [{ value: "Ma - Vr: 9:00 - 17:30", href: null }] },
];

export default function Contact() {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate send
    await new Promise(r => setTimeout(r, 1000));
    toast({ title: "Bericht verzonden", description: "Ik neem zo snel mogelijk contact met je op." });
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setSending(false);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-cover flex items-center justify-center" style={{
        backgroundImage: 'url(https://media.base44.com/images/public/69de2de67917694d33fdfed5/aa5bebd1c_master4lr.jpg)',
        backgroundPosition: 'center 30%'
      }}>
        <div className="absolute inset-0 bg-black/15"></div>
        <motion.h1 
          className="font-display text-5xl lg:text-6xl text-white relative z-10 text-center px-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Contact
        </motion.h1>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16"
        >
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Contact</p>
          <motion.h1 
            className="font-display text-3xl lg:text-5xl xl:text-6xl text-foreground max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Neem contact met mij op
          </motion.h1>
          <p className="mt-3 text-muted-foreground max-w-lg">
            Heb je een vraag, wil je een afspraak maken of vrijblijvend kennismaken? Ik sta voor je klaar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-20">
          {/* Contact info */}
          <div className="lg:col-span-4">
            <div className="space-y-0">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-start gap-4 py-5 border-b hairline border-border pl-4">
                  <item.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">{item.label}</p>
                    {item.values.map((v, j) => (
                      v.href ? (
                        <a key={j} href={v.href} className="block text-foreground hover:text-primary transition-colors text-base mt-1">
                          {v.value}
                        </a>
                      ) : (
                        <p key={j} className="text-foreground text-base mt-1">{v.value}</p>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social media */}
            <div className="flex items-center gap-4 mt-6 pl-4">
              <a href="https://www.facebook.com/damhousing/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/damhousing/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                <InstagramIcon />
              </a>
              <a href="https://nl.linkedin.com/in/karen-brussee-dam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-8">
            <div className="flex-1">
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Stuur een bericht</p>
              <h2 className="font-display text-2xl lg:text-3xl text-foreground">Vertel me waar ik je mee kan helpen</h2>
              <p className="mt-2 text-muted-foreground text-sm">Vul het formulier in en ik reageer binnen één werkdag.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">Naam *</label>
                  <Input
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="bg-background border-border h-12"
                    placeholder="Jouw naam"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">E-mail *</label>
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="bg-background border-border h-12"
                    placeholder="jouw@email.nl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">Telefoon</label>
                  <Input
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="bg-background border-border h-12"
                    placeholder="Bijv. 06 - 1234 5678"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">Onderwerp</label>
                  <Select value={form.subject} onValueChange={v => setForm({ ...form, subject: v })}>
                    <SelectTrigger className="bg-background border-border h-12">
                      <SelectValue placeholder="Selecteer onderwerp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="verkoop">Verkoop</SelectItem>
                      <SelectItem value="aankoop">Aankoop</SelectItem>
                      <SelectItem value="taxatie">Taxatie</SelectItem>
                      <SelectItem value="verhuur">Verhuur</SelectItem>
                      <SelectItem value="anders">Anders</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">Bericht *</label>
                <Textarea
                  required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="bg-background border-border min-h-[110px]"
                  placeholder="Waar kan ik je mee helpen?"
                />
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="bg-primary text-primary-foreground px-6 py-3 h-auto text-xs font-medium tracking-wide uppercase hover:bg-foreground transition-colors duration-500"
              >
                {sending ? "Verzenden..." : "Verstuur bericht"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}