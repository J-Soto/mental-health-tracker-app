import React from 'react';
import { TimeFilter, TIME_FILTERS } from '../../constants/timeFilters';

interface TimeFilterSelectorProps {
  value: TimeFilter;
  onChange: (filter: TimeFilter) => void;
}

export const TimeFilterSelector: React.FC<TimeFilterSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-600">Period:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TimeFilter)}
        className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm p-2 border font-medium"
      >
        {TIME_FILTERS.map(filter => (
          <option key={filter.value} value={filter.value}>
            {filter.label}
          </option>
        ))}
      </select>
    </div>
  );
};