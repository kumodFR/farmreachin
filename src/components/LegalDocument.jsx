import React, { useEffect, useState } from 'react';
import { LEGAL_ENTITY } from '../data/legal.js';

/* Shared layout for policy documents: sticky contents on desktop, a compact
   expandable contents block on mobile, deep-linkable section headings and a
   constrained reading measure. No hero imagery, no motion. */

function ContactBlock() {
  return (
    <address className="legal__address">
      <strong>{LEGAL_ENTITY.name}</strong><br />
      {LEGAL_ENTITY.addressLines.map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}
      <br />
      Email: <a href={`mailto:${LEGAL_ENTITY.email}`}>{LEGAL_ENTITY.email}</a>
    </address>
  );
}

function Block({ block }) {
  switch (block.type) {
    case 'h3':
      return <h3 className="legal__h3">{block.text}</h3>;
    case 'ul':
      return (
        <ul className="legal__list">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      );
    case 'address':
      return <ContactBlock />;
    case 'email':
      return (
        <p className="legal__email">
          <a href={`mailto:${LEGAL_ENTITY.email}`}>{LEGAL_ENTITY.email}</a>
        </p>
      );
    case 'note':
      return <p className="legal__note">{block.text}</p>;
    default:
      return <p>{block.text}</p>;
  }
}

/* Body is the scroll container on this site, so fragment navigation is done
   explicitly: it works the same in the static build and the review preview,
   and clears the sticky header. */
function scrollToId(id) {
  const el = id ? document.getElementById(id) : null;
  const current = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const top = el ? Math.max(0, el.getBoundingClientRect().top + current - 96) : 0;
  const opts = { top, behavior: 'smooth' };
  window.scrollTo(opts);
  if (document.body.scrollTop || document.body.scrollHeight > window.innerHeight) document.body.scrollTo(opts);
}

export default function LegalDocument({ doc }) {
  const [tocOpen, setTocOpen] = useState(false);
  const [active, setActive] = useState(doc.sections[0].id);

  /* Native fragment navigation does the scrolling; scroll-margin-top on
     .legal__section clears the sticky header. */
  const closeToc = () => setTocOpen(false);

  /* Honour a deep link on first load. */
  useEffect(() => {
    const id = (window.location.hash || '').replace(/^#/, '');
    if (id && doc.sections.some((s) => s.id === id)) {
      const t = setTimeout(() => scrollToId(id), 60);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [doc]);

  /* Reflect the section in view in the contents list, and honour a deep link
     on first load. */
  useEffect(() => {
    const ids = doc.sections.map((s) => s.id);
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [doc]);

  return (
    <section className="section section--light legal">
      <div className="container legal__grid">
        <nav className="legal__toc" aria-label={`${doc.title} contents`}>
          <p className="eyebrow">Contents</p>
          <button
            className="legal__tocToggle"
            type="button"
            aria-expanded={tocOpen}
            onClick={() => setTocOpen((v) => !v)}
          >
            {tocOpen ? 'Hide contents' : 'Show contents'}
          </button>
          <ol className="legal__tocList" data-open={tocOpen}>
            {doc.sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="legal__tocLink"
                  aria-current={active === s.id ? 'true' : undefined}
                  onClick={closeToc}
                >
                  <span className="legal__tocNum">{s.number}</span>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="legal__doc">
          <header className="legal__head">
            <p className="eyebrow">{doc.eyebrow}</p>
            <h1 className="legal__title">{doc.title}</h1>
            <dl className="legal__dates">
              <div>
                <dt>Effective date</dt>
                <dd>{doc.effective}</dd>
              </div>
              <div>
                <dt>Last updated</dt>
                <dd>{doc.updated}</dd>
              </div>
            </dl>
            {doc.intro.map((p) => <p className="legal__lede" key={p}>{p}</p>)}
            <p className="legal__note">{doc.reviewNote}</p>
          </header>

          {doc.sections.map((s) => (
            <section className="legal__section" id={s.id} key={s.id} aria-labelledby={`${s.id}-h`}>
              <h2 className="legal__h2" id={`${s.id}-h`}>
                <span className="legal__num">{s.number}</span>
                <a className="legal__anchor" href={`#${s.id}`}>{s.heading}</a>
              </h2>
              {s.blocks.map((b, i) => <Block block={b} key={i} />)}
            </section>
          ))}

          <p className="legal__top">
            <a href="#main">Back to top &uarr;</a>
          </p>
        </article>
      </div>
    </section>
  );
}
