import { cn } from 'lib/utils';

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={cn(
        type,
        "cursor-grab px-4 py-2.5 min-w-[100px] h-12 flex items-center justify-center rounded-lg border border-border bg-background text-foreground text-xs font-medium shadow-sm transition-all duration-200 select-none",
        "hover:border-primary/50 hover:bg-muted/50 hover:shadow active:cursor-grabbing"
      )}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <span>{label}</span>
    </div>
  );
};
