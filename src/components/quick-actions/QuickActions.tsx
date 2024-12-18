import React, { useState } from 'react';
import { useLiveAPIContext } from '../../contexts/LiveAPIContext';
import { FaPlus } from 'react-icons/fa';
import { CreateActionModal } from './CreateActionModal';
import { useCustomActions } from '../../hooks/use-custom-actions';
import { QuickAction, CustomQuickAction } from '../../types/quick-actions';
import './quick-actions.scss';

export function QuickActions() {
  const { client, connected } = useLiveAPIContext();
  const [isResponding, setIsResponding] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { customActions, saveCustomAction, deleteCustomAction } = useCustomActions();

  const handleAction = async (actionFn: () => Promise<void>) => {
    setIsResponding(true);
    try {
      await actionFn();
    } finally {
      setIsResponding(false);
    }
  };

  const builtInActions: QuickAction[] = [
    {
      id: 'motivate',
      label: 'Motivate Me',
      description: 'Get motivated',
      action: async () => {
        await client.send([{ 
          text: 'Give me a motivational message to lift me up when I am feeling down.' 
        }]);
      },
      icon: '💪'
    },
    // ... other existing actions
  ];

  const allActions = [...builtInActions, ...customActions];

  const handleSaveCustomAction = (action: CustomQuickAction) => {
    saveCustomAction(action);
    setShowCreateModal(false);
  };

  return (
    <>
      <div className="quick-actions">
        <div className="quick-actions-header">
          <h3>Quick Actions</h3>
          <div className="header-actions">
            <button 
              className="create-action-button"
              onClick={() => setShowCreateModal(true)}
              title="Create Custom Action"
            >
              <FaPlus />
            </button>
            <div className="connection-status" title={connected ? 'Connected' : 'Disconnected'}>
              {connected ? '🟢' : '🔴'}
            </div>
          </div>
        </div>
        
        <div className="quick-actions-list">
          {allActions.map((action) => (
            <div key={action.id} className="action-wrapper">
              <button
                className="quick-action-button"
                onClick={() => handleAction(action.action)}
                title={action.description}
                disabled={!connected || isResponding}
              >
                {action.icon && <span className="quick-action-icon">{action.icon}</span>}
                <span className="quick-action-label">{action.label}</span>
              </button>
              {'isCustom' in action && (
                <button 
                  className="delete-action"
                  onClick={() => deleteCustomAction(action.id)}
                  title="Delete custom action"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && (
        <CreateActionModal 
          onClose={() => setShowCreateModal(false)}
          onSave={handleSaveCustomAction}
          client={client}
        />
      )}
    </>
  );
} 