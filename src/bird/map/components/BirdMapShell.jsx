import React, { useEffect, useMemo, useState } from 'react';
import MapToolbar from './MapToolbar.jsx';
import MapCanvas from './MapCanvas.jsx';
import MapKpiSummary from './MapKpiSummary.jsx';
import UserDetailPanel from './UserDetailPanel.jsx';
import ActivityDetailPanel from './ActivityDetailPanel.jsx';
import AdvancedFilterDrawer from './AdvancedFilterDrawer.jsx';
import EmptyState from './EmptyState.jsx';
import { getCompanyCountry, getFilterVocabulary, getLiveViewData } from '../dataSource.js';
import { ACTIVITY_TYPES, DATE_PRESETS, activityTypeByKey } from '../config.js';

/* Country → boundary source lookup. Only India exists today; adding a
   second country is one more entry here, never a code change to the map
   itself — the country to look up comes from getCompanyCountry(), never
   from a hard-coded assumption in this component. */
const BOUNDARY_SOURCES = { IN: '/data/india-states.geojson' };

const DEFAULT_FILTERS = { datePreset: 'today', dateRange: null, state: 'all', team: 'all', product: 'all' };
const DEFAULT_ADVANCED = { status: 'all', activityTypes: ACTIVITY_TYPES.map((t) => t.key) };
const DEFAULT_LAYERS = { users: true, activities: true, routes: false, boundaries: true, radius: false };

function useIsDarkTheme() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const read = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

