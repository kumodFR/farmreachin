import React from 'react';
import Reveal from './Reveal.jsx';
import { Link } from '../router.jsx';

/* WHAT the consulting business does. An editorial capability list — number and
   name on the left, scope on the right, separated by hairlines — so the four
   capability areas read as one practice rather than four products. */
export default function CapabilityList({ services }) {
  return (
    <Reveal as="ol" className="cap-list">
      {services.map((s, i) => (
        <li className="cap-list__item" key={s.id}>
          <span className="cap-list__num">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="cap-list__name">{s.homeName || s.short}</h3>
          <p className="cap-list__body">{s.homeSummary || s.summary}</p>
        </li>
      ))}
      <li className="cap-list__foot">
        <Link to="/consulting" className="textlink">
          Consulting &amp; Transformation in detail <span aria-hidden="true">&rarr;</span>
        </Link>
      </li>
    </Reveal>
  );
}
