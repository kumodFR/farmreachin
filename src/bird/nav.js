/* Centralised BIRD navigation. Every nav-aware surface — the desktop
   sidebar, the mobile drawer, and (later) breadcrumbs or a command palette —
   reads this one list. Adding a module later means adding one entry here,
   not editing three components. */

export const BIRD_NAV = [
  { key: 'home', label: 'Home', route: '/bird', icon: 'home', status: 'available' },
  { key: 'map', label: 'Map', route: '/bird/map', icon: 'map', status: 'available' },
  { key: 'analytics', label: 'Analytics', route: '/bird/analytics', icon: 'analytics', status: 'coming-soon' },
  { key: 'reports', label: 'Reports', route: '/bird/reports', icon: 'reports', status: 'coming-soon' },
  { key: 'settings', label: 'Settings', route: '/bird/settings', icon: 'settings', status: 'coming-soon' }
];

/* Longest-prefix match so /bird/map/anything (a future sub-route) still
   highlights "Map" rather than falling through to nothing. Home is the
   exception: its route ("/bird") is a prefix of every other BIRD path,
   including /bird/profile, which lives in the sidebar footer rather than
   this nav list — so Home only matches its own exact path. */
export function activeNavKey(path) {
  const clean = (path || '/').replace(/\/+$/, '') || '/';
  let best = null;
  for (const item of BIRD_NAV) {
    const matches = item.route === '/bird'
      ? clean === item.route
      : clean === item.route || clean.startsWith(item.route + '/');
    if (matches && (!best || item.route.length > best.route.length)) best = item;
  }
  return best ? best.key : null;
}
