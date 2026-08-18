# Farmreach Technologies — farmreach.in

React + Vite implementation of the Farmreach Technologies corporate website.

**Positioning:** India's Agricultural Operating Systems & Transformation Company
**Brand idea:** We build the systems that make agriculture work.

Every route is statically generated with `react-dom/server` at build time, so all
critical content — hero, headings, navigation, metrics, service copy — exists in
the HTML the server returns. The client then hydrates the same tree.

## Stack

- React 18, Vite 5. No router library, no UI library, no animation library.
- Two runtime dependencies: `react`, `react-dom`.
- CSS in three files: `tokens.css` (design tokens + both themes), `global.css`
  (components), `responsive.css` (breakpoint layouts). No CSS framework.
- Light and dark themes, both designed. **Dark is the default landing
  experience**; a stored choice always wins. The theme is set before first paint
  by an inline script in `index.html` (single key, `farmreach-theme`) and toggled
  from the header and the mobile drawer.
- Overpass only, `display=swap`.
- Inline SVG for the India operating-network visual and all icons.

## Routes

```
/                 Home
/farmreach-os     Farmreach OS — Government Agriculture Operating System
/consulting       Consulting & Transformation (five capabilities)
/company          Our Story (route unchanged)
/recognition      Awards and recognition
/gallery          Photographs from the field since 2016
/contact          Contact
/terms            Terms of use
/privacy          Privacy policy
404.html          Not found
```

Farminsta OS is **not** a route. It is presented as part of the Farmreach family
and links out to the existing Farminsta site.

## Project structure

```
web/
  index.html                 app shell + base metadata
  vite.config.js
  prerender.mjs              static generation + sitemap
  tools/build-preview.mjs    generates preview/app.jsx (design review only)
  .env.example
  public/
    assets/img/              logo (mono + colour), favicon + app icon set
    robots.txt
    site.webmanifest         installed-app identity (name, icons, theme colour)
  src/
    main.jsx                 client entry (hydrate or render)
    entry-server.jsx         SSR entry used by prerender.mjs
    App.jsx                  route table + document-title sync
    router.jsx               ~60-line history router, Link, ExternalMark
    components/
      Header, Footer, Hero, ThemeToggle, SectionHeading, CTA,
      Ecosystem, Architecture, TransformationJourney, ConsultingService,
      Capabilities, People, ContactForm, GeoVisual, GalleryGrid,
      JourneyTimeline, LegalDocument, StoryAside, PageHead, Reveal
    pages/
      Home, FarmreachOS, Consulting, Company, Recognition, Gallery,
      Contact, Terms, Privacy, NotFound
    theme.js                 theme read/apply (single localStorage key)
    data/
      site.js                config incl. FARMINSTA_URL
      navigation.js          nav + route list
      heroMetrics.js         approved scale figures + map callouts
      gallery.js             photograph entries (real images only)
      recognition.js         recognition entries (pending ones stay unpublished)
      services.js            five consulting services + method
      operatingSystems.js    Farmreach OS content (capabilities, principles, delivery)
      content.js             narrative copy + ARCHITECTURE (core, three pillars, foundation)
      geo.js                 India geometry + node coordinates
    styles/
      tokens.css, global.css, responsive.css
```

## Install, run, build

```bash
cd web
npm install
npm run dev        # http://localhost:5173
npm run build      # vite build → SSR build → prerender.mjs → dist/
npm run preview    # serve the built dist/
```

`npm run build` output in `dist/`:

```
index.html
farmreach-os/index.html
consulting/index.html
company/index.html
recognition/index.html
gallery/index.html
contact/index.html
terms/index.html
privacy/index.html
404.html
sitemap.xml
robots.txt
assets/…
```

Production hosting is **Vercel** (farmreach.in): it serves `dist/` statically and
runs `api/contact.js` as a serverless function. `server.mjs` remains as a
dependency-free self-hosted alternative (see **Self-hosted deployment** below).

### Host configuration

- Serve `dist/` as the web root over HTTPS with HTTP→HTTPS redirect.
- Clean URLs: `/consulting` resolves via `consulting/index.html`. On Nginx:
  `try_files $uri $uri/index.html /404.html;`
