/* BIRD Map BI — data source seam.

   Every component in bird/map talks to THIS module only, never to
   mockData.js directly. Right now every export resolves from the mock
   fixture because no backend exists yet (see the BIRD v1 shell notes).
   When a real API exists, replace the bodies below with fetch() calls —
   the function signatures and return shapes are already what a real
   integration would need, and nothing outside this file has to change.

   In particular: getCompanyCountry() is the one function that decides which
   country's data loads. It is intentionally the only place "India" appears
   as a fallback, and only as a local-dev default — see the comment on it. */

import { INDIA_STATES, ACTIVITY_TYPES } from './config.js';
import { MOCK_USERS, MOCK_ACTIVITIES, MOCK_COMPANY_CONTEXT } from './mockData.js';

const USE_MOCK = true; // flips to false the day a real map-data API exists

function assertMock(name) {
  if (!USE_MOCK) {
    throw new Error(`${name}(): no production BIRD map API is configured yet.`);
  }
}

/* Resolves the geography the map should open on for the current session.
   PRODUCTION: call the authenticated company's profile/config API (e.g.
   GET /api/company/context) and use whatever country it returns — do not
   assume India. India here is strictly the local-development fallback used
   when no such API is wired up, matching the brief's "India as default
   test country, never hard-coded into production logic". */
export async function getCompanyCountry() {
  assertMock('getCompanyCountry');
  return MOCK_COMPANY_CONTEXT;
}

export async function getFilterVocabulary() {
  assertMock('getFilterVocabulary');
  const teams = [...new Set(MOCK_USERS.map((u) => u.team))].sort();
  const products = [...new Set(MOCK_USERS.map((u) => u.product))].sort();
  return { states: INDIA_STATES, teams, products, activityTypes: ACTIVITY_TYPES };
}

function startOfDay(d) { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
function endOfDay(d) { const x = new Date(d); x.setHours(23, 59, 59, 999); return x; }
function startOfWeek(d) { const x = startOfDay(d); const day = x.getDay(); x.setDate(x.getDate() - day); return x; }

/* Resolves a date preset (or custom range) to a concrete [start, end]
   window. Exported so the toolbar's active-label logic and the data layer
   never compute this independently and drift apart. */
export function resolveDateRange(datePreset, customRange) {
  const now = new Date();
  switch (datePreset) {
    case 'today': return [startOfDay(now), endOfDay(now)];
    case 'yesterday': {
      const y = new Date(now); y.setDate(y.getDate() - 1);
      return [startOfDay(y), endOfDay(y)];
    }
    case 'this_week': return [startOfWeek(now), endOfDay(now)];
    case 'last_week': {
      const w = startOfWeek(now); w.setDate(w.getDate() - 7);
      const wEnd = new Date(w); wEnd.setDate(wEnd.getDate() + 6);
      return [w, endOfDay(wEnd)];
    }
    case 'this_month': {
      const m = new Date(now.getFullYear(), now.getMonth(), 1);
      return [m, endOfDay(now)];
    }
    case 'last_month': {
      const m = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const mEnd = new Date(now.getFullYear(), now.getMonth(), 0);
      return [m, endOfDay(mEnd)];
    }
    case 'custom':
      if (customRange?.from && customRange?.to) {
        return [startOfDay(new Date(customRange.from)), endOfDay(new Date(customRange.to))];
      }
      return [startOfDay(now), endOfDay(now)];
    default: return [startOfDay(now), endOfDay(now)];
  }
}

/* Live View data: users reflect who is relevant right now (state/team/
   product only — "who is on the ground" is not a date question); activities
   are narrowed by the resolved date window as well. */
export async function getLiveViewData(filters) {
  assertMock('getLiveViewData');
  const { state, team, product, datePreset, dateRange } = filters;
  const [start, end] = resolveDateRange(datePreset, dateRange);

  const users = MOCK_USERS.filter((u) =>
    (state === 'all' || u.home.state === state) &&
    (team === 'all' || u.team === team) &&
    (product === 'all' || u.product === product)
  );
  const userIds = new Set(users.map((u) => u.id));

  const activities = MOCK_ACTIVITIES.filter((a) => {
    const t = new Date(a.timestamp).getTime();
    return userIds.has(a.userId) && t >= start.getTime() && t <= end.getTime();
  });

  return { users, activities };
}
