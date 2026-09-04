"""Bouwt api/data/pages-bootstrap.json uit de ECHTE Next.js-bron.

Waarom: bij een WordPress-migratie komt de bootstrap uit de statische HTML. Deze
site heeft die niet — de content zit in React-componenten en de SEO-meta in de
`metadata`-exports van de App Router. Zonder deze seed staan Pagina's, Media en
SEO leeg en lijkt de hele admin stuk.

Bronnen (de code blijft de single source of truth):
  - src/app/**/page.jsx   -> routes + metadata (titel, omschrijving, canonical)
  - src/views/*.jsx       -> secties per pagina + afbeeldingen
  - src/components/**     -> afbeeldingen (hero's, over-ons, reviews)
  - public/               -> lokale logo's

NB: `spa_texts` blijft leeg zolang scripts/wire_spa_texts.py niet is gedraaid.
Dat is bewust: de editor hoort alleen teksten te tonen die ook echt via een
t()-sleutel uit het CMS komen. Raden we ze uit de bron, dan toont de editor
velden die bij opslaan niets veranderen aan de site.

Draaien:  python3 scripts/build_bootstrap.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
APP = SRC / "app"
SITE_URL = "https://damhousing.nl"


def read(p: Path) -> str:
    return p.read_text(encoding="utf-8")


# ---------------------------------------------------------------- media ----
media, gezien = [], set()


def mime_of(url: str) -> str:
    u = url.lower().split("?")[0]
    if u.endswith((".jpg", ".jpeg")):
        return "image/jpeg"
    if u.endswith(".webp"):
        return "image/webp"
    if u.endswith(".svg"):
        return "image/svg+xml"
    if u.endswith(".pdf"):
        return "application/pdf"
    return "image/png"


def add_media(url: str, alt: str = "") -> None:
    if not url or url in gezien:
        return
    gezien.add(url)
    media.append({
        "id": f"seed{len(media):03d}",
        "url": url,
        "filename": url.rstrip("/").split("/")[-1].split("?")[0],
        "alt": alt,
        "mime": mime_of(url),
        "bytes": 0,
        "created": "",
        "used_on": [],
    })


# 1. Alle base44-CDN-afbeeldingen uit de bron. Realworks-URL's slaan we bewust
#    over: die horen bij een object uit de feed en verdwijnen als het object weg
#    is — die in de mediabibliotheek zetten levert dode plaatjes op.
BEELD_RE = re.compile(r'https://media\.base44\.com/[^"\'\s)]+')
for bestand in sorted(SRC.rglob("*.jsx")) + sorted(SRC.rglob("*.tsx")):
    for url in dict.fromkeys(BEELD_RE.findall(read(bestand))):
        add_media(url, bestand.stem)

# 2. Lokale assets uit public/
for pad in sorted((ROOT / "public").glob("*")):
    if pad.suffix.lower() in (".png", ".jpg", ".jpeg", ".webp", ".svg", ".pdf"):
        add_media("/" + pad.name, pad.stem.replace("-", " "))


# ---------------------------------------------------------------- pages ----
# De secties waaruit de homepage is opgebouwd (src/views/Home.jsx). Alleen hier
# mag de klant herordenen — de andere routes zijn één samenhangende pagina en
# een sleepgreep die niets doet is erger dan geen sleepgreep.
HOME_SECTIES = [
    ("hero", "Hero (bovenaan)"),
    ("diensten", "Diensten"),
    ("aanbod", "Uitgelicht aanbod"),
    ("over-ons", "Over DAM Housing"),
    ("reviews", "Google-reviews"),
    ("cta", "Oproep onderaan"),
]
BLOKKEN_SECTIE = {"id": "blokken", "label": "Eigen blokken"}


def metadata_van(page_file: Path) -> tuple:
    """Titel + omschrijving uit de `export const metadata` van een App Router-route.

    De titel staat er in twee vormen: `title: "Contact"` of, op de homepage,
    `title: { absolute: "..." }`. Beide uitlezen, anders krijgt juist de homepage
    een lege SEO-titel in de admin.
    """
    src = read(page_file)
    m = re.search(r"export const metadata\s*=\s*\{(.*?)\n\};", src, re.S)
    if not m:
        return "", ""
    blk = m.group(1)
    t = re.search(r'title:\s*\{\s*absolute:\s*"((?:[^"\\]|\\.)*)"', blk) or \
        re.search(r'title:\s*"((?:[^"\\]|\\.)*)"', blk)
    d = re.search(r'description:\s*\n?\s*"((?:[^"\\]|\\.)*)"', blk)
    return (t.group(1) if t else ""), (d.group(1) if d else "")


pages_index, pages = [], {}


def add_page(slug, title, page_file, secties=None):
    meta_title, meta_desc = metadata_van(page_file)
    path = "/" + slug if slug else "/"
    pages_index.append({
        "slug": slug, "title": title, "status": "published", "template": "react",
        "url": path, "in_sitemap": True, "updated_at": "",
        "meta_title": meta_title, "meta_description": meta_desc,
    })
    secs = secties or [("pagina", title)]
    pages[f"page:{slug}"] = {
        "slug": slug, "title": title, "status": "published", "template": "react",
        # ÉÉN lijst, zoals op de andere sites: de ontworpen secties staan als blok
        # tussen de eigen blokken van de klant. `fixed` = niet verplaatsbaar omdat
        # de pagina niet uit losse secties is opgebouwd.
        "content_blocks": [{"type": "dam-sectie", "section": sid,
                            "fixed": secties is None} for sid, _ in secs],
        "spa_texts": [],
        "sections": [sid for sid, _ in secs],
        "all_sections": [{"id": sid, "label": lab} for sid, lab in secs] + [BLOKKEN_SECTIE],
        "layout_editable": secties is not None,
        "meta": {"title": meta_title, "description": meta_desc,
                 "canonical": SITE_URL + (path if path != "/" else "/"),
                 "robots": "index,follow"},
    }


# De routes van de App Router. /woning/[id] staat er bewust NIET bij: die pagina's
# komen per object uit de Realworks-feed en horen niet als CMS-pagina in de admin.
ROUTES = [
    ("", "Home", APP / "page.jsx", HOME_SECTIES),
    ("aanbod", "Woningaanbod", APP / "aanbod" / "page.jsx", None),
    ("diensten", "Diensten", APP / "diensten" / "page.jsx", None),
    ("verkoop", "Verkoop", APP / "verkoop" / "page.jsx", None),
    ("aankoop", "Aankoop", APP / "aankoop" / "page.jsx", None),
    ("verhuur", "Verhuur", APP / "verhuur" / "page.jsx", None),
    ("taxatie", "Taxatie", APP / "taxatie" / "page.jsx", None),
    ("over-dam-housing", "Over DAM Housing", APP / "over-dam-housing" / "page.jsx", None),
    ("contact", "Contact", APP / "contact" / "page.jsx", None),
]

for slug, titel, bestand, secties in ROUTES:
    if not bestand.exists():
        raise SystemExit(f"route-bestand ontbreekt: {bestand} — ROUTES bijwerken")
    add_page(slug, titel, bestand, secties)

# ----------------------------------------------------------------- write ----
uit = {
    "pages": pages,
    "pages_index": pages_index,
    "media_index": media,
    "site_header_html": "",
    "site_footer_html": "",
}
dest = ROOT / "api" / "data" / "pages-bootstrap.json"
dest.parent.mkdir(parents=True, exist_ok=True)
dest.write_text(json.dumps(uit, ensure_ascii=False, indent=1), encoding="utf-8")

print(f"media_index : {len(media)} items")
print(f"pages_index : {len(pages_index)} pagina's")
ontbreekt = [p["url"] for p in pages_index if not p["meta_title"] or not p["meta_description"]]
for p in pages_index:
    print(f"   {p['url']:20} {p['meta_title'][:56]}")
if ontbreekt:
    print("LET OP — zonder meta-titel/omschrijving:", ", ".join(ontbreekt))
