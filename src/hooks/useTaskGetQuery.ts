import {
  keepPreviousData,
  QueryFunctionContext,
  useQuery,
} from '@tanstack/react-query';
import camelcaseKeys from 'camelcase-keys';
import { taskKeys, TASK } from '@/hooks/queryKey';

import { supabase } from '@/utils/supabase';

export type TaskProps = {
  date: string;
  done: boolean;
  id: string;
  notes: string;
  statusId: number;
  statusName: string;
  task: string;
  userId: string;
};

export type TaskResponse = {
  result: TaskProps[];
  count: number | null;
};

type props = {
  page: number;
  size: number;
  search: string;
};

// 총 몇개씩 가져올 것 인지 size
// 검색 조건에 따라 총 몇개의 데이터를 가져오는지 count가 있음
const fetchTask = async ({
  queryKey: [{ page, size, search }],
}: QueryFunctionContext<
  ReturnType<(typeof taskKeys)['task']>
>): Promise<TaskResponse> => {
  const start = page * size;
  const end = start + size - 1;

  let query = supabase
    .from(TASK)
    .select('*', {
      count: 'exact',
    })
    .order('id', { ascending: true })
    .range(start, end);

  if (search) {
    query = query.textSearch('task', search);
  }

  const { data, count, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return {
    result: camelcaseKeys(data, { deep: true }),
    count,
  };
};

export const useTaskGetQuery = ({ page, size, search }: props) => {
  return useQuery<
    TaskResponse,
    Error,
    TaskResponse,
    ReturnType<(typeof taskKeys)['task']>
  >({
    queryKey: taskKeys.task({
      page,
      search,
      size,
    }),
    queryFn: fetchTask,
    placeholderData: keepPreviousData,
    // staleTime: 60 * 1000 * 5, // 5min,
  });
};
