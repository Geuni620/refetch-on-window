// import { type PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

export type Pagination = {
  pageIndex: number;
  pageSize: number;
};

export type OnChangeFn<T> = (updaterOrValue: T | ((prevState: T) => T)) => void;

export const usePagination = () => {
  const [pagination, setPagination] = useState<Pagination>({
    pageIndex: 0,
    pageSize: 20,
  });

  const onPageSizeChange = (pageSize: number) => {
    setPagination((prev) => {
      return {
        ...prev,
        pageSize,
      };
    });
  };

  return {
    pagination,
    onPaginationChange: setPagination,
    onPageSizeChange: onPageSizeChange,
  };
};
