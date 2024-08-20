import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';
import { taskKeys, TASK } from '@/hooks/queryKey';
import { createStatusMapper } from '@/utils/status-map';

export const TASK_STATUS = {
  'On Deck': { id: 1, name: 'On Deck' },
  'In Progress': { id: 2, name: 'In Progress' },
  Testing: { id: 3, name: 'Testing' },
  Deployed: { id: 4, name: 'Deployed' },
} as const;

type Task = Record<string, string>;

const addTask = async (task: Task) => {
  const statusId = createStatusMapper(TASK_STATUS, task.taskStatus);

  const { data, error } = await supabase.from(TASK).insert([
    {
      task: task.taskName,
      status_id: statusId,
      status_name: task.taskStatus,
      notes: task.taskNotes,
      date: new Date().toISOString(),
      done: false,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useTaskPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};
