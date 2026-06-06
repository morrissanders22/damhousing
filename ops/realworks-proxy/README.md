# Realworks static-IP egress proxy

Vercel-functies hebben **geen vast uitgaand IP**, maar het Realworks-token is
IP-gebonden (whitelist). Daarom routeren we de Realworks-calls via een proxy op
de **OVH-server met vast IP `57.129.19.232`**, en whitelisten we dat IP bij
Realworks.

```
Vercel function ──CONNECT──► OVH tinyproxy (57.129.19.232:8443) ──TLS──► api.realworks.nl
   REALWORKS_PROXY_URL                  basic auth                   token in TLS-tunnel
```

Het Realworks-token zit in de end-to-end TLS-tunnel naar Realworks; de proxy
ziet het **niet** (alleen de hostname via CONNECT).

## 1. Proxy installeren op de OVH-server

```bash
ssh root@57.129.19.232 'mkdir -p /opt/realworks-proxy'
scp ops/realworks-proxy/tinyproxy.conf root@57.129.19.232:/opt/realworks-proxy/tinyproxy.conf
scp ops/realworks-proxy/setup.sh      root@57.129.19.232:/opt/realworks-proxy/setup.sh
ssh root@57.129.19.232 'bash /opt/realworks-proxy/setup.sh'
```

> Installer-bestanden staan in `/opt/realworks-proxy` (persistent), niet in
> `/tmp` (wordt bij elke reboot geleegd). De draaiende proxy zelf leest
> `/etc/tinyproxy/tinyproxy.conf` en start via systemd automatisch na een reboot.

Open daarna in de **OVH-manager** (network firewall, indien actief) poort
`8443/tcp` zodat Vercel de proxy kan bereiken.

## 2. IP whitelisten bij Realworks

Vraag Realworks om voor dit token **`57.129.19.232/32`** toe te voegen aan de
toegestane IP-range. (De lokale-dev-IP's hoeven niet meer; alle verkeer loopt
via de proxy.)

## 3. Env var instellen

Proxy-URL (let op: dit is een geheim, niet committen):

```
http://realworks:<PROXY_WACHTWOORD>@57.129.19.232:8443
```

> Het echte wachtwoord staat **niet** in git — alleen in `.env.local` (gitignored)
> en op de OVH-server. Roteren? Pas `BasicAuth` op de server aan en update
> `REALWORKS_PROXY_URL` lokaal én op Vercel.

- **Lokaal**: staat in `.env.local` als `REALWORKS_PROXY_URL`.
- **Productie/Preview op Vercel**: `vercel env add REALWORKS_PROXY_URL`
  (of via het Vercel-dashboard) voor de juiste environments.

De route [`src/app/api/realworks/route.ts`](../../src/app/api/realworks/route.ts)
gebruikt deze var automatisch via undici `ProxyAgent`.

## 4. Testen

```bash
# Tegen de lokale dev-server (die via de proxy naar Realworks gaat):
curl -sS 'http://localhost:3000/api/realworks?aantal=1' -w '\nHTTP %{http_code}\n'
```

Verwacht: HTTP 200 met objecten — geen 403 meer.

## Wachtwoord roteren

Pas `BasicAuth` in `tinyproxy.conf` aan, herhaal stap 1, en update
`REALWORKS_PROXY_URL` in `.env.local` én op Vercel.
