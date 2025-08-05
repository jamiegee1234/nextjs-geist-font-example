"use client";

interface SidebarProps {
  selectedTool: string;
  onToolSelect: (tool: string) => void;
}

interface BuildingTool {
  id: string;
  name: string;
  description: string;
  cost: number;
  color: string;
}

const buildingTools: BuildingTool[] = [
  {
    id: 'wall',
    name: 'Wall',
    description: 'Basic concrete wall for prison structure',
    cost: 100,
    color: 'bg-gray-500'
  },
  {
    id: 'cell',
    name: 'Prison Cell',
    description: 'Individual cell for housing prisoners',
    cost: 500,
    color: 'bg-blue-600'
  },
  {
    id: 'door',
    name: 'Door',
    description: 'Entrance/exit for rooms and cells',
    cost: 200,
    color: 'bg-yellow-600'
  },
  {
    id: 'demolish',
    name: 'Demolish',
    description: 'Remove existing structures',
    cost: 0,
    color: 'bg-red-600'
  }
];

export default function Sidebar({ selectedTool, onToolSelect }: SidebarProps) {
  return (
    <div className="h-full bg-gray-800 p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Building Tools</h2>
        <p className="text-gray-400 text-sm">Select a tool to build your prison</p>
      </div>

        {buildingTools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onToolSelect(tool.id)}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left transform hover:scale-105 ${
              selectedTool === tool.id
                ? 'border-blue-400 bg-blue-900/40 shadow-lg shadow-blue-500/20'
                : 'border-gray-600 bg-gray-700/80 hover:bg-gray-600/80 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 rounded-lg ${tool.color} flex-shrink-0 shadow-md flex items-center justify-center`}>
                {/* Custom SVG-like representations using CSS */}
                {tool.id === 'wall' && (
                  <div className="w-6 h-6 bg-gray-300 rounded-sm relative">
                    <div className="absolute inset-0 bg-gray-400 rounded-sm transform rotate-45 scale-75"></div>
                    <div className="absolute top-1 left-1 w-1 h-1 bg-gray-600 rounded-full"></div>
                    <div className="absolute bottom-1 right-1 w-1 h-1 bg-gray-600 rounded-full"></div>
                  </div>
                )}
                {tool.id === 'cell' && (
                  <div className="w-6 h-6 relative">
                    <div className="w-full h-full bg-blue-200 rounded-sm border border-blue-400"></div>
                    <div className="absolute inset-x-1 top-1 bottom-1 flex justify-between">
                      <div className="w-0.5 h-full bg-blue-600"></div>
                      <div className="w-0.5 h-full bg-blue-600"></div>
                      <div className="w-0.5 h-full bg-blue-600"></div>
                    </div>
                  </div>
                )}
                {tool.id === 'door' && (
                  <div className="w-6 h-6 relative">
                    <div className="w-full h-full bg-amber-200 rounded-sm border-2 border-amber-600"></div>
                    <div className="absolute right-1 top-1/2 w-1 h-1 bg-amber-800 rounded-full transform -translate-y-1/2"></div>
                    <div className="absolute inset-x-1 top-1 bottom-1 border-l border-amber-600"></div>
                  </div>
                )}
                {tool.id === 'demolish' && (
                  <div className="w-6 h-6 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-red-200 transform rotate-45"></div>
                      <div className="w-4 h-0.5 bg-red-200 transform -rotate-45 absolute"></div>
                    </div>
                    <div className="absolute top-0 right-0 w-2 h-2 bg-red-400 rounded-full transform translate-x-1 -translate-y-1"></div>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white text-sm">{tool.name}</h3>
                {tool.cost > 0 && (
                  <p className="text-green-400 text-xs font-medium">${tool.cost.toLocaleString()}</p>
                )}
                {tool.cost === 0 && (
                  <p className="text-orange-400 text-xs font-medium">Free Action</p>
                )}
              </div>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              {tool.description}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-700 rounded-lg">
        <h3 className="font-semibold text-white mb-3">Prison Management Tips</h3>
        <div className="space-y-2 text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Build cells to house prisoners</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <span>Use walls to create secure areas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Add doors for controlled access</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Demolish to redesign layouts</span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-600">
        <h3 className="font-semibold text-white mb-2">Quick Stats</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between text-gray-300">
            <span>Cells Built:</span>
            <span className="text-blue-400">Track in status</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Prisoners:</span>
            <span className="text-orange-400">Auto-assigned</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Security:</span>
            <span className="text-green-400">Basic</span>
          </div>
        </div>
      </div>
    </div>
  );
}
