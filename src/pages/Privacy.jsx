import React from 'react';
import LegalDocument from '../components/LegalDocument.jsx';
import { PRIVACY } from '../data/legal.js';

export const meta = { path: PRIVACY.path, ...PRIVACY.meta };

export default function Privacy() {
  return <LegalDocument doc={PRIVACY} />;
}
