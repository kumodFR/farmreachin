import React, { useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { useRouter } from './router.jsx';
import Home, { meta as homeMeta } from './pages/Home.jsx';
import FarmreachOS, { meta as osMeta } from './pages/FarmreachOS.jsx';
import Consulting, { meta as consultingMeta } from './pages/Consulting.jsx';
import Company, { meta as companyMeta } from './pages/Company.jsx';
import Contact, { meta as contactMeta } from './pages/Contact.jsx';
import Terms, { meta as termsMeta } from './pages/Terms.jsx';
import Privacy, { meta as privacyMeta } from './pages/Privacy.jsx';
import NotFound, { meta as notFoundMeta } from './pages/NotFound.jsx';

/* Single route table: used by the client router AND by prerender.mjs, so the
   static output and the SPA can never drift apart. */
export const PAGES = [
  { path: '/', Component: Home, meta: homeMeta },
  { path: '/farmreach-os', Component: FarmreachOS, meta: osMeta },
  { path: '/consulting', Component: Consulting, meta: consultingMeta },
  { path: '/company', Component: Company, meta: companyMeta },
  { path: '/contact', Component: Contact, meta: contactMeta },
  { path: '/terms', Component: Terms, meta: termsMeta },
  { path: '/privacy', Component: Privacy, meta: privacyMeta }
];

export const NOT_FOUND = { path: '/404', Component: NotFound, meta: notFoundMeta };

export function resolve(path) {
  const clean = (path || '/').replace(/\/+$/, '') || '/';
  return PAGES.find((p) => p.path === clean) || NOT_FOUND;
}

export default function App() {
  const { path } = useRouter();
  const route = resolve(path);
  const Page = route.Component;

  /* Keep the document title in sync on client-side navigation. The initial
     value is already correct in the prerendered HTML. */
  useEffect(() => {
    document.title = route.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', route.meta.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', window.location.origin + route.path);
  }, [route]);

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
