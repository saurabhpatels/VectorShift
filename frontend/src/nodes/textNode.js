import { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import { Position, useUpdateNodeInternals } from 'reactflow';
import { GenericNode, NodeField } from '../components/generic-node';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [debouncedText, setDebouncedText] = useState(currText);
  const [lineOffsets, setLineOffsets] = useState({});
  const containerRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  // Access the global Zustand store to observe and modify edges
  const edges = useStore((state) => state.edges);
  const onEdgesChange = useStore((state) => state.onEdgesChange);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Debounce currText to update debouncedText after 200ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(currText);
    }, 200);
    return () => clearTimeout(handler);
  }, [currText]);

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

  // 3. Build handles: 1 static output on the right + dynamic input handles on the left
  const handles = useMemo(() => {
    const list = [
      { type: 'source', position: Position.Right, id: 'output' }
    ];

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
  }, [id, handles, updateNodeInternals]);

  // 5. Clean up any dangling edges when variables are deleted from the text
  useEffect(() => {
    const activeHandleIds = handles.map((h) => `${id}-${h.id}`);

    // Find any edges targeting this node that point to a handle ID that no longer exists
    const orphanedEdges = edges.filter(
      (edge) => edge.target === id && edge.targetHandle && !activeHandleIds.includes(edge.targetHandle)
    );

    if (orphanedEdges.length > 0) {
      const edgeChanges = orphanedEdges.map((edge) => ({
        id: edge.id,
        type: 'remove',
      }));
      onEdgesChange(edgeChanges);
    }
  }, [id, handles, edges, onEdgesChange]);

  // Append a space if text ends with a newline to prevent mirror height collapse
  const displayText = currText.endsWith('\n') ? currText + ' ' : currText;

  return (
    <GenericNode
      id={id}
      type="text"
      title="Text"
      className="w-auto min-w-[200px]"
      handles={handles}
    >
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
    </GenericNode>
  );
};

