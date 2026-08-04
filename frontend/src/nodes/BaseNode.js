// nodes/BaseNode.js
import React from 'react';
import { Handle } from 'reactflow';
import { useStore } from '../store/useStore';
import './BaseNode.css';

export const BaseNode = ({
  id,
  title,
  subtitle,
  icon,
  theme = 'input', // 'input', 'output', 'llm', 'text', 'logic', 'data', 'error'
  handles = [],
  children,
  style = {},
}) => {
  const deleteNode = useStore((state) => state.deleteNode);

  return (
    <div 
      className={`base-node theme-${theme}`}
      style={{
        ...style,
      }}
    >
      <div className="base-node-header">
        <div className="base-node-indicator" />
        <span className="base-node-icon">{icon}</span>
        <div className="base-node-header-text">
          <span className="base-node-title">{title}</span>
          {subtitle && <span className="base-node-subtitle">{subtitle}</span>}
        </div>
        <button 
          className="node-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            deleteNode(id);
          }}
          title="Delete Node"
        >
          ✕
        </button>
      </div>

      {/* Body content */}
      <div className="base-node-content">
        {children}
      </div>


      {/* Connection Handles & Labels mapped directly as children of card */}
      {handles.map((handle, idx) => {
        const handleStyle = {
          ...handle.style,
        };

        return (
          <React.Fragment key={`${id}-handle-key-${idx}`}>
            <Handle
              type={handle.type}
              position={handle.position}
              id={handle.id}
              style={handleStyle}
              className={`custom-handle handle-${handle.type} position-${handle.position}`}
            />
            {handle.label && (
              <span 
                className={`handle-label label-${handle.position}`}
                style={{ top: handleStyle.top || '50%' }}
              >
                {handle.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
