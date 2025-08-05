"use client";

import { useState } from 'react';
import { GameState } from '@/app/page';

interface GameTipsProps {
  gameState: GameState;
  onClose: () => void;
}

export default function GameTips({ gameState, onClose }: GameTipsProps) {
  const [tip, setTip] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const generateTip = async () => {
    setIsLoading(true);
    setError('');
    setTip('');

    try {
      const response = await fetch('/api/game-tips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameState: {
            money: gameState.money,
            prisoners: gameState.prisoners,
            cells: gameState.cells,
            guards: gameState.guards,
            selectedTool: gameState.selectedTool,
            isPaused: gameState.isPaused
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTip(data.tip);
    } catch (err) {
      console.error('Error generating tip:', err);
      setError('Failed to generate tip. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getQuickTips = () => {
    const tips = [];
    
    if (gameState.cells === 0) {
      tips.push("🏗️ Start by building prison cells to house incoming prisoners");
    }
    
    if (gameState.money < 5000) {
      tips.push("💰 Your budget is running low - consider your spending carefully");
    }
    
    if (gameState.cells > 0 && gameState.prisoners === 0) {
      tips.push("👥 You have empty cells - prisoners will arrive automatically");
    }
    
    if (gameState.prisoners > gameState.cells) {
      tips.push("⚠️ You have more prisoners than cells - build more cells to avoid overcrowding");
    }
    
    const guardRatio = gameState.prisoners > 0 ? gameState.guards / gameState.prisoners : 1;
    if (guardRatio < 0.2) {
      tips.push("🛡️ Consider hiring more guards to maintain security");
    }
    
    return tips;
  };

  const quickTips = getQuickTips();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">AI Prison Management Tips</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Current Game State Summary */}
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Current Prison Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-green-400 font-bold text-xl">${gameState.money.toLocaleString()}</div>
              <div className="text-gray-400">Budget</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold text-xl">{gameState.cells}</div>
              <div className="text-gray-400">Cells</div>
            </div>
            <div className="text-center">
              <div className="text-orange-400 font-bold text-xl">{gameState.prisoners}</div>
              <div className="text-gray-400">Prisoners</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-bold text-xl">{gameState.guards}</div>
              <div className="text-gray-400">Guards</div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        {quickTips.length > 0 && (
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Quick Tips</h3>
            <div className="space-y-2">
              {quickTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2 text-gray-300">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI-Generated Tip Section */}
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">AI Strategic Advice</h3>
            <button
              onClick={generateTip}
              disabled={isLoading}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              {isLoading ? 'Generating...' : 'Get AI Tip'}
            </button>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              <span className="ml-3 text-gray-300">AI is analyzing your prison...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-900 border border-red-600 rounded-lg p-4">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {tip && (
            <div className="bg-purple-900 border border-purple-600 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="text-purple-400 text-xl">🤖</div>
                <div className="flex-1">
                  <h4 className="text-purple-300 font-semibold mb-2">AI Recommendation:</h4>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{tip}</p>
                </div>
              </div>
            </div>
          )}

          {!tip && !isLoading && !error && (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-2">🤖</div>
              <p>Click "Get AI Tip" to receive personalized advice based on your current prison state.</p>
            </div>
          )}
        </div>

        {/* General Strategy Tips */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">General Strategy</h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-2">
              <span className="text-green-400">💡</span>
              <span><strong>Start Small:</strong> Build a few cells first, then expand as you get more prisoners and income.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400">🏗️</span>
              <span><strong>Plan Layout:</strong> Use walls to create secure areas and control prisoner movement.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-400">⚖️</span>
              <span><strong>Balance Security:</strong> Maintain a good guard-to-prisoner ratio for safety.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400">💰</span>
              <span><strong>Manage Budget:</strong> Each prisoner generates income, but facilities cost money to build and maintain.</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
