import { useState } from 'react';
import { URLInput } from './components/URLInput';
import { PreviewPane } from './components/PreviewPane';
import { DesignControls } from './components/DesignControls';
import { apiClient } from './api/client';

interface AppState {
  originalHtml: string;
  redesignedHtml: string;
  isLoading: boolean;
  error: string;
  sessionId?: string;
  showSuggestions: boolean;
  suggestions: string[];
  loadingSuggestions: boolean;
}

function App() {
  const [state, setState] = useState<AppState>({
    originalHtml: '',
    redesignedHtml: '',
    isLoading: false,
    error: '',
    showSuggestions: false,
    suggestions: [],
    loadingSuggestions: false,
  });

  const handleFetchPage = async (url: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: '' }));
    try {
      const response = await apiClient.fetchPage(url);
      setState((prev) => ({
        ...prev,
        originalHtml: response.html,
        redesignedHtml: '',
        isLoading: false,
        sessionId: undefined,
        showSuggestions: false,
        suggestions: [],
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch page';
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  };

  const handleRedesign = async (prompt: string) => {
    if (!state.originalHtml && !state.redesignedHtml) return;

    setState((prev) => ({ ...prev, isLoading: true, error: '', showSuggestions: false }));
    try {
      const htmlToRedesign = state.redesignedHtml || state.originalHtml;
      const response = await apiClient.redesign(htmlToRedesign, prompt, state.sessionId);

      setState((prev) => ({
        ...prev,
        redesignedHtml: response.html,
        sessionId: response.sessionId,
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to redesign page';
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  };

  const handleSuggest = async () => {
    if (!state.originalHtml && !state.redesignedHtml) return;

    setState((prev) => ({ ...prev, loadingSuggestions: true, error: '' }));
    try {
      const htmlToAnalyze = state.redesignedHtml || state.originalHtml;
      const response = await apiClient.suggest(htmlToAnalyze, state.sessionId);

      setState((prev) => ({
        ...prev,
        suggestions: response.suggestions,
        sessionId: response.sessionId,
        loadingSuggestions: false,
        showSuggestions: true,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get suggestions';
      setState((prev) => ({
        ...prev,
        loadingSuggestions: false,
        error: errorMessage,
      }));
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    handleRedesign(suggestion);
    setState((prev) => ({
      ...prev,
      showSuggestions: false,
    }));
  };

  const handleExport = () => {
    const htmlToExport = state.redesignedHtml || state.originalHtml;
    if (!htmlToExport) return;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlToExport));
    element.setAttribute('download', 'redesigned-page.html');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Link in Bio Redesign Tool</h1>
          <p className="text-lg text-gray-600">
            Iterate on your link-in-bio page design with AI-powered suggestions
          </p>
        </div>

        <URLInput onSubmit={handleFetchPage} isLoading={state.isLoading} />

        {state.error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {state.error}
          </div>
        )}

        {state.originalHtml && (
          <>
            <PreviewPane
              originalHtml={state.originalHtml}
              redesignedHtml={state.redesignedHtml}
              isLoading={state.isLoading}
            />

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <DesignControls
                  onRedesign={handleRedesign}
                  onSuggest={handleSuggest}
                  onExport={handleExport}
                  isLoading={state.isLoading}
                  hasRedesign={!!state.redesignedHtml}
                  showSuggestions={state.showSuggestions}
                  onSuggestionSelect={handleSuggestionSelect}
                  suggestions={state.suggestions}
                  loadingSuggestions={state.loadingSuggestions}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
