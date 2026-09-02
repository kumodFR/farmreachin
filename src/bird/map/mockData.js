/* BIRD Map BI — LOCAL DEVELOPMENT MOCK DATA ONLY.

   Nothing in this file is read by any component directly. dataSource.js is
   the only consumer, and it is the single place a real API integration
   replaces this module. Do not import this file from a component.

   City coordinates are real (approximate town centres); the people,
   companies, teams and activities are fictional. India is used here only
   because it is this file's hard-coded development fixture — see
   dataSource.js and config.js for why the application itself never
   hard-codes a country. */

function mulberry32(seed) {
  let a = seed;
  return function random() {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260209);
const jitter = (deg) => (rand() - 0.5) * 2 * deg;

/* Real town centres, used as user "home/base" anchors. */
const CITIES = [
  { city: 'Hyderabad', state: 'Telangana', lat: 17.385, lng: 78.4867 },
  { city: 'Warangal', state: 'Telangana', lat: 17.9689, lng: 79.5941 },
  { city: 'Vijayawada', state: 'Andhra Pradesh', lat: 16.5062, lng: 80.648 },
  { city: 'Guntur', state: 'Andhra Pradesh', lat: 16.3067, lng: 80.4365 },
  { city: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
  { city: 'Hubballi', state: 'Karnataka', lat: 15.3647, lng: 75.124 },
  { city: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  { city: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lng: 79.0882 },
  { city: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lng: 76.9558 },
  { city: 'Ludhiana', state: 'Punjab', lat: 30.901, lng: 75.8573 },
  { city: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lng: 75.8577 },
  { city: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
  { city: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
  { city: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462 }
];

const TEAMS = ['South Zone', 'West Zone', 'North Zone', 'Central Zone'];
const PRODUCTS = ['TEGRA Rice', 'Cotton Solutions', 'Vegetable Seeds', 'Crop Nutrition', 'Farminsta OS'];
const FIRST_NAMES = ['Rajesh', 'Priya', 'Suresh', 'Anita', 'Vikram', 'Lakshmi', 'Arjun', 'Deepa', 'Manoj', 'Kavya', 'Ravi', 'Sneha', 'Karthik', 'Meena'];
const LAST_NAMES = ['Kumar', 'Reddy', 'Sharma', 'Patel', 'Nair', 'Rao', 'Singh', 'Iyer', 'Gowda', 'Verma'];

function initials(name) {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
}

const USER_COUNT = 14;
export const MOCK_USERS = CITIES.slice(0, USER_COUNT).map((base, i) => {
  const name = `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[(i * 3) % LAST_NAMES.length]}`;
  const online = i % 3 !== 0; // ~two-thirds online, a believable live mix
  const lastActiveMinsAgo = online ? Math.floor(rand() * 40) : 60 + Math.floor(rand() * 600);
  return {
    id: `u${i + 1}`,
    name,
    initials: initials(name),
    /* No real photo assets are bundled for mock users — every mock user
       exercises the initials-avatar fallback path deliberately, since a
       production user photo would come from the company's own directory,
       not a placeholder image service. */
    photoUrl: null,
    team: TEAMS[i % TEAMS.length],
    market: `${base.city} Market`,
    product: PRODUCTS[i % PRODUCTS.length],
    status: online ? 'online' : 'offline',
    lastActiveAt: new Date(Date.now() - lastActiveMinsAgo * 60000).toISOString(),
    home: { lat: base.lat + jitter(0.06), lng: base.lng + jitter(0.06), label: base.city, state: base.state },
    /* Only two users carry real breadcrumb sequences, on purpose — routes
       must never be inferred from activity points alone (see RouteLayer). */
    routePoints: i === 0 || i === 4
      ? Array.from({ length: 6 }, (_, s) => [
          base.lat + jitter(0.05) + s * 0.004,
          base.lng + jitter(0.05) + s * 0.006
        ])
      : null
  };
});

const ACTIVITY_TYPE_KEYS = ['farmer_visit', 'survey', 'product_demo', 'purchase', 'commitment', 'other'];
const ACTIVITY_SUMMARIES = {
  farmer_visit: 'Field visit and crop condition check',
  survey: 'Farm input survey completed',
  product_demo: 'Product demonstration conducted',
  purchase: 'Input purchase recorded',
  commitment: 'Sowing-season commitment logged',
  other: 'Field note submitted'
};

/* Spread across the last 7 days so every date preset has something real to
   show; today itself gets the most activity, matching a live-view default. */
function buildActivities() {
  const activities = [];
  let seq = 1;
  MOCK_USERS.forEach((user) => {
    for (let day = 0; day < 7; day++) {
      const countToday = day === 0 ? 2 + Math.floor(rand() * 5) : Math.floor(rand() * 4);
      for (let n = 0; n < countToday; n++) {
        const type = ACTIVITY_TYPE_KEYS[Math.floor(rand() * ACTIVITY_TYPE_KEYS.length)];
        const when = new Date();
        when.setDate(when.getDate() - day);
        when.setHours(8 + Math.floor(rand() * 10), Math.floor(rand() * 60), 0, 0);
        activities.push({
          id: `a${seq++}`,
          userId: user.id,
          type,
          timestamp: when.toISOString(),
          location: {
            lat: user.home.lat + jitter(0.35),
            lng: user.home.lng + jitter(0.35),
            label: user.home.label
          },
          state: user.home.state,
          team: user.team,
          product: user.product,
          summary: ACTIVITY_SUMMARIES[type]
        });
      }
    }
  });
  return activities;
}

export const MOCK_ACTIVITIES = buildActivities();

export const MOCK_COMPANY_CONTEXT = {
  countryCode: 'IN',
  countryName: 'India',
  /* Real extent of the boundary data in /public/data/india-states.geojson —
     computed from that file, not eyeballed. */
  bounds: [[6.7, 68.0], [37.1, 97.4]]
};
