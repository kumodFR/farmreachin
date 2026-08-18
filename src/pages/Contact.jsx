import React from 'react';
import PageHead from '../components/PageHead.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Reveal from '../components/Reveal.jsx';
import { CONTACT } from '../data/content.js';
import { SITE } from '../data/site.js';

export const meta = {
  path: '/contact',
  title: 'Contact — Farmreach Technologies',
  description: 'Tell us what you are looking to change and we will route your enquiry to the right Farmreach team.'
};

export default function Contact() {
  const office = CONTACT.office;

  return (
    <>
      <PageHead
        eyebrow="Contact"
        title={CONTACT.hero.title}
        lede={CONTACT.hero.lede}
        crumb="Contact"
      />

      <section className="section section--soft-green">
        <div className="container enquiry">
          <Reveal className="enquiry__form">
            <p className="eyebrow">Enquiry</p>
            <ContactForm />
          </Reveal>

          <Reveal className="enquiry__aside">
            <p className="eyebrow">Direct</p>
            <address className="enquiry__direct">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
              <a href={`tel:${SITE.phone.replace(/\s+/g, '')}`}>{SITE.phone}</a>
            </address>
            <p className="enquiry__note">{CONTACT.asideNote}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container office">
          <Reveal className="office__detail">
            <p className="eyebrow">Our Office</p>
            <h2 className="office__title">{office.title}</h2>
            <address className="office__address">
              {office.lines.map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}
            </address>
          </Reveal>

          <Reveal className="office__map">
            <div className="office__mapWrap">
              <iframe
                className="office__mapFrame"
                title="Farmreach office location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&output=embed`}
              />
              {/* The geocoded marker sits at the embed's centre; this invisible
                  hit area makes the pin itself the link, adding no new UI. */}
              <a
                className="office__mapPin"
                href={office.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open the Farmreach office location in Google Maps"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
