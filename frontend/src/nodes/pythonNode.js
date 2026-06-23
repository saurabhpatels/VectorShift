import { useState } from 'react';
import { Position } from 'reactflow';
import { GenericNode, NodeField, NodeTextarea } from '../components/generic-node';
import { Terminal } from 'lucide-react';

export const PythonNode = ({ id, data }) => {
  const [code, setCode] = useState(data?.code || 'def main(input_val):\n    # Write Python code here\n    return input_val * 2\n');

  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' }
  ];

  return (
    <GenericNode
      id={id}
      title="Python Script"
      icon={Terminal}
      accentColor="border-t-2 border-t-teal-500"
      handles={handles}
    >
      <NodeField label="Python Code">
        <NodeTextarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="def main(input_val):..."
          rows={5}
          className="font-mono text-[11px]"
        />
      </NodeField>
    </GenericNode>
  );
}
