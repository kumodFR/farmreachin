import React from 'react';
import PageHead from '../components/PageHead.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ConsultingService, { ServiceIndex } from '../components/ConsultingService.jsx';
import TransformationJourney from '../components/TransformationJourney.jsx';
import Reveal from '../components/Reveal.jsx';
import CTA from '../components/CTA.jsx';
import { Link } from '../router.jsx';
import { CONSULTING } from '../data/content.js';
import { SERVICES, CAPABILITY_AREAS, AUDIENCES, METHOD } from '../data/services.js';
import { FARMINSTA_URL } from '../data/site.js';

export const meta = {
  path: '/consulting',
  title: 'Consulting & Transformation — Farmreach Technologies',
  description: 'Agricultural transformation and advisory: operating model, digital transformation, process advisory and go-to-market work from a company that has operated agricultural systems at scale.'
};

/* Three customer groups and the four capability areas are compact by intent:
   this is an advisory page, so the argument is the sequence, not the cards. */
export default function Consulting() {
  return (
    <>
      <PageHead
        eyebrow="Consulting & Transformation"
        title={CONSULTING.hero.title}
        lede={CONSULTING.hero.lede}
        crumb="Advisory"
        actions={
          <>
            <Link to="/contact" className="btn btn--primary">
              Talk to us <span className="btn__arrow" aria-hidden="true">&rarr;</span>
            </Link>
            <a href="#why-title" className="btn btn--secondary">
              Our experience <span className="btn__arrow" aria-hidden="true">&rarr;</span>
            </a>
          </>
        }
      />

      <section className="section section--soft-green" aria-labelledby="layers-title">
        <div className="container">
          <SectionHeading
            id="layers-title"
            eyebrow={CONSULTING.layers.eyebrow}
            title={CONSULTING.layers.title}
            body={CONSULTING.layers.body}
          />
        </div>
        <div className="container">
          <ServiceIndex services={CAPABILITY_AREAS} link={false} />
        </div>
      </section>

      <section className="section section--light" aria-labelledby="method-title">
        <div className="container">
          <SectionHeading
            id="method-title"
            eyebrow={CONSULTING.method.eyebrow}
            title={CONSULTING.method.title}
            body={CONSULTING.method.body}
          />
        </div>
        <div className="container">
          <TransformationJourney steps={METHOD} />
        </div>
      </section>

      <section className="section section--soft-green" aria-labelledby="engage-title">
        <div className="container">
          <SectionHeading
            id="engage-title"
            eyebrow={CONSULTING.engagements.eyebrow}
            title={CONSULTING.engagements.title}
            body={CONSULTING.engagements.body}
          />
          {SERVICES.map((service, i) => (
            <ConsultingService service={service} index={i} key={service.id} />
          ))}
        </div>
      </section>

      <section className="section section--tight section--light" aria-labelledby="audience-title">
        <div className="container">
          <SectionHeading
            id="audience-title"
            eyebrow={CONSULTING.audience.eyebrow}
            title={CONSULTING.audience.title}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-lg)',
              marginTop: 'var(--space-lg)'
            }}
          >
            {AUDIENCES.map((a) => (
              <Reveal key={a.title} style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--space-md)' }}>
                <h3>{a.title}</h3>
                <p style={{ marginTop: 'var(--space-2xs)' }}>{a.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight section--soft-green" aria-labelledby="why-title">
        <div className="container">
          <p className="eyebrow" id="why-title">{CONSULTING.why.eyebrow}</p>
          <div className="split" style={{ marginTop: 'var(--space-md)' }}>
            <Reveal>
              <h2>{CONSULTING.why.title}</h2>
            </Reveal>
            <Reveal className="prose">
              <p className="lead">{CONSULTING.why.body}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--tight section--light" aria-labelledby="bridge-title">
        <div className="container">
          <SectionHeading
            id="bridge-title"
            eyebrow={CONSULTING.bridge.eyebrow}
            title={CONSULTING.bridge.title}
            body={CONSULTING.bridge.body}
          />
          <Reveal style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-lg)', marginTop: 'var(--space-md)' }}>
            <Link to="/farmreach-os" className="textlink">
              Explore Farmreach OS <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link to={FARMINSTA_URL} external className="textlink">
              Explore Farminsta OS <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CTA
        title="Have a transformation challenge to solve?"
        body="Tell us what you are trying to change. We will bring the right agricultural, operating and technology perspective to the conversation."
        primary={{ href: '/contact', label: 'Start a conversation' }}
      />
    </>
  );
}
