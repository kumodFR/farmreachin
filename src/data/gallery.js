/* Gallery content. Photographs and captions live here so they can be added or
   replaced without touching the presentation component.

   To publish a photograph: set `src` (a file in public/assets/img/gallery/),
   `year`, `caption`, `description`, `category` and `alt`. Optional flags:
   `wide` (full-row tile), `contain` (fit rather than crop), `focus`
   (object-position for the crop). Entries are sorted newest year first at
   render time, so a new photograph can be appended anywhere in this list. */

export const GALLERY = {
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
      src: '/assets/img/gallery/albaugh-pt-indonesia-farminsta-launch.jpg',
      alt: 'The Albaugh PT Indonesia team at the Farminsta launch, holding up the app on their phones',
      wide: true
    },
    {
      id: 'hysea-2020',
      year: '2020',
      caption: 'HYSEA 10X Product Awards',
      category: 'Recognition',
      src: '/assets/img/recognition/hysea-10x-2020.jpg',
      alt: 'Farmreach Technologies receiving the HYSEA 10X Product Awards recognition on stage',
      wide: true
    },
    {
      id: 'et-champions-2023',
      year: '2023',
      caption: 'The Economic Times Champions of Rural Markets, Mumbai',
      category: 'Recognition',
      src: '/assets/img/recognition/et-champions-rural-markets.jpg',
      alt: 'Farmreach Technologies receiving The Economic Times Champions of Rural Markets recognition on stage in Mumbai'
    },
    {
      id: 'advanta-2018',
      year: '2018',
      caption: 'Advanta Field Crop Team \u2014 Farminsta Launch',
      category: 'Partnerships',
      src: '/assets/img/gallery/advanta-field-crop-team-2018.jpg',
      alt: 'The Advanta field crop team gathered at the Farminsta launch',
      wide: true
    },
    {
      id: 'advanta-vegetable-2018',
      year: '2018',
      caption: 'Advanta Vegetable Crop Team \u2014 Farminsta Launch, Maharashtra',
      category: 'Partnerships',
      src: '/assets/img/gallery/advanta-vegetable-crop-team-2018.jpg',
      alt: 'The Advanta vegetable crop team gathered at the Farminsta launch in Maharashtra'
    },
    {
      id: 'advanta-jaani-2018',
      year: '2018',
      caption: 'Advanta Vegetable Crop Team \u2014 Jaani Campaign, Tamil Nadu',
      category: 'Partnerships',
      src: '/assets/img/gallery/advanta-jaani-campaign-2018.jpg',
      alt: 'The Advanta vegetable crop team with Jaani campaign material in Tamil Nadu'
    },
    {
      id: 'icrisat-walmart-2019',
      year: '2019',
      caption: 'ICRISAT \u00d7 Walmart Foundation \u2014 Anantha Samruddhi Programme',
      category: 'Partnerships',
      src: '/assets/img/gallery/icrisat-walmart-anantha-samruddhi-2019.jpg',
      alt: 'Project inauguration of the ICRISAT and Walmart Foundation Anantha Samruddhi programme, with farmers seated before the dais'
    },
    {
      id: 'nrsc-geospatial',
      year: '2023',
      caption: 'Geospatial Technology in Agriculture \u2014 NRSC, Hyderabad',
      description: 'Early exposure to the application of geospatial analysis and remote sensing technologies in agriculture, at NRSC, Hyderabad.',
      category: 'Technology & Products',
      src: '/assets/img/gallery/nrsc-geospatial-workshop.jpg',
      alt: 'A speaker addressing the workshop on emerging geospatial technology innovations at the NRSC campus in Hyderabad',
      focus: 'center 42%'
    },
    {
      id: 'icrisat-nutri-basket-2017',
      year: '2017',
      caption: 'ICRISAT \u2014 Nutri Basket Programme',
      description: 'Digitising nutrition measurement for enriched millet-based food distribution through Anganwadi centres in Andhra Pradesh.',
      category: 'Partnerships',
      src: '/assets/img/gallery/icrisat-nutri-basket-2017.jpg',
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
      src: '/assets/img/gallery/vegetable-value-chain-2017.jpg',
      alt: 'Farmreach staff inspecting graded cabbage crates in a vegetable primary processing area',
      wide: true
    },
    {
      id: 'upl-farminsta-2022',
      year: '2022',
      caption: 'UPL \u2014 Farminsta Launch',
      category: 'Partnerships',
      src: '/assets/img/gallery/upl-farminsta-launch-2022.jpg',
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
      src: '/assets/img/gallery/farmer-app-launch-2023.jpg',
      alt: 'A Farminsta team member being interviewed at the farmer app launch stand, with two colleagues and the Farminsta banner behind'
    },
    {
      id: 'drone-spraying-2025',
      year: '2025',
      caption: 'Digital Drone Spraying Services \u2014 Farmer Access',
      description: 'Digitising drone spraying services to connect farmers with efficient, technology-enabled crop protection solutions.',
      category: 'Technology & Products',
      src: '/assets/img/gallery/drone-spraying-services-2025.jpg',
      alt: 'A spraying drone on a bund between paddy fields, with farmers and mixing containers behind it',
      focus: 'center 46%'
    },
    {
      id: 'advanta-veg-team-field-force-2017',
      year: '2017',
      caption: 'Field Force Automation Launch \u2014 Advanta Veg Team',
      category: 'Customer',
      src: '/assets/img/gallery/advanta-veg-team-field-force-2017.jpg',
      alt: 'The Advanta vegetable team gathered indoors for a group photograph at the field force automation launch'
    },
    {
      id: 'syngenta-corn-seed-production-2017',
      year: '2017',
      caption: 'Corn Seed Production Management System \u2014 Syngenta',
      category: 'Customer',
      src: '/assets/img/gallery/syngenta-corn-seed-production-2017.jpg',
      alt: 'Four colleagues reviewing the corn seed production management system on a mobile phone at the roadside in a village'
    },
    {
      id: 'syngenta-philippines-corn-seed-2018',
      year: '2018',
      caption: 'Corn Seed Production Management Launch \u2014 Syngenta Philippines',
      category: 'Customer',
      src: '/assets/img/gallery/syngenta-philippines-corn-seed-2018.jpg',
      alt: 'Two field staff checking the corn seed production management app on a phone beside a standing corn crop in the Philippines',
      wide: true
    },
    {
      id: 'prasad-seeds-philippines-2018',
      year: '2018',
      caption: 'Seed Production Management \u2014 Prasad Seeds, Philippines',
      category: 'Customer',
      src: '/assets/img/gallery/prasad-seeds-philippines-2018.jpg',
      alt: 'A field team seated around a table working through the seed production management app on their phones during a training session'
    },
    {
      id: 'anantha-samruddhi-processing-automation-2019',
      year: '2019',
      caption: 'Primary Processing Centre Automation \u2014 Anantha Samruddhi',
      category: 'Partnerships',
      src: '/assets/img/gallery/anantha-samruddhi-processing-automation-2019.jpg',
      alt: 'Operators running a grading and cleaning line at a primary processing centre, with produce moving along the conveyor'
    },
    {
      id: 'hysea-innovation-summit-2019',
      year: '2019',
      caption: 'HYSEA Innovation Summit \u2014 Pitch',
      category: 'Recognition',
      src: '/assets/img/gallery/hysea-innovation-summit-2019.jpg',
      alt: 'Presenting from the Mentor Lounge stage at the 27th Annual HYSEA Innovation Summit in Hyderabad',
      wide: true
    },
    {
      id: 'farmer-livelihood-survey-ananthapur-2019',
      year: '2019',
      caption: 'Farmer Livelihood Impact Survey \u2014 Ananthapur',
      category: 'Partnerships',
      src: '/assets/img/gallery/farmer-livelihood-survey-ananthapur-2019.jpg',
      alt: 'A field surveyor recording a farmer\u2019s responses on a mobile phone while seated with her outside a home in Ananthapur',
      wide: true,
      contain: true
    },
    {
      id: 'extension-worker-training-2020',
      year: '2020',
      caption: 'Extension Worker Training \u2014 Field Activity Digitisation',
      category: 'Partnerships',
      src: '/assets/img/gallery/extension-worker-training-2020.jpg',
      alt: 'A full hall of extension workers following a projected demonstration and working through the field activity app on their own phones',
      wide: true
    },
    {
      id: 'anantha-samruddhi-market-linkage-2020',
      year: '2020',
      caption: 'Primary Processing & Market Linkage \u2014 Anantha Samruddhi',
      category: 'Partnerships',
      src: '/assets/img/gallery/anantha-samruddhi-market-linkage-2020.jpg',
      alt: 'A grading and cleaning line at the primary processing centre, with sacks of graded produce ready for market linkage',
      wide: true
    }
  ],
  closing: {
    title: 'Part of the journey',
    body: "Farmreach's work is shaped by the people, organisations and agricultural communities we work with."
  }
};
