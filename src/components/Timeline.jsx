import React from 'react';
import Reveal from './Reveal.jsx';

/* Stage-based evolution. Stages, not invented dates. */
export default function Timeline({ items }) {
  return (
    <Reveal as="ol" className="arc">
      {items.map((item) => (
        <li className="arc__item" key={item.title}>
          <span className="arc__stage">{item.stage}</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </li>
      ))}
    </Reveal>
  );
}
