import React, { useEffect, useRef, useState } from 'react';
import { LayersIcon, CheckIcon } from '../../icons.jsx';

/* Layers answer "what do I see" — deliberately separate from Filters
   ("which data do I analyse"). Config-driven so a future layer (Heatmap,
   Coverage, …) is one more entry here, not a new control. */
const LAYER_ITEMS = [
  { key: 'users', label: 'Users' },
  { key: 'activities', label: 'Activities' },
  { key: 'routes', label: 'Routes' },
  { key: 'boundaries', label: 'State Boundaries' },
  { key: 'radius', label: 'Radius' }
];

export default function LayerControl({ value, onToggle }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <div className="bird-filter bird-layerctl" ref={ref}>
      <button type="button" className="bird-filter__btn bird-filter__btn--icon" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <LayersIcon className="bird-filter__icon" />
        <span className="bird-filter__value">Layers</span>
      </button>
      {open ? (
        <div className="bird-filter__panel bird-layerctl__panel" role="group" aria-label="Map layers">
          <p className="bird-layerctl__title">Map View</p>
          <ul className="bird-layerctl__list">
            {LAYER_ITEMS.map((item) => (
              <li key={item.key}>
                <button type="button" className="bird-layerctl__row" onClick={() => onToggle(item.key)}>
                  <span className="bird-checkbox" data-checked={value[item.key]}>
                    {value[item.key] ? <CheckIcon /> : null}
                  </span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
