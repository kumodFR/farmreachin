/* BIRD Map BI — static reference configuration.
   Two different things live here and must not be confused:
     1. Real, stable reference data (India's current 36 states/UTs) — this
        is not "mock data", it is the same list a production build would
        use, just declared locally instead of fetched.
     2. The activity-type taxonomy — genuinely a placeholder shape. It is
        written as a plain array specifically so it can be replaced by an
        API response later without touching any component that reads it. */

/* Matches the `name` property in /public/data/india-states.geojson exactly
   — both are derived from the same current (2019-reorganisation) state list,
   so the geography filter and the boundary layer never disagree. */
export const INDIA_STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
  'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',
  'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

/* Placeholder taxonomy — the shape a future `/api/config/activity-types`
   response should match. `color` resolves against the map's own palette
   below, not against page CSS, since markers render on a Leaflet canvas. */
export const ACTIVITY_TYPES = [
  { key: 'farmer_visit', label: 'Farmer Visit', color: '#016F3B' },
  { key: 'survey', label: 'Survey', color: '#0E6FA8' },
  { key: 'product_demo', label: 'Product Demo', color: '#9B6B14' },
  { key: 'purchase', label: 'Purchase', color: '#7A3FA0' },
  { key: 'commitment', label: 'Commitment', color: '#B0463C' },
  { key: 'other', label: 'Other', color: '#5C6561' }
];

export function activityTypeByKey(key) {
  return ACTIVITY_TYPES.find((t) => t.key === key) || ACTIVITY_TYPES[ACTIVITY_TYPES.length - 1];
}

export const RADIUS_PRESETS_KM = [1, 5, 10, 25, 50, 100];

export const DATE_PRESETS = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'this_week', label: 'This Week' },
  { key: 'last_week', label: 'Last Week' },
  { key: 'this_month', label: 'This Month' },
  { key: 'last_month', label: 'Last Month' },
  { key: 'custom', label: 'Custom Range' }
];
