import React from 'react';
import ComingSoonPage from '../bird/components/ComingSoonPage.jsx';
import { ReportsIcon } from '../bird/icons.jsx';

export const meta = {
  path: '/bird/reports',
  title: 'Reports — BIRD',
  description: 'Structured reporting across agricultural operations. Coming soon to BIRD.'
};

export default function BirdReports() {
  return (
    <ComingSoonPage
      navTitle="Reports"
      icon={<ReportsIcon className="bird-soon__icon" />}
      heading="Business Reporting"
      description="Structured reporting across your agricultural operations."
    />
  );
}
