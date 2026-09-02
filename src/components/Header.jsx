import React, { useEffect, useRef, useState } from 'react';
import { NAV } from '../data/navigation.js';
import { SITE } from '../data/site.js';
import { Link, ExternalMark, useRouter } from '../router.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function Header() {
  const { path } = useRouter();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const toggleRef = useRef(null);

  /* Closing has to un-inert the page before focus can return to the toggle. */
  const closeAndRestore = () => {
    document.querySelectorAll('.site-header, main, .site-footer')
      .forEach((el) => el.removeAttribute('inert'));
    setOpen(false);
    if (toggleRef.current) toggleRef.current.focus();
  };

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    return () => document.body.classList.remove('is-locked');
  }, [open]);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    /* The drawer is inert while closed, so opacity alone can hide it and the
       panel is always focusable the instant it opens. The rest of the page is
       made inert while it is open, which is what actually contains focus. */
    const behind = document.querySelectorAll('.site-header, main, .site-footer');
    if (open) {
      drawer.removeAttribute('inert');
      behind.forEach((el) => el.setAttribute('inert', ''));
    } else {
      drawer.setAttribute('inert', '');
      behind.forEach((el) => el.removeAttribute('inert'));
    }

    if (!open) return;

    const focusFirst = () => {
      const first = drawer.querySelector('a[href], button:not([disabled])');
      if (first && !drawer.contains(document.activeElement)) first.focus();
    };

    /* Two frames plus a task, so the focus call cannot land before the style
       recalc that reveals the panel. */
    const raf = requestAnimationFrame(() => requestAnimationFrame(focusFirst));
    const timer = window.setTimeout(focusFirst, 60);

    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeAndRestore();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = drawer.querySelectorAll('a[href], button:not([disabled])');
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (!drawer.contains(document.activeElement)) { e.preventDefault(); firstEl.focus(); return; }
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
    };

    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const navItem = (item, className) => (
    <Link
      key={item.label}
      to={item.href}
      external={item.external}
      className={className}
      aria-current={!item.external && path === item.href ? 'page' : undefined}
      onClick={() => setOpen(false)}
    >
      {item.external ? (
        <span className="nav__ext">{item.label} <ExternalMark /></span>
      ) : item.label}
    </Link>
  );

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="logo" aria-label={`${SITE.name} — home`}>
            <img className="logo-img logo-img--ink" src="/assets/img/farmreach-logo.png" alt={SITE.name} width="151" height="42" fetchpriority="high" />
            <img className="logo-img logo-img--mono" src="/assets/img/farmreach-logo-mono.png" alt="" aria-hidden="true" width="151" height="42" />
          </Link>

          <nav className="nav" aria-label="Primary">
            {NAV.map((item) => navItem(item, 'nav__link'))}
          </nav>

          <div className="header-actions">
            <Link to="/contact" className="nav__cta">Talk to us</Link>
            <Link to="/login" className="nav__cta">BIRD</Link>
            <ThemeToggle />
              <button
              ref={toggleRef}
              className="nav-toggle"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span />
              <span className="vh">Menu</span>
            </button>
          </div>
        </div>
      </header>

      <div
        className="drawer"
        id="mobile-nav"
        ref={drawerRef}
        data-open={open}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Primary"
      >
        <div className="drawer__top">
          <Link to="/" className="logo" onClick={() => setOpen(false)} aria-label={`${SITE.name} — home`}>
            <img className="logo-img logo-img--ink" src="/assets/img/farmreach-logo.png" alt={SITE.name} width="115" height="32" />
            <img className="logo-img logo-img--mono" src="/assets/img/farmreach-logo-mono.png" alt="" aria-hidden="true" width="115" height="32" />
          </Link>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded="true"
            aria-controls="mobile-nav"
            onClick={closeAndRestore}
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <span style={{ transform: 'translateY(3.25px) rotate(45deg)' }} />
            <span style={{ transform: 'translateY(-3.25px) rotate(-45deg)' }} />
            <span className="vh">Close menu</span>
          </button>
        </div>

        <nav className="drawer__list" aria-label="Primary mobile">
          {NAV.map((item) => navItem(item, ''))}
        </nav>

        <div className="drawer__actions">
          <Link to="/contact" className="btn btn--primary drawer__cta" onClick={() => setOpen(false)}>
            Talk to us <span className="btn__arrow" aria-hidden="true">&rarr;</span>
          </Link>
          <Link to="/login" className="btn btn--primary drawer__cta" onClick={() => setOpen(false)}>
            BIRD <span className="btn__arrow" aria-hidden="true">&rarr;</span>
          </Link>
          <ThemeToggle />
        </div>
        <p className="drawer__meta">{SITE.positioning}</p>
      </div>
    </>
  );
}
