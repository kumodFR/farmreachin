import React from 'react';
import GeoVisual from './GeoVisual.jsx';
import { Link } from '../router.jsx';
import { HOME } from '../data/content.js';

export default function Hero() {
  const { kicker, headline, paragraph } = HOME.hero;
  return (
    <section className="hero">
      <span className="hero__bg" aria-hidden="true" />
      <span className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__kicker">{kicker}</p>
          <h1>{headline}</h1>
          <p>{paragraph}</p>
          <div className="btn-row">
            <Link to="/farmreach-os" className="btn btn--primary">
              Explore Farmreach OS <span className="btn__arrow" aria-hidden="true">&rarr;</span>
            </Link>
            <Link to="/consulting" className="btn btn--secondary">
              Explore Advisory <span className="btn__arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="hero__visual">
          <GeoVisual stats />
        </div>
      </div>
    </section>
  );
}
