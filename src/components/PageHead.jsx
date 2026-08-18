import React from 'react';
import { Link } from '../router.jsx';

export default function PageHead({ eyebrow, title, lede, crumb, actions }) {
  return (
    <section className="page-head">
      <span className="page-head__bg" aria-hidden="true" />
      <div className="container page-head__inner">
        {crumb ? (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Farmreach</Link>
            <span aria-hidden="true">/</span>
            <span>{crumb}</span>
          </nav>
        ) : null}
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {lede ? <p className="page-head__lede">{lede}</p> : null}
        {actions ? <div className="btn-row" style={{ marginTop: 'var(--space-lg)' }}>{actions}</div> : null}
      </div>
    </section>
  );
}
