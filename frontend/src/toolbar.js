import { DraggableNode } from './draggableNode';
import { SubmitButton } from './submit';
import { nodesConfig } from './nodesConfig';
import { Moon, Sun } from 'lucide-react';
import { useStore } from './store';

export const PipelineToolbar = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);

  return (
    <div className="p-5 flex items-center justify-between gap-5 bg-card border-b border-border shadow-sm">
      <div className="flex flex-wrap gap-3">
        {nodesConfig.map((config) => (
          <DraggableNode key={config.type} type={config.type} label={config.label} icon={config.icon} />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md hover:bg-muted/50 border border-transparent hover:border-border transition-colors text-foreground"
          title="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <SubmitButton />
      </div>
    </div>
  );
};
