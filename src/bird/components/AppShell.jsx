import React, { useEffect, useState } from 'react';
import { useRouter } from '../../router.jsx';
import Sidebar from './Sidebar.jsx';
import MobileNavigation from './MobileNavigation.jsx';
import AppHeader from './AppHeader.jsx';
import { BIRD_NAV, activeNavKey } from '../nav.js';

const COLLAPSE_KEY = 'bird-sidebar-collapsed';

function readCollapsed() {
  if (typeof window === 'undefined') return false;
  try {
    const stored = window.localStorage.getItem(COLLAPSE_KEY);
    if (stored === '1') return true;
    if (stored === '0') return false;
  } catch {
    /* storage unavailable — fall through to the viewport default */
  }
  /* No explicit preference yet: tablet widths default to the compact
     (icon-only) sidebar rather than the fully expanded desktop one. */
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

/* The persistent application shell: sidebar + header stay mounted across
   BIRD navigation, only the page content underneath changes. `title`/`tabs`
   let each page describe its own header without owning the header markup. */
export default function AppShell({ title, tabs, activeTabKey, onSelectTab, actions, children }) {
  const { path } = useRouter();
  const activeKey = activeNavKey(path);
  const pageTitle = title || BIRD_NAV.find((n) => n.key === activeKey)?.label || 'BIRD';

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setCollapsed(readCollapsed()); }, []);
  /* Close the mobile drawer automatically on any route change. */
  useEffect(() => { setMobileOpen(false); }, [path]);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try { window.localStorage.setItem(COLLAPSE_KEY, next ? '1' : '0'); } catch { /* ignore */ }
      return next;
    });
  };

  return (
    <div className="bird-shell" data-collapsed={collapsed}>
      <div className="bird-shell__topbar">
        <Sidebar collapsed={collapsed} onToggleCollapse={toggleCollapsed} activeKey={activeKey} />
      </div>

      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} activeKey={activeKey} />

      <div className="bird-shell__main">
        <AppHeader
          title={pageTitle}
          tabs={tabs}
          activeTabKey={activeTabKey}
          onSelectTab={onSelectTab}
          actions={actions}
          onOpenMenu={() => setMobileOpen(true)}
        />
        <main className="bird-shell__content" id="bird-main">
          {children}
        </main>
      </div>
    </div>
  );
}
