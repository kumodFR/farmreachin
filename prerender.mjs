/* Static generation. Renders every route to HTML with react-dom/server so all
   critical content — hero, headings, navigation, metrics, service copy — is in
   the server response. Run after `vite build`; `npm run build` does both. */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { EXECUTIVE_PROFILES } from './src/data/content.js';

const DIST = 'dist';
const SSR = 'dist-ssr/entry-server.js';
const ORIGIN = process.env.VITE_SITE_ORIGIN || 'https://farmreach.in';

const { render, PAGES, NOT_FOUND } = await import(pathToFileURL(join(process.cwd(), SSR)).href);

const template = await readFile(join(DIST, 'index.html'), 'utf8');

/* Visible breadcrumb trail text, one source of truth shared with the JSON-LD
   below — kept here rather than duplicated per page component. Must match
   each page's <PageHead crumb="..."> exactly; routes without a visible
   breadcrumb (home, legal pages, 404) are intentionally absent so the
   structured data never claims a breadcrumb nobody can see. */
const BREADCRUMB_LABEL = {
  '/farmreach-os': 'Farmreach OS',
  '/consulting': 'Advisory',
  '/company': 'Our Story',
  '/recognition': 'Recognition',
  '/gallery': 'Gallery',
  '/contact': 'Contact'
};

const breadcrumbJsonLd = (path) => {
  const label = BREADCRUMB_LABEL[path];
  if (!label) return null;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Farmreach', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: label, item: `${ORIGIN}${path}` }
    ]
  };
};

/* Person nodes for the two leadership profiles on /company. alternateName
   covers the name variants people actually search (full given name, family
   name alone, with/without the middle initial) without inventing anything —
   every variant here is a name or alias the site itself already displays.
   knowsAbout mirrors each person's own `expertise`/capability-area copy, so
   the schema states nothing the visible profile doesn't already say. */
const personJsonLd = (p) => ({
  '@type': 'Person',
  '@id': `${ORIGIN}/company#${p.id}`,
  name: p.name,
  alternateName: p.seoAlternateNames,
  jobTitle: p.modalRole || p.role,
  worksFor: { '@id': `${ORIGIN}/#organization` },
  description: p.summary || p.story?.[0],
  image: `${ORIGIN}${p.photo}`,
  url: `${ORIGIN}/company#${p.id}`,
  sameAs: [p.linkedin].filter(Boolean),
  ...(p.expertise?.length ? { knowsAbout: p.expertise } : {})
});

const SEO_ALTERNATE_NAMES = {
  pradeep: ['Pradeep Raj', 'Pradeep', 'Pradeep Raj Y Farmreach'],
  abila: ['Abila', 'Abila V', 'Thangathtamilazhagie', 'Thangathtamilazhagie V Farmreach']
};

const pageJsonLd = (path) => {
  const blocks = [];
  const crumb = breadcrumbJsonLd(path);
  if (crumb) blocks.push(crumb);
  if (path === '/company') {
    for (const p of EXECUTIVE_PROFILES) {
      blocks.push(personJsonLd({ ...p, seoAlternateNames: SEO_ALTERNATE_NAMES[p.id] }));
    }
  }
  if (!blocks.length) return '';
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': blocks })}</script>`;
};

/* The not-found page must not be indexed, and must not claim a canonical of
   its own: a self-canonical invites a crawler to treat it as a real page. It
   gets a robots noindex in place of the canonical link. */
const withMeta = (html, meta, url, indexable = true) => html
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
  .replace(/(<meta property="og:url" content=")[^"]*(">)/, `$1${url}$2`);

const emit = async (route) => {
  const { html, meta } = render(route.path);
  const url = ORIGIN + (route.path === '/' ? '/' : route.path);
  const file = route.path === '/'
    ? join(DIST, 'index.html')
    : route.path === '/404'
      ? join(DIST, '404.html')
      : join(DIST, route.path.slice(1), 'index.html');

  const page = withMeta(template, meta, url, route.path !== '/404')
    .replace('<!--page-jsonld-->', pageJsonLd(route.path))
    .replace('<!--app-html-->', html);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page, 'utf8');
  console.log('prerendered', file);
};

for (const route of PAGES) await emit(route);
await emit(NOT_FOUND);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map((p) => `  <url><loc>${ORIGIN}${p.path}</loc><changefreq>monthly</changefreq><priority>${p.path === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`;
await writeFile(join(DIST, 'sitemap.xml'), sitemap, 'utf8');
console.log('wrote sitemap.xml');

await rm('dist-ssr', { recursive: true, force: true });
