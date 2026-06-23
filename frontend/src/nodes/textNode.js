import { useState, useEffect } from 'react';
import { Position, useUpdateNodeInternals } from 'reactflow';
import { GenericNode, NodeField } from '../components/generic-node';
import { Type } from 'lucide-react';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const updateNodeInternals = useUpdateNodeInternals();

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Remeasure handles and layout boundaries when the text content changes size
  useEffect(() => {
    updateNodeInternals(id);
  }, [id, currText, updateNodeInternals]);

  const handles = [
    { type: 'source', position: Position.Right, id: 'output' }
  ];

  // Append a space if text ends with a newline to prevent mirror height collapse
  const displayText = currText.endsWith('\n') ? currText + ' ' : currText;

  return (
    <GenericNode
      id={id}
      title="Text"
      icon={Type}
      accentColor="border-t-2 border-t-amber-400"
      className="w-auto min-w-[200px]"
      handles={handles}
    >
      <NodeField label="Text">
        <div className="relative min-w-[180px] max-w-[400px] w-full min-h-[40px] mt-1">
          {/* Invisible mirror used by the browser layout engine to measure size */}
          <div className="invisible whitespace-pre-wrap break-words text-xs p-2.5 min-h-[40px] font-sans border border-transparent select-none pointer-events-none">
            {displayText || ' '}
          </div>
          {/* Overlay textarea positioned absolutely to fill the dynamic container */}
          <textarea
            value={currText}
            onChange={handleTextChange}
            className="absolute inset-0 nodrag w-full h-full resize-none rounded-md border border-input p-2.5 text-xs bg-background text-foreground shadow-sm placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring font-sans"
            placeholder="Type some text..."
          />
        </div>
      </NodeField>
    </GenericNode>
  );
}
