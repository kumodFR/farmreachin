import React from 'react';
import Reveal from './Reveal.jsx';
import { Link, ExternalMark } from '../router.jsx';

export default function CTA({ title, body, primary, secondary, routes }) {
  return (
    <section className={routes ? 'section closing closing--routes' : 'section closing'}>
      <span className="closing__bg" aria-hidden="true" />
      <div className="container closing__inner">
        <Reveal>
          <h2>{title}</h2>
          <p className="lead" style={{ marginTop: 'var(--space-md)' }}>{body}</p>
        </Reveal>
        {routes ? (
          <Reveal as="ul" className="closing__routes">
            {routes.map((r) => (
              <li className="closing__route" key={r.name}>
                <span className="closing__route-name">{r.name}</span>
                <Link to={r.href} external={r.external} className="textlink">
                  {r.action} {r.external ? <ExternalMark /> : <span aria-hidden="true">&rarr;</span>}
                </Link>
              </li>
            ))}
          </Reveal>
        ) : (
          <Reveal className="btn-row">
            <Link to={primary.href} external={primary.external} className="btn btn--primary">
              {primary.label} <span className="btn__arrow" aria-hidden="true">&rarr;</span>
            </Link>
            {secondary ? (
              <Link to={secondary.href} external={secondary.external} className="btn btn--secondary">
                {secondary.label} <span className="btn__arrow" aria-hidden="true">&rarr;</span>
              </Link>
            ) : null}
          </Reveal>
        )}
      </div>
    </section>
  );
}
