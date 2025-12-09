import { useState, useEffect } from 'react';
import type { Task, TaskFormData } from '@/types/task';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { TASK_STATUSES, TASK_PRIORITIES } from '@utils/constants';

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
}

export const TaskForm = ({ task, onSubmit, onCancel }: TaskFormProps) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate || '',
      });
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-[hsl(var(--color-foreground))]">Title</label>
        <Input
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter task title"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-[hsl(var(--color-foreground))]">Description</label>
        <textarea
          value={formData.description}
          onChange={e =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter task description"
          className="flex min-h-[80px] w-full rounded-md border border-[hsl(var(--color-input))] bg-transparent px-3 py-2 text-sm text-[hsl(var(--color-foreground))] ring-offset-[hsl(var(--color-background))] placeholder:text-[hsl(var(--color-muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-ring))] focus-visible:ring-offset-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-[hsl(var(--color-foreground))]">Status</label>
          <select
            value={formData.status}
            onChange={e =>
              setFormData({ ...formData, status: e.target.value as any })
            }
            className="flex h-10 w-full rounded-md border border-[hsl(var(--color-input))] bg-[hsl(var(--color-background))] px-3 py-2 text-sm text-[hsl(var(--color-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-ring))]"
          >
            {TASK_STATUSES.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[hsl(var(--color-foreground))]">Priority</label>
          <select
            value={formData.priority}
            onChange={e =>
              setFormData({ ...formData, priority: e.target.value as any })
            }
            className="flex h-10 w-full rounded-md border border-[hsl(var(--color-input))] bg-[hsl(var(--color-background))] px-3 py-2 text-sm text-[hsl(var(--color-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-ring))]"
          >
            {TASK_PRIORITIES.map(priority => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-[hsl(var(--color-foreground))]">Due Date</label>
        <Input
          type="date"
          value={formData.dueDate}
          onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{task ? 'Update' : 'Create'} Task</Button>
      </div>
    </form>
  );
};
