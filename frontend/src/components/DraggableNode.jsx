import { cn } from 'lib/utils';

export const DraggableNode = ({ type, label, icon: Icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={cn(
        "cursor-grab px-3.5 py-2 flex flex-col items-center gap-2 rounded-lg border border-border bg-background text-foreground text-xs font-semibold shadow-sm transition-all duration-200 select-none hover:scale-[1.02] hover:shadow hover:border-primary/50 hover:bg-muted/50 active:scale-[0.98] active:cursor-grabbing group"
      )}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      {Icon && (
        <Icon className="w-3.5 h-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
      )}
      <span className="text-foreground transition-colors">{label}</span>
    </div>
  );
};
