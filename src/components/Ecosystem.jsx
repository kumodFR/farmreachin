import React from 'react';
import Reveal from './Reveal.jsx';

/* How we see agriculture: the actors in operating order, with the farmer as the
   centre of production. Same grid, same classes — the hierarchy comes from the
   content and from which entry is marked `core`. */
export default function Ecosystem({ items }) {
  return (
    <Reveal className="eco">
      {items.map((item) => (
        <div className={item.core ? 'eco__cell eco__cell--core' : 'eco__cell'} key={item.name}>
          <span className="eco__tag">{item.tag}</span>
          <span className="eco__name">{item.name}</span>
          <span className="eco__note">{item.note}</span>
        </div>
      ))}
    </Reveal>
  );
}
