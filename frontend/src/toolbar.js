import { DraggableNode } from './draggableNode';
import { SubmitButton } from './submit';

export const PipelineToolbar = () => {
  return (
    <div className="p-5 flex items-center justify-between gap-5 bg-card border-b border-border shadow-sm">
      <div className="flex flex-wrap gap-3">
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />
        <DraggableNode type='api' label='API Request' />
        <DraggableNode type='database' label='Database Query' />
        <DraggableNode type='conditional' label='Conditional' />
        <DraggableNode type='python' label='Python Script' />
      </div>
      <SubmitButton />
    </div>
  );
};
