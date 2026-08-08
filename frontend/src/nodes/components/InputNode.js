import React, { useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../BaseNode';
import { useStore } from '../../store/useStore';
import { Download } from 'lucide-react';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const currName = data?.inputName || id.replace('customInput-', 'input_');
  const inputType = data?.inputType || 'Text';

  const handleNameChange = (e) => {
    updateNodeField(id, 'inputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    updateNodeField(id, 'inputType', e.target.value);
  };

  useEffect(() => {
    if (data?.inputName === undefined) {
      updateNodeField(id, 'inputName', id.replace('customInput-', 'input_'));
    }
    if (data?.inputType === undefined) {
      updateNodeField(id, 'inputType', 'Text');
    }
  }, [id, data, updateNodeField]);

  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-value`,
      label: 'Value',
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Input"
      subtitle="Input Parameter"
      icon={<Download size={14} />}
      theme="input"
      handles={handles}
      style={{ width: '200px' }}
    >
      <label>
        Name
        <input 
          type="text" 
          value={currName} 
          onChange={handleNameChange} 
          className="nodrag"
        />
      </label>
      <label>
        Type
        <select value={inputType} onChange={handleTypeChange} className="nodrag">
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
