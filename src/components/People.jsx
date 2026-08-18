import React from 'react';
import Reveal from './Reveal.jsx';
import { ExternalMark } from '../router.jsx';

/* Compact leadership profile: small portrait, designation, short narration.
   The LinkedIn link renders only when an official URL is configured. */
export default function People({ items }) {
  return (
    <Reveal className="people">
      {items.map((p) => (
        <article className="person" key={p.name}>
          {/* Portrait left, the identity block centred beside it; the bio runs
             full width below the pair. */}
          <div className="person__head">
            {p.photo ? (
              <img className="person__portrait person__portrait--img" src={p.photo} alt={`Portrait of ${p.name}`} loading="lazy" />
            ) : (
              <div className="person__portrait" role="img" aria-label={`Portrait of ${p.name} to be supplied`}>Portrait</div>
            )}
            <div className="person__id">
              <h3 className="person__title">
                <span className="person__name">{p.name}</span>
                {p.alias ? (
                  <>
                    <span className="person__aliasLabel"> alias </span>
                    <span className="person__alias">({p.alias})</span>
                  </>
                ) : null}
              </h3>
              <p className="person__role">{p.role}</p>
              {p.focus ? <p className="person__focus">{p.focus}</p> : null}
              {p.linkedin ? (
                <a className="person__link" href={p.linkedin} target="_blank" rel="noopener noreferrer">
                  <span className="nav__ext">View LinkedIn Profile <ExternalMark /></span>
                </a>
              ) : null}
            </div>
          </div>
          {p.bio ? (
            <div className="person__bio">
              {p.bio.map((t) => <p key={t}>{t}</p>)}
            </div>
          ) : null}
        </article>
      ))}
    </Reveal>
  );
}
