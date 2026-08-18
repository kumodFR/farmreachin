import React from 'react';
import { INDIA_PATH, NODES, MERIDIANS, PARALLELS, ACTIVITY_DOTS, LINK_PATHS, layerOf } from '../data/geo.js';
import { MAP_CALLOUTS, MAP_ANNOTATIONS } from '../data/heroMetrics.js';

/* India's agricultural operating ecosystem, drawn as geography.
   The viewBox carries headroom on every side, so the complete country —
   Jammu & Kashmir, Ladakh and the north-east — is always in frame. Ecosystem
   layers are told apart by mark and annotated in place; the connecting lines
   are the technology-and-data layer. Metric callouts are pinned around the map
   as part of the visual, not collected into a statistics block. */

function Grid({ className }) {
  return (
    <g className={className}>
      {MERIDIANS.map((x) => <line key={`m${x}`} x1={x} y1="10" x2={x} y2="990" />)}
      {PARALLELS.map((y) => <line key={`p${y}`} x1="10" y1={y} x2="890" y2={y} />)}
    </g>
  );
}

/* One small mark per ecosystem layer. Sizes are in viewBox units. */
function LayerMark({ layer, r, hot }) {
  const s = r * 1.9;
  const core = hot ? 'geo__node-core geo__node-core--hot' : 'geo__node-core';
  if (layer === 'government') {
    return <rect className="geo__mark" x={-s} y={-s} width={s * 2} height={s * 2} />;
  }
  if (layer === 'enterprise') {
    return <rect className="geo__mark" x={-s} y={-s} width={s * 2} height={s * 2} transform="rotate(45)" />;
  }
  if (layer === 'market') {
    return <path className="geo__mark" d={`M${-s},${s * 0.8} L0,${-s * 1.1} L${s},${s * 0.8} Z`} />;
  }
  if (layer === 'advisory') {
    return <circle className="geo__mark" r={s * 0.95} />;
  }
  if (layer === 'field') {
    return (
      <>
        <circle className={core} r={r * 0.75} />
        <circle className="geo__mark" r={r * 2.1} />
      </>
    );
  }
  return <circle className={core} r={r} />;
}

export default function GeoVisual({ callouts = true }) {
  return (
    <figure className="geo-figure">
      <svg
        className="geo"
        viewBox="-20 -40 940 1080"
        role="img"
        aria-label="Map of India showing Farmreach's agricultural operating ecosystem: farmer and field activity clusters across twenty states, with government, enterprise, market and advisory nodes connected by data links"
      >
        <defs>
          <radialGradient id="geoNode" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="geoFill" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="var(--geo-fill-a)" />
            <stop offset="100%" stopColor="var(--geo-fill-b)" />
          </linearGradient>
          <clipPath id="geoClip"><path d={INDIA_PATH} /></clipPath>
        </defs>

        <Grid className="geo__grid" />
        <g clipPath="url(#geoClip)"><Grid className="geo__grid-inner" /></g>

        <path className="geo__outline" d={INDIA_PATH} pathLength="1000" />

        {/* field activity at scale, abstracted rather than plotted */}
        <g className="geo__dust" clipPath="url(#geoClip)">
          {ACTIVITY_DOTS.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} />)}
        </g>

        {/* technology and data: the connecting layer */}
        <g>
          {LINK_PATHS.map((d, i) => (
            <path key={i} className="geo__link" d={d} style={{ '--i': i }} />
          ))}
        </g>

        {NODES.map(([name, state, w, x, y], i) => {
          const layer = layerOf(name);
          return (
            <g
              key={name}
              className={`geo__node geo__node--${layer}${w <= 1 ? ' geo__node--minor' : ''}`}
              style={{ '--i': i }}
              transform={`translate(${x} ${y})`}
            >
              <circle className="geo__halo" r={(8 + w * 5.5).toFixed(1)} fill="url(#geoNode)" />
              <LayerMark layer={layer} r={1.3 + w * 0.42} hot={w >= 3} />
              {w >= 4 ? (
                <circle className="geo__pulse" r={(9 + w * 2).toFixed(0)} fill="none" strokeWidth="0.9" />
              ) : null}
            </g>
          );
        })}

        {/* ecosystem layers annotated in place, on the map itself */}
        <g className="geo-annotations">
          {MAP_ANNOTATIONS.map((a, i) => {
            const dir = a.side === 'right' ? 1 : -1;
            const dy = a.dy || 0;
            return (
              <g className="geo-annotation" key={a.layer} style={{ '--i': i }}>
                <polyline
                  className="geo-annotation__leader"
                  points={`${a.x + dir * 6},${a.y} ${a.x + dir * 22},${a.y + dy} ${a.x + dir * 32},${a.y + dy}`}
                />
                <text
                  className="geo-annotation__label"
                  x={a.x + dir * 38}
                  y={a.y + dy + 5}
                  textAnchor={a.side === 'right' ? 'start' : 'end'}
                >
                  {a.name.toUpperCase()}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {callouts ? MAP_CALLOUTS.map((m) => (
        <figcaption className={`geo-callout geo-callout--${m.tier} geo-callout--${m.pos}`} key={m.label}>
          <span className="geo-callout__value">{m.value}</span>
          <span className="geo-callout__label">{m.label}</span>
          {m.note ? <span className="geo-callout__note">{m.note}</span> : null}
        </figcaption>
      )) : null}
    </figure>
  );
}
