import React from 'react';
import Reveal from './Reveal.jsx';
import { Link } from '../router.jsx';

/* Capability evolution as one connected progression. Larger capability shifts
   carry a filled marker and a heavier title, so the years are not all equal. */
export default function JourneyTimeline({ milestones, moreHref, moreLabel }) {
  return (
    <Reveal className="jrn">
      <ol className="jrn__list">
        {milestones.map((m) => (
          <li className={m.major ? 'jrn__step jrn__step--major' : 'jrn__step'} key={m.year}>
            <span className="jrn__marker" aria-hidden="true">
              <span className="jrn__rail jrn__rail--in" />
              <span className="jrn__dot" />
              <span className="jrn__rail jrn__rail--out" />
            </span>
            <span className="jrn__year">{m.year}</span>
            <h3 className="jrn__title">{m.title}</h3>
            <p className="jrn__body">{m.body}</p>
          </li>
        ))}
      </ol>
      <Link to={moreHref} className="textlink jrn__more">
        {moreLabel} <span aria-hidden="true">&rarr;</span>
      </Link>
    </Reveal>
  );
}

/* Full chronology for Our Story: year, achievement, short explanation. */
export function Chronology({ milestones }) {
  return (
    <Reveal as="ol" className="chrono">
      {milestones.map((m) => (
        <li className="chrono__item" key={m.year}>
          <span className="chrono__year">{m.year}</span>
          <div className="chrono__body">
            <h3>{m.title}</h3>
            <p>{m.body}</p>
          </div>
        </li>
      ))}
    </Reveal>
  );
}
