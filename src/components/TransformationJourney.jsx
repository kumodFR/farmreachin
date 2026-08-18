import React from 'react';
import Reveal from './Reveal.jsx';

export default function TransformationJourney({ steps, dark = false }) {
  return (
    <Reveal as="ol" className={dark ? 'journey journey--dark' : 'journey'}>
      {steps.map((step) => (
        <li className="journey__step" key={step.title}>
          <span className="journey__num">{step.num}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
          <span className="journey__flow" aria-hidden="true">&rarr;</span>
        </li>
      ))}
    </Reveal>
  );
}
