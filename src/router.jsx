import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const RouterContext = createContext({ path: '/', navigate: () => {} });

export function useRouter() {
  return useContext(RouterContext);
}

/* Minimal history router. No dependency, SSR-safe: during prerender the path
   is passed in and no browser API is touched. */
export function RouterProvider({ initialPath = '/', children }) {
  const [path, setPath] = useState(initialPath);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname || '/');
    window.addEventListener('popstate', onPop);
    onPop();
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to) => {
    if (typeof window === 'undefined') return;
    if (to === window.location.pathname) return;
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo(0, 0);
  }, []);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export function Link({ to, external, children, className, ...rest }) {
  const { navigate } = useRouter();

  if (external) {
    return (
      <a className={className} href={to} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  const onClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
  };

  return (
    <a className={className} href={to} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}

export function ExternalMark() {
  return (
    <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M2.4 7.6 7.6 2.4M3.6 2.4h4v4" />
    </svg>
  );
}
