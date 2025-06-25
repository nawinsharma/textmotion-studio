'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

interface DialogueState {
  text: string;
  isRunning: boolean;
  rotate: boolean;
  sineWave: boolean;
  italic: boolean;
  bold: boolean;
  waveAmplitude: number;
  waveTime: number;
}

interface CharacterProps {
  char: string;
  index: number;
  effects: DialogueState;
  isVisible: boolean;
}

const AnimatedCharacter: React.FC<CharacterProps> = ({ char, index, effects, isVisible }) => {
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

export default function DialogueSystem() {
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

  useEffect(() => {
    setVisibleChars(new Array(state.text.length).fill(true));
  }, [state.text]);

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
    setState(prev => ({ ...prev, text: inputText }));
  };

  const updateState = (key: keyof DialogueState, value: boolean | number) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-violet-800 text-white px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="font-semibold">shit test</span>
            </div>
            <div className="flex space-x-2">
              <button className="w-4 h-4 bg-yellow-400 rounded-full"></button>
              <button className="w-4 h-4 bg-green-400 rounded-full"></button>
              <button className="w-4 h-4 bg-red-400 rounded-full"></button>
            </div>
          </div>

          <div className="bg-gray-200 px-4 py-1 border-b">
            <div className="flex space-x-4 text-sm">
              <span>File</span>
              <span>Options</span>
              <span>Help</span>
            </div>
          </div>

          <div className="p-6">
            <div className="bg-white border-2 border-gray-300 rounded p-6 mb-6 min-h-[200px] flex items-center">
              <div className="text-2xl leading-relaxed font-mono">
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

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Panel */}
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <button
                    onClick={handleRun}
                    className={`px-6 py-2 rounded border-2 font-semibold transition-colors ${
                      state.isRunning
                        ? 'bg-red-500 text-white border-red-600'
                        : 'bg-green-500 text-white border-green-600'
                    }`}
                  >
                    {state.isRunning ? 'Stop' : 'Run'}
                  </button>
                  <button
                    onClick={handleDestroyChars}
                    className="px-6 py-2 bg-red-600 text-white rounded border-2 border-red-700 font-semibold hover:bg-red-700 transition-colors"
                  >
                    Destroy chars
                  </button>
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="rotate"
                      checked={state.rotate}
                      onCheckedChange={(checked) => updateState('rotate', checked === true)}
                    />
                    <label htmlFor="rotate" className="text-sm font-medium cursor-pointer">
                      Rotate
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="sineWave"
                      checked={state.sineWave}
                      onCheckedChange={(checked) => updateState('sineWave', checked === true)}
                    />
                    <label htmlFor="sineWave" className="text-sm font-medium cursor-pointer">
                      Sine Wave
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="italic"
                      checked={state.italic}
                      onCheckedChange={(checked) => updateState('italic', checked === true)}
                    />
                    <label htmlFor="italic" className="text-sm font-medium cursor-pointer">
                      Italic
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="bold"
                      checked={state.bold}
                      onCheckedChange={(checked) => updateState('bold', checked === true)}
                    />
                    <label htmlFor="bold" className="text-sm font-medium cursor-pointer">
                      Bold
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Panel */}
              <div className="space-y-6">
                {/* Wave Amplitude Slider */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium">
                    Wave Amplitude
                  </label>
                  <Slider
                    value={[state.waveAmplitude]}
                    onValueChange={(value) => updateState('waveAmplitude', value[0])}
                    max={50}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">
                    {state.waveAmplitude}
                  </div>
                </div>

                {/* Wave Time Slider */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium">
                    Wave Time
                  </label>
                  <Slider
                    value={[state.waveTime]}
                    onValueChange={(value) => updateState('waveTime', value[0])}
                    max={5}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">
                    {state.waveTime.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>

            {/* Text Input */}
            <form onSubmit={handleTextSubmit} className="mt-6">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                placeholder="Enter your dialogue text here..."
              />
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 mt-4 text-sm">
          textmotion-studio @ 2025
          <Link href="https://nawin.xyz" target="_blank" className="text-blue-500 hover:text-blue-600 ml-3">nawin.xyz</Link>
        </div>
      </div>
    </div>
  );
}
