"use client";

import { useState } from 'react';
import GameBoard from '@/components/game/GameBoard';
import Sidebar from '@/components/game/Sidebar';
import Toolbar from '@/components/game/Toolbar';
import GameStatus from '@/components/game/GameStatus';
import GameTips from '@/components/game/GameTips';

export interface GameState {
  money: number;
  prisoners: number;
  cells: number;
  guards: number;
  selectedTool: string;
  isPaused: boolean;
}

export default function PrisonArchitectClone() {
  const [gameState, setGameState] = useState<GameState>({
    money: 50000,
    prisoners: 0,
    cells: 0,
    guards: 2,
    selectedTool: 'wall',
    isPaused: false
  });

  const [showTips, setShowTips] = useState(false);

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col h-screen">
        {/* Toolbar */}
        <div className="bg-gray-800 border-b border-gray-700">
          <Toolbar 
            gameState={gameState} 
            updateGameState={updateGameState}
            onShowTips={() => setShowTips(true)}
          />
        </div>

        {/* Main Game Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-gray-800 border-r border-gray-700">
            <Sidebar 
              selectedTool={gameState.selectedTool}
              onToolSelect={(tool) => updateGameState({ selectedTool: tool })}
            />
          </div>

          {/* Game Board */}
          <div className="flex-1 relative">
            <GameBoard 
              gameState={gameState}
              updateGameState={updateGameState}
            />
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-800 border-t border-gray-700">
          <GameStatus gameState={gameState} />
        </div>
      </div>

      {/* AI Tips Modal */}
      {showTips && (
        <GameTips 
          gameState={gameState}
          onClose={() => setShowTips(false)}
        />
      )}
    </div>
  );
}
