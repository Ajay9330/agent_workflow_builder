import React from 'react';
import { PipelineToolbar } from './components/PipelineToolbar';
import { PipelineUI } from './components/PipelineUI';
import { SubmitButton } from './components/SubmitButton';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div className="brand-section">
            <span className="brand-logo">Workflow</span>
            <span className="brand-subtitle">Pipeline Builder</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ThemeToggle />
            <SubmitButton />
          </div>
        </div>
        <PipelineToolbar />
      </header>
      
      <main className="canvas-viewport">
        <PipelineUI />
      </main>
    </div>
  );
}

export default App;
