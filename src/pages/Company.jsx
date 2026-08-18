import React from 'react';
import PageHead from '../components/PageHead.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import People from '../components/People.jsx';
import StoryAside from '../components/StoryAside.jsx';
import { Chronology } from '../components/JourneyTimeline.jsx';
import Reveal from '../components/Reveal.jsx';
import CTA from '../components/CTA.jsx';
import { COMPANY, MILESTONES } from '../data/content.js';
import { SITE } from '../data/site.js';
import { ExternalMark } from '../router.jsx';

export const meta = {
  path: '/company',
  title: 'Our Story — Farmreach Technologies',
  description: 'Farmreach Technologies Pvt Ltd is a Hyderabad-based agricultural technology and transformation company operating since 2016.'
};

export default function Company() {
  return (
    <>
      <PageHead
        eyebrow="Our Story"
        title={COMPANY.hero.title}
        lede={COMPANY.hero.lede}
        crumb="Our Story"
      />

      <section className="section section--light" aria-labelledby="story-title">
        <div className="container">
          <SectionHeading
            id="story-title"
            eyebrow="Story"
            title="Why Farmreach began, and how it evolved."
            body={COMPANY.story}
            aside={<StoryAside />}
          />
        </div>
      </section>

      <section className="section section--tight section--soft-green" aria-labelledby="leadership-title">
        <div className="container">
          <p className="eyebrow" id="leadership-title">Leadership</p>
          <h2 style={{ marginBottom: 'var(--space-xl)', maxWidth: '24ch' }}>The people behind the journey</h2>
          <People items={COMPANY.leadership} />
        </div>
      </section>

      <section className="section section--light" aria-labelledby="chronology-title">
        <div className="container">
          <SectionHeading
            id="chronology-title"
            eyebrow="Timeline"
            title="Year by year, since 2016."
            body="Since 2016, Farmreach has built and operated digital systems across multiple layers of Indian agriculture. The journey spans field operations, farmer and production systems, value chains, government programmes, channel management, digital outreach and, now, geospatial intelligence and AI."
          />
        </div>
        <div className="container">
          <Chronology milestones={MILESTONES} />
        </div>
      </section>

      <section className="section section--soft-green" aria-labelledby="philosophy-title">
        <div className="container">
          <SectionHeading
            id="philosophy-title"
            eyebrow="Operating philosophy"
            title="Understand agriculture first. Then build the systems that make it work."
            body="Seven principles carried from actual agricultural operating experience into every engagement."
          />
          <div className="split split--even">
            {COMPANY.philosophy.map((p) => (
              <Reveal key={p.title} style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--space-md)' }}>
                <h3>{p.title}</h3>
                <p style={{ marginTop: 'var(--space-2xs)' }}>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light" aria-labelledby="capability-title">
        <div className="container">
          <SectionHeading
            id="capability-title"
            eyebrow="Capability"
            title="A technology company and a transformation company."
            body="The two halves are not separate business units bolted together. Each one exists because the other exposed what was missing."
          />
          <div className="split split--even">
            {COMPANY.capability.map((c) => (
              <Reveal key={c.title} style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--space-md)' }}>
                <h3>{c.title}</h3>
                <p style={{ marginTop: 'var(--space-2xs)' }}>{c.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="advisory">
            <p className="advisory__label">{COMPANY.xpedition.label}</p>
            <h3 className="advisory__name">{COMPANY.xpedition.title}</h3>
            <p className="advisory__intro">{COMPANY.xpedition.intro}</p>
            <ul className="advisory__areas">
              {COMPANY.xpedition.areas.map((a) => <li key={a}>{a}</li>)}
            </ul>
            <p className="advisory__note">{COMPANY.xpedition.distinction}</p>
            <a className="advisory__cta" href={SITE.xpeditionUrl} target="_blank" rel="noopener noreferrer">
              <span className="nav__ext">{COMPANY.xpedition.cta} <ExternalMark /></span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Partnerships section removed until real partner marks are supplied —
          the old placeholder logo wall lives in farmreach-v2/web if needed. */}

      <section className="section section--tight section--light" aria-labelledby="careers-title">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">Careers</p>
            <h2 id="careers-title">{COMPANY.careers.title}</h2>
          </Reveal>
          <Reveal className="prose">
            <p>{COMPANY.careers.body}</p>
          </Reveal>
        </div>
      </section>

      <CTA
        title="Work with us, or work at Farmreach."
        body="Programme enquiries, transformation engagements, partnerships and roles all route through the same place."
        primary={{ href: '/contact', label: 'Talk to us' }}
      />
    </>
  );
}
