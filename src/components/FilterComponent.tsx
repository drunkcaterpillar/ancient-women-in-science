// src/components/FilterComponent.tsx
import React from "react";
import "./FilterComponent.css";

interface FilterComponentProps {
  onFilterChange: (filter: string) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  onFilterChange,
}) => {
  return (
    <div className="filter-container">
      <select
        className="vintage-dropdown"
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="all">All</option>
        <option value="mathematics">Mathematics</option>
        <option value="science">Science</option>
        <option value="technology">Technology</option>
        <option value="engineering">Engineering</option>
      </select>
    </div>
  );
};

export default FilterComponent;
