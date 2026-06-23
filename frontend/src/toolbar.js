import { DraggableNode } from './draggableNode';
import { SubmitButton } from './submit';
import { nodesConfig } from './nodesConfig';

export const PipelineToolbar = () => {
  return (
    <div className="p-5 flex items-center justify-between gap-5 bg-card border-b border-border shadow-sm">
      <div className="flex flex-wrap gap-3">
        {nodesConfig.map((config) => (
          <DraggableNode key={config.type} type={config.type} label={config.label} icon={config.icon} />
        ))}
      </div>
      <SubmitButton />
    </div>
  );
};
