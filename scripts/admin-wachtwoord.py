#!/usr/bin/env python3
"""Genereer een admin-wachtwoord + PBKDF2-hash voor deze site.

Gebruik:
    python3 scripts/admin-wachtwoord.py            # nieuw wachtwoord + hash
    python3 scripts/admin-wachtwoord.py "eigen-wachtwoord"

Zet in Vercel ALLEEN de hash:
    printf '%s' '<hash>' | vercel env add ADMIN_PASS_HASH production

ADMIN_PASSWORD blijft leeg. api/index.py heeft bewust geen fallback-wachtwoord:
een ontbrekende env-var mag nooit een open admin geven. Leg het wachtwoord zelf
vast in ~/.claude/secrets.md onder DAMHOUSING_ADMIN_PASSWORD.

Let op bij het gebruiken in een shell: de hash bevat een '$'. Bij `. bestand.env`
expandeert de shell dat als variabele en houd je een LEGE hash over — quote hem
altijd enkel ('...') of pipe hem via stdin.
"""
import hashlib
import secrets
import sys


def hash_password(pw: str) -> str:
    """Zelfde vorm als verify_password() in api/index.py: salt$hash, PBKDF2-SHA256."""
    salt = secrets.token_bytes(16)
    dk = hashlib.pbkdf2_hmac("sha256", pw.encode(), salt, 200000)
    return salt.hex() + "$" + dk.hex()


def main() -> None:
    if len(sys.argv) > 1:
        pw = sys.argv[1]
        print("Wachtwoord : (meegegeven)")
    else:
        pw = secrets.token_urlsafe(18)
        print("Wachtwoord :", pw)
    print("ADMIN_PASS_HASH:", hash_password(pw))


if __name__ == "__main__":
    main()
