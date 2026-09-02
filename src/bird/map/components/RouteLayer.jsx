import React from 'react';

/* Only draws when the selected user carries real recorded breadcrumb
   points (mockData.js sets `routePoints` on two demo users specifically to
   exercise this). When it's absent this renders nothing — activity points
   still show on their own via ActivityMarker, which is the honest
   representation when no GPS trail exists; it never connects them into a
   fabricated path. */
export default function RouteLayer({ RL, user }) {
  if (!user.routePoints || user.routePoints.length < 2) return null;

  return (
    <RL.Polyline
      positions={user.routePoints}
      pathOptions={{ color: '#0E6FA8', weight: 3, opacity: 0.55, dashArray: '1 7', lineCap: 'round' }}
      interactive={false}
    />
  );
}
