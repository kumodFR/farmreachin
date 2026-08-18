import { FARMINSTA_URL, SITE } from './site.js';

/* Narrative copy, kept out of components so it can be edited without touching
   layout logic. */

export const ARCHITECTURE = {
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

export const HOME = {
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
export const JOURNEY = [
  { year: '2016', title: 'Field Operations Transformation', body: 'Our first digital transformation for agricultural field operations, digitising field activity, workforce execution and ground-level reporting.', major: true },
  { year: '2018', title: 'Government Supply Chain', body: 'Digitised operations across 30+ primary processing centres for a government-led agricultural supply chain, connecting aggregation, processing and reporting.', major: true },
  { year: '2019\u20132021', title: 'Farmer & Production Systems', body: 'Production management, farmer knowledge and field-officer capability, farmer CRM, livelihood programmes and QR-based product traceability.', major: false },
  { year: '2022', title: 'Channel Management', body: 'Systems connecting agricultural enterprises with their field and distribution networks.', major: false },
  { year: '2024\u20132025', title: 'Digital Outreach & Connected Leads', body: 'Farmer reach through SMS, WhatsApp, social and campaign management, with every touchpoint feeding one lead management system.', major: true },
  { year: '2026', title: 'Geospatial Intelligence & AI', body: 'Village and plot-level geospatial analytics and AI copilots for farmers, field officers, enterprises and government decision-makers.', major: true }
];

/* Our Story: the full chronology, one achievement per year. */
export const MILESTONES = [
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

export const COMPANY = {
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
      photo: '/assets/img/people/pradeep-raj-y-cut.png',
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
      photo: '/assets/img/people/abila-cut.png',
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

export const CONTACT = {
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

export const CONSULTING = {
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
