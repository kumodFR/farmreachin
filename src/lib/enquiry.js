/* Shared enquiry contract — imported by BOTH the React form and the server
   handler so client and server validate the same rules. No secrets here. */

export const ENQUIRY_ROUTES = [
  'Public Enterprise',
  'Private Enterprise',
  'Consulting & Transformation',
  'Partnerships',
  'Careers',
  'Other'
];

export const LIMITS = {
  name: 120,
  email: 160,
  organisation: 140,
  region: 120,
  message: 4000,
  messageMin: 20,
  subjectOrganisation: 80
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/* Collapse whitespace, strip control characters, cap length. */
export function clean(value, max = 500) {
  return String(value == null ? '' : value)
    .replace(/[\u0000-\u001F\u007F]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

/* Message keeps line breaks; everything else is single-line. */
export function cleanMultiline(value, max = LIMITS.message) {
  return String(value == null ? '' : value)
    .replace(/\r\n/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]+/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max);
}

export function normaliseEnquiry(raw = {}) {
  return {
    name: clean(raw.name, LIMITS.name),
    email: clean(raw.email, LIMITS.email).toLowerCase(),
    organisation: clean(raw.organisation, LIMITS.organisation),
    route: clean(raw.route, 80),
    region: clean(raw.region, LIMITS.region),
    message: cleanMultiline(raw.message)
  };
}

/* Returns { field: 'message' } — empty object means valid. */
export function validateEnquiry(data) {
  const e = {};
  if (!data.name) e.name = 'This field is required.';
  if (!data.email) e.email = 'This field is required.';
  else if (!EMAIL_RE.test(data.email)) e.email = 'Enter a valid email address.';
  if (!data.organisation) e.organisation = 'This field is required.';
  if (!data.route) e.route = 'Select an enquiry route.';
  else if (!ENQUIRY_ROUTES.includes(data.route)) e.route = 'Select an enquiry route.';
  if (!data.region) e.region = 'This field is required.';
  if (!data.message) e.message = 'This field is required.';
  else if (data.message.length < LIMITS.messageMin) e.message = 'Please add a little more detail.';
  return e;
}

/* Header-safe organisation name for the subject line. */
export function subjectOrganisation(organisation) {
  const safe = clean(organisation, LIMITS.subjectOrganisation)
    .replace(/[\r\n<>"]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return safe || 'Website enquiry';
}

export const SUBJECTS = {
  internal: (organisation, route) => {
    const parts = ['Farmreach Enquiry'];
    const r = subjectOrganisation(route);
    if (route) parts.push(r);
    parts.push(subjectOrganisation(organisation));
    return parts.join(' \u2014 ');
  },
  visitor: () => 'Thank you for contacting Farmreach'
};

export const CONFIRMATION =
  'Thank you. Your enquiry has been received. Our team will get back to you shortly.';

/* Bot heuristics shared by client and server. `honeypot` must stay empty and a
   real person takes more than a couple of seconds to fill six fields. */
export const HONEYPOT_FIELD = 'website_url';
export const MIN_FILL_MS = 2500;

export function looksAutomated({ honeypot, elapsedMs }) {
  if (clean(honeypot, 200)) return true;
  if (typeof elapsedMs === 'number' && elapsedMs >= 0 && elapsedMs < MIN_FILL_MS) return true;
  return false;
}
