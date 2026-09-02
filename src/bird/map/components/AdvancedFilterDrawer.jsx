import React, { useEffect, useState } from 'react';
import { CloseIcon } from '../../icons.jsx';
import { ACTIVITY_TYPES } from '../config.js';

/* V1 foundation only: two real facets (status, activity type) plus a
   disabled preview row naming what arrives later, so the drawer's shape —
   list of facets, Apply / Clear All, active count — doesn't need to change
   when District/Mandal/Village/Crop/etc. are added; only this array grows. */
const UPCOMING_FACETS = ['District', 'Mandal / Block', 'Village', 'Crop', 'Farmer Segment', 'Customer Type'];

export default function AdvancedFilterDrawer({ open, onClose, value, onApply, onClearAll }) {
  const [status, setStatus] = useState(value.status);
  const [activityTypes, setActivityTypes] = useState(value.activityTypes);

  useEffect(() => {
    if (open) { setStatus(value.status); setActivityTypes(value.activityTypes); }
  }, [open, value]);

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    return () => document.body.classList.remove('is-locked');
  }, [open]);

  const toggleType = (key) => {
    setActivityTypes((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <>
      <div className="bird-drawer__backdrop" data-open={open} aria-hidden="true" onClick={onClose} />
      <div className="bird-advfilters" data-open={open} role="dialog" aria-modal="true" aria-label="Filters">
        <div className="bird-advfilters__head">
          <h2>Filters</h2>
          <button type="button" className="bird-drawer__close" onClick={onClose}>
            <CloseIcon />
            <span className="vh">Close filters</span>
          </button>
        </div>

        <div className="bird-advfilters__body">
          <section className="bird-advfilters__group">
            <h3>User Status</h3>
            <div className="bird-advfilters__chips">
              {['all', 'online', 'offline'].map((s) => (
                <button
                  key={s}
                  type="button"
                  className="bird-chip"
                  data-active={status === s}
                  onClick={() => setStatus(s)}
                >
                  {s === 'all' ? 'All' : s === 'online' ? 'Online' : 'Offline'}
                </button>
              ))}
            </div>
          </section>

          <section className="bird-advfilters__group">
            <h3>Activity Type</h3>
            <div className="bird-advfilters__chips">
              {ACTIVITY_TYPES.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  className="bird-chip"
                  data-active={activityTypes.includes(t.key)}
                  onClick={() => toggleType(t.key)}
                >
                  <span className="bird-chip__dot" style={{ background: t.color }} aria-hidden="true" />
                  {t.label}
                </button>
              ))}
            </div>
          </section>

          <section className="bird-advfilters__group bird-advfilters__group--upcoming">
            <h3>More filters, coming progressively</h3>
            <div className="bird-advfilters__chips">
              {UPCOMING_FACETS.map((f) => (
                <span key={f} className="bird-chip bird-chip--disabled">{f}</span>
              ))}
            </div>
          </section>
        </div>

        <div className="bird-advfilters__foot">
          <button
            type="button"
            className="textlink"
            onClick={() => { setStatus('all'); setActivityTypes(ACTIVITY_TYPES.map((t) => t.key)); onClearAll(); }}
          >
            Clear All
          </button>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => onApply({ status, activityTypes })}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
