import { Handle } from 'reactflow';
import { cn } from 'lib/utils';
import { ArrowRight, Brain, ArrowLeft, Type, Globe, Database, GitBranch, Terminal } from 'lucide-react';

export const nodeIcons = {
  customInput: ArrowRight,
  llm: Brain,
  customOutput: ArrowLeft,
  text: Type,
  api: Globe,
  database: Database,
  conditional: GitBranch,
  python: Terminal,
};

// Shared base styles for all form controls (input, select, textarea)
const fieldBaseStyles =
  "nodrag w-full rounded-md border border-input px-2.5 py-1.5 text-xs bg-background text-foreground shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring";

export function GenericNode({
  id,
  type,
  title,
  handles = [],
  children,
  footer,
  className,
  ...props
}) {
  const Icon = nodeIcons[type];
  // Count how many handles are on each side of each type
  const sideCounts = {};
  handles.forEach((h) => {
    const key = `${h.type}-${h.position}`;
    sideCounts[key] = (sideCounts[key] || 0) + 1;
  });

  const sideIndices = {};

  return (
    <div
      className={cn(
        "bg-card text-card-foreground relative rounded-xl border border-border overflow-visible transition-all duration-200 shadow-md hover:shadow-lg hover:border-muted-foreground/30",
        "w-60 hover:ring-1",
        "in-[.selected]:border-muted-foreground",
        "in-[.selected]:shadow-lg",
        className
      )}
      tabIndex={0}
      {...props}
    >
      {/* Handles */}
      {handles.map((handle, index) => {
        const handleId = `${id}-${handle.id}`;
        const key = `${handle.type}-${handle.position}`;
        sideIndices[key] = (sideIndices[key] || 0) + 1;
        const count = sideCounts[key];
        const idx = sideIndices[key];

        let finalStyle = { ...handle.style };
        // If there's more than one handle on this side, space them out vertically/horizontally
        if (count > 1 && !finalStyle.top && !finalStyle.bottom && !finalStyle.left && !finalStyle.right) {
          finalStyle.top = `${(idx / (count + 1)) * 100}%`;
        }

        return (
          <Handle
            key={`${handleId}-${index}`}
            type={handle.type}
            position={handle.position}
            id={handleId}
            style={finalStyle}
            className={cn(
              "!bg-transparent !border-none cursor-pointer hover:scale-110 transition-transform",
              handle.className
            )}
          >
            {/* Outer Circle (1px border) */}
            <div
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border bg-background flex items-center justify-center pointer-events-none",
                handle.isVariable ? "border-amber-500" : "border-primary"
              )}
            >
              {/* Inner Dot */}
              <div
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  handle.isVariable ? "bg-amber-500" : "bg-primary"
                )}
              />
            </div>
          </Handle>
        );
      })}

      {/* Header */}
      <header className="flex items-center justify-between gap-2 border-b border-border bg-muted/30 px-3.5 py-2.5 rounded-t-xl">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
          <h3
            data-slot="base-node-title"
            className="user-select-none flex-1 text-xs font-semibold text-foreground tracking-wide uppercase"
          >
            {title}
          </h3>
        </div>
      </header>

      {/* Content */}
      <div data-slot="base-node-content" className="px-3.5 py-3 space-y-3">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div data-slot="base-node-footer" className="border-t border-border bg-muted/10 px-3.5 py-2">
          {footer}
        </div>
      )}
    </div>
  );
}

// Subcomponents for rapid UI building
export function NodeField({ label, children, className }) {
  return (
    <label className={cn("flex flex-col gap-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider", className)}>
      {label}
      {children}
    </label>
  );
}

export function NodeInput({ className, ...props }) {
  return (
    <input
      type="text"
      className={cn(
        fieldBaseStyles,
        className
      )}
      {...props}
    />
  );
}

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
