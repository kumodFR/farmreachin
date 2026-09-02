import React from 'react';
import AppShell from '../bird/components/AppShell.jsx';
import BirdMapShell from '../bird/map/components/BirdMapShell.jsx';

export const meta = {
  path: '/bird/map',
  title: 'Map — BIRD',
  description: 'Live geographic view of field users and activity.'
};

export default function BirdMap() {
  return (
    <AppShell title="Map" fullBleed>
      <BirdMapShell />
    </AppShell>
  );
}
