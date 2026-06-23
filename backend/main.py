from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def find_cycle(nodes, edges):
    # Build adjacency list
    adj_list = {node['id']: [] for node in nodes}
    for edge in edges:
        u = edge['source']
        v = edge['target']
        if u in adj_list and v in adj_list:
            adj_list[u].append(v)
            
    visited = set()
    rec_stack = []
    rec_stack_set = set()
    
    def dfs(u):
        visited.add(u)
        rec_stack.append(u)
        rec_stack_set.add(u)
        
        for v in adj_list[u]:
            if v in rec_stack_set:
                # Cycle detected! Extract the path from v to the end of the stack
                cycle_start_idx = rec_stack.index(v)
                cycle_path = rec_stack[cycle_start_idx:] + [v]
                return cycle_path
            elif v not in visited:
                cycle_path = dfs(v)
                if cycle_path:
                    return cycle_path
                    
        rec_stack.pop()
        rec_stack_set.remove(u)
        return None

    # Run DFS on all unvisited nodes
    for node in nodes:
        node_id = node['id']
        if node_id not in visited:
            cycle_path = dfs(node_id)
            if cycle_path:
                return cycle_path
                
    return None

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    try:
        data = json.loads(pipeline)
        nodes = data.get('nodes', [])
        edges = data.get('edges', [])
        
        num_nodes = len(nodes)
        num_edges = len(edges)
        
        # Detect if there's any cycle in the graph
        cycle_path = find_cycle(nodes, edges)
        is_dag = cycle_path is None
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag,
            'cycle': cycle_path or []
        }
    except Exception as e:
        return {
            'num_nodes': 0,
            'num_edges': 0,
            'is_dag': False,
            'cycle': [],
            'error': str(e)
        }
