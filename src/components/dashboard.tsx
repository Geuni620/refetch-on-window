import { useDebounce } from '@uidotdev/usehooks';

import { DropDownMenu } from '@/components/dropdown';
import { Package2Icon } from '@/components/icons';
import { PageSize } from '@/components/pageSize';
import { Search } from '@/components/search';

import { useLogin } from '@/hooks/useLogin';
import { usePagination } from '@/hooks/usePagination';
import { useSearchCondition } from '@/hooks/useSearchCondition';
import { useTaskGetQuery } from '@/hooks/useTaskGetQuery';
import { columns } from '@/lib/table/columns';
import { DataTable } from '@/lib/table/data-table';
import { DialogComponents as Dialog } from '@/components/dialog';

export function Dashboard() {
  const { onLogoutClick } = useLogin();
  const { pagination, onPaginationChange, onPageSizeChange } = usePagination();
  const { search, onSearchChange } = useSearchCondition();
  const debouncedSearch = useDebounce(search, 300);

  const tasks = useTaskGetQuery({
    page: pagination.pageIndex,
    size: pagination.pageSize,
    search: debouncedSearch,
  });

  console.log('task isLoading', tasks.isLoading);
  console.log('task isFetching', tasks.isFetching);

  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
        <a className="lg:hidden">
          <Package2Icon className="size-6" />
          <span className="sr-only">Home</span>
        </a>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Recent Orders</h1>
        </div>

        <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Search search={search} onSearchChange={onSearchChange} />
          <PageSize
            pageSize={pagination.pageSize}
            onPageSizeChange={onPageSizeChange}
          />
          <DropDownMenu onLogout={onLogoutClick} />
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="rounded-lg border p-2 shadow-sm">
          <Dialog />
          <DataTable
            data={tasks?.data?.result || []}
            total={tasks?.data?.count ?? 0}
            columns={columns}
            pagination={pagination}
            onPaginationChange={onPaginationChange}
            isLoading={tasks.isLoading}
          />
        </div>
      </main>
    </div>
  );
}
