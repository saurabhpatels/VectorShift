import { Handle } from 'reactflow';
import { BaseNode, BaseNodeHeader, BaseNodeHeaderTitle, BaseNodeContent, BaseNodeFooter } from './base-node';
import { cn } from 'lib/utils';

export function GenericNode({
  id,
  title,
  icon: Icon,
  accentColor = "border-t-2 border-t-primary",
  handles = [],
  children,
  footer,
  className,
  ...props
}) {
  // Count how many handles are on each side of each type
  const sideCounts = {};
  handles.forEach((h) => {
    const key = `${h.type}-${h.position}`;
    sideCounts[key] = (sideCounts[key] || 0) + 1;
  });

  const sideIndices = {};

  return (
    <BaseNode
      className={cn(
        "w-60 shadow-md relative bg-card rounded-xl border border-border overflow-visible transition-all duration-200 hover:shadow-lg hover:border-muted-foreground/30",
        accentColor,
        className
      )}
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
              "w-2.5 h-2.5  border-2 border-primary hover:!bg-primary transition-colors cursor-pointer",
              handle.className
            )}
          />
        );
      })}

      {/* Header */}
      <BaseNodeHeader className="flex items-center justify-between gap-2 border-b border-border bg-muted/30 px-3.5 py-2.5 rounded-t-xl">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
          <BaseNodeHeaderTitle className="text-xs font-semibold text-foreground tracking-wide uppercase">
            {title}
          </BaseNodeHeaderTitle>
        </div>
      </BaseNodeHeader>

      {/* Content */}
      <BaseNodeContent className="px-3.5 py-3 space-y-3">
        {children}
      </BaseNodeContent>

      {/* Footer */}
      {footer && (
        <BaseNodeFooter className="border-t border-border bg-muted/10 px-3.5 py-2">
          {footer}
        </BaseNodeFooter>
      )}
    </BaseNode>
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
        "nodrag w-full rounded-md border border-input px-2.5 py-1.5 text-xs bg-background text-foreground shadow-sm placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring",
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
        "nodrag w-full rounded-md border border-input px-2.5 py-1.5 text-xs bg-background text-foreground shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring",
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
        "nodrag w-full rounded-md border border-input px-2.5 py-1.5 text-xs bg-background text-foreground shadow-sm placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring resize-none",
        className
      )}
      {...props}
    />
  );
}
