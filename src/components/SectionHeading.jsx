import React from 'react';
import Reveal from './Reveal.jsx';

/* Editorial two-column section opener: label + title on the left, narrative on
   the right. Used across every page so hierarchy stays identical. */
export default function SectionHeading({ eyebrow, title, body, id, children, aside }) {
  return (
    <div className="split" style={{ marginBottom: 'var(--space-xl)' }}>
      <Reveal>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 id={id}>{title}</h2>
        {aside || null}
      </Reveal>
      <Reveal className="prose">
        {Array.isArray(body) ? body.map((p) => <p key={p}>{p}</p>) : body ? <p>{body}</p> : null}
        {children}
      </Reveal>
    </div>
  );
}
