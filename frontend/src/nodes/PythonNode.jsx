import { NodeField, NodeTextarea } from '../components/GenericNode';
import { useStore } from '../store/usePipelineStore';

export const PythonNodeInner = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const code = data?.code ?? 'def main(input_val):\n    # Write Python code here\n    return input_val * 2\n';

  return (
    <>
      <NodeField label="Python Code">
        <NodeTextarea
          value={code}
          onChange={(e) => updateNodeField(id, 'code', e.target.value)}
          placeholder="def main(input_val):..."
          rows={5}
          className="font-mono text-[11px]"
        />
      </NodeField>
    </>
  );
};
