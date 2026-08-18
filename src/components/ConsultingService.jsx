import React from 'react';
import Reveal from './Reveal.jsx';

/* Full service block for /consulting. */
export default function ConsultingService({ service, index }) {
  return (
    <Reveal as="article" className="svc" id={service.id}>
      <div className="svc__head">
        <span className="svc__num">{String(index + 1).padStart(2, '0')}</span>
        <h2>{service.name}</h2>
        <p className="lead">{service.summary}</p>
      </div>
      <div className="svc__grid">
        <div>
          <h3 className="eyebrow" style={{ marginBottom: 'var(--space-sm)' }}>What the engagement covers</h3>
          <ul className="svc__list">
            {service.explain.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="svc__outputs">
          <h4>Outputs</h4>
          <ul>{service.outputs.map((o) => <li key={o}>{o}</li>)}</ul>
        </div>
      </div>
    </Reveal>
  );
}

/* Compact index of the capability areas. */
export function ServiceIndex({ services, onNavigateLabel = 'Learn more' }) {
  return (
    <div className="svc-index">
      {services.map((s, i) => (
        <div className="svc-index__item" key={s.id}>
          <span className="svc-index__num">{String(i + 1).padStart(2, '0')}</span>
          <h3>{s.short}</h3>
          <p>{s.summary}</p>
          <a className="textlink" href={`/consulting#${s.id}`}>{onNavigateLabel} <span aria-hidden="true">&rarr;</span></a>
        </div>
      ))}
    </div>
  );
}