- Error document: `/404.html`.
- Cache `assets/**` immutably (Vite fingerprints its own build assets); serve
  HTML with a short cache and revalidation.
- Suggested headers: `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, and a CSP allowing
  `fonts.googleapis.com` / `fonts.gstatic.com` (or self-host Overpass and drop them).

## Environment variables

Copy `.env.example` to `.env`. No secrets are read at build or runtime.

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_ORIGIN` | Canonical / Open Graph origin |
| `VITE_FARMINSTA_URL` | **The single place the Farminsta destination is set** |
| `VITE_CONTACT_ENDPOINT` | Contact form POST target. Blank = validate-only mode |

### Server-side only (never `VITE_` prefixed, never committed)

Read by `api/contact.js` and `api/_lib/mailer.js`. Configure them in the Vercel
project environment (Production + Preview); placeholders live in `.env.example`.

| Variable | Purpose |
| --- | --- |
| `CONTACT_TO_EMAIL` | Internal recipient (default `ypr@farmreach.in`) |
| `CONTACT_CC_EMAIL` | Internal CC (default `abila@farmreach.in`) |
| `CONTACT_ALLOW_ORIGIN` | Comma-separated origins allowed to POST the form |
| `MAIL_PROVIDER` | `resend` \| `smtp` \| `console` (defaults to resend when the key is set) |
| `MAIL_FROM` | Sender — `Farmreach <website@farmreach.in>` |
| `RESEND_API_KEY` | Resend API key (farmreach.in is a verified domain) |
| `SMTP_URL` | Only if provider = smtp (requires adding `nodemailer`) |
| `PORT` / `HOST` | `server.mjs` bind address (default `8080` / `0.0.0.0`) |

With no provider configured, the mailer runs in console mode: it logs the subject
server-side and sends nothing, so local and review builds work offline.

## Enquiry system

One endpoint serves the whole site. Every CTA — *Talk to us*, *Start a
conversation*, *Request a state briefing*, the header and drawer buttons, the
closing routes — links to `/contact`, which renders the single
`components/ContactForm.jsx`. That form is the only thing that posts, and it
posts to `POST /api/contact`. There is no other email path in the project.

```
ContactForm.jsx  ->  POST /api/contact  ->  api/_lib/mailer.js
                                        ->  Resend API (RESEND_API_KEY)
                                        ->  Farmreach <website@farmreach.in>
```

- `src/lib/enquiry.js` — the shared contract: six fields, limits, validation,
  subject construction, bot heuristics. Imported by **both** the form and the
  handler, so client and server validate identically.
- `src/lib/emailTemplates.js` — both emails (internal enquiry, visitor
  confirmation). Table-based, inline-styled, Outlook-safe, `#016F3B`.
- `api/contact.js` — validation, sanitisation, per-IP rate limiting (5 per
  10 minutes), 16 KB body cap, honeypot + minimum-fill-time bot traps, CORS
  restricted to `CONTACT_ALLOW_ORIGIN`, JSON responses only.
- `api/_lib/mailer.js` — the only place the email provider is touched.
  Swapping providers means editing this one file; keys are never logged or
  returned to a client.

Headers on the internal email: `From: MAIL_FROM`,
`To: CONTACT_TO_EMAIL`, `Cc: CONTACT_CC_EMAIL`,
`Reply-To:` the visitor's work email, subject
`Farmreach Enquiry - <Organisation>`. The visitor confirmation is a **separate
send** (subject *Thank you for contacting Farmreach*) so internal recipients
never appear in its headers; if it fails, the enquiry still succeeds.

### Resend setup

Farmreach has its own Resend account with `farmreach.in` verified (SPF/DKIM).
The free plan allows one verified domain per account — this account is separate
from Farminsta's. Put the API key into the Vercel environment as
`RESEND_API_KEY`; never commit it. Note `website@farmreach.in` is a sending
identity only — no mailbox exists behind it yet, so replies rely on `Reply-To`.

## Vercel deployment

Push to `main`; Vercel builds with `npm run build`, serves `dist/`, and mounts
`api/contact.js` at `/api/contact` automatically. Configure the server-side
environment variables above in the project settings before the first deploy.

