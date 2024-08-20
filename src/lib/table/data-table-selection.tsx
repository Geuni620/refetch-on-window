import { type Table } from '@tanstack/react-table';

type DataTableSelectionProps<TData> = {
  table: Table<TData>;
};

const PAGE_SIZE_OPTIONS = [
  {
    value: 20,
    label: '20개씩 보기',
  },
  {
    value: 50,
    label: '50개씩 보기',
  },
  {
    value: 100,
    label: '100개씩 보기',
  },
];

export const DataTableSelection = <TData,>({
  table,
}: DataTableSelectionProps<TData>) => {
  return (
    <select
      className="my-2 rounded-[4px] border-DEFAULT py-1 pl-2 pr-9 text-sm"
      value={table.getState().pagination.pageSize}
      onChange={(e) => {
        table.setPageSize(Number(e.target.value));
      }}
    >
      {PAGE_SIZE_OPTIONS.map(({ value, label }) => (
        <option key={label} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
