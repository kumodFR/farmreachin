import React, { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, SearchIcon } from '../../icons.jsx';

/* Shared popover behind GeographyFilter/TeamMarketFilter/ProductFilter —
   all three are "pick one from a list, default All X" and would otherwise
   be three copies of the same open/close/search/outside-click logic. */
export default function FilterSelect({ label, value, options, onChange, allLabel, searchable }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
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

  const filtered = searchable && query
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options;
  const displayValue = value === 'all' ? allLabel : value;

  return (
    <div className="bird-filter" ref={ref}>
      <button
        type="button"
        className="bird-filter__btn"
        data-active={value !== 'all'}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="bird-filter__label">{label}</span>
        <span className="bird-filter__value">{displayValue}</span>
        <ChevronDownIcon className="bird-filter__chev" />
      </button>
      {open ? (
        <div className="bird-filter__panel" role="listbox" aria-label={label}>
          {searchable ? (
            <div className="bird-filter__search">
              <SearchIcon />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${label.toLowerCase()}`}
              />
            </div>
          ) : null}
          <ul className="bird-filter__list">
            <li>
              <button
                type="button"
                data-active={value === 'all'}
                onClick={() => { onChange('all'); setOpen(false); }}
              >
                {allLabel}
              </button>
            </li>
            {filtered.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  data-active={value === opt}
                  onClick={() => { onChange(opt); setOpen(false); }}
                >
                  {opt}
                </button>
              </li>
            ))}
            {searchable && filtered.length === 0 ? <li className="bird-filter__empty">No matches</li> : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
