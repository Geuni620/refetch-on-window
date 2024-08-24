import { type ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { type TaskProps } from '@/hooks/useTaskGetQuery';

export const columns: ColumnDef<TaskProps>[] = [
  {
    accessorKey: 'done',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="전체 선택"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="행 선택"
      />
    ),
  },
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div>{row.original.id}</div>,
  },
  {
    accessorKey: 'task',
    header: '작업',
    cell: ({ row }) => {
      const TaskCell = () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="link"
                className="h-auto p-0 font-normal text-blue-500 underline hover:text-blue-700"
              >
                {row.getValue('task')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{row.getValue('task')}</DialogTitle>
              </DialogHeader>
              <p>상태: {row.getValue('statusName')}</p>
            </DialogContent>
          </Dialog>
        );
      };

      return <TaskCell />;
    },
  },
  {
    accessorKey: 'statusName',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('statusName');
      const isAssigned = status === 'assigned';

      return (
        <span
          className={`rounded-full px-2 py-1 text-center text-xs font-semibold ${
            isAssigned
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {isAssigned ? '할당' : '미할당'}
        </span>
      );
    },
  },
];
