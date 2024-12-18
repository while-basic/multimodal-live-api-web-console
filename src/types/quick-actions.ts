// import { MultimodalLiveClient } from '../lib/multimodal-live-client';

export interface QuickAction {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  action: () => Promise<void>;
}

export interface CustomQuickAction extends QuickAction {
  isCustom: true;
  prompt: string;
} 