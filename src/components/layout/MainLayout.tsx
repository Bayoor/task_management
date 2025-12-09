import { useState } from 'react';
import { Header } from './Header';
import { TaskBoard } from '@components/tasks/TaskBoard';
import { TaskForm } from '@components/tasks/TaskForm';
import { useTasks } from '@hooks/useTasks';
import { useDebounce } from '@hooks/useDebounce';
import { useTaskStore } from '@store/taskStore';
import type { Task, TaskFormData } from '@/types/task';
import { Input } from '@components/ui/input';
import { Search } from 'lucide-react';

export const MainLayout = () => {
  const { tasks, createTask, updateTask } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const { filters, setSearch } = useTaskStore();

  const debouncedSearch = useDebounce(filters.search, 300);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      !debouncedSearch ||
      task.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      task.description?.toLowerCase().includes(debouncedSearch.toLowerCase());

    return matchesSearch;
  });

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleSubmit = (data: TaskFormData) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      createTask(data);
    }
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--color-background))]">
      <Header onCreateTask={handleCreateTask} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--color-muted-foreground))]" />
            <Input
              placeholder="Search tasks..."
              value={filters.search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-[hsl(var(--color-background))] p-6">
              <h2 className="mb-4 text-xl font-semibold text-[hsl(var(--color-foreground))]">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              <TaskForm
                task={editingTask}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>
          </div>
        )}

        <TaskBoard filteredTasks={filteredTasks} onEdit={handleEditTask} />
      </main>
    </div>
  );
};
