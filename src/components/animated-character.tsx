'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CharacterProps } from '@/types/dialogue';

export const AnimatedCharacter: React.FC<CharacterProps> = ({ char, index, effects, isVisible }) => {
  const [rotation, setRotation] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!effects.isRunning) return;

    const animate = () => {
      timeRef.current += 0.02;
      
      if (effects.rotate) {
        setRotation(timeRef.current * 50 + index * 10);
      }
      
      if (effects.sineWave) {
        const wave = Math.sin(timeRef.current * effects.waveTime + index * 0.5) * effects.waveAmplitude;
        setYOffset(wave);
      }
    };

    const interval = setInterval(animate, 16); // ~60fps
    return () => clearInterval(interval);
  }, [effects, index]);

  if (!isVisible) return null;

  const style: React.CSSProperties = {
    display: 'inline-block',
    transform: `rotate(${effects.rotate ? rotation : 0}deg) translateY(${effects.sineWave ? yOffset : 0}px)`,
    fontStyle: effects.italic ? 'italic' : 'normal',
    fontWeight: effects.bold ? 'bold' : 'normal',
    transition: effects.isRunning ? 'none' : 'transform 0.3s ease',
  };

  return (
    <span style={style} className="inline-block">
      {char === ' ' ? '\u00A0' : char}
    </span>
  );
}; 