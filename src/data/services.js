/* Consulting & transformation.
   CAPABILITY_AREAS — what Farmreach helps transform (compact, /consulting).
   SERVICES — the engagement types, with scope and outputs (/consulting detail).
   `homeName`/`homeSummary` are the homepage capability list; keep them stable.
   AUDIENCES — who the practice works with. Approach and principles live in
   Operating Philosophy; keep that language out of here. */

export const CAPABILITY_AREAS = [
  { id: 'operating-model', short: 'Business & Operating Model', summary: 'Designing practical operating models, workflows, roles and governance for agricultural organisations.' },
  { id: 'digital', short: 'Digital Transformation', summary: 'Assessing existing processes and systems and designing digital workflows, platforms and integrations that support real operations.' },
  { id: 'process', short: 'Process & Operations Consulting', summary: 'Mapping current operations, identifying opportunities for improvement and building scalable processes across field, farmer, channel and value-chain operations.' },
  { id: 'growth', short: 'Go-to-Market & Growth', summary: 'Designing market-entry, farmer engagement, channel, digital outreach and execution strategies for agricultural businesses.' }
];

export const AUDIENCES = [
  { title: 'Public Enterprise', body: 'State agriculture departments, commissionerates and public institutions seeking to modernise agricultural programmes and operating systems.' },
  { title: 'Private Enterprise', body: 'Agri-input companies, seed businesses, contract production organisations and other agricultural enterprises seeking operational and digital transformation.' },
  { title: 'Agricultural Ecosystem', body: 'Research institutions, development organisations, FPOs, technology companies and ecosystem partners working on agricultural transformation.' }
];

export const SERVICES = [
  {
    id: 'transformation-audit',
    homeName: 'Transformation Strategy',
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
export const APPROACH = [
  { num: '01', title: 'Understand', body: 'Understand the organisation, context, objectives and operating environment.' },
  { num: '02', title: 'Assess', body: 'Assess existing processes, systems, people, data and technology.' },
  { num: '03', title: 'Design', body: 'Define the target operating model, workflows, systems and transformation roadmap.' },
  { num: '04', title: 'Build', body: 'Develop or configure the required technology, processes and operating capabilities.' },
  { num: '05', title: 'Implement', body: 'Deploy the solution, onboard teams and establish the new operating model.' },
  { num: '06', title: 'Operate', body: 'Support adoption, monitor execution and refine the system through real operating experience.' },
  { num: '07', title: 'Measure', body: 'Measure adoption, execution and progress against the transformation objectives.' }
];

/* The seven-step transformation sequence used by /consulting. */
export const METHOD = [
  { num: '01', title: 'Understand', body: 'Understand the organisation, operating environment, objectives and constraints.' },
  { num: '02', title: 'Diagnose', body: 'Assess current processes, systems, data and field execution.' },
  { num: '03', title: 'Design', body: 'Define the target operating model, workflows and transformation priorities.' },
  { num: '04', title: 'Digitise', body: 'Translate approved processes into appropriate digital systems and technology.' },
  { num: '05', title: 'Pilot', body: 'Test the model in a controlled operating environment and refine it through real use.' },
  { num: '06', title: 'Scale', body: 'Extend the validated model across teams, territories, programmes or markets.' },
  { num: '07', title: 'Measure & Evolve', body: 'Track adoption and operating performance and continuously improve the system.' }
];
