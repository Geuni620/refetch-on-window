export const getPageNumbers = (
  currentPage: number,
  totalPage: number,
): number[] => {
  if (currentPage <= 0) {
    throw new Error('현재 페이지는 0보다 커야 합니다.');
  }

  const getCase = (): string => {
    if (totalPage === 0) return 'default';
    if (currentPage === 1) return 'first';
    if (currentPage === 2) return 'second';
    if (currentPage <= totalPage - 2) return 'middle';
    if (currentPage === totalPage - 1) return 'secondLast';
    if (currentPage >= totalPage) return 'last';
    return 'default';
  };

  let startPage: number, length: number;
  switch (getCase()) {
    case 'first':
      startPage = 1;
      length = Math.min(3, totalPage);
      break;
    case 'second':
      startPage = 1;
      length = Math.min(4, totalPage);
      break;
    case 'middle':
      startPage = currentPage - 2;
      length = 5;
      break;
    case 'secondLast':
      startPage = totalPage - 3;
      length = 4;
      break;
    case 'last':
      startPage = totalPage - 2;
      length = 3;
      break;
    default:
      return [1];
  }

  return Array.from({ length }, (_, i) => startPage + i);
};
