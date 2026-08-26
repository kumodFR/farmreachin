import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

/* Editorial photo grid with a lightbox, newest year first. */
export default function GalleryGrid({ items }) {
  const [openId, setOpenId] = useState(null);
  const panelRef = useRef(null);

  /* Newest year first, whatever order entries are authored in, so a future
     photograph lands in the right place by year alone. Same-year entries keep
     their authored order (Array.sort is stable). */
  const ordered = [...items].sort((a, b) => (Number(b.year) || -1) - (Number(a.year) || -1));
  const index = ordered.findIndex((i) => i.id === openId);
  const current = index >= 0 ? ordered[index] : null;

  const step = useCallback((dir) => {
    if (!ordered.length) return;
    const next = (index + dir + ordered.length) % ordered.length;
    setOpenId(ordered[next].id);
  }, [index, ordered]);

  useEffect(() => {
    if (!current) return undefined;
    const onKey = (ev) => {
      if (ev.key === 'Escape') setOpenId(null);
      if (ev.key === 'ArrowRight') step(1);
      if (ev.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (panelRef.current) panelRef.current.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [current, step]);

  return (
    <>
      <ul className="gal">
        {ordered.map((item) => (
          <li className={['gal__cell', item.wide ? 'gal__cell--wide' : '', item.contain ? 'gal__cell--contain' : ''].filter(Boolean).join(' ')} key={item.id}>
            <button type="button" className="gal__tile" onClick={() => setOpenId(item.id)}>
              <img
                src={item.src}
                alt={item.alt || item.caption}
                loading="lazy"
                style={item.focus ? { objectPosition: item.focus } : undefined}
              />
              <span className="gal__caption">
                <span className="gal__year">{item.year}</span>
                <span aria-hidden="true">{'\u00a0\u00b7\u00a0'}</span>
                {item.caption}
                {item.location ? <span className="gal__location">{item.location}</span> : null}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current
        ? ReactDOM.createPortal(
            <div className="lbx" role="presentation" onMouseDown={(ev) => { if (ev.target === ev.currentTarget) setOpenId(null); }}>
              <div className="lbx__panel" role="dialog" aria-modal="true" aria-label={current.caption} tabIndex={-1} ref={panelRef}>
                <img src={current.src} alt={current.alt || current.caption} />
                <div className="lbx__bar">
                  <div>
                    <p className="lbx__caption">
                      <span className="gal__year">{current.year}</span>
                      <span aria-hidden="true">{'\u00a0\u00b7\u00a0'}</span>
                      {current.caption}
                    </p>
                    {current.location ? <p className="lbx__location">{current.location}</p> : null}
                    {current.description ? <p className="lbx__desc">{current.description}</p> : null}
                  </div>
                  <div className="lbx__nav">
                    <button type="button" className="tst__arrow" onClick={() => step(-1)} aria-label="Previous photograph">
                      <span aria-hidden="true">&larr;</span>
                    </button>
                    <button type="button" className="tst__arrow" onClick={() => step(1)} aria-label="Next photograph">
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                    <button type="button" className="tst__arrow" onClick={() => setOpenId(null)} aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
