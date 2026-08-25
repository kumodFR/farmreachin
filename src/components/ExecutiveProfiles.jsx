import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { ExternalMark } from '../router.jsx';

/* Alternative to the compact Leadership section: same visual language
   (.people / .person, soft-green section), both profiles shown together,
   no carousel. Each "Read Full Profile" opens a detailed modal. */
export default function ExecutiveProfiles({ items }) {
  const [openId, setOpenId] = useState(null);
  const dialogRef = useRef(null);
  const openPerson = openId ? items.find((p) => p.id === openId) : null;

  useEffect(() => {
    if (!openPerson) return undefined;
    const onKey = (ev) => { if (ev.key === 'Escape') setOpenId(null); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (dialogRef.current) dialogRef.current.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; };
  }, [openPerson]);

  return (
    <>
      <div className="people">
        {items.map((p) => (
          <article className="person" key={p.id}>
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
                {p.headline ? <p className="person__focus">{p.headline}</p> : null}
                <div className="person__actions">
                  {p.linkedin ? (
                    <a className="exec-cta" href={p.linkedin} target="_blank" rel="noopener noreferrer">
                      View LinkedIn Profile <ExternalMark />
                    </a>
                  ) : null}
                  {/* Label stays; the action waits on approved copy. */}
                  <button
                    type="button"
                    className="exec-cta"
                    onClick={() => setOpenId(p.id)}
                    disabled={Boolean(p.profilePending)}
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

      {openPerson
        ? ReactDOM.createPortal(
            <div className="exec-lbx" role="presentation" onMouseDown={(ev) => { if (ev.target === ev.currentTarget) setOpenId(null); }}>
              <div className="exec-lbx__panel" role="dialog" aria-modal="true" aria-labelledby="exec-modal-title" tabIndex={-1} ref={dialogRef}>
                <button type="button" className="tst__arrow exec-lbx__close" onClick={() => setOpenId(null)} aria-label="Close profile">
                  <span aria-hidden="true">&times;</span>
                </button>

                <div className="exec-lbx__header">
                  {openPerson.photo ? (
                    <img src={openPerson.photo} alt={`Portrait of ${openPerson.name}`} className="exec-lbx__portrait" />
                  ) : null}
                  <div>
                    <h3 id="exec-modal-title" className="exec-lbx__name">
                      {openPerson.modalName || openPerson.name}
                      {openPerson.alias && !openPerson.modalName ? <span className="person__alias"> ({openPerson.alias})</span> : null}
                    </h3>
                    <p className="person__role">{openPerson.modalRole || openPerson.role}</p>
                    {openPerson.positioningLine ? <p className="exec-lbx__positioning">{openPerson.positioningLine}</p> : null}
                    {openPerson.headline && !openPerson.positioningLine ? <p className="exec-lbx__headline">{openPerson.headline}</p> : null}
                    {openPerson.linkedin ? (
                      <a className="person__link" href={openPerson.linkedin} target="_blank" rel="noopener noreferrer">
                        <span className="nav__ext">View LinkedIn Profile <ExternalMark /></span>
                      </a>
                    ) : null}
                  </div>
                </div>

                {openPerson.summary ? (
                  <p className="exec-lbx__summary">{openPerson.summary}</p>
                ) : null}

                {openPerson.sections ? (
                  <>
                    <div className="exec-lbx__section">
                      <p className="eyebrow">Leadership Profile</p>
                      {openPerson.profile.map((t) => <p key={t}>{t}</p>)}
                    </div>

                    {openPerson.credentials?.length ? (
                      <div className="exec-lbx__callout">
                        <p className="exec-lbx__calloutTitle">Key Credentials</p>
                        <ul className="exec-lbx__credentials">
                          {openPerson.credentials.map((c) => <li key={c}>{c}</li>)}
                        </ul>
                      </div>
                    ) : null}

                    {openPerson.expertise?.length ? (
                      <div className="exec-lbx__section">
                        <p className="eyebrow">Capability Areas</p>
                        <ul className="exec-lbx__tags">
                          {openPerson.expertise.map((t) => <li key={t}>{t}</li>)}
                        </ul>
                      </div>
                    ) : null}

                    {openPerson.sections.map((s) => (
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

                    {openPerson.twoCol?.length ? (
                      <div className="exec-lbx__section exec-lbx__twocol">
                        {openPerson.twoCol.map((col) => (
                          <div key={col.heading}>
                            <h4 className="exec-lbx__sectionTitle">{col.heading}</h4>
                            {col.body.map((t) => <p key={t}>{t}</p>)}
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {openPerson.positioning ? (
                      <div className="exec-lbx__callout">
                        <p className="exec-lbx__calloutTitle">{openPerson.positioning.heading}</p>
                        <p>{openPerson.positioning.body}</p>
                      </div>
                    ) : null}

                    {openPerson.education ? (
                      <p className="exec-lbx__education">{openPerson.education}</p>
                    ) : null}
                  </>
                ) : (
                  <>
                    <div className="exec-lbx__section">
                      <p className="eyebrow">Executive Profile</p>
                      {openPerson.profile.map((t) => <p key={t}>{t}</p>)}
                    </div>

                    {openPerson.leadership?.length ? (
                      <div className="exec-lbx__section">
                        <p className="eyebrow">Leadership &amp; Experience</p>
                        {openPerson.leadership.map((t) => <p key={t}>{t}</p>)}
                      </div>
                    ) : null}

                    {openPerson.expertise?.length ? (
                      <div className="exec-lbx__section">
                        <p className="eyebrow">Areas of Expertise</p>
                        <ul className="exec-lbx__tags">
                          {openPerson.expertise.map((t) => <li key={t}>{t}</li>)}
                        </ul>
                      </div>
                    ) : null}

                    {openPerson.selected?.length ? (
                      <div className="exec-lbx__section">
                        <p className="eyebrow">Selected Experience</p>
                        {openPerson.selected.map((t) => <p key={t}>{t}</p>)}
                      </div>
                    ) : null}

                    {openPerson.focus ? (
                      <div className="exec-lbx__section">
                        <p className="eyebrow">Current Focus</p>
                        <p>{openPerson.focus}</p>
                      </div>
                    ) : null}
                  </>
                )}

                {openPerson.email ? (
                  <div className="exec-lbx__contact">
                    {openPerson.linkedin ? (
                      <a className="person__link" href={openPerson.linkedin} target="_blank" rel="noopener noreferrer">
                        <span className="nav__ext">Connect with {openPerson.alias || openPerson.name.split(' ')[0]} on LinkedIn <ExternalMark /></span>
                      </a>
                    ) : null}
                    <a className="person__link" href={`mailto:${openPerson.email}`}>
                      Email {openPerson.alias || openPerson.name.split(' ')[0]} <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                ) : null}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
