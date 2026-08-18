import React from 'react';
import Hero from '../components/Hero.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Ecosystem from '../components/Ecosystem.jsx';
import Architecture from '../components/Architecture.jsx';
import ApproachTrack from '../components/ApproachTrack.jsx';
import CapabilityList from '../components/CapabilityList.jsx';
import JourneyTimeline from '../components/JourneyTimeline.jsx';
import CTA from '../components/CTA.jsx';
import Reveal from '../components/Reveal.jsx';
import { Link } from '../router.jsx';
import { HOME, ARCHITECTURE, JOURNEY } from '../data/content.js';
import { SERVICES, APPROACH } from '../data/services.js';

export const meta = {
  path: '/',
  title: "Farmreach Technologies — India's Agricultural Operating Systems & Transformation Company",
  description: 'Farmreach Technologies combines agricultural operating expertise, technology, data and transformation consulting to help governments and enterprises design, build and operate agricultural systems at scale.'
};

export default function Home() {
  return (
    <>
      <Hero />

      {/* Three directions, stated immediately after the hero */}
      <section className="section--light" aria-label="Farmreach business directions">
        <div className="container">
          <ul className="pillar-strip">
            {ARCHITECTURE.pillars.map((p) => (
              <li className="pillar-strip__item" key={p.name}>
                <span className="pillar-strip__kind">{p.kind}</span>
                <span className="pillar-strip__name">{p.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Agriculture as a system */}
      <section className="section section--soft-green" aria-labelledby="system-title">
        <div className="container">
          <SectionHeading
            id="system-title"
            eyebrow={HOME.system.eyebrow}
            title={HOME.system.title}
            body={HOME.system.body}
          />
        </div>
        <div className="container">
          <Ecosystem items={HOME.ecosystem} />
        </div>
        <div className="container">
          <Reveal className="prose" style={{ marginTop: 'var(--space-xl)' }}>
            {HOME.system.bridge.map((p) => <p key={p} style={{ marginTop: 'var(--space-md)' }}>{p}</p>)}
          </Reveal>
        </div>
      </section>

      {/* Farmreach's operating model — one core, three directions */}
      <section className="section section--light" aria-labelledby="arch-title">
        <div className="container">
          <SectionHeading
            id="arch-title"
            eyebrow={HOME.architecture.eyebrow}
            title={HOME.architecture.title}
            body={HOME.architecture.body}
          />
        </div>
        <div className="container">
          <Architecture
            core={ARCHITECTURE.core}
            pillars={ARCHITECTURE.pillars}
            foundation={ARCHITECTURE.foundation}
          />
        </div>
      </section>

      {/* WHAT the consulting business does */}
      <section className="section section--soft-green" aria-labelledby="consulting-title">
        <div className="container">
          <SectionHeading
            id="consulting-title"
            eyebrow={HOME.consulting.eyebrow}
            title={HOME.consulting.title}
            body={HOME.consulting.body}
          />
        </div>
        <div className="container">
          <CapabilityList services={SERVICES} />
        </div>
      </section>

      {/* HOW we work — one connected pathway */}
      <section className="section section--light" aria-labelledby="approach-title">
        <div className="container">
          <SectionHeading
            id="approach-title"
            eyebrow={HOME.approach.eyebrow}
            title={HOME.approach.title}
            body={HOME.approach.body}
          />
        </div>
        <div className="container">
          <ApproachTrack steps={APPROACH} />
        </div>
      </section>

      {/* Our operating journey */}
      <section className="section section--soft-green" aria-labelledby="journey-title">
        <div className="container">
          <SectionHeading
            id="journey-title"
            eyebrow={HOME.journey.eyebrow}
            title={HOME.journey.title}
            body={HOME.journey.body}
          />
        </div>
        <div className="container">
          <JourneyTimeline
            milestones={JOURNEY}
            moreHref="/company"
            moreLabel="Explore our full journey"
          />
        </div>
      </section>

      <CTA
        title={HOME.closing.title}
        body={HOME.closing.body}
        routes={HOME.closing.routes}
      />
    </>
  );
}
