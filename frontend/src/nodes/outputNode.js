import { useState } from 'react';
import { Position } from 'reactflow';
import { GenericNode, NodeField, NodeInput, NodeSelect } from '../components/generic-node';
import { ArrowLeft } from 'lucide-react';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: 'value' }
  ];

  return (
    <GenericNode
      id={id}
      title="Output"
      icon={ArrowLeft}
      accentColor="border-t-2 border-t-rose-500"
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
