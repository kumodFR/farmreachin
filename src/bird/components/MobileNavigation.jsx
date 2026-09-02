import React, { useEffect, useRef, useState } from 'react';
import { Link, useRouter } from '../../router.jsx';
import { BIRD_NAV } from '../nav.js';
import { NavIcon, ProfileIcon, LogoutIcon, CloseIcon } from '../icons.jsx';
import { getSession, logout } from '../auth.js';

/* Mirrors the marketing site's mobile drawer pattern (Header.jsx): the rest
   of the page goes inert while open, focus is trapped inside, Escape closes
   it. Kept as its own component (rather than folded into AppHeader) so it
   can be reused if BIRD ever needs a second entry point into the drawer. */
export default function MobileNavigation({ open, onClose, activeKey }) {
  const { navigate, path } = useRouter();
  const drawerRef = useRef(null);
  /* Starts null on both server and the first client render (no localStorage
     on the server) to avoid a hydration mismatch; filled in after mount. */
  const [session, setSession] = useState(null);
  useEffect(() => { setSession(getSession()); }, []);

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    return () => document.body.classList.remove('is-locked');
  }, [open]);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    const behind = document.querySelectorAll('.bird-shell__topbar, .bird-shell__main');
    if (open) {
      drawer.removeAttribute('inert');
      behind.forEach((el) => el.setAttribute('inert', ''));
    } else {
      drawer.setAttribute('inert', '');
      behind.forEach((el) => el.removeAttribute('inert'));
      return;
    }

    const focusFirst = () => {
      const first = drawer.querySelector('a[href], button:not([disabled])');
      if (first && !drawer.contains(document.activeElement)) first.focus();
    };
    const raf = requestAnimationFrame(() => requestAnimationFrame(focusFirst));

    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
      const items = drawer.querySelectorAll('a[href], button:not([disabled])');
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!drawer.contains(document.activeElement)) { e.preventDefault(); first.focus(); return; }
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const onLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  return (
    <>
      <div className="bird-drawer__backdrop" data-open={open} aria-hidden="true" onClick={onClose} />
      <div
        className="bird-drawer"
        ref={drawerRef}
        data-open={open}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="BIRD navigation"
      >
      <div className="bird-drawer__top">
        <span className="bird-sb__brand">
          <span className="bird-sb__mark" aria-hidden="true">B</span>
          <span className="bird-sb__wordmark">BIRD</span>
        </span>
        <button type="button" className="bird-drawer__close" onClick={onClose}>
          <CloseIcon />
          <span className="vh">Close menu</span>
        </button>
      </div>

      <nav className="bird-drawer__nav" aria-label="BIRD">
        <ul>
          {BIRD_NAV.map((item) => (
            <li key={item.key}>
              <Link
                to={item.route}
                className="bird-sb__link"
                data-active={item.key === activeKey}
                aria-current={item.key === activeKey ? 'page' : undefined}
                onClick={onClose}
              >
                <NavIcon name={item.icon} className="bird-sb__icon" />
                <span className="bird-sb__label">
                  {item.label}
                  {item.status === 'coming-soon' && <span className="bird-sb__soon">Soon</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bird-drawer__foot">
        <Link
          to="/bird/profile"
          className="bird-sb__link"
          data-active={path === '/bird/profile'}
          aria-current={path === '/bird/profile' ? 'page' : undefined}
          onClick={onClose}
        >
          <ProfileIcon className="bird-sb__icon" />
          <span className="bird-sb__label">{session?.name || 'Profile'}</span>
        </Link>
        <button type="button" className="bird-sb__link bird-sb__logout" onClick={onLogout}>
          <LogoutIcon className="bird-sb__icon" />
          <span className="bird-sb__label">Logout</span>
        </button>
      </div>
      </div>
    </>
  );
}
