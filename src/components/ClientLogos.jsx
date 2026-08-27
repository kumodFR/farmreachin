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

    /* Re-measure from every signal that can change the rail's overflow, and do
       not rely on any single one. A window resize misses a container-only
       change; a ResizeObserver has proven unreliable under viewport emulation;
       and a mark finishing decode can shift things after both. Cheap to run,
       and the cue is wrong the moment one of them is missed. */
    window.addEventListener('resize', measure);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    el.querySelectorAll('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', measure, { once: true });
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure).catch(() => {});

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('scroll', measure);
      el.removeEventListener('click', onClick, true);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('resize', measure);
      if (ro) ro.disconnect();
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
