import React from 'react';
import { Link } from '../router.jsx';

export const meta = {
  path: '/404',
  title: 'Page not found — Farmreach Technologies',
  description: 'This page could not be found. Use the navigation to reach Farmreach OS, Advisory, Our Story, Recognition, Gallery or Contact.'
};

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: '56vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <p className="eyebrow">404</p>
        <h1 style={{ maxWidth: '20ch' }}>That page is not part of the system.</h1>
        <p className="lead" style={{ marginTop: 'var(--space-md)' }}>
          The link may be old, or the page may have moved. These four routes cover the whole site.
        </p>
        <div className="btn-row" style={{ marginTop: 'var(--space-lg)' }}>
          <Link to="/" className="btn btn--primary">Home <span className="btn__arrow" aria-hidden="true">&rarr;</span></Link>
          <Link to="/farmreach-os" className="btn btn--secondary">Farmreach OS <span className="btn__arrow" aria-hidden="true">&rarr;</span></Link>
          <Link to="/consulting" className="btn btn--secondary">Advisory <span className="btn__arrow" aria-hidden="true">&rarr;</span></Link>
          <Link to="/contact" className="btn btn--secondary">Contact <span className="btn__arrow" aria-hidden="true">&rarr;</span></Link>
        </div>
      </div>
    </section>
  );
}
