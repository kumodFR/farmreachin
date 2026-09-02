import React from 'react';

/* Sits over a fully-rendered map (country context, boundaries) rather than
   replacing it — the point is to explain an empty result, not to make the
   screen look broken. */
export default function EmptyState({ message }) {
  if (!message) return null;
  return (
    <div className="bird-map__empty">
      <p>{message}</p>
    </div>
  );
}
