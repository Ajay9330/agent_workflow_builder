import React from 'react';
import { DraggableNode } from './DraggableNode';
import { nodeRegistry, nodeCategories } from '../nodes/registry';

export const PipelineToolbar = () => {
  return (
    <div className="toolbar-container">
      <div className="toolbar-groups">
        {nodeCategories.map((category) => {
          const categoryNodes = Object.entries(nodeRegistry).filter(
            ([, config]) => config.category === category.id
          );

          if (categoryNodes.length === 0) return null;

          return (
            <div className="toolbar-group" key={category.id}>
              <span className="toolbar-group-title">{category.label}</span>
              <div className="toolbar-items">
                {categoryNodes.map(([type, config]) => {
                  const IconComponent = config.icon;
                  return (
                    <DraggableNode
                      key={type}
                      type={type}
                      label={config.label}
                      icon={<IconComponent size={14} />}
                      theme={config.theme}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
