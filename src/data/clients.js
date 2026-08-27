/* Clients and partners shown on the homepage.

   `logo` is optional. A cell with a logo renders the mark; a cell without one
   renders the organisation's name set in the site's own type. That keeps the
   grid complete and honest while marks are still being collected — the same
   approach the recognition data takes for entries awaiting confirmation.

   Only add a logo sourced from the organisation's own site or brand pack, at a
   size that stays sharp on a 2x display. Do not substitute an aggregator copy.
   `alt` names the organisation, since the mark carries no other label. */

export const CLIENTS = {
  eyebrow: 'Clients & Partners',
  title: 'Organisations we have worked with',
  body: 'Farmreach has worked with agricultural, seed, crop protection, food and rural-sector organisations across India and international markets.',
  items: [
    { name: 'Advanta Enterprises Limited' },
    { name: 'Crystal Crop Protection Limited', logo: '/assets/img/clients/crystal-crop.png' },
    { name: 'DCM Shriram Limited' },
    { name: 'H.M.Clause India Pvt. Ltd.' },
    { name: 'Mahindra Agri Solutions', logo: '/assets/img/clients/mahindra-agri.png' },
    { name: 'Mahindra HZPC Private Limited' },
    { name: 'Paryan Alliance Pvt. Limited' },
    { name: 'PT Albaugh Agro Indonesia', logo: '/assets/img/clients/albaugh.svg' },
    { name: 'Savannah Seeds Private Limited' },
    { name: 'Star Agrifarm Solutions Private Limited' },
    { name: 'Aditya Agri Tech Private Limited' },
    { name: 'Genomix Agri Genetics Private Limited' },
    { name: 'Kaveri Seeds Company Limited' }
  ]
};
