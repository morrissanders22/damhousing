import PropertyDetail from "@/views/PropertyDetail";
import { getProperty } from "@/lib/realworks-server";

const SITE_URL = "https://damhousing.nl";

function formatPrice(price) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = await getProperty(id);

  if (!p) {
    return { title: "Woning niet gevonden", robots: { index: false } };
  }

  const place = [p.city, p.neighborhood].filter(Boolean).join(", ");
  const heading = `${p.street} ${p.house_number}${place ? `, ${p.city}` : ""}`;
  const priceLabel = p.price ? `${formatPrice(p.price)} ${p.price_suffix}`.trim() : null;
  const title = priceLabel ? `${heading} — ${priceLabel}` : heading;

  const specs = [
    p.bedrooms ? `${p.bedrooms} slaapkamers` : null,
    p.area_sqm ? `${p.area_sqm} m²` : null,
    p.energy_label ? `energielabel ${p.energy_label}` : null,
  ].filter(Boolean).join(" · ");
  const description = (p.description?.trim() ||
    `${heading}. ${specs}. Bekijk deze woning bij DAM Housing.`)
    .replace(/\s+/g, " ")
    .slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical: `/woning/${p.id}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_URL}/woning/${p.id}`,
      images: p.main_image ? [{ url: p.main_image, alt: heading }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: p.main_image ? [p.main_image] : undefined,
    },
  };
}

function buildJsonLd(p) {
  const schemaType =
    p.type === "appartement" ? "Apartment" : p.type === "woonhuis" ? "House" : "Residence";
  const heading = `${p.street} ${p.house_number}`;

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: heading,
    description: p.description?.replace(/\s+/g, " ").slice(0, 300) || heading,
    url: `${SITE_URL}/woning/${p.id}`,
    image: p.images?.length ? p.images.slice(0, 6) : p.main_image ? [p.main_image] : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: heading,
      addressLocality: p.city || undefined,
      addressCountry: "NL",
    },
    numberOfBedrooms: p.bedrooms || undefined,
    numberOfBathroomsTotal: p.bathrooms || undefined,
    yearBuilt: p.year_built || undefined,
    floorSize: p.area_sqm
      ? { "@type": "QuantitativeValue", value: p.area_sqm, unitCode: "MTK" }
      : undefined,
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const p = await getProperty(id);
  const jsonLd = p ? buildJsonLd(p) : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <PropertyDetail />
    </>
  );
}
