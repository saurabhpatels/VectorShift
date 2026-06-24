import React from 'react';
import { NodeField, NodeCheckbox, NodeRadio } from '../components/GenericNode';
import { useStore } from '../store/usePipelineStore';

export const AgentConfigNodeInner = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Retrieve values from data with default state values
  const enableMemory = data?.enableMemory ?? false;
  const streamResponse = data?.streamResponse ?? true;
  const agentMode = data?.agentMode ?? 'autonomous';

  return (
    <>
      <NodeField label="Capabilities">
        <NodeCheckbox
          label="Enable Memory"
          checked={enableMemory}
          onChange={(e) => updateNodeField(id, 'enableMemory', e.target.checked)}
        />
        <NodeCheckbox
          label="Stream Response"
          checked={streamResponse}
          onChange={(e) => updateNodeField(id, 'streamResponse', e.target.checked)}
        />
      </NodeField>

      <NodeField label="Agent Mode">
        <div className="flex flex-col gap-1 mt-1">
          <NodeRadio
            label="Autonomous"
            name={`agentMode-${id}`}
            checked={agentMode === 'autonomous'}
            onChange={() => updateNodeField(id, 'agentMode', 'autonomous')}
          />
          <NodeRadio
            label="Human-in-the-loop"
            name={`agentMode-${id}`}
            checked={agentMode === 'hitl'}
            onChange={() => updateNodeField(id, 'agentMode', 'hitl')}
          />
        </div>
      </NodeField>
    </>
  );
};
