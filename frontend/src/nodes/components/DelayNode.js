import React, { useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../BaseNode';
import { useStore } from '../../store/useStore';
import { Clock } from 'lucide-react';

export const DelayNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const duration = data?.duration || 1000;

  const handleDurationChange = (e) => {
    updateNodeField(id, 'duration', parseInt(e.target.value, 10) || 0);
  };

  useEffect(() => {
    if (data?.duration === undefined) {
      updateNodeField(id, 'duration', 1000);
    }
  }, [id, data, updateNodeField]);

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-in`,
      style: { top: '50%' },
      label: 'Input',
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-out`,
      style: { top: '50%' },
      label: 'Output',
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Execution Delay"
      subtitle="Utility Timer"
      icon={<Clock size={14} />}
      theme="output"
      handles={handles}
      style={{ width: '200px' }}
    >
      <label>
        Delay Duration (ms)
        <input 
          type="number" 
          value={duration} 
          onChange={handleDurationChange} 
          min="0"
          step="100"
          className="nodrag"
        />
      </label>
    </BaseNode>
  );
};
