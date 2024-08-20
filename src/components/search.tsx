import { SearchIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';

type SearchProps = {
  search: string;
  onSearchChange: (search: string) => void;
};

export const Search: React.FC<SearchProps> = ({ search, onSearchChange }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="ml-auto flex-1 sm:flex-initial">
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 size-4 text-gray-500 dark:text-gray-400" />
        <Input
          className="bg-white pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          placeholder="Search orders..."
          type="search"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};
