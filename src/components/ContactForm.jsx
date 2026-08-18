import React, { useRef, useState } from 'react';
import { SITE } from '../data/site.js';
import {
  ENQUIRY_ROUTES, LIMITS, CONFIRMATION, HONEYPOT_FIELD,
  normaliseEnquiry, validateEnquiry
} from '../lib/enquiry.js';

const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', autoComplete: 'name', full: true },
  { name: 'email', label: 'Work email', type: 'email', autoComplete: 'email' },
  { name: 'organisation', label: 'Organisation', type: 'text', autoComplete: 'organization' },
  { name: 'route', label: 'Enquiry route', type: 'select' },
  { name: 'region', label: 'State or region', type: 'text', autoComplete: 'address-level1' }
];

/* The form posts to a server-side endpoint; no provider keys or internal
   recipients exist in this bundle. Validation mirrors the server rules. */
export default function ContactForm() {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const startedAt = useRef(Date.now());

  const validateField = (name, value) => {
    const single = validateEnquiry(normaliseEnquiry({ [name]: value }))[name] || '';
    setErrors((prev) => ({ ...prev, [name]: single }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const entries = Object.fromEntries(new FormData(form).entries());
    const data = normaliseEnquiry(entries);
    const next = validateEnquiry(data);
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus(null);
      const first = form.elements[Object.keys(next)[0]];
      if (first && first.focus) first.focus();
      return;
    }

    if (sending) return;
    const payload = {
      ...data,
      [HONEYPOT_FIELD]: entries[HONEYPOT_FIELD] || '',
      elapsedMs: Date.now() - startedAt.current
    };

    /* No endpoint configured (design review builds): confirm without sending. */
    if (!SITE.contactEndpoint) {
      setSent(true);
      setStatus({ ok: true, message: CONFIRMATION });
      return;
    }

    setSending(true);
    try {
      const res = await fetch(SITE.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        setSent(true);
        setStatus({ ok: true, message: body.message || CONFIRMATION });
      } else {
        if (body.errors) setErrors(body.errors);
        setStatus({ ok: false, message: body.error || 'Something went wrong while sending your enquiry. Please try again.' });
      }
    } catch {
      setStatus({ ok: false, message: 'Something went wrong while sending your enquiry. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="enquiry__done" role="status" aria-live="polite">
        <p className="eyebrow">Enquiry received</p>
        <p className="enquiry__doneText">{status ? status.message : CONFIRMATION}</p>
        <button
          className="btn btn--ghost"
          type="button"
          onClick={() => { setSent(false); setStatus(null); setErrors({}); startedAt.current = Date.now(); }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {FIELDS.map((f) => (
        <div className={`field${f.full ? ' field--full' : ''}`} data-invalid={Boolean(errors[f.name])} key={f.name}>
          <label htmlFor={`c-${f.name}`}>{f.label}</label>
          {f.type === 'select' ? (
            <select
              id={`c-${f.name}`}
              name={f.name}
              required
              defaultValue=""
              onChange={(ev) => validateField(f.name, ev.target.value)}
            >
              <option value="">Select one</option>
              {ENQUIRY_ROUTES.map((r) => <option value={r} key={r}>{r}</option>)}
            </select>
          ) : (
            <input
              id={`c-${f.name}`}
              name={f.name}
              type={f.type}
              autoComplete={f.autoComplete}
              maxLength={LIMITS[f.name] || 160}
              required
              onBlur={(ev) => validateField(f.name, ev.target.value)}
            />
          )}
          <p className="field__error" aria-live="polite">{errors[f.name] || ''}</p>
        </div>
      ))}

      <div className="field field--full" data-invalid={Boolean(errors.message)}>
        <label htmlFor="c-message">What are you trying to change?</label>
        <textarea
          id="c-message"
          name="message"
          maxLength={LIMITS.message}
          required
          onBlur={(ev) => validateField('message', ev.target.value)}
        />
        <p className="field__error" aria-live="polite">{errors.message || ''}</p>
      </div>

      {/* Bot trap: hidden from people and from assistive technology. */}
      <div className="field--trap" aria-hidden="true">
        <label htmlFor={`c-${HONEYPOT_FIELD}`}>Website</label>
        <input id={`c-${HONEYPOT_FIELD}`} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status && !status.ok ? <p className="form__status form__status--error" role="alert">{status.message}</p> : null}

      <div className="form__actions">
        <button className="btn btn--primary" type="submit" disabled={sending}>
          Send Enquiry <span className="btn__arrow" aria-hidden="true">&rarr;</span>
        </button>
        <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>We reply within two working days.</span>
      </div>
    </form>
  );
}
