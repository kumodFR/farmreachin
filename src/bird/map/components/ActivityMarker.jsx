import React, { useMemo } from 'react';
import { activityTypeByKey } from '../config.js';

/* Deliberately much smaller and quieter than UserMarker — "user = photo,
   activity = small data point" is the whole visual contract here. Colour
   comes from config.ACTIVITY_TYPES, never hard-coded per marker, so a new
   activity type only ever needs a config entry. */
function buildIcon(L, activity, { selected, dimmed }) {
  const type = activityTypeByKey(activity.type);
  const size = selected ? 16 : 10;
  const html = `<span class="bird-actpin${selected ? ' is-selected' : ''}${dimmed ? ' is-dimmed' : ''}" style="background:${type.color}"></span>`;
  return L.divIcon({
    html,
    className: 'bird-actpin-wrap',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
}

export default function ActivityMarker({ RL, L, activity, selected, dimmed, onSelect }) {
  const icon = useMemo(
    () => buildIcon(L, activity, { selected, dimmed }),
    [L, activity, selected, dimmed]
  );

  return (
    <RL.Marker
      position={[activity.location.lat, activity.location.lng]}
      icon={icon}
      zIndexOffset={selected ? 900 : 100}
      eventHandlers={{ click: () => onSelect() }}
    />
  );
}
