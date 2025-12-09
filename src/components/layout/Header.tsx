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
      <div className="container mx-auto flex h-16 md:h-16 items-center justify-between px-3 md:px-4">
        <div>
          <h1 className="text-base md:text-2xl font-bold text-[hsl(var(--color-foreground))]">
            Task Manager
          </h1>
          <p className="text-xs md:text-sm text-[hsl(var(--color-muted-foreground))]">
            Organize your tasks efficiently
          </p>
        </div>

        <div className="flex items-center gap-3 md:gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="border-[hsl(var(--color-border))] text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-accent))] hover:text-[hsl(var(--color-accent-foreground))] h-9 w-9 md:h-10 md:w-10"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 md:h-5 md:w-5" />
            ) : (
              <Moon className="h-4 w-4 md:h-5 md:w-5" />
            )}
          </Button>
          <Button onClick={onCreateTask} className="text-xs md:text-sm h-8 md:h-10 px-2 md:px-4">
            <Plus className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
            New Task
          </Button>
        </div>
      </div>
    </header>
  );
};
