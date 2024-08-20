import { type Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { getPageNumbers } from '@/lib/table/getPageNumbers';

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
};

export const DataTablePagination = <TData,>({
  table,
}: DataTablePaginationProps<TData>) => {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(page - 1)}
          disabled={currentPage === page}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  );
};
