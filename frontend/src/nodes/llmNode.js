import { Position } from 'reactflow';
import { GenericNode } from '../components/generic-node';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: 'system' },
    { type: 'target', position: Position.Left, id: 'prompt' },
    { type: 'source', position: Position.Right, id: 'response' }
  ];

  return (
    <GenericNode
      id={id}
      type="llm"
      title="LLM"
      handles={handles}
    >
      <div className="text-xs text-muted-foreground leading-relaxed">
        This is an LLM. Connect your system instructions and prompt variables.
      </div>
    </GenericNode>
  );
}
