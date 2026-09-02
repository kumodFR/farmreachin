import React from 'react';
import FilterSelect from './FilterSelect.jsx';

export default function ProductFilter({ value, options, onChange }) {
  return (
    <FilterSelect
      label="Product"
      value={value}
      options={options}
      onChange={onChange}
      allLabel="All Products"
      searchable
    />
  );
}
