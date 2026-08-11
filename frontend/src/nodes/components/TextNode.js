import React, { useEffect, useRef, useMemo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../BaseNode';
import { useStore } from '../../store/useStore';
import { FileText } from 'lucide-react';

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const currText = data?.text || '{{input}}';
  const textareaRef = useRef(null);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // Sync default value if empty
  useEffect(() => {
    if (data?.text === undefined) {
      updateNodeField(id, 'text', '{{input}}');
    }
  }, [id, data, updateNodeField]);

  const handleTextChange = (e) => {
    updateNodeField(id, 'text', e.target.value);
  };

  // Variable extraction: match {{ varName }}
  const variables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const found = [];
    let match;
    while ((match = regex.exec(currText)) !== null) {
      if (!found.includes(match[1])) {
        found.push(match[1]);
      }
    }
    return found;
  }, [currText]);

  // Dynamic Handles Construction
  const handles = useMemo(() => {
    const list = [];
    
    // Target handles for variables on the left
    variables.forEach((variable, index) => {
      const topPercentage = `${((index + 1) * 100) / (variables.length + 1)}%`;
      list.push({
        type: 'target',
        position: Position.Left,
        id: `${id}-${variable}`,
        style: { top: topPercentage },
        label: variable,
      });
    });

    // Output handle on the right
    list.push({
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
      label: 'Output',
    });

    return list;
  }, [id, variables]);

  return (
    <BaseNode
      id={id}
      title="Text Block"
      subtitle="Variable Extractor"
      icon={<FileText size={14} />}
      theme="text"
      handles={handles}
      style={{ width: '240px' }}
    >
      <label>
        Text
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          rows={1}
          className="nodrag"
          style={{
            minHeight: '40px',
            overflowY: 'hidden',
          }}
        />
      </label>
    </BaseNode>
  );
};
