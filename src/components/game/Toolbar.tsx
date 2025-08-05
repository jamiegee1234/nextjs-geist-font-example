"use client";

import { GameState } from '@/app/page';

interface ToolbarProps {
  gameState: GameState;
  updateGameState: (updates: Partial<GameState>) => void;
  onShowTips: () => void;
}

export default function Toolbar({ gameState, updateGameState, onShowTips }: ToolbarProps) {
  const togglePause = () => {
    updateGameState({ isPaused: !gameState.isPaused });
  };

  const resetGame = () => {
    if (confirm('Are you sure you want to reset the game? This will clear all progress.')) {
      updateGameState({
        money: 50000,
        prisoners: 0,
        cells: 0,
        guards: 2,
        selectedTool: 'wall',
        isPaused: false
      });
      // Reload the page to reset the grid
      window.location.reload();
    }
  };

  const addMoney = () => {
    updateGameState({ money: gameState.money + 10000 });
  };

  return (
    <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
      <div className="flex items-center justify-between">
        {/* Left side - Game controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Prison Architect</h1>
            <span className="text-gray-400 text-sm">Clone</span>
          </div>
          
          <div className="h-6 w-px bg-gray-600"></div>
          
          <button
            onClick={togglePause}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              gameState.isPaused
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-yellow-600 hover:bg-yellow-700 text-white'
            }`}
          >
            {gameState.isPaused ? 'Resume' : 'Pause'}
          </button>

          <button
            onClick={resetGame}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Reset Game
          </button>

          <button
            onClick={onShowTips}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            AI Tips
          </button>
        </div>

        {/* Center - Game status indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${gameState.isPaused ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
            <span className="text-gray-300 text-sm">
              {gameState.isPaused ? 'Paused' : 'Running'}
            </span>
          </div>
          
          <div className="text-gray-400 text-sm">
            Time: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Right side - Quick actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={addMoney}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition-colors"
            title="Add $10,000 (Cheat)"
          >
            +$10K
          </button>
          
          <div className="text-gray-400 text-sm">
            Build Mode: <span className="text-blue-400 capitalize">{gameState.selectedTool}</span>
          </div>
        </div>
      </div>

      {/* Bottom row - Quick stats */}
      <div className="mt-2 pt-2 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="text-gray-300">
              <span className="text-gray-400">Money:</span> 
              <span className="text-green-400 font-medium ml-1">${gameState.money.toLocaleString()}</span>
            </div>
            <div className="text-gray-300">
              <span className="text-gray-400">Cells:</span> 
              <span className="text-blue-400 font-medium ml-1">{gameState.cells}</span>
            </div>
            <div className="text-gray-300">
              <span className="text-gray-400">Prisoners:</span> 
              <span className="text-orange-400 font-medium ml-1">{gameState.prisoners}</span>
            </div>
            <div className="text-gray-300">
              <span className="text-gray-400">Guards:</span> 
              <span className="text-purple-400 font-medium ml-1">{gameState.guards}</span>
            </div>
          </div>
          
          <div className="text-gray-400 text-xs">
            Capacity: {gameState.cells > 0 ? `${Math.round((gameState.prisoners / gameState.cells) * 100)}%` : '0%'}
          </div>
        </div>
      </div>
    </div>
  );
}
