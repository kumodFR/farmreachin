import React from 'react';
import Reveal from './Reveal.jsx';

export default function Capabilities({ items, columns3 = true }) {
  return (
    <Reveal className="caps">
      {items.map((c, i) => (
        <article className="cap" key={c.title}>
          <span className="cap__num">{String(i + 1).padStart(2, '0')}</span>
          <h3>{c.title}</h3>
          <p>{c.body}</p>
        </article>
      ))}
    </Reveal>
  );
}
