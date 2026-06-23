import { NodeField, NodeInput, NodeTextarea } from '../components/GenericNode';
import { useStore } from '../store/usePipelineStore';

export const DatabaseNodeInner = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const connString = data?.connString ?? 'postgresql://localhost:5432/mydb';
  const query = data?.query ?? 'SELECT * FROM users LIMIT 10;';

  return (
    <>
      <NodeField label="Connection URI">
        <NodeInput
          value={connString}
          onChange={(e) => updateNodeField(id, 'connString', e.target.value)}
          placeholder="postgresql://user:pass@host:port/db"
        />
      </NodeField>

      <NodeField label="SQL Query">
        <NodeTextarea
          value={query}
          onChange={(e) => updateNodeField(id, 'query', e.target.value)}
          placeholder="SELECT * FROM table;"
          rows={3}
        />
      </NodeField>
    </>
  );
};
