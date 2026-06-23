import { Position } from 'reactflow';
import { GenericNode } from '../components/generic-node';
import { Brain } from 'lucide-react';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: 'system' },
    { type: 'target', position: Position.Left, id: 'prompt' },
    { type: 'source', position: Position.Right, id: 'response' }
  ];

  return (
    <GenericNode
      id={id}
      title="LLM"
      icon={Brain}
      accentColor="border-t-2 border-t-purple-500"
      handles={handles}
    >
      <div className="text-xs text-muted-foreground leading-relaxed">
        This is an LLM. Connect your system instructions and prompt variables.
      </div>
    </GenericNode>
  );
}
