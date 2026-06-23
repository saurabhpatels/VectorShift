import { Position } from 'reactflow';
import { GenericNode, NodeField, NodeInput, NodeSelect } from '../components/generic-node';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const inputName = data?.inputName ?? id.replace('customInput-', 'input_');
  const inputType = data?.inputType ?? 'Text';

  const handleNameChange = (e) => {
    updateNodeField(id, 'inputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    updateNodeField(id, 'inputType', e.target.value);
  };

  const handles = [
    { type: 'source', position: Position.Right, id: 'value' }
  ];

  return (
    <GenericNode
      id={id}
      type="customInput"
      title="Input"
      handles={handles}
    >
      <NodeField label="Name">
        <NodeInput
          value={inputName}
          onChange={handleNameChange}
        />
      </NodeField>

      <NodeField label="Type">
        <NodeSelect
          value={inputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </NodeSelect>
      </NodeField>
    </GenericNode>
  );
}
