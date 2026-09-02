import React from 'react';
import ThemeToggle from '../../components/ThemeToggle.jsx';
import PageTabs from './PageTabs.jsx';
import { MenuIcon } from '../icons.jsx';

/* One header for every BIRD page. Supports title-only, title + sub-tabs, and
   leaves room for page-level actions later — pass `actions` and render them
   where the comment marks the slot. Nothing here is page-specific. */
export default function AppHeader({ title, tabs, activeTabKey, onSelectTab, onOpenMenu, actions }) {
  return (
    <header className="bird-header">
      <div className="bird-header__row">
        <button type="button" className="bird-header__menu" onClick={onOpenMenu}>
          <MenuIcon />
          <span className="vh">Open menu</span>
        </button>
        <h1 className="bird-header__title">{title}</h1>
        <div className="bird-header__actions">
          {actions}
          <ThemeToggle />
        </div>
      </div>
      <PageTabs tabs={tabs} activeKey={activeTabKey} onSelect={onSelectTab} />
    </header>
  );
}
