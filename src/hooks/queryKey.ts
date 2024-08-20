type props = {
  page: number;
  size: number;
  search: string;
};

export const TASK = 'tasks_rls';

export const taskKeys = {
  all: [{ task: TASK }] as const,
  task: ({ page, size, search }: props) =>
    [
      {
        ...taskKeys.all[0],
        page,
        size,
        search,
      },
    ] as const,
};
