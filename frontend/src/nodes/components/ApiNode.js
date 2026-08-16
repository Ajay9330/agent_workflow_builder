import React, { useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../BaseNode';
import { useStore } from '../../store/useStore';
import { Globe } from 'lucide-react';

export const ApiNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const url = data?.url || 'https://api.example.com/v1';
  const method = data?.method || 'GET';

  const handleUrlChange = (e) => {
    updateNodeField(id, 'url', e.target.value);
  };

  const handleMethodChange = (e) => {
    updateNodeField(id, 'method', e.target.value);
  };

  useEffect(() => {
    if (data?.url === undefined) {
      updateNodeField(id, 'url', 'https://api.example.com/v1');
    }
    if (data?.method === undefined) {
      updateNodeField(id, 'method', 'GET');
    }
  }, [id, data, updateNodeField]);

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-trigger`,
      style: { top: '50%' },
      label: 'Trigger',
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-response`,
      style: { top: '33%' },
      label: 'Response',
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-error`,
      style: { top: '66%' },
      label: 'Error',
    },
  ];

  return (
    <BaseNode
      id={id}
      title="API Request"
      subtitle="REST Integration"
      icon={<Globe size={14} />}
      theme="data"
      handles={handles}
      style={{ width: '220px' }}
    >
      <label>
        URL
        <input 
          type="text" 
          value={url} 
          onChange={handleUrlChange} 
          placeholder="https://api.com"
          className="nodrag"
        />
      </label>
      <label>
        Method
        <select value={method} onChange={handleMethodChange} className="nodrag">
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
    </BaseNode>
  );
};
