import React, { useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { useRouter } from './router.jsx';
import AuthGuard from './bird/components/AuthGuard.jsx';
import Home, { meta as homeMeta } from './pages/Home.jsx';
import FarmreachOS, { meta as osMeta } from './pages/FarmreachOS.jsx';
import Consulting, { meta as consultingMeta } from './pages/Consulting.jsx';
import Company, { meta as companyMeta } from './pages/Company.jsx';
import Recognition, { meta as recognitionMeta } from './pages/Recognition.jsx';
import Gallery, { meta as galleryMeta } from './pages/Gallery.jsx';
import Contact, { meta as contactMeta } from './pages/Contact.jsx';
import Terms, { meta as termsMeta } from './pages/Terms.jsx';
import Privacy, { meta as privacyMeta } from './pages/Privacy.jsx';
import Login, { meta as loginMeta } from './pages/Login.jsx';
import BirdHome, { meta as birdHomeMeta } from './pages/BirdHome.jsx';
import BirdMap, { meta as birdMapMeta } from './pages/BirdMap.jsx';
import BirdAnalytics, { meta as birdAnalyticsMeta } from './pages/BirdAnalytics.jsx';
import BirdReports, { meta as birdReportsMeta } from './pages/BirdReports.jsx';
import BirdSettings, { meta as birdSettingsMeta } from './pages/BirdSettings.jsx';
import BirdProfile, { meta as birdProfileMeta } from './pages/BirdProfile.jsx';
import NotFound, { meta as notFoundMeta } from './pages/NotFound.jsx';

/* Single route table: used by the client router AND by prerender.mjs, so the
   static output and the SPA can never drift apart.

   `indexable: false` keeps a route out of the sitemap and gives it a robots
   noindex instead of a canonical — used for the 404 page and for every BIRD
   route (an authenticated product, not marketing content).

   `chrome` decides what wraps the page:
     'marketing' (default) — the existing Header + Footer.
     'bare'    — nothing; the page renders its own minimal frame (Login).
     'bird'    — wrapped in AuthGuard; the page renders its own AppShell
                 (sidebar + header), so BIRD pages never touch Header/Footer.

   `pwa` carries the manifest, iOS home-screen title and iOS home-screen icon
   for that route, so installing "from" a BIRD page offers BIRD's own
   manifest and icon instead of the marketing site's. Routes without it fall
   back to the site defaults. */
const BIRD_PWA = {
  manifest: '/bird.webmanifest',
  appleTitle: 'BIRD',
  appleIcon: '/assets/img/bird-apple-touch-icon.png'
};

export const PAGES = [
  { path: '/', Component: Home, meta: homeMeta },
  { path: '/farmreach-os', Component: FarmreachOS, meta: osMeta },
  { path: '/consulting', Component: Consulting, meta: consultingMeta },
  { path: '/company', Component: Company, meta: companyMeta },
  { path: '/recognition', Component: Recognition, meta: recognitionMeta },
  { path: '/gallery', Component: Gallery, meta: galleryMeta },
  { path: '/contact', Component: Contact, meta: contactMeta },
  { path: '/terms', Component: Terms, meta: termsMeta },
  { path: '/privacy', Component: Privacy, meta: privacyMeta },
  { path: '/login', Component: Login, meta: loginMeta, indexable: false, chrome: 'bare', pwa: BIRD_PWA },
  { path: '/bird', Component: BirdHome, meta: birdHomeMeta, indexable: false, chrome: 'bird', pwa: BIRD_PWA },
  { path: '/bird/map', Component: BirdMap, meta: birdMapMeta, indexable: false, chrome: 'bird', pwa: BIRD_PWA },
  { path: '/bird/analytics', Component: BirdAnalytics, meta: birdAnalyticsMeta, indexable: false, chrome: 'bird', pwa: BIRD_PWA },
  { path: '/bird/reports', Component: BirdReports, meta: birdReportsMeta, indexable: false, chrome: 'bird', pwa: BIRD_PWA },
  { path: '/bird/settings', Component: BirdSettings, meta: birdSettingsMeta, indexable: false, chrome: 'bird', pwa: BIRD_PWA },
  { path: '/bird/profile', Component: BirdProfile, meta: birdProfileMeta, indexable: false, chrome: 'bird', pwa: BIRD_PWA }
];

export const NOT_FOUND = { path: '/404', Component: NotFound, meta: notFoundMeta, indexable: false };

export function resolve(path) {
  const clean = (path || '/').replace(/\/+$/, '') || '/';
  return PAGES.find((p) => p.path === clean) || NOT_FOUND;
}

const DEFAULT_PWA = {
  manifest: '/site.webmanifest',
  appleTitle: 'Farmreach',
  appleIcon: '/assets/img/apple-touch-icon.png'
};

/* Registered only for BIRD routes (see the effect below), scoped to the
   whole origin because the file lives at the root — but it is a genuine
   no-op (see bird-sw.js), so registering it never changes what a marketing
   page does. */
function registerBirdServiceWorker() {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('/bird-sw.js').catch(() => { /* installability is best-effort */ });
}

export default function App() {
  const { path } = useRouter();
  const route = resolve(path);
  const Page = route.Component;
  const chrome = route.chrome || 'marketing';
  const pwa = route.pwa || DEFAULT_PWA;

  /* Keep the document head in sync on client-side navigation (title,
     description, canonical, and — for BIRD — which PWA manifest/home-screen
     name and icon apply). The initial values are already correct in the
     prerendered HTML; this only matters for SPA transitions afterwards. */
  useEffect(() => {
    document.title = route.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', route.meta.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', window.location.origin + route.path);

    const manifestLink = document.querySelector('link[rel="manifest"]');
    if (manifestLink) manifestLink.setAttribute('href', pwa.manifest);
    const appleTitle = document.querySelector('meta[name="apple-mobile-web-app-title"]');
    if (appleTitle) appleTitle.setAttribute('content', pwa.appleTitle);
    const appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
    if (appleIcon) appleIcon.setAttribute('href', pwa.appleIcon);

    if (route.path === '/login' || route.path.startsWith('/bird')) registerBirdServiceWorker();
  }, [route, pwa]);

  if (chrome === 'bare') return <Page />;

  if (chrome === 'bird') {
    return (
      <AuthGuard>
        <Page />
      </AuthGuard>
    );
  }

  return (
    <>
      <Header />
      <main id="main">
        <Page />
      </main>
      <Footer />
    </>
  );
}
