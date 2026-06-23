import { Position } from 'reactflow';
import { GenericNode, NodeField, NodeTextarea } from '../components/generic-node';
import { useStore } from '../store';

export const PythonNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const code = data?.code ?? 'def main(input_val):\n    # Write Python code here\n    return input_val * 2\n';

  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' }
  ];

  return (
    <GenericNode
      id={id}
      type="python"
      title="Python Script"
      handles={handles}
    >
      <NodeField label="Python Code">
        <NodeTextarea
          value={code}
          onChange={(e) => updateNodeField(id, 'code', e.target.value)}
          placeholder="def main(input_val):..."
          rows={5}
          className="font-mono text-[11px]"
        />
      </NodeField>
    </GenericNode>
  );
}
