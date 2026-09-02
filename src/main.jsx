import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.jsx';
import { RouterProvider } from './router.jsx';
import './styles/tokens.css';
import './styles/global.css';
import './styles/responsive.css';
import './styles/bird.css';
import './styles/bird-map.css';
/* Leaflet's own stylesheet has no SSR side effects (unlike the leaflet JS
   module, which touches `window` at import time — see MapCanvas.jsx), so
   it is safe to import statically here rather than alongside the dynamic
   leaflet/react-leaflet import. */
import 'leaflet/dist/leaflet.css';

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
