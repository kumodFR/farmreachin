import React from 'react';
import FilterSelect from './FilterSelect.jsx';

export default function GeographyFilter({ value, options, onChange }) {
  return (
    <FilterSelect
      label="State"
      value={value}
      options={options}
      onChange={onChange}
      allLabel="All States"
      searchable
    />
  );
}
