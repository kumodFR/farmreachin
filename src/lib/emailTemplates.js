/* Farmreach enquiry emails. Table-based, inline-styled, email-client safe.
   Brand: #016F3B primary, #EBF2F0 tint, white content surface, Overpass with
   system fallbacks. Pure functions — no provider or credential knowledge. */

const BRAND = '#016F3B';
const TINT = '#EBF2F0';
const INK = '#12201A';
const MUTED = '#5A6B63';
const LINE = '#D8E4DF';
const FONT = "'Overpass', 'Segoe UI', Helvetica, Arial, sans-serif";

const POSITIONING = "India's Agricultural Operating Systems & Transformation Company";
const LEGAL = 'Farmreach Technologies Pvt Ltd';
const CITY = 'Hyderabad, India';

export function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const nl2br = (value) => escapeHtml(value).replace(/\n/g, '<br />');

function shell(inner, preheader) {
  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Farmreach</title>
</head>
<body style="margin:0;padding:0;background:${TINT};">
<div style="display:none;font-size:1px;color:${TINT};max-height:0;overflow:hidden;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${TINT};padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:#FFFFFF;border:1px solid ${LINE};">
<tr><td style="background:${BRAND};padding:22px 28px;">
  <div style="font:700 18px/1.2 ${FONT};letter-spacing:0.16em;color:#FFFFFF;text-transform:uppercase;">FARMREACH</div>
  <div style="font:400 13px/1.5 ${FONT};color:#D7EBE0;padding-top:6px;">${escapeHtml(POSITIONING)}</div>
</td></tr>
${inner}
<tr><td style="padding:20px 28px 26px;border-top:1px solid ${LINE};background:#FFFFFF;">
  <div style="font:700 13px/1.6 ${FONT};color:${INK};">${escapeHtml(LEGAL)}</div>
  <div style="font:400 13px/1.6 ${FONT};color:${MUTED};">${escapeHtml(CITY)}</div>
  <div style="font:400 12px/1.6 ${FONT};color:${MUTED};padding-top:10px;">This enquiry was submitted through the Farmreach website.</div>
</td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function row(label, value, multiline) {
  return `<tr><td style="padding:0 28px 16px;">
  <div style="font:700 11px/1.4 ${FONT};letter-spacing:0.16em;text-transform:uppercase;color:${MUTED};padding-bottom:5px;">${escapeHtml(label)}</div>
  <div style="font:400 15px/1.6 ${FONT};color:${INK};">${multiline ? nl2br(value) : escapeHtml(value)}</div>
</td></tr>`;
}

export function internalEmail(d) {
  const inner = `<tr><td style="padding:26px 28px 18px;">
  <div style="font:700 22px/1.3 ${FONT};color:${INK};">New Enquiry</div>
</td></tr>
${row('Full Name', d.name)}
${row('Work Email', d.email)}
${row('Organisation', d.organisation)}
${row('Enquiry Route', d.route)}
${row('State / Region', d.region)}
<tr><td style="padding:0 28px 22px;">
  <div style="font:700 11px/1.4 ${FONT};letter-spacing:0.16em;text-transform:uppercase;color:${MUTED};padding-bottom:6px;">What are you trying to change?</div>
  <div style="font:400 15px/1.7 ${FONT};color:${INK};background:${TINT};border-left:3px solid ${BRAND};padding:14px 16px;">${nl2br(d.message)}</div>
</td></tr>`;
  const text = [
    'New Enquiry',
    `Full Name: ${d.name}`,
    `Work Email: ${d.email}`,
    `Organisation: ${d.organisation}`,
    `Enquiry Route: ${d.route}`,
    `State / Region: ${d.region}`,
    '',
    'What are you trying to change?',
    d.message,
    '',
    `${LEGAL}, ${CITY}`,
    'This enquiry was submitted through the Farmreach website.'
  ].join('\n');
  return { html: shell(inner, `New enquiry from ${d.organisation}`), text };
}

export function visitorEmail(d) {
  const inner = `<tr><td style="padding:26px 28px 6px;">
  <div style="font:400 16px/1.6 ${FONT};color:${INK};">Hello ${escapeHtml(d.name)},</div>
</td></tr>
<tr><td style="padding:12px 28px 6px;">
  <div style="font:400 15px/1.7 ${FONT};color:${INK};">Thank you for reaching out to Farmreach.</div>
</td></tr>
<tr><td style="padding:8px 28px 20px;">
  <div style="font:400 15px/1.7 ${FONT};color:${INK};">We have received your enquiry regarding ${escapeHtml(d.route)} and our team will review it and get back to you shortly.</div>
</td></tr>
<tr><td style="padding:0 28px 14px;">
  <div style="font:700 11px/1.4 ${FONT};letter-spacing:0.16em;text-transform:uppercase;color:${BRAND};">Your enquiry</div>
</td></tr>
${row('Organisation', d.organisation)}
${row('State / Region', d.region)}
${row('What you are trying to change', d.message, true)}
<tr><td style="padding:6px 28px 24px;">
  <div style="font:400 15px/1.7 ${FONT};color:${INK};">Regards,</div>
  <div style="font:700 15px/1.7 ${FONT};color:${INK};">${escapeHtml(LEGAL)}</div>
  <div style="font:400 13px/1.6 ${FONT};color:${MUTED};">${escapeHtml(POSITIONING)}</div>
  <div style="font:400 13px/1.6 ${FONT};padding-top:8px;"><a href="https://farmreach.in" style="color:${BRAND};text-decoration:none;">farmreach.in</a></div>
</td></tr>`;
  const text = [
    `Hello ${d.name},`,
    '',
    'Thank you for reaching out to Farmreach.',
    `We have received your enquiry regarding ${d.route} and our team will review it and get back to you shortly.`,
    '',
    'Your enquiry:',
    `Organisation: ${d.organisation}`,
    `State / Region: ${d.region}`,
    `What you are trying to change: ${d.message}`,
    '',
    'Regards,',
    LEGAL,
    POSITIONING,
    'farmreach.in'
  ].join('\n');
  return { html: shell(inner, 'We have received your enquiry.'), text };
}
