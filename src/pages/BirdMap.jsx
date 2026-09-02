import React from 'react';
import ComingSoonPage from '../bird/components/ComingSoonPage.jsx';
import { MapIcon } from '../bird/icons.jsx';

export const meta = {
  path: '/bird/map',
  title: 'Map — BIRD',
  description: 'Interactive geographic intelligence for agricultural data. Coming soon to BIRD.'
};

export default function BirdMap() {
  return (
    <ComingSoonPage
      navTitle="Map"
      icon={<MapIcon className="bird-soon__icon" />}
      heading="Map Intelligence"
      description="Interactive geographic intelligence for agricultural data."
    />
  );
}
