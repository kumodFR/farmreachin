import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.jsx';
import { RouterProvider } from './router.jsx';
import './styles/tokens.css';
import './styles/global.css';
import './styles/responsive.css';

const container = document.getElementById('root');
const tree = (
  <RouterProvider initialPath={window.location.pathname}>
    <App />
  </RouterProvider>
);

/* Prerendered markup is hydrated; a bare container is rendered fresh. */
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
