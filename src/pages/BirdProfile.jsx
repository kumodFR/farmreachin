import React, { useEffect, useState } from 'react';
import { useRouter } from '../router.jsx';
import AppShell from '../bird/components/AppShell.jsx';
import { ProfileIcon } from '../bird/icons.jsx';
import { getSession, logout } from '../bird/auth.js';

export const meta = {
  path: '/bird/profile',
  title: 'Profile — BIRD',
  description: 'BIRD account profile.'
};

export default function BirdProfile() {
  const { navigate } = useRouter();
  const [session, setSession] = useState(null);
  useEffect(() => { setSession(getSession()); }, []);

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppShell title="Profile">
      <section className="bird-profile">
        <div className="bird-profile__avatar" aria-hidden="true">
          <ProfileIcon />
        </div>
        <div className="bird-profile__info">
          <p className="bird-profile__name">{session?.name || 'Signed-in user'}</p>
          <p className="bird-profile__email">{session?.email || '—'}</p>
        </div>
        <button type="button" className="btn btn--secondary" onClick={onLogout}>
          Logout
        </button>
      </section>
    </AppShell>
  );
}
