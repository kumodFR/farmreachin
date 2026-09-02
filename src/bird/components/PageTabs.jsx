import React from 'react';

/* Reusable sub-tab row for AppHeader. No BIRD page needs this yet (Map's
   Overview/Farmers/Crops/Products split arrives with the real Map module),
   but the header is built to carry it now so a future page only passes
   `tabs` — no header changes required. */
export default function PageTabs({ tabs, activeKey, onSelect }) {
  if (!tabs || !tabs.length) return null;
  return (
    <div className="bird-tabs" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          role="tab"
          className="bird-tabs__item"
          data-active={tab.key === activeKey}
          aria-selected={tab.key === activeKey}
          onClick={() => onSelect && onSelect(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
