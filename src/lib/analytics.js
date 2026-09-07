/* Google Analytics 4 — the official gtag.js tag, loaded once from the app's
   client entry point (main.jsx), never per-page or per-component.

   Deliberately minimal beyond page_view: no custom events, no custom
   tracking logic. GA4's Enhanced Measurement (enable it in the GA4
   property's Data Stream settings) covers scroll, outbound clicks, file
   downloads and site search automatically once this tag is present.

   page_view IS handled explicitly, on purpose: GA4's own "page changes
   based on browser history events" Enhanced Measurement option is meant to
   auto-detect SPA navigation via history.pushState, but that was tested
   against this app's router (router.jsx, which calls pushState directly)
   and did not fire — no new page_view appeared in dataLayer after a
   client-side route change. Rather than ship page views that silently
   don't work for most of the site, the initial automatic page_view is
   turned off (send_page_view: false) and trackPageView() below is the
   single source of truth for every page_view, first load included, called
   once per route change from App.jsx's existing route-sync effect. This
   guarantees exactly one page_view per route view by construction.

   IMPORTANT — GA4 admin step: turn OFF "Page changes based on browser
   history events" under Enhanced Measurement settings for this property's
   web data stream (Admin > Data Streams > this stream > Enhanced
   measurement > gear icon). That option is ON by default on a new stream;
   left on alongside trackPageView() below, it can double-count page views
   on SPA navigation. Every other Enhanced Measurement item (scroll,
   outbound clicks, file downloads, site search) is unaffected and should
   stay on.

   No PII: nothing in this codebase calls gtag('event', ...) with names,
   emails, phone numbers or enquiry text — the contact form posts straight
   to /api/contact server-side and never touches gtag at all.

   Measurement ID: read from VITE_GA_MEASUREMENT_ID (set in the deployment
   environment — Vercel project settings for production), never hard-coded.
   If it's unset, analytics simply does not load: safe default for local
   dev, design-review builds and any preview deploy without the var set. */

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function initAnalytics() {
  if (!MEASUREMENT_ID || typeof window === 'undefined') return;
  /* Guards a real double-invocation of initAnalytics() (e.g. React Strict
     Mode double-effects) — main.jsx only calls this once regardless, but
     the guard costs nothing and keeps "only one tag" true under any caller. */
  if (window.__gaInitialized) return;
  window.__gaInitialized = true;

  window.dataLayer = window.dataLayer || [];
  function gtag(...args) { window.dataLayer.push(args); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/* Called once per route view from App.jsx (initial mount included). A no-op
   until initAnalytics() has run (i.e. until a Measurement ID is configured),
   so it's always safe to call regardless of environment. */
export function trackPageView(path) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: path
  });
}
