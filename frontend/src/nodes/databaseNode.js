import { Position } from 'reactflow';
import { GenericNode, NodeField, NodeInput, NodeTextarea } from '../components/generic-node';
import { useStore } from '../store';

export const DatabaseNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const connString = data?.connString ?? 'postgresql://localhost:5432/mydb';
  const query = data?.query ?? 'SELECT * FROM users LIMIT 10;';

  const handles = [
    { type: 'target', position: Position.Left, id: 'query-params' },
    { type: 'source', position: Position.Right, id: 'results' }
  ];

  return (
    <GenericNode
      id={id}
      type="database"
      title="Database Query"
      handles={handles}
    >
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
    </GenericNode>
  );
}
