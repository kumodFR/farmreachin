/* GENERATED — do not edit by hand. Run: node tools/build-preview.mjs */
const { useState, useEffect, useRef, useCallback, createContext, useContext, Fragment } = React;

/* ==== src/lib/enquiry.js ==== */
/* Shared enquiry contract — imported by BOTH the React form and the server
   handler so client and server validate the same rules. No secrets here. */

const ENQUIRY_ROUTES = [
  'Public Enterprise',
  'Private Enterprise',
  'Consulting & Transformation',
  'Partnerships',
  'Careers',
  'Other'
];

const LIMITS = {
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
function clean(value, max = 500) {
  return String(value == null ? '' : value)
    .replace(/[\u0000-\u001F\u007F]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

/* Message keeps line breaks; everything else is single-line. */
function cleanMultiline(value, max = LIMITS.message) {
  return String(value == null ? '' : value)
    .replace(/\r\n/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]+/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max);
}

function normaliseEnquiry(raw = {}) {
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
function validateEnquiry(data) {
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
function subjectOrganisation(organisation) {
  const safe = clean(organisation, LIMITS.subjectOrganisation)
    .replace(/[\r\n<>"]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return safe || 'Website enquiry';
}

const SUBJECTS = {
  internal: (organisation, route) => {
    const parts = ['Farmreach Enquiry'];
    const r = subjectOrganisation(route);
    if (route) parts.push(r);
    parts.push(subjectOrganisation(organisation));
    return parts.join(' \u2014 ');
  },
  visitor: () => 'Thank you for contacting Farmreach'
};

const CONFIRMATION =
  'Thank you. Your enquiry has been received. Our team will get back to you shortly.';

/* Bot heuristics shared by client and server. `honeypot` must stay empty and a
   real person takes more than a couple of seconds to fill six fields. */
const HONEYPOT_FIELD = 'website_url';
const MIN_FILL_MS = 2500;

function looksAutomated({ honeypot, elapsedMs }) {
  if (clean(honeypot, 200)) return true;
  if (typeof elapsedMs === 'number' && elapsedMs >= 0 && elapsedMs < MIN_FILL_MS) return true;
  return false;
}


/* ==== src/lib/emailTemplates.js ==== */
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

function escapeHtml(value) {
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

function internalEmail(d) {
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

function visitorEmail(d) {
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


/* ==== src/data/site.js ==== */
/* Site-wide configuration. The Farminsta destination is set in ONE place:
   here, overridable at build time with VITE_FARMINSTA_URL. */

const env = {};

const FARMINSTA_URL = env.VITE_FARMINSTA_URL || 'https://farminsta.com';

const SITE = {
  name: 'Farmreach Technologies',
  legalName: 'Farmreach Technologies Pvt Ltd',
  origin: env.VITE_SITE_ORIGIN || 'https://farmreach.in',
  positioning: "India's Agricultural Operating Systems & Transformation Company",
  city: 'Hyderabad',
  email: 'ypr@farmreach.in',
  /* Confirmed registered office. Used wherever the full address is displayed;
     SITE.city stays the short location reference. */
  address: [
    'Farmreach Technologies Pvt Ltd',
    '1st Floor, SSR Arcade,',
    'Plot No. 328, Road No. 1/2,',
    'Mathrusree Nagar, Hafeezpet,',
    'Miyapur, Hyderabad,',
    'Telangana 500049, India'
  ],
  phone: '+91 80724 88052',
  registeredAddress: '1st Floor, SSR Arcade, Plot No. 328, Road No. 1/2, Mathrusree Nagar, Hafeezpet, Miyapur, Hyderabad, Telangana 500049, India',
  /* Existing Farminsta profiles. Farmreach-specific profiles do not exist yet —
     do not invent them; leave a value empty to hide that link. */
  social: {
    linkedin: 'https://www.linkedin.com/company/farmreach-technologies-private-limited/',
    facebook: 'https://www.facebook.com/profile.php?id=61593161893649'
  },
  xpeditionUrl: 'https://xpeditionlabs.com',
  contactEndpoint: env.VITE_CONTACT_ENDPOINT || '/api/contact'
};


/* ==== src/data/navigation.js ==== */

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/farmreach-os', label: 'Farmreach OS' },
  { href: FARMINSTA_URL, label: 'Farminsta OS', external: true },
  { href: '/consulting', label: 'Consulting' },
  { href: '/company', label: 'Our Story' },
  { href: '/recognition', label: 'Recognition' },
  { href: '/contact', label: 'Contact' }
];



/* ==== src/data/heroMetrics.js ==== */
/* Metric callouts placed around the India map. Approved Farmreach figures only.
   `1B+` is derived, not counted: 50M+ GPS-tagged activities x ~20 data points
   per activity. Each entry names the corner of the map it is pinned to. */

const MAP_CALLOUTS = [
  { pos: 'tl', tier: 'primary', value: '1B+', label: 'Data points', note: null },
  { pos: 'tr', tier: 'primary', value: '50M+', label: 'GPS-tagged field activities', note: null },
  { pos: 'ml', tier: 'secondary', value: '5M+', label: 'Farmers engaged', note: null },
  { pos: 'mr', tier: 'secondary', value: '5L+', label: 'Villages reached', note: null },
  { pos: 'ml2', tier: 'secondary', value: '14+ Cr', label: 'Operational farm holdings', note: null },
  { pos: 'mr2', tier: 'secondary', value: '20', label: 'States', note: null },
  { pos: 'bl', tier: 'secondary', value: '100+', label: 'Companies transformed', note: null },
  { pos: 'br', tier: 'secondary', value: '10K+', label: 'Field officers active daily', note: null },
  { pos: 'bc', tier: 'secondary', value: '21 days', label: 'To implementation', note: null }
];

/* Ecosystem layers annotated in place on the map, anchored to real node
   coordinates in the same projection. Technology & data is anchored to the
   connecting lines rather than to a node type. */
const MAP_ANNOTATIONS = [
  { layer: 'government', name: 'Government', x: 395.9, y: 356.1, side: 'right', dy: -26 },
  { layer: 'farmer', name: 'Farmers', x: 246.1, y: 490, side: 'left', dy: 26 },
  { layer: 'tech', name: 'Technology & data', x: 614, y: 494.8, side: 'right', dy: 0 },
  { layer: 'enterprise', name: 'Enterprises', x: 187.3, y: 622.1, side: 'left', dy: 0 },
  { layer: 'market', name: 'Markets', x: 380.9, y: 690.3, side: 'right', dy: 0 },
  { layer: 'field', name: 'Field officers', x: 310.3, y: 705, side: 'left', dy: -28 },
  { layer: 'advisory', name: 'Advisory', x: 278.5, y: 850.5, side: 'left', dy: 0 }
];


/* ==== src/data/services.js ==== */
/* Consulting & transformation.
   CAPABILITY_AREAS — what Farmreach helps transform (compact, /consulting).
   SERVICES — the engagement types, with scope and outputs (/consulting detail).
   `homeName`/`homeSummary` are the homepage capability list; keep them stable.
   AUDIENCES — who the practice works with. Approach and principles live in
   Operating Philosophy; keep that language out of here. */

const CAPABILITY_AREAS = [
  { id: 'operating-model', short: 'Business & Operating Model', summary: 'Designing practical operating models, workflows, roles and governance for agricultural organisations.' },
  { id: 'digital', short: 'Digital Transformation', summary: 'Assessing existing processes and systems and designing digital workflows, platforms and integrations that support real operations.' },
  { id: 'process', short: 'Process & Operations Consulting', summary: 'Mapping current operations, identifying opportunities for improvement and building scalable processes across field, farmer, channel and value-chain operations.' },
  { id: 'growth', short: 'Go-to-Market & Growth', summary: 'Designing market-entry, farmer engagement, channel, digital outreach and execution strategies for agricultural businesses.' }
];

const AUDIENCES = [
  { title: 'Public Enterprise', body: 'State agriculture departments, commissionerates and public institutions seeking to modernise agricultural programmes and operating systems.' },
  { title: 'Private Enterprise', body: 'Agri-input companies, seed businesses, contract production organisations and other agricultural enterprises seeking operational and digital transformation.' },
  { title: 'Agricultural Ecosystem', body: 'Research institutions, development organisations, FPOs, technology companies and ecosystem partners working on agricultural transformation.' }
];

const SERVICES = [
  {
    id: 'transformation-audit',
    homeName: 'Agricultural Transformation',
    homeSummary: 'Transformation strategy and operating-model redesign for organisations working across agriculture.',
    name: 'Transformation Audit',
    short: 'Transformation Audit',
    summary: 'A structured assessment of existing agricultural operations, processes, systems and data to identify transformation priorities.',
    explain: [
      'Current-state assessment',
      'Operating-model assessment',
      'Transformation opportunity mapping',
      'Digital maturity',
      'Capability mapping',
      'Transformation roadmap',
      'Programme structuring',
      'Priority definition'
    ],
    outputs: [
      'Current-state assessment',
      'Transformation roadmap',
      'Operating-model blueprint',
      'Priority matrix',
      'Programme structure'
    ]
  },
  {
    id: 'process-consulting',
    homeName: 'Process & Operations',
    homeSummary: 'Business process audits, workflow redesign, operating structures and process improvement across agricultural operations.',
    name: 'Process Consulting',
    short: 'Process Consulting',
    summary: 'Redesigning field, farmer, channel, production and value-chain processes for greater operational clarity and scalability.',
    explain: [
      'Business process mapping',
      'Field process mapping',
      'Role and responsibility analysis',
      'Workflow assessment',
      'Data-flow assessment',
      'Approval-flow analysis',
      'Process redesign',
      'SOP and workflow design'
    ],
    outputs: [
      'Current-state process map',
      'Process audit',
      'Future-state workflow',
      'Responsibility model',
      'Improvement roadmap'
    ]
  },
  {
    id: 'digital-transformation',
    homeName: 'Technology & Digital Systems',
    homeSummary: 'Digital product strategy, solution architecture, platform design, data systems and technology implementation.',
    name: 'Digital Transformation',
    short: 'Digital Transformation',
    summary: 'Designing the digital operating model, workflows and technology roadmap required to move from fragmented processes to connected operations.',
    explain: [
      'Digital maturity assessment',
      'Technology roadmap',
      'System architecture',
      'Product and platform strategy',
      'Data architecture',
      'Integration planning',
      'Build versus buy assessment',
      'Product requirements',
      'Data and reporting design',
      'Technology implementation',
      'Implementation governance'
    ],
    outputs: [
      'Technology roadmap',
      'System architecture',
      'Product requirements',
      'Integration strategy',
      'Data and reporting model'
    ]
  },
  {
    id: 'gtm-consulting',
    homeName: 'Go-to-market',
    homeSummary: 'GTM strategy, channel models, field-force structures, farmer engagement and commercial execution.',
    name: 'GTM Consulting',
    short: 'GTM Consulting',
    summary: 'Helping agricultural businesses design market-entry, farmer acquisition, channel and digital engagement strategies aligned to their operating model.',
    explain: [
      'Market segmentation',
      'Territory strategy',
      'Channel design',
      'Field-force structure',
      'Farmer engagement',
      'Distributor and retailer strategy',
      'Campaign strategy',
      'GTM operating model',
      'Commercial execution measurement'
    ],
    outputs: [
      'GTM strategy',
      'Market structure',
      'Channel model',
      'Field-force model',
      'Farmer engagement model'
    ]
  }
];

/* HOW we work: the seven-stage transformation approach shown on the homepage as
   a connected pathway. Distinct from the WHAT above — same capability, other view. */
const APPROACH = [
  { num: '01', title: 'Understand', body: 'Understand the organisation, context, objectives and operating environment.' },
  { num: '02', title: 'Assess', body: 'Assess existing processes, systems, people, data and technology.' },
  { num: '03', title: 'Design', body: 'Define the target operating model, workflows, systems and transformation roadmap.' },
  { num: '04', title: 'Build', body: 'Develop or configure the required technology, processes and operating capabilities.' },
  { num: '05', title: 'Implement', body: 'Deploy the solution, onboard teams and establish the new operating model.' },
  { num: '06', title: 'Operate', body: 'Support adoption, monitor execution and refine the system through real operating experience.' },
  { num: '07', title: 'Measure', body: 'Measure adoption, execution and progress against the transformation objectives.' }
];

/* The seven-step transformation sequence used by /consulting. */
const METHOD = [
  { num: '01', title: 'Understand', body: 'Understand the organisation, operating environment, objectives and constraints.' },
  { num: '02', title: 'Diagnose', body: 'Assess current processes, systems, data and field execution.' },
  { num: '03', title: 'Design', body: 'Define the target operating model, workflows and transformation priorities.' },
  { num: '04', title: 'Digitise', body: 'Translate approved processes into appropriate digital systems and technology.' },
  { num: '05', title: 'Pilot', body: 'Test the model in a controlled operating environment and refine it through real use.' },
  { num: '06', title: 'Scale', body: 'Extend the validated model across teams, territories, programmes or markets.' },
  { num: '07', title: 'Measure & Evolve', body: 'Track adoption and operating performance and continuously improve the system.' }
];


/* ==== src/data/operatingSystems.js ==== */

const OPERATING_SYSTEMS = [
  {
    id: 'farmreach-os',
    name: 'Farmreach OS',
    kind: 'Public Enterprise',
    subtitle: 'Government Agriculture Operating System',
    blurb: 'Intelligence, field operations and decision infrastructure for state agriculture, designed to work with existing government systems.',
    points: [
      'Orchestrates existing government systems rather than replacing them',
      'Farmer and land intelligence as one reconciled record',
      'Field operations and extension at district and block level',
      'A state command centre reading from the field, not from returns'
    ],
    cta: 'Explore Farmreach OS',
    href: '/farmreach-os',
    external: false,
    audience: [
      'State Agriculture Departments',
      'Commissionerates',
      'Government institutions',
      'Public agricultural programmes'
    ]
  },
  {
    id: 'farminsta-os',
    name: 'Farminsta OS',
    kind: 'Private Enterprise',
    subtitle: 'Private Agriculture Operating System',
    blurb: 'Field execution, farmer engagement, channel intelligence and seasonal operations for agricultural enterprises.',
    points: [
      'Field-force execution across territories and seasons',
      'Farmer engagement, demos and advisory at scale',
      'Channel and retailer intelligence',
      'Seasonal operating cycles, planned and measured'
    ],
    cta: 'Visit Farminsta OS',
    href: FARMINSTA_URL,
    external: true,
    audience: [
      'Agri-input companies',
      'Seed companies',
      'Contract production organisations',
      'Agricultural enterprises',
      'Field-force driven businesses'
    ]
  }
];

/* Farmreach OS capability set — public enterprise. */
const FARMREACH_OS_CAPABILITIES = [
  { title: 'Existing-system orchestration', body: 'Works alongside the department systems already in place, reconciling records instead of demanding replacement.' },
  { title: 'Farmer & Land Intelligence', body: 'Farmer, plot and land records resolved into one reliable identity across schemes and seasons.' },
  { title: 'Crop Watch', body: 'Crop stage and condition tracked across districts and blocks through the season.' },
  { title: 'Advisory Reach', body: 'Advisory routed to farmers and extension staff who can act on it inside the current window.' },
  { title: 'Field Operations Engine', body: 'Visits, verification and tasks for extension officers, GPS-tagged and offline-first.' },
  { title: 'Market & Trace', body: 'Movement from plot to procurement, traced to the record that produced it.' },
  { title: 'Input Intelligence', body: 'Input demand, distribution and availability read against actual field activity.' },
  { title: 'Risk & Resilience', body: 'Stress, damage and risk signals surfaced early, at the geography they occur in.' },
  { title: 'State Command Centre', body: 'One operating view for the state: coverage, gaps, activity and outcomes by district and block.' }
];

const FARMREACH_OS_ARCHITECTURE = [
  { num: '01', title: 'Data', body: 'Satellite intelligence, ground surveys, field officer capture and integration with existing state systems.' },
  { num: '02', title: 'Analysis', body: 'Crop mapping, land intelligence and agricultural analytics resolved against ground-level records.' },
  { num: '03', title: 'Insights', body: 'Exception flags, advisory triggers and situational intelligence at village, block, district and state levels.' },
  { num: '04', title: 'Action', body: 'Advisory dissemination, field task allocation and workflows that carry decisions back to the field.' },
  { num: '05', title: 'Measure Impact', body: 'Coverage, compliance, programme progress and outcomes recorded through ongoing operations.' }
];

const FARMREACH_OS_PRINCIPLES = [
  { title: 'The cadre comes first', body: 'Farmreach OS strengthens the state\u2019s existing agricultural extension capability, giving the cadre already working with farmers intelligence, task support and operational visibility rather than replacing their role.' },
  { title: 'Work with what exists', body: 'Departments already run systems, registries and processes. The operating system orchestrates them rather than asking a state to start again.' },
  { title: 'Field as system of record', body: 'A record created where the activity happened outranks a record assembled afterwards.' },
  { title: 'Auditable by design', body: 'Every record carries its geography, time and author, so verification and audit read the same data.' }
];

/* The public extension cadre is listed first: the field officer is the primary
   operational connection between the state and the farmer. */
const FARMREACH_OS_STAKEHOLDERS = [
  'Extension officers — Krishi Paryavekshak and equivalent field cadre',
  'District and block officers',
  'State agriculture departments',
  'Commissionerates and directorates',
  'Farmers and farmer groups',
  'Programme and scheme owners'
];

const FARMREACH_OS_DELIVERY = [
  { num: '01', title: 'Programme design', body: 'Scope, geography, stakeholders and the operating model for the deployment.' },
  { num: '02', title: 'Configuration', body: 'Schemes, workflows, roles and integrations configured to the department.' },
  { num: '03', title: 'Field rollout', body: 'Officer onboarding, training and the first season of live capture.' },
  { num: '04', title: 'Operate & measure', body: 'Steady-state operation with departmental reporting reconciled to the field record.' }
];


/* ==== src/data/recognition.js ==== */
/* Recognition entries. Nothing here is invented: a year, citation or photograph
   stays a marked placeholder (`year: ''`, `photo: null`, `pending: true`) until
   Farmreach supplies it. `photoNote` is the caption shown in an empty frame. */

const RECOGNITION = {
  hero: {
    title: 'Recognition along the journey',
    lede: 'Recognition for the work we have built and operated across agricultural technology, rural markets and digital transformation.'
  },
  entries: [
    {
      id: 'hysea-10x',
      year: '2020',
      title: 'HYSEA 10X Product Awards',
      subtitle: 'Recognised among innovative technology products',
      narration:
        "Farmreach was recognised through the HYSEA 10X Product Awards for its work in building technology solutions for agriculture. The recognition was presented by the Hon'ble Chief Minister of Telangana at the time, marking an important milestone in Farmreach's technology journey.",
      photo: 'assets/img/recognition/hysea-10x-2020.jpg',
      photoAlt: 'Farmreach Technologies receiving the HYSEA 10X Product Awards recognition on stage',
      photoNote: 'Event photograph to be supplied'
    },
    {
      id: 'champions-rural-markets',
      year: '2023',
      title: 'Champions of Rural Markets',
      subtitle: 'The Economic Times \u00b7 Mumbai',
      narration:
        "Farmreach was recognised by The Economic Times at the Champions of Rural Markets programme in Mumbai for its work in connecting technology, rural markets and agricultural ecosystems. The recognition reflected the company's focus on building practical systems for India's rural and agricultural economy.",
      photo: 'assets/img/recognition/et-champions-rural-markets.jpg',
      photoAlt: 'Farmreach Technologies receiving The Economic Times Champions of Rural Markets recognition on stage in Mumbai',
      photoNote: 'Event photograph to be supplied'
    },
    {
      id: 'recognition-03',
      year: '',
      title: '',
      subtitle: '',
      narration: '',
      photo: null,
      photoNote: 'Photograph to be supplied',
      pending: true
    }
  ]
};


/* ==== src/data/gallery.js ==== */
/* Gallery content. Photographs and captions live here so they can be added or
   replaced without touching the presentation component.

   To publish a photograph: set `src` (a file in public/assets/img/gallery/),
   `year`, `caption`, `description`, `category` and `alt`. Optional flags:
   `wide` (full-row tile), `contain` (fit rather than crop), `focus`
   (object-position for the crop). Entries are sorted newest year first at
   render time, so a new photograph can be appended anywhere in this list. */

const GALLERY = {
  hero: {
    title: 'A decade in the field',
    lede: 'Moments from the people, programmes, partnerships and milestones that have shaped Farmreach since 2016.'
  },
  intro: {
    eyebrow: 'Gallery',
    title: 'A record of the work, not a showcase',
    body: 'These are photographs from programmes, field operations, events and partnerships as they happened, added as they are cleared for publication.'
  },
  items: [
    {
      id: 'albaugh-farminsta-2026',
      year: '2026',
      caption: 'Albaugh PT Indonesia \u2014 Farminsta Launch',
      category: 'Partnerships',
      src: 'assets/img/gallery/albaugh-pt-indonesia-farminsta-launch.jpg',
      alt: 'The Albaugh PT Indonesia team at the Farminsta launch, holding up the app on their phones',
      wide: true
    },
    {
      id: 'hysea-2020',
      year: '2020',
      caption: 'HYSEA 10X Product Awards',
      category: 'Recognition',
      src: 'assets/img/recognition/hysea-10x-2020.jpg',
      alt: 'Farmreach Technologies receiving the HYSEA 10X Product Awards recognition on stage',
      wide: true
    },
    {
      id: 'et-champions-2023',
      year: '2023',
      caption: 'The Economic Times Champions of Rural Markets, Mumbai',
      category: 'Recognition',
      src: 'assets/img/recognition/et-champions-rural-markets.jpg',
      alt: 'Farmreach Technologies receiving The Economic Times Champions of Rural Markets recognition on stage in Mumbai'
    },
    {
      id: 'advanta-2018',
      year: '2018',
      caption: 'Advanta Field Crop Team \u2014 Farminsta Launch',
      category: 'Partnerships',
      src: 'assets/img/gallery/advanta-field-crop-team-2018.jpg',
      alt: 'The Advanta field crop team gathered at the Farminsta launch',
      wide: true
    },
    {
      id: 'advanta-vegetable-2018',
      year: '2018',
      caption: 'Advanta Vegetable Crop Team \u2014 Farminsta Launch, Maharashtra',
      category: 'Partnerships',
      src: 'assets/img/gallery/advanta-vegetable-crop-team-2018.jpg',
      alt: 'The Advanta vegetable crop team gathered at the Farminsta launch in Maharashtra'
    },
    {
      id: 'advanta-jaani-2018',
      year: '2018',
      caption: 'Advanta Vegetable Crop Team \u2014 Jaani Campaign, Tamil Nadu',
      category: 'Partnerships',
      src: 'assets/img/gallery/advanta-jaani-campaign-2018.jpg',
      alt: 'The Advanta vegetable crop team with Jaani campaign material in Tamil Nadu'
    },
    {
      id: 'icrisat-walmart-2019',
      year: '2019',
      caption: 'ICRISAT \u00d7 Walmart Foundation \u2014 Anantha Samruddhi Programme',
      category: 'Partnerships',
      src: 'assets/img/gallery/icrisat-walmart-anantha-samruddhi-2019.jpg',
      alt: 'Project inauguration of the ICRISAT and Walmart Foundation Anantha Samruddhi programme, with farmers seated before the dais'
    },
    {
      id: 'nrsc-geospatial',
      year: '2013',
      caption: 'Geospatial Technology in Agriculture \u2014 NRSC, Hyderabad',
      description: 'Early exposure to the application of geospatial analysis and remote sensing technologies in agriculture, at NRSC, Hyderabad.',
      category: 'Technology & Products',
      src: 'assets/img/gallery/nrsc-geospatial-workshop.jpg',
      alt: 'A speaker addressing the workshop on emerging geospatial technology innovations at the NRSC campus in Hyderabad',
      focus: 'center 42%'
    },
    {
      id: 'icrisat-nutri-basket-2017',
      year: '2017',
      caption: 'ICRISAT \u2014 Nutri Basket Programme',
      description: 'Digitising nutrition measurement for enriched millet-based food distribution through Anganwadi centres in Andhra Pradesh.',
      category: 'Partnerships',
      src: 'assets/img/gallery/icrisat-nutri-basket-2017.jpg',
      alt: 'Officials and Anganwadi staff reviewing the Nutri Basket programme app at a demonstration in Andhra Pradesh',
      wide: true,
      focus: 'center 45%'
    },
    {
      id: 'vegetable-value-chain-2017',
      year: '2017',
      caption: 'Vegetable Value Chain \u2014 Farmer-to-Market Linkage',
      description: 'Connecting farmers directly to markets through primary processing, improving value realisation and market access.',
      category: 'Field & Agriculture',
      src: 'assets/img/gallery/vegetable-value-chain-2017.jpg',
      alt: 'Farmreach staff inspecting graded cabbage crates in a vegetable primary processing area',
      wide: true
    },
    {
      id: 'upl-farminsta-2022',
      year: '2022',
      caption: 'UPL \u2014 Farminsta Launch',
      category: 'Partnerships',
      src: 'assets/img/gallery/upl-farminsta-launch-2022.jpg',
      alt: 'The UPL field team at the Farminsta launch session, seated as a colleague presents',
      wide: true,
      contain: true
    },
    {
      id: 'farmer-app-launch-2023',
      year: '2023',
      caption: 'Farmer App Launch \u2014 On-Demand Field Advisory',
      description: 'Launching a farmer-facing platform for on-demand Field Officer visits and personalised agricultural advisory.',
      category: 'Technology & Products',
      src: 'assets/img/gallery/farmer-app-launch-2023.jpg',
      alt: 'A Farminsta team member being interviewed at the farmer app launch stand, with two colleagues and the Farminsta banner behind'
    },
    {
      id: 'drone-spraying-2025',
      year: '2025',
      caption: 'Digital Drone Spraying Services \u2014 Farmer Access',
      description: 'Digitising drone spraying services to connect farmers with efficient, technology-enabled crop protection solutions.',
      category: 'Technology & Products',
      src: 'assets/img/gallery/drone-spraying-services-2025.jpg',
      alt: 'A spraying drone on a bund between paddy fields, with farmers and mixing containers behind it',
      focus: 'center 46%'
    }
  ],
  closing: {
    title: 'Part of the journey',
    body: "Farmreach's work is shaped by the people, organisations and agricultural communities we work with."
  }
};


/* ==== src/data/content.js ==== */

/* Narrative copy, kept out of components so it can be edited without touching
   layout logic. */

const ARCHITECTURE = {
  core: { label: 'Parent company', name: 'Farmreach Technologies' },
  pillars: [
    {
      kind: 'Public Enterprise',
      name: 'Farmreach OS',
      subtitle: 'Government Agriculture Operating System',
      body: 'Intelligence, orchestration, field operations and decision infrastructure for state agriculture, working with the systems a department already runs.',
      cta: 'Explore Farmreach OS',
      href: '/farmreach-os',
      external: false,
      tone: 'public'
    },
    {
      kind: 'Private Enterprise',
      name: 'Farminsta OS',
      subtitle: 'Private Agriculture Operating System',
      body: 'Field execution, farmer engagement, channel intelligence and seasonal operations for agricultural enterprises. Its own established site.',
      cta: 'Visit Farminsta OS',
      href: FARMINSTA_URL,
      external: true,
      tone: 'private'
    },
    {
      kind: 'Enterprise Transformation',
      name: 'Consulting & Transformation',
      subtitle: 'Strategy to field execution',
      body: 'Operating model, process, digital, go-to-market and implementation work, delivered across both the public and private sides of agriculture.',
      cta: 'Explore Consulting',
      href: '/consulting',
      external: false,
      tone: 'advisory'
    }
  ],
  foundation: {
    label: 'All three are built on the same foundation',
    items: ['Agricultural operating expertise', 'Data', 'Technology', 'Field execution']
  }
};

const HOME = {
  hero: {
    kicker: "India's Agricultural Operating Systems & Transformation Company",
    headline: 'We build the systems that make agriculture work.',
    paragraph: 'Farmreach Technologies combines agricultural operating expertise, technology, data and transformation consulting to help governments and enterprises design, build and operate agricultural systems at scale.'
  },
  system: {
    eyebrow: 'How we see agriculture',
    title: 'Agriculture is not one system. It is a system of connected decisions, people and actions.',
    body: [
      "India's agriculture is a vast network of farmers, public institutions, field teams, enterprises, markets and knowledge systems, operating across seasons, agro-climatic regions and millions of farms. It is foundational to the country's food system, rural economy and livelihoods.",
      'At the centre is the farmer, whose decisions turn land, inputs, knowledge and support into production. Everything around the farmer has a distinct role, and those roles only work when they stay connected.'
    ],
    bridge: [
      'Farmreach works across these connections, helping organisations capture what happens on the ground, connect fragmented information, understand the operating context and carry decisions back into action.',
      'That is the foundation of our operating systems and transformation work.'
    ]
  },
  /* Ordered as the system actually operates: programmes, then the human
     connection, then the farmer at the centre, then what reaches and receives
     the farm, and finally the layer that connects all of it.
     The entry marked `core` is the farmer. */
  ecosystem: [
    {
      tag: 'Sets programmes & support',
      name: 'Government',
      note: 'Government sets agricultural programmes, policies and support systems, from schemes and extension to crop, land, market and farmer services.'
    },
    {
      tag: 'Connects to the farmer',
      name: 'Field Officers',
      note: 'The human connection between agricultural programmes and the farmer, carrying information, advisory and programme support to the ground, and bringing field realities back into the system. Thousands of extension and field personnel work across India\u2019s agricultural geographies.'
    },
    {
      tag: 'Produces \u00b7 14+ crore operational farm holdings',
      name: 'Farmer',
      note: 'Farmers make decisions through every stage of the season: what to grow, when to sow, what inputs to use, how to manage the crop, and when and where to sell. More than 14 crore operational farm holdings form the productive base of Indian agriculture.',
      core: true
    },
    {
      tag: 'Bring technology & inputs',
      name: 'Agricultural Enterprises',
      note: 'Privately owned agricultural companies bring products, technologies and services to the farmer, from seeds, crop protection and inputs to equipment, digital tools and new production technologies.'
    },
    {
      tag: 'Connect production to demand',
      name: 'Markets',
      note: 'Markets connect farm production to demand through procurement, aggregation, trading, processing and distribution, and send price signals back to the farm.'
    },
    {
      tag: 'Knowledge for decisions',
      name: 'Advisory & Knowledge',
      note: 'Knowledge and advisory help farmers decide through the season, from crop selection and agronomy to weather, pest, disease and market information, reaching the farm through extension, research, enterprises, field officers and digital channels.'
    },
    {
      tag: 'Connects the system',
      name: 'Technology & Data',
      note: 'Technology connects the people, decisions and records across the agricultural system, linking field activity, farmer information, programmes, enterprises, advisory, markets and intelligence. It creates continuity between parts of agriculture that are otherwise distributed.'
    }
  ],
  approach: {
    eyebrow: 'How we work',
    title: 'Our transformation approach',
    body: 'Seven stages carry an organisation from understanding a problem to operating the solution. The same sequence holds for a state programme and an enterprise transformation; only the starting point differs.'
  },
  architecture: {
    eyebrow: 'Business architecture',
    title: 'One agricultural understanding. Three ways we operate.',
    body: 'Two operating systems and one transformation practice, all built on the same agricultural understanding. A state programme, an enterprise field force and a transformation engagement are three directions out of one core, not three separate businesses.'
  },
  operatingSystems: {
    eyebrow: 'Operating systems',
    title: 'Two operating systems. One transformation practice. One agricultural core.'
  },
  consulting: {
    eyebrow: 'What we do',
    title: 'Consulting & Transformation',
    body: 'Helping agricultural organisations understand where they are, define where they need to go, and build the systems and operating capabilities to get there.'
  },
  journey: {
    eyebrow: 'Our operating journey',
    title: 'Our Operating Journey',
    body: 'Since 2016, we have built and operated digital systems across the agricultural value chain \u2014 from field operations and farmer programmes to supply chains, channel management, digital outreach and intelligence. 10+ years of operating experience, 100+ organisations served, and figures drawn from live agricultural operations rather than projections or roadmap claims.'
  },
  closing: {
    title: 'Ready to work on the next agricultural transformation?',
    body: 'Whether you are a government institution, agricultural enterprise or organisation looking to transform how it operates, start a conversation with us.',
    routes: [
      { name: 'Farmreach OS', action: 'Explore Public Enterprise', href: '/farmreach-os', external: false },
      { name: 'Farminsta OS', action: 'Visit farminsta.com', href: FARMINSTA_URL, external: true },
      { name: 'Consulting & Transformation', action: 'Talk to us', href: '/contact', external: false }
    ]
  }
};

/* Homepage journey: the capability shifts, not every project. `major` marks the
   larger steps so the years are not all visually equal. */
const JOURNEY = [
  { year: '2016', title: 'Field Operations Transformation', body: 'Our first digital transformation for agricultural field operations, digitising field activity, workforce execution and ground-level reporting.', major: true },
  { year: '2018', title: 'Government Supply Chain', body: 'Digitised operations across 30+ primary processing centres for a government-led agricultural supply chain, connecting aggregation, processing and reporting.', major: true },
  { year: '2019\u20132021', title: 'Farmer & Production Systems', body: 'Production management, farmer knowledge and field-officer capability, farmer CRM, livelihood programmes and QR-based product traceability.', major: false },
  { year: '2022', title: 'Channel Management', body: 'Systems connecting agricultural enterprises with their field and distribution networks.', major: false },
  { year: '2024\u20132025', title: 'Digital Outreach & Connected Leads', body: 'Farmer reach through SMS, WhatsApp, social and campaign management, with every touchpoint feeding one lead management system.', major: true },
  { year: '2026', title: 'Geospatial Intelligence & AI', body: 'Village and plot-level geospatial analytics and AI copilots for farmers, field officers, enterprises and government decision-makers.', major: true }
];

/* Our Story: the full chronology, one achievement per year. */
const MILESTONES = [
  { year: '2016', title: 'Field Operations Transformation', body: 'First digital transformation for agricultural field operations, establishing the foundation for digitising field execution and ground-level activity.' },
  { year: '2017', title: 'Market Linkage & Vegetable Value Chain', body: 'Worked across vegetable procurement, aggregation, processing and direct market linkage, supported by on-ground operations and logistics.' },
  { year: '2018', title: 'Government Supply Chain Transformation', body: 'Digitised supply chain operations across 30+ primary processing centres, connecting aggregation, processing and operational management for a government programme.' },
  { year: '2019', title: 'Production Management & Farmer Knowledge', body: 'Expanded into farmer production management and launched systems for farmer knowledge and field-officer capability building, including crop, product and field interaction skills.' },
  { year: '2020', title: 'QR Product Traceability', body: 'Implemented QR-based product traceability for agricultural products, creating a digital connection between the product and its information at the point of engagement.' },
  { year: '2021', title: 'Farmer CRM & Livelihood Programmes', body: 'Built detailed farmer relationship management capabilities and supported digitally monitored farmer livelihood programmes connecting communities with processing and market ecosystems.' },
  { year: '2022', title: 'Channel Management', body: 'Built systems for managing agricultural channels and connecting enterprise operations with field and distribution networks.' },
  { year: '2023', title: 'Integrated Agricultural Operations', body: 'Consolidated and extended the platform capabilities developed across field, farmer, channel and operational systems.' },
  { year: '2024', title: 'Digital Farmer Outreach', body: 'Introduced digital farmer outreach through SMS, WhatsApp and campaign-led engagement, expanding how agricultural enterprises could reach farmers.' },
  { year: '2025', title: 'Multi-Channel Lead Management', body: 'Connected farmer leads from field activities, digital campaigns, social media, QR interactions and other channels into a unified lead management system.' },
  { year: '2026', title: 'Geospatial Intelligence & AI', body: 'Building village-level and farmer-plot-level geospatial intelligence, alongside AI copilots designed to support farmers, field officers, enterprises and government officers with context-specific information and alerts.' }
];

const COMPANY = {
  hero: {
    title: 'Built around agriculture. Evolved through technology.',
    lede: 'Farmreach Technologies Pvt Ltd is a Hyderabad-based agricultural technology and transformation company operating since 2016.'
  },
  story: [
    'Farmreach began with a simple observation: agriculture was full of capable people, complex operations and valuable field knowledge, but the systems connecting them were not keeping pace.',
    'Pradeep Raj came to this realisation through years of leadership across agriculture, business transformation, policy, value chains and commercial operations. After seeing the same operational gaps from different sides of the sector, he made the decision in 2016 to leave his corporate career and build a company focused on digital transformation in agriculture.',
    'The first work focused on transforming field operations. From there, the journey kept evolving \u2014 into farmer and production systems, value-chain and supply-chain operations, government programmes, channel management, farmer engagement and digital outreach.',
    'Farmreach was not built around a single product or a single model. It has evolved through successive transformations shaped by what agriculture actually needed in the field.',
    'Today, that journey has grown into three directions: Farmreach OS for public enterprise, Farminsta OS for private enterprise, and Consulting & Transformation for organisations seeking to change how they operate.',
    'What connects the journey is the same principle: understand agriculture first, then build the technology and operating systems that make it work better.'
  ],
  philosophy: [
    { title: 'Understand the field before building the system', body: 'Agriculture is shaped by people, seasons, geography and real operating conditions. We start by understanding how work actually happens on the ground.' },
    { title: 'Technology follows the operating model', body: 'We do not introduce technology for its own sake. We first understand the business, process and people, then design technology around the way the organisation needs to operate.' },
    { title: 'People remain at the centre', body: 'Farmers, field officers, managers, institutions and enterprises are part of the operating system. Technology should strengthen their ability to act, not replace the human relationships that make agriculture work.' },
    { title: 'Build for real conditions', body: 'Intermittent connectivity, distributed teams, multiple languages, seasonal cycles and diverse operating environments are design conditions, not exceptions.' },
    { title: 'Transform through iteration', body: 'Agricultural transformation is not a one-time implementation. Farmreach has evolved through successive operating experiences, learning from the field and continuously adapting the systems and business models.' },
    { title: 'Connect the ecosystem', body: 'Agriculture does not operate in isolated systems. Farmers, government, field teams, enterprises, markets, knowledge and technology need to work as connected parts of the same operating environment.' },
    { title: 'Make intelligence actionable', body: 'Data is valuable when it helps someone make a better decision or take the right action. Our systems are designed to move from field data to insight, action and measurement.' }
  ],
  /* Compact profiles: they support the story rather than dominating it.
     `linkedin` stays empty until an official profile URL is approved. */
  leadership: [
    {
      name: 'Pradeep Raj Y',
      role: 'Founder & CEO',
      photo: 'assets/img/people/pradeep-raj-y-cut.png',
      focus: 'Agriculture \u00b7 Business transformation \u00b7 Value chains \u00b7 Digital operations',
      linkedin: 'https://www.linkedin.com/in/pradeeprajy/',
      bio: [
        'Pradeep Raj Y is an agriculture and business transformation leader with over two decades of experience across agriculture, food systems, policy, value chains and digital operations. His career has included leadership roles across industry, consulting and agricultural development, giving him exposure to both the institutional and commercial sides of the sector.',
        'Across these experiences, he saw a recurring challenge: agriculture was generating enormous amounts of field activity and knowledge, but the systems connecting people, operations and decisions were fragmented. In 2016, he decided to move from advising and operating within the sector to building the digital systems needed to transform it. That led to the creation of Farmreach Technologies.',
        'Today, his work continues to focus on building practical operating systems and transformation capabilities for Indian agriculture.'
      ]
    },
    {
      name: 'Thangathtamilazhagie V',
      alias: 'Abila',
      role: 'Director & COO',
      photo: 'assets/img/people/abila-cut.png',
      focus: 'Digital transformation \u00b7 Product \u00b7 Operations \u00b7 Growth',
      linkedin: 'https://www.linkedin.com/in/thangathtamilazhagie/',
      bio: [
        'Abila V is a digital transformation and business leader with over a decade of experience across agriculture, business operations, product, technology and growth. She began her journey with Farmreach in 2016 through client relationships and field-level exposure, gaining a practical understanding of how agricultural businesses and their teams operate.',
        'Her role evolved across product management, strategy, planning, digital transformation, operations and growth. Working closely with teams and organisations on the ground shaped her approach to building technology around real business needs rather than technology alone.',
        'Today, she focuses on translating complex agricultural operations into practical digital products, systems and operating models that teams can actually adopt.'
      ]
    }
  ],
  xpedition: {
    label: 'Founder Advisory',
    title: 'Xpedition Labs',
    intro: 'Alongside Farmreach, our founder works with selected organisations through Xpedition Labs \u2014 an independent advisory practice focused on building and transforming businesses.',
    areas: ['Fund Raise', 'GTM', 'Product Strategy', 'Systems & Processes'],
    distinction: "Xpedition Labs is not a Farmreach product or operating system. It is the founder's independent advisory practice, drawing on experience across agriculture, technology, business transformation and enterprise operations.",
    cta: 'Explore Xpedition Labs'
  },
  capability: [
    { title: 'Technology capability', body: 'Two production operating systems, built for offline-first field capture, government integration and state-scale geography.' },
    { title: 'Consulting capability', body: 'Transformation, process, digital, GTM and implementation consulting delivered by people who have operated what they design.' }
  ],
  careers: {
    title: 'Careers',
    body: 'Farmreach hires people who want the operating problem, not only the software problem: agronomists, field operators, engineers, data people and consultants. Roles are open across Hyderabad and the field geographies we operate in.'
  }
};

const CONTACT = {
  hero: {
    title: 'Start a conversation.',
    lede: 'Tell us what you are looking to change, and we will route your enquiry to the right team.'
  },
  asideNote: 'Enquiries are routed to the team that owns the work — public enterprise, private enterprise, consulting and transformation, partnerships or careers.',
  office: {
    title: 'Farmreach Technologies Pvt Ltd',
    /* Address lives once, in site.js. */
    lines: SITE.address.slice(1),
    directionsUrl: 'https://maps.app.goo.gl/3wkZnsrar8MNDpFi8',
    /* The map is geocoded by the provider from the exact address string —
       no coordinates are authored or approximated here. */
    mapQuery: SITE.address.join(' ')
  }
};

const CONSULTING = {
  hero: {
    title: 'Transforming how agriculture operates.',
    lede: 'Farmreach combines a decade of agricultural operating experience with technology, process and market expertise to help organisations design, digitise and scale better ways of working.'
  },
  layers: {
    eyebrow: 'What we help transform',
    title: 'Transformation across the operating system',
    body: 'Agricultural transformation happens when strategy, people, processes, technology and market execution work together. Farmreach works across these layers to identify what needs to change, design the operating model and help move it into execution.'
  },
  method: {
    eyebrow: 'Transformation approach',
    title: 'From understanding to transformation',
    body: 'Where an engagement starts differs by organisation. The sequence does not: understand the operating environment first, then change it in steps that can be tested in the field.'
  },
  engagements: {
    eyebrow: 'Consulting engagements',
    title: 'Where we engage',
    body: 'Four engagement types, each with a defined scope and a defined set of outputs.'
  },
  audience: {
    eyebrow: 'Who we work with',
    title: 'Public, private and the wider agricultural ecosystem'
  },
  why: {
    eyebrow: 'Why Farmreach',
    title: 'Consulting grounded in operating experience',
    body: "Farmreach's consulting approach comes from operating agricultural systems, not only studying them. Since 2016, the team has worked across field operations, farmer systems, production, value chains, government programmes, channel management and digital outreach \u2014 experience that informs how transformation programmes are designed and implemented."
  },
  bridge: {
    eyebrow: 'Consulting and the operating systems',
    title: 'From transformation strategy to operating capability',
    body: 'Consulting can stand alone or lead into technology implementation. Where appropriate, Farmreach can translate the transformation roadmap into Farmreach OS for public enterprise or Farminsta OS for private enterprise.'
  }
};


/* ==== src/data/legal.js ==== */
/* Legal documents as structured content, so the same layout renders both and
   future agreements (MSA, SaaS terms, SOW, DPA, security schedule, AUP, NDA,
   retention policy, DSR procedure, incident response) can reuse the same
   shapes and terminology.

   Block types: 'p' (paragraph), 'ul' (bullet list), 'h3' (subsection),
   'address' (contact block), 'note' (set-apart advisory line).

   Dates are placeholders and must be set before publication. */

const LEGAL_ENTITY = {
  name: 'Farmreach Technologies Pvt Ltd',
  website: 'farmreach.in',
  email: 'ypr@farmreach.in',
  addressLines: [
    '1st Floor, SSR Arcade,',
    'Plot No. 328, Road No. 1/2,',
    'Mathrusree Nagar, Hafeezpet,',
    'Miyapur, Hyderabad,',
    'Telangana 500049, India'
  ]
};

const EFFECTIVE = '18 August 2026';
const UPDATED = '18 August 2026';

const REVIEW_NOTE =
  'This document sets out Farmreach’s policy position for its public website. It is drafted in the Indian legal context, including the Information Technology Act, 2000 and rules made under it, and the Digital Personal Data Protection Act, 2023 and applicable Rules. It does not claim certification or guaranteed legal compliance, and should be reviewed by qualified Indian legal counsel before being treated as contractual or legal advice.';

const TERMS = {
  path: '/terms',
  title: 'Terms of Use',
  eyebrow: 'Legal',
  meta: {
    title: 'Terms of Use — Farmreach Technologies',
    description:
      'Terms of Use governing access to and use of the Farmreach Technologies Pvt Ltd website, farmreach.in, and related publicly accessible digital content and services.'
  },
  effective: EFFECTIVE,
  updated: UPDATED,
  reviewNote: REVIEW_NOTE,
  intro: [
    'These Terms of Use govern access to and use of the Farmreach Technologies Pvt Ltd website, farmreach.in, and related publicly accessible digital content, features and services made available through the website.',
    'By accessing or using the website, the visitor agrees to use it responsibly and in accordance with these Terms.',
    'Where a customer, partner, employee, consultant or user enters into a separate written agreement with Farmreach, that agreement will govern the relevant commercial or service relationship to the extent of any inconsistency.'
  ],
  sections: [
    {
      id: 'about-farmreach',
      number: '1',
      heading: 'About Farmreach',
      blocks: [
        { type: 'p', text: 'Farmreach Technologies Pvt Ltd is an agricultural operating systems and transformation company operating from India.' },
        { type: 'p', text: 'Farmreach develops and provides technology, consulting, transformation and related services across agricultural operations.' },
        { type: 'p', text: 'Its operating businesses and offerings may include Farmreach OS, Farminsta OS, consulting and transformation services, technology systems, data and intelligence solutions, and related services.' },
        { type: 'p', text: 'The website may contain information about products, services, capabilities, projects, partnerships and areas of work.' }
      ]
    },
    {
      id: 'acceptable-use',
      number: '2',
      heading: 'Acceptable Use',
      blocks: [
        { type: 'p', text: 'Users may use the website only for lawful purposes.' },
        { type: 'p', text: 'Users must not:' },
        {
          type: 'ul',
          items: [
            'Use the website for unlawful, fraudulent or deceptive purposes.',
            'Attempt to gain unauthorised access to systems, accounts or infrastructure.',
            'Introduce malicious code, malware, viruses or harmful software.',
            'Interfere with the availability, security or operation of the website.',
            'Scrape, copy or systematically extract website content without permission.',
            'Misrepresent identity or affiliation.',
            'Use Farmreach branding or content in a way that implies unauthorised endorsement.',
            'Attempt to access information belonging to another user or organisation.',
            'Use the website to violate intellectual-property, privacy or other legal rights.'
          ]
        }
      ]
    },
    {
      id: 'website-content',
      number: '3',
      heading: 'Website Content',
      blocks: [
        { type: 'p', text: 'Farmreach makes reasonable efforts to maintain accurate and current information.' },
        { type: 'p', text: 'However, website content may be updated, modified, corrected or withdrawn without notice.' },
        { type: 'p', text: 'Information published on the website is provided for general informational purposes and does not constitute:' },
        {
          type: 'ul',
          items: [
            'Legal advice',
            'Financial advice',
            'Investment advice',
            'Agricultural advice for a specific farm or crop',
            'A guarantee of business results',
            'A commitment to deliver a particular product or feature'
          ]
        },
        { type: 'p', text: 'Product capabilities, implementation timelines, metrics, examples and descriptions may vary by engagement, geography, configuration and customer requirements.' }
      ]
    },
    {
      id: 'product-and-service-information',
      number: '4',
      heading: 'Product and Service Information',
      blocks: [
        { type: 'p', text: 'Descriptions of Farmreach OS, Farminsta OS, consulting services and other capabilities are indicative unless incorporated into a separate written agreement.' },
        { type: 'p', text: 'No website statement creates an obligation to provide a product, feature, integration, implementation timeline, service level or commercial term unless expressly agreed in writing.' },
        { type: 'p', text: 'Commercial terms, scope, implementation obligations, service levels, data responsibilities and intellectual-property rights will be governed by the applicable customer agreement, statement of work, order form or other written contract.' }
      ]
    },
    {
      id: 'intellectual-property',
      number: '5',
      heading: 'Intellectual Property',
      blocks: [
        { type: 'p', text: 'Unless otherwise stated, the website and its contents are owned by or licensed to Farmreach.' },
        { type: 'p', text: 'This includes:' },
        {
          type: 'ul',
          items: [
            'Text', 'Logos', 'Brand names', 'Visual identity', 'Graphics', 'Software',
            'Website design', 'Documentation', 'Product names', 'Databases',
            'Original materials', 'Other proprietary content'
          ]
        },
        { type: 'p', text: 'Users may view and access the content for legitimate informational purposes.' },
        { type: 'p', text: 'No right, title or licence is granted to reproduce, modify, distribute, publish, commercially exploit or create derivative works from Farmreach intellectual property except with written permission or where permitted by applicable law.' }
      ]
    },
    {
      id: 'third-party-links',
      number: '6',
      heading: 'Third-Party Links',
      blocks: [
        { type: 'p', text: 'The website may contain links to third-party websites including partner websites, social-media platforms, Xpedition Labs, Farminsta and other external resources.' },
        { type: 'p', text: 'Farmreach does not control third-party websites and is not responsible for their content, security, privacy practices or availability.' },
        { type: 'p', text: 'Use of third-party websites is subject to their respective terms and policies.' }
      ]
    },
    {
      id: 'submissions-and-enquiries',
      number: '7',
      heading: 'Submissions and Enquiries',
      blocks: [
        { type: 'p', text: 'Information submitted through the Contact page or other enquiry channels may be used to respond to the enquiry, evaluate business requirements and maintain appropriate business records.' },
        { type: 'p', text: 'Users should not submit confidential, highly sensitive or proprietary information through a public website form unless specifically requested and appropriate safeguards have been established.' },
        { type: 'p', text: 'Submission of an enquiry does not create a client relationship, confidentiality obligation or contractual relationship unless separately agreed.' }
      ]
    },
    {
      id: 'confidential-information',
      number: '8',
      heading: 'Confidential Information',
      blocks: [
        { type: 'p', text: 'Website visitors should not treat public website communications as a confidential channel.' },
        { type: 'p', text: 'Confidentiality obligations between Farmreach and another party should be established through an appropriate NDA, confidentiality clause or written agreement.' }
      ]
    },
    {
      id: 'disclaimer',
      number: '9',
      heading: 'Disclaimer',
      blocks: [
        { type: 'p', text: 'To the maximum extent permitted by applicable law, Farmreach provides the website and general website information on an “as available” basis.' },
        { type: 'p', text: 'Farmreach does not guarantee that the website will always be uninterrupted, error-free, secure or available.' },
        { type: 'p', text: 'Nothing in these Terms excludes liability that cannot lawfully be excluded under applicable Indian law.' }
      ]
    },
    {
      id: 'limitation-of-liability',
      number: '10',
      heading: 'Limitation of Liability',
      blocks: [
        { type: 'p', text: 'To the extent permitted by law, Farmreach shall not be responsible for indirect, incidental, consequential, special or punitive losses arising solely from use of the public website.' },
        { type: 'p', text: 'Nothing in these Terms limits liability where such limitation is prohibited by applicable law.' },
        { type: 'p', text: 'Any limitation applicable to a specific customer engagement will be governed by the relevant written agreement.' }
      ]
    },
    {
      id: 'indemnity',
      number: '11',
      heading: 'Indemnity',
      blocks: [
        { type: 'p', text: 'To the extent permitted by applicable law, a user may be responsible for losses or claims arising from their unlawful use of the website, violation of these Terms, infringement of third-party rights or misuse of Farmreach systems.' },
        { type: 'p', text: 'Any contractual indemnity between Farmreach and a customer will be governed by the applicable agreement.' }
      ]
    },
    {
      id: 'changes-to-these-terms',
      number: '12',
      heading: 'Changes to These Terms',
      blocks: [
        { type: 'p', text: 'Farmreach may update these Terms from time to time.' },
        { type: 'p', text: 'The updated version will be published on this page with the revised effective date.' },
        { type: 'p', text: 'Continued use of the website following publication of updated Terms constitutes acceptance to the extent permitted by law.' }
      ]
    },
    {
      id: 'governing-law',
      number: '13',
      heading: 'Governing Law',
      blocks: [
        { type: 'p', text: 'These Terms shall be governed by the laws of India.' },
        { type: 'p', text: 'Subject to any specific dispute-resolution provisions contained in a separate written agreement, courts having appropriate jurisdiction in Hyderabad, Telangana shall have jurisdiction over matters arising from use of the website.' }
      ]
    },
    {
      id: 'contact',
      number: '14',
      heading: 'Contact',
      blocks: [
        { type: 'p', text: 'For questions relating to these Terms:' },
        { type: 'address' }
      ]
    }
  ]
};

const PRIVACY = {
  path: '/privacy',
  title: 'Privacy & Data Protection Policy',
  eyebrow: 'Legal',
  meta: {
    title: 'Privacy & Data Protection Policy — Farmreach Technologies',
    description:
      'How Farmreach Technologies Pvt Ltd collects, uses, stores, discloses, protects and otherwise processes personal data in connection with farmreach.in and related interactions.'
  },
  effective: UPDATED,
  updated: UPDATED,
  reviewNote: REVIEW_NOTE,
  intro: [
    'Farmreach Technologies Pvt Ltd respects the privacy of individuals whose personal data it processes.',
    'This Privacy & Data Protection Policy explains how Farmreach may collect, use, store, disclose, protect and otherwise process personal data in connection with farmreach.in and related interactions.',
    'For platform customers and enterprise engagements, additional data-processing terms may apply through contracts, data-processing agreements, statements of work or customer-specific policies.',
    'This policy should be read together with applicable contractual documents where relevant.',
    'Farmreach’s role in relation to personal data depends on the particular processing activity and relationship: in some cases it determines the purposes and means of processing for its own business purposes, and in others it processes personal data on behalf of a customer under that customer’s instructions. This policy addresses processing in connection with the public website; personal data processed within enterprise customer platforms is governed by the applicable customer agreement and data-processing terms.'
  ],
  sections: [
    {
      id: 'scope',
      number: '1',
      heading: 'Scope',
      blocks: [
        { type: 'p', text: 'This policy applies to personal data collected through:' },
        {
          type: 'ul',
          items: [
            'farmreach.in',
            'Contact and enquiry forms',
            'Careers and recruitment interactions',
            'Business communications',
            'Events and meetings',
            'Partner interactions',
            'Other Farmreach-controlled digital channels covered by this policy'
          ]
        },
        { type: 'p', text: 'Where Farmreach processes personal data on behalf of a customer through an enterprise platform, the customer may determine the purposes and means of processing. In such circumstances, Farmreach’s role, responsibilities and data-processing obligations will be defined by the applicable customer agreement and data-processing terms.' }
      ]
    },
    {
      id: 'types-of-personal-data',
      number: '2',
      heading: 'Types of Personal Data',
      blocks: [
        { type: 'p', text: 'Depending on the interaction, Farmreach may process:' },
        { type: 'h3', text: 'Identity information' },
        { type: 'ul', items: ['Name', 'Professional designation', 'Organisation'] },
        { type: 'h3', text: 'Contact information' },
        { type: 'ul', items: ['Work email', 'Phone number', 'Business address', 'Communication details'] },
        { type: 'h3', text: 'Professional information' },
        { type: 'ul', items: ['Organisation', 'Role', 'Industry', 'Business requirements', 'Professional profile information voluntarily provided'] },
        { type: 'h3', text: 'Enquiry information' },
        { type: 'ul', items: ['Enquiry route', 'State or region', 'Description of business requirement', 'Information voluntarily included in communications'] },
        { type: 'h3', text: 'Technical information' },
        { type: 'ul', items: ['IP address', 'Browser type', 'Device information', 'Operating system', 'Approximate location derived from technical information', 'Website usage information', 'Log and security information'] },
        { type: 'h3', text: 'Recruitment information, where applicable' },
        { type: 'ul', items: ['CV/resume', 'Professional history', 'Qualifications', 'Skills', 'Application information'] },
        { type: 'p', text: 'Farmreach will seek to avoid collecting unnecessary personal data through public website forms.' }
      ]
    },
    {
      id: 'how-data-is-collected',
      number: '3',
      heading: 'How Data Is Collected',
      blocks: [
        { type: 'p', text: 'Personal data may be collected:' },
        {
          type: 'ul',
          items: [
            'Directly from the individual',
            'Through website forms',
            'Through business correspondence',
            'During meetings and events',
            'Through recruitment applications',
            'Through business partners',
            'Through publicly available professional information',
            'Automatically through website technologies such as cookies or server logs'
          ]
        }
      ]
    },
    {
      id: 'purposes-of-processing',
      number: '4',
      heading: 'Purposes of Processing',
      blocks: [
        { type: 'p', text: 'Farmreach may process personal data for purposes including:' },
        {
          type: 'ul',
          items: [
            'Responding to enquiries',
            'Communicating with prospective customers',
            'Understanding business requirements',
            'Providing requested information',
            'Managing customer and partner relationships',
            'Delivering contracted services',
            'Operating and securing digital platforms',
            'Providing technical support',
            'Managing user accounts where applicable',
            'Managing recruitment',
            'Maintaining business and operational records',
            'Preventing fraud and misuse',
            'Protecting systems and information',
            'Complying with applicable legal obligations',
            'Improving services and website functionality',
            'Conducting internal analysis and operational planning',
            'Communicating relevant business information where permitted'
          ]
        },
        { type: 'p', text: 'Farmreach will seek to process personal data only for legitimate and appropriate purposes.' }
      ]
    },
    {
      id: 'consent-and-other-lawful-bases',
      number: '5',
      heading: 'Consent and Other Lawful Bases',
      blocks: [
        { type: 'p', text: 'Where consent is required under applicable law, Farmreach will obtain consent in an appropriate manner.' },
        { type: 'p', text: 'Depending on the processing activity, processing may also occur where permitted or required by applicable law, including for contractual, legal, security, operational or other recognised purposes.' },
        { type: 'p', text: 'Where applicable, consent may be withdrawn through an appropriate mechanism.' },
        { type: 'p', text: 'Withdrawal of consent does not affect processing already carried out lawfully before withdrawal.' }
      ]
    },
    {
      id: 'cookies-and-similar-technologies',
      number: '6',
      heading: 'Cookies and Similar Technologies',
      blocks: [
        { type: 'p', text: 'Farmreach may use cookies and similar technologies for:' },
        {
          type: 'ul',
          items: ['Essential website functionality', 'Security', 'Preferences', 'Analytics', 'Performance measurement', 'Understanding website usage']
        },
        { type: 'p', text: 'Where consent is required for non-essential cookies, appropriate controls should be provided.' },
        { type: 'p', text: 'Users may also manage cookies through browser settings, although disabling certain cookies may affect website functionality.' }
      ]
    },
    {
      id: 'data-sharing',
      number: '7',
      heading: 'Data Sharing',
      blocks: [
        { type: 'p', text: 'Farmreach may share personal data where reasonably necessary with:' },
        {
          type: 'ul',
          items: [
            'Employees and authorised personnel',
            'Technology and infrastructure providers',
            'Cloud service providers',
            'Communication and email service providers',
            'Professional advisers',
            'Legal, audit and compliance advisers',
            'Service providers working under appropriate contractual obligations',
            'Government or regulatory authorities where legally required',
            'Business partners where necessary for a stated purpose and permitted by law'
          ]
        },
        { type: 'p', text: 'Farmreach does not sell personal data as a business asset.' }
      ]
    },
    {
      id: 'customer-data',
      number: '8',
      heading: 'Customer Data',
      blocks: [
        { type: 'p', text: 'Enterprise customers may provide Farmreach with personal data relating to farmers, employees, field officers, channel partners, suppliers or other individuals.' },
        { type: 'p', text: 'In such cases, the customer may be responsible for determining the purpose and lawful basis of processing.' },
        { type: 'p', text: 'Farmreach will process customer-provided personal data in accordance with applicable law and the relevant customer agreement.' },
        { type: 'p', text: 'Customer data may include:' },
        {
          type: 'ul',
          items: [
            'Farmer information',
            'Contact details',
            'Field officer information',
            'Location information',
            'Farm and plot information',
            'Activity records',
            'Transaction or operational records',
            'Images and documents',
            'Communication records',
            'Other data configured by the customer'
          ]
        },
        { type: 'p', text: 'The exact categories and processing activities will depend on the relevant platform and customer implementation.' }
      ]
    },
    {
      id: 'location-and-field-data',
      number: '9',
      heading: 'Location and Field Data',
      blocks: [
        { type: 'p', text: 'Certain Farmreach and Farminsta solutions may process GPS, location, plot, field and activity information.' },
        { type: 'p', text: 'Such information may be used for:' },
        {
          type: 'ul',
          items: [
            'Field activity recording',
            'Territory management',
            'Operational monitoring',
            'Mapping',
            'Agricultural intelligence',
            'Service delivery',
            'Compliance',
            'Analytics',
            'Customer-defined business workflows'
          ]
        },
        { type: 'p', text: 'Location data collected through enterprise platforms is subject to the applicable customer configuration, notices, consent mechanisms and contractual arrangements.' }
      ]
    },
    {
      id: 'data-retention',
      number: '10',
      heading: 'Data Retention',
      blocks: [
        { type: 'p', text: 'Farmreach will retain personal data only for as long as reasonably necessary for the purpose for which it was collected, contractual requirements, legitimate operational needs, security, dispute resolution and applicable legal or regulatory obligations.' },
        { type: 'p', text: 'Retention periods may differ depending on the category and purpose of data.' },
        { type: 'p', text: 'Customer data retention may be governed by the relevant customer agreement.' },
        { type: 'p', text: 'When personal data is no longer required, Farmreach will seek to delete, anonymise or otherwise securely dispose of it, subject to applicable legal, contractual and operational requirements.' }
      ]
    },
    {
      id: 'data-security',
      number: '11',
      heading: 'Data Security',
      blocks: [
        { type: 'p', text: 'Farmreach will implement reasonable and appropriate technical and organisational safeguards designed to protect personal data against:' },
        {
          type: 'ul',
          items: ['Unauthorised access', 'Unauthorised disclosure', 'Accidental loss', 'Destruction', 'Alteration', 'Misuse', 'Unauthorised processing']
        },
        { type: 'p', text: 'Depending on the system and risk profile, safeguards may include:' },
        {
          type: 'ul',
          items: [
            'Access controls',
            'Authentication',
            'Encryption where appropriate',
            'Network and infrastructure controls',
            'Logging and monitoring',
            'Backups',
            'Secure development practices',
            'Vulnerability management',
            'Employee access controls',
            'Incident response procedures',
            'Vendor controls'
          ]
        },
        { type: 'p', text: 'No internet-based system can guarantee absolute security.' }
      ]
    },
    {
      id: 'data-breaches-and-incidents',
      number: '12',
      heading: 'Data Breaches and Incidents',
      blocks: [
        { type: 'p', text: 'Farmreach maintains processes for identifying, investigating and responding to information-security incidents.' },
        { type: 'p', text: 'Where applicable law requires notification of a personal-data breach to affected individuals, customers, authorities or other parties, Farmreach will follow the applicable legal and contractual requirements.' },
        { type: 'p', text: 'Where Farmreach processes customer data on behalf of a customer, notification responsibilities and timelines may be further defined in the relevant customer agreement or data-processing terms.' }
      ]
    },
    {
      id: 'data-subject-rights',
      number: '13',
      heading: 'Data Subject Rights',
      blocks: [
        { type: 'p', text: 'Subject to applicable law, individuals may have rights relating to their personal data, which may include:' },
        {
          type: 'ul',
          items: [
            'Access to information about processing',
            'Access to personal data',
            'Correction of inaccurate or incomplete information',
            'Updating personal data',
            'Erasure where legally applicable',
            'Withdrawal of consent where processing is based on consent',
            'Grievance redressal',
            'Nomination or other rights where provided under applicable law'
          ]
        },
        { type: 'p', text: 'Requests may be submitted to:' },
        { type: 'email' },
        { type: 'p', text: 'Farmreach may need to verify the identity of the requester before processing a request.' },
        { type: 'p', text: 'Certain rights may be subject to legal, contractual, security or other permitted limitations.' }
      ]
    },
    {
      id: 'childrens-data',
      number: '14',
      heading: 'Children’s Data',
      blocks: [
        { type: 'p', text: 'Farmreach’s public website is primarily intended for business and professional audiences.' },
        { type: 'p', text: 'Farmreach does not knowingly seek to collect personal data from children through the public website for purposes that are not permitted by applicable law.' },
        { type: 'p', text: 'Where a Farmreach service involves children or other protected categories of individuals, additional safeguards and customer-specific requirements may apply.' }
      ]
    },
    {
      id: 'international-data-transfers',
      number: '15',
      heading: 'International Data Transfers',
      blocks: [
        { type: 'p', text: 'Farmreach may use cloud, technology and service providers that process information in India or other jurisdictions.' },
        { type: 'p', text: 'Where personal data is transferred outside India, Farmreach will seek to comply with applicable legal, regulatory and contractual requirements relating to such transfers.' },
        { type: 'p', text: 'Customer-specific data-location requirements may be addressed through the applicable customer agreement.' }
      ]
    },
    {
      id: 'third-party-service-providers',
      number: '16',
      heading: 'Third-Party Service Providers',
      blocks: [
        { type: 'p', text: 'Farmreach may use third-party providers for services such as:' },
        {
          type: 'ul',
          items: ['Cloud hosting', 'Email delivery', 'Analytics', 'Security', 'Communications', 'Infrastructure', 'Recruitment', 'Website functionality']
        },
        { type: 'p', text: 'Such providers may process information on Farmreach’s behalf where necessary for the relevant service.' },
        { type: 'p', text: 'Farmreach will seek to maintain appropriate contractual and security controls for relevant providers.' }
      ]
    },
    {
      id: 'business-transfers',
      number: '17',
      heading: 'Business Transfers',
      blocks: [
        { type: 'p', text: 'If Farmreach undergoes a merger, acquisition, restructuring, financing, sale of assets or similar transaction, personal data may be transferred as part of the transaction where legally permitted.' },
        { type: 'p', text: 'Any such transfer will remain subject to applicable privacy and data-protection obligations.' }
      ]
    },
    {
      id: 'links-to-other-websites',
      number: '18',
      heading: 'Links to Other Websites',
      blocks: [
        { type: 'p', text: 'Farmreach may link to third-party websites including:' },
        {
          type: 'ul',
          items: ['Farminsta', 'Xpedition Labs', 'LinkedIn', 'Facebook', 'Partner websites', 'Government or institutional websites']
        },
        { type: 'p', text: 'Farmreach is not responsible for the privacy practices of those external websites.' },
        { type: 'p', text: 'Users should review the privacy policies applicable to those websites.' }
      ]
    },
    {
      id: 'marketing-communications',
      number: '19',
      heading: 'Marketing Communications',
      blocks: [
        { type: 'p', text: 'Where permitted by applicable law, Farmreach may send relevant business communications to individuals who have requested information, engaged with Farmreach or otherwise have a legitimate business relationship.' },
        { type: 'p', text: 'Where consent is required, Farmreach will seek appropriate consent.' },
        { type: 'p', text: 'Recipients may request cessation of non-essential marketing communications.' }
      ]
    },
    {
      id: 'government-and-enterprise-data',
      number: '20',
      heading: 'Government and Enterprise Data',
      blocks: [
        { type: 'p', text: 'Farmreach may operate systems for government departments, public institutions and enterprise customers.' },
        { type: 'p', text: 'The privacy responsibilities for data processed within such systems may be distributed between Farmreach and the relevant customer according to the applicable law and contractual arrangement.' },
        { type: 'p', text: 'The customer may establish specific:' },
        {
          type: 'ul',
          items: [
            'Data collection requirements',
            'Consent mechanisms',
            'Retention periods',
            'Access controls',
            'User roles',
            'Data-sharing rules',
            'Data residency requirements',
            'Security requirements',
            'Deletion requirements'
          ]
        },
        { type: 'p', text: 'Such requirements may be documented through customer agreements, implementation specifications or data-processing agreements.' }
      ]
    },
    {
      id: 'data-processing-agreements',
      number: '21',
      heading: 'Data Processing Agreements',
      blocks: [
        { type: 'p', text: 'For enterprise customers where Farmreach processes personal data on behalf of the customer, the parties may enter into a Data Processing Agreement or equivalent contractual provisions.' },
        { type: 'p', text: 'Such agreements may define:' },
        {
          type: 'ul',
          items: [
            'Subject matter of processing',
            'Duration',
            'Nature and purpose',
            'Categories of personal data',
            'Categories of data principals',
            'Processing instructions',
            'Security obligations',
            'Sub-processors',
            'Data breach procedures',
            'Retention and deletion',
            'Audit or assurance mechanisms',
            'Data-subject assistance',
            'International transfer requirements'
          ]
        },
        { type: 'p', text: 'The applicable customer agreement will prevail where it contains more specific contractual requirements.' }
      ]
    },
    {
      id: 'changes-to-this-policy',
      number: '22',
      heading: 'Changes to This Policy',
      blocks: [
        { type: 'p', text: 'Farmreach may update this Privacy & Data Protection Policy periodically to reflect:' },
        {
          type: 'ul',
          items: [
            'Changes in law',
            'Regulatory developments',
            'Changes in services',
            'Changes in technology',
            'Changes in data-processing practices',
            'Security or operational improvements'
          ]
        },
        { type: 'p', text: 'The updated policy will be published on this page with a revised effective date.' }
      ]
    },
    {
      id: 'grievance-privacy-contact',
      number: '23',
      heading: 'Grievance / Privacy Contact',
      blocks: [
        { type: 'p', text: 'For privacy questions, data requests or concerns, contact:' },
        { type: 'address' },
        { type: 'note', text: 'If Farmreach formally designates a Data Protection Officer or Grievance Officer, their details should be added here before publication.' }
      ]
    },
    {
      id: 'governing-law',
      number: '24',
      heading: 'Governing Law',
      blocks: [
        { type: 'p', text: 'This policy shall be interpreted in accordance with applicable laws of India.' },
        { type: 'p', text: 'Where a specific customer agreement contains additional privacy or data-processing provisions, those provisions will apply to the relevant customer relationship to the extent permitted by law.' }
      ]
    }
  ]
};


/* ==== src/data/geo.js ==== */
/* India geography for the operating-ecosystem visual.
   Source: Natural Earth 110m country boundaries (public domain), projected in
   Mercator to a 900 x 1000 viewBox at authoring time and frozen here, so the
   page ships no mapping library and makes no data request.
   The northern boundary is redrawn to India's official external boundary
   (Survey of India): full Jammu & Kashmir including Gilgit-Baltistan, and
   Aksai Chin — Natural Earth's default depicts de-facto lines, which must not
   be shown on an India-facing site.
   Node positions are real city coordinates in the same projection.
   Note: internal state boundaries are intentionally absent — no verified
   state-boundary dataset has been approved. Add one path layer here if it is. */

const INDIA_PATH = 'M877.881,309.258L880,321.902L869.724,327.983L872.161,348.402L851.079,342.411L813.048,365.202L813.895,383.978L797.687,411.368L796.203,427.184L783.067,453.79L760.079,446.432L758.914,479.687L752.239,490.552L755.418,504.083L740.904,511.612L725.331,460.973L717.28,461.081L712.407,481.527L696.305,464.939L705.415,446.651L718.551,444.795L732.111,417.416L715.161,411.863L687.935,412.303L659.862,407.844L657.32,385.197L643.23,383.535L619.924,369.376L609.542,391.618L630.729,408.891L612.402,420.986L605.834,432.771L623.949,441.465L618.97,460.864L629.14,484.934L633.695,511.128L629.564,522.721L609.542,522.346L573.205,528.881L574.9,552.641L559.221,571.193L516.847,592.263L483.9,628.85L461.759,648.383L432.52,668.576L432.414,682.674L417.795,690.256L391.205,701.248L377.539,702.853L368.64,726.114L374.784,765.674L376.373,790.765L363.873,819.389L363.767,870.368L348.512,871.837L335.164,894.59L344.063,904.434L317.26,912.908L307.408,933.107L295.543,941.66L267.682,913.866L254.122,872.09L242.786,841.869L232.51,827.686L216.832,798.735L209.522,760.902L204.437,741.935L177.635,700.056L165.452,640.432L156.659,600.709L156.765,562.803L151.045,533.322L108.246,552.162L87.482,548.432L49.133,510.107L63.222,498.589L54.536,486.069L20,458.906L39.598,437.366L104.432,437.476L98.5,409.661L81.973,393.111L78.689,367.874L59.409,353.098L91.826,318.35L126.043,320.888L156.765,285.77L175.198,251.501L203.801,217.23L203.378,192.68L228.379,172.598L204.649,155.351L188.3,131.5L175.1,101L185.4,77.6L170.7,56.1L154.5,41.7L144.2,25.3L172.2,14.3L191.3,9L208.9,3L225.1,9L241.3,19.8L261.9,39.8L279.6,48.9L304.6,59.5L316.4,43.3L347.3,56.1L367.9,68.5L376.7,93.9L363.5,116.9L354.6,134.7L344.698,147.344L343.745,165.167L322.557,160.499L330.82,198.762L359.741,220.54L400.633,244.422L381.988,259.828L370.547,291.401L399.044,304.108L426.8,320.437L465.149,339.104L505.511,343.363L522.461,360.186L545.238,363.308L580.621,370.989L605.092,370.433L608.482,357.397L604.669,336.411L606.893,322.071L624.903,315.078L627.339,341.234L627.975,347.898L654.671,360.409L673.21,355.276L698,357.453L722.047,356.504L724.166,336.186L712.195,325.563L735.925,321.395L762.621,296.569L796.627,275.165L821.311,283.435L842.286,269.222L856.058,290.15L846.1,304.222Z';

const GOVERNMENT = ['Lucknow', 'Bhopal', 'Jaipur', 'Hyderabad', 'Kolkata', 'Guwahati', 'Bengaluru', 'Patna', 'Raipur', 'Bhubaneswar', 'Dehradun', 'Srinagar', 'Shimla'];
const ENTERPRISE = ['Ahmedabad', 'Pune', 'Nashik', 'Nagpur', 'Ludhiana', 'Meerut'];
const MARKET = ['Indore', 'Guntur', 'Kota', 'Rajkot', 'Surat', 'Solapur', 'Warangal'];
const ADVISORY = ['Coimbatore', 'Varanasi', 'Karnal', 'Hubballi', 'Jabalpur'];
const FIELD = ['Kanpur', 'Gorakhpur', 'Muzaffarpur', 'Siliguri', 'Sambalpur', 'Aurangabad', 'Kurnool', 'Belagavi', 'Mysuru', 'Thanjavur', 'Amritsar', 'Hisar'];

function layerOf(name) {
  if (GOVERNMENT.indexOf(name) >= 0) return 'government';
  if (ENTERPRISE.indexOf(name) >= 0) return 'enterprise';
  if (MARKET.indexOf(name) >= 0) return 'market';
  if (ADVISORY.indexOf(name) >= 0) return 'advisory';
  if (FIELD.indexOf(name) >= 0) return 'field';
  return 'farmer';
}

/* [name, state, weight, x, y] */
const NODES = [
  ['Ludhiana', 'Punjab', 3, 245.8, 220], ['Amritsar', 'Punjab', 2, 217, 194.8],
  ['Hisar', 'Haryana', 2, 242, 279.4], ['Karnal', 'Haryana', 3, 279.4, 261.2],
  ['Jaipur', 'Rajasthan', 2, 244.1, 354.1], ['Kota', 'Rajasthan', 3, 245.2, 410.8],
  ['Bikaner', 'Rajasthan', 1, 171.1, 317.3], ['Meerut', 'Uttar Pradesh', 3, 300.3, 285.2],
  ['Kanpur', 'Uttar Pradesh', 3, 378.3, 369.3], ['Lucknow', 'Uttar Pradesh', 4, 395.9, 356.1],
  ['Varanasi', 'Uttar Pradesh', 2, 455.9, 406.2], ['Gorakhpur', 'Uttar Pradesh', 2, 467.1, 359.1],
  ['Patna', 'Bihar', 3, 519.2, 397.4], ['Muzaffarpur', 'Bihar', 2, 526.6, 380.1],
  ['Bhagalpur', 'Bihar', 1, 573.4, 408.8], ['Ranchi', 'Jharkhand', 1, 524.2, 469.5],
  ['Kolkata', 'West Bengal', 3, 614, 494.8], ['Siliguri', 'West Bengal', 2, 616, 360.4],
  ['Guwahati', 'Assam', 2, 713.4, 379.4], ['Jorhat', 'Assam', 1, 786.4, 359.4],
  ['Bhubaneswar', 'Odisha', 2, 539.2, 566.6], ['Sambalpur', 'Odisha', 1, 484.8, 529.7],
  ['Raipur', 'Chhattisgarh', 2, 415.9, 536.7], ['Bhopal', 'Madhya Pradesh', 3, 291.7, 472.7],
  ['Indore', 'Madhya Pradesh', 4, 246.1, 490], ['Jabalpur', 'Madhya Pradesh', 2, 367.7, 475.3],
  ['Gwalior', 'Madhya Pradesh', 2, 314.4, 376.8], ['Ahmedabad', 'Gujarat', 3, 149.3, 480.1],
  ['Rajkot', 'Gujarat', 3, 97.2, 503.4], ['Surat', 'Gujarat', 2, 157, 539.2],
  ['Nashik', 'Maharashtra', 4, 185.2, 576.1], ['Pune', 'Maharashtra', 3, 187.3, 622.1],
  ['Nagpur', 'Maharashtra', 3, 341.2, 539.8], ['Aurangabad', 'Maharashtra', 2, 230.8, 579.7],
  ['Solapur', 'Maharashtra', 2, 247.6, 648.7], ['Hyderabad', 'Telangana', 3, 323.5, 657.1],
  ['Warangal', 'Telangana', 2, 355.9, 638.8], ['Guntur', 'Andhra Pradesh', 3, 380.9, 690.3],
  ['Kurnool', 'Andhra Pradesh', 2, 310.3, 705], ['Belagavi', 'Karnataka', 2, 206.1, 704.3],
  ['Hubballi', 'Karnataka', 3, 224.3, 719.3], ['Bengaluru', 'Karnataka', 3, 297, 791.9],
  ['Mysuru', 'Karnataka', 2, 269.1, 812.1], ['Coimbatore', 'Tamil Nadu', 3, 278.5, 850.5],
  ['Madurai', 'Tamil Nadu', 2, 312.6, 883.1], ['Thanjavur', 'Tamil Nadu', 2, 342.6, 857.4],
  ['Kochi', 'Kerala', 2, 258.2, 883.1], ['Dehradun', 'Uttarakhand', 1, 310, 239.8],
  ['Srinagar', 'Jammu & Kashmir', 1, 214.9, 109], ['Shimla', 'Himachal Pradesh', 1, 284.7, 213.1]
];

const MERIDIANS = [14.8, 73.7, 132.5, 191.4, 250.2, 309.1, 368, 426.8, 485.7, 544.5, 603.4, 662.2, 721.1, 779.9, 838.8, 897.6];
const PARALLELS = [940.6, 881.1, 821.1, 760.7, 699.8, 638.2, 576, 512.9, 449, 384, 318, 250.7, 182, 111.8, 40];
const LINKS = [[0, 3], [3, 7], [7, 8], [8, 9], [9, 12], [12, 16], [16, 20], [23, 24], [24, 27], [27, 30], [30, 31], [30, 32], [32, 35], [35, 37], [41, 43], [43, 46], [13, 18], [22, 32], [4, 23], [5, 26], [38, 41]];

/* Deterministic PRNG so server and client markup match exactly. */
function rng(seed) {
  let s = seed;
  return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
}

const ACTIVITY_DOTS = (() => {
  const rand = rng(20160414);
  const dots = [];
  NODES.forEach(([, , w, x, y]) => {
    const count = 3 + w * 5;
    for (let k = 0; k < count; k++) {
      const a = rand() * Math.PI * 2;
      const rad = Math.pow(rand(), 0.62) * (26 + w * 20);
      dots.push({
        x: +(x + Math.cos(a) * rad).toFixed(1),
        y: +(y + Math.sin(a) * rad * 0.92).toFixed(1),
        r: +(0.55 + rand() * 0.9).toFixed(2)
      });
    }
  });
  return dots;
})();

const LINK_PATHS = LINKS.map(([a, b]) => {
  const p = NODES[a];
  const q = NODES[b];
  const mx = (p[3] + q[3]) / 2;
  const my = (p[4] + q[4]) / 2;
  const dx = q[3] - p[3];
  const dy = q[4] - p[4];
  const len = Math.hypot(dx, dy) || 1;
  const bow = len * 0.14;
  return `M${p[3]},${p[4]} Q${(mx - dy / len * bow).toFixed(1)},${(my + dx / len * bow).toFixed(1)} ${q[3]},${q[4]}`;
});


/* ==== src/theme.js ==== */
/* Theme is stored under one key and applied to <html data-theme>. The initial
   value is set by an inline script in index.html so there is no flash.
   Default is DARK: the landing experience is dark unless the visitor has
   chosen otherwise, and that choice persists across pages and visits. */
const THEME_KEY = 'farmreach-theme';

const DEFAULT_THEME = 'dark';

function readTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch (e) { /* storage unavailable */ }
  return DEFAULT_THEME;
}

function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  try { window.localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignore */ }
}


/* ==== src/router.jsx ==== */

const RouterContext = createContext({ path: '/', navigate: () => {} });

function useRouter() {
  return useContext(RouterContext);
}

/* Minimal history router. No dependency, SSR-safe: during prerender the path
   is passed in and no browser API is touched. */
function RouterProvider({ initialPath = '/', children }) {
  const [path, setPath] = useState(initialPath);

  useEffect(() => {
    const onPop = () => { const h = window.location.hash; if (h && !h.startsWith('#/')) return; setPath(h.slice(1) || '/'); };
    window.addEventListener('popstate', onPop);
    onPop();
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to) => {
    if (typeof window === 'undefined') return;
    if (to === (window.location.hash.slice(1) || '/')) return;
    window.location.hash = to;
    setPath(to);
    window.scrollTo(0, 0);
  }, []);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

function Link({ to, external, children, className, ...rest }) {
  const { navigate } = useRouter();

  if (external) {
    return (
      <a className={className} href={to} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  const onClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
  };

  return (
    <a className={className} href={"#" + to} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}

function ExternalMark() {
  return (
    <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M2.4 7.6 7.6 2.4M3.6 2.4h4v4" />
    </svg>
  );
}


/* ==== src/components/Reveal.jsx ==== */

/* Scroll-reveal that fails visible. The markup is rendered on the server, and
   three separate paths guarantee it becomes visible: already-in-view at mount,
   IntersectionObserver on scroll, and a timeout backstop for environments where
   the observer never fires. */
function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    /* Above-the-fold content should not wait for a scroll event. */
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    io.observe(el);

    const backstop = window.setTimeout(() => setVisible(true), 4000);

    return () => { io.disconnect(); window.clearTimeout(backstop); };
  }, []);

  return (
    <Tag ref={ref} className={['reveal', visible ? 'is-visible' : '', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  );
}


/* ==== src/components/ThemeToggle.jsx ==== */


function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => { setTheme(readTheme()); }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-pressed={theme === 'dark'}
      title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
        </svg>
      )}
      <span className="vh">{theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}</span>
    </button>
  );
}


/* ==== src/components/SectionHeading.jsx ==== */


/* Editorial two-column section opener: label + title on the left, narrative on
   the right. Used across every page so hierarchy stays identical. */
function SectionHeading({ eyebrow, title, body, id, children, aside }) {
  return (
    <div className="split" style={{ marginBottom: 'var(--space-xl)' }}>
      <Reveal>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 id={id}>{title}</h2>
        {aside || null}
      </Reveal>
      <Reveal className="prose">
        {Array.isArray(body) ? body.map((p) => <p key={p}>{p}</p>) : body ? <p>{body}</p> : null}
        {children}
      </Reveal>
    </div>
  );
}


/* ==== src/components/PageHead.jsx ==== */


function PageHead({ eyebrow, title, lede, crumb, actions }) {
  return (
    <section className="page-head">
      <span className="page-head__bg" aria-hidden="true" />
      <div className="container page-head__inner">
        {crumb ? (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Farmreach</Link>
            <span aria-hidden="true">/</span>
            <span>{crumb}</span>
          </nav>
        ) : null}
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {lede ? <p className="page-head__lede">{lede}</p> : null}
        {actions ? <div className="btn-row" style={{ marginTop: 'var(--space-lg)' }}>{actions}</div> : null}
      </div>
    </section>
  );
}


/* ==== src/components/CTA.jsx ==== */



function CTA({ title, body, primary, secondary, routes }) {
  return (
    <section className={routes ? 'section closing closing--routes' : 'section closing'}>
      <span className="closing__bg" aria-hidden="true" />
      <div className="container closing__inner">
        <Reveal>
          <h2>{title}</h2>
          <p className="lead" style={{ marginTop: 'var(--space-md)' }}>{body}</p>
        </Reveal>
        {routes ? (
          <Reveal as="ul" className="closing__routes">
            {routes.map((r) => (
              <li className="closing__route" key={r.name}>
                <span className="closing__route-name">{r.name}</span>
                <Link to={r.href} external={r.external} className="textlink">
                  {r.action} {r.external ? <ExternalMark /> : <span aria-hidden="true">&rarr;</span>}
                </Link>
              </li>
            ))}
          </Reveal>
        ) : (
          <Reveal className="btn-row">
            <Link to={primary.href} external={primary.external} className="btn btn--primary">
              {primary.label} <span className="btn__arrow" aria-hidden="true">&rarr;</span>
            </Link>
            {secondary ? (
              <Link to={secondary.href} external={secondary.external} className="btn btn--secondary">
                {secondary.label} <span className="btn__arrow" aria-hidden="true">&rarr;</span>
              </Link>
            ) : null}
          </Reveal>
        )}
      </div>
    </section>
  );
}


/* ==== src/components/Ecosystem.jsx ==== */


/* How we see agriculture: the actors in operating order, with the farmer as the
   centre of production. Same grid, same classes — the hierarchy comes from the
   content and from which entry is marked `core`. */
function Ecosystem({ items }) {
  return (
    <Reveal className="eco">
      {items.map((item) => (
        <div className={item.core ? 'eco__cell eco__cell--core' : 'eco__cell'} key={item.name}>
          <span className="eco__tag">{item.tag}</span>
          <span className="eco__name">{item.name}</span>
          <span className="eco__note">{item.note}</span>
        </div>
      ))}
    </Reveal>
  );
}


/* ==== src/components/Architecture.jsx ==== */



/* One agricultural core, three operating directions.
   A structural diagram — core, rail, three drops, three columns, shared
   foundation — rather than three cards or intersecting circles. */
function Architecture({ core, pillars, foundation }) {
  return (
    <Reveal className="arch">
      <div className="arch__core">
        <span className="arch__core-label">{core.label}</span>
        <span className="arch__core-name">{core.name}</span>
      </div>

      <div className="arch__connector" aria-hidden="true">
        <span className="arch__rail" />
        <span className="arch__drop arch__drop--1" />
        <span className="arch__drop arch__drop--2" />
        <span className="arch__drop arch__drop--3" />
      </div>

      <div className="arch__directions">
        {pillars.map((p) => (
          <article className={`arch__dir arch__dir--${p.tone}`} key={p.name}>
            <span className="arch__dir-mark" aria-hidden="true" />
            <span className="arch__dir-kind">{p.kind}</span>
            <h3>{p.name}</h3>
            <p className="arch__dir-sub">{p.subtitle}</p>
            <p>{p.body}</p>
            <Link to={p.href} external={p.external} className="textlink">
              {p.cta} {p.external ? <ExternalMark /> : <span aria-hidden="true">&rarr;</span>}
            </Link>
          </article>
        ))}
      </div>

      <div className="arch__foundation">
        <span className="arch__foundation-label">{foundation.label}</span>
        <ul className="arch__foundation-items">
          {foundation.items.map((i) => <li key={i}>{i}</li>)}
        </ul>
      </div>
    </Reveal>
  );
}


/* ==== src/components/TransformationJourney.jsx ==== */


function TransformationJourney({ steps, dark = false }) {
  return (
    <Reveal as="ol" className={dark ? 'journey journey--dark' : 'journey'}>
      {steps.map((step) => (
        <li className="journey__step" key={step.title}>
          <span className="journey__num">{step.num}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
          <span className="journey__flow" aria-hidden="true">&rarr;</span>
        </li>
      ))}
    </Reveal>
  );
}


/* ==== src/components/ApproachTrack.jsx ==== */


/* HOW we work. One connected pathway: a continuous progression line with a node
   per stage, horizontal on desktop and vertical below it. Not seven cards. */
function ApproachTrack({ steps }) {
  return (
    <Reveal as="ol" className="track">
      {steps.map((step, i) => (
        <li className="track__stage" key={step.title}>
          <span className="track__marker" aria-hidden="true">
            <span className="track__line track__line--in" />
            <span className="track__dot" />
            <span className="track__line track__line--out" />
          </span>
          <span className="track__num">{step.num}</span>
          <h3 className="track__title">{step.title}</h3>
          <p className="track__body">{step.body}</p>
        </li>
      ))}
    </Reveal>
  );
}


/* ==== src/components/CapabilityList.jsx ==== */



/* WHAT the consulting business does. An editorial capability list — number and
   name on the left, scope on the right, separated by hairlines — so the four
   capability areas read as one practice rather than four products. */
function CapabilityList({ services }) {
  return (
    <Reveal as="ol" className="cap-list">
      {services.map((s, i) => (
        <li className="cap-list__item" key={s.id}>
          <span className="cap-list__num">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="cap-list__name">{s.homeName || s.short}</h3>
          <p className="cap-list__body">{s.homeSummary || s.summary}</p>
        </li>
      ))}
      <li className="cap-list__foot">
        <Link to="/consulting" className="textlink">
          Consulting &amp; Transformation in detail <span aria-hidden="true">&rarr;</span>
        </Link>
      </li>
    </Reveal>
  );
}


/* ==== src/components/JourneyTimeline.jsx ==== */



/* Capability evolution as one connected progression. Larger capability shifts
   carry a filled marker and a heavier title, so the years are not all equal. */
function JourneyTimeline({ milestones, moreHref, moreLabel }) {
  return (
    <Reveal className="jrn">
      <ol className="jrn__list">
        {milestones.map((m) => (
          <li className={m.major ? 'jrn__step jrn__step--major' : 'jrn__step'} key={m.year}>
            <span className="jrn__marker" aria-hidden="true">
              <span className="jrn__rail jrn__rail--in" />
              <span className="jrn__dot" />
              <span className="jrn__rail jrn__rail--out" />
            </span>
            <span className="jrn__year">{m.year}</span>
            <h3 className="jrn__title">{m.title}</h3>
            <p className="jrn__body">{m.body}</p>
          </li>
        ))}
      </ol>
      <Link to={moreHref} className="textlink jrn__more">
        {moreLabel} <span aria-hidden="true">&rarr;</span>
      </Link>
    </Reveal>
  );
}

/* Full chronology for Our Story: year, achievement, short explanation. */
function Chronology({ milestones }) {
  return (
    <Reveal as="ol" className="chrono">
      {milestones.map((m) => (
        <li className="chrono__item" key={m.year}>
          <span className="chrono__year">{m.year}</span>
          <div className="chrono__body">
            <h3>{m.title}</h3>
            <p>{m.body}</p>
          </div>
        </li>
      ))}
    </Reveal>
  );
}


/* ==== src/components/ConsultingService.jsx ==== */


/* Full service block for /consulting. */
function ConsultingService({ service, index }) {
  return (
    <Reveal as="article" className="svc" id={service.id}>
      <div className="svc__head">
        <span className="svc__num">{String(index + 1).padStart(2, '0')}</span>
        <h2>{service.name}</h2>
        <p className="lead">{service.summary}</p>
      </div>
      <div className="svc__grid">
        <div>
          <h3 className="eyebrow" style={{ marginBottom: 'var(--space-sm)' }}>What the engagement covers</h3>
          <ul className="svc__list">
            {service.explain.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="svc__outputs">
          <h4>Outputs</h4>
          <ul>{service.outputs.map((o) => <li key={o}>{o}</li>)}</ul>
        </div>
      </div>
    </Reveal>
  );
}

/* Compact index of the capability areas. */
function ServiceIndex({ services, onNavigateLabel = 'Learn more', link = true }) {
  return (
    <div className="svc-index">
      {services.map((s, i) => (
        <div className="svc-index__item" key={s.id}>
          <span className="svc-index__num">{String(i + 1).padStart(2, '0')}</span>
          <h3>{s.short}</h3>
          <p>{s.summary}</p>
          {link ? (
            <a className="textlink" href={`#/consulting`}>{onNavigateLabel} <span aria-hidden="true">&rarr;</span></a>
          ) : null}
        </div>
      ))}
    </div>
  );
}


/* ==== src/components/People.jsx ==== */



/* Compact leadership profile: small portrait, designation, short narration.
   The LinkedIn link renders only when an official URL is configured. */
function People({ items }) {
  return (
    <Reveal className="people">
      {items.map((p) => (
        <article className="person" key={p.name}>
          {/* Portrait left, the identity block centred beside it; the bio runs
             full width below the pair. */}
          <div className="person__head">
            {p.photo ? (
              <img className="person__portrait person__portrait--img" src={p.photo} alt={`Portrait of ${p.name}`} loading="lazy" />
            ) : (
              <div className="person__portrait" role="img" aria-label={`Portrait of ${p.name} to be supplied`}>Portrait</div>
            )}
            <div className="person__id">
              <h3 className="person__title">
                <span className="person__name">{p.name}</span>
                {p.alias ? (
                  <>
                    <span className="person__aliasLabel"> alias </span>
                    <span className="person__alias">({p.alias})</span>
                  </>
                ) : null}
              </h3>
              <p className="person__role">{p.role}</p>
              {p.focus ? <p className="person__focus">{p.focus}</p> : null}
              {p.linkedin ? (
                <a className="person__link" href={p.linkedin} target="_blank" rel="noopener noreferrer">
                  <span className="nav__ext">View LinkedIn Profile <ExternalMark /></span>
                </a>
              ) : null}
            </div>
          </div>
          {p.bio ? (
            <div className="person__bio">
              {p.bio.map((t) => <p key={t}>{t}</p>)}
            </div>
          ) : null}
        </article>
      ))}
    </Reveal>
  );
}


/* ==== src/components/LegalDocument.jsx ==== */


/* Shared layout for policy documents: sticky contents on desktop, a compact
   expandable contents block on mobile, deep-linkable section headings and a
   constrained reading measure. No hero imagery, no motion. */

function ContactBlock() {
  return (
    <address className="legal__address">
      <strong>{LEGAL_ENTITY.name}</strong><br />
      {LEGAL_ENTITY.addressLines.map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}
      <br />
      Email: <a href={`mailto:${LEGAL_ENTITY.email}`}>{LEGAL_ENTITY.email}</a>
    </address>
  );
}

function Block({ block }) {
  switch (block.type) {
    case 'h3':
      return <h3 className="legal__h3">{block.text}</h3>;
    case 'ul':
      return (
        <ul className="legal__list">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      );
    case 'address':
      return <ContactBlock />;
    case 'email':
      return (
        <p className="legal__email">
          <a href={`mailto:${LEGAL_ENTITY.email}`}>{LEGAL_ENTITY.email}</a>
        </p>
      );
    case 'note':
      return <p className="legal__note">{block.text}</p>;
    default:
      return <p>{block.text}</p>;
  }
}

/* Body is the scroll container on this site, so fragment navigation is done
   explicitly: it works the same in the static build and the review preview,
   and clears the sticky header. */
function scrollToId(id) {
  const el = id ? document.getElementById(id) : null;
  const current = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const top = el ? Math.max(0, el.getBoundingClientRect().top + current - 96) : 0;
  const opts = { top, behavior: 'smooth' };
  window.scrollTo(opts);
  if (document.body.scrollTop || document.body.scrollHeight > window.innerHeight) document.body.scrollTo(opts);
}

function LegalDocument({ doc }) {
  const [tocOpen, setTocOpen] = useState(false);
  const [active, setActive] = useState(doc.sections[0].id);

  /* Native fragment navigation does the scrolling; scroll-margin-top on
     .legal__section clears the sticky header. */
  const closeToc = () => setTocOpen(false);

  /* Honour a deep link on first load. */
  useEffect(() => {
    const id = (window.location.hash || '').replace(/^#/, '');
    if (id && doc.sections.some((s) => s.id === id)) {
      const t = setTimeout(() => scrollToId(id), 60);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [doc]);

  /* Reflect the section in view in the contents list, and honour a deep link
     on first load. */
  useEffect(() => {
    const ids = doc.sections.map((s) => s.id);
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [doc]);

  return (
    <section className="section section--light legal">
      <div className="container legal__grid">
        <nav className="legal__toc" aria-label={`${doc.title} contents`}>
          <p className="eyebrow">Contents</p>
          <button
            className="legal__tocToggle"
            type="button"
            aria-expanded={tocOpen}
            onClick={() => setTocOpen((v) => !v)}
          >
            {tocOpen ? 'Hide contents' : 'Show contents'}
          </button>
          <ol className="legal__tocList" data-open={tocOpen}>
            {doc.sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="legal__tocLink"
                  aria-current={active === s.id ? 'true' : undefined}
                  onClick={closeToc}
                >
                  <span className="legal__tocNum">{s.number}</span>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="legal__doc">
          <header className="legal__head">
            <p className="eyebrow">{doc.eyebrow}</p>
            <h1 className="legal__title">{doc.title}</h1>
            <dl className="legal__dates">
              <div>
                <dt>Effective date</dt>
                <dd>{doc.effective}</dd>
              </div>
              <div>
                <dt>Last updated</dt>
                <dd>{doc.updated}</dd>
              </div>
            </dl>
            {doc.intro.map((p) => <p className="legal__lede" key={p}>{p}</p>)}
            <p className="legal__note">{doc.reviewNote}</p>
          </header>

          {doc.sections.map((s) => (
            <section className="legal__section" id={s.id} key={s.id} aria-labelledby={`${s.id}-h`}>
              <h2 className="legal__h2" id={`${s.id}-h`}>
                <span className="legal__num">{s.number}</span>
                <a className="legal__anchor" href={`#${s.id}`}>{s.heading}</a>
              </h2>
              {s.blocks.map((b, i) => <Block block={b} key={i} />)}
            </section>
          ))}

          <p className="legal__top">
            <a href="#main">Back to top &uarr;</a>
          </p>
        </article>
      </div>
    </section>
  );
}


/* ==== src/components/StoryAside.jsx ==== */

/* Optional editorial block for the empty left column of the Our Story section.
   Typography only, existing tokens only. Removing this file and the single
   `aside` prop on the Our Story SectionHeading restores the previous layout. */
const PROGRESSION = [
  'Field operations',
  'Value chains',
  'Farmer systems',
  'Enterprise systems',
  'Agricultural intelligence'
];

function StoryAside() {
  return (
    <div className="story-aside">
      <p className="story-aside__figure">
        <span className="story-aside__num">10+</span>
        <span className="story-aside__unit">Years</span>
      </p>
      <p className="story-aside__note">Building digital systems around the realities of Indian agriculture.</p>
      <ol className="story-aside__track">
        {PROGRESSION.map((step) => (
          <li className="story-aside__step" key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}


/* ==== src/components/Capabilities.jsx ==== */


function Capabilities({ items, columns3 = true }) {
  return (
    <Reveal className="caps">
      {items.map((c, i) => (
        <article className="cap" key={c.title}>
          <span className="cap__num">{String(i + 1).padStart(2, '0')}</span>
          <h3>{c.title}</h3>
          <p>{c.body}</p>
        </article>
      ))}
    </Reveal>
  );
}


/* ==== src/components/GalleryGrid.jsx ==== */


/* Editorial photo grid with a lightbox, newest year first. */
function GalleryGrid({ items }) {
  const [openId, setOpenId] = useState(null);
  const panelRef = useRef(null);

  /* Newest year first, whatever order entries are authored in, so a future
     photograph lands in the right place by year alone. Same-year entries keep
     their authored order (Array.sort is stable). */
  const ordered = [...items].sort((a, b) => (Number(b.year) || -1) - (Number(a.year) || -1));
  const index = ordered.findIndex((i) => i.id === openId);
  const current = index >= 0 ? ordered[index] : null;

  const step = useCallback((dir) => {
    if (!ordered.length) return;
    const next = (index + dir + ordered.length) % ordered.length;
    setOpenId(ordered[next].id);
  }, [index, ordered]);

  useEffect(() => {
    if (!current) return undefined;
    const onKey = (ev) => {
      if (ev.key === 'Escape') setOpenId(null);
      if (ev.key === 'ArrowRight') step(1);
      if (ev.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (panelRef.current) panelRef.current.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [current, step]);

  return (
    <>
      <ul className="gal">
        {ordered.map((item) => (
          <li className={['gal__cell', item.wide ? 'gal__cell--wide' : '', item.contain ? 'gal__cell--contain' : ''].filter(Boolean).join(' ')} key={item.id}>
            <button type="button" className="gal__tile" onClick={() => setOpenId(item.id)}>
              <img
                src={item.src}
                alt={item.alt || item.caption}
                loading="lazy"
                style={item.focus ? { objectPosition: item.focus } : undefined}
              />
              <span className="gal__caption">
                <span className="gal__year">{item.year}</span>
                <span aria-hidden="true">{'\u00a0\u00b7\u00a0'}</span>
                {item.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current
        ? ReactDOM.createPortal(
            <div className="lbx" role="presentation" onMouseDown={(ev) => { if (ev.target === ev.currentTarget) setOpenId(null); }}>
              <div className="lbx__panel" role="dialog" aria-modal="true" aria-label={current.caption} tabIndex={-1} ref={panelRef}>
                <img src={current.src} alt={current.alt || current.caption} />
                <div className="lbx__bar">
                  <div>
                    <p className="lbx__caption">
                      <span className="gal__year">{current.year}</span>
                      <span aria-hidden="true">{'\u00a0\u00b7\u00a0'}</span>
                      {current.caption}
                    </p>
                    {current.description ? <p className="lbx__desc">{current.description}</p> : null}
                  </div>
                  <div className="lbx__nav">
                    <button type="button" className="tst__arrow" onClick={() => step(-1)} aria-label="Previous photograph">
                      <span aria-hidden="true">&larr;</span>
                    </button>
                    <button type="button" className="tst__arrow" onClick={() => step(1)} aria-label="Next photograph">
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                    <button type="button" className="tst__arrow" onClick={() => setOpenId(null)} aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}


/* ==== src/components/GeoVisual.jsx ==== */



/* India's agricultural operating ecosystem, drawn as geography.
   The viewBox carries headroom on every side, so the complete country —
   Jammu & Kashmir, Ladakh and the north-east — is always in frame. Ecosystem
   layers are told apart by mark and annotated in place; the connecting lines
   are the technology-and-data layer. Metric callouts are pinned around the map
   as part of the visual, not collected into a statistics block. */

function Grid({ className }) {
  return (
    <g className={className}>
      {MERIDIANS.map((x) => <line key={`m${x}`} x1={x} y1="10" x2={x} y2="990" />)}
      {PARALLELS.map((y) => <line key={`p${y}`} x1="10" y1={y} x2="890" y2={y} />)}
    </g>
  );
}

/* One small mark per ecosystem layer. Sizes are in viewBox units. */
function LayerMark({ layer, r, hot }) {
  const s = r * 1.9;
  const core = hot ? 'geo__node-core geo__node-core--hot' : 'geo__node-core';
  if (layer === 'government') {
    return <rect className="geo__mark" x={-s} y={-s} width={s * 2} height={s * 2} />;
  }
  if (layer === 'enterprise') {
    return <rect className="geo__mark" x={-s} y={-s} width={s * 2} height={s * 2} transform="rotate(45)" />;
  }
  if (layer === 'market') {
    return <path className="geo__mark" d={`M${-s},${s * 0.8} L0,${-s * 1.1} L${s},${s * 0.8} Z`} />;
  }
  if (layer === 'advisory') {
    return <circle className="geo__mark" r={s * 0.95} />;
  }
  if (layer === 'field') {
    return (
      <>
        <circle className={core} r={r * 0.75} />
        <circle className="geo__mark" r={r * 2.1} />
      </>
    );
  }
  return <circle className={core} r={r} />;
}

function GeoVisual({ callouts = true }) {
  return (
    <figure className="geo-figure">
      <svg
        className="geo"
        viewBox="-20 -40 940 1080"
        role="img"
        aria-label="Map of India showing Farmreach's agricultural operating ecosystem: farmer and field activity clusters across twenty states, with government, enterprise, market and advisory nodes connected by data links"
      >
        <defs>
          <radialGradient id="geoNode" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="geoFill" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="var(--geo-fill-a)" />
            <stop offset="100%" stopColor="var(--geo-fill-b)" />
          </linearGradient>
          <clipPath id="geoClip"><path d={INDIA_PATH} /></clipPath>
        </defs>

        <Grid className="geo__grid" />
        <g clipPath="url(#geoClip)"><Grid className="geo__grid-inner" /></g>

        <path className="geo__outline" d={INDIA_PATH} pathLength="1000" />

        {/* field activity at scale, abstracted rather than plotted */}
        <g className="geo__dust" clipPath="url(#geoClip)">
          {ACTIVITY_DOTS.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} />)}
        </g>

        {/* technology and data: the connecting layer */}
        <g>
          {LINK_PATHS.map((d, i) => (
            <path key={i} className="geo__link" d={d} style={{ '--i': i }} />
          ))}
        </g>

        {NODES.map(([name, state, w, x, y], i) => {
          const layer = layerOf(name);
          return (
            <g
              key={name}
              className={`geo__node geo__node--${layer}${w <= 1 ? ' geo__node--minor' : ''}`}
              style={{ '--i': i }}
              transform={`translate(${x} ${y})`}
            >
              <circle className="geo__halo" r={(8 + w * 5.5).toFixed(1)} fill="url(#geoNode)" />
              <LayerMark layer={layer} r={1.3 + w * 0.42} hot={w >= 3} />
              {w >= 4 ? (
                <circle className="geo__pulse" r={(9 + w * 2).toFixed(0)} fill="none" strokeWidth="0.9" />
              ) : null}
            </g>
          );
        })}

        {/* ecosystem layers annotated in place, on the map itself */}
        <g className="geo-annotations">
          {MAP_ANNOTATIONS.map((a, i) => {
            const dir = a.side === 'right' ? 1 : -1;
            const dy = a.dy || 0;
            return (
              <g className="geo-annotation" key={a.layer} style={{ '--i': i }}>
                <polyline
                  className="geo-annotation__leader"
                  points={`${a.x + dir * 6},${a.y} ${a.x + dir * 22},${a.y + dy} ${a.x + dir * 32},${a.y + dy}`}
                />
                <text
                  className="geo-annotation__label"
                  x={a.x + dir * 38}
                  y={a.y + dy + 5}
                  textAnchor={a.side === 'right' ? 'start' : 'end'}
                >
                  {a.name.toUpperCase()}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {callouts ? MAP_CALLOUTS.map((m) => (
        <figcaption className={`geo-callout geo-callout--${m.tier} geo-callout--${m.pos}`} key={m.label}>
          <span className="geo-callout__value">{m.value}</span>
          <span className="geo-callout__label">{m.label}</span>
          {m.note ? <span className="geo-callout__note">{m.note}</span> : null}
        </figcaption>
      )) : null}
    </figure>
  );
}


/* ==== src/components/Hero.jsx ==== */




function Hero() {
  const { kicker, headline, paragraph } = HOME.hero;
  return (
    <section className="hero">
      <span className="hero__bg" aria-hidden="true" />
      <span className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__kicker">{kicker}</p>
          <h1>{headline}</h1>
          <p>{paragraph}</p>
          <div className="btn-row">
            <Link to="/farmreach-os" className="btn btn--primary">
              Explore Farmreach OS <span className="btn__arrow" aria-hidden="true">&rarr;</span>
            </Link>
            <Link to="/consulting" className="btn btn--secondary">
              Explore Consulting <span className="btn__arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="hero__visual">
          <GeoVisual stats />
        </div>
      </div>
    </section>
  );
}


/* ==== src/components/ContactForm.jsx ==== */



const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', autoComplete: 'name', full: true },
  { name: 'email', label: 'Work email', type: 'email', autoComplete: 'email' },
  { name: 'organisation', label: 'Organisation', type: 'text', autoComplete: 'organization' },
  { name: 'route', label: 'Enquiry route', type: 'select' },
  { name: 'region', label: 'State or region', type: 'text', autoComplete: 'address-level1' }
];

/* The form posts to a server-side endpoint; no provider keys or internal
   recipients exist in this bundle. Validation mirrors the server rules. */
function ContactForm() {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const startedAt = useRef(Date.now());

  const validateField = (name, value) => {
    const single = validateEnquiry(normaliseEnquiry({ [name]: value }))[name] || '';
    setErrors((prev) => ({ ...prev, [name]: single }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const entries = Object.fromEntries(new FormData(form).entries());
    const data = normaliseEnquiry(entries);
    const next = validateEnquiry(data);
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus(null);
      const first = form.elements[Object.keys(next)[0]];
      if (first && first.focus) first.focus();
      return;
    }

    if (sending) return;
    const payload = {
      ...data,
      [HONEYPOT_FIELD]: entries[HONEYPOT_FIELD] || '',
      elapsedMs: Date.now() - startedAt.current
    };

    /* No endpoint configured (design review builds): confirm without sending. */
    if (!SITE.contactEndpoint) {
      setSent(true);
      setStatus({ ok: true, message: CONFIRMATION });
      return;
    }

    setSending(true);
    try {
      const res = await fetch(SITE.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        setSent(true);
        setStatus({ ok: true, message: body.message || CONFIRMATION });
      } else {
        if (body.errors) setErrors(body.errors);
        setStatus({ ok: false, message: body.error || 'Something went wrong while sending your enquiry. Please try again.' });
      }
    } catch {
      setStatus({ ok: false, message: 'Something went wrong while sending your enquiry. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="enquiry__done" role="status" aria-live="polite">
        <p className="eyebrow">Enquiry received</p>
        <p className="enquiry__doneText">{status ? status.message : CONFIRMATION}</p>
        <button
          className="btn btn--ghost"
          type="button"
          onClick={() => { setSent(false); setStatus(null); setErrors({}); startedAt.current = Date.now(); }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {FIELDS.map((f) => (
        <div className={`field${f.full ? ' field--full' : ''}`} data-invalid={Boolean(errors[f.name])} key={f.name}>
          <label htmlFor={`c-${f.name}`}>{f.label}</label>
          {f.type === 'select' ? (
            <select
              id={`c-${f.name}`}
              name={f.name}
              required
              defaultValue=""
              onChange={(ev) => validateField(f.name, ev.target.value)}
            >
              <option value="">Select one</option>
              {ENQUIRY_ROUTES.map((r) => <option value={r} key={r}>{r}</option>)}
            </select>
          ) : (
            <input
              id={`c-${f.name}`}
              name={f.name}
              type={f.type}
              autoComplete={f.autoComplete}
              maxLength={LIMITS[f.name] || 160}
              required
              onBlur={(ev) => validateField(f.name, ev.target.value)}
            />
          )}
          <p className="field__error" aria-live="polite">{errors[f.name] || ''}</p>
        </div>
      ))}

      <div className="field field--full" data-invalid={Boolean(errors.message)}>
        <label htmlFor="c-message">What are you trying to change?</label>
        <textarea
          id="c-message"
          name="message"
          maxLength={LIMITS.message}
          required
          onBlur={(ev) => validateField('message', ev.target.value)}
        />
        <p className="field__error" aria-live="polite">{errors.message || ''}</p>
      </div>

      {/* Bot trap: hidden from people and from assistive technology. */}
      <div className="field--trap" aria-hidden="true">
        <label htmlFor={`c-${HONEYPOT_FIELD}`}>Website</label>
        <input id={`c-${HONEYPOT_FIELD}`} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status && !status.ok ? <p className="form__status form__status--error" role="alert">{status.message}</p> : null}

      <div className="form__actions">
        <button className="btn btn--primary" type="submit" disabled={sending}>
          Send Enquiry <span className="btn__arrow" aria-hidden="true">&rarr;</span>
        </button>
        <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>We reply within two working days.</span>
      </div>
    </form>
  );
}


/* ==== src/components/Header.jsx ==== */





function Header() {
  const { path } = useRouter();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const toggleRef = useRef(null);

  /* Closing has to un-inert the page before focus can return to the toggle. */
  const closeAndRestore = () => {
    document.querySelectorAll('.site-header, main, .site-footer')
      .forEach((el) => el.removeAttribute('inert'));
    setOpen(false);
    if (toggleRef.current) toggleRef.current.focus();
  };

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    return () => document.body.classList.remove('is-locked');
  }, [open]);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    /* The drawer is inert while closed, so opacity alone can hide it and the
       panel is always focusable the instant it opens. The rest of the page is
       made inert while it is open, which is what actually contains focus. */
    const behind = document.querySelectorAll('.site-header, main, .site-footer');
    if (open) {
      drawer.removeAttribute('inert');
      behind.forEach((el) => el.setAttribute('inert', ''));
    } else {
      drawer.setAttribute('inert', '');
      behind.forEach((el) => el.removeAttribute('inert'));
    }

    if (!open) return;

    const focusFirst = () => {
      const first = drawer.querySelector('a[href], button:not([disabled])');
      if (first && !drawer.contains(document.activeElement)) first.focus();
    };

    /* Two frames plus a task, so the focus call cannot land before the style
       recalc that reveals the panel. */
    const raf = requestAnimationFrame(() => requestAnimationFrame(focusFirst));
    const timer = window.setTimeout(focusFirst, 60);

    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeAndRestore();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = drawer.querySelectorAll('a[href], button:not([disabled])');
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (!drawer.contains(document.activeElement)) { e.preventDefault(); firstEl.focus(); return; }
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
    };

    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const navItem = (item, className) => (
    <Link
      key={item.label}
      to={item.href}
      external={item.external}
      className={className}
      aria-current={!item.external && path === item.href ? 'page' : undefined}
      onClick={() => setOpen(false)}
    >
      {item.external ? (
        <span className="nav__ext">{item.label} <ExternalMark /></span>
      ) : item.label}
    </Link>
  );

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="logo" aria-label={`${SITE.name} — home`}>
            <img className="logo-img logo-img--ink" src="assets/img/farmreach-logo.png" alt={SITE.name} width="151" height="42" fetchpriority="high" />
            <img className="logo-img logo-img--mono" src="assets/img/farmreach-logo-mono.png" alt="" aria-hidden="true" width="151" height="42" />
          </Link>

          <nav className="nav" aria-label="Primary">
            {NAV.map((item) => navItem(item, 'nav__link'))}
          </nav>

          <div className="header-actions">
            <Link to="/contact" className="nav__cta">Talk to us</Link>
            <ThemeToggle />
              <button
              ref={toggleRef}
              className="nav-toggle"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span />
              <span className="vh">Menu</span>
            </button>
          </div>
        </div>
      </header>

      <div
        className="drawer"
        id="mobile-nav"
        ref={drawerRef}
        data-open={open}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Primary"
      >
        <div className="drawer__top">
          <Link to="/" className="logo" onClick={() => setOpen(false)} aria-label={`${SITE.name} — home`}>
            <img className="logo-img logo-img--ink" src="assets/img/farmreach-logo.png" alt={SITE.name} width="115" height="32" />
            <img className="logo-img logo-img--mono" src="assets/img/farmreach-logo-mono.png" alt="" aria-hidden="true" width="115" height="32" />
          </Link>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded="true"
            aria-controls="mobile-nav"
            onClick={closeAndRestore}
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <span style={{ transform: 'translateY(3.25px) rotate(45deg)' }} />
            <span style={{ transform: 'translateY(-3.25px) rotate(-45deg)' }} />
            <span className="vh">Close menu</span>
          </button>
        </div>

        <nav className="drawer__list" aria-label="Primary mobile">
          {NAV.map((item) => navItem(item, ''))}
        </nav>

        <div className="drawer__actions">
          <Link to="/contact" className="btn btn--primary drawer__cta" onClick={() => setOpen(false)}>
            Talk to us <span className="btn__arrow" aria-hidden="true">&rarr;</span>
          </Link>
          <ThemeToggle />
        </div>
        <p className="drawer__meta">{SITE.positioning}</p>
      </div>
    </>
  );
}


/* ==== src/components/Footer.jsx ==== */



/* External links only render when a real URL is configured; nothing is invented. */
function Ext({ href, children }) {
  if (!href) return <span className="site-footer__pending">{children} <em>(URL to confirm)</em></span>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <span className="nav__ext">{children} <ExternalMark /></span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="site-footer on-ink">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <img src="assets/img/farmreach-logo-mono.png" alt={SITE.name} width="151" height="42" style={{ width: '151px', height: 'auto' }} loading="lazy" />
            <p className="site-footer__brandline">{SITE.positioning}.</p>
            <p className="site-footer__social">
              <Ext href={SITE.social.linkedin}>Farmreach LinkedIn</Ext>
              <Ext href={SITE.social.facebook}>Farmreach Facebook</Ext>
            </p>
          </div>

          <div>
            <h2>Navigation</h2>
            <div className="site-footer__links">
              <Link to="/farmreach-os">Farmreach OS</Link>
              <Ext href={FARMINSTA_URL}>Farminsta OS</Ext>
              <Link to="/consulting">Consulting &amp; Transformation</Link>
              <Link to="/company">Our Story</Link>
              <Link to="/recognition">Recognition</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h2>Business</h2>
            <div className="site-footer__links">
              <Link to="/farmreach-os">Public Enterprise</Link>
              <Ext href={FARMINSTA_URL}>Private Enterprise</Ext>
              <Link to="/consulting">Consulting</Link>
              <Link to="/company">Careers</Link>
            </div>
          </div>

          <div>
            <h2>Contact</h2>
            <address>
              {SITE.registeredAddress}<br />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
              <a href={`tel:${SITE.phone.replace(/\s+/g, '')}`}>{SITE.phone}</a>
            </address>
            <p className="site-footer__group">
              <span className="site-footer__grouplabel">Group / advisory</span>
              <Ext href={SITE.xpeditionUrl}>Xpedition Labs</Ext>
            </p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>&copy; {new Date().getFullYear()} {SITE.legalName}</span>
          <span className="site-footer__legal">
            <Link to="/terms">Terms of Use</Link>
            <Link to="/privacy">Privacy &amp; Data Protection</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}


/* ==== src/pages/Home.jsx ==== */













const meta_Home = {
  path: '/',
  title: "Farmreach Technologies — India's Agricultural Operating Systems & Transformation Company",
  description: 'Farmreach Technologies combines agricultural operating expertise, technology, data and transformation consulting to help governments and enterprises design, build and operate agricultural systems at scale.'
};

function Home() {
  return (
    <>
      <Hero />

      {/* Three directions, stated immediately after the hero */}
      <section className="section--light" aria-label="Farmreach business directions">
        <div className="container">
          <ul className="pillar-strip">
            {ARCHITECTURE.pillars.map((p) => (
              <li className="pillar-strip__item" key={p.name}>
                <span className="pillar-strip__kind">{p.kind}</span>
                <span className="pillar-strip__name">{p.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Agriculture as a system */}
      <section className="section section--soft-green" aria-labelledby="system-title">
        <div className="container">
          <SectionHeading
            id="system-title"
            eyebrow={HOME.system.eyebrow}
            title={HOME.system.title}
            body={HOME.system.body}
          />
        </div>
        <div className="container">
          <Ecosystem items={HOME.ecosystem} />
        </div>
        <div className="container">
          <Reveal className="prose" style={{ marginTop: 'var(--space-xl)' }}>
            {HOME.system.bridge.map((p) => <p key={p} style={{ marginTop: 'var(--space-md)' }}>{p}</p>)}
          </Reveal>
        </div>
      </section>

      {/* Farmreach's operating model — one core, three directions */}
      <section className="section section--light" aria-labelledby="arch-title">
        <div className="container">
          <SectionHeading
            id="arch-title"
            eyebrow={HOME.architecture.eyebrow}
            title={HOME.architecture.title}
            body={HOME.architecture.body}
          />
        </div>
        <div className="container">
          <Architecture
            core={ARCHITECTURE.core}
            pillars={ARCHITECTURE.pillars}
            foundation={ARCHITECTURE.foundation}
          />
        </div>
      </section>

      {/* WHAT the consulting business does */}
      <section className="section section--soft-green" aria-labelledby="consulting-title">
        <div className="container">
          <SectionHeading
            id="consulting-title"
            eyebrow={HOME.consulting.eyebrow}
            title={HOME.consulting.title}
            body={HOME.consulting.body}
          />
        </div>
        <div className="container">
          <CapabilityList services={SERVICES} />
        </div>
      </section>

      {/* HOW we work — one connected pathway */}
      <section className="section section--light" aria-labelledby="approach-title">
        <div className="container">
          <SectionHeading
            id="approach-title"
            eyebrow={HOME.approach.eyebrow}
            title={HOME.approach.title}
            body={HOME.approach.body}
          />
        </div>
        <div className="container">
          <ApproachTrack steps={APPROACH} />
        </div>
      </section>

      {/* Our operating journey */}
      <section className="section section--soft-green" aria-labelledby="journey-title">
        <div className="container">
          <SectionHeading
            id="journey-title"
            eyebrow={HOME.journey.eyebrow}
            title={HOME.journey.title}
            body={HOME.journey.body}
          />
        </div>
        <div className="container">
          <JourneyTimeline
            milestones={JOURNEY}
            moreHref="/company"
            moreLabel="Explore our full journey"
          />
        </div>
      </section>

      <CTA
        title={HOME.closing.title}
        body={HOME.closing.body}
        routes={HOME.closing.routes}
      />
    </>
  );
}


/* ==== src/pages/FarmreachOS.jsx ==== */









const meta_FarmreachOS = {
  path: '/farmreach-os',
  title: 'Farmreach OS — Government Agriculture Operating System | Farmreach Technologies',
  description: 'Farmreach OS is the government agriculture operating system: intelligence, orchestration, field operations and decision infrastructure for state agriculture, working with existing government systems.'
};

const [FARMREACH_OS] = OPERATING_SYSTEMS;

function FarmreachOS() {
  return (
    <>
      <PageHead
        eyebrow="Public Enterprise"
        title="Government Agriculture Operating System"
        lede="Intelligence infrastructure for state agriculture."
        crumb="Farmreach OS"
      />

      <section className="section section--light">
        <div className="container split">
          <Reveal className="prose">
            <p className="lead">
              Farmreach OS gives a state the ability to see its agriculture as it happens, and act on what
              it sees &mdash; without replacing the systems already in place.
            </p>
            <p>
              It is an intelligence and operating layer above the digital systems a department already runs.
              It connects existing data, field intelligence, geospatial information and agricultural
              workflows so that decisions at village, block, district and state level read from the same
              record, and so that action can be coordinated across the people already working with farmers.
            </p>
          </Reveal>
          <Reveal>
            <p className="eyebrow">Who it serves</p>
            <ul className="stack" style={{ gap: 0 }}>
              {FARMREACH_OS.audience.map((a) => (
                <li
                  key={a}
                  style={{
                    padding: '13px 0',
                    borderBottom: '1px solid var(--line)',
                    fontSize: '15.5px',
                    color: 'var(--text-primary)'
                  }}
                >
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight section--soft-green" aria-labelledby="arch-title">
        <div className="container">
          <SectionHeading
            id="arch-title"
            eyebrow="Core architecture"
            title="Data, analysis, insight, action, impact."
            body="The architecture is a loop, not a pipeline. What is measured at the end changes what is captured at the start of the next season."
          />
        </div>
        <div className="container">
          <TransformationJourney steps={FARMREACH_OS_ARCHITECTURE} dark />
        </div>
      </section>

      <section className="section section--light" aria-labelledby="cap-title">
        <div className="container">
          <SectionHeading
            id="cap-title"
            eyebrow="Capabilities"
            title="Nine capabilities on one operating record."
            body="Each capability reads from the same farmer, land, crop and activity record, which is why a district view and a state view never disagree."
          />
        </div>
        <div className="container">
          <Capabilities items={FARMREACH_OS_CAPABILITIES} />
        </div>
      </section>

      <section className="section section--soft-green" aria-labelledby="principles-title">
        <div className="container">
          <SectionHeading
            id="principles-title"
            eyebrow="Design principles"
            title="Extension-first, and built for the department that already exists."
            body="These principles decide what Farmreach OS refuses to do as much as what it does."
          />
          <div className="split split--even">
            {FARMREACH_OS_PRINCIPLES.map((p) => (
              <Reveal key={p.title} style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--space-md)' }}>
                <h3>{p.title}</h3>
                <p style={{ marginTop: 'var(--space-2xs)' }}>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light" aria-labelledby="geo-title">
        <div className="container split">
          <div>
            <SectionHeading
              id="geo-title"
              eyebrow="Stakeholders & geography"
              title="The state, the district, the block, the plot."
              body="An operating system for state agriculture has to hold every level at once, because the officer, the district and the department each need a different resolution of the same record."
            />
            <Reveal>
              <ul className="svc__list" style={{ gridTemplateColumns: '1fr' }}>
                {FARMREACH_OS_STAKEHOLDERS.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </Reveal>
          </div>
          <Reveal>
            <GeoVisual callouts={false} />
          </Reveal>
        </div>
      </section>

      <section className="section section--tight section--soft-green" aria-labelledby="delivery-title">
        <div className="container">
          <SectionHeading
            id="delivery-title"
            eyebrow="Delivery"
            title="From programme design to steady operation."
            body="Deployment usually begins with one district and one season, then extends once the record holds."
          />
        </div>
        <div className="container">
          <TransformationJourney steps={FARMREACH_OS_DELIVERY} dark />
        </div>
      </section>

      <CTA
        title="For states considering this"
        body="Tell us the district, the scheme or the department system this needs to work with. We will come back with what the first season would involve."
        primary={{ href: '/contact', label: 'Request a state briefing' }}
        secondary={{ href: '/consulting', label: 'Explore Consulting' }}
      />
    </>
  );
}


/* ==== src/pages/Consulting.jsx ==== */











const meta_Consulting = {
  path: '/consulting',
  title: 'Consulting & Transformation — Farmreach Technologies',
  description: 'Agricultural transformation and advisory: operating model, digital transformation, process consulting and go-to-market work from a company that has operated agricultural systems at scale.'
};

/* Three customer groups and the four capability areas are compact by intent:
   this is an advisory page, so the argument is the sequence, not the cards. */
function Consulting() {
  return (
    <>
      <PageHead
        eyebrow="Consulting & Transformation"
        title={CONSULTING.hero.title}
        lede={CONSULTING.hero.lede}
        crumb="Consulting"
        actions={
          <>
            <Link to="/contact" className="btn btn--primary">
              Talk to us <span className="btn__arrow" aria-hidden="true">&rarr;</span>
            </Link>
            <a href="#why-title" className="btn btn--secondary">
              Our experience <span className="btn__arrow" aria-hidden="true">&rarr;</span>
            </a>
          </>
        }
      />

      <section className="section section--soft-green" aria-labelledby="layers-title">
        <div className="container">
          <SectionHeading
            id="layers-title"
            eyebrow={CONSULTING.layers.eyebrow}
            title={CONSULTING.layers.title}
            body={CONSULTING.layers.body}
          />
        </div>
        <div className="container">
          <ServiceIndex services={CAPABILITY_AREAS} link={false} />
        </div>
      </section>

      <section className="section section--light" aria-labelledby="method-title">
        <div className="container">
          <SectionHeading
            id="method-title"
            eyebrow={CONSULTING.method.eyebrow}
            title={CONSULTING.method.title}
            body={CONSULTING.method.body}
          />
        </div>
        <div className="container">
          <TransformationJourney steps={METHOD} />
        </div>
      </section>

      <section className="section section--soft-green" aria-labelledby="engage-title">
        <div className="container">
          <SectionHeading
            id="engage-title"
            eyebrow={CONSULTING.engagements.eyebrow}
            title={CONSULTING.engagements.title}
            body={CONSULTING.engagements.body}
          />
          {SERVICES.map((service, i) => (
            <ConsultingService service={service} index={i} key={service.id} />
          ))}
        </div>
      </section>

      <section className="section section--tight section--light" aria-labelledby="audience-title">
        <div className="container">
          <SectionHeading
            id="audience-title"
            eyebrow={CONSULTING.audience.eyebrow}
            title={CONSULTING.audience.title}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-lg)',
              marginTop: 'var(--space-lg)'
            }}
          >
            {AUDIENCES.map((a) => (
              <Reveal key={a.title} style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--space-md)' }}>
                <h3>{a.title}</h3>
                <p style={{ marginTop: 'var(--space-2xs)' }}>{a.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight section--soft-green" aria-labelledby="why-title">
        <div className="container">
          <p className="eyebrow" id="why-title">{CONSULTING.why.eyebrow}</p>
          <div className="split" style={{ marginTop: 'var(--space-md)' }}>
            <Reveal>
              <h2>{CONSULTING.why.title}</h2>
            </Reveal>
            <Reveal className="prose">
              <p className="lead">{CONSULTING.why.body}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--tight section--light" aria-labelledby="bridge-title">
        <div className="container">
          <SectionHeading
            id="bridge-title"
            eyebrow={CONSULTING.bridge.eyebrow}
            title={CONSULTING.bridge.title}
            body={CONSULTING.bridge.body}
          />
          <Reveal style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-lg)', marginTop: 'var(--space-md)' }}>
            <Link to="/farmreach-os" className="textlink">
              Explore Farmreach OS <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link to={FARMINSTA_URL} external className="textlink">
              Explore Farminsta OS <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CTA
        title="Have a transformation challenge to solve?"
        body="Tell us what you are trying to change. We will bring the right agricultural, operating and technology perspective to the conversation."
        primary={{ href: '/contact', label: 'Start a conversation' }}
      />
    </>
  );
}


/* ==== src/pages/Company.jsx ==== */











const meta_Company = {
  path: '/company',
  title: 'Our Story — Farmreach Technologies',
  description: 'Farmreach Technologies Pvt Ltd is a Hyderabad-based agricultural technology and transformation company operating since 2016.'
};

function Company() {
  return (
    <>
      <PageHead
        eyebrow="Our Story"
        title={COMPANY.hero.title}
        lede={COMPANY.hero.lede}
        crumb="Our Story"
      />

      <section className="section section--light" aria-labelledby="story-title">
        <div className="container">
          <SectionHeading
            id="story-title"
            eyebrow="Story"
            title="Why Farmreach began, and how it evolved."
            body={COMPANY.story}
            aside={<StoryAside />}
          />
        </div>
      </section>

      <section className="section section--tight section--soft-green" aria-labelledby="leadership-title">
        <div className="container">
          <p className="eyebrow" id="leadership-title">Leadership</p>
          <h2 style={{ marginBottom: 'var(--space-xl)', maxWidth: '24ch' }}>The people behind the journey</h2>
          <People items={COMPANY.leadership} />
        </div>
      </section>

      <section className="section section--light" aria-labelledby="chronology-title">
        <div className="container">
          <SectionHeading
            id="chronology-title"
            eyebrow="Timeline"
            title="Year by year, since 2016."
            body="Since 2016, Farmreach has built and operated digital systems across multiple layers of Indian agriculture. The journey spans field operations, farmer and production systems, value chains, government programmes, channel management, digital outreach and, now, geospatial intelligence and AI."
          />
        </div>
        <div className="container">
          <Chronology milestones={MILESTONES} />
        </div>
      </section>

      <section className="section section--soft-green" aria-labelledby="philosophy-title">
        <div className="container">
          <SectionHeading
            id="philosophy-title"
            eyebrow="Operating philosophy"
            title="Understand agriculture first. Then build the systems that make it work."
            body="Seven principles carried from actual agricultural operating experience into every engagement."
          />
          <div className="split split--even">
            {COMPANY.philosophy.map((p) => (
              <Reveal key={p.title} style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--space-md)' }}>
                <h3>{p.title}</h3>
                <p style={{ marginTop: 'var(--space-2xs)' }}>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light" aria-labelledby="capability-title">
        <div className="container">
          <SectionHeading
            id="capability-title"
            eyebrow="Capability"
            title="A technology company and a transformation company."
            body="The two halves are not separate business units bolted together. Each one exists because the other exposed what was missing."
          />
          <div className="split split--even">
            {COMPANY.capability.map((c) => (
              <Reveal key={c.title} style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--space-md)' }}>
                <h3>{c.title}</h3>
                <p style={{ marginTop: 'var(--space-2xs)' }}>{c.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="advisory">
            <p className="advisory__label">{COMPANY.xpedition.label}</p>
            <h3 className="advisory__name">{COMPANY.xpedition.title}</h3>
            <p className="advisory__intro">{COMPANY.xpedition.intro}</p>
            <ul className="advisory__areas">
              {COMPANY.xpedition.areas.map((a) => <li key={a}>{a}</li>)}
            </ul>
            <p className="advisory__note">{COMPANY.xpedition.distinction}</p>
            <a className="advisory__cta" href={SITE.xpeditionUrl} target="_blank" rel="noopener noreferrer">
              <span className="nav__ext">{COMPANY.xpedition.cta} <ExternalMark /></span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Partnerships section removed until real partner marks are supplied —
          the old placeholder logo wall lives in farmreach-v2/web if needed. */}

      <section className="section section--tight section--light" aria-labelledby="careers-title">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">Careers</p>
            <h2 id="careers-title">{COMPANY.careers.title}</h2>
          </Reveal>
          <Reveal className="prose">
            <p>{COMPANY.careers.body}</p>
          </Reveal>
        </div>
      </section>

      <CTA
        title="Work with us, or work at Farmreach."
        body="Programme enquiries, transformation engagements, partnerships and roles all route through the same place."
        primary={{ href: '/contact', label: 'Talk to us' }}
      />
    </>
  );
}


/* ==== src/pages/Recognition.jsx ==== */




const meta_Recognition = {
  path: '/recognition',
  title: 'Recognition — Farmreach Technologies',
  description: 'Recognition for Farmreach Technologies across agricultural technology, rural markets and digital transformation, including the HYSEA 10X Product Awards and The Economic Times Champions of Rural Markets.'
};

/* A curated timeline: year and citation on one side, the event photograph on
   the other, alternating surfaces down the page. Photographs carry the page,
   so an unsupplied one leaves a labelled frame rather than a stand-in image. */
function Entry({ entry, index }) {
  const soft = index % 2 === 1;
  const pending = Boolean(entry.pending);
  return (
    <section
      className={`section ${soft ? 'section--soft-green' : 'section--light'}`}
      id={entry.id}
      aria-labelledby={`${entry.id}-title`}
    >
      <div className="container rec">
        <Reveal className="rec__head">
          <p className={entry.year ? 'rec__year' : 'rec__year rec__year--pending'}>
            {entry.year || 'Year to be confirmed'}
          </p>
          <h2 id={`${entry.id}-title`} className="rec__title">
            {pending ? 'Recognition to be confirmed' : entry.title}
          </h2>
          {entry.subtitle ? <p className="rec__subtitle">{entry.subtitle}</p> : null}
        </Reveal>
        <Reveal className="rec__figure">
          {entry.photo ? (
            <img src={entry.photo} alt={entry.photoAlt || entry.title} loading="lazy" />
          ) : (
            <div className="rec__frame" role="img" aria-label={entry.photoNote}>
              <span>{entry.photoNote}</span>
            </div>
          )}
        </Reveal>
        <Reveal as="p" className="rec__narration">
          {pending
            ? 'Details for this recognition will be published once they are confirmed by Farmreach.'
            : entry.narration}
        </Reveal>
      </div>
    </section>
  );
}

function Recognition() {
  return (
    <>
      <PageHead
        eyebrow="Recognition"
        title={RECOGNITION.hero.title}
        lede={RECOGNITION.hero.lede}
        crumb="Recognition"
      />
      {/* Pending entries stay in the data as marked placeholders but are not
          published until their details are confirmed. */}
      {RECOGNITION.entries.filter((entry) => !entry.pending).map((entry, i) => (
        <Entry entry={entry} index={i} key={entry.id} />
      ))}
    </>
  );
}


/* ==== src/pages/Gallery.jsx ==== */






const meta_Gallery = {
  path: '/gallery',
  title: 'Gallery — Farmreach Technologies',
  description: "Photographs from Farmreach Technologies' programmes, field operations, events, partnerships and milestones since 2016."
};

function Gallery() {
  return (
    <>
      <PageHead
        eyebrow="Gallery"
        title={GALLERY.hero.title}
        lede={GALLERY.hero.lede}
        crumb="Gallery"
      />

      <section className="section section--soft-green" aria-labelledby="gallery-title">
        <div className="container">
          <SectionHeading
            id="gallery-title"
            eyebrow={GALLERY.intro.eyebrow}
            title={GALLERY.intro.title}
            body={GALLERY.intro.body}
          />
        </div>
        <div className="container">
          <GalleryGrid items={GALLERY.items} />
        </div>
      </section>

      <CTA
        title={GALLERY.closing.title}
        body={GALLERY.closing.body}
        primary={{ href: '/contact', label: 'Talk to us' }}
      />
    </>
  );
}


/* ==== src/pages/Contact.jsx ==== */






const meta_Contact = {
  path: '/contact',
  title: 'Contact — Farmreach Technologies',
  description: 'Tell us what you are looking to change and we will route your enquiry to the right Farmreach team.'
};

function Contact() {
  const office = CONTACT.office;

  return (
    <>
      <PageHead
        eyebrow="Contact"
        title={CONTACT.hero.title}
        lede={CONTACT.hero.lede}
        crumb="Contact"
      />

      <section className="section section--soft-green">
        <div className="container enquiry">
          <Reveal className="enquiry__form">
            <p className="eyebrow">Enquiry</p>
            <ContactForm />
          </Reveal>

          <Reveal className="enquiry__aside">
            <p className="eyebrow">Direct</p>
            <address className="enquiry__direct">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
              <a href={`tel:${SITE.phone.replace(/\s+/g, '')}`}>{SITE.phone}</a>
            </address>
            <p className="enquiry__note">{CONTACT.asideNote}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container office">
          <Reveal className="office__detail">
            <p className="eyebrow">Our Office</p>
            <h2 className="office__title">{office.title}</h2>
            <address className="office__address">
              {office.lines.map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}
            </address>
          </Reveal>

          <Reveal className="office__map">
            <div className="office__mapWrap">
              <iframe
                className="office__mapFrame"
                title="Farmreach office location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&output=embed`}
              />
              {/* The geocoded marker sits at the embed's centre; this invisible
                  hit area makes the pin itself the link, adding no new UI. */}
              <a
                className="office__mapPin"
                href={office.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open the Farmreach office location in Google Maps"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}


/* ==== src/pages/Terms.jsx ==== */



const meta_Terms = { path: TERMS.path, ...TERMS.meta };

function Terms() {
  return <LegalDocument doc={TERMS} />;
}


/* ==== src/pages/Privacy.jsx ==== */



const meta_Privacy = { path: PRIVACY.path, ...PRIVACY.meta };

function Privacy() {
  return <LegalDocument doc={PRIVACY} />;
}


/* ==== src/pages/NotFound.jsx ==== */


const meta_NotFound = {
  path: '/404',
  title: 'Page not found — Farmreach Technologies',
  description: 'The page you were looking for is not here.'
};

function NotFound() {
  return (
    <section className="section" style={{ minHeight: '56vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <p className="eyebrow">404</p>
        <h1 style={{ maxWidth: '20ch' }}>That page is not part of the system.</h1>
        <p className="lead" style={{ marginTop: 'var(--space-md)' }}>
          The link may be old, or the page may have moved. These four routes cover the whole site.
        </p>
        <div className="btn-row" style={{ marginTop: 'var(--space-lg)' }}>
          <Link to="/" className="btn btn--primary">Home <span className="btn__arrow" aria-hidden="true">&rarr;</span></Link>
          <Link to="/farmreach-os" className="btn btn--secondary">Farmreach OS <span className="btn__arrow" aria-hidden="true">&rarr;</span></Link>
          <Link to="/consulting" className="btn btn--secondary">Consulting <span className="btn__arrow" aria-hidden="true">&rarr;</span></Link>
          <Link to="/contact" className="btn btn--secondary">Contact <span className="btn__arrow" aria-hidden="true">&rarr;</span></Link>
        </div>
      </div>
    </section>
  );
}


/* ==== src/App.jsx ==== */














/* Single route table: used by the client router AND by prerender.mjs, so the
   static output and the SPA can never drift apart. */
const PAGES = [
  { path: '/', Component: Home, meta: meta_Home },
  { path: '/farmreach-os', Component: FarmreachOS, meta: meta_FarmreachOS },
  { path: '/consulting', Component: Consulting, meta: meta_Consulting },
  { path: '/company', Component: Company, meta: meta_Company },
  { path: '/recognition', Component: Recognition, meta: meta_Recognition },
  { path: '/gallery', Component: Gallery, meta: meta_Gallery },
  { path: '/contact', Component: Contact, meta: meta_Contact },
  { path: '/terms', Component: Terms, meta: meta_Terms },
  { path: '/privacy', Component: Privacy, meta: meta_Privacy }
];

const NOT_FOUND = { path: '/404', Component: NotFound, meta: meta_NotFound };

function resolve(path) {
  const clean = (path || '/').replace(/\/+$/, '') || '/';
  return PAGES.find((p) => p.path === clean) || NOT_FOUND;
}

function App() {
  const { path } = useRouter();
  const route = resolve(path);
  const Page = route.Component;

  /* Keep the document title in sync on client-side navigation. The initial
     value is already correct in the prerendered HTML. */
  useEffect(() => {
    document.title = route.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', route.meta.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', window.location.origin + route.path);
  }, [route]);

  return (
    <>
      <Header />
      <main id="main">
        <Page />
      </main>
      <Footer />
    </>
  );
}


ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(RouterProvider, { initialPath: (window.location.hash.startsWith('#/') ? window.location.hash.slice(1) : '') || '/' },
    React.createElement(App))
);