export default function BirdMapShell() {
  const isDark = useIsDarkTheme();

  const [country, setCountry] = useState(null);
  const [boundaryData, setBoundaryData] = useState(null);
  const [vocabulary, setVocabulary] = useState({ states: [], teams: [], products: [] });

  const [view, setView] = useState('live');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [advanced, setAdvanced] = useState(DEFAULT_ADVANCED);
  const [layers, setLayers] = useState(DEFAULT_LAYERS);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [selection, setSelection] = useState(null);
  const [radiusKm, setRadiusKm] = useState(5);
  const [focusBounds, setFocusBounds] = useState(null);

  const [rawData, setRawData] = useState({ users: [], activities: [] });
  const [periodBaseline, setPeriodBaseline] = useState({ activities: [] });

  /* Company/country resolution runs once — see dataSource.getCompanyCountry
     for why this is never allowed to assume India outside local dev. */
  useEffect(() => {
    let alive = true;
    getCompanyCountry().then((ctx) => {
      if (!alive) return;
      setCountry(ctx);
      const url = BOUNDARY_SOURCES[ctx.countryCode];
      if (url) fetch(url).then((r) => r.json()).then((d) => { if (alive) setBoundaryData(d); });
    });
    getFilterVocabulary().then((v) => { if (alive) setVocabulary(v); });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    let alive = true;
    getLiveViewData(filters).then((d) => { if (alive) setRawData(d); });
    getLiveViewData({ ...filters, state: 'all', team: 'all', product: 'all' }).then((d) => {
      if (alive) setPeriodBaseline(d);
    });
    return () => { alive = false; };
  }, [filters]);

  /* Advanced (status / activity type) filtering happens client-side over
     whatever the primary filters already narrowed down — a real backend
     would fold this into the same query; V1 keeps it a light local pass. */
  const displayedUsers = useMemo(() => {
    if (advanced.status === 'all') return rawData.users;
    return rawData.users.filter((u) => u.status === advanced.status);
  }, [rawData.users, advanced.status]);

  const displayedActivities = useMemo(() => {
    const userIds = new Set(displayedUsers.map((u) => u.id));
    const typeFiltered = advanced.activityTypes.length === ACTIVITY_TYPES.length
      ? rawData.activities
      : rawData.activities.filter((a) => advanced.activityTypes.includes(a.type));
    return typeFiltered.filter((a) => userIds.has(a.userId));
  }, [rawData.activities, advanced.activityTypes, displayedUsers]);

  const advancedCount =
    (advanced.status !== 'all' ? 1 : 0) +
    (advanced.activityTypes.length !== ACTIVITY_TYPES.length ? 1 : 0);

  const selectedUser = selection?.type === 'user' ? displayedUsers.find((u) => u.id === selection.id) : null;
  const selectedActivity = selection?.type === 'activity' ? displayedActivities.find((a) => a.id === selection.id) : null;
  const selectedUserActivities = selectedUser
    ? displayedActivities.filter((a) => a.userId === selectedUser.id)
    : [];
  const selectedUserTypeLabels = [...new Set(selectedUserActivities.map((a) => activityTypeByKey(a.type).label))];

  const emptyMessage = displayedUsers.length === 0
    ? 'No active users today'
    : periodBaseline.activities.length === 0
      ? 'No activities submitted for the selected period'
      : displayedActivities.length === 0
        ? 'No matching activity'
        : null;

  const patchFilters = (patch) => { setFilters((f) => ({ ...f, ...patch })); setSelection(null); };
  const toggleLayer = (key) => setLayers((l) => ({ ...l, [key]: !l[key] }));

  const handleSelectUser = (id) => setSelection((s) => (s?.type === 'user' && s.id === id ? null : { type: 'user', id }));
  const handleSelectActivity = (id) => setSelection((s) => (s?.type === 'activity' && s.id === id ? null : { type: 'activity', id }));
  const clearSelection = () => setSelection(null);

  const handleFocusUserActivity = () => {
    if (!selectedUserActivities.length) return;
    const lats = selectedUserActivities.map((a) => a.location.lat).concat(selectedUser.home.lat);
    const lngs = selectedUserActivities.map((a) => a.location.lng).concat(selectedUser.home.lng);
    setFocusBounds([[Math.min(...lats), Math.min(...lngs)], [Math.max(...lats), Math.max(...lngs)]]);
  };

  const dateLabel = DATE_PRESETS.find((p) => p.key === filters.datePreset)?.label.toUpperCase() || 'TODAY';

  return (
    <div className="bird-mapshell">
      <MapToolbar
        view={view}
        onChangeView={setView}
        filters={filters}
        vocabulary={vocabulary}
        onChangeFilter={patchFilters}
        advancedCount={advancedCount}
        onOpenAdvanced={() => setAdvancedOpen(true)}
        layers={layers}
        onToggleLayer={toggleLayer}
      />

      <div className="bird-mapshell__stage">
        {view === 'live' ? (
          <>
            <MapCanvas
              bounds={focusBounds || country?.bounds}
              users={displayedUsers}
              activities={displayedActivities}
              layers={layers}
              selection={selection}
              onSelectUser={handleSelectUser}
              onSelectActivity={handleSelectActivity}
              onBackgroundClick={clearSelection}
              radiusKm={radiusKm}
              boundaryData={boundaryData}
              activeState={filters.state}
              isDark={isDark}
            />

            <MapKpiSummary
              dateLabel={dateLabel}
              onlineCount={displayedUsers.filter((u) => u.status === 'online').length}
              activityCount={displayedActivities.length}
            />

            <EmptyState message={emptyMessage} />

            {selectedUser ? (
              <UserDetailPanel
                user={selectedUser}
                todayCount={selectedUserActivities.length}
                todayTypeLabels={selectedUserTypeLabels}
                onClose={clearSelection}
                onFocusActivity={handleFocusUserActivity}
                radiusOn={layers.radius}
                radiusKm={radiusKm}
                onSetRadius={(km) => {
                  if (km == null) { setLayers((l) => ({ ...l, radius: false })); }
                  else { setRadiusKm(km); setLayers((l) => ({ ...l, radius: true })); }
                }}
                routesOn={layers.routes}
                onToggleRoutes={() => toggleLayer('routes')}
              />
            ) : null}

            {selectedActivity ? (
              <ActivityDetailPanel
                activity={selectedActivity}
                user={rawData.users.find((u) => u.id === selectedActivity.userId)}
                onClose={clearSelection}
                onSelectUser={() => handleSelectUser(selectedActivity.userId)}
              />
            ) : null}
          </>
        ) : (
          <div className="bird-soon bird-soon--map">
            <h2 className="bird-soon__heading">Historical View</h2>
            <p className="bird-soon__desc">Date-range playback of past users, activities and routes.</p>
            <span className="bird-soon__badge">Coming Soon</span>
            <p className="bird-soon__note">This view is being prepared for the next BIRD release.</p>
          </div>
        )}
      </div>

      <AdvancedFilterDrawer
        open={advancedOpen}
        onClose={() => setAdvancedOpen(false)}
        value={advanced}
        onApply={(next) => { setAdvanced(next); setAdvancedOpen(false); }}
        onClearAll={() => { setAdvanced(DEFAULT_ADVANCED); setAdvancedOpen(false); }}
      />
    </div>
  );
}
