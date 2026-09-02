import React, { useEffect, useState } from 'react';
import AppShell from '../bird/components/AppShell.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import { getSession } from '../bird/auth.js';

export const meta = {
  path: '/bird/settings',
  title: 'Settings — BIRD',
  description: 'BIRD account and appearance settings.'
};

/* The only settings that are real in v1 are the account email (read-only,
   from the session) and the theme toggle (already fully functional — reused
   from the marketing site, not reimplemented). Everything else is an honest
   "coming soon" rather than a control that looks live but does nothing. */
export default function BirdSettings() {
  const [session, setSession] = useState(null);
  useEffect(() => { setSession(getSession()); }, []);

  return (
    <AppShell title="Settings">
      <section className="bird-settings">
        <div className="bird-settings__group">
          <h2 className="bird-settings__label">Account</h2>
          <div className="bird-settings__row">
            <span>Email</span>
            <span className="bird-settings__value">{session?.email || '—'}</span>
          </div>
        </div>

        <div className="bird-settings__group">
          <h2 className="bird-settings__label">Appearance</h2>
          <div className="bird-settings__row">
            <span>Theme</span>
            <ThemeToggle />
          </div>
        </div>

        <div className="bird-soon bird-soon--inline">
          <h2 className="bird-soon__heading">More settings</h2>
          <p className="bird-soon__desc">Notification, workspace and data preferences are being introduced progressively.</p>
          <span className="bird-soon__badge">Coming Soon</span>
        </div>
      </section>
    </AppShell>
  );
}
