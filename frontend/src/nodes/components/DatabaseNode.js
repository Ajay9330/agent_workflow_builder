import React, { useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../BaseNode';
import { useStore } from '../../store/useStore';
import { Database } from 'lucide-react';

export const DatabaseNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const textareaRef = useRef(null);

  const query = data?.query || 'SELECT * FROM users LIMIT 10;';
  const connection = data?.connection || 'PostgreSQL (Default)';

  const handleQueryChange = (e) => {
    updateNodeField(id, 'query', e.target.value);
  };

  const handleConnectionChange = (e) => {
    updateNodeField(id, 'connection', e.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

  useEffect(() => {
    if (data?.query === undefined) {
      updateNodeField(id, 'query', 'SELECT * FROM users LIMIT 10;');
    }
    if (data?.connection === undefined) {
      updateNodeField(id, 'connection', 'PostgreSQL (Default)');
    }
  }, [id, data, updateNodeField]);

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-params`,
      style: { top: '50%' },
      label: 'Params',
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-results`,
      style: { top: '50%' },
      label: 'Results',
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Database Query"
      subtitle="Relational DB"
      icon={<Database size={14} />}
      theme="logic"
      handles={handles}
      style={{ width: '240px' }}
    >
      <label>
        Connection
        <select value={connection} onChange={handleConnectionChange} className="nodrag">
          <option value="PostgreSQL (Default)">PostgreSQL</option>
          <option value="MySQL Server">MySQL</option>
          <option value="MongoDB Cluster">MongoDB</option>
          <option value="SQLite Local">SQLite</option>
        </select>
      </label>
      <label>
        SQL Query
        <textarea
          ref={textareaRef}
          value={query}
          onChange={handleQueryChange}
          rows={2}
          className="nodrag"
          style={{
            minHeight: '50px',
            fontFamily: 'monospace',
            fontSize: '0.68rem',
            overflowY: 'hidden',
          }}
        />
      </label>
    </BaseNode>
  );
};
