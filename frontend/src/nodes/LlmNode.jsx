import { useState, useEffect } from 'react';
import { NodeResizeControl } from 'reactflow';
import { MoveDiagonal2 } from 'lucide-react';
import { NodeField, NodeSelect, NodeTextarea } from '../components/GenericNode';
import { useStore } from '../store/usePipelineStore';

const controlStyle = {
  background: 'transparent',
  border: 'none',
};

export const LLMNodeInner = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4');
  const [prompt, setPrompt] = useState(data?.prompt || '');
  const updateNodeField = useStore((s) => s.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'model', model);
  }, [model, id, updateNodeField]);

  useEffect(() => {
    updateNodeField(id, 'prompt', prompt);
  }, [prompt, id, updateNodeField]);

  return (
    <div className="flex flex-col gap-3 min-w-[200px] flex-1 h-full relative">
      <NodeResizeControl style={controlStyle} minWidth={240} minHeight={180}>
        <MoveDiagonal2 size={16}
          style={{
            position: 'absolute',
            right: 5,
            bottom: 5,
            stroke: 'hsl(var(--muted-foreground))',
          }} />
      </NodeResizeControl>

      <NodeField label="System Prompt" className="flex-1 flex flex-col">
        <NodeTextarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 min-h-[80px]"
          placeholder="You are a helpful assistant..."
        />
      </NodeField>

      <NodeField label="Model">
        <NodeSelect value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="gpt-4">ChatGPT (GPT-4)</option>
          <option value="gpt-3.5">ChatGPT (GPT-3.5)</option>
          <option value="claude-3-opus">Claude 3 Opus</option>
          <option value="claude-3-sonnet">Claude 3 Sonnet</option>
        </NodeSelect>
      </NodeField>
    </div>
  );
};
