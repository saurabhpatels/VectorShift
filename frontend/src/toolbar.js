import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="p-5 bg-card border-b border-border shadow-sm">
      <h2 className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-4 px-1">
        Node Palette (Drag & Drop)
      </h2>
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
    </div>
  );
};
