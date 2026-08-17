import React, { useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../BaseNode';
import { useStore } from '../../store/useStore';
import { Zap } from 'lucide-react';

export const JsCodeNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const textareaRef = useRef(null);

  const code = data?.code || '// Write JS code here\nreturn args.value * 2;';

  const handleCodeChange = (e) => {
    updateNodeField(id, 'code', e.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  useEffect(() => {
    if (data?.code === undefined) {
      updateNodeField(id, 'code', '// Write JS code here\nreturn args.value * 2;');
    }
  }, [id, data, updateNodeField]);

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-args`,
      style: { top: '50%' },
      label: 'Args',
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-result`,
      style: { top: '50%' },
      label: 'Result',
    },
  ];

  return (
    <BaseNode
      id={id}
      title="JavaScript Logic"
      subtitle="Custom Function"
      icon={<Zap size={14} />}
      theme="error"
      handles={handles}
      style={{ width: '240px' }}
    >
      <label>
        Script Execution
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleCodeChange}
          rows={3}
          className="nodrag"
          style={{
            minHeight: '60px',
            fontFamily: 'monospace',
            fontSize: '0.68rem',
            overflowY: 'hidden',
          }}
        />
      </label>
    </BaseNode>
  );
};
