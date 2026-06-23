import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { Toaster } from 'sonner';

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <Toaster position="top-right" closeButton />
    </div>
  );
}

export default App;
