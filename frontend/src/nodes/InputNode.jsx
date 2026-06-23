import { NodeField, NodeInput, NodeSelect } from '../components/GenericNode';
import { useStore } from '../store/usePipelineStore';

export const InputNodeInner = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const inputName = data?.inputName ?? id.replace('customInput-', 'input_');
  const inputType = data?.inputType ?? 'Text';

  return (
    <>
      <NodeField label="Name">
        <NodeInput
          value={inputName}
          onChange={(e) => updateNodeField(id, 'inputName', e.target.value)}
        />
      </NodeField>
      <NodeField label="Type">
        <NodeSelect
          value={inputType}
          onChange={(e) => updateNodeField(id, 'inputType', e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </NodeSelect>
      </NodeField>
    </>
  );
};
