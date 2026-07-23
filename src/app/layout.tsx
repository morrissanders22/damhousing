import type { Metadata } from "next";
import { Inter_Tight, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import AppShell from "@/components/layout/AppShell";

// Same fonts as the base44 site. next/font self-hosts them and exposes them as
// the --font-body / --font-display CSS variables the design already uses.
const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-body",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const SITE_URL = "https://damhousing.nl";
const OG_IMAGE =
  "https://media.base44.com/images/public/69de2de67917694d33fdfed5/4bc4a4c02_generated_b3c79806.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DAM Housing — Makelaar & Taxateur in Amstelveen & Aalsmeer",
    template: "%s · DAM Housing",
  },
  description:
    "DAM Housing: persoonlijke makelaar en taxateur in Amstelveen, Aalsmeer en omstreken. Voor de verkoop, aankoop, verhuur en taxatie van jouw woning.",
  keywords: [
    "makelaar Amstelveen",
    "makelaar Aalsmeer",
    "taxateur",
    "woning verkopen",
    "woning kopen",
    "verhuurmakelaar",
    "woningtaxatie",
    "DAM Housing",
    "Karen Dam",
  ],
  applicationName: "DAM Housing",
  authors: [{ name: "DAM Housing" }],
  creator: "DAM Housing",
  publisher: "DAM Housing",
  alternates: { canonical: "/" },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE_URL,
    siteName: "DAM Housing",
    title: "DAM Housing — Makelaar & Taxateur in Amstelveen & Aalsmeer",
    description:
      "Persoonlijke makelaar en taxateur in Amstelveen, Aalsmeer en omstreken. Verkoop, aankoop, verhuur en taxatie van woningen.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "DAM Housing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DAM Housing — Makelaar & Taxateur in Amstelveen & Aalsmeer",
    description:
      "Persoonlijke makelaar en taxateur in Amstelveen, Aalsmeer en omstreken.",
    images: [OG_IMAGE],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${SITE_URL}/#organization`,
  name: "DAM Housing",
  description:
    "Persoonlijke makelaar en taxateur in Amstelveen, Aalsmeer en omstreken.",
  url: SITE_URL,
  logo: `${SITE_URL}/dam-logo-trim.png`,
  image: OG_IMAGE,
  telephone: "+31208200159",
  email: "info@damhousing.nl",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Amstelveen",
    addressCountry: "NL",
  },
  areaServed: [
    { "@type": "City", name: "Amstelveen" },
    { "@type": "City", name: "Aalsmeer" },
    { "@type": "City", name: "Uithoorn" },
    { "@type": "City", name: "Amsterdam" },
  ],
  sameAs: [
    "https://www.facebook.com/damhousing/",
    "https://www.instagram.com/damhousing/",
    "https://nl.linkedin.com/in/karen-brussee-dam",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${interTight.variable} ${dmSerifDisplay.variable}`}>
      <head>
        {/* Warm up connections to the image CDNs used for listings & content. */}
        <link rel="preconnect" href="https://media.base44.com" crossOrigin="" />
        <link rel="preconnect" href="https://images.realworks.nl" crossOrigin="" />
        <link rel="dns-prefetch" href="https://hayweb.blob.core.windows.net" />
        <link rel="dns-prefetch" href="https://cdn.move.nl" />
        <link rel="dns-prefetch" href="https://data.move.nl" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
