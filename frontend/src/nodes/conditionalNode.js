import { NodeField, NodeInput, NodeSelect } from '../components/generic-node';
import { useStore } from '../store';

export const ConditionalNodeInner = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const operator = data?.operator ?? 'contains';
  const value = data?.value ?? '';

  return (
    <>
      <NodeField label="Operator">
        <NodeSelect
          value={operator}
          onChange={(e) => updateNodeField(id, 'operator', e.target.value)}
        >
          <option value="equals">Equals</option>
          <option value="not_equals">Does Not Equal</option>
          <option value="contains">Contains</option>
          <option value="starts_with">Starts With</option>
          <option value="greater_than">Greater Than</option>
          <option value="less_than">Less Than</option>
        </NodeSelect>
      </NodeField>

      <NodeField label="Value to Compare">
        <NodeInput
          value={value}
          onChange={(e) => updateNodeField(id, 'value', e.target.value)}
          placeholder="e.g. active"
        />
      </NodeField>
    </>
  );
};
