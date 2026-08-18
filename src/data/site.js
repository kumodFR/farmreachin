/* Site-wide configuration. The Farminsta destination is set in ONE place:
   here, overridable at build time with VITE_FARMINSTA_URL. */

const env = (typeof import.meta !== 'undefined' && import.meta.env) || {};

export const FARMINSTA_URL = env.VITE_FARMINSTA_URL || 'https://farminsta.com';

export const SITE = {
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
