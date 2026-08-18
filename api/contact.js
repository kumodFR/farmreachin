/* POST /api/contact — the single enquiry endpoint for the whole website.
   Every form and CTA route ends here; there is no other email path.

   Internal recipients live here, on the server, and are never sent to the
   browser. Mounted by server.mjs for the GitHub -> OCI deployment; the same
   default export also works as a serverless function.

   Env (server only):
     CONTACT_TO_EMAIL      default ypr@farmreach.in
     CONTACT_CC_EMAIL      default abila@farmreach.in
     CONTACT_ALLOW_ORIGIN  comma-separated allowed origins for CORS
     plus the Microsoft Graph variables documented in _lib/mailer.js */

import {
  normaliseEnquiry,
  validateEnquiry,
  looksAutomated,
  SUBJECTS,
  CONFIRMATION,
  HONEYPOT_FIELD
} from '../src/lib/enquiry.js';
import { internalEmail, visitorEmail } from '../src/lib/emailTemplates.js';
import { sendMail } from './_lib/mailer.js';

const env = (typeof process !== 'undefined' && process.env) || {};
const TO = env.CONTACT_TO_EMAIL || 'ypr@farmreach.in';
const CC = env.CONTACT_CC_EMAIL || 'abila@farmreach.in';

/* CORS: the browser only ever calls this from the Farmreach site itself. */
const ALLOWED_ORIGINS = (env.CONTACT_ALLOW_ORIGIN || 'https://farmreach.in,https://www.farmreach.in')
  .split(',').map((o) => o.trim()).filter(Boolean);

/* Request size limit — six short fields plus a 4 000-character message. */
const MAX_BODY_BYTES = 16 * 1024;

/* Basic per-IP rate limiting: 5 enquiries per 10 minutes. Swap for a shared
   store (Redis/Upstash) if the function runs in more than one region. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'] || req.headers['X-Forwarded-For'];
  if (typeof fwd === 'string' && fwd) return fwd.split(',')[0].trim();
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}

class BodyTooLarge extends Error {}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch { return {}; } }
  const declared = Number(req.headers['content-length'] || 0);
  if (declared > MAX_BODY_BYTES) throw new BodyTooLarge();
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new BodyTooLarge();
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return {}; }
}

export default async function handler(req, res) {
  const json = (status, body) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify(body));
  };

  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return json(405, { ok: false, error: 'Method not allowed.' });
  }

  /* A cross-origin POST from anywhere but the site is rejected outright. */
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return json(403, { ok: false, error: 'Origin not allowed.' });
  }

  let raw;
  try {
    raw = await readBody(req);
  } catch (err) {
    if (err instanceof BodyTooLarge) {
      return json(413, { ok: false, error: 'That enquiry is too large to send. Please shorten it and try again.' });
    }
    return json(400, { ok: false, error: 'Could not read that request.' });
  }

  /* Bot traps are silently accepted so scripts learn nothing. */
  if (looksAutomated({ honeypot: raw[HONEYPOT_FIELD], elapsedMs: Number(raw.elapsedMs) })) {
    return json(200, { ok: true, message: CONFIRMATION });
  }

  if (rateLimited(clientIp(req))) {
    return json(429, { ok: false, error: 'Too many enquiries from this connection. Please try again a little later.' });
  }

  const data = normaliseEnquiry(raw);
  const errors = validateEnquiry(data);
  if (Object.keys(errors).length) {
    return json(422, { ok: false, error: 'Please check the highlighted fields.', errors });
  }

  try {
    const internal = internalEmail(data);
    await sendMail({
      to: TO,
      cc: CC,
      replyTo: data.email,
      subject: SUBJECTS.internal(data.organisation, data.route),
      html: internal.html,
      text: internal.text
    });

    /* Visitor confirmation is a separate send so the internal recipients are
       never revealed in its headers. A failure here must not fail the enquiry. */
    try {
      const visitor = visitorEmail(data);
      await sendMail({
        to: data.email,
        subject: SUBJECTS.visitor(data.organisation),
        html: visitor.html,
        text: visitor.text
      });
    } catch (err) {
      console.error('[contact] confirmation email failed:', err && err.message);
    }

    return json(200, { ok: true, message: CONFIRMATION });
  } catch (err) {
    console.error('[contact] enquiry email failed:', err && err.message);
    return json(502, { ok: false, error: 'Something went wrong while sending your enquiry. Please try again.' });
  }
}
