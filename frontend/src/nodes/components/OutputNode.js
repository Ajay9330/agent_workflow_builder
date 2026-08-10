import React, { useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../BaseNode';
import { useStore } from '../../store/useStore';
import { Upload } from 'lucide-react';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const currName = data?.outputName || id.replace('customOutput-', 'output_');
  const outputType = data?.outputType || 'Text';

  const handleNameChange = (e) => {
    updateNodeField(id, 'outputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    updateNodeField(id, 'outputType', e.target.value);
  };

  useEffect(() => {
    if (data?.outputName === undefined) {
      updateNodeField(id, 'outputName', id.replace('customOutput-', 'output_'));
    }
    if (data?.outputType === undefined) {
      updateNodeField(id, 'outputType', 'Text');
    }
  }, [id, data, updateNodeField]);

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-value`,
      label: 'Value',
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Output"
      subtitle="Output Parameter"
      icon={<Upload size={14} />}
      theme="output"
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
        <select value={outputType} onChange={handleTypeChange} className="nodrag">
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
