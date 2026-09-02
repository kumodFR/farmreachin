import React, { useEffect, useState } from 'react';
import BoundaryLayer from './BoundaryLayer.jsx';
import UserMarker from './UserMarker.jsx';
import ActivityMarker from './ActivityMarker.jsx';
import RadiusOverlay from './RadiusOverlay.jsx';
import RouteLayer from './RouteLayer.jsx';

/* Leaflet touches `window`/`document` as soon as its module evaluates, which
   crashes under Node during prerender — this route is server-rendered like
   every other page (see App.jsx's route table). So leaflet/react-leaflet
   are never imported at module scope anywhere in bird/map; they are loaded
   here, once, inside an effect, and handed down as `RL`/`L` to every layer
   component below instead of each one importing react-leaflet itself.

   Server render and the client's first render both see `RL === null` and
   render the same loading state, so there is no hydration mismatch — the
   real map mounts only after that client-only effect resolves. */
function FitBounds({ RL, bounds }) {
  const map = RL.useMap();
  useEffect(() => {
    if (bounds) map.fitBounds(bounds, { padding: [24, 24] });
  }, [map, bounds]);
  return null;
}

export default function MapCanvas({
  bounds,
  users,
  activities,
  layers,
  selection,
  onSelectUser,
  onSelectActivity,
  onBackgroundClick,
  radiusKm,
  boundaryData,
  activeState,
  isDark
}) {
  const [RL, setRL] = useState(null);
  const [L, setL] = useState(null);

  useEffect(() => {
    let alive = true;
    Promise.all([import('leaflet'), import('react-leaflet')]).then(([leafletMod, reactLeafletMod]) => {
      if (!alive) return;
      setL(leafletMod.default || leafletMod);
      setRL(reactLeafletMod);
    });
    return () => { alive = false; };
  }, []);

  if (!RL || !L) {
    return (
      <div className="bird-map__loading">
        <span className="bird-map__loadingDot" aria-hidden="true" />
        Loading map…
      </div>
    );
  }

  const selectedUser = selection?.type === 'user' ? users.find((u) => u.id === selection.id) : null;

  return (
    <RL.MapContainer
      className={`bird-map__leaflet${isDark ? ' bird-map__leaflet--dark' : ''}`}
      style={{ height: '100%', width: '100%' }}
      center={[22.5, 82]}
      zoom={5}
      minZoom={4}
      maxZoom={17}
      zoomControl={false}
      attributionControl
      worldCopyJump
    >
      <InvalidateOnResize RL={RL} />
      <RL.TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
        maxZoom={19}
      />
      <RL.ZoomControl position="bottomright" />
      <FitBounds RL={RL} bounds={bounds} />

      {layers.boundaries && boundaryData ? (
        <BoundaryLayer RL={RL} data={boundaryData} activeState={activeState} isDark={isDark} />
      ) : null}

      {layers.activities
        ? activities.map((activity) => (
            <ActivityMarker
              key={activity.id}
              RL={RL}
              L={L}
              activity={activity}
              dimmed={Boolean(selectedUser) && activity.userId !== selectedUser.id}
              selected={selection?.type === 'activity' && selection.id === activity.id}
              onSelect={() => onSelectActivity(activity.id)}
            />
          ))
        : null}

      {layers.users
        ? users.map((user) => (
            <UserMarker
              key={user.id}
              RL={RL}
              L={L}
              user={user}
              dimmed={Boolean(selectedUser) && user.id !== selectedUser.id}
              selected={selection?.type === 'user' && selection.id === user.id}
              onSelect={() => onSelectUser(user.id)}
            />
          ))
        : null}

      {selectedUser && layers.radius ? (
        <RadiusOverlay RL={RL} L={L} user={selectedUser} radiusKm={radiusKm} />
      ) : null}

      {selectedUser && layers.routes ? <RouteLayer RL={RL} user={selectedUser} /> : null}

      {onBackgroundClick ? <BackgroundClickCatcher RL={RL} onClick={onBackgroundClick} /> : null}
    </RL.MapContainer>
  );
}

/* Clicking open water / anywhere that isn't a marker clears the selection —
   without this the only way to deselect is the panel's own close button. */
function BackgroundClickCatcher({ RL, onClick }) {
  RL.useMapEvent('click', onClick);
  return null;
}

/* The map sits in a flex layout whose size changes with the sidebar
   collapsing, a panel opening, or the window resizing — none of which fire
   a 'resize' event Leaflet listens for on its own. A ResizeObserver on the
   map's own container catches every case in one place. */
function InvalidateOnResize({ RL }) {
  const map = RL.useMap();
  useEffect(() => {
    const container = map.getContainer();
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(container);
    return () => observer.disconnect();
  }, [map]);
  return null;
}
