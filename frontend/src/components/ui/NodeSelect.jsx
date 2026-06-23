import React from 'react';
import { cn } from 'lib/utils';

const fieldBaseStyles =
  "nodrag w-full rounded-md border border-input px-2.5 py-1.5 text-xs bg-background text-foreground shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring";

export function NodeSelect({ children, className, ...props }) {
  return (
    <select
      className={cn(
        fieldBaseStyles,
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
