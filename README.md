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
/contact          Contact
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
    assets/img/              logo (mono + colour), favicon
    robots.txt
  src/
    main.jsx                 client entry (hydrate or render)
    entry-server.jsx         SSR entry used by prerender.mjs
    App.jsx                  route table + document-title sync
    router.jsx               ~60-line history router, Link, ExternalMark
    components/
      Header, Footer, Hero, ThemeToggle, SectionHeading, CTA, Metrics,
      Ecosystem, Architecture, TransformationJourney, ConsultingService,
      Timeline, Capabilities, LogoWall, People, ContactForm, GeoVisual,
      PageHead, Reveal
    pages/
      Home, FarmreachOS, Consulting, Company, Contact, NotFound
    theme.js                 theme read/apply (single localStorage key)
    data/
      site.js                config incl. FARMINSTA_URL
      navigation.js          nav + route list
      metrics.js             approved scale figures
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
contact/index.html
404.html
sitemap.xml
robots.txt
assets/…
```

Deploy `dist/` to any static host or CDN.

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
ships no mapping library and makes no data request. Nodes sit at real city
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
3. Supply leadership portraits and approved partner marks; both are placeholders.
4. Connect `VITE_CONTACT_ENDPOINT` and add server-side validation plus spam
   protection.
5. Confirm the Farminsta production URL in `.env`.
6. Decide whether light or dark should be the default for first-time visitors;
   the site currently follows the visitor's system preference and falls back to
   light.
