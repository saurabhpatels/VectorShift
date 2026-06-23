import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <PipelineToolbar />
      <PipelineUI />
      <Toaster position="top-right" closeButton />
    </div>
  );
}

export default App;
