import React from 'react';

/* Deliberately two numbers, not a dashboard row — this sits ON the map and
   must stay secondary to it. Both figures already reflect whatever the
   active filters narrowed down to, since they're passed the same filtered
   users/activities MapCanvas renders. */
export default function MapKpiSummary({ dateLabel, onlineCount, activityCount }) {
  return (
    <div className="bird-kpi">
      <p className="bird-kpi__eyebrow">{dateLabel}</p>
      <div className="bird-kpi__row">
        <div className="bird-kpi__item">
          <p className="bird-kpi__num">{onlineCount}</p>
          <p className="bird-kpi__label">Online Users</p>
        </div>
        <div className="bird-kpi__item">
          <p className="bird-kpi__num">{activityCount}</p>
          <p className="bird-kpi__label">Activities</p>
        </div>
      </div>
    </div>
  );
}
