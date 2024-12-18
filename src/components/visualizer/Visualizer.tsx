import React from 'react';
import './visualizer.scss';

interface VisualizerProps {
  isActive: boolean;
}

export function Visualizer({ isActive }: VisualizerProps) {
  if (!isActive) return null;

  return (
    <div className="visualizer">
      <div className="visualizer-container">
        <div className="wave-container">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
        <div className="particle-container">
          {[...Array(80)].map((_, i) => (
            <div key={i} className="particle" style={{
              '--delay': `${Math.random() * 2}s`,
              '--position': `${Math.random() * 1000}%`
            } as React.CSSProperties} />
          ))}
        </div>
      </div>
    </div>
  );
} 