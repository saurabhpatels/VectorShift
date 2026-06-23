import { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import { Position, useUpdateNodeInternals, Handle } from 'reactflow';
import { NodeField } from '../components/generic-node';
import { useStore } from '../store';
import { cn } from 'lib/utils';

export const TextNodeInner = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [debouncedText, setDebouncedText] = useState(currText);
  const [lineOffsets, setLineOffsets] = useState({});
  const containerRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  // Access the global Zustand store to observe and modify edges
  const edges = useStore((state) => state.edges);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Debounce currText to update debouncedText and store after 200ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(currText);
      updateNodeField(id, 'text', currText);
    }, 200);
    return () => clearTimeout(handler);
  }, [currText, id, updateNodeField]);

  // 1. Extract unique variables from debouncedText using a Set for deduplication
  const variables = useMemo(() => {
    const extracted = new Set();
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    let match;
    while ((match = regex.exec(debouncedText)) !== null) {
      extracted.add(match[1]);
    }
    return Array.from(extracted);
  }, [debouncedText]);

  // Helper to parse text and wrap active variables in spans for offset measurement
  const renderParsedText = (text, activeVars) => {
    if (!text) return ' ';
    const varSet = new Set(activeVars);
    if (varSet.size === 0) return text;

    const regex = new RegExp(`(\\{\\{\\s*(?:${activeVars.join('|')})\\s*\\}\\})`, 'g');

    const parts = text.split(regex);
    return parts.map((part, index) => {
      const match = part.match(/^\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}$/);
      if (match && varSet.has(match[1])) {
        const varName = match[1];
        return (
          <span
            key={index}
            data-var={varName}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // 2. Measure vertical offsets of variable spans relative to the root node element
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const rootNode = containerRef.current.closest('.react-flow__node');
    if (!rootNode) return;

    const offsets = {};
    variables.forEach((varName) => {
      const spanEl = containerRef.current.querySelector(`span[data-var="${varName}"]`);
      if (spanEl) {
        let offset = 0;
        let current = spanEl;
        while (current && current !== rootNode) {
          offset += current.offsetTop;
          current = current.offsetParent;
        }
        // Align handle with the vertical middle of the span
        const centerOffset = offset + spanEl.offsetHeight / 2;
        offsets[varName] = centerOffset;
      }
    });

    setLineOffsets(offsets);
  }, [currText, variables]);

  // 3. Build only dynamic input handles on the left (static output is handled by config)
  const dynamicHandles = useMemo(() => {
    const list = [];
    variables.forEach((varName) => {
      const topOffset = lineOffsets[varName];
      if (topOffset !== undefined) {
        list.push({
          type: 'target',
          position: Position.Left,
          id: varName,
          isVariable: true,
          style: {
            top: `${topOffset}px`,
          }
        });
      }
    });
    return list;
  }, [variables, lineOffsets]);

  // 4. Remeasure node layout when handles change
  useEffect(() => {
    updateNodeInternals(id);
  }, [id, dynamicHandles, updateNodeInternals]);

  // 5. Clean up any dangling edges when variables are deleted from the text
  useEffect(() => {
    const activeHandleIds = dynamicHandles.map((h) => `${id}-${h.id}`);

    // Find any edges targeting this node that point to a dynamic handle ID that no longer exists
    const orphanedEdges = edges.filter(
      (edge) => edge.target === id && edge.targetHandle && !activeHandleIds.includes(edge.targetHandle) && edge.targetHandle !== 'output'
    );

    if (orphanedEdges.length > 0) {
      const edgeChanges = orphanedEdges.map((edge) => ({
        id: edge.id,
        type: 'remove',
      }));
      onEdgesChange(edgeChanges);
    }
  }, [id, dynamicHandles, edges, onEdgesChange]);

  // Append a space if text ends with a newline to prevent mirror height collapse
  const displayText = currText.endsWith('\n') ? currText + ' ' : currText;

  return (
    <>
      <NodeField label="Text">
        <div ref={containerRef} className="relative min-w-[180px] max-w-[400px] w-full min-h-[40px] mt-1">
          {/* Invisible mirror used by the browser layout engine to measure size */}
          <div className="invisible whitespace-pre-wrap break-words text-xs p-2.5 min-h-[40px] font-sans border border-transparent select-none pointer-events-none leading-[18px]">
            {renderParsedText(displayText, variables)}
          </div>
          {/* Overlay textarea positioned absolutely to fill the dynamic container */}
          <textarea
            value={currText}
            onChange={handleTextChange}
            className="absolute inset-0 nodrag w-full h-full resize-none rounded-md border border-input p-2.5 text-xs bg-background text-foreground shadow-sm placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring font-sans leading-[18px]"
            placeholder="Type some text..."
          />
        </div>
      </NodeField>
      {/* Explicitly render dynamic handles injected into BaseNode */}
      {dynamicHandles.map((handle, index) => {
        const handleId = `${id}-${handle.id}`;
        return (
          <Handle
            key={`${handleId}-${index}`}
            type={handle.type}
            position={handle.position}
            id={handleId}
            style={handle.style}
            className={cn(
              "!bg-transparent !border-none cursor-pointer hover:scale-110 transition-transform",
              handle.className
            )}
          >
            <div
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border bg-background flex items-center justify-center pointer-events-none",
                handle.isVariable ? "border-amber-500" : "border-primary"
              )}
            >
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
    </>
  );
};
