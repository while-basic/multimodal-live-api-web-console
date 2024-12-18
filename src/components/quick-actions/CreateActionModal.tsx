import React, { useState } from 'react';
import { MultimodalLiveClient } from '../../lib/multimodal-live-client';
import { CustomQuickAction } from '../../types/quick-actions';
import './create-action-modal.scss';

interface CreateActionModalProps {
  onClose: () => void;
  onSave: (action: CustomQuickAction) => void;
  client: MultimodalLiveClient;
}

export function CreateActionModal({ onClose, onSave, client }: CreateActionModalProps) {
  const [label, setLabel] = useState('');
  const [prompt, setPrompt] = useState('');
  const [icon, setIcon] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!label || !prompt) return;

    const newAction: CustomQuickAction = {
      id: `custom-${Date.now()}`,
      label,
      prompt,
      icon,
      isCustom: true,
      description: prompt,
      action: async () => {
        await client.send([{ text: prompt }]);
      }
    };

    onSave(newAction);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Custom Action</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="label">Label</label>
            <input
              id="label"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Action name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="prompt">Prompt</label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What should the AI do?"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="icon">Icon (emoji)</label>
            <input
              id="icon"
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="Add an emoji"
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Action
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 