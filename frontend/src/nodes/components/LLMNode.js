import React, { useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../BaseNode';
import { useStore } from '../../store/useStore';
import { Bot } from 'lucide-react';

export const LLMNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const model = data?.model || 'GPT-4o';

  const handleModelChange = (e) => {
    updateNodeField(id, 'model', e.target.value);
  };

  useEffect(() => {
    if (data?.model === undefined) {
      updateNodeField(id, 'model', 'GPT-4o');
    }
  }, [id, data, updateNodeField]);

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-system`,
      style: { top: '33%' },
      label: 'System',
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: '66%' },
      label: 'Prompt',
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-response`,
      style: { top: '50%' },
      label: 'Response',
    },
  ];

  return (
    <BaseNode
      id={id}
      title="LLM"
      subtitle="OpenAI / Gemini / Claude"
      icon={<Bot size={14} />}
      theme="llm"
      handles={handles}
      style={{ width: '200px' }}
    >
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', padding: '4px 0', lineHeight: '1.4' }}>
        Processes prompt queries using configured system instructions.
      </div>
      <label>
        Model
        <select value={model} onChange={handleModelChange} className="nodrag">
          <option value="GPT-4o">GPT-4o (OpenAI)</option>
          <option value="GPT-4-turbo">GPT-4 Turbo (OpenAI)</option>
          <option value="GPT-3.5-turbo">GPT-3.5 Turbo (OpenAI)</option>
          <option value="Gemini-1.5-Pro">Gemini 1.5 Pro (Google)</option>
          <option value="Gemini-1.5-Flash">Gemini 1.5 Flash (Google)</option>
          <option value="Claude-3.5-Sonnet">Claude 3.5 Sonnet (Anthropic)</option>
          <option value="Llama-3-70b">Llama 3 70B (Meta)</option>
        </select>
      </label>
    </BaseNode>
  );
};
