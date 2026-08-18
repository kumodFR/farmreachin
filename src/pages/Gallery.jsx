import React from 'react';
import PageHead from '../components/PageHead.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import GalleryGrid from '../components/GalleryGrid.jsx';
import CTA from '../components/CTA.jsx';
import { GALLERY } from '../data/gallery.js';

export const meta = {
  path: '/gallery',
  title: 'Gallery — Farmreach Technologies',
  description: "Photographs from Farmreach Technologies' programmes, field operations, events, partnerships and milestones since 2016."
};

export default function Gallery() {
  return (
    <>
      <PageHead
        eyebrow="Gallery"
        title={GALLERY.hero.title}
        lede={GALLERY.hero.lede}
        crumb="Gallery"
      />

      <section className="section section--soft-green" aria-labelledby="gallery-title">
        <div className="container">
          <SectionHeading
            id="gallery-title"
            eyebrow={GALLERY.intro.eyebrow}
            title={GALLERY.intro.title}
            body={GALLERY.intro.body}
          />
        </div>
        <div className="container">
          <GalleryGrid items={GALLERY.items} />
        </div>
      </section>

      <CTA
        title={GALLERY.closing.title}
        body={GALLERY.closing.body}
        primary={{ href: '/contact', label: 'Talk to us' }}
      />
    </>
  );
}