## Self-hosted deployment (alternative)

```bash
npm ci
npm run build          # dist/ (static, prerendered) + dist-ssr/
npm start              # node server.mjs — serves dist/ and POST /api/contact
```

`server.mjs` is dependency-free: static files with correct content types and
cache headers, `/404.html` fallback, clean URLs, and the enquiry endpoint. Run it
under systemd (or a container):

```ini
[Service]
WorkingDirectory=/opt/farmreach/web
EnvironmentFile=/etc/farmreach/web.env      # server-side variables, mode 0600
ExecStart=/usr/bin/node server.mjs
Restart=always
```

Reverse proxy (Nginx on the instance or an OCI load balancer) terminating TLS:

```nginx
location / {
  proxy_pass http://127.0.0.1:8080;
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;   # rate limiting needs this
  proxy_set_header X-Forwarded-Proto $scheme;
}
client_max_body_size 64k;
```

The `X-Forwarded-For` header is what per-IP rate limiting reads; without it every
request looks like one client. Deploy step order: `npm ci` -> `npm run build` ->
restart the service. Secrets come from the environment file — the repository
holds placeholders only.

`FARMINSTA_URL` is exported from `src/data/site.js` and consumed by the header,
footer, hero and the Farminsta OS panel. Changing it in one place changes it
everywhere.

Analytics: no vendor is hardcoded. Add a deferred snippet in `index.html` and
call it from wherever you need it; nothing in the app blocks on it.

## Business architecture

The site presents Farmreach as **one agricultural core with three operating
directions**, all equal:

| Direction | Kind | Destination |
| --- | --- | --- |
| Farmreach OS | Public Enterprise | `/farmreach-os` |
| Farminsta OS | Private Enterprise | external — `VITE_FARMINSTA_URL` |
| Consulting & Transformation | Advisory + Implementation | `/consulting` |

The three are named in the hero band, then drawn structurally by
`components/Architecture.jsx` — core, rail, three drops, three columns, shared
foundation (agricultural operating expertise, data, technology, field execution).
Tonal differentiation only: `--brand-deep` for public, `--brand-medium` for
private, `--brand-muted` for advisory. No second hue is introduced anywhere.

The umbrella statement is "One agricultural core. Three ways to transform how it
operates." Any two-OS phrasing must account for the consulting practice.

## Design system

Tokens live in `src/styles/tokens.css`: a brand ramp derived from `#016F3B`
(`--brand-deep`, `--brand`, `--brand-medium`, `--brand-muted`, `--brand-soft`,
`--brand-tint`, `--brand-light`) plus a neutral ramp, then **semantic** tokens
(`--surface-1/2/3`, `--text-primary/secondary/tertiary`, `--line`, `--line-hair`,
`--brand-accent`, and the `--geo-*` set). Components reference only the semantic
names, so both themes are controlled entirely from the token file.

### Two themes, one brand

| | Light (default) | Dark |
| --- | --- | --- |
| `--surface-1` | `#FFFFFF` | `#121614` |
| `--surface-2` | `#EBF2F0` | `#0B0E0C` |
| `--surface-3` (card) | `#FFFFFF` | `#181D1A` |
| Text | charcoal `#101413` | warm white |
| Accent | `#016F3B` | `#3FA96F` (legible on dark) |

**Light mode is genuinely light.** `#EBF2F0` is a primary surface, not an accent:
sections alternate white → mist → white → mist down every page, and the only dark
surface is the footer. Cards invert against their section — `--card-on-soft`
resolves to white on a mist section and to mist on a white section — so no dark
card ever appears in light mode.

**Dark mode is a designed dark**, charcoal and graphite with green as accent, not
a green surface. No glow, neon, gradient fill or glassmorphism in either theme;
accents are hairlines, 3px top rules, small marks and type.

### Section surface classes

```
.section--light        surface-1   white        | dark primary
.section--soft-green   surface-2   #EBF2F0      | deepest
.section--elevated     surface-3   white card   | elevated graphite
.on-ink                            always dark  — footer only
```

