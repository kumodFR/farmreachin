import React from 'react';
import Reveal from './Reveal.jsx';
import { Link, ExternalMark } from '../router.jsx';

/* One agricultural core, three operating directions.
   A structural diagram — core, rail, three drops, three columns, shared
   foundation — rather than three cards or intersecting circles. */
export default function Architecture({ core, pillars, foundation }) {
  return (
    <Reveal className="arch">
      <div className="arch__core">
        <span className="arch__core-label">{core.label}</span>
        <span className="arch__core-name">{core.name}</span>
      </div>

      <div className="arch__connector" aria-hidden="true">
        <span className="arch__rail" />
        <span className="arch__drop arch__drop--1" />
        <span className="arch__drop arch__drop--2" />
        <span className="arch__drop arch__drop--3" />
      </div>

      <div className="arch__directions">
        {pillars.map((p) => (
          <article className={`arch__dir arch__dir--${p.tone}`} key={p.name}>
            <span className="arch__dir-mark" aria-hidden="true" />
            <span className="arch__dir-kind">{p.kind}</span>
            <h3>{p.name}</h3>
            <p className="arch__dir-sub">{p.subtitle}</p>
            <p>{p.body}</p>
            <Link to={p.href} external={p.external} className="textlink">
              {p.cta} {p.external ? <ExternalMark /> : <span aria-hidden="true">&rarr;</span>}
            </Link>
          </article>
        ))}
      </div>

      <div className="arch__foundation">
        <span className="arch__foundation-label">{foundation.label}</span>
        <ul className="arch__foundation-items">
          {foundation.items.map((i) => <li key={i}>{i}</li>)}
        </ul>
      </div>
    </Reveal>
  );
}
