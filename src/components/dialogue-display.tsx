'use client';

import React from 'react';
import { AnimatedCharacter } from './animated-character';
import { DialogueState } from '@/types/dialogue';

interface DialogueDisplayProps {
  state: DialogueState;
  visibleChars: boolean[];
}

export const DialogueDisplay: React.FC<DialogueDisplayProps> = ({ state, visibleChars }) => {
  return (
    <div className="bg-background border-2 border-border rounded p-6 mb-6 min-h-[200px] flex items-center">
      <div className="text-2xl leading-relaxed font-mono text-foreground">
        {state.text.split('').map((char, index) => (
          <AnimatedCharacter
            key={index}
            char={char}
            index={index}
            effects={state}
            isVisible={visibleChars[index]}
          />
        ))}
      </div>
    </div>
  );
}; 