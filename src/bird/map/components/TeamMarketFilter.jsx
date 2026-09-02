import React from 'react';
import FilterSelect from './FilterSelect.jsx';

export default function TeamMarketFilter({ value, options, onChange }) {
  return (
    <FilterSelect
      label="Team / Market"
      value={value}
      options={options}
      onChange={onChange}
      allLabel="All Teams / Markets"
      searchable
    />
  );
}
