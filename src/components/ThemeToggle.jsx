import React, { useEffect, useState } from 'react';
import { readTheme, applyTheme } from '../theme.js';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => { setTheme(readTheme()); }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-pressed={theme === 'dark'}
      title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
        </svg>
      )}
      <span className="vh">{theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}</span>
    </button>
  );
}
