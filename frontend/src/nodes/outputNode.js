import { Position } from 'reactflow';
import { GenericNode, NodeField, NodeInput, NodeSelect } from '../components/generic-node';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const outputName = data?.outputName ?? id.replace('customOutput-', 'output_');
  const outputType = data?.outputType ?? 'Text';

  const handleNameChange = (e) => {
    updateNodeField(id, 'outputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    updateNodeField(id, 'outputType', e.target.value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: 'value' }
  ];

  return (
    <GenericNode
      id={id}
      type="customOutput"
      title="Output"
      handles={handles}
    >
      <NodeField label="Name">
        <NodeInput
          value={outputName}
          onChange={handleNameChange}
        />
      </NodeField>

      <NodeField label="Type">
        <NodeSelect
          value={outputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </NodeSelect>
      </NodeField>
    </GenericNode>
  );
}
