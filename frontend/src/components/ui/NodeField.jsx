import React from 'react';
import { cn } from 'lib/utils';

export function NodeField({ label, children, className }) {
  return (
    <label className={cn("flex flex-col gap-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider", className)}>
      {label}
      {children}
    </label>
  );
}
