"""Eenmalige codemod: JSX-teksten omzetten naar t("sleutel", "tekst").

Draai dit ALLEEN voor het aansluiten van een nieuw bestand. Na het draaien staan
de sleutels in de code en zijn die leidend: als wij de tekst later aanpassen
blijft de aanpassing van de klant aan dezelfde sleutel hangen. Opnieuw over een
al aangesloten bestand draaien doet niets (die worden overgeslagen).

    python3 scripts/wire_spa_texts.py [--check]

Bewust NIET automatisch: string-arrays (`["Alle", "Badkamer"].map(...)`). Die zijn
van buitenaf niet te onderscheiden van filterwaarden of slugs, en een vertaalde
filterwaarde breekt de vergelijking. Die wire ik met de hand waar het puur
weergave is.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
COMP = SRC / "components" / "kitbedrijf"

# Header/footer/WhatsApp staan op ELKE pagina. Per route bewerkbaar maken zou een
# inconsistente site geven; het menu komt al uit het CMS.
SITEBREED = {"KitHeader", "KitFooter", "KitWhatsAppButton", "KitLightbox", "KitReveal"}

# Tekst tussen twee tags, op één regel, zonder JSX-expressies erin.
JSX_TEXT = re.compile(r'(>\s*)([A-Z][^<>{}\n]{5,600}?)(\s*<)')
JSX_PROP = re.compile(r'\b(placeholder|alt|title)=("([^"\n]{6,160})")')


def bestanden():
    uit = sorted(p for p in (SRC / "pages").glob("*.jsx"))
    uit += sorted(p for p in COMP.glob("*.jsx") if p.stem not in SITEBREED)
    return uit


def esc(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')


def wire(path):
    src = path.read_text(encoding="utf-8")
    if 'from "@/lib/content"' in src:
        return 0, src
    teller = [0]
    naam = path.stem

    def sleutel():
        teller[0] += 1
        return f"{naam}.{teller[0]}"

    def tekst(m):
        voor, kern, na = m.group(1), m.group(2), m.group(3)
        kern = " ".join(kern.split())
        if len(kern) < 6 or "=>" in kern or "${" in kern or kern.count(" ") > 120:
            return m.group(0)
        # Spatie/nieuwe regel eromheen letterlijk laten staan: JSX rekent anders
        # met de witruimte en dan verspringt de opmaak.
        return f'{voor}{{t("{sleutel()}", "{esc(kern)}")}}{na}'

    def prop(m):
        attr, kern = m.group(1), m.group(3)
        if "${" in kern or kern.startswith("http"):
            return m.group(0)
        return f'{attr}={{t("{sleutel()}", "{esc(kern)}")}}'

    nieuw = JSX_TEXT.sub(tekst, src)
    nieuw = JSX_PROP.sub(prop, nieuw)
    if not teller[0]:
        return 0, src

    # Import erbij, direct na de laatste import bovenaan.
    regels = nieuw.split("\n")
    laatste = max(i for i, r in enumerate(regels) if r.startswith("import "))
    regels.insert(laatste + 1, 'import { t } from "@/lib/content";')
    return teller[0], "\n".join(regels)


def main():
    check = "--check" in sys.argv
    totaal = 0
    for f in bestanden():
        n, nieuw = wire(f)
        if not n:
            continue
        totaal += n
        if not check:
            f.write_text(nieuw, encoding="utf-8")
        print(f"{f.relative_to(ROOT)}: {n}")
    print(f"totaal: {totaal}")
    if check and totaal:
        print("NIET aangesloten bestanden gevonden (draai zonder --check)")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
