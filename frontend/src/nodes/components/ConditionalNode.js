import React, { useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../BaseNode';
import { useStore } from '../../store/useStore';
import { GitFork } from 'lucide-react';

export const ConditionalNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const condition = data?.condition || 'equals';
  const matchValue = data?.matchValue || '';

  const handleConditionChange = (e) => {
    updateNodeField(id, 'condition', e.target.value);
  };

  const handleMatchValueChange = (e) => {
    updateNodeField(id, 'matchValue', e.target.value);
  };

  useEffect(() => {
    if (data?.condition === undefined) {
      updateNodeField(id, 'condition', 'equals');
    }
    if (data?.matchValue === undefined) {
      updateNodeField(id, 'matchValue', '');
    }
  }, [id, data, updateNodeField]);

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input`,
      style: { top: '50%' },
      label: 'Input',
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-true`,
      style: { top: '33%' },
      label: 'True',
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-false`,
      style: { top: '66%' },
      label: 'False',
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Conditional branch"
      subtitle="Workflow Logic"
      icon={<GitFork size={14} />}
      theme="logic"
      handles={handles}
      style={{ width: '220px' }}
    >
      <label>
        Condition
        <select value={condition} onChange={handleConditionChange} className="nodrag">
          <option value="equals">Equals</option>
          <option value="contains">Contains</option>
          <option value="greater_than">Greater Than</option>
          <option value="less_than">Less Than</option>
        </select>
      </label>
      <label>
        Value to Match
        <input 
          type="text" 
          value={matchValue} 
          onChange={handleMatchValueChange} 
          placeholder="match value..."
          className="nodrag"
        />
      </label>
    </BaseNode>
  );
};
