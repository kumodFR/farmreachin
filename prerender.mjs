/* Static generation. Renders every route to HTML with react-dom/server so all
   critical content — hero, headings, navigation, metrics, service copy — is in
   the server response. Run after `vite build`; `npm run build` does both. */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = 'dist';
const SSR = 'dist-ssr/entry-server.js';
const ORIGIN = process.env.VITE_SITE_ORIGIN || 'https://farmreach.in';

const { render, PAGES, NOT_FOUND } = await import(pathToFileURL(join(process.cwd(), SSR)).href);

const template = await readFile(join(DIST, 'index.html'), 'utf8');

/* The not-found page must not be indexed, and must not claim a canonical of
   its own: a self-canonical invites a crawler to treat it as a real page. It
   gets a robots noindex in place of the canonical link.

   `pwa` swaps the manifest link, the iOS home-screen title and the iOS
   home-screen icon so a BIRD page is installable as "BIRD" with its own
   icon, not "Farmreach" — set per route in App.jsx; routes without one keep
   the site defaults already in the template. */
const DEFAULT_PWA = {
  manifest: '/site.webmanifest',
  appleTitle: 'Farmreach',
  appleIcon: '/assets/img/apple-touch-icon.png'
};

const withMeta = (html, meta, url, indexable = true, pwa = DEFAULT_PWA) => html
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`)
  .replace(/(<meta name="description" content=")[\s\S]*?(">)/, `$1${meta.description}$2`)
  .replace(
    /<link rel="canonical" href="[^"]*">/,
    indexable
      ? `<link rel="canonical" href="${url}">`
      : '<meta name="robots" content="noindex, follow">'
  )
  .replace(/(<meta property="og:title" content=")[\s\S]*?(">)/, `$1${meta.title}$2`)
  .replace(/(<meta property="og:description" content=")[\s\S]*?(">)/, `$1${meta.description}$2`)
  .replace(/(<meta property="og:url" content=")[^"]*(">)/, `$1${url}$2`)
  .replace(/<link rel="manifest" href="[^"]*">/, `<link rel="manifest" href="${pwa.manifest}">`)
  .replace(/(<meta name="apple-mobile-web-app-title" content=")[^"]*(">)/, `$1${pwa.appleTitle}$2`)
  .replace(/(<meta name="application-name" content=")[^"]*(">)/, `$1${pwa.appleTitle}$2`)
  .replace(/<link rel="apple-touch-icon" href="[^"]*"([^>]*)>/, `<link rel="apple-touch-icon" href="${pwa.appleIcon}"$1>`);

const emit = async (route) => {
  const { html, meta } = render(route.path);
  const url = ORIGIN + (route.path === '/' ? '/' : route.path);
  const file = route.path === '/'
    ? join(DIST, 'index.html')
    : route.path === '/404'
      ? join(DIST, '404.html')
      : join(DIST, route.path.slice(1), 'index.html');

  const page = withMeta(template, meta, url, route.indexable !== false, route.pwa).replace('<!--app-html-->', html);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page, 'utf8');
  console.log('prerendered', file);
};

for (const route of PAGES) await emit(route);
await emit(NOT_FOUND);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.filter((p) => p.indexable !== false).map((p) => `  <url><loc>${ORIGIN}${p.path}</loc><changefreq>monthly</changefreq><priority>${p.path === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`;
await writeFile(join(DIST, 'sitemap.xml'), sitemap, 'utf8');
console.log('wrote sitemap.xml');

await rm('dist-ssr', { recursive: true, force: true });
