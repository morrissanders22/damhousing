# Dam Housing

Makelaardij-website voor Dam Housing (Amsterdam), gebouwd met **Next.js 16 (App Router)** en **React 19**.

Oorspronkelijk gegenereerd in [base44](https://base44.com) als een Vite + React SPA en gemigreerd naar Next.js. De woningdata (`Property`) komt nog steeds van het base44-platform via de base44 SDK.

## Stack

- **Next.js 16** App Router + **React 19**
- **Tailwind CSS v3** met het Dam Housing design-system (zie [src/app/globals.css](src/app/globals.css) + [tailwind.config.js](tailwind.config.js))
- shadcn/ui componenten (Radix) — [src/components/ui](src/components/ui)
- **TanStack Query** voor data-fetching
- **framer-motion** voor animaties
- **@base44/sdk** als datalaag (publieke app, geen login)

## Ontwikkelen

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # productie-build
npm run lint     # ESLint
```

## Architectuur

| Onderdeel | Locatie |
|---|---|
| Routes (App Router) | [src/app](src/app) — elke `page.jsx` her-exporteert een view |
| Pagina-componenten | [src/views](src/views) — `Home`, `Properties`, `PropertyDetail`, `Verkoop`, `Aankoop`, `Verhuur`, `Taxatie`, `About`, `Contact`, `Services` |
| Layout / shell | [src/components/layout/AppShell.jsx](src/components/layout/AppShell.jsx) (Navbar, Footer, WhatsApp-knop, Toaster, scroll-to-top) |
| base44 client | [src/api/base44Client.js](src/api/base44Client.js) |
| Router-shim | [src/lib/router.jsx](src/lib/router.jsx) — mapt het react-router-oppervlak (`Link`, `useLocation`, `useNavigate`, `useParams`) op Next.js |

### Routing

Pagina's gebruikten oorspronkelijk `react-router-dom`. Bij de migratie is dat vervangen door:

1. Bestandsgebaseerde routes in [src/app](src/app).
2. Een dunne compat-shim ([src/lib/router.jsx](src/lib/router.jsx)) zodat de geporteerde componenten `Link to=…`, `useLocation`, `useNavigate` en `useParams` ongewijzigd kunnen blijven gebruiken.

### base44 datalaag

De app is publiek (`public_without_login`). De base44 SDK doet relatieve `/api/...`-calls; die worden in [next.config.ts](next.config.ts) via een rewrite doorgestuurd naar `https://app.base44.com`, zodat er geen CORS-problemen zijn.

App ID: `69de2de67917694d33fdfed5`.
