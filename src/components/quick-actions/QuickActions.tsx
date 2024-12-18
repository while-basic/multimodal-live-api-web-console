import React, { useCallback, useState, useEffect } from 'react';
import { useLiveAPIContext } from '../../contexts/LiveAPIContext';
import { Visualizer } from '../visualizer/Visualizer';
import './quick-actions.scss';

interface QuickAction {
  id: string;
  label: string;
  action: () => Promise<void>;
  icon?: string;
  description?: string;
}

export function QuickActions() {
  const context = useLiveAPIContext();
  const [isResponding, setIsResponding] = useState(false);

  const { client, connected } = context || {};

  // Listen for AI response events
  useEffect(() => {
    if (!client) return;

    const cleanup = () => {
      setIsResponding(false);
    };

    // Listen for cleanup events
    window.addEventListener('beforeunload', cleanup);

    return () => {
      window.removeEventListener('beforeunload', cleanup);
    };
  }, [client]);

  const handleAction = useCallback(async (actionFn: () => Promise<void>) => {
    if (!client || !connected) return;
    
    try {
      setIsResponding(true);
      await actionFn();
      // Add delay before hiding visualizer
      setTimeout(() => setIsResponding(false), 3000);
    } catch (error) {
      console.error('Error executing quick action:', error);
      setIsResponding(false);
    }
  }, [client, connected]);

  if (!context || !client) {
    return (
      <div className="quick-actions">
        <div className="quick-actions-header">
          <h3>Quick Actions</h3>
        </div>
        <div className="quick-actions-list">
          <div className="quick-action-error">
            API connection not available
          </div>
        </div>
      </div>
    );
  }

  const actions: QuickAction[] = [
    {
      id: 'joke',
      label: 'Tell Joke',
      description: 'Hear a joke',
      action: async () => {
        await client.send([{ text: 'Tell me a joke' }]);
      },
      icon: '😂'
    },
    {
      id: 'summarize',
      label: 'Summarize Chat',
      description: 'Get a summary of current conversation',
      action: async () => {
        await client.send([{ 
          text: 'Please summarize our conversation so far.' 
        }]);
      },
      icon: '📋'
    },
    {
      id: 'translate',
      label: 'Translate',
      description: 'Translate last message to another language',
      action: async () => {
        await client.send([{ 
          text: 'Translate the last message to Spanish.' 
        }]);
      },
      icon: '🌐'
    },
    {
      id: 'bitcoin',
      label: 'Bitcoin Price',
      description: 'Get the price of Bitcoin',
      action: async () => {
        await client.send([{ 
          text: 'What is the current price of Bitcoin?' 
        }]);
      },
      icon: '₿'
    },
    {
      id: 'motivate',
      label: 'Motivate Me',
      description: 'Get motivated',
      action: async () => {
        await client.send([{ 
          text: 'Give me a short motivational message.' 
        }]);
      },
      icon: '💪'
    },
    {
      id: 'yoda',
      label: 'Yoda Speak',
      description: 'Speak like Yoda',
      action: async () => {
        await client.send([{ 
          text: 'Translate the last message into Yoda speak.' 
        }]);
      },
      icon: '🧙'
    },
    {
      id: 'fortune',
      label: 'Fortune',
      description: 'Get your fortune',
      action: async () => {
        await client.send([{ 
          text: 'Give me a fortune cookie message.' 
        }]);
      },
      icon: '🥠'
    },
    {
      id: 'quote',
      label: 'Quote',
      description: 'Get an inspirational quote',
      action: async () => {
        await client.send([{ 
          text: 'Share a short inspirational quote.' 
        }]);
      },
      icon: '💭'
    }
  ];

  return (
    <>
      <Visualizer isActive={isResponding} />
      <div className="quick-actions">
        <div className="quick-actions-header">
          <h3>Quick Actions</h3>
          <div className="connection-status" title={connected ? 'Connected' : 'Disconnected'}>
            {connected ? '🟢' : '🔴'}
          </div>
        </div>
        <div className="quick-actions-list">
          {actions.map((action) => (
            <button
              key={action.id}
              className="quick-action-button"
              onClick={() => handleAction(action.action)}
              title={action.description}
              disabled={!connected || isResponding}
            >
              {action.icon && <span className="quick-action-icon">{action.icon}</span>}
              <span className="quick-action-label">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
} 