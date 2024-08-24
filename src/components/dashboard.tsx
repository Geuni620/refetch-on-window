import camelcaseKeys from 'camelcase-keys';
import { useEffect, useState } from 'react';

import { DialogComponents as Dialog } from '@/components/dialog';
import { Package2Icon } from '@/components/icons';
import { useLogin } from '@/hooks/useLogin';
import { usePagination } from '@/hooks/usePagination';
import type { TaskProps } from '@/hooks/useTaskGetQuery';
import { columns } from '@/lib/table/columns';
import { DataTable } from '@/lib/table/data-table';
import { supabase } from '@/utils/supabase';

export function Dashboard() {
  const { session } = useLogin();
  const userId = session?.user.id;
  const { pagination, onPaginationChange } = usePagination();
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      const start = pagination.pageIndex * pagination.pageSize;
      const end = start + pagination.pageSize - 1;

      const { data, count, error } = await supabase
        .from('tasks_rls')
        .select('*', { count: 'exact' })
        .order('id', { ascending: true })
        .range(start, end);

      if (error) {
        console.error('Error fetching tasks:', error);
        return;
      }

      setTasks(camelcaseKeys(data, { deep: true }));
      setTotalCount(count ?? 0);
    };

    fetchTasks();
  }, [pagination.pageIndex, pagination.pageSize]);

  return (
    <div className="flex flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="rounded-lg border p-2 shadow-sm">
          <Dialog userId={userId} rowSelection={rowSelection} />
          <DataTable
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
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
