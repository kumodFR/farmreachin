import React from 'react';
import { CloseIcon } from '../../icons.jsx';
import { activityTypeByKey } from '../config.js';
import { formatDateTime } from '../format.js';

/* Kept compact per the brief — type, user, when, where, a one-line summary,
   and a placeholder action for the detail view that doesn't exist yet. */
export default function ActivityDetailPanel({ activity, user, onClose, onSelectUser }) {
  const type = activityTypeByKey(activity.type);

  return (
    <div className="bird-panel bird-panel--activity" role="dialog" aria-label="Activity details">
      <button type="button" className="bird-panel__close" onClick={onClose}>
        <CloseIcon />
        <span className="vh">Close</span>
      </button>

      <div className="bird-panel__activityHead">
        <span className="bird-panel__typeDot" style={{ background: type.color }} aria-hidden="true" />
        <p className="bird-panel__typeLabel">{type.label}</p>
      </div>

      <p className="bird-panel__summary">{activity.summary}</p>

      <dl className="bird-panel__meta-list">
        <div>
          <dt>User</dt>
          <dd>
            {user ? (
              <button type="button" className="textlink" onClick={onSelectUser}>{user.name}</button>
            ) : '—'}
          </dd>
        </div>
        <div>
          <dt>Date / Time</dt>
          <dd>{formatDateTime(activity.timestamp)}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{activity.location.label}, {activity.state}</dd>
        </div>
        <div>
          <dt>Product</dt>
          <dd>{activity.product}</dd>
        </div>
      </dl>

      <button type="button" className="btn btn--secondary bird-panel__viewDetails" disabled title="Detailed activity records arrive in a later BIRD release">
        View Details
      </button>
    </div>
  );
}