Every section carries one of these classes; none hardcodes a colour.
- Fluid type via `clamp()` throughout; Overpass weights 400–800 do the hierarchy.
- Breakpoints designed individually: `<480`, `480–767`, `768–1023`, `1024–1279`,
  `1280–1439`, `1440+`, with a max container so 1920 does not stretch.

## The India visual

An operating-ecosystem map, not physical infrastructure: activity clusters,
connected operating nodes, a coordinate grid. No roads, structures, machinery or
irrigation imagery anywhere in the design.

Geometry is Natural Earth 110m country data (public domain), projected in
Mercator to a 900 × 1000 viewBox and frozen into `src/data/geo.js`, so the page
ships no mapping library and makes no data request. The northern boundary is
hand-redrawn to India's official external boundary (Survey of India) — full
Jammu & Kashmir including Gilgit-Baltistan, and Aksai Chin. Natural Earth's
default de-facto lines must never be restored on this India-facing site. Nodes sit at real city
coordinates in the same projection; the grid is true 2° meridians and parallels;
cluster scatter comes from a fixed seed so server and client markup match.

**The complete map is always visible.** The viewBox holds the whole country with
margin, and no container applies negative margins or a fixed height that could
clip the northern boundary — Jammu & Kashmir, Ladakh and the north-east stay in
frame at every width. As the viewport narrows the visual sheds *data density*
(labels, inner grid, network lines, minor nodes), never geography.

Map colours resolve through `--geo-*` tokens, so the visual is drawn in charcoal
on the light theme and warm off-white on the dark theme rather than being
re-styled per theme in the component.

**State boundaries are not drawn.** No verified state-boundary dataset has been
approved. If Farmreach supplies one, add it as a second path layer in
`geo.js` — nothing else changes.

## Motion

CSS only: outline draw-in, activity points populating, network lines resolving,
cluster pulse, section reveals, metric count-up. All of it is suppressed under
`prefers-reduced-motion: reduce`, and `Reveal` fails visible — content is never
dependent on an animation firing.

## Accessibility

Skip link, one `h1` per route, ordered headings, `aria-current` on the active nav
item, focus-trapped mobile drawer with Escape-to-close and scroll lock, visible
focus rings, labelled form fields with `aria-live` errors, `role="img"` and a
description on the map, and external links marked with `rel="noopener"` plus a
visible outbound glyph. Text/background pairs are checked against WCAG AA at
their rendered sizes in both themes — including small label tokens and any
alpha-composited type on the solid brand green, which is measured composited
rather than as plain white.

## Design review preview

`preview/index.html` renders the same components from a generated single-file
bundle, so the design can be reviewed by opening one file — no install, no network.
React, ReactDOM and Babel are vendored in `preview/vendor/`; if they fail to load
the page shows a message rather than a blank screen. It uses hash routing and is
**not** the production build (Vite bundles React and compiles JSX ahead of time).
Regenerate after changing `src/`:

```bash
node tools/build-preview.mjs
```

## Copy status

Verbatim from the approved brief: positioning line, brand idea, hero paragraph,
CTA labels, the five consulting service names with their coverage and output
lists, the six scale figures, leadership names, and the closing CTA.

**Draft, needs Farmreach sign-off** (all in `src/data/`):

- Narrative section copy in `content.js` (system, architecture, transformation,
  scale, experience, story, philosophy, capability, Xpedition Labs, careers)
- The three pillar descriptions in `ARCHITECTURE.pillars`
- Service summary lines in `services.js` and stage descriptions in `METHOD`
- Farmreach OS capability descriptions, principles and delivery stages
- Ecosystem cell notes

Nothing asserts a client, certification, date or outcome that was not supplied.

## Known follow-ups

1. Self-host Overpass (`woff2`, 400/500/600/700/800) to drop the Google Fonts
   round-trip and improve LCP.
2. Supply `public/assets/img/farmreach-og.png` (1200 × 630) for Open Graph.
3. Supply approved partner marks — the Partnerships section on Our Story is
   removed until they exist.
4. Supply the third recognition entry (kept as a `pending` placeholder in
   `src/data/recognition.js`, filtered out of the page until confirmed). The
   removed testimonials rail lives in `farmreach-v2/web` if quotes are approved.
5. Create or forward a real `website@farmreach.in` mailbox so replies and
   bounces are handled.
