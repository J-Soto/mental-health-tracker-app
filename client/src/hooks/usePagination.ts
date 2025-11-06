import { useMemo } from 'react';

export type PageSize = 3 | 5 | 10 | 15 | 20;

interface UsePaginationProps<T> {
  items: T[];
  currentPage: number;
  pageSize: PageSize;
}

interface UsePaginationReturn<T> {
  paginatedItems: T[];
  totalPages: number;
  pageNumbers: (number | string)[];
}

export const usePagination = <T,>({ 
  items, 
  currentPage, 
  pageSize 
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const totalPages = Math.ceil(items.length / pageSize);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, pageSize]);

  const pageNumbers = useMemo(() => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l !== undefined) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }, [totalPages, currentPage]);

  return { paginatedItems, totalPages, pageNumbers };
};