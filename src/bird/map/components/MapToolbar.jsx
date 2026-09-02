import React from 'react';
import DateFilter from './DateFilter.jsx';
import GeographyFilter from './GeographyFilter.jsx';
import TeamMarketFilter from './TeamMarketFilter.jsx';
import ProductFilter from './ProductFilter.jsx';
import LayerControl from './LayerControl.jsx';
import MapViewSelector from './MapViewSelector.jsx';
import { FilterIcon } from '../../icons.jsx';

/* The primary filter bar — deliberately just four controls plus the two
   escape hatches (Filters drawer, Layers). Everything with a larger future
   vocabulary (district, crop, farmer segment, …) lives behind "Filters",
   never added here directly. */
export default function MapToolbar({
  view, onChangeView,
  filters, vocabulary, onChangeFilter,
  advancedCount, onOpenAdvanced,
  layers, onToggleLayer
}) {
  return (
    <div className="bird-toolbar">
      <MapViewSelector value={view} onChange={onChangeView} />

      <div className="bird-toolbar__filters">
        <DateFilter
          datePreset={filters.datePreset}
          dateRange={filters.dateRange}
          onChange={(datePreset, dateRange) => onChangeFilter({ datePreset, dateRange })}
        />
        <GeographyFilter
          value={filters.state}
          options={vocabulary.states}
          onChange={(state) => onChangeFilter({ state })}
        />
        <TeamMarketFilter
          value={filters.team}
          options={vocabulary.teams}
          onChange={(team) => onChangeFilter({ team })}
        />
        <ProductFilter
          value={filters.product}
          options={vocabulary.products}
          onChange={(product) => onChangeFilter({ product })}
        />
        <button type="button" className="bird-filter__btn bird-filter__btn--icon" onClick={onOpenAdvanced}>
          <FilterIcon className="bird-filter__icon" />
          <span className="bird-filter__value">Filters{advancedCount ? ` (${advancedCount})` : ''}</span>
        </button>
      </div>

      <LayerControl value={layers} onToggle={onToggleLayer} />
    </div>
  );
}
