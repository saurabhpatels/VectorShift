import { Position } from 'reactflow';
import { GenericNode, NodeField, NodeInput, NodeSelect } from '../components/generic-node';
import { useStore } from '../store';

export const ApiNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const method = data?.method ?? 'GET';
  const url = data?.url ?? 'https://api.example.com/v1/data';

  const handles = [
    { type: 'target', position: Position.Left, id: 'payload' },
    { type: 'source', position: Position.Right, id: 'response' }
  ];

  return (
    <GenericNode
      id={id}
      type="api"
      title="API Request"
      handles={handles}
    >
      <NodeField label="HTTP Method">
        <NodeSelect
          value={method}
          onChange={(e) => updateNodeField(id, 'method', e.target.value)}
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
          onChange={(e) => updateNodeField(id, 'url', e.target.value)}
          placeholder="https://api.domain.com/endpoint"
        />
      </NodeField>
    </GenericNode>
  );
}
