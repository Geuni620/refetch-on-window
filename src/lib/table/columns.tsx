import { type ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
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
    accessorKey: 'task',
    header: '작업',
    cell: ({ row }) => {
      return row.getValue('task');
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
