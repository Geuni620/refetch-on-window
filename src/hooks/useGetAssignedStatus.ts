import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/utils/supabase';

type Props = {
  id: string;
};

type Response = {
  status_name: string;
};

const getAssignedStatus = async ({ id }: Props): Promise<Response> => {
  const { data, error } = await supabase
    .from('tasks_rls')
    .select('status_name')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useGetAssignedStatus = ({ id }: Props) => {
  return useQuery({
    queryFn: () => getAssignedStatus({ id }),
    queryKey: ['assignedStatus', id],
    enabled: !!id,
  });
};
