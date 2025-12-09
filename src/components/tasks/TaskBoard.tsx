import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import type { Task, TaskStatus } from '@/types/task';
import { TaskColumn } from './TaskColumn';
import { TaskCard } from './TaskCard';
import { useTasks } from '@hooks/useTasks';
import { LoadingSpinner } from '@components/common/LoadingSpinner';

interface TaskBoardProps {
  filteredTasks: Task[];
  onEdit: (task: Task) => void;
}

export const TaskBoard = ({ filteredTasks, onEdit }: TaskBoardProps) => {
  const { updateTask, deleteTask, isLoading } = useTasks();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const tasksByStatus = {
    todo: filteredTasks.filter(t => t.status === 'todo'),
    'in-progress': filteredTasks.filter(t => t.status === 'in-progress'),
    done: filteredTasks.filter(t => t.status === 'done'),
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = filteredTasks.find(t => t.id === event.active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const taskId = active.id as string;
      const newStatus = over.id as TaskStatus;
      updateTask(taskId, { status: newStatus });
    }

    setActiveTask(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
        <TaskColumn
          status="todo"
          tasks={tasksByStatus.todo}
          onEdit={onEdit}
          onDelete={deleteTask}
        />
        <TaskColumn
          status="in-progress"
          tasks={tasksByStatus['in-progress']}
          onEdit={onEdit}
          onDelete={deleteTask}
        />
        <TaskColumn
          status="done"
          tasks={tasksByStatus.done}
          onEdit={onEdit}
          onDelete={deleteTask}
        />
      </div>

      <DragOverlay>
        {activeTask ? (
          <TaskCard
            task={activeTask}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
