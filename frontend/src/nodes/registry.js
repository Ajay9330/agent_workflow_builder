import { Download, Bot, Upload, FileText, Globe, Database, GitFork, Zap, Clock } from 'lucide-react';
import { InputNode } from './components/InputNode';
import { LLMNode } from './components/LLMNode';
import { OutputNode } from './components/OutputNode';
import { TextNode } from './components/TextNode';
import { ApiNode } from './components/ApiNode';
import { DatabaseNode } from './components/DatabaseNode';
import { ConditionalNode } from './components/ConditionalNode';
import { JsCodeNode } from './components/JsCodeNode';
import { DelayNode } from './components/DelayNode';

export const nodeCategories = [
  { id: 'core', label: 'Core Elements' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'logic', label: 'Logic & Workflow' }
];

export const nodeRegistry = {
  customInput: {
    component: InputNode,
    label: 'Input',
    category: 'core',
    icon: Download,
    theme: 'input',
    initialData: (id) => ({
      inputName: id.replace('customInput-', 'input_'),
      inputType: 'Text'
    })
  },
  llm: {
    component: LLMNode,
    label: 'LLM',
    category: 'core',
    icon: Bot,
    theme: 'llm',
    initialData: () => ({
      model: 'GPT-4o'
    })
  },
  customOutput: {
    component: OutputNode,
    label: 'Output',
    category: 'core',
    icon: Upload,
    theme: 'output',
    initialData: (id) => ({
      outputName: id.replace('customOutput-', 'output_'),
      outputType: 'Text'
    })
  },
  text: {
    component: TextNode,
    label: 'Text',
    category: 'core',
    icon: FileText,
    theme: 'text',
    initialData: () => ({
      text: '{{ input }}'
    })
  },
  api: {
    component: ApiNode,
    label: 'API Request',
    category: 'integrations',
    icon: Globe,
    theme: 'data',
    initialData: () => ({
      url: '',
      method: 'GET'
    })
  },
  database: {
    component: DatabaseNode,
    label: 'Database',
    category: 'integrations',
    icon: Database,
    theme: 'logic',
    initialData: () => ({
      query: '',
      dbType: 'PostgreSQL'
    })
  },
  conditional: {
    component: ConditionalNode,
    label: 'Condition',
    category: 'logic',
    icon: GitFork,
    theme: 'logic',
    initialData: () => ({
      condition: 'equals'
    })
  },
  jsCode: {
    component: JsCodeNode,
    label: 'JS Script',
    category: 'logic',
    icon: Zap,
    theme: 'error',
    initialData: () => ({
      code: '// Enter code here'
    })
  },
  delay: {
    component: DelayNode,
    label: 'Delay',
    category: 'logic',
    icon: Clock,
    theme: 'output',
    initialData: () => ({
      delayMs: 1000
    })
  }
};
