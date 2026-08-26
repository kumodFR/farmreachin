import React from 'react';
import PageHead from '../components/PageHead.jsx';
import Reveal from '../components/Reveal.jsx';
import { RECOGNITION } from '../data/recognition.js';

export const meta = {
  path: '/recognition',
  title: 'Recognition — Farmreach Technologies',
  description: 'Recognition for Farmreach across agricultural technology and rural markets, including the HYSEA 10X Product Awards and ET Champions of Rural Markets.'
};

/* A curated timeline: year and citation on one side, the event photograph on
   the other, alternating surfaces down the page. Photographs carry the page,
   so an unsupplied one leaves a labelled frame rather than a stand-in image. */
function Entry({ entry, index }) {
  const soft = index % 2 === 1;
  const pending = Boolean(entry.pending);
  return (
    <section
      className={`section ${soft ? 'section--soft-green' : 'section--light'}`}
      id={entry.id}
      aria-labelledby={`${entry.id}-title`}
    >
      <div className="container rec">
        <Reveal className="rec__head">
          <p className={entry.year ? 'rec__year' : 'rec__year rec__year--pending'}>
            {entry.year || 'Year to be confirmed'}
          </p>
          <h2 id={`${entry.id}-title`} className="rec__title">
            {pending ? 'Recognition to be confirmed' : entry.title}
          </h2>
          {entry.subtitle ? <p className="rec__subtitle">{entry.subtitle}</p> : null}
        </Reveal>
        <Reveal className="rec__figure">
          {entry.photo ? (
            <img src={entry.photo} alt={entry.photoAlt || entry.title} loading="lazy" />
          ) : (
            <div className="rec__frame" role="img" aria-label={entry.photoNote}>
              <span>{entry.photoNote}</span>
            </div>
          )}
        </Reveal>
        <Reveal as="p" className="rec__narration">
          {pending
            ? 'Details for this recognition will be published once they are confirmed by Farmreach.'
            : entry.narration}
        </Reveal>
      </div>
    </section>
  );
}

export default function Recognition() {
  return (
    <>
      <PageHead
        eyebrow="Recognition"
        title={RECOGNITION.hero.title}
        lede={RECOGNITION.hero.lede}
        crumb="Recognition"
      />
      {/* Pending entries stay in the data as marked placeholders but are not
          published until their details are confirmed. */}
      {RECOGNITION.entries.filter((entry) => !entry.pending).map((entry, i) => (
        <Entry entry={entry} index={i} key={entry.id} />
      ))}
    </>
  );
}
