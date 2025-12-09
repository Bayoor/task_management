import { Plus, Moon, Sun } from 'lucide-react';
import { Button } from '@components/ui/button';
import { useDarkMode } from '@hooks/useDarkMode';

interface HeaderProps {
  onCreateTask: () => void;
}

export const Header = ({ onCreateTask }: HeaderProps) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))]">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--color-foreground))]">
            Task Manager
          </h1>
          <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
            Organize your tasks efficiently
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="border-[hsl(var(--color-border))] text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-accent))] hover:text-[hsl(var(--color-accent-foreground))]"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button onClick={onCreateTask}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>
    </header>
  );
};
