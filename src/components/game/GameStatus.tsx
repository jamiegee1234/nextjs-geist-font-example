"use client";

import { GameState } from '@/app/page';

interface GameStatusProps {
  gameState: GameState;
}

export default function GameStatus({ gameState }: GameStatusProps) {
  const getCapacityStatus = () => {
    if (gameState.cells === 0) return { percentage: 0, status: 'No cells built', color: 'text-gray-400' };
    
    const percentage = (gameState.prisoners / gameState.cells) * 100;
    
    if (percentage < 50) return { percentage, status: 'Low occupancy', color: 'text-green-400' };
    if (percentage < 80) return { percentage, status: 'Moderate occupancy', color: 'text-yellow-400' };
    if (percentage < 100) return { percentage, status: 'High occupancy', color: 'text-orange-400' };
    return { percentage, status: 'Overcrowded!', color: 'text-red-400' };
  };

  const getBudgetStatus = () => {
    if (gameState.money > 20000) return { status: 'Excellent', color: 'text-green-400' };
    if (gameState.money > 10000) return { status: 'Good', color: 'text-yellow-400' };
    if (gameState.money > 5000) return { status: 'Low', color: 'text-orange-400' };
    return { status: 'Critical', color: 'text-red-400' };
  };

  const getSecurityLevel = () => {
    const guardsPerPrisoner = gameState.prisoners > 0 ? gameState.guards / gameState.prisoners : 1;
    
    if (guardsPerPrisoner >= 0.5) return { level: 'High', color: 'text-green-400' };
    if (guardsPerPrisoner >= 0.3) return { level: 'Medium', color: 'text-yellow-400' };
    if (guardsPerPrisoner >= 0.1) return { level: 'Low', color: 'text-orange-400' };
    return { level: 'Critical', color: 'text-red-400' };
  };

  const capacity = getCapacityStatus();
  const budget = getBudgetStatus();
  const security = getSecurityLevel();

  return (
    <div className="bg-gray-800 px-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Financial Status */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-300">Financial Status</h3>
            <div className={`text-xs px-2 py-1 rounded ${budget.color} bg-gray-600`}>
              {budget.status}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Current Funds</span>
              <span className="text-green-400 font-bold">${gameState.money.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Daily Income</span>
              <span className="text-blue-400">$2,500</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Daily Expenses</span>
              <span className="text-red-400">-$1,200</span>
            </div>
          </div>
        </div>

        {/* Prison Capacity */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-300">Prison Capacity</h3>
            <div className={`text-xs px-2 py-1 rounded ${capacity.color} bg-gray-600`}>
              {capacity.status}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Prisoners</span>
              <span className="text-orange-400 font-bold">{gameState.prisoners}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Total Cells</span>
              <span className="text-blue-400">{gameState.cells}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Occupancy</span>
              <span className={capacity.color}>{Math.round(capacity.percentage)}%</span>
            </div>
          </div>
        </div>

        {/* Security Status */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-300">Security Level</h3>
            <div className={`text-xs px-2 py-1 rounded ${security.color} bg-gray-600`}>
              {security.level}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Guards</span>
              <span className="text-purple-400 font-bold">{gameState.guards}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Guard Ratio</span>
              <span className="text-gray-300">
                1:{gameState.prisoners > 0 ? Math.round(gameState.prisoners / gameState.guards) : 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Incidents</span>
              <span className="text-green-400">0 today</span>
            </div>
          </div>
        </div>

        {/* Prison Statistics */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-300">Prison Stats</h3>
            <div className="text-xs px-2 py-1 rounded text-blue-400 bg-gray-600">
              Active
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Avg. Mood</span>
              <span className="text-yellow-400">Neutral</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Escapes</span>
              <span className="text-green-400">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Reputation</span>
              <span className="text-blue-400">Good</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Capacity Bar */}
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300 text-sm">Prison Capacity</span>
            <span className="text-gray-400 text-xs">{gameState.prisoners}/{gameState.cells}</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                capacity.percentage > 90 ? 'bg-red-500' :
                capacity.percentage > 70 ? 'bg-orange-500' :
                capacity.percentage > 50 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(capacity.percentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Budget Bar */}
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300 text-sm">Budget Health</span>
            <span className="text-gray-400 text-xs">${gameState.money.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                gameState.money > 20000 ? 'bg-green-500' :
                gameState.money > 10000 ? 'bg-yellow-500' :
                gameState.money > 5000 ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min((gameState.money / 50000) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Security Bar */}
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300 text-sm">Security Level</span>
            <span className="text-gray-400 text-xs">{gameState.guards} guards</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${security.color.includes('green') ? 'bg-green-500' :
                security.color.includes('yellow') ? 'bg-yellow-500' :
                security.color.includes('orange') ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ 
                width: `${Math.min((gameState.guards / Math.max(gameState.prisoners, 1)) * 200, 100)}%` 
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
