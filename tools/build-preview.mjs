/* Builds preview/app.jsx: a single Babel-transpilable bundle of the React
   source, for design review in a browser with no toolchain. NOT the production
   build — that is `npm run build` (Vite + prerender.mjs).

   React, ReactDOM and Babel are vendored in preview/vendor/ so the review file
   opens offline and on networks that block public CDNs. If those files are ever
   removed, re-download them from:
     https://unpkg.com/react@18.3.1/umd/react.production.min.js
     https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js
     https://unpkg.com/@babel/standalone@7.24.7/babel.min.js

   Run: node tools/build-preview.mjs */
import { readFile, writeFile } from 'node:fs/promises';

const FILES = [
  "src/lib/enquiry.js",
  "src/lib/emailTemplates.js",
  "src/data/site.js",
  "src/data/navigation.js",
  "src/data/heroMetrics.js",
  "src/data/services.js",
  "src/data/operatingSystems.js",
  "src/data/recognition.js",
  "src/data/gallery.js",
  "src/data/content.js",
  "src/data/legal.js",
  "src/data/geo.js",
  "src/theme.js",
  "src/router.jsx",
  "src/components/Reveal.jsx",
  "src/components/ThemeToggle.jsx",
  "src/components/SectionHeading.jsx",
  "src/components/PageHead.jsx",
  "src/components/CTA.jsx",
  "src/components/Ecosystem.jsx",
  "src/components/Architecture.jsx",
  "src/components/TransformationJourney.jsx",
  "src/components/ApproachTrack.jsx",
  "src/components/CapabilityList.jsx",
  "src/components/JourneyTimeline.jsx",
  "src/components/ConsultingService.jsx",
  "src/components/ExecutiveProfiles.jsx",
  "src/components/LegalDocument.jsx",
  "src/components/StoryAside.jsx",
  "src/components/Capabilities.jsx",
  "src/components/GalleryGrid.jsx",
  "src/components/GeoVisual.jsx",
  "src/components/Hero.jsx",
  "src/components/ContactForm.jsx",
  "src/components/Header.jsx",
  "src/components/Footer.jsx",
  "src/pages/Home.jsx",
  "src/pages/FarmreachOS.jsx",
  "src/pages/Consulting.jsx",
  "src/pages/Company.jsx",
  "src/pages/Recognition.jsx",
  "src/pages/Gallery.jsx",
  "src/pages/Contact.jsx",
  "src/pages/Terms.jsx",
  "src/pages/Privacy.jsx",
  "src/pages/NotFound.jsx",
  "src/App.jsx"
];

const PAGE_META = {
  "src/pages/Home.jsx": "meta_Home",
  "src/pages/FarmreachOS.jsx": "meta_FarmreachOS",
  "src/pages/Consulting.jsx": "meta_Consulting",
  "src/pages/Company.jsx": "meta_Company",
  "src/pages/Recognition.jsx": "meta_Recognition",
  "src/pages/Gallery.jsx": "meta_Gallery",
  "src/pages/Contact.jsx": "meta_Contact",
  "src/pages/Terms.jsx": "meta_Terms",
  "src/pages/Privacy.jsx": "meta_Privacy",
  "src/pages/NotFound.jsx": "meta_NotFound"
};

let out = `/* GENERATED — do not edit by hand. Run: node tools/build-preview.mjs */
const { useState, useEffect, useRef, useCallback, createContext, useContext, Fragment } = React;
`;

for (const f of FILES) {
  let t = await readFile(f, 'utf8');
  t = t.replace(/^\s*import[\s\S]*?from\s+['"][^'"]*['"];\s*$/gm, '');
  t = t.replace(/^\s*import\s+['"][^'"]*['"];\s*$/gm, '');
  if (PAGE_META[f]) t = t.split('export const meta =').join(`const ${PAGE_META[f]} =`);
  t = t.replace(/^export default function/gm, 'function')
       .replace(/^export function/gm, 'function')
       .replace(/^export const/gm, 'const')
       .replace(/^export \{[^}]*\};?\s*$/gm, '');
  out += '\n/* ==== ' + f + ' ==== */\n' + t + '\n';
}

const swap = (a, b) => { out = out.split(a).join(b); };
swap("const env = (typeof import.meta !== 'undefined' && import.meta.env) || {};", 'const env = {};');
/* Hash routing for the review preview: only '#/route' hashes are routes, so
   in-page anchors (legal document sections, back-to-top) keep working. */
swap("setPath(window.location.pathname || '/')",
  "{ const h = window.location.hash; if (h && !h.startsWith('#/')) return; setPath(h.slice(1) || '/'); }");
swap('if (to === window.location.pathname) return;', "if (to === (window.location.hash.slice(1) || '/')) return;");
swap("window.history.pushState({}, '', to);", 'window.location.hash = to;');
swap('href={to} onClick={onClick}', 'href={"#" + to} onClick={onClick}');
[['homeMeta', 'meta_Home'], ['osMeta', 'meta_FarmreachOS'], ['consultingMeta', 'meta_Consulting'],
 ['companyMeta', 'meta_Company'], ['recognitionMeta', 'meta_Recognition'], ['galleryMeta', 'meta_Gallery'], ['contactMeta', 'meta_Contact'], ['termsMeta', 'meta_Terms'],
 ['privacyMeta', 'meta_Privacy'], ['notFoundMeta', 'meta_NotFound']]
  .forEach(([a, b]) => swap(a, b));
swap('href={\`/consulting#\${s.id}\`}', 'href={\`#/consulting\`}');
swap('src="/assets/img/', 'src="assets/img/');
/* Data-driven asset paths (portraits, recognition photos) need the same
   rewrite: the review preview is served from a subdirectory, so a leading
   slash resolves to the origin root and 404s. */
swap("'/assets/img/", "'assets/img/");
swap('"/assets/img/', '"assets/img/');

out += `
ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(RouterProvider, { initialPath: (window.location.hash.startsWith('#/') ? window.location.hash.slice(1) : '') || '/' },
    React.createElement(App))
);
`;

await writeFile('preview/app.jsx', out, 'utf8');
console.log('preview/app.jsx', out.length, 'chars');
