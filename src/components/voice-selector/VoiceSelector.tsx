import React, { useCallback } from 'react';
import { useLiveAPIContext } from '../../contexts/LiveAPIContext';
import type { LiveConfig } from '../../multimodal-live-types';

interface Voice {
  id: string;
  name: string;
}

const voices: Voice[] = [
  { id: 'alloy', name: 'Alloy' },
  { id: 'echo', name: 'Echo' },
  { id: 'fable', name: 'Fable' },
  { id: 'onyx', name: 'Onyx' },
  { id: 'nova', name: 'Nova' },
  { id: 'shimmer', name: 'Shimmer' }
];

export function VoiceSelector() {
  const { config, setConfig } = useLiveAPIContext();

  const handleVoiceChange = useCallback((voiceName: Voice['id']) => {
    console.log('Changing voice to:', voiceName);
    
    const newConfig: LiveConfig = {
      ...config,
      model: config.model,
      generationConfig: {
        ...config.generationConfig,
        responseModalities: "audio" as const,
        temperature: config.generationConfig?.temperature ?? 0.7,
        candidateCount: config.generationConfig?.candidateCount ?? 1,
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName
            }
          }
        }
      }
    };

    console.log('New config:', newConfig);
    setConfig(newConfig);

    // Force a refresh of the audio context
    setTimeout(() => {
      const refreshConfig = { ...newConfig };
      setConfig(refreshConfig);
    }, 100);
  }, [config, setConfig]);

  const currentVoice = config?.generationConfig?.speechConfig?.voiceConfig?.prebuiltVoiceConfig?.voiceName;
  console.log('Current voice:', currentVoice);

  return (
    <div className="voice-selector">
      <label htmlFor="voice-select">Voice:</label>
      <select 
        id="voice-select"
        onChange={(e) => handleVoiceChange(e.target.value)}
        value={currentVoice || 'alloy'}
      >
        {voices.map((voice) => (
          <option key={voice.id} value={voice.id}>
            {voice.name}
          </option>
        ))}
      </select>
    </div>
  );
} 