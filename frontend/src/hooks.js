import { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { Position } from 'reactflow';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function extractVariables(text) {
  const extracted = new Set();
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    extracted.add(match[1]);
  }
  return Array.from(extracted);
}

export function useVariableHandles({ text, containerRef, nodeId }) {
  const variables = useMemo(() => extractVariables(text), [text]);

  const [offsets, setOffsets] = useState({});

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const root = containerRef.current.closest('.react-flow__node');
    if (!root) return;

    const newOffsets = {};

    variables.forEach((v) => {
      const el = containerRef.current.querySelector(`[data-var="${v}"]`);
      if (!el) return;

      let offset = 0;
      let cur = el;

      while (cur && cur !== root) {
        offset += cur.offsetTop;
        cur = cur.offsetParent;
      }

      newOffsets[v] = offset + el.offsetHeight / 2;
    });

    setOffsets(newOffsets);
  }, [variables]);

  const handles = useMemo(() => {
    return variables.map((v) => ({
      id: v,
      position: Position.Left,
      type: 'target',
      style: { top: `${offsets[v] ?? 0}px` },
      isVariable: true
    }));
  }, [variables, offsets]);

  return handles;
}

export function useCleanupEdges(nodeId, handles, edges, onEdgesChange) {
  useEffect(() => {
    const activeHandleIds = handles.map((h) => `${nodeId}-${h.id}`);

    // Find any edges targeting this node that point to a dynamic handle ID that no longer exists
    const orphanedEdges = edges.filter(
      (edge) =>
        edge.target === nodeId &&
        edge.targetHandle &&
        !activeHandleIds.includes(edge.targetHandle) &&
        edge.targetHandle !== 'output'
    );

    if (orphanedEdges.length > 0) {
      const edgeChanges = orphanedEdges.map((edge) => ({
        id: edge.id,
        type: 'remove',
      }));
      onEdgesChange(edgeChanges);
    }
  }, [nodeId, handles, edges, onEdgesChange]);
}
