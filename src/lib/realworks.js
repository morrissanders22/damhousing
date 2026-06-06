// Maps the Realworks Wonen v3 "objecten" response onto the flat property shape
// the design components (PropertyCard, Properties, PropertyDetail) expect.
//
// Data is fetched client-side from our own /api/realworks route (which proxies
// Realworks server-side with the secret token). See src/app/api/realworks/route.ts.

const ENDPOINT = "/api/realworks";

function titleCase(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\s+/g, " ")
    .trim();
}

// "MECHANISCHE_VENTILATIE" -> "Mechanische ventilatie"
function humanize(token) {
  if (!token) return "";
  const s = token.replace(/_/g, " ").toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function houseNumber(adres) {
  const h = adres?.huisnummer;
  if (!h) return "";
  return `${h.hoofdnummer ?? ""}${h.toevoeging ? h.toevoeging : ""}`.trim();
}

// Design type filter values: appartement | woonhuis | penthouse | villa | studio
function mapType(o) {
  const objecttype = o.object?.type?.objecttype || "";
  const app = String(o.algemeen?.appartementsoort || "").toUpperCase();
  const huis = String(o.algemeen?.woonhuistype || "").toUpperCase();
  if (objecttype === "APPARTEMENT") {
    if (app.includes("PENTHOUSE")) return "penthouse";
    if (app.includes("STUDIO")) return "studio";
    return "appartement";
  }
  if (objecttype === "WOONHUIS") {
    if (huis.includes("VILLA") || huis.includes("LANDHUIS")) return "villa";
    return "woonhuis";
  }
  return objecttype.toLowerCase();
}

// Design status values: beschikbaar | nieuw | onder_bod | verkocht | verhuurd
function mapStatus(o) {
  const ov = o.financieel?.overdracht || {};
  const isHuur = !ov.koopprijs && (ov.huurprijs != null || ov.huurconditie);
  if (ov.transactieprijs != null || ov.transactiedatum) {
    return isHuur ? "verhuurd" : "verkocht";
  }
  if (ov.onderVoorbehoudVanaf || ov.onderVoorbehoudTot) return "onder_bod";
  return "beschikbaar";
}

function mapPrice(o) {
  const ov = o.financieel?.overdracht || {};
  if (ov.koopprijs != null) {
    const suffix =
      ov.koopconditie === "VRIJ_OP_NAAM" ? "v.o.n." : "k.k.";
    return { price: ov.koopprijs, price_suffix: suffix };
  }
  if (ov.huurprijs != null) {
    return { price: ov.huurprijs, price_suffix: "p/m" };
  }
  return { price: null, price_suffix: "" };
}

function mapRooms(o) {
  const etages = o.detail?.etages || [];
  let bedrooms = 0;
  let bathrooms = 0;
  for (const e of etages) {
    bedrooms += e.aantalSlaapkamers || 0;
    bathrooms += (e.badkamers || []).length;
  }
  return {
    bedrooms: bedrooms || null,
    bathrooms: bathrooms || null,
  };
}

// The Realworks Beeldservice serves a 110x150 thumbnail by default. `resize=4`
// returns the full-resolution image (~1165x1591); the signed `check` token stays
// valid with the param appended. Other resize presets are thumbnails or errors.
function highRes(link) {
  if (!link) return link;
  return link.includes("resize=") ? link : `${link}&resize=4`;
}

// Only real photos (image/*), HOOFDFOTO first, then by volgnummer. PDF
// floor plans / documents are excluded.
function mapImages(o) {
  const media = (o.media || [])
    .filter((m) => m.vrijgave && String(m.mimetype || "").startsWith("image/"))
    .sort((a, b) => {
      const aHoofd = a.soort === "HOOFDFOTO" ? 0 : 1;
      const bHoofd = b.soort === "HOOFDFOTO" ? 0 : 1;
      if (aHoofd !== bHoofd) return aHoofd - bHoofd;
      return (a.volgnummer || 0) - (b.volgnummer || 0);
    })
    .map((m) => highRes(m.link))
    .filter(Boolean);
  return media;
}

export function mapRealworksObject(o) {
  const { price, price_suffix } = mapPrice(o);
  const { bedrooms, bathrooms } = mapRooms(o);
  const images = mapImages(o);
  const street = o.adres?.straat || "";
  const huisnr = houseNumber(o.adres);

  return {
    id: String(o.id),
    title: [street, huisnr].filter(Boolean).join(" "),
    street,
    house_number: huisnr,
    city: titleCase(o.adres?.plaats),
    neighborhood: o.adres?.wijk ? titleCase(o.adres.wijk) : null,
    type: mapType(o),
    status: mapStatus(o),
    price,
    price_suffix,
    bedrooms,
    bathrooms,
    area_sqm: o.algemeen?.woonoppervlakte || null,
    year_built: o.algemeen?.bouwjaar || null,
    energy_label: o.algemeen?.energieklasse || null,
    description: o.teksten?.aanbiedingstekst || "",
    features: (o.algemeen?.voorzieningenWonen || []).map(humanize),
    images,
    main_image: images[0] || null,
  };
}

async function fetchObjecten(search = "") {
  const res = await fetch(`${ENDPOINT}${search}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Realworks API gaf status ${res.status}`);
  }
  const data = await res.json();
  return data.resultaten || [];
}

// Fetch all listings (the makelaar has a small number of objects) mapped to the
// design's property shape.
export async function fetchRealworksProperties() {
  const objecten = await fetchObjecten("?aantal=100");
  return objecten.map(mapRealworksObject);
}

// Fetch a single listing by id. Realworks' list endpoint is the public surface
// we proxy, so we fetch and find — fine for this volume.
export async function fetchRealworksProperty(id) {
  const objecten = await fetchObjecten("?aantal=100");
  const match = objecten.find((o) => String(o.id) === String(id));
  return match ? mapRealworksObject(match) : null;
}
