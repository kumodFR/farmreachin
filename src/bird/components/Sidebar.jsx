import React, { useEffect, useState } from 'react';
import { Link, useRouter } from '../../router.jsx';
import { BIRD_NAV } from '../nav.js';
import { NavIcon, CollapseIcon, ProfileIcon, LogoutIcon } from '../icons.jsx';
import { getSession, logout } from '../auth.js';

/* The brand mark is a plain styled span, not an image — it renders correctly
   in both themes with zero asset requests and stays crisp at any size. The
   PWA manifest icons (which must be real image files) are separate assets;
   this mark is purely for the in-app chrome. */
export function SidebarHeader({ collapsed, onToggleCollapse }) {
  return (
    <div className="bird-sb__head">
      <Link to="/bird" className="bird-sb__brand" aria-label="BIRD home">
        <span className="bird-sb__mark" aria-hidden="true">B</span>
        {!collapsed && (
          <span className="bird-sb__wordmark">
            BIRD
            <span className="bird-sb__tagline">Farminsta Map BI</span>
          </span>
        )}
      </Link>
      <button
        type="button"
        className="bird-sb__collapse"
        onClick={onToggleCollapse}
        aria-pressed={collapsed}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <CollapseIcon />
        <span className="vh">{collapsed ? 'Expand sidebar' : 'Collapse sidebar'}</span>
      </button>
    </div>
  );
}

export function SidebarNavigation({ collapsed, activeKey, onNavigate }) {
  return (
    <nav className="bird-sb__nav" aria-label="BIRD">
      <ul>
        {BIRD_NAV.map((item) => {
          const isActive = item.key === activeKey;
          const isSoon = item.status === 'coming-soon';
          return (
            <li key={item.key}>
              <Link
                to={item.route}
                className="bird-sb__link"
                data-active={isActive}
                data-tooltip={collapsed ? item.label : undefined}
                aria-current={isActive ? 'page' : undefined}
                onClick={onNavigate}
              >
                <NavIcon name={item.icon} className="bird-sb__icon" />
                {!collapsed && (
                  <span className="bird-sb__label">
                    {item.label}
                    {isSoon && <span className="bird-sb__soon">Soon</span>}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function SidebarFooter({ collapsed }) {
  const { navigate, path } = useRouter();
  /* Starts null on both server and the first client render (no localStorage
     on the server) to avoid a hydration mismatch; the effect fills it in
     right after mount. */
  const [session, setSession] = useState(null);
  useEffect(() => { setSession(getSession()); }, []);

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bird-sb__foot">
      <Link
        to="/bird/profile"
        className="bird-sb__link bird-sb__profile"
        data-active={path === '/bird/profile'}
        aria-current={path === '/bird/profile' ? 'page' : undefined}
        data-tooltip={collapsed ? 'Profile' : undefined}
      >
        <ProfileIcon className="bird-sb__icon" />
        {!collapsed && <span className="bird-sb__label">{session?.name || 'Profile'}</span>}
      </Link>
      <button
        type="button"
        className="bird-sb__link bird-sb__logout"
        onClick={onLogout}
        data-tooltip={collapsed ? 'Logout' : undefined}
      >
        <LogoutIcon className="bird-sb__icon" />
        {!collapsed && <span className="bird-sb__label">Logout</span>}
      </button>
    </div>
  );
}

export default function Sidebar({ collapsed, onToggleCollapse, activeKey }) {
  return (
    <aside className="bird-sb" data-collapsed={collapsed} aria-label="BIRD navigation">
      <SidebarHeader collapsed={collapsed} onToggleCollapse={onToggleCollapse} />
      <SidebarNavigation collapsed={collapsed} activeKey={activeKey} />
      <SidebarFooter collapsed={collapsed} />
    </aside>
  );
}
