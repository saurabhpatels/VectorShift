import { useState } from 'react';
import { Position } from 'reactflow';
import { GenericNode, NodeField, NodeInput, NodeSelect } from '../components/generic-node';
import { Globe } from 'lucide-react';

export const ApiNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/v1/data');

  const handles = [
    { type: 'target', position: Position.Left, id: 'payload' },
    { type: 'source', position: Position.Right, id: 'response' }
  ];

  return (
    <GenericNode
      id={id}
      title="API Request"
      icon={Globe}
      accentColor="border-t-2 border-t-violet-500"
      handles={handles}
    >
      <NodeField label="HTTP Method">
        <NodeSelect
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </NodeSelect>
      </NodeField>

      <NodeField label="Endpoint URL">
        <NodeInput
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.domain.com/endpoint"
        />
      </NodeField>
    </GenericNode>
  );
}
