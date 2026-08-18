import React from 'react';
import Reveal from './Reveal.jsx';

/* Placeholder cells only — no partner marks are invented. Replace each cell
   with an <img> once Farmreach supplies approved logos. */
export default function LogoWall({ slots }) {
  return (
    <Reveal className="logo-wall">
      {slots.map((s) => <div className="logo-wall__cell" key={s}>{s}</div>)}
    </Reveal>
  );
}
