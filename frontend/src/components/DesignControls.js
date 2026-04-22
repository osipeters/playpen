import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export function DesignControls({ onRedesign, onSuggest, onExport, isLoading, hasRedesign, showSuggestions, onSuggestionSelect, suggestions = [], loadingSuggestions = false, }) {
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
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-white p-6 rounded-lg border border-gray-200", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Design Direction" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", value: prompt, onChange: (e) => setPrompt(e.target.value), onKeyPress: (e) => e.key === 'Enter' && !isLoading && handleRedesign(), placeholder: "e.g., 'Make it more modern', 'Dark theme', 'Minimalist design'...", className: "flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500", disabled: isLoading }), _jsx("button", { onClick: handleRedesign, disabled: isLoading || !prompt.trim(), className: "px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-medium transition-colors", children: isLoading ? 'Redesigning...' : 'Redesign' })] })] }), _jsxs("div", { className: "bg-white p-6 rounded-lg border border-gray-200", children: [_jsx("button", { onClick: handleSuggestClick, disabled: isLoading || loadingSuggestions, className: "w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 font-medium transition-colors mb-4", children: loadingSuggestions ? 'Generating Suggestions...' : 'Get Design Suggestions' }), showSuggestions && suggestions.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm font-medium text-gray-700", children: "Try one of these directions:" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: suggestions.map((suggestion, idx) => (_jsx("button", { onClick: () => onSuggestionSelect(suggestion), disabled: isLoading, className: "p-3 text-left text-sm bg-purple-50 border border-purple-200 rounded hover:bg-purple-100 disabled:opacity-50 transition-colors", children: suggestion }, idx))) })] }))] }), _jsx("div", { className: "bg-white p-6 rounded-lg border border-gray-200", children: _jsx("button", { onClick: onExport, disabled: !hasRedesign, className: "w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 font-medium transition-colors", children: "Export as HTML" }) })] }));
}
