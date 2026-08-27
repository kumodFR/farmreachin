import React from 'react';
import Reveal from './Reveal.jsx';

/* Client and partner marks. Each cell is a fixed box and the mark is fitted
   inside it with object-fit: contain, so logos of different proportions sit on
   a common optical size without any of them being stretched or cropped.
   An organisation with no mark yet renders its name in the same cell. */
export default function ClientLogos({ items }) {
  return (
    <Reveal as="ul" className="clients">
      {items.map((c) => (
        <li className="clients__cell" key={c.name}>
          {c.logo
            ? <img className="clients__mark" src={c.logo} alt={c.name} loading="lazy" decoding="async" />
            : <span className="clients__name">{c.name}</span>}
        </li>
      ))}
    </Reveal>
  );
}
