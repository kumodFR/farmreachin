import React from 'react';

/* Line icons matching the site's existing stroke style (ThemeToggle,
   ExternalMark in router.jsx): viewBox 0 0 24 24, stroke="currentColor",
   strokeWidth ~1.6, no fill. Kept in one file so BIRD's icon language stays
   consistent as modules are added. */

const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, 'aria-hidden': true };

export function HomeIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 11.5 12 4l8 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v9h12v-9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 19v-5h4v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MapIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M9 4.5 4 6.5v13l5-2 6 2 5-2v-13l-5 2-6-2Z" strokeLinejoin="round" />
      <path d="M9 4.5v13M15 6.5v13" />
    </svg>
  );
}

export function AnalyticsIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20V4" strokeLinecap="round" />
      <path d="M4 20h16" strokeLinecap="round" />
      <path d="M7.5 17v-5M12 17V8.5M16.5 17v-8" strokeLinecap="round" />
    </svg>
  );
}

export function ReportsIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3.5h7l3.5 3.5V20a.7.7 0 0 1-.7.7H7A.7.7 0 0 1 6.3 20V4.2A.7.7 0 0 1 7 3.5Z" strokeLinejoin="round" />
      <path d="M14 3.5V7h3.5" strokeLinejoin="round" />
      <path d="M9 12.5h6M9 15.5h6M9 9.5h2.5" strokeLinecap="round" />
    </svg>
  );
}

export function SettingsIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13.8a1.8 1.8 0 0 0 .36 1.98l.06.06a2.2 2.2 0 1 1-3.1 3.1l-.06-.06a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.08 1.64V20.5a2.2 2.2 0 0 1-4.4 0v-.1a1.8 1.8 0 0 0-1.18-1.63 1.8 1.8 0 0 0-1.98.36l-.06.06a2.2 2.2 0 1 1-3.1-3.1l.06-.06a1.8 1.8 0 0 0 .36-1.98 1.8 1.8 0 0 0-1.64-1.08H3.5a2.2 2.2 0 0 1 0-4.4h.1a1.8 1.8 0 0 0 1.63-1.18 1.8 1.8 0 0 0-.36-1.98l-.06-.06a2.2 2.2 0 1 1 3.1-3.1l.06.06a1.8 1.8 0 0 0 1.98.36H10a1.8 1.8 0 0 0 1.08-1.64V3.5a2.2 2.2 0 0 1 4.4 0v.1a1.8 1.8 0 0 0 1.08 1.64 1.8 1.8 0 0 0 1.98-.36l.06-.06a2.2 2.2 0 1 1 3.1 3.1l-.06.06a1.8 1.8 0 0 0-.36 1.98v.1a1.8 1.8 0 0 0 1.64 1.08h.1a2.2 2.2 0 0 1 0 4.4h-.1a1.8 1.8 0 0 0-1.64 1.08Z" strokeLinejoin="round" />
    </svg>
  );
}

export function ProfileIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8.2" r="3.4" />
      <path d="M4.8 19.5a7.2 7.2 0 0 1 14.4 0" strokeLinecap="round" />
    </svg>
  );
}

export function LogoutIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M9 4.5H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 15.5 20 12l-4-3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 12H9.5" strokeLinecap="round" />
    </svg>
  );
}

export function MenuIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6.5h16M4 12h16M4 17.5h16" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 5.5 18.5 18.5M18.5 5.5 5.5 18.5" strokeLinecap="round" />
    </svg>
  );
}

export function CollapseIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M9.5 4.5v15" />
      <path d="M6.5 10.2 5 12l1.5 1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CalendarIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronDownIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 9.5 12 15l6-5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FilterIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5.5h16L14 13v6l-4 2v-8L4 5.5Z" strokeLinejoin="round" />
    </svg>
  );
}

export function LayersIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="m12 4 8.5 4.8L12 13.6 3.5 8.8 12 4Z" strokeLinejoin="round" />
      <path d="m3.5 12.8 8.5 4.8 8.5-4.8" strokeLinejoin="round" />
      <path d="m3.5 16.8 8.5 4.8 8.5-4.8" strokeLinejoin="round" />
    </svg>
  );
}

export function TargetIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" strokeLinecap="round" />
    </svg>
  );
}

export function RouteIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="5.5" cy="6" r="2" />
      <circle cx="18.5" cy="18" r="2" />
      <path d="M7.2 7.2 12 12l1.8 1.8" strokeLinecap="round" />
      <path d="M5.5 8v4a3 3 0 0 0 3 3h7a3 3 0 0 1 3 3" strokeLinecap="round" strokeDasharray="1.5 3" />
    </svg>
  );
}

export function SearchIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m19.5 19.5-4.6-4.6" strokeLinecap="round" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UsersGroupIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19a5.6 5.6 0 0 1 11 0" strokeLinecap="round" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M15.5 12.3a4.4 4.4 0 0 1 5 4.4" strokeLinecap="round" />
    </svg>
  );
}

export function ActivityPulseIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 12h4l2-6 4 12 2-6h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ICONS = {
  home: HomeIcon,
  map: MapIcon,
  analytics: AnalyticsIcon,
  reports: ReportsIcon,
  settings: SettingsIcon
};

export function NavIcon({ name, ...rest }) {
  const Cmp = ICONS[name] || HomeIcon;
  return <Cmp {...rest} />;
}
