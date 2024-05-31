// FilterBox.js
import React from 'react';

const FilterBox = ({ filter, setFilter }) => {
  return (
    <div className="filter-box">
      <input
        type="text"
        placeholder="Filter by title"
        value={filter.title}
        onChange={(e) => setFilter({ ...filter, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Filter by year"
        value={filter.year}
        onChange={(e) => setFilter({ ...filter, year: e.target.value })}
      />
      <input
        type="text"
        placeholder="Filter by type"
        value={filter.type}
        onChange={(e) => setFilter({ ...filter, type: e.target.value })}
      />
    </div>
  );
};

export default FilterBox;
