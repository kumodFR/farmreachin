import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.jsx';
import { RouterProvider } from './router.jsx';
import { initAnalytics } from './lib/analytics.js';
import './styles/tokens.css';
import './styles/global.css';
import './styles/responsive.css';

/* Runs once per real page load — never on client-side route changes, since
   this module only executes on the initial script evaluation. */
initAnalytics();

const container = document.getElementById('root');
const tree = (
  <RouterProvider initialPath={window.location.pathname}>
    <App />
  </RouterProvider>
);

/* Prerendered markup is hydrated; a bare container is rendered fresh.
   firstElementChild, not hasChildNodes: in dev the container still holds the
   <!--app-html--> placeholder, and a comment node counts as a child. That made
   dev hydrate against markup that was never rendered, failing on every page. */
if (container.firstElementChild) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
