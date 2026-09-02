import React from 'react';
import AppShell from './AppShell.jsx';

/* One component behind every not-yet-built module. A real empty state, not
   a blank screen: a heading, one sentence of context, and a clear status —
   no fake charts, no disabled-looking broken controls. */
export default function ComingSoonPage({ navTitle, heading, description, icon }) {
  return (
    <AppShell title={navTitle}>
      <div className="bird-soon">
        {icon}
        <h2 className="bird-soon__heading">{heading}</h2>
        <p className="bird-soon__desc">{description}</p>
        <span className="bird-soon__badge">Coming Soon</span>
        <p className="bird-soon__note">This module is being prepared for the next BIRD release.</p>
      </div>
    </AppShell>
  );
}
