/* POST /api/contact — server-side enquiry handler.

   Internal recipients live here, on the server, and are never sent to the
   browser. Deploy as a serverless function (Vercel/Netlify-compatible default
   export) or mount the same module behind any Node server.

   Env (server only):
     ENQUIRY_TO   default ypr@farmreach.in
     ENQUIRY_CC   default abila@farmreach.in
     plus the provider variables documented in _lib/mailer.js */

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
const TO = env.ENQUIRY_TO || 'ypr@farmreach.in';
const CC = env.ENQUIRY_CC || 'abila@farmreach.in';

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

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch { return {}; } }
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return {}; }
}

export default async function handler(req, res) {
  const json = (status, body) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify(body));
  };

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(405, { ok: false, error: 'Method not allowed.' });
  }

  const raw = await readBody(req);

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
      subject: SUBJECTS.internal(data.organisation),
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
    return json(502, { ok: false, error: 'We could not send that just now. Please try again shortly.' });
  }
}
