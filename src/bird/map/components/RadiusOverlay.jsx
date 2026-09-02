import React from 'react';

/* Never a permanent element — MapCanvas only mounts this when a user is
   both selected and the Radius layer is on, and it unmounts the instant
   either condition stops holding. */
export default function RadiusOverlay({ RL, user, radiusKm }) {
  return (
    <RL.Circle
      center={[user.home.lat, user.home.lng]}
      radius={radiusKm * 1000}
      pathOptions={{
        color: '#016F3B',
        weight: 1.5,
        dashArray: '5 5',
        fillColor: '#016F3B',
        fillOpacity: 0.07
      }}
      interactive={false}
    />
  );
}
