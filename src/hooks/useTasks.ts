import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '@services/api/taskApi';
import type { Task, TaskFormData } from '@/types/task';
import { toast } from 'sonner';

export const useTasks = () => {
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: taskApi.getTasks,
  });

  const createMutation = useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task created successfully!');
    },
    onError: () => {
      toast.error('Failed to create task');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) =>
      taskApi.updateTask(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

      queryClient.setQueryData<Task[]>(['tasks'], old =>
        old ? old.map(task => (task.id === id ? { ...task, ...data } : task)) : []
      );

      return { previousTasks };
    },
    onSuccess: () => {
      toast.success('Task updated successfully!');
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
      toast.error('Failed to update task');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: taskApi.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete task');
    },
  });

  const createTask = (task: TaskFormData) => createMutation.mutate(task);
  const updateTask = (id: string, data: Partial<Task>) =>
    updateMutation.mutate({ id, data });
  const deleteTask = (id: string) => deleteMutation.mutate(id);

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
