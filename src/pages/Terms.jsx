import React from 'react';
import LegalDocument from '../components/LegalDocument.jsx';
import { TERMS } from '../data/legal.js';

export const meta = { path: TERMS.path, ...TERMS.meta };

export default function Terms() {
  return <LegalDocument doc={TERMS} />;
}
