import React, { useEffect, useRef } from 'react';
import { ExternalMark } from '../router.jsx';

/* Alternative to the compact Leadership section: same visual language
   (.people / .person, soft-green section), both profiles shown together,
   no carousel. Each "Read Full Profile" opens a detailed modal.

   Both full profiles are rendered into the DOM unconditionally — CSS
   (.exec-lbx[data-open="true"]) controls visibility, not React mount state.
   This is the same disclosure pattern as tabs/accordions: search engines
   have confirmed since 2019 that content behind such toggles is crawled and
   indexed like any visible content, so Pradeep's and Abila's full profiles
   (credentials, expertise, career detail) are present in the prerendered
   HTML and readable by every crawler, not only by a visitor who clicks. */
function ProfileDialog({ person, isOpen, onClose }) {
  const dialogRef = useRef(null);
  const panelId = `${person.id}-full-profile`;
  const titleId = `${person.id}-profile-title`;

  useEffect(() => {
    const panel = dialogRef.current;
    if (!panel) return undefined;

    if (!isOpen) {
      panel.setAttribute('inert', '');
      return undefined;
    }

    panel.removeAttribute('inert');
    panel.focus();

    const onKey = (ev) => { if (ev.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <div
      className="exec-lbx"
      id={panelId}
      data-open={isOpen}
      role="presentation"
      onMouseDown={(ev) => { if (ev.target === ev.currentTarget) onClose(); }}
    >
      <div className="exec-lbx__panel" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1} ref={dialogRef}>
        <button type="button" className="tst__arrow exec-lbx__close" onClick={onClose} aria-label={`Close ${person.name}'s profile`}>
          <span aria-hidden="true">&times;</span>
        </button>

        <div className="exec-lbx__header">
          {person.photo ? (
            <img
              src={person.photo}
              alt={`Portrait of ${person.name}${person.alias ? ` (${person.alias})` : ''}, ${person.modalRole || person.role} at Farmreach Technologies`}
              className="exec-lbx__portrait"
            />
          ) : null}
          <div>
            <h3 id={titleId} className="exec-lbx__name">
              {person.modalName || person.name}
              {person.alias && !person.modalName ? <span className="person__alias"> ({person.alias})</span> : null}
            </h3>
            <p className="person__role">{person.modalRole || person.role}</p>
            {person.positioningLine ? <p className="exec-lbx__positioning">{person.positioningLine}</p> : null}
            {person.headline && !person.positioningLine ? <p className="exec-lbx__headline">{person.headline}</p> : null}
            {person.linkedin ? (
              <a className="person__link" href={person.linkedin} target="_blank" rel="noopener noreferrer">
                <span className="nav__ext">View LinkedIn Profile <ExternalMark /></span>
              </a>
            ) : null}
          </div>
        </div>

        {person.summary ? (
          <p className="exec-lbx__summary">{person.summary}</p>
        ) : null}

        {person.sections ? (
          <>
            <div className="exec-lbx__section">
              <p className="eyebrow">Leadership Profile</p>
              {person.profile.map((t) => <p key={t}>{t}</p>)}
            </div>

            {person.credentials?.length ? (
              <div className="exec-lbx__callout">
                <p className="exec-lbx__calloutTitle">Key Credentials</p>
                <ul className="exec-lbx__credentials">
                  {person.credentials.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </div>
            ) : null}

            {person.expertise?.length ? (
              <div className="exec-lbx__section">
                <p className="eyebrow">Capability Areas</p>
                <ul className="exec-lbx__tags">
                  {person.expertise.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            ) : null}

            {person.sections.map((s) => (
              <div className="exec-lbx__section" key={s.heading}>
                <h4 className="exec-lbx__sectionTitle">{s.heading}</h4>
                {s.meta ? <p className="exec-lbx__sectionMeta">{s.meta}</p> : null}
                {s.body.map((t) => <p key={t}>{t}</p>)}
                {s.tags?.length ? (
                  <div className="exec-lbx__chipRow">
                    {s.tags.map((t) => <span className="exec-lbx__chip" key={t}>{t}</span>)}
                  </div>
                ) : null}
                {s.flow?.length ? (
                  <div className="exec-lbx__flow">
                    {s.flow.map((f, i) => (
                      <React.Fragment key={f}>
                        <span className="exec-lbx__flowStep">{f}</span>
                        {i < s.flow.length - 1 ? <span aria-hidden="true" className="exec-lbx__flowArrow">&rarr;</span> : null}
                      </React.Fragment>
                    ))}
                  </div>
                ) : null}
                {s.list?.length ? (
                  <ul className="exec-lbx__list">
                    {s.list.map((l) => <li key={l}>{l}</li>)}
                  </ul>
                ) : null}
                {s.cards?.length ? (
                  <div className="exec-lbx__cards">
                    {s.cards.map((c) => (
                      <div className="exec-lbx__card" key={c.title}>
                        <p>{c.title}</p>
                        <p className="exec-lbx__cardMeta">{c.meta}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
                {s.after?.length ? s.after.map((t) => <p key={t}>{t}</p>) : null}
              </div>
            ))}

            {person.twoCol?.length ? (
              <div className="exec-lbx__section exec-lbx__twocol">
                {person.twoCol.map((col) => (
                  <div key={col.heading}>
                    <h4 className="exec-lbx__sectionTitle">{col.heading}</h4>
                    {col.body.map((t) => <p key={t}>{t}</p>)}
                  </div>
                ))}
              </div>
            ) : null}

            {person.positioning ? (
              <div className="exec-lbx__callout">
                <p className="exec-lbx__calloutTitle">{person.positioning.heading}</p>
                {(Array.isArray(person.positioning.body)
                  ? person.positioning.body
                  : [person.positioning.body]
                ).map((t) => <p key={t}>{t}</p>)}
              </div>
            ) : null}

            {person.education ? (
              <p className="exec-lbx__education">{person.education}</p>
            ) : null}
          </>
        ) : (
          <>
            <div className="exec-lbx__section">
              <p className="eyebrow">Executive Profile</p>
              {person.profile.map((t) => <p key={t}>{t}</p>)}
            </div>

            {person.leadership?.length ? (
              <div className="exec-lbx__section">
                <p className="eyebrow">Leadership &amp; Experience</p>
                {person.leadership.map((t) => <p key={t}>{t}</p>)}
              </div>
            ) : null}

            {person.expertise?.length ? (
              <div className="exec-lbx__section">
                <p className="eyebrow">Areas of Expertise</p>
                <ul className="exec-lbx__tags">
                  {person.expertise.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            ) : null}

            {person.selected?.length ? (
              <div className="exec-lbx__section">
                <p className="eyebrow">Selected Experience</p>
                {person.selected.map((t) => <p key={t}>{t}</p>)}
              </div>
            ) : null}

            {person.focus ? (
              <div className="exec-lbx__section">
                <p className="eyebrow">Current Focus</p>
                <p>{person.focus}</p>
              </div>
            ) : null}
          </>
        )}

        {person.email ? (
          <div className="exec-lbx__contact">
            {person.linkedin ? (
              <a className="person__link" href={person.linkedin} target="_blank" rel="noopener noreferrer">
                <span className="nav__ext">Connect with {person.alias || person.name.split(' ')[0]} on LinkedIn <ExternalMark /></span>
              </a>
            ) : null}
            <a className="person__link" href={`mailto:${person.email}`}>
              Email {person.alias || person.name.split(' ')[0]} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function ExecutiveProfiles({ items }) {
  const [openId, setOpenId] = React.useState(null);

  return (
    <>
      <div className="people">
        {items.map((p) => (
          <article className="person" id={p.id} key={p.id}>
            <div className="person__head">
              {p.photo ? (
                <img className="person__portrait person__portrait--img" src={p.photo} alt={`Portrait of ${p.name}, ${p.role} at Farmreach Technologies`} loading="lazy" />
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
                {p.headline ? <p className="person__focus">{p.headline}</p> : null}
                <div className="person__actions">
                  {p.linkedin ? (
                    <a className="exec-cta" href={p.linkedin} target="_blank" rel="noopener noreferrer">
                      View LinkedIn Profile <ExternalMark />
                    </a>
                  ) : null}
                  <button
                    type="button"
                    className="exec-cta"
                    aria-controls={`${p.id}-full-profile`}
                    aria-expanded={openId === p.id}
                    onClick={() => setOpenId(p.id)}
                  >
                    Read Full Profile <span aria-hidden="true">&rarr;</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="person__bio">
              {p.story.map((t) => <p key={t}>{t}</p>)}
            </div>
          </article>
        ))}
      </div>

      {items.map((p) => (
        <ProfileDialog key={p.id} person={p} isOpen={openId === p.id} onClose={() => setOpenId(null)} />
      ))}
    </>
  );
}
