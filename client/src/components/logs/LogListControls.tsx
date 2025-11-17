import React from 'react';
import { PageSize } from '../../hooks/usePagination';

type SortOrder = 'desc' | 'asc';

interface LogListControlsProps {
  pageSize: PageSize;
  sortOrder: SortOrder;
  onPageSizeChange: (size: PageSize) => void;
  onToggleSort: () => void;
}

export const LogListControls: React.FC<LogListControlsProps> = ({
  pageSize,
  sortOrder,
  onPageSizeChange,
  onToggleSort
}) => {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Show:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value) as PageSize)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 border"
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        <span className="text-sm text-gray-600">per page</span>
      </div>

      <button
        onClick={onToggleSort}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
      >
        <span>Sort:</span>
        {sortOrder === 'desc' ? (
          <>
            <span>Newest First</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        ) : (
          <>
            <span>Oldest First</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};