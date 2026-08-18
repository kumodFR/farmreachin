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
  <div style="font:700 18px/1.2 ${FONT};letter-spacing:0.10em;color:#FFFFFF;">Farmreach Technologies</div>
  <div style="font:400 13px/1.5 ${FONT};color:#D7EBE0;padding-top:6px;">${escapeHtml(POSITIONING)}</div>
</td></tr>
${inner}
<tr><td style="padding:20px 28px 26px;border-top:1px solid ${LINE};background:#FFFFFF;">
  <div style="font:700 13px/1.6 ${FONT};color:${INK};">${escapeHtml(LEGAL)}</div>
  <div style="font:400 13px/1.6 ${FONT};color:${MUTED};">${escapeHtml(POSITIONING)}</div>
  <div style="font:400 13px/1.6 ${FONT};color:${MUTED};">${escapeHtml(CITY)}</div>
  <div style="font:400 13px/1.6 ${FONT};padding-top:8px;"><a href="https://farmreach.in" style="color:${BRAND};text-decoration:none;">farmreach.in</a></div>
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
  const route = d.route || 'Website';
  const inner = `<tr><td style="padding:26px 28px 18px;">
  <div style="font:700 22px/1.3 ${FONT};color:${INK};">${escapeHtml(route)} Enquiry</div>
</td></tr>
<tr><td style="padding:0 28px 16px;">
  <div style="font:400 15px/1.7 ${FONT};color:${INK};">Hi Pradeep Raj,</div>
</td></tr>
<tr><td style="padding:0 28px 16px;">
  <div style="font:400 15px/1.7 ${FONT};color:${INK};">I am ${escapeHtml(d.name)} from ${escapeHtml(d.organisation)}, based in ${escapeHtml(d.region)}.</div>
</td></tr>
<tr><td style="padding:0 28px 18px;">
  <div style="font:400 15px/1.7 ${FONT};color:${INK};">I came across the Farmreach website and wanted to connect with you regarding the following:</div>
</td></tr>
<tr><td style="padding:0 28px 20px;">
  <div style="font:400 17px/1.65 ${FONT};color:${INK};background:${TINT};border-left:4px solid ${BRAND};padding:18px 20px;">&ldquo;${nl2br(d.message)}&rdquo;</div>
</td></tr>
<tr><td style="padding:0 28px 20px;">
  <div style="font:400 15px/1.7 ${FONT};color:${INK};">I would be interested in discussing this with your team and understanding how Farmreach could support this requirement.</div>
</td></tr>
<tr><td style="padding:0 28px 24px;">
  <div style="font:400 15px/1.7 ${FONT};color:${INK};">Regards,</div>
  <div style="font:700 15px/1.7 ${FONT};color:${INK};">${escapeHtml(d.name)}</div>
  <div style="font:400 15px/1.7 ${FONT};color:${INK};">${escapeHtml(d.organisation)}</div>
  <div style="font:400 15px/1.7 ${FONT};color:${INK};">${escapeHtml(d.region)}</div>
  <div style="font:400 15px/1.7 ${FONT};"><a href="mailto:${escapeHtml(d.email)}" style="color:${BRAND};text-decoration:none;">${escapeHtml(d.email)}</a></div>
</td></tr>`;
  const text = [
    `${route} Enquiry`,
    '',
    'Hi Pradeep Raj,',
    '',
    `I am ${d.name} from ${d.organisation}, based in ${d.region}.`,
    '',
    'I came across the Farmreach website and wanted to connect with you regarding the following:',
    '',
    `"${d.message}"`,
    '',
    'I would be interested in discussing this with your team and understanding how Farmreach could support this requirement.',
    '',
    'Regards,',
    d.name,
    d.organisation,
    d.region,
    d.email,
    '',
    LEGAL,
    POSITIONING,
    CITY,
    'farmreach.in'
  ].join('\n');
  return { html: shell(inner, `${route} enquiry from ${d.organisation}`), text };
}

export function visitorEmail(d) {
  const inner = `<tr><td style="padding:26px 28px 6px;">
  <div style="font:400 16px/1.6 ${FONT};color:${INK};">Hello ${escapeHtml(d.name)},</div>
</td></tr>
<tr><td style="padding:14px 28px 6px;">
  <div style="font:400 15px/1.7 ${FONT};color:${INK};">Thank you for contacting Farmreach Technologies.</div>
</td></tr>
<tr><td style="padding:10px 28px 24px;">
  <div style="font:400 15px/1.7 ${FONT};color:${INK};">We have received your enquiry and our team will review it and get back to you.</div>
</td></tr>
<tr><td style="padding:0 28px 24px;">
  <div style="font:400 15px/1.7 ${FONT};color:${INK};">Regards,</div>
  <div style="font:700 15px/1.7 ${FONT};color:${INK};">${escapeHtml(LEGAL)}</div>
  <div style="font:400 13px/1.6 ${FONT};color:${MUTED};">${escapeHtml(POSITIONING)}</div>
</td></tr>`;
  const text = [
    `Hello ${d.name},`,
    '',
    'Thank you for contacting Farmreach Technologies.',
    'We have received your enquiry and our team will review it and get back to you.',
    '',
    'Regards,',
    LEGAL,
    CITY,
    'farmreach.in'
  ].join('\n');
  return { html: shell(inner, 'We have received your enquiry.'), text };
}
