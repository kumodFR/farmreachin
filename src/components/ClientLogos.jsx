import React, { useCallback, useEffect, useRef } from 'react';
import Reveal from './Reveal.jsx';

/* Client and partner marks on a horizontal rail.

   The rail is a grid that flows in columns across three fixed rows, so more
   logos extend it sideways and the section keeps its height. Each cell is a
   fixed box and the mark is fitted inside with object-fit: contain, so logos
   of different proportions sit at a common optical size without being
   stretched or cropped.

   Native scrolling does the work. This adds only what the platform does not:
   a vertical wheel nudges the rail sideways, and a pointer can drag it. */
export default function ClientLogos({ items }) {
  const railRef = useRef(null);
  const drag = useRef(null);

  /* Flags whether any rail remains to the right, which drives the edge fade. */
  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const more = el.scrollWidth - el.clientWidth - el.scrollLeft > 4;
    el.setAttribute('data-more', more ? 'true' : 'false');
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return undefined;
    measure();

    /* Translate a vertical wheel into horizontal travel, but only while the
       rail can still move that way — otherwise the page keeps its own scroll
       and the section never traps the reader. */
    const onWheel = (ev) => {
      if (ev.ctrlKey) return;
      const dy = Math.abs(ev.deltaY) > Math.abs(ev.deltaX) ? ev.deltaY : ev.deltaX;
      if (!dy) return;
      const max = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + dy;
      if ((dy < 0 && el.scrollLeft > 0) || (dy > 0 && el.scrollLeft < max)) {
        ev.preventDefault();
        el.scrollLeft = Math.max(0, Math.min(max, next));
        measure();
      }
    };

    const onDown = (ev) => {
      if (ev.pointerType === 'touch') return;   /* touch already scrolls natively */
      drag.current = { x: ev.clientX, left: el.scrollLeft, moved: false };
      el.classList.add('is-dragging');
    };
    const onMove = (ev) => {
      if (!drag.current) return;
      const dx = ev.clientX - drag.current.x;
      if (Math.abs(dx) > 3) drag.current.moved = true;
      el.scrollLeft = drag.current.left - dx;
      measure();
    };
    const onUp = () => {
      if (!drag.current) return;
      drag.current = null;
      el.classList.remove('is-dragging');
    };
    /* A drag that ends on a link must not also be read as a click. */
    const onClick = (ev) => { if (drag.current && drag.current.moved) ev.preventDefault(); };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('scroll', measure, { passive: true });
    el.addEventListener('click', onClick, true);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    /* A window resize event is too narrow: the rail also changes size when a
       breakpoint swaps the column width, when the font loads, or when a mark
       decodes. ResizeObserver catches every one of those. */
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el); else window.addEventListener('resize', measure);

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('scroll', measure);
      el.removeEventListener('click', onClick, true);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      if (ro) ro.disconnect(); else window.removeEventListener('resize', measure);
    };
  }, [measure]);

  return (
    <Reveal>
      <ul
        className="clients"
        ref={railRef}
        tabIndex={0}
        role="list"
        aria-label="Clients and partners"
      >
        {items.map((c) => (
          <li className="clients__cell" key={c.name}>
            {c.logo
              ? <img className="clients__mark" src={c.logo} alt={c.name} loading="lazy" decoding="async" draggable="false" />
              : <span className="clients__name">{c.name}</span>}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
