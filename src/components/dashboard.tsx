import { DropDownMenu } from '@/components/dropdown';
import { Package2Icon } from '@/components/icons';
import { PageSize } from '@/components/pageSize';

import { useLogin } from '@/hooks/useLogin';
import { usePagination } from '@/hooks/usePagination';

import { columns } from '@/lib/table/columns';
import { DataTable } from '@/lib/table/data-table';
import { DialogComponents as Dialog } from '@/components/dialog';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import type { TaskProps } from '@/hooks/useTaskGetQuery';

export function Dashboard() {
  const { onLogoutClick } = useLogin();
  const { pagination, onPaginationChange, onPageSizeChange } = usePagination();
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      const { pageIndex, pageSize } = pagination;
      const start = pageIndex * pageSize;
      const end = start + pageSize - 1;

      const { data, count, error } = await supabase
        .from('tasks_rls')
        .select('*', { count: 'exact' })
        .order('id', { ascending: true })
        .range(start, end);

      if (error) {
        console.error('Error fetching tasks:', error);
        return;
      }

      console.log('coutb', count);

      setTasks(data);
      setTotalCount(count ?? 0);
    };

    fetchTasks();
  }, [pagination.pageIndex, pagination.pageSize]);

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
            data={tasks || []}
            total={totalCount ?? 0}
            columns={columns}
            pagination={pagination}
            onPaginationChange={onPaginationChange}
          />
        </div>
      </main>
    </div>
  );
}
