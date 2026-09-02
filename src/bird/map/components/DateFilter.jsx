import React, { useEffect, useRef, useState } from 'react';
import { CalendarIcon, ChevronDownIcon } from '../../icons.jsx';
import { DATE_PRESETS } from '../config.js';

export default function DateFilter({ datePreset, dateRange, onChange }) {
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState(dateRange?.from || '');
  const [to, setTo] = useState(dateRange?.to || '');
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const activeLabel = DATE_PRESETS.find((p) => p.key === datePreset)?.label || 'Today';

  return (
    <div className="bird-filter" ref={ref}>
      <button type="button" className="bird-filter__btn" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <CalendarIcon className="bird-filter__icon" />
        <span className="bird-filter__value">{activeLabel}</span>
        <ChevronDownIcon className="bird-filter__chev" />
      </button>
      {open ? (
        <div className="bird-filter__panel" role="listbox" aria-label="Date">
          <ul className="bird-filter__list">
            {DATE_PRESETS.filter((p) => p.key !== 'custom').map((p) => (
              <li key={p.key}>
                <button
                  type="button"
                  data-active={datePreset === p.key}
                  onClick={() => { onChange(p.key, null); setOpen(false); }}
                >
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="bird-filter__custom">
            <p className="bird-filter__customLabel">Custom Range</p>
            <div className="bird-filter__customRow">
              <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From date" />
              <span>–</span>
              <input type="date" value={to} onChange={(e) => setTo(e.target.value)} aria-label="To date" />
            </div>
            <button
              type="button"
              className="btn btn--secondary bird-filter__customApply"
              disabled={!from || !to}
              onClick={() => { onChange('custom', { from, to }); setOpen(false); }}
            >
              Apply Range
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
