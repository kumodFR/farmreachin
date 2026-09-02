import React, { useMemo } from 'react';

/* A floating avatar, not a map pin: divIcon renders plain HTML so the
   marker is styled entirely from bird-map.css using the same tokens as the
   rest of the app — no separate marker "theme". */
function buildIcon(L, user, { selected, dimmed }) {
  const size = selected ? 52 : 42;
  const inner = user.photoUrl
    ? `<img src="${user.photoUrl}" alt="" />`
    : `<span>${user.initials}</span>`;
  const html = `
    <div class="bird-userpin${selected ? ' is-selected' : ''}${dimmed ? ' is-dimmed' : ''} is-${user.status}">
      <span class="bird-userpin__avatar">${inner}</span>
      <span class="bird-userpin__status" aria-hidden="true"></span>
    </div>`;
  return L.divIcon({
    html,
    className: 'bird-userpin-wrap',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
}

export default function UserMarker({ RL, L, user, selected, dimmed, onSelect }) {
  const icon = useMemo(
    () => buildIcon(L, user, { selected, dimmed }),
    [L, user, selected, dimmed]
  );

  return (
    <RL.Marker
      position={[user.home.lat, user.home.lng]}
      icon={icon}
      zIndexOffset={selected ? 1000 : 400}
      eventHandlers={{ click: () => onSelect() }}
    />
  );
}
