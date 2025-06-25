'use client';

import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { DialogueState } from '@/types/dialogue';

interface DialogueControlsProps {
  state: DialogueState;
  inputText: string;
  onStateUpdate: (key: keyof DialogueState, value: boolean | number) => void;
  onRun: () => void;
  onDestroyChars: () => void;
  onInputChange: (value: string) => void;
  onTextSubmit: (e: React.FormEvent) => void;
}

export const DialogueControls: React.FC<DialogueControlsProps> = ({
  state,
  inputText,
  onStateUpdate,
  onRun,
  onDestroyChars,
  onInputChange,
  onTextSubmit,
}) => {
  return (
    <>
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Button
              onClick={onRun}
              className={`px-6 py-2 rounded border-2 font-semibold transition-colors ${
                state.isRunning
                  ? 'bg-red-500 text-white border-red-600'
                  : 'bg-green-500 text-white border-green-600'
              }`}
            >
              {state.isRunning ? 'Stop' : 'Run'}
            </Button>
            <Button
              onClick={onDestroyChars}
              className="px-6 py-2 bg-red-600 text-white rounded border-2 border-red-700 font-semibold hover:bg-red-700 transition-colors"
            >
              Destroy chars
            </Button>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="rotate"
                checked={state.rotate}
                onCheckedChange={(checked) => onStateUpdate('rotate', checked === true)}
              />
              <label htmlFor="rotate" className="text-sm font-medium cursor-pointer text-foreground">
                Rotate
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="sineWave"
                checked={state.sineWave}
                onCheckedChange={(checked) => onStateUpdate('sineWave', checked === true)}
              />
              <label htmlFor="sineWave" className="text-sm font-medium cursor-pointer text-foreground">
                Sine Wave
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="italic"
                checked={state.italic}
                onCheckedChange={(checked) => onStateUpdate('italic', checked === true)}
              />
              <label htmlFor="italic" className="text-sm font-medium cursor-pointer text-foreground">
                Italic
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="bold"
                checked={state.bold}
                onCheckedChange={(checked) => onStateUpdate('bold', checked === true)}
              />
              <label htmlFor="bold" className="text-sm font-medium cursor-pointer text-foreground">
                Bold
              </label>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Wave Amplitude Slider */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Wave Amplitude
            </label>
            <Slider
              value={[state.waveAmplitude]}
              onValueChange={(value) => onStateUpdate('waveAmplitude', value[0])}
              max={50}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="text-center text-sm text-muted-foreground">
              {state.waveAmplitude}
            </div>
          </div>

          {/* Wave Time Slider */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Wave Time
            </label>
            <Slider
              value={[state.waveTime]}
              onValueChange={(value) => onStateUpdate('waveTime', value[0])}
              max={5}
              min={0.1}
              step={0.1}
              className="w-full"
            />
            <div className="text-center text-sm text-muted-foreground">
              {state.waveTime.toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      {/* Text Input */}
      <form onSubmit={onTextSubmit} className="mt-6">
        <input
          type="text"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          className="w-full px-4 py-2 border-2 border-input rounded bg-background text-foreground focus:border-ring focus:outline-none"
          placeholder="Enter your dialogue text here..."
        />
      </form>
    </>
  );
}; 