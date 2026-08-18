/* Production server for the GitHub -> OCI deployment.

   One Node process: serves the prerendered static build from dist/ and mounts
   the single enquiry endpoint at POST /api/contact. No framework, no runtime
   dependencies beyond Node itself.

   Run: node server.mjs   (npm start)
   Env: PORT (default 8080), HOST (default 0.0.0.0), plus the contact and
        Microsoft Graph variables documented in .env.example. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import contact from './api/contact.js';

const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || '0.0.0.0';
const ROOT = new URL('./dist/', import.meta.url).pathname;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2'
};

/* Fingerprinted build assets are immutable; HTML must revalidate. */
function cacheFor(pathname, ext) {
  if (ext === '.html') return 'no-cache';
  if (pathname.startsWith('/assets/') && /-[A-Za-z0-9_]{8,}\./.test(pathname)) {
    return 'public, max-age=31536000, immutable';
  }
  return 'public, max-age=3600';
}

async function tryFile(pathname) {
  const safe = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  const candidates = [];
  if (safe.endsWith('/')) candidates.push(join(safe, 'index.html'));
  else candidates.push(safe, `${safe}/index.html`, `${safe}.html`);
  for (const rel of candidates) {
    const file = join(ROOT, rel);
    if (!file.startsWith(ROOT.replace(/\/$/, '') + sep) && file !== ROOT) continue;
    try {
      const info = await stat(file);
      if (info.isFile()) return file;
    } catch { /* try the next candidate */ }
  }
  return null;
}

async function send(res, file, status = 200) {
  const ext = extname(file);
  const body = await readFile(file);
  res.statusCode = status;
  res.setHeader('Content-Type', TYPES[ext] || 'application/octet-stream');
  res.setHeader('Cache-Control', cacheFor(file.slice(ROOT.length - 1), ext));
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(body);
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/api/contact') {
    try {
      await contact(req, res);
    } catch (err) {
      console.error('[server] contact handler failed:', err && err.message);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ ok: false, error: 'Something went wrong while sending your enquiry. Please try again.' }));
      }
    }
    return;
  }

  if (url.pathname.startsWith('/api/')) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ ok: false, error: 'Not found.' }));
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET, HEAD');
    return res.end();
  }

  const file = await tryFile(decodeURIComponent(url.pathname));
  if (file) return send(res, file);

  const notFound = await tryFile('/404.html');
  if (notFound) return send(res, notFound, 404);

  res.statusCode = 404;
  res.end('Not found');
});

server.listen(PORT, HOST, () => {
  console.log(`[server] farmreach.in listening on ${HOST}:${PORT}`);
});
