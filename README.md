# Nortem Log – Corporate Website

Mobile-first corporate site for Nortem Log, an international logistics company (Türkiye ⇄ Europe).
Built with Next.js (App Router), TypeScript, Tailwind CSS and framer-motion.

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, services, about, cargo types, why us, offices |
| `/hakkimizda` | Mission, vision, principles, offices |
| `/hizmetler` | All eight services and the cargo types carried |
| `/teklif-al` | Quote request form |
| `/iletisim` | Phones, WhatsApp, e-mail, map, offices, social links |

## Getting started

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev
```

Open <http://localhost:3000>.

## Configuration

All brand facts (phones, e-mail, offices, services, map) live in [`src/lib/site.ts`](src/lib/site.ts).

Environment variables (see [`.env.example`](.env.example)):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph |
| `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_FACEBOOK_URL` | Social profile links |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | Mail transport for form submissions |
| `INQUIRY_TO_EMAIL` | Inbox that receives quote requests |
| `INQUIRY_WEBHOOK_URL` | Optional extra channel (Slack, CRM, ...) |

Form submissions go through `POST /api/inquiry`: validated with Zod, rate limited per IP
(5 requests / 10 minutes, in memory) and delivered by SMTP and/or webhook. In production the
request fails when no delivery channel is configured, so leads are never dropped silently.

## Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm run lint    # ESLint
```

## Image credits

Hero, service and about images come from the company's own site. The highway, warehouse and
storage photos are from [Unsplash](https://unsplash.com) (Unsplash License).
