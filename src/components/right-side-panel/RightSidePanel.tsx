import React, { useState, useEffect } from 'react';
import { RiSidebarFoldLine, RiSidebarUnfoldLine } from "react-icons/ri";
import { QuickActions } from "../quick-actions/QuickActions";
import './right-side-panel.scss';

interface RightSidePanelProps {
  onOpenChange?: (isOpen: boolean) => void;
}

export function RightSidePanel({ onOpenChange }: RightSidePanelProps) {
  const [open, setOpen] = useState(true);

  // Notify parent of open state changes
  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  return (
    <div className={`right-side-panel ${open ? "open" : ""}`}>
      <header className="top">
        <h2>Actions</h2>
        {open ? (
          <button className="opener" onClick={() => setOpen(false)}>
            <RiSidebarFoldLine color="#b4b8bb" />
          </button>
        ) : (
          <button className="opener" onClick={() => setOpen(true)}>
            <RiSidebarUnfoldLine color="#b4b8bb" />
          </button>
        )}
      </header>
      <div className="panel-container">
        <div className="quick-actions-section">
          <QuickActions />
        </div>
      </div>
    </div>
  );
} 