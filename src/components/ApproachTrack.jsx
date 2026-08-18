import React from 'react';
import Reveal from './Reveal.jsx';

/* HOW we work. One connected pathway: a continuous progression line with a node
   per stage, horizontal on desktop and vertical below it. Not seven cards. */
export default function ApproachTrack({ steps }) {
  return (
    <Reveal as="ol" className="track">
      {steps.map((step, i) => (
        <li className="track__stage" key={step.title}>
          <span className="track__marker" aria-hidden="true">
            <span className="track__line track__line--in" />
            <span className="track__dot" />
            <span className="track__line track__line--out" />
          </span>
          <span className="track__num">{step.num}</span>
          <h3 className="track__title">{step.title}</h3>
          <p className="track__body">{step.body}</p>
        </li>
      ))}
    </Reveal>
  );
}
