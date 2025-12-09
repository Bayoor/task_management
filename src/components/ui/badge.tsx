import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '@utils/helpers';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline';
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default:
        'border-transparent bg-[hsl(var(--color-primary))] text-[hsl(var(--color-primary-foreground))]',
      secondary:
        'border-transparent bg-[hsl(var(--color-secondary))] text-[hsl(var(--color-secondary-foreground))]',
      outline: 'text-[hsl(var(--color-foreground))]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-ring))] focus:ring-offset-2',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
