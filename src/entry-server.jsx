import React from 'react';
import { renderToString } from 'react-dom/server';
import App, { PAGES, NOT_FOUND, resolve } from './App.jsx';
import { RouterProvider } from './router.jsx';

export { PAGES, NOT_FOUND };

export function render(path) {
  const route = resolve(path);
  const html = renderToString(
    <RouterProvider initialPath={path}>
      <App />
    </RouterProvider>
  );
  return { html, meta: route.meta };
}
