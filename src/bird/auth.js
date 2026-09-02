/* BIRD authentication — v1 local/demo implementation.

   This is the ONLY module that knows how a session is established, checked
   and cleared. Everything else (AuthGuard, LoginPage, ProfilePage) calls
   login() / getSession() / logout() and never touches localStorage or the
   credential list directly. Swapping this for a real API later means
   rewriting the bodies of these three functions — no other file changes. */

const SESSION_KEY = 'bird-session';

/* Placeholder credential, v1 only. Not a real user store — do not add more
   users here or treat this as user management. Replace this whole check with
   an API call when a real auth service is wired up. */
const DEMO_ACCOUNT = { email: 'demo@farmreach.in', password: 'Farminsta@2026' };

function readSession() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getSession() {
  return readSession();
}

export function isAuthenticated() {
  return Boolean(readSession());
}

export function login(email, password) {
  const trimmed = (email || '').trim();
  if (!trimmed || !password) {
    return { ok: false, error: 'Enter your email and password.' };
  }
  if (
    trimmed.toLowerCase() !== DEMO_ACCOUNT.email.toLowerCase() ||
    password !== DEMO_ACCOUNT.password
  ) {
    return { ok: false, error: 'Invalid email or password.' };
  }

  const session = { email: DEMO_ACCOUNT.email, name: 'Demo User', loggedInAt: Date.now() };
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    /* storage unavailable — session still returned so the caller can proceed
       for this tab; it just will not survive a reload. */
  }
  return { ok: true, session };
}

export function logout() {
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}
