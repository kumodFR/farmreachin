import React from 'react';

/* Only two views exist today; the segmented control itself is generic
   enough that Coverage/Sales/Farmer Engagement/etc. slot in later as more
   options rather than a rewrite. */
const VIEWS = [
  { key: 'live', label: 'Live View' },
  { key: 'historical', label: 'Historical View' }
];

export default function MapViewSelector({ value, onChange }) {
  return (
    <div className="bird-viewswitch" role="tablist" aria-label="Map view">
      {VIEWS.map((v) => (
        <button
          key={v.key}
          type="button"
          role="tab"
          className="bird-viewswitch__item"
          data-active={value === v.key}
          aria-selected={value === v.key}
          onClick={() => onChange(v.key)}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
