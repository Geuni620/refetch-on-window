import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TASK, taskKeys } from '@/hooks/queryKey';
import { supabase } from '@/utils/supabase';

const assignTask = async ({ id, userId }: AssignMutationProps) => {
  const assignmentStatus = userId ? 'assigned' : 'unassigned';

  console.log('Attempting update with:', { userId, id, assignmentStatus });

  // 현재 상태 확인
  const { data, error } = await supabase
    .from(TASK)
    .update({
      status_name: assignmentStatus,
      user_id: userId,
    })
    .select('id, status_name, user_id');

  return data;
};

type AssignMutationProps = {
  id: string[];
  userId: string | undefined;
};

export const useAssignMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userId }: AssignMutationProps) =>
      assignTask({ id, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      toast.success('할당 되었습니다.');
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
