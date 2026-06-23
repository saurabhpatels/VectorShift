import { NodeField, NodeInput, NodeSelect } from '../components/generic-node';
import { useStore } from '../store';

export const ApiNodeInner = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const method = data?.method ?? 'GET';
  const url = data?.url ?? 'https://api.example.com/v1/data';

  return (
    <>
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
    </>
  );
};
