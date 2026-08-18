/* Consulting & transformation — four capabilities: WHAT Farmreach can do for an
   organisation. Approach and principles live in Operating Philosophy; keep that
   language out of here.
   `homeSummary` appears on the homepage; `explain` and `outputs` on /consulting. */

export const SERVICES = [
  {
    id: 'agricultural-transformation',
    homeName: 'Agricultural Transformation',
    homeSummary: 'Transformation strategy and operating-model redesign for organisations working across agriculture.',
    name: 'Agricultural Transformation',
    short: 'Agricultural Transformation',
    summary: 'Transformation strategy, operating-model redesign, roadmaps and programme structuring.',
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
    id: 'process-operations',
    homeName: 'Process & Operations',
    homeSummary: 'Business process audits, workflow redesign, operating structures and process improvement across agricultural operations.',
    name: 'Process & Operations Consulting',
    short: 'Process & Operations',
    summary: 'Process audits, workflow redesign, operating structures and SOP design.',
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
    id: 'technology-digital-systems',
    homeName: 'Technology & Digital Systems',
    homeSummary: 'Digital product strategy, solution architecture, platform design, data systems and technology implementation.',
    name: 'Technology & Digital Systems',
    short: 'Technology & Digital Systems',
    summary: 'Digital product strategy, solution architecture, platform and data design, and technology implementation.',
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
    id: 'gtm',
    homeName: 'Go-to-market',
    homeSummary: 'GTM strategy, channel models, field-force structures, farmer engagement and commercial execution.',
    name: 'Go-to-market',
    short: 'Go-to-market',
    summary: 'GTM strategy, channel models, field-force structures, farmer engagement and commercial execution.',
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
export const APPROACH = [
  { num: '01', title: 'Understand', body: 'Understand the organisation, context, objectives and operating environment.' },
  { num: '02', title: 'Assess', body: 'Assess existing processes, systems, people, data and technology.' },
  { num: '03', title: 'Design', body: 'Define the target operating model, workflows, systems and transformation roadmap.' },
  { num: '04', title: 'Build', body: 'Develop or configure the required technology, processes and operating capabilities.' },
  { num: '05', title: 'Implement', body: 'Deploy the solution, onboard teams and establish the new operating model.' },
  { num: '06', title: 'Operate', body: 'Support adoption, monitor execution and refine the system through real operating experience.' },
  { num: '07', title: 'Measure', body: 'Measure adoption, execution and progress against the transformation objectives.' }
];

/* Methodology used by the /consulting page's own method section. */
export const METHOD = [
  { num: '01', title: 'Understand', body: 'Agriculture, the organisation, the field reality and the constraints that are not written down.' },
  { num: '02', title: 'Assess', body: 'Operating model, processes, data and digital maturity, measured rather than assumed.' },
  { num: '03', title: 'Design', body: 'The target operating model, the processes to support it and the systems it needs.' },
  { num: '04', title: 'Build', body: 'Platforms, integrations and workflows, built on operating systems that already run at state scale.' },
  { num: '05', title: 'Implement', body: 'Rollout, field onboarding, training and the change management that decides adoption.' },
  { num: '06', title: 'Operate', body: 'Run the model through a season, with the field as the system of record.' },
  { num: '07', title: 'Measure', body: 'Attribute outcomes back to the design that produced them, then iterate.' }
];
