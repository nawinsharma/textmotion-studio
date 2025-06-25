'use client';

import { useState, useEffect, useRef } from 'react';
import { DialogueState } from '@/types/dialogue';

export const useDialogue = () => {
  const [state, setState] = useState<DialogueState>({
    text: 'This is the new dialogue system. There\'s so much custom stuff!',
    isRunning: false,
    rotate: true,
    sineWave: false,
    italic: true,
    bold: true,
    waveAmplitude: 10,
    waveTime: 2,
  });

  const [visibleChars, setVisibleChars] = useState<boolean[]>([]);
  const [inputText, setInputText] = useState('This is the new dialogue system. There\'s so much custom stuff!');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setVisibleChars(new Array(state.text.length).fill(true));
  }, [state.text]);

  // Debounced text update effect
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setState(prev => ({ ...prev, text: inputText }));
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [inputText]);

  const handleRun = () => {
    setState(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const handleDestroyChars = () => {
    const newVisibleChars = [...visibleChars];
    const visibleIndices = newVisibleChars
      .map((visible, index) => visible ? index : -1)
      .filter(index => index !== -1);
    
    if (visibleIndices.length > 0) {
      const randomIndex = visibleIndices[Math.floor(Math.random() * visibleIndices.length)];
      newVisibleChars[randomIndex] = false;
      setVisibleChars(newVisibleChars);
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const updateState = (key: keyof DialogueState, value: boolean | number) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const handleInputChange = (value: string) => {
    setInputText(value);
  };

  return {
    state,
    visibleChars,
    inputText,
    handleRun,
    handleDestroyChars,
    handleTextSubmit,
    updateState,
    handleInputChange,
  };
}; 