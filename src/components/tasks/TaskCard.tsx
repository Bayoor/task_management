import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '@/types/task';
import { Card, CardContent } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Calendar, GripVertical, Pencil, Trash2 } from 'lucide-react';
import { PRIORITY_COLORS } from '@utils/constants';
import { formatDate, isOverdue } from '@utils/dateUtils';
import { cn } from '@utils/helpers';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card
        className={cn(
          'mb-3 cursor-pointer transition-shadow hover:shadow-md',
          isDragging && 'opacity-50'
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-[hsl(var(--color-foreground))]">
                {task.title}
              </h4>
              {task.description && (
                <p className="mt-1 text-sm text-[hsl(var(--color-muted-foreground))]">
                  {task.description}
                </p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge className={PRIORITY_COLORS[task.priority]}>
                  {task.priority}
                </Badge>

                {task.dueDate && (
                  <div
                    className={cn(
                      'flex items-center gap-1 text-xs',
                      isOverdue(task.dueDate)
                        ? 'text-red-600'
                        : 'text-[hsl(var(--color-muted-foreground))]'
                    )}
                  >
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(task.dueDate)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="ml-2 flex items-start gap-1">
              <button
                {...listeners}
                className="cursor-grab p-1 text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]"
              >
                <GripVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-end gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(task)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
