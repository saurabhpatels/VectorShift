import React from 'react';
import { cn } from 'lib/utils';

export function NodeRadio({ label, className, ...props }) {
  return (
    <label className={cn("nodrag flex items-center gap-2 text-xs text-foreground cursor-pointer select-none py-1", className)}>
      <input
        type="radio"
        className="border-input text-primary bg-background focus:ring-primary focus:ring-offset-background h-4 w-4 transition-colors cursor-pointer"
        {...props}
      />
      {label && <span className="font-normal text-muted-foreground">{label}</span>}
    </label>
  );
}
