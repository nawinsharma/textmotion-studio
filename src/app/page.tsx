'use client';

import React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DialogueDisplay } from '@/components/dialogue-display';
import { DialogueControls } from '@/components/dialogue-controls';
import { useDialogue } from '@/hooks/use-dialogue';

export default function DialogueSystem() {
  const {
    state,
    visibleChars,
    inputText,
    handleRun,
    handleDestroyChars,
    handleTextSubmit,
    updateState,
    handleInputChange,
  } = useDialogue();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card border-2 border-border rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-violet-800 text-white px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="font-semibold">shit test</span>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <div className="flex space-x-2">
                <Button className="w-3 h-3 bg-red-500 hover:bg-red-600 rounded-full p-0 border-0 shadow-sm transition-colors duration-200"></Button>
                <Button className="w-3 h-3 bg-yellow-400 hover:bg-yellow-500 rounded-full p-0 border-0 shadow-sm transition-colors duration-200"></Button>
                <Button className="w-3 h-3 bg-green-500 hover:bg-green-600 rounded-full p-0 border-0 shadow-sm transition-colors duration-200"></Button>
              </div>
            </div>
          </div>

          <div className="bg-muted px-4 py-1 border-b border-border">
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <span>File</span>
              <span>Options</span>
              <span>Help</span>
            </div>
          </div>

          <div className="p-6">
            <DialogueDisplay state={state} visibleChars={visibleChars} />
            
            <DialogueControls
              state={state}
              inputText={inputText}
              onStateUpdate={updateState}
              onRun={handleRun}
              onDestroyChars={handleDestroyChars}
              onInputChange={handleInputChange}
              onTextSubmit={handleTextSubmit}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-muted-foreground mt-4 text-sm">
          textmotion-studio @ 2025
          <Link href="https://nawin.xyz" target="_blank" className="text-blue-500 hover:text-blue-600 ml-3">nawin.xyz</Link>
        </div>
      </div>
    </div>
  );
}
