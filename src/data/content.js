import { FARMINSTA_URL, SITE } from './site.js';

/* Narrative copy, kept out of components so it can be edited without touching
   layout logic. */

export const ARCHITECTURE = {
  core: { label: 'Products & Services', name: 'Farmreach Technologies' },
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
      cta: 'Explore Advisory',
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
    paragraph: 'Farmreach Technologies combines agricultural operating expertise, technology and transformation advisory to help governments and enterprises design, build and operate agricultural systems at scale.'
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
  { year: '2024\u20132025', title: 'Unified Marketing Engine', body: 'Farmer reach through SMS, WhatsApp, social and campaign management, with every touchpoint feeding one lead management system.', major: true },
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
    { title: 'Advisory capability', body: 'Transformation, process, digital, GTM and implementation advisory delivered by people who have operated what they design.' }
  ],
  careers: {
    title: 'Careers',
    body: 'Farmreach hires people who want the operating problem, not only the software problem: agronomists, field operators, engineers, data people and consultants. Roles are open across Hyderabad and the field geographies we operate in.'
  }
};

/* Experimental alternative to the compact Leadership section, evaluated
   alongside it on Our Story. Every fact here is drawn from the same approved
   leadership bios above \u2014 nothing has been added that isn't already sourced. */
export const EXECUTIVE_PROFILES = [
  {
    id: 'pradeep',
    name: 'Pradeep Raj Y',
    role: 'Founder & CEO',
    photo: '/assets/img/people/pradeep-raj-y-cut.png',
    headline: 'Agricultural value chains \u00b7 Agribusiness \u00b7 Go-to-market \u00b7 Integrated cropping solutions',
    linkedin: 'https://www.linkedin.com/in/pradeeprajy/',
    email: 'ypr@farmreach.in',
    story: [
      'Pradeep Raj Y is an agriculture and business transformation professional with experience across agricultural value chains, agribusiness, go-to-market strategy, integrated cropping solutions, technology-enabled operations and strategic advisory.',
      'His experience spans commercial agriculture, agricultural research and development, institutional programmes and technology-led business transformation, and consistently moves from strategy into execution.'
    ],
    modalRole: 'Founder & CEO, Farmreach Technologies Pvt. Ltd.',
    positioningLine: 'Agricultural Value Chains & Agribusiness | Go-to-Market & Business Transformation | Strategy to Execution',
    summary: 'Connects three areas usually treated separately: agricultural domain understanding, business and commercial strategy, and execution through people, processes and technology.',
    profile: [
      'Pradeep Raj Y is an agriculture and business transformation professional with extensive experience across agricultural value chains, agribusiness, go-to-market strategy, integrated cropping solutions, technology-enabled operations and strategic advisory.',
      'His experience spans commercial agriculture, agricultural research and development, institutional programmes and technology-led business transformation. He has worked across the intersection of agriculture, business strategy, field operations and technology, translating complex sector requirements into practical operating models, programmes and solutions.',
      'His work has involved domestic agribusinesses, agricultural research institutions, government bodies, international development organisations and global funding institutions, giving him exposure to both the commercial and development dimensions of agriculture.',
      'A defining aspect of his experience is the ability to move from strategy to execution \u2014 understanding the agricultural and business context, designing the operating model, coordinating stakeholders and resources, and taking programmes from concept and pilot through implementation and scale.'
    ],
    credentials: [
      'Extensive experience across agriculture, agribusiness, value chains, go-to-market strategy and business transformation',
      'Instrumental in scaling TEGRA Integrated Cropping Solutions from approximately 500 to 50,000 acres',
      'Experience across 35+ value-chain research and livelihood projects',
      'Engagement involving 600+ public and private partners',
      'Experience across India and international assignments spanning Asia, Africa, Europe and the Middle East',
      'Worked with organisations and programmes involving ICRISAT, IFPRI, ICAR, USAID, Cornell, CIAT, HarvestPlus and other institutional partners'
    ],
    expertise: ['Agricultural value chains', 'Agribusiness', 'Go-to-market strategy', 'Integrated cropping solutions', 'New business development', 'Channel strategy', 'Business transformation', 'Technology-enabled operations', 'Research programmes', 'Strategic advisory', 'Field operations', 'Stakeholder management'],
    sections: [
      {
        heading: 'Agricultural Value Chains & Agribusiness',
        meta: 'Production and market-facing sides of the value chain',
        body: [
          'Pradeep\u2019s experience covers agricultural value chains from both the production and market-facing sides, including agro-inputs, seeds, crop protection, food systems and integrated agricultural solutions.',
          'His work has involved understanding how products, services, information, supply chains, distribution networks and farmer engagement come together to create commercially viable agricultural models. Through his work with agribusiness organisations, he has worked on:'
        ],
        list: [
          'Agricultural input and seed businesses',
          'Crop protection and integrated cropping solutions',
          'Forward and backward agricultural value chains',
          'Farmer-facing products and services',
          'Agricultural supply and distribution models',
          'Channel strategy and stakeholder management',
          'New business development and commercial scale-up'
        ],
        after: ['This combination of domain knowledge and commercial experience allows him to approach agricultural businesses not simply as product businesses, but as interconnected operating systems involving farmers, channels, service providers, technology and value-chain partners.']
      },
      {
        heading: 'Integrated Cropping Solutions & New Business Development',
        meta: 'TEGRA \u00b7 Syngenta',
        body: [
          'One of the significant areas of Pradeep\u2019s experience has been the development and commercialisation of integrated agricultural solutions.',
          'At Syngenta, he was involved in TEGRA, an Integrated Cropping Solution for rice in South Asia that brought together seed, crop protection, mechanisation and agronomic services into an end-to-end proposition for farmers. He was instrumental in taking the initiative from pilot to commercial scale, expanding from approximately 500 acres to 50,000 acres across three states.',
          'The model brought together product, service and information while requiring coordination across production, supply, franchisee management, field operations and farmer engagement. His responsibilities included strategic alignment, resource planning, activity scheduling, quality and risk management, supply-chain processes, customer strategy, ICT automation, go-to-market strategy and development of the overall operating model.'
        ]
      },
      {
        heading: 'Go-to-Market Strategy & Commercial Transformation',
        meta: 'Channel models, demand generation and commercial execution',
        body: [
          'Pradeep has extensive experience in designing and implementing go-to-market models for agricultural businesses. His work has included developing new channel operating models, enabling business automation, demand-generation programmes, crop and asset campaigns and new processes required to transition organisations towards revised commercial models.',
          'The focus has been on making commercial operations more effective \u2014 improving operational efficiency, reducing cost-to-serve, strengthening channel experience and improving grower satisfaction.',
          'This experience combines strategic planning with practical commercial execution, including stakeholder management, resource planning, channel activation and cross-functional coordination.'
        ]
      },
      {
        heading: 'Agricultural Technology & Digital Enablement',
        meta: 'CRM, planning and supply-chain automation',
        body: [
          'Pradeep\u2019s experience also extends into the use of technology to strengthen agricultural business and operating models. His work on integrated agricultural solutions included supporting ICT automation streams covering CRM, planning and supply-chain processes.',
          'Rather than treating technology as a standalone intervention, his approach has been to connect technology with the underlying business process \u2014 identifying operational requirements, designing appropriate systems and using digital tools to improve visibility, coordination and execution.',
          'His broader competency includes ICT platforms for agribusiness, technology-supported research and commercialisation, business process improvement and technology-enabled operating models.'
        ]
      },
      {
        heading: 'Agricultural Research, Development & Institutional Programmes',
        meta: 'Sathguru \u00b7 ICAR, ICRISAT, IFPRI, CIAT, USAID and the Bill & Melinda Gates Foundation',
        body: [
          'Pradeep has worked extensively with agricultural research and development programmes involving national and international institutions. Through Sathguru Management Consultants, he supported programmes involving organisations including ICAR, ICRISAT, IFPRI, CIAT, USAID and the Bill & Melinda Gates Foundation.',
          'His work included supporting agricultural biotechnology programmes, seed delivery strategies, agricultural value-chain research, sustainable rural livelihood programmes and delivery systems for biofortified crops.',
          'For the National Agricultural Innovation Project, he was involved in conceptualising public-private partnership programmes around value-chain research and sustainable rural livelihoods. The work contributed to the creation of more than 35 value-chain research and livelihood projects involving more than 600 public and private partners, with a reported overall programme outlay of \u20b9650 crore.'
        ]
      },
      {
        heading: 'Strategic Advisory & Market Development',
        meta: 'Agricultural businesses, government bodies and research-led programmes',
        body: [
          'Pradeep\u2019s advisory experience covers agricultural businesses, government bodies and research-led programmes. His work has included market research, strategic recommendations, technology sourcing, partnership development, competency development and research commercialisation for companies in the seed, agrochemical and farm-management sectors.'
        ],
        cards: [
          { title: 'APEDA \u2014 assessment of the export potential of Indian ready-to-eat meals in the US and European markets.', meta: 'Market research \u00b7 Industry engagement in India, France and Germany' },
          { title: 'NIFTEM \u2014 contribution to enterprise-development strategy for the proposed National Institute of Food Technology and Entrepreneurship Management.', meta: 'Enterprise development \u00b7 Institutional programme design' },
          { title: 'FSSAI \u2014 involvement in developing regulatory approaches for licensing and registration of domestic food businesses.', meta: 'Regulation \u00b7 Licensing \u00b7 Registration' }
        ],
        after: ['These assignments provided exposure to policy, market development, regulation, industry strategy and institutional programme design.']
      },
      {
        heading: 'Agricultural Extension, Field Operations & Technology Dissemination',
        meta: 'Professional foundation \u00b7 ICAR-sponsored organisation',
        body: [
          'Pradeep\u2019s professional foundation was built through direct exposure to agriculture and field-level operations. His early work included farm management, agricultural extension programmes, preparation of learning materials and technology dissemination through an ICAR-sponsored organisation.',
          'He subsequently worked directly with agricultural businesses and farmers, including commercial crop programmes, varietal evaluation, technology promotion and field-level implementation.',
          'This field exposure has remained an important part of his approach to business and technology \u2014 understanding how strategies and solutions work in actual agricultural environments rather than only at a conceptual level.'
        ]
      },
      {
        heading: 'Cross-functional Programme Leadership',
        meta: 'Coordinating functions and stakeholder groups around a common objective',
        body: [
          'A recurring theme across Pradeep\u2019s work is the ability to coordinate different functions and stakeholder groups around a common programme objective. His experience includes strategy and business planning, resource planning, project governance, supply chains, commercial operations, research, technology, field execution and stakeholder management. He has worked with:'
        ],
        list: [
          'Agricultural enterprises and input companies',
          'Government and regulatory bodies',
          'ICAR and State Agricultural Universities',
          'CGIAR institutions including ICRISAT and IFPRI',
          'US land-grant universities including Cornell',
          'International development organisations',
          'Global funding organisations including USAID and the Bill & Melinda Gates Foundation',
          'Public and private research and implementation partners'
        ]
      },
      {
        heading: 'From Strategy to Execution',
        meta: 'How the work moves from idea to scale',
        body: ['Pradeep\u2019s experience has consistently involved taking agricultural and business ideas beyond strategy into implementation. His working approach can be represented as:'],
        flow: ['Understand the sector', 'Define the opportunity', 'Design the business model', 'Align stakeholders', 'Build the operating system', 'Execute in the field', 'Scale what works'],
        after: ['This has shaped his experience across integrated agricultural solutions, go-to-market transformation, research programmes, technology-enabled operations and agricultural value-chain initiatives.']
      }
    ],
    positioning: {
      heading: 'Executive Positioning',
      body: [
        'Pradeep\u2019s strength lies in connecting three areas that are often treated separately: agricultural domain understanding, business and commercial strategy, and execution through people, processes and technology.',
        'He brings experience from both sides of the agricultural ecosystem, working with commercial agribusinesses as well as research, government and development institutions.',
        'His perspective is therefore grounded in the practical realities of agriculture: how markets work, how channels operate, how farmers engage with products and services, how institutions collaborate, and how technology can be applied to make these systems more effective.',
        'At Farmreach, this experience informs the company\u2019s approach to agricultural operating systems, business transformation and advisory engagements, combining sector understanding with practical execution.'
      ]
    },
    education: 'M.Sc. Agriculture (Genetics & Plant Breeding) \u00b7 B.Sc. Agriculture \u00b7 Executive International Business Programme, IIM Calcutta \u00b7 Middle Management Programme, IIM Ahmedabad \u2014 with further training in intellectual property, project management and seed-industry development.'
  },
  {
    id: 'abila',
    name: 'Thangathtamilazhagie V',
    alias: 'Abila',
    role: 'Director & COO',
    photo: '/assets/img/people/abila-cut.png',
    headline: 'Agriculture \u00b7 Business operations \u00b7 Product \u00b7 Digital transformation \u00b7 Growth \u00b7 Marketing',
    linkedin: 'https://www.linkedin.com/in/thangathtamilazhagie/',
    email: 'abila@farmreach.in',
    story: [
      'Thangathtamilazhagie (Abila) V is an agriculture-domain business and digital transformation leader with 12+ years of professional and entrepreneurial experience across agriculture, business operations, product management, digital transformation, technology, growth and marketing.',
      'She joined Farmreach Technologies in February 2016, initially in client relationships, progressively expanding into product management, strategy and planning, digital transformation, operations and organisational leadership.'
    ],
    modalRole: 'Co-Founder & Director, Farmreach Technologies Pvt. Ltd.',
    positioningLine: 'Digital Transformation & Product Strategy | Agriculture & Rural Technology | Business & Growth',
    summary: 'Agriculture-domain leader translating business and field realities into practical, scalable digital products and driving technology adoption across agricultural organisations and rural operating environments.',
    profile: [
      'Thangathtamilazhagie (Abila) V is an agriculture-domain business and digital transformation leader with 12+ years of professional and entrepreneurial experience across agriculture, business operations, product management, digital transformation, technology, growth and marketing.',
      'Her work sits at the intersection of agriculture, business, operations, product and technology, with a particular focus on translating complex agricultural and field-level requirements into practical digital systems. Her experience combines an academic foundation in agriculture with extensive exposure to agricultural value chains, farmer-facing programmes, distributed field operations and technology-led business transformation.',
      'She joined Farmreach Technologies in February 2016, initially working in client relationships and progressively expanding into product management, strategy and planning, digital transformation, operations and organisational leadership. Over this journey, she has been closely involved in understanding business requirements, shaping product strategy, designing digital workflows, coordinating technology implementation and taking solutions into real-world operational use.',
      'Her core strength lies in connecting business understanding, agricultural domain knowledge, user needs, product strategy and technology. Rather than approaching transformation as technology deployment alone, she focuses on simplifying processes, creating useful digital workflows, improving visibility and ensuring that solutions are actually adopted by the people and organisations they are designed to serve.'
    ],
    credentials: [
      '12+ years across agriculture, business operations, product management, digital transformation and growth',
      'Co-Founder & Director, Farmreach Technologies, shaping Farminsta\u2019s product strategy since 2016',
      'Cross-functional leadership spanning product, technology, operations and business growth',
      'Extensive exposure to agricultural value chains, farmer programmes and distributed field operations',
      'Adoption-led approach translating field and business realities into practical digital systems'
    ],
    expertise: ['Agricultural value chains', 'Farmer engagement', 'Product strategy', 'Solution design', 'Digital transformation', 'Technology adoption', 'Data & analytics', 'Decision-support systems', 'Business growth', 'Digital marketing'],
    sections: [
      {
        heading: 'Agriculture Communication, Project Documentation & Rural Programme Exposure',
        meta: 'Early exposure \u00b7 Media4Agri',
        body: [
          'Abila\u2019s experience has developed through direct exposure to agricultural programmes and organisations and through the design and productisation of digital systems used in real operating environments. Her work has covered both the business and domain side of agriculture and the digital product layer that enables organisations to execute, monitor and improve those activities.',
          'Her early experience with Media4Agri exposed her to a range of agricultural and rural-development initiatives and project teams, spanning themes such as:'
        ],
        tags: ['Community irrigation and automated water management', 'Solar-powered agricultural irrigation', 'Honeybee stewardship and sustainable agriculture', 'Agricultural knowledge and digital learning', 'Farmer information and digital kiosk concepts', 'Rural development and farmer communication'],
        after: ['This experience provided an early understanding of agricultural programmes, field realities, farmer information needs and the relationship between agricultural interventions, technology and communication.']
      },
      {
        heading: 'Product Strategy & Digital Transformation at Farmreach Technologies',
        meta: 'Core experience \u00b7 Farmreach Technologies',
        body: ['Since joining Farmreach Technologies in 2016, Abila\u2019s responsibilities have progressively expanded from client and business engagement into product strategy, digital transformation, operations and organisational leadership. Her work has involved understanding agricultural business processes, identifying operational gaps, translating requirements into digital products, shaping product roadmaps, coordinating with technology teams and supporting the transition of solutions from concept to live operational use.'],
        flow: [],
        list: [
          'Product strategy and continuous evolution of Farminsta from a data-collection solution into a broader digital platform supporting workflows, operational visibility, business intelligence and agricultural management.',
          'Digital solutions for field-extension activities, work allocation, activity monitoring, field visits, performance tracking and management visibility.',
          'Digital farmer services, field-assist workflows, farmer engagement, digital outreach and technology-enabled communication.',
          'Digital product strategy for production management, farmer/plot-level information, operational workflows, production monitoring and contract-related processes.',
          'Digital traceability and technology-enabled workflows connecting agricultural inputs and seed movement through the value chain, including exploration and application of emerging technologies such as blockchain-based traceability.',
          'Digitisation of distributed agricultural operations, supply-chain processes, field activities and management workflows.',
          'Product strategy for structured field data capture, operational reporting, management dashboards, analytics and decision-support capabilities.',
          'Product evolution towards spatially enabled agricultural systems, including field-level mapping, spatial analytics and location-based decision support.',
          'Digital workflows supporting field visits, farmer interactions, service delivery, information capture and follow-up.'
        ]
      },
      {
        heading: 'Institutional & Collaborative Programme Exposure',
        meta: 'Collaborative programmes \u00b7 ICRISAT and institutional partners',
        body: ['Through Farmreach\u2019s work with agricultural organisations and collaborative programmes, Abila has contributed to the product strategy and digital transformation components of initiatives spanning nutrition, agricultural value chains, farmer organisations, supply chains, field operations, data collection, traceability and programme monitoring.'],
        cards: [
          { title: 'Product and digital transformation exposure within agricultural nutrition programmes involving ICRISAT and institutional partners.', meta: 'Programme workflows \u00b7 Data capture \u00b7 Beneficiary information \u00b7 Traceability \u00b7 Monitoring \u00b7 Reporting \u00b7 Analytics \u00b7 Digital visibility' },
          { title: 'Exposure to digital transformation initiatives supporting farmer producer organisations, agricultural value chains and market-linked operations.', meta: 'Farmer data \u00b7 Production information \u00b7 Supply-chain workflows \u00b7 Traceability \u00b7 Market linkage \u00b7 Operational monitoring \u00b7 Analytics' },
          { title: 'Exposure to digital components associated with agricultural supply-chain and processing initiatives involving institutional and Government stakeholders.', meta: 'FPO operations \u00b7 Farmer data \u00b7 Processing-centre workflows \u00b7 Supply-chain information \u00b7 Data capture \u00b7 Traceability \u00b7 Management reporting' }
        ]
      }
    ],
    twoCol: [
      { heading: 'The Product Strategist Approach', body: [
        'Her approach begins with understanding agriculture, field operations, stakeholders, workflows and business realities, then identifying the operational gaps, manual processes, information gaps and decision bottlenecks that technology needs to address.',
        'From there, she translates business requirements into product vision, workflows, modules and user journeys, and works with technology teams to shape the platform, applications, data flows and integrations needed to support them.',
        'The final step is taking the solution into real operational environments and supporting user adoption, then using operational feedback, data and analytics to continuously improve the product.'
      ] },
      { heading: 'From Product Strategy to Real-World Adoption', body: [
        'A defining feature of Abila\u2019s experience is that her product strategy has not remained at the conceptual level. She has been involved in taking digital solutions from business requirement and product strategy through development, launch and real-world adoption.',
        'This practical exposure has shaped an adoption-led product philosophy: technology must fit operational realities, simplify work and create visible value for users and management.'
      ] }
    ],
    positioning: {
      heading: 'Executive Positioning',
      body: 'Abila\u2019s strength lies in bridging three worlds that are often separated in technology programmes: agriculture & domain understanding, business & operational requirements, and product & technology execution. Her leadership philosophy is simple: understand the business first, build the technology around the user, measure adoption, and continuously improve.'
    },
    education: 'B.Sc. Agriculture, Tamil Nadu Agricultural University \u00b7 EPGBM (Executive Programme in Global Business Management), IIM Calcutta \u2014 an academic foundation supporting her long-term work in agriculture and rural technology.'
  }
];

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
    eyebrow: 'Advisory engagements',
    title: 'Where we engage',
    body: [
      'Farmreach works with agricultural organisations at different stages of transformation \u2014 from understanding current operations and identifying priorities to designing practical operating models and supporting implementation.',
      'Four engagement types, each with a defined scope, clear priorities and practical outputs.'
    ]
  },
  audience: {
    eyebrow: 'Who we work with',
    title: 'Public, private and the wider agricultural ecosystem'
  },
  why: {
    eyebrow: 'Why Farmreach',
    title: 'Advisory grounded in operating experience',
    body: "Farmreach's advisory approach comes from operating agricultural systems, not only studying them. Since 2016, the team has worked across field operations, farmer systems, production, value chains, government programmes, channel management and digital outreach \u2014 experience that informs how transformation programmes are designed and implemented."
  },
  bridge: {
    eyebrow: 'Advisory and the operating systems',
    title: 'From transformation strategy to operating capability',
    body: 'Advisory can stand alone or lead into technology implementation. Where appropriate, Farmreach can translate the transformation roadmap into Farmreach OS for public enterprise or Farminsta OS for private enterprise.'
  }
};
