import { useState } from 'react';
import { Position } from 'reactflow';
import { GenericNode, NodeField, NodeInput, NodeTextarea } from '../components/generic-node';
import { Database } from 'lucide-react';

export const DatabaseNode = ({ id, data }) => {
  const [connString, setConnString] = useState(data?.connString || 'postgresql://localhost:5432/mydb');
  const [query, setQuery] = useState(data?.query || 'SELECT * FROM users LIMIT 10;');

  const handles = [
    { type: 'target', position: Position.Left, id: 'query-params' },
    { type: 'source', position: Position.Right, id: 'results' }
  ];

  return (
    <GenericNode
      id={id}
      title="Database Query"
      icon={Database}
      accentColor="border-t-2 border-t-indigo-500"
      handles={handles}
    >
      <NodeField label="Connection URI">
        <NodeInput
          value={connString}
          onChange={(e) => setConnString(e.target.value)}
          placeholder="postgresql://user:pass@host:port/db"
        />
      </NodeField>

      <NodeField label="SQL Query">
        <NodeTextarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SELECT * FROM table;"
          rows={3}
        />
      </NodeField>
    </GenericNode>
  );
}
