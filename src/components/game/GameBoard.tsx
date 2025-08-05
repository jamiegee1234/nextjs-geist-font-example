"use client";

import { useRef, useEffect, useState } from 'react';
import { GameState } from '@/app/page';

interface Cell {
  x: number;
  y: number;
  type: 'empty' | 'wall' | 'cell' | 'door';
  hasPrisoner: boolean;
  prisonerId?: number;
}

interface Prisoner {
  id: number;
  x: number;
  y: number;
  name: string;
  mood: 'happy' | 'neutral' | 'angry';
  needs: {
    food: number;
    sleep: number;
    hygiene: number;
    recreation: number;
  };
}

interface GameBoardProps {
  gameState: GameState;
  updateGameState: (updates: Partial<GameState>) => void;
}

const GRID_SIZE = 20;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

export default function GameBoard({ gameState, updateGameState }: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [prisoners, setPrisoners] = useState<Prisoner[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize grid
  useEffect(() => {
    const newGrid: Cell[][] = [];
    const rows = Math.floor(CANVAS_HEIGHT / GRID_SIZE);
    const cols = Math.floor(CANVAS_WIDTH / GRID_SIZE);
    
    for (let y = 0; y < rows; y++) {
      newGrid[y] = [];
      for (let x = 0; x < cols; x++) {
        newGrid[y][x] = {
          x,
          y,
          type: 'empty',
          hasPrisoner: false
        };
      }
    }
    setGrid(newGrid);
  }, []);

  // Draw grid and elements
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw grid lines
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    
    for (let x = 0; x <= CANVAS_WIDTH; x += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CANVAS_HEIGHT);
      ctx.stroke();
    }
    
    for (let y = 0; y <= CANVAS_HEIGHT; y += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CANVAS_WIDTH, y);
      ctx.stroke();
    }

    // Draw cells
    grid.forEach(row => {
      row.forEach(cell => {
        const x = cell.x * GRID_SIZE;
        const y = cell.y * GRID_SIZE;

        switch (cell.type) {
          case 'wall':
            ctx.fillStyle = '#6B7280';
            ctx.fillRect(x, y, GRID_SIZE, GRID_SIZE);
            break;
          case 'cell':
            ctx.fillStyle = '#1F2937';
            ctx.fillRect(x, y, GRID_SIZE, GRID_SIZE);
            ctx.strokeStyle = '#9CA3AF';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, GRID_SIZE, GRID_SIZE);
            break;
          case 'door':
            ctx.fillStyle = '#92400E';
            ctx.fillRect(x, y, GRID_SIZE, GRID_SIZE);
            break;
        }
      });
    });

    // Draw prisoners
    prisoners.forEach(prisoner => {
      const x = prisoner.x * GRID_SIZE + GRID_SIZE / 2;
      const y = prisoner.y * GRID_SIZE + GRID_SIZE / 2;
      
      // Prisoner body
      ctx.fillStyle = prisoner.mood === 'angry' ? '#EF4444' : 
                     prisoner.mood === 'happy' ? '#10B981' : '#F59E0B';
      ctx.beginPath();
      ctx.arc(x, y, GRID_SIZE / 3, 0, 2 * Math.PI);
      ctx.fill();
      
      // Prisoner number
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(prisoner.id.toString(), x, y + 3);
    });

  }, [grid, prisoners]);

  const getGridPosition = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((clientX - rect.left) / GRID_SIZE);
    const y = Math.floor((clientY - rect.top) / GRID_SIZE);
    
    if (x >= 0 && x < grid[0]?.length && y >= 0 && y < grid.length) {
      return { x, y };
    }
    return null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    handleCellClick(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDrawing) {
      handleCellClick(e);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleCellClick = (e: React.MouseEvent) => {
    const pos = getGridPosition(e.clientX, e.clientY);
    if (!pos) return;

    const newGrid = [...grid];
    const cell = newGrid[pos.y][pos.x];
    
    if (gameState.selectedTool === 'demolish') {
      if (cell.type !== 'empty') {
        // Check if it was a cell before demolishing
        const wasCell = cell.type === 'cell';
        
        // Remove prisoner if present
        if (cell.prisonerId) {
          setPrisoners(prev => prev.filter(p => p.id !== cell.prisonerId));
          updateGameState({ prisoners: gameState.prisoners - 1 });
        }
        
        // Update cell count if removing a cell
        if (wasCell) {
          updateGameState({ cells: gameState.cells - 1 });
        }
        
        // Now demolish the cell
        cell.type = 'empty';
        cell.hasPrisoner = false;
        cell.prisonerId = undefined;
      }
    } else {
      const cost = getCost(gameState.selectedTool);
      if (gameState.money >= cost && cell.type === 'empty') {
        cell.type = gameState.selectedTool as any;
        
        if (gameState.selectedTool === 'cell') {
          updateGameState({ 
            cells: gameState.cells + 1,
            money: gameState.money - cost
          });
        } else {
          updateGameState({ money: gameState.money - cost });
        }
      }
    }
    
    setGrid(newGrid);
  };

  const getCost = (tool: string): number => {
    switch (tool) {
      case 'wall': return 100;
      case 'cell': return 500;
      case 'door': return 200;
      default: return 0;
    }
  };

  const addPrisoner = () => {
    // Find empty cell
    const emptyCells = grid.flat().filter(cell => cell.type === 'cell' && !cell.hasPrisoner);
    if (emptyCells.length === 0) return;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newPrisoner: Prisoner = {
      id: prisoners.length + 1,
      x: randomCell.x,
      y: randomCell.y,
      name: `Prisoner ${prisoners.length + 1}`,
      mood: 'neutral',
      needs: {
        food: Math.random() * 100,
        sleep: Math.random() * 100,
        hygiene: Math.random() * 100,
        recreation: Math.random() * 100
      }
    };

    randomCell.hasPrisoner = true;
    randomCell.prisonerId = newPrisoner.id;
    
    setPrisoners(prev => [...prev, newPrisoner]);
    updateGameState({ prisoners: gameState.prisoners + 1 });
  };

  // Auto-add prisoners periodically
  useEffect(() => {
    if (gameState.isPaused) return;
    
    const interval = setInterval(() => {
      if (Math.random() < 0.3 && gameState.cells > gameState.prisoners) {
        addPrisoner();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [gameState.isPaused, gameState.cells, gameState.prisoners, prisoners.length, grid]);

  return (
    <div className="flex-1 p-4 bg-gray-900">
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white mb-2">Prison Layout</h2>
          <p className="text-gray-400 text-sm">
            Selected Tool: <span className="text-blue-400 capitalize">{gameState.selectedTool}</span>
            {gameState.selectedTool !== 'demolish' && (
              <span className="ml-2">Cost: ${getCost(gameState.selectedTool)}</span>
            )}
          </p>
        </div>
        
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border border-gray-600 rounded cursor-crosshair bg-gray-700"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        
        <div className="mt-4 flex gap-4">
          <button
            onClick={addPrisoner}
            disabled={gameState.cells <= gameState.prisoners}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Add Prisoner
          </button>
          <div className="text-sm text-gray-400 flex items-center">
            Available Cells: {gameState.cells - gameState.prisoners}
          </div>
        </div>
      </div>
    </div>
  );
}
