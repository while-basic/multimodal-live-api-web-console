import { useState, useEffect } from 'react';
import { CustomQuickAction } from '../types/quick-actions';

const STORAGE_KEY = 'custom_quick_actions';

export const useCustomActions = () => {
  const [customActions, setCustomActions] = useState<CustomQuickAction[]>([]);

  // Load custom actions from localStorage on mount
  useEffect(() => {
    const savedActions = localStorage.getItem(STORAGE_KEY);
    if (savedActions) {
      try {
        setCustomActions(JSON.parse(savedActions));
      } catch (error) {
        console.error('Error loading custom actions:', error);
      }
    }
  }, []);

  // Save custom actions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customActions));
  }, [customActions]);

  const saveCustomAction = (action: CustomQuickAction) => {
    setCustomActions(prev => [...prev, action]);
  };

  const deleteCustomAction = (actionId: string) => {
    setCustomActions(prev => prev.filter(action => action.id !== actionId));
  };

  return {
    customActions,
    saveCustomAction,
    deleteCustomAction
  };
}; 