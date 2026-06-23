import { useState, useEffect, useRef } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { NodeField } from '../components/GenericNode';
import { useStore } from '../store/usePipelineStore';
import { cn } from 'lib/utils';
import { renderParsedText } from 'utils/common';
import { useDebounce, useVariableHandles, useCleanupEdges } from '../hooks';

export const TextNodeInner = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const containerRef = useRef(null);

  const updateNodeField = useStore((s) => s.updateNodeField);
  const edges = useStore((s) => s.edges);
  const onEdgesChange = useStore((s) => s.onEdgesChange);
  const updateNodeInternals = useUpdateNodeInternals();

  const debouncedText = useDebounce(text, 200);

  const handles = useVariableHandles({
    text: debouncedText,
    containerRef,
    nodeId: id,
  });

  // Remeasure ReactFlow node layout when handles change
  useEffect(() => {
    updateNodeInternals(id);
  }, [id, handles, updateNodeInternals]);

  // Sync state to Zustand
  useEffect(() => {
    updateNodeField(id, 'text', text);
  }, [text, id, updateNodeField]);

  useCleanupEdges(id, handles, edges, onEdgesChange);

  // Append a space if text ends with a newline to prevent mirror height collapse
  const displayText = text.endsWith('\n') ? text + ' ' : text;

  // Extract variables locally just for renderParsedText, or map handles
  const activeVars = handles.map(h => h.id);

  return (
    <>
      <NodeField label="Text">
        <div ref={containerRef} className="relative min-w-[180px] max-w-[400px] w-full min-h-[40px] mt-1">
          {/* Invisible mirror used by the browser layout engine to measure size */}
          <div className="invisible whitespace-pre-wrap break-words text-xs p-2.5 min-h-[40px] font-sans border border-transparent select-none pointer-events-none leading-[18px]">
            {renderParsedText(displayText, activeVars)}
          </div>
          {/* Overlay textarea positioned absolutely to fill the dynamic container */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="absolute inset-0 nodrag w-full h-full resize-none rounded-md border border-input p-2.5 text-xs bg-background text-foreground shadow-sm placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring font-sans leading-[18px]"
            placeholder="Type some text..."
          />
        </div>
      </NodeField>

      {handles.map((h) => (
        <Handle
          key={h.id}
          id={`${id}-${h.id}`}
          type={h.type}
          position={h.position}
          style={h.style}
          className={cn(
            "!bg-transparent !border-none cursor-pointer hover:scale-110 transition-transform",
            h.className
          )}
        >
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border bg-background flex items-center justify-center pointer-events-none border-amber-500"
            )}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          </div>
        </Handle>
      ))}
    </>
  );
};
