import React from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  pageNumbers: (number | string)[];
  onPageChange: (page: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  pageNumbers,
  onPageChange
}) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-6 p-4 bg-white rounded-lg shadow-md">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
      >
        Previous
      </button>
      
      <div className="flex gap-2">
        {pageNumbers.map((page, index) => (
          page === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className="w-10 h-10 flex items-center justify-center text-gray-500 font-semibold"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                currentPage === page
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          )
        ))}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
      >
        Next
      </button>
    </div>
  );
};