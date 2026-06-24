import React from 'react';
import { NodeField, NodeCheckbox, NodeRadio } from '../components/GenericNode';
import { useStore } from '../store/usePipelineStore';

export const ToolApprovalNodeInner = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const autoApprove = data?.autoApprove ?? false;
  const slackNotify = data?.slackNotify ?? false;
  const policy = data?.policy ?? 'ask';

  return (
    <>
      <NodeField label="Settings">
        <NodeCheckbox
          label="Auto-Approve Safe Tools"
          checked={autoApprove}
          onChange={(e) => updateNodeField(id, 'autoApprove', e.target.checked)}
        />
        <NodeCheckbox
          label="Slack Notification"
          checked={slackNotify}
          onChange={(e) => updateNodeField(id, 'slackNotify', e.target.checked)}
        />
      </NodeField>

      <NodeField label="Default Policy">
        <div className="flex flex-col gap-1 mt-1">
          <NodeRadio
            label="Always Ask"
            name={`policy-${id}`}
            checked={policy === 'ask'}
            onChange={() => updateNodeField(id, 'policy', 'ask')}
          />
          <NodeRadio
            label="Approve All"
            name={`policy-${id}`}
            checked={policy === 'approve'}
            onChange={() => updateNodeField(id, 'policy', 'approve')}
          />
          <NodeRadio
            label="Reject All"
            name={`policy-${id}`}
            checked={policy === 'reject'}
            onChange={() => updateNodeField(id, 'policy', 'reject')}
          />
        </div>
      </NodeField>
    </>
  );
};
