import { NodeField, NodeInput, NodeSelect } from '../components/generic-node';
import { useStore } from '../store';

export const OutputNodeInner = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const outputName = data?.outputName ?? id.replace('customOutput-', 'output_');
  const outputType = data?.outputType ?? 'Text';

  return (
    <>
      <NodeField label="Name">
        <NodeInput
          value={outputName}
          onChange={(e) => updateNodeField(id, 'outputName', e.target.value)}
        />
      </NodeField>

      <NodeField label="Type">
        <NodeSelect
          value={outputType}
          onChange={(e) => updateNodeField(id, 'outputType', e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </NodeSelect>
      </NodeField>
    </>
  );
};
