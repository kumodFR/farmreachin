import { FARMINSTA_URL } from './site.js';

export const OPERATING_SYSTEMS = [
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
export const FARMREACH_OS_CAPABILITIES = [
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

export const FARMREACH_OS_ARCHITECTURE = [
  { num: '01', title: 'Data', body: 'Satellite intelligence, ground surveys, field officer capture and integration with existing state systems.' },
  { num: '02', title: 'Analysis', body: 'Crop mapping, land intelligence and agricultural analytics resolved against ground-level records.' },
  { num: '03', title: 'Insights', body: 'Exception flags, advisory triggers and situational intelligence at village, block, district and state levels.' },
  { num: '04', title: 'Action', body: 'Advisory dissemination, field task allocation and workflows that carry decisions back to the field.' },
  { num: '05', title: 'Measure Impact', body: 'Coverage, compliance, programme progress and outcomes recorded through ongoing operations.' }
];

export const FARMREACH_OS_PRINCIPLES = [
  { title: 'The cadre comes first', body: 'Farmreach OS strengthens the state\u2019s existing agricultural extension capability, giving the cadre already working with farmers intelligence, task support and operational visibility rather than replacing their role.' },
  { title: 'Work with what exists', body: 'Departments already run systems, registries and processes. The operating system orchestrates them rather than asking a state to start again.' },
  { title: 'Field as system of record', body: 'A record created where the activity happened outranks a record assembled afterwards.' },
  { title: 'Auditable by design', body: 'Every record carries its geography, time and author, so verification and audit read the same data.' }
];

/* The public extension cadre is listed first: the field officer is the primary
   operational connection between the state and the farmer. */
export const FARMREACH_OS_STAKEHOLDERS = [
  'Extension officers — Krishi Paryavekshak and equivalent field cadre',
  'District and block officers',
  'State agriculture departments',
  'Commissionerates and directorates',
  'Farmers and farmer groups',
  'Programme and scheme owners'
];

export const FARMREACH_OS_DELIVERY = [
  { num: '01', title: 'Programme design', body: 'Scope, geography, stakeholders and the operating model for the deployment.' },
  { num: '02', title: 'Configuration', body: 'Schemes, workflows, roles and integrations configured to the department.' },
  { num: '03', title: 'Field rollout', body: 'Officer onboarding, training and the first season of live capture.' },
  { num: '04', title: 'Operate & measure', body: 'Steady-state operation with departmental reporting reconciled to the field record.' }
];
