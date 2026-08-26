import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8001/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setIsOpen(true);
    } catch (err) {
      console.error('Submission failed:', err);
      alert(`Submission failed: ${err.message || 'Connection refused'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        type="button" 
        onClick={handleSubmit} 
        disabled={loading}
        className="submit-btn"
      >
        {loading ? 'Analyzing...' : 'Run Analysis'}
      </button>

      {/* Modal Overlay */}
      {isOpen && result && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <span className="modal-title">Pipeline Analysis</span>
              <button className="modal-close-btn" onClick={() => setIsOpen(false)}>
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <div className="metric-row">
                <div className="metric-card">
                  <span className="metric-label">Nodes</span>
                  <span className="metric-value">{result.num_nodes}</span>
                </div>
                <div className="metric-card">
                  <span className="metric-label">Edges</span>
                  <span className="metric-value">{result.num_edges}</span>
                </div>
              </div>

              {/* DAG Cycle Status Card */}
              <div className={`dag-status-card ${result.is_dag ? 'status-dag' : 'status-cycle'}`}>
                <div className="status-icon">
                  {result.is_dag ? '✓' : '✗'}
                </div>
                <div className="status-details">
                  <span className="status-title">
                    {result.is_dag ? 'Valid Pipeline Structure' : 'Cycle Detected'}
                  </span>
                  <span className="status-desc">
                    {result.is_dag 
                      ? 'No feedback loops detected. The pipeline graph is a valid Directed Acyclic Graph (DAG).'
                      : 'The pipeline contains feedback loops or self-referential cycles, which will block compilation.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button className="modal-action-btn" onClick={() => setIsOpen(false)}>
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
