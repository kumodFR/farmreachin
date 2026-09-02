import React from 'react';

/* Leaflet's SVG renderer sets stroke/fill as inline presentation attributes,
   which don't reliably resolve CSS custom properties across browsers — so
   these mirror the exact hex values of --brand-accent / --brand-light from
   tokens.css rather than reading the variables. Keep the two in sync if the
   brand palette ever changes. */
const PALETTE = {
  light: { line: '#016F3B', activeLine: '#016F3B', activeFill: 'rgba(1, 111, 59, 0.10)' },
  dark: { line: '#3FA96F', activeLine: '#3FA96F', activeFill: 'rgba(63, 169, 111, 0.14)' }
};

/* Real state polygons (see /public/data/india-states.geojson and the
   dissolve step that produced it) — never a fabricated outline. Only the
   active filter's state gets emphasis; the rest stay a quiet reference
   line so the data points remain the visual focus. */
export default function BoundaryLayer({ RL, data, activeState, isDark }) {
  const palette = isDark ? PALETTE.dark : PALETTE.light;

  const styleFor = (feature) => {
    const isActive = activeState && activeState !== 'all' && feature.properties.name === activeState;
    return {
      color: isActive ? palette.activeLine : palette.line,
      weight: isActive ? 2 : 1,
      opacity: isActive ? 0.85 : 0.35,
      fill: true,
      fillColor: isActive ? palette.activeFill : 'transparent',
      fillOpacity: isActive ? 1 : 0,
      interactive: false
    };
  };

  return <RL.GeoJSON key={activeState} data={data} style={styleFor} />;
}
