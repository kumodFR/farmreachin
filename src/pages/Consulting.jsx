import React from 'react';
import PageHead from '../components/PageHead.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ConsultingService, { ServiceIndex } from '../components/ConsultingService.jsx';
import TransformationJourney from '../components/TransformationJourney.jsx';
import Reveal from '../components/Reveal.jsx';
import CTA from '../components/CTA.jsx';
import { CONSULTING } from '../data/content.js';
import { SERVICES, METHOD } from '../data/services.js';

export const meta = {
  path: '/consulting',
  title: 'Consulting & Transformation — Farmreach Technologies',
  description: 'Agriculture transformation, process audit, digital transformation, GTM and implementation consulting from a company that has operated agricultural systems at state scale.'
};

export default function Consulting() {
  return (
    <>
      <PageHead
        eyebrow="Consulting & Transformation"
        title={CONSULTING.hero.title}
        lede={CONSULTING.hero.lede}
        crumb="Consulting"
      />

      <section className="section section--tight section--soft-green">
        <div className="container">
          <ServiceIndex services={SERVICES} onNavigateLabel="Read more" />
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          {SERVICES.map((service, i) => (
            <ConsultingService service={service} index={i} key={service.id} />
          ))}
        </div>
      </section>

      <section className="section section--soft-green" aria-labelledby="method-title">
        <div className="container">
          <SectionHeading
            id="method-title"
            eyebrow={CONSULTING.method.eyebrow}
            title={CONSULTING.method.title}
            body={CONSULTING.method.body}
          />
        </div>
        <TransformationJourney steps={METHOD.slice(0, 6)} />
      </section>

      <section className="section section--tight section--light" aria-labelledby="why-title">
        <div className="container">
          <p className="eyebrow" id="why-title">Why Farmreach</p>
          <div className="split split--even" style={{ marginTop: 'var(--space-lg)' }}>
            {CONSULTING.why.map((w) => (
              <Reveal key={w.title} style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--space-md)' }}>
                <h3>{w.title}</h3>
                <p style={{ marginTop: 'var(--space-2xs)' }}>{w.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Where is the operating model breaking?"
        body="Most engagements start with an assessment of the current state. That is usually enough to know whether the answer is process, technology, go-to-market or all three."
        primary={{ href: '/contact', label: 'Talk to us' }}
        secondary={{ href: '/farmreach-os', label: 'Explore Farmreach OS' }}
      />
    </>
  );
}
