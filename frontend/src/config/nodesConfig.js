import { Position } from 'reactflow';
import { ArrowRight, Brain, ArrowLeft, Type, Globe, Database, GitBranch, Terminal } from 'lucide-react';

import { InputNodeInner } from '../nodes/InputNode';
import { LLMNodeInner } from '../nodes/LlmNode';
import { OutputNodeInner } from '../nodes/OutputNode';
import { TextNodeInner } from '../nodes/TextNode';
import { ApiNodeInner } from '../nodes/ApiNode';
import { DatabaseNodeInner } from '../nodes/DatabaseNode';
import { ConditionalNodeInner } from '../nodes/ConditionalNode';
import { PythonNodeInner } from '../nodes/PythonNode';

export const nodesConfig = [
  {
    type: 'customInput',
    label: 'Input',
    icon: ArrowRight,
    component: InputNodeInner,
    handles: [{ type: 'source', position: Position.Right, id: 'value' }]
  },
  {
    type: 'llm',
    label: 'LLM',
    icon: Brain,
    component: LLMNodeInner,
    handles: [
      { type: 'target', position: Position.Left, id: 'system' },
      { type: 'target', position: Position.Left, id: 'prompt' },
      { type: 'source', position: Position.Right, id: 'response' }
    ]
  },
  {
    type: 'customOutput',
    label: 'Output',
    icon: ArrowLeft,
    component: OutputNodeInner,
    handles: [{ type: 'target', position: Position.Left, id: 'value' }]
  },
  {
    type: 'text',
    label: 'Text',
    icon: Type,
    component: TextNodeInner,
    handles: [{ type: 'source', position: Position.Right, id: 'output' }]
  },
  {
    type: 'api',
    label: 'API Request',
    icon: Globe,
    component: ApiNodeInner,
    handles: [
      { type: 'target', position: Position.Left, id: 'payload' },
      { type: 'source', position: Position.Right, id: 'response' }
    ]
  },
  {
    type: 'database',
    label: 'Database Query',
    icon: Database,
    component: DatabaseNodeInner,
    handles: [
      { type: 'target', position: Position.Left, id: 'query-params' },
      { type: 'source', position: Position.Right, id: 'results' }
    ]
  },
  {
    type: 'conditional',
    label: 'Conditional',
    icon: GitBranch,
    component: ConditionalNodeInner,
    handles: [
      { type: 'target', position: Position.Left, id: 'input' },
      { type: 'source', position: Position.Right, id: 'true' },
      { type: 'source', position: Position.Right, id: 'false' }
    ]
  },
  {
    type: 'python',
    label: 'Python Script',
    icon: Terminal,
    component: PythonNodeInner,
    handles: [
      { type: 'target', position: Position.Left, id: 'input' },
      { type: 'source', position: Position.Right, id: 'output' }
    ]
  }
];
