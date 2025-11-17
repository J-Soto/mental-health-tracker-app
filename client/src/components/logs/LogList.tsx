// client/src/components/logs/LogList.tsx
import React, { useState, useMemo } from 'react';
import { useLogs } from '../../hooks/useLogs';
import { usePagination, PageSize } from '../../hooks/usePagination';
import { LogItem } from './LogItem';
import { LogListControls } from './LogListControls';
import { PaginationControls } from './PaginationControls';

type SortOrder = 'desc' | 'asc';

export const LogList: React.FC = () => {
  const { logs, isLoading, error } = useLogs();
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(3);

  const sortedLogs = useMemo(() => {
    if (!logs) return [];
    
    return [...logs].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [logs, sortOrder]);

  const { paginatedItems, totalPages, pageNumbers } = usePagination({
    items: sortedLogs,
    currentPage,
    pageSize
  });

  const handlePageSizeChange = (newSize: PageSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  if (isLoading) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <p className="text-indigo-600 font-semibold">Loading previous logs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg shadow-md border border-red-300">
        <p className="text-red-700 font-semibold">Error loading logs. Please make sure the server is running.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-xl font-bold text-gray-800">
          Previous Logs ({sortedLogs.length})
        </h2>
        
        {sortedLogs.length > 0 && (
          <LogListControls
            pageSize={pageSize}
            sortOrder={sortOrder}
            onPageSizeChange={handlePageSizeChange}
            onToggleSort={toggleSortOrder}
          />
        )}
      </div>
      
      {sortedLogs.length === 0 ? (
        <div className="text-center p-8 bg-yellow-50 rounded-lg shadow-md border border-yellow-300">
          <p className="text-yellow-700 font-semibold">You don't have any daily logs yet. Add your first log!</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {paginatedItems.map((log) => (
              <LogItem key={log.id} log={log} />
            ))}
          </div>

          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              pageNumbers={pageNumbers}
              onPageChange={setCurrentPage}
            />
          )}

          <p className="text-center text-sm text-gray-600 mt-4">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedLogs.length)} of {sortedLogs.length} logs
          </p>
        </>
      )}
    </div>
  );
};