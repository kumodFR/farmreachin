import React from 'react';
import { SITE, FARMINSTA_URL } from '../data/site.js';
import { Link, ExternalMark } from '../router.jsx';

/* External links only render when a real URL is configured; nothing is invented. */
function Ext({ href, children }) {
  if (!href) return <span className="site-footer__pending">{children} <em>(URL to confirm)</em></span>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <span className="nav__ext">{children} <ExternalMark /></span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer on-ink">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <img src="/assets/img/farmreach-logo-mono.png" alt={SITE.name} width="151" height="42" style={{ width: '151px', height: 'auto' }} loading="lazy" />
            <p className="site-footer__brandline">{SITE.positioning}.</p>
            <p className="site-footer__social">
              <Ext href={SITE.social.linkedin}>Farmreach LinkedIn</Ext>
              <Ext href={SITE.social.facebook}>Farmreach Facebook</Ext>
            </p>
          </div>

          <div>
            <h2>Navigation</h2>
            <div className="site-footer__links">
              <Link to="/farmreach-os">Farmreach OS</Link>
              <Ext href={FARMINSTA_URL}>Farminsta OS</Ext>
              <Link to="/consulting">Consulting &amp; Transformation</Link>
              <Link to="/company">Our Story</Link>
              <Link to="/recognition">Recognition</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h2>Business</h2>
            <div className="site-footer__links">
              <Link to="/farmreach-os">Public Enterprise</Link>
              <Ext href={FARMINSTA_URL}>Private Enterprise</Ext>
              <Link to="/consulting">Consulting</Link>
              <Link to="/company">Careers</Link>
            </div>
          </div>

          <div>
            <h2>Contact</h2>
            <address>
              {SITE.registeredAddress}<br />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
              <a href={`tel:${SITE.phone.replace(/\s+/g, '')}`}>{SITE.phone}</a>
            </address>
            <p className="site-footer__group">
              <span className="site-footer__grouplabel">Group / advisory</span>
              <Ext href={SITE.xpeditionUrl}>Xpedition Labs</Ext>
            </p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>&copy; {new Date().getFullYear()} {SITE.legalName}</span>
          <span className="site-footer__legal">
            <Link to="/terms">Terms of Use</Link>
            <Link to="/privacy">Privacy &amp; Data Protection</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
