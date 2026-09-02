import React from 'react';
import ComingSoonPage from '../bird/components/ComingSoonPage.jsx';
import { AnalyticsIcon } from '../bird/icons.jsx';

export const meta = {
  path: '/bird/analytics',
  title: 'Analytics — BIRD',
  description: 'Pattern and trend analysis across crops, farmers, products and locations. Coming soon to BIRD.'
};

export default function BirdAnalytics() {
  return (
    <ComingSoonPage
      navTitle="Analytics"
      icon={<AnalyticsIcon className="bird-soon__icon" />}
      heading="Data Insights"
      description="Pattern and trend analysis across crops, farmers, products and locations."
    />
  );
}
