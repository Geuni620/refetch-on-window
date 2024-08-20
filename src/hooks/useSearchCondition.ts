import { useState } from 'react';

export const useSearchCondition = () => {
  const [search, setSearch] = useState('');

  const onSearchChange = (newValue: string) => {
    setSearch(newValue);
  };

  return {
    search,
    onSearchChange,
  };
};
