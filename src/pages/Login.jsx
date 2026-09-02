import React, { useState } from 'react';
import { Link } from '../router.jsx';

export const meta = {
  path: '/login',
  title: 'Sign In — Farmreach OS',
  description: 'Sign in to your Farmreach OS workspace.'
};

/* Skeleton only: no auth backend is wired up yet. The provider (managed vs
   custom) is still an open decision — see the branch notes. This gives the
   route, layout and form shell so the real sign-in logic can be dropped in
   without touching markup or styles. */
export default function Login() {
  const [status, setStatus] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus('Sign-in is not live yet — this screen is a placeholder while the Farmreach OS client portal is being built.');
  };

  return (
    <section className="section auth">
      <div className="container auth__wrap">
        <div className="auth__card">
          <p className="eyebrow">Farmreach OS</p>
          <h1 className="auth__title">Sign in to your account</h1>
          <p className="auth__lede">Access your Farmreach OS workspace.</p>

          <form className="form auth__form" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="login-email">Work email</label>
              <input id="login-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="field">
              <label htmlFor="login-password">Password</label>
              <input id="login-password" name="password" type="password" autoComplete="current-password" required />
            </div>

            {status ? <p className="form__status" role="status" aria-live="polite">{status}</p> : null}

            <div className="form__actions">
              <button className="btn btn--primary" type="submit">
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
  );
}
