import React, { useState } from 'react';
import { CloseIcon, TargetIcon, RouteIcon, ActivityPulseIcon } from '../../icons.jsx';
import { RADIUS_PRESETS_KM } from '../config.js';
import { formatTime } from '../format.js';

/* Floats over the map rather than navigating away from it — closing it
   just clears selection, the map underneath never changes route. */
export default function UserDetailPanel({
  user,
  todayCount,
  todayTypeLabels,
  onClose,
  onFocusActivity,
  radiusOn,
  radiusKm,
  onSetRadius,
  routesOn,
  onToggleRoutes
}) {
  const [radiusPickerOpen, setRadiusPickerOpen] = useState(false);
  const hasRoute = Boolean(user.routePoints && user.routePoints.length > 1);

  return (
    <div className="bird-panel bird-panel--user" role="dialog" aria-label={`${user.name} details`}>
      <button type="button" className="bird-panel__close" onClick={onClose}>
        <CloseIcon />
        <span className="vh">Close</span>
      </button>

      <div className="bird-panel__head">
        <span className={`bird-panel__avatar is-${user.status}`}>
          {user.photoUrl ? <img src={user.photoUrl} alt="" /> : <span>{user.initials}</span>}
        </span>
        <div>
          <p className="bird-panel__name">{user.name}</p>
          <p className="bird-panel__meta">{user.team}</p>
          <p className="bird-panel__meta bird-panel__meta--sub">{user.home.label}, {user.home.state}</p>
        </div>
      </div>

      <div className="bird-panel__stats">
        <div>
          <p className="bird-panel__num">{todayCount}</p>
          <p className="bird-panel__statLabel">Activities Today</p>
        </div>
        <div>
          <p className="bird-panel__num bird-panel__num--time">{formatTime(user.lastActiveAt)}</p>
          <p className="bird-panel__statLabel">{user.status === 'online' ? 'Active now' : 'Last active'}</p>
        </div>
      </div>

      {todayTypeLabels.length ? (
        <p className="bird-panel__types">{todayTypeLabels.join(' · ')}</p>
      ) : null}

      <div className="bird-panel__actions">
        <button type="button" className="btn btn--secondary bird-panel__actionBtn" onClick={onFocusActivity} disabled={todayCount === 0}>
          <ActivityPulseIcon /> Show Activity
        </button>
        <button
          type="button"
          className="btn btn--secondary bird-panel__actionBtn"
          data-active={radiusOn}
          onClick={() => setRadiusPickerOpen((v) => !v)}
        >
          <TargetIcon /> Radius
        </button>
        <button
          type="button"
          className="btn btn--secondary bird-panel__actionBtn"
          data-active={routesOn}
          onClick={onToggleRoutes}
          disabled={!hasRoute}
          title={hasRoute ? undefined : 'No route data available for this user'}
        >
          <RouteIcon /> {hasRoute ? 'Show Route' : 'No Route Data'}
        </button>
      </div>

      {radiusPickerOpen ? (
        <div className="bird-panel__radiusPicker">
          {RADIUS_PRESETS_KM.map((km) => (
            <button
              key={km}
              type="button"
              className="bird-chip"
              data-active={radiusOn && radiusKm === km}
              onClick={() => onSetRadius(radiusOn && radiusKm === km ? null : km)}
            >
              {km} km
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
