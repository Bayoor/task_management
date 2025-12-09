import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Task, TaskStatus } from '@/types/task';
import { TaskCard } from './TaskCard';
import { STATUS_COLUMNS } from '@utils/constants';
import { cn } from '@utils/helpers';

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskColumn = ({ status, tasks, onEdit, onDelete }: TaskColumnProps) => {
  const { setNodeRef } = useDroppable({ id: status });
  const column = STATUS_COLUMNS[status];

  return (
    <div className="flex min-h-[500px] w-full flex-col">
      <div
        className={cn(
          'mb-4 rounded-lg p-3',
          column.color
        )}
      >
        <h3 className="font-semibold">
          {column.title}
          <span className="ml-2 text-sm opacity-75">
            ({tasks.length})
          </span>
        </h3>
      </div>

      <div ref={setNodeRef} className="flex-1">
        <SortableContext
          items={tasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
