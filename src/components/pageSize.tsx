import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type PageSizeProps = {
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
};

const pageSizeOptions = [
  { value: '20', label: '20개씩 보기' },
  { value: '50', label: '50개씩 보기' },
  { value: '100', label: '100개씩 보기' },
];

export const PageSize: React.FC<PageSizeProps> = ({
  pageSize,
  onPageSizeChange,
}) => {
  return (
    <Select onValueChange={(value) => onPageSizeChange(Number(value))}>
      {/* FIXME: outline 제거 */}
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`${pageSize}개씩 보기`} />
      </SelectTrigger>
      <SelectContent>
        {pageSizeOptions.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
