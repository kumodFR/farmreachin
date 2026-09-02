import React, { useEffect, useState } from 'react';
import { Link, useRouter } from '../router.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import { login, isAuthenticated } from '../bird/auth.js';

export const meta = {
  path: '/login',
  title: 'Sign In — BIRD',
  description: 'Sign in to BIRD, the Map BI product from Farminsta and Farmreach.'
};

/* v1 uses a local/demo credential check (see bird/auth.js) — there is no
   backend yet. That module is the entire seam: swap its body for a real API
   call later and this page does not change. */
export default function Login() {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  /* Already signed in (e.g. opened /login again in the same browser) —
     skip straight to BIRD instead of asking to log in twice. */
  useEffect(() => {
    if (isAuthenticated()) navigate('/bird');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }
    setSubmitting(true);
    const result = login(email, password);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate('/bird');
  };

  return (
    <div className="auth-page">
      <div className="auth-page__top">
        <Link to="/" className="auth-page__brand" aria-label="Farmreach — home">
          <img className="logo-img logo-img--ink" src="/assets/img/farmreach-logo.png" alt="Farmreach" width="140" height="39" />
          <img className="logo-img logo-img--mono" src="/assets/img/farmreach-logo-mono.png" alt="" aria-hidden="true" width="140" height="39" />
        </Link>
        <ThemeToggle />
      </div>

      <section className="section auth">
        <div className="container auth__wrap">
          <div className="auth__card">
            <p className="eyebrow">BIRD</p>
            <h1 className="auth__title">Sign in to BIRD</h1>
            <p className="auth__lede">Agricultural Map BI from Farminsta and Farmreach.</p>

            <form className="form auth__form" onSubmit={onSubmit} noValidate>
              <div className="field" data-invalid={Boolean(error)}>
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="field" data-invalid={Boolean(error)}>
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error ? (
                <p className="form__status form__status--error" role="alert">{error}</p>
              ) : null}

              <div className="form__actions">
                <button className="btn btn--primary" type="submit" disabled={submitting}>
                  Sign In <span className="btn__arrow" aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </form>

            <p className="auth__foot">
              Need access? <Link to="/contact" className="textlink">Contact us</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
