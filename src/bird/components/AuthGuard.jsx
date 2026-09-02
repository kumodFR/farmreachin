import React, { useEffect, useState } from 'react';
import { useRouter } from '../../router.jsx';
import { isAuthenticated } from '../auth.js';

/* Client-side gate only — there is no backend yet (see auth.js), so this
   cannot be a real security boundary: it hides the shell from casual
   navigation, it does not protect data, because no page here holds any real
   data to protect (see the "no hardcoded business data" rule for BIRD v1).
   When a real auth API exists, this becomes a server-checked redirect.

   Server-rendered markup has no localStorage, so it always renders the
   protected page on first paint (there is nothing sensitive in it) — the
   client's first render must match that exactly or React logs a hydration
   mismatch, so `authed` starts true on both sides. An effect then checks the
   real session right after mount: authenticated visitors see no change,
   unauthenticated ones get redirected to /login on the next tick. */
export default function AuthGuard({ children }) {
  const { navigate } = useRouter();
  const [authed, setAuthed] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      setAuthed(false);
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return authed ? children : null;
}
