import { useState } from 'react';
import { Position } from 'reactflow';
import { GenericNode, NodeField, NodeInput, NodeSelect } from '../components/generic-node';
import { GitBranch } from 'lucide-react';

export const ConditionalNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || 'contains');
  const [value, setValue] = useState(data?.value || '');

  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'true' },
    { type: 'source', position: Position.Right, id: 'false' }
  ];

  return (
    <GenericNode
      id={id}
      title="Conditional Router"
      icon={GitBranch}
      accentColor="border-t-2 border-t-emerald-500"
      handles={handles}
    >
      <NodeField label="Operator">
        <NodeSelect
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        >
          <option value="equals">Equals</option>
          <option value="not_equals">Does Not Equal</option>
          <option value="contains">Contains</option>
          <option value="starts_with">Starts With</option>
          <option value="greater_than">Greater Than</option>
          <option value="less_than">Less Than</option>
        </NodeSelect>
      </NodeField>

      <NodeField label="Value to Compare">
        <NodeInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. active"
        />
      </NodeField>
    </GenericNode>
  );
}
