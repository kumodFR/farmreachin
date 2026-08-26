import React from 'react';
import PageHead from '../components/PageHead.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Capabilities from '../components/Capabilities.jsx';
import TransformationJourney from '../components/TransformationJourney.jsx';
import GeoVisual from '../components/GeoVisual.jsx';
import Reveal from '../components/Reveal.jsx';
import CTA from '../components/CTA.jsx';
import {
  FARMREACH_OS_CAPABILITIES,
  FARMREACH_OS_ARCHITECTURE,
  FARMREACH_OS_PRINCIPLES,
  FARMREACH_OS_STAKEHOLDERS,
  FARMREACH_OS_DELIVERY,
  OPERATING_SYSTEMS
} from '../data/operatingSystems.js';

export const meta = {
  path: '/farmreach-os',
  title: 'Farmreach OS — Government Agriculture Operating System',
  description: 'Intelligence, orchestration, field operations and decision infrastructure for state agriculture, working with the systems a department already runs.'
};

const [FARMREACH_OS] = OPERATING_SYSTEMS;

export default function FarmreachOS() {
  return (
    <>
      <PageHead
        eyebrow="Public Enterprise"
        title="Government Agriculture Operating System"
        lede="Intelligence infrastructure for state agriculture."
        crumb="Farmreach OS"
      />

      <section className="section section--light">
        <div className="container split">
          <Reveal className="prose">
            <p className="lead">
              Farmreach OS gives a state the ability to see its agriculture as it happens, and act on what
              it sees &mdash; without replacing the systems already in place.
            </p>
            <p>
              It is an intelligence and operating layer above the digital systems a department already runs.
              It connects existing data, field intelligence, geospatial information and agricultural
              workflows so that decisions at village, block, district and state level read from the same
              record, and so that action can be coordinated across the people already working with farmers.
            </p>
          </Reveal>
          <Reveal>
            <p className="eyebrow">Who it serves</p>
            <ul className="stack" style={{ gap: 0 }}>
              {FARMREACH_OS.audience.map((a) => (
                <li
                  key={a}
                  style={{
                    padding: '13px 0',
                    borderBottom: '1px solid var(--line)',
                    fontSize: '15.5px',
                    color: 'var(--text-primary)'
                  }}
                >
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight section--soft-green" aria-labelledby="arch-title">
        <div className="container">
          <SectionHeading
            id="arch-title"
            eyebrow="Core architecture"
            title="Data, analysis, insight, action, impact."
            body="The architecture is a loop, not a pipeline. What is measured at the end changes what is captured at the start of the next season."
          />
        </div>
        <div className="container">
          <TransformationJourney steps={FARMREACH_OS_ARCHITECTURE} dark />
        </div>
      </section>

      <section className="section section--light" aria-labelledby="cap-title">
        <div className="container">
          <SectionHeading
            id="cap-title"
            eyebrow="Capabilities"
            title="Nine capabilities on one operating record."
            body="Each capability reads from the same farmer, land, crop and activity record, which is why a district view and a state view never disagree."
          />
        </div>
        <div className="container">
          <Capabilities items={FARMREACH_OS_CAPABILITIES} />
        </div>
      </section>

      <section className="section section--soft-green" aria-labelledby="principles-title">
        <div className="container">
          <SectionHeading
            id="principles-title"
            eyebrow="Design principles"
            title="Extension-first, and built for the department that already exists."
            body="These principles decide what Farmreach OS refuses to do as much as what it does."
          />
          <div className="split split--even">
            {FARMREACH_OS_PRINCIPLES.map((p) => (
              <Reveal key={p.title} style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--space-md)' }}>
                <h3>{p.title}</h3>
                <p style={{ marginTop: 'var(--space-2xs)' }}>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light" aria-labelledby="geo-title">
        <div className="container split">
          <div>
            <SectionHeading
              id="geo-title"
              eyebrow="Stakeholders & geography"
              title="The state, the district, the block, the plot."
              body="An operating system for state agriculture has to hold every level at once, because the officer, the district and the department each need a different resolution of the same record."
            />
            <Reveal>
              <ul className="svc__list" style={{ gridTemplateColumns: '1fr' }}>
                {FARMREACH_OS_STAKEHOLDERS.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </Reveal>
          </div>
          <Reveal>
            <GeoVisual callouts={false} />
          </Reveal>
        </div>
      </section>

      <section className="section section--tight section--soft-green" aria-labelledby="delivery-title">
        <div className="container">
          <SectionHeading
            id="delivery-title"
            eyebrow="Delivery"
            title="From programme design to steady operation."
            body="Deployment usually begins with one district and one season, then extends once the record holds."
          />
        </div>
        <div className="container">
          <TransformationJourney steps={FARMREACH_OS_DELIVERY} dark />
        </div>
      </section>

      <CTA
        title="For states considering this"
        body="Tell us the district, the scheme or the department system this needs to work with. We will come back with what the first season would involve."
        primary={{ href: '/contact', label: 'Request a state briefing' }}
        secondary={{ href: '/consulting', label: 'Explore Advisory' }}
      />
    </>
  );
}
