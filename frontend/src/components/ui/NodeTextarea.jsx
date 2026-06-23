import React from 'react';
import { cn } from 'lib/utils';

const fieldBaseStyles =
  "nodrag w-full rounded-md border border-input px-2.5 py-1.5 text-xs bg-background text-foreground shadow-sm transition-colors focus:outline-none focus:border-muted-foreground/60";

export function NodeTextarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        fieldBaseStyles,
        "resize-none",
        className
      )}
      {...props}
    />
  );
}
