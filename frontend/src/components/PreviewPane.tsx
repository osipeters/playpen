
interface PreviewPaneProps {
  originalHtml: string;
  redesignedHtml: string;
  isLoading: boolean;
}

export function PreviewPane({ originalHtml, redesignedHtml, isLoading }: PreviewPaneProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8 h-96">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Original</h3>
        <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden bg-white">
          {originalHtml ? (
            <iframe
              title="original"
              srcDoc={originalHtml}
              className="w-full h-full border-none"
              sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Load a page to see preview
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Redesigned</h3>
        <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden bg-white relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-gray-600 text-sm">Generating redesign...</p>
              </div>
            </div>
          )}
          {redesignedHtml ? (
            <iframe
              title="redesigned"
              srcDoc={redesignedHtml}
              className="w-full h-full border-none"
              sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Request a redesign to see preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
