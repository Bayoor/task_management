import type { TaskPriority, TaskStatus } from '@/types/task';

export const TASK_STATUSES: { label: string; value: TaskStatus }[] = [
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Done', value: 'done' },
];

export const TASK_PRIORITIES: { label: string; value: TaskPriority }[] = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Urgent', value: 'urgent' },
];

export const PRIORITY_COLORS: Record<TaskPriority, string> = {
  low: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700',
  high: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700',
  urgent: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700',
};

export const STATUS_COLUMNS: Record<
  TaskStatus,
  { title: string; color: string }
> = {
  todo: { title: 'To Do', color: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100' },
  'in-progress': { title: 'In Progress', color: 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' },
  done: { title: 'Done', color: 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100' },
};
