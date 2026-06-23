import { useStore } from '../../store/usePipelineStore';
import { toast } from 'sonner';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('pipeline', JSON.stringify({ nodes, edges }));

      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const result = await response.json();

      if (result.error) {
        toast("Parsing Error", {
          description: result.error,
        });
        return;
      }

      // Display response in a user-friendly default white sonner toast
      if (result.is_dag) {
        toast("Pipeline Analysis Results", {
          duration: 6000,
          description: (
            <div className="flex flex-col gap-1 text-[11px] mt-1 text-muted-foreground leading-normal">
              <div>• <strong>Total Nodes:</strong> {result.num_nodes}</div>
              <div>• <strong>Total Edges:</strong> {result.num_edges}</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                <strong>DAG:</strong> Yes
              </div>
            </div>
          ),
        });
      } else {
        const cycleStr = result.cycle && result.cycle.length > 0
          ? `Loop Path: ${result.cycle.join(" ➔ ")}`
          : "";
        toast("Pipeline Analysis Results", {
          duration: 8000,
          description: (
            <div className="flex flex-col gap-1 text-[11px] mt-1 text-muted-foreground leading-normal">
              <div>• <strong>Total Nodes:</strong> {result.num_nodes}</div>
              <div>• <strong>Total Edges:</strong> {result.num_edges}</div>
              <div className="text-red-600 dark:text-red-400 font-semibold mt-1">
                <strong>DAG:</strong> No
              </div>
              {cycleStr && (
                <div className="text-red-600 bg-red-50 border border-red-100 dark:bg-red-950/20 dark:border-red-950/30 px-2 py-1 rounded mt-1.5 font-mono text-[10px] break-all leading-normal">
                  {cycleStr}
                </div>
              )}
            </div>
          ),
        });
      }

    } catch (error) {
      toast("Connection Error", {
        description: "Failed to connect to the backend server. Make sure the FastAPI server is running at http://localhost:8000.",
      });
    }
  };

  return (
    <button
      onClick={handleSubmit}
      className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:bg-primary/95 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:scale-[0.98]"
    >
      Save Pipeline
    </button>
  );
};
