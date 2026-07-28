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

// Design type filter values (simplified per client request): appartement |
// woonhuis | overig. Everything that isn't a flat or a house (bouwgrond,
// recreatie, parkeren, etc.) collapses into "overig".
function mapType(o) {
  const objecttype = o.object?.type?.objecttype || "";
  if (objecttype === "APPARTEMENT") return "appartement";
  if (objecttype === "WOONHUIS") return "woonhuis";
  return "overig";
}

// ---------------------------------------------------------------------------
// Realworks-status: bron van waarheid + vangnet
// ---------------------------------------------------------------------------
// `financieel.overdracht.status` kent precies deze waarden (opgevraagd bij de
// API zelf door een ongeldige ?status= mee te geven aan /wonen/v3/objecten):
//   PROSPECT, IN_AANMELDING, BESCHIKBAAR, ONDER_BOD, ONDER_OPTIE,
//   VERKOCHT_ONDER_VOORBEHOUD, VERHUURD_ONDER_VOORBEHOUD, VERKOCHT, VERHUURD,
//   GEVEILD, INGETROKKEN, INGETROKKEN_TIJDELIJK, IN_VOORBEREIDING,
//   GEANNULEERD, VERKOCHT_BIJ_INSCHRIJVING
//
// Deze status is leidend. Eerder leidde mapStatus de status alleen af uit
// transactieprijs/transactiedatum, waardoor een ingetrokken object met een
// blijven-staan transactiedatum als "Verkocht" op de site kwam.

function rwStatus(o) {
  return String(o?.financieel?.overdracht?.status || "")
    .toUpperCase()
    .trim();
}

// Statussen die nooit op de site horen — ook niet als "verkocht". Naast
// ingetrokken/geannuleerd ook de fases vóór publicatie.
const HIDDEN_STATUSES = new Set([
  "INGETROKKEN",
  "INGETROKKEN_TIJDELIJK",
  "GEANNULEERD",
  "PROSPECT",
  "IN_AANMELDING",
  "IN_VOORBEREIDING",
]);

// Vangnet voor statussen die Realworks later toevoegt (bv.
// INGETROKKEN_DEFINITIEF): alles wat op intrekken/annuleren duidt blijft weg.
const HIDDEN_STATUS_PATTERN = /INGETROKKEN|INTREKKING|GEANNULEERD|VERVALLEN/;

// Handmatige noodrem. Objecten hier worden verborgen ongeacht wat Realworks
// doorgeeft — nodig omdat Realworks een foute status kan doorsturen (dan helpt
// de statuscheck hierboven niet). Zet `id` (Realworks object-id) óf
// `straat` + `huisnummer` als het id niet bekend is.
const MANUALLY_HIDDEN = [
  // Juli 2026: Realworks stuurde dit object als "verkocht" door terwijl het
  // ingetrokken is (ging ook fout op Funda). Tijdelijk verborgen op verzoek van
  // DAM Housing. Pas weghalen als Realworks de status heeft rechtgezet.
  { straat: "Oosteinderweg", huisnummer: "301" },
];

function addressKey(straat, huisnummer) {
  const s = String(straat || "").toLowerCase().replace(/\s+/g, " ").trim();
  const h = String(huisnummer || "").toLowerCase().replace(/\s+/g, "").trim();
  return `${s} ${h}`.trim();
}

function isManuallyHidden(o) {
  const id = String(o?.id ?? "");
  const key = addressKey(o?.adres?.straat, houseNumber(o?.adres));
  return MANUALLY_HIDDEN.some(
    (entry) =>
      (entry.id != null && String(entry.id) === id) ||
      (entry.straat != null && addressKey(entry.straat, entry.huisnummer) === key)
  );
}

// Mag dit object überhaupt op de site? Alles wat hier false teruggeeft komt niet
// in het aanbod, niet op de detailpagina en niet in de sitemap.
export function isPubliclyVisible(o) {
  if (!o) return false;
  if (o.actief === false) return false;
  if (o.vertrouwelijk === true) return false;
  const status = rwStatus(o);
  if (HIDDEN_STATUSES.has(status) || HIDDEN_STATUS_PATTERN.test(status)) return false;
  if (isManuallyHidden(o)) return false;
  return true;
}

const STATUS_MAP = {
  BESCHIKBAAR: "beschikbaar",
  ONDER_BOD: "onder_bod",
  ONDER_OPTIE: "onder_bod",
  // Het design kent geen aparte "onder voorbehoud"-badge; "Onder bod" is het
  // dichtstbijzijnde label dat de woning niet te vroeg als verkocht bestempelt.
  VERKOCHT_ONDER_VOORBEHOUD: "onder_bod",
  VERHUURD_ONDER_VOORBEHOUD: "onder_bod",
  VERKOCHT: "verkocht",
  VERKOCHT_BIJ_INSCHRIJVING: "verkocht",
  GEVEILD: "verkocht",
  VERHUURD: "verhuurd",
};

// Design status values: beschikbaar | nieuw | onder_bod | verkocht | verhuurd
function mapStatus(o) {
  const status = rwStatus(o);
  const mapped = STATUS_MAP[status];
  if (mapped) return mapped;

  // Onbekende (nieuwe) Realworks-status: afleiden uit de naam, zodat een
  // toekomstige variant niet stilletjes als "beschikbaar" doorgaat.
  if (status) {
    if (status.includes("VOORBEHOUD") || status.includes("BOD") || status.includes("OPTIE")) {
      return "onder_bod";
    }
    if (status.includes("VERHUURD")) return "verhuurd";
    if (status.includes("VERKOCHT") || status.includes("GEVEILD")) return "verkocht";
    return "beschikbaar";
  }

  // Geen status meegeleverd: terugvallen op de transactievelden. Dit is de
  // oude afleiding en alleen nog het laatste redmiddel — ingetrokken objecten
  // zijn op dit punt al door isPubliclyVisible() weggefilterd.
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
    // Realworks afdeling/vestiging-id; the Move bezichtigingsplanner widget
    // needs this as its department_id (confirmed: the makelaar's afdelingscode,
    // not algemeen.gekoppeldeMakelaar). See ViewingPlanner.
    department_id: o.diversen?.diversen?.afdelingscode
      ? String(o.diversen.diversen.afdelingscode)
      : null,
    // Registration date ("aangemeld"); used to sort newest listings first.
    // NB: invoerdatum is the Realworks entry date — confirm with Realworks that
    // this matches their "meest recent aangemeld" semantics (re-listings).
    listed_date: o.diversen?.diversen?.invoerdatum || null,
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
// design's property shape. Ingetrokken/geannuleerde en handmatig geblokkeerde
// objecten worden hier weggefilterd.
export async function fetchRealworksProperties() {
  const objecten = await fetchObjecten("?aantal=100");
  return objecten.filter(isPubliclyVisible).map(mapRealworksObject);
}

// Fetch a single listing by id. Realworks' list endpoint is the public surface
// we proxy, so we fetch and find — fine for this volume. Een verborgen object
// geeft null terug, zodat de detailpagina "niet gevonden" toont.
export async function fetchRealworksProperty(id) {
  const objecten = await fetchObjecten("?aantal=100");
  const match = objecten.find((o) => String(o.id) === String(id));
  return match && isPubliclyVisible(match) ? mapRealworksObject(match) : null;
}
