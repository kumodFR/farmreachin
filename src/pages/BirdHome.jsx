import React from 'react';
import { useRouter } from '../router.jsx';
import AppShell from '../bird/components/AppShell.jsx';
import { MapIcon, AnalyticsIcon, ReportsIcon, SettingsIcon } from '../bird/icons.jsx';

export const meta = {
  path: '/bird',
  title: 'BIRD — Farminsta Map BI',
  description: 'BIRD turns agricultural data into geographic, business-ready intelligence.'
};

const CAPABILITIES = [
  { icon: MapIcon, title: 'Map Intelligence', body: 'Visualize agricultural information geographically.' },
  { icon: AnalyticsIcon, title: 'Data Insights', body: 'Understand patterns across crops, farmers, products and locations.' },
  { icon: ReportsIcon, title: 'Business Visibility', body: 'Turn field-level information into meaningful business insights.' },
  { icon: SettingsIcon, title: 'Decision Support', body: 'Identify opportunities, gaps and priority areas.' }
];

export default function BirdHome() {
  const { navigate } = useRouter();

  return (
    <AppShell title="Home">
      <section className="bird-hero">
        <p className="eyebrow">BIRD</p>
        <h2 className="bird-hero__title">Agricultural Intelligence, On the Map</h2>
        <p className="bird-hero__lede">
          BIRD helps you understand agricultural data geographically and turn
          location-based information into actionable insights.
        </p>
        <button type="button" className="btn btn--primary" onClick={() => navigate('/bird/map')}>
          Explore Map BI <span className="btn__arrow" aria-hidden="true">&rarr;</span>
        </button>
      </section>

      <section className="bird-caps">
        {CAPABILITIES.map(({ icon: Icon, title, body }) => (
          <div className="bird-caps__item" key={title}>
            <Icon className="bird-caps__icon" />
            <h3 className="bird-caps__title">{title}</h3>
            <p className="bird-caps__body">{body}</p>
          </div>
        ))}
      </section>

      <section className="bird-more">
        <h3 className="bird-more__title">More intelligence is coming to BIRD</h3>
        <p className="bird-more__body">
          Map analytics, advanced reports and deeper agricultural insights will
          be introduced progressively.
        </p>
      </section>
    </AppShell>
  );
}
