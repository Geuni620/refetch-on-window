import type { RowSelectionState, Updater } from '@tanstack/react-table';
import camelcaseKeys from 'camelcase-keys';
import { useEffect, useState } from 'react';

import { StatusChangeConfirmModal } from '@/components/StatusChangeConfirmModal';
import { Button } from '@/components/ui/button';
import { usePagination } from '@/hooks/usePagination';
import type { TaskProps } from '@/hooks/useTaskGetQuery';
import { columns } from '@/lib/table/columns';
import { DataTable } from '@/lib/table/data-table';
import { supabase } from '@/utils/supabase';
import { useGetAssignedStatus } from '@/hooks/useGetAssignedStatus';

export function Dashboard() {
  const { pagination, onPaginationChange } = usePagination();
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const status = useGetAssignedStatus({ id: selectedId });

  const resetRowSelection = () => {
    setRowSelection({});
  };

  const onRowSelectionChange = (updater: Updater<RowSelectionState>) => {
    setRowSelection(updater);
  };

  const onAssignStatusChange = async (
    taskIds: string[],
    status_name: string,
  ) => {
    setIsUpdating(true);

    try {
      const { data, error } = await supabase
        .from('tasks_rls')
        .update({ status_name })
        .in('id', taskIds)
        .select();

      if (error) {
        console.error('Error updating tasks:', error);
        return;
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          const updatedTask = data.find((t) => t.id === task.id);
          return updatedTask ? { ...task, ...updatedTask } : task;
        }),
      );
      setRowSelection({});

      console.log(`Successfully updated ${data.length} tasks.`);
    } catch (error) {
      console.error('Error updating tasks:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const fetchTasks = async () => {
      const start = pagination.pageIndex * pagination.pageSize;
      const end = start + pagination.pageSize - 1;

      try {
        const { data, count, error } = await supabase
          .from('tasks_rls')
          .select('*', { count: 'exact' })
          .order('id', { ascending: true })
          .range(start, end);

        if (error) {
          console.error('Error fetching tasks:', error);
          return;
        }

        if (!ignore) {
          setTasks(camelcaseKeys(data, { deep: true }));
          setTotalCount(count ?? 0);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
    return () => {
      ignore = true;
    };
  }, [pagination.pageIndex, pagination.pageSize, isUpdating]);

  useEffect(() => {
    const selectedId = Object.keys(rowSelection).at(0);
    if (selectedId) {
      setSelectedId(selectedId);
    }
  });

  return (
    <div className="rounded-lg border p-2 shadow-sm">
      <div className="flex w-full items-center justify-end gap-2 p-2">
        <Button
          onClick={() => {
            onAssignStatusChange(Object.keys(rowSelection), 'assigned');
          }}
        >
          할당
        </Button>

        <Button
          onClick={() => {
            setIsModalOpen((prev) => !prev);
          }}
        >
          확인
        </Button>
      </div>
      <DataTable
        rowSelection={rowSelection}
        onRowSelectionChange={onRowSelectionChange}
        data={tasks || []}
        total={totalCount ?? 0}
        columns={columns}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
      />

      {isModalOpen && status.isLoading === false && (
        <StatusChangeConfirmModal
          id={selectedId ?? ''}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            resetRowSelection();
          }}
        />
      )}
    </div>
  );
}
