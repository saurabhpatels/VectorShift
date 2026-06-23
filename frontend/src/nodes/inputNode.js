import { useState } from 'react';
import { Position } from 'reactflow';
import { GenericNode, NodeField, NodeInput, NodeSelect } from '../components/generic-node';
import { ArrowRight } from 'lucide-react';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handles = [
    { type: 'source', position: Position.Right, id: 'value' }
  ];

  return (
    <GenericNode
      id={id}
      title="Input"
      icon={ArrowRight}
      accentColor="border-t-2 border-t-blue-500"
      handles={handles}
    >
      <NodeField label="Name">
        <NodeInput
          value={currName}
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
