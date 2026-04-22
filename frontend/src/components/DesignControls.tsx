import { useState } from 'react';

interface DesignControlsProps {
  onRedesign: (prompt: string) => void;
  onSuggest: () => void;
  onExport: () => void;
  isLoading: boolean;
  hasRedesign: boolean;
  showSuggestions: boolean;
  onSuggestionSelect: (suggestion: string) => void;
  suggestions?: string[];
  loadingSuggestions?: boolean;
}

export function DesignControls({
  onRedesign,
  onSuggest,
  onExport,
  isLoading,
  hasRedesign,
  showSuggestions,
  onSuggestionSelect,
  suggestions = [],
  loadingSuggestions = false,
}: DesignControlsProps) {
  const [prompt, setPrompt] = useState('');

  const handleRedesign = () => {
    if (prompt.trim()) {
      onRedesign(prompt);
      setPrompt('');
    }
  };

  const handleSuggestClick = () => {
    onSuggest();
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Design Direction
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleRedesign()}
            placeholder="e.g., 'Make it more modern', 'Dark theme', 'Minimalist design'..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleRedesign}
            disabled={isLoading || !prompt.trim()}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-medium transition-colors"
          >
            {isLoading ? 'Redesigning...' : 'Redesign'}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <button
          onClick={handleSuggestClick}
          disabled={isLoading || loadingSuggestions}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 font-medium transition-colors mb-4"
        >
          {loadingSuggestions ? 'Generating Suggestions...' : 'Get Design Suggestions'}
        </button>

        {showSuggestions && suggestions.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Try one of these directions:</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => onSuggestionSelect(suggestion)}
                  disabled={isLoading}
                  className="p-3 text-left text-sm bg-purple-50 border border-purple-200 rounded hover:bg-purple-100 disabled:opacity-50 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <button
          onClick={onExport}
          disabled={!hasRedesign}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 font-medium transition-colors"
        >
          Export as HTML
        </button>
      </div>
    </div>
  );
}
