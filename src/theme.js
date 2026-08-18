/* Theme is stored under one key and applied to <html data-theme>. The initial
   value is set by an inline script in index.html so there is no flash.
   Default is DARK: the landing experience is dark unless the visitor has
   chosen otherwise, and that choice persists across pages and visits. */
export const THEME_KEY = 'farmreach-theme';

export const DEFAULT_THEME = 'dark';

export function readTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch (e) { /* storage unavailable */ }
  return DEFAULT_THEME;
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  try { window.localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignore */ }
}
