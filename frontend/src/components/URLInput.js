import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export function URLInput({ onSubmit, isLoading }) {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        try {
            new URL(url);
            onSubmit(url);
            setUrl('');
        }
        catch {
            setError('Please enter a valid URL');
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "mb-8", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", value: url, onChange: (e) => {
                            setUrl(e.target.value);
                            setError('');
                        }, placeholder: "Enter the link in bio page URL...", className: "flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500", disabled: isLoading }), _jsx("button", { type: "submit", disabled: isLoading || !url, className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium transition-colors", children: isLoading ? 'Loading...' : 'Load Page' })] }), error && _jsx("p", { className: "mt-2 text-red-600 text-sm", children: error })] }));
}
