/* Metric callouts placed around the India map. Approved Farmreach figures only.
   `1B+` is derived, not counted: 50M+ GPS-tagged activities x ~20 data points
   per activity. Each entry names the corner of the map it is pinned to. */

export const MAP_CALLOUTS = [
  { pos: 'tl', tier: 'primary', value: '1B+', label: 'Data points', note: null },
  { pos: 'tr', tier: 'primary', value: '50M+', label: 'GPS-tagged field activities', note: null },
  { pos: 'ml', tier: 'secondary', value: '5M+', label: 'Farmers engaged', note: null },
  { pos: 'mr', tier: 'secondary', value: '5L+', label: 'Villages reached', note: null },
  { pos: 'ml2', tier: 'secondary', value: '14+ Cr', label: 'Operational farm holdings', note: null },
  { pos: 'mr2', tier: 'secondary', value: '20', label: 'States', note: null },
  { pos: 'bl', tier: 'secondary', value: '100+', label: 'Companies transformed', note: null },
  { pos: 'br', tier: 'secondary', value: '10K+', label: 'Field officers active daily', note: null },
  { pos: 'bc', tier: 'secondary', value: '21 days', label: 'To implementation', note: null }
];

/* Ecosystem layers annotated in place on the map, anchored to real node
   coordinates in the same projection. Technology & data is anchored to the
   connecting lines rather than to a node type. */
export const MAP_ANNOTATIONS = [
  { layer: 'government', name: 'Government', x: 395.9, y: 356.1, side: 'right', dy: -26 },
  { layer: 'farmer', name: 'Farmers', x: 246.1, y: 490, side: 'left', dy: 26 },
  { layer: 'tech', name: 'Technology & data', x: 614, y: 494.8, side: 'right', dy: 0 },
  { layer: 'enterprise', name: 'Enterprises', x: 187.3, y: 622.1, side: 'left', dy: 0 },
  { layer: 'market', name: 'Markets', x: 380.9, y: 690.3, side: 'right', dy: 0 },
  { layer: 'field', name: 'Field officers', x: 310.3, y: 705, side: 'left', dy: -28 },
  { layer: 'advisory', name: 'Advisory', x: 278.5, y: 850.5, side: 'left', dy: 0 }
];
