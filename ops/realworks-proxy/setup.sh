#!/usr/bin/env bash
#
# Installeer de Realworks static-IP egress proxy (tinyproxy) op de OVH-server.
# Draai dit ALS ROOT op de OVH-server (vast IP 57.129.19.232), niet lokaal.
#
# Installer-bestanden staan in /opt/realworks-proxy (persistent, overleeft reboot
# — anders dan /tmp, dat bij elke herstart geleegd wordt).
#
#   ssh root@57.129.19.232 'mkdir -p /opt/realworks-proxy'
#   scp ops/realworks-proxy/tinyproxy.conf root@57.129.19.232:/opt/realworks-proxy/tinyproxy.conf
#   scp ops/realworks-proxy/setup.sh      root@57.129.19.232:/opt/realworks-proxy/setup.sh
#   ssh root@57.129.19.232 'bash /opt/realworks-proxy/setup.sh'
#
set -euo pipefail

CONF_SRC="${1:-/opt/realworks-proxy/tinyproxy.conf}"
PROXY_PORT=8443

echo "==> tinyproxy installeren"
if command -v apt-get >/dev/null 2>&1; then
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -qq
  apt-get install -y tinyproxy
elif command -v dnf >/dev/null 2>&1; then
  dnf install -y epel-release || true
  dnf install -y tinyproxy
else
  echo "FOUT: geen apt-get of dnf gevonden. Installeer tinyproxy handmatig." >&2
  exit 1
fi

echo "==> configuratie plaatsen"
install -d -m 755 /run/tinyproxy
cp "$CONF_SRC" /etc/tinyproxy/tinyproxy.conf
chmod 644 /etc/tinyproxy/tinyproxy.conf

echo "==> firewall (poort ${PROXY_PORT}/tcp openzetten)"
if command -v ufw >/dev/null 2>&1 && ufw status | grep -q "Status: active"; then
  ufw allow ${PROXY_PORT}/tcp
elif command -v firewall-cmd >/dev/null 2>&1 && firewall-cmd --state 2>/dev/null | grep -q running; then
  firewall-cmd --permanent --add-port=${PROXY_PORT}/tcp
  firewall-cmd --reload
else
  echo "   (geen actieve ufw/firewalld gevonden — controleer zelf of poort ${PROXY_PORT} open is,"
  echo "    inclusief de OVH network firewall in de OVH-manager.)"
fi

echo "==> service starten"
systemctl enable tinyproxy
systemctl restart tinyproxy
sleep 1
systemctl --no-pager --full status tinyproxy | head -n 8

echo
echo "==> KLAAR. Snelle lokale test op de server zelf:"
echo "    curl -sS -x http://realworks:WACHTWOORD@127.0.0.1:${PROXY_PORT} https://api.realworks.nl -o /dev/null -w 'proxy ok: %{http_code}\\n'"
