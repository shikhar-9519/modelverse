import React, { useState } from 'react';

const FilterComponent = ({ showAllModels, setShowAllModels, searchText, setSearchText}) => {

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="filter-component">
      <input
        type="text"
        placeholder="Search Models"
        value={searchText}
        onChange={handleSearchChange}
      />
      <button onClick={()=>setShowAllModels(!showAllModels)}>{showAllModels ? 'Show Featured Models' : 'Show All Models'}</button>
    </div>
  );
};

export default FilterComponent;
