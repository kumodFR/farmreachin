/* Theme is stored under one key and applied to <html data-theme>. The initial
   value is set by an inline script in index.html so there is no flash.
   A stored choice (from the toggle) always wins and persists across pages and
   visits. Without one, the site follows the browser/system theme, and is
   LIGHT when the system expresses no preference. */
export const THEME_KEY = 'farmreach-theme';

export const DEFAULT_THEME = 'light';

const DARK_QUERY = '(prefers-color-scheme: dark)';

function storedTheme() {
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch (e) { /* storage unavailable */ }
  return null;
}

function systemTheme() {
  return window.matchMedia && window.matchMedia(DARK_QUERY).matches ? 'dark' : DEFAULT_THEME;
}

export function readTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  return storedTheme() || systemTheme();
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  try { window.localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignore */ }
}

/* Follow live system theme changes while no choice is stored. Returns an
   unsubscribe function. */
export function watchSystemTheme(onChange) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const mq = window.matchMedia(DARK_QUERY);
  const handler = () => {
    if (storedTheme()) return;
    const theme = systemTheme();
    document.documentElement.setAttribute('data-theme', theme);
    onChange(theme);
  };
  mq.addEventListener('change', handler);
  return () => mq.removeEventListener('change', handler);
}
