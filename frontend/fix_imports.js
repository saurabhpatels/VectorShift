const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  replacements.forEach(({ search, replace }) => {
    content = content.replace(search, replace);
  });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

// 1. App.js
replaceInFile('src/App.js', [
  { search: /import \{ PipelineToolbar \} from '\.\/toolbar';/g, replace: "import { PipelineToolbar } from './features/pipeline/PipelineToolbar';" },
  { search: /import \{ PipelineUI \} from '\.\/ui';/g, replace: "import { PipelineUI } from './features/pipeline/PipelineCanvas';" }
]);

// 2. src/features/pipeline/PipelineCanvas.jsx
replaceInFile('src/features/pipeline/PipelineCanvas.jsx', [
  { search: /from '\.\/store'/g, replace: "from '../../store/usePipelineStore'" },
  { search: /from '\.\/components\/generic-node'/g, replace: "from '../../components/GenericNode'" },
  { search: /from '\.\/nodesConfig'/g, replace: "from '../../config/nodesConfig'" }
]);

// 3. src/features/pipeline/PipelineToolbar.jsx
replaceInFile('src/features/pipeline/PipelineToolbar.jsx', [
  { search: /from '\.\/draggableNode'/g, replace: "from '../../components/DraggableNode'" },
  { search: /from '\.\/submit'/g, replace: "from './SubmitPipeline'" },
  { search: /from '\.\/nodesConfig'/g, replace: "from '../../config/nodesConfig'" },
  { search: /from '\.\/store'/g, replace: "from '../../store/usePipelineStore'" }
]);

// 4. src/features/pipeline/SubmitPipeline.jsx
replaceInFile('src/features/pipeline/SubmitPipeline.jsx', [
  { search: /from '\.\/store'/g, replace: "from '../../store/usePipelineStore'" }
]);

// 5. src/components/GenericNode.jsx
replaceInFile('src/components/GenericNode.jsx', [
  { search: /from '\.\.\/nodesConfig'/g, replace: "from '../config/nodesConfig'" }
]);

// 6. src/config/nodesConfig.js
replaceInFile('src/config/nodesConfig.js', [
  { search: /from '\.\/nodes\/inputNode'/g, replace: "from '../nodes/InputNode'" },
  { search: /from '\.\/nodes\/llmNode'/g, replace: "from '../nodes/LlmNode'" },
  { search: /from '\.\/nodes\/outputNode'/g, replace: "from '../nodes/OutputNode'" },
  { search: /from '\.\/nodes\/textNode'/g, replace: "from '../nodes/TextNode'" },
  { search: /from '\.\/nodes\/apiNode'/g, replace: "from '../nodes/ApiNode'" },
  { search: /from '\.\/nodes\/databaseNode'/g, replace: "from '../nodes/DatabaseNode'" },
  { search: /from '\.\/nodes\/conditionalNode'/g, replace: "from '../nodes/ConditionalNode'" },
  { search: /from '\.\/nodes\/pythonNode'/g, replace: "from '../nodes/PythonNode'" }
]);

// 7. src/nodes/*.jsx
const nodesDir = 'src/nodes';
if (fs.existsSync(nodesDir)) {
  fs.readdirSync(nodesDir).forEach(file => {
    if (file.endsWith('.jsx')) {
      replaceInFile(path.join(nodesDir, file), [
        { search: /from '\.\.\/components\/generic-node'/g, replace: "from '../components/GenericNode'" },
        { search: /from '\.\.\/store'/g, replace: "from '../store/usePipelineStore'" }
      ]);
    }
  });
}
