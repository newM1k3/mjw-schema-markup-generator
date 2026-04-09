import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface JsonPreviewProps {
  schema: object;
}

export default function JsonPreview({ schema }: JsonPreviewProps) {
  const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(schema, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const highlightJson = (json: string) => {
    return json
      .replace(/(".*?"):/g, '<span class="text-cyan-400">$1</span>:')
      .replace(/: (".*?")/g, ': <span class="text-green-400">$1</span>')
      .replace(/: (\d+)/g, ': <span class="text-yellow-400">$1</span>')
      .replace(/: (true|false)/g, ': <span class="text-orange-400">$1</span>');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">JSON-LD Output</h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy to Clipboard
            </>
          )}
        </button>
      </div>

      <div className="flex-1 bg-gray-950 rounded-lg border border-gray-700 overflow-hidden">
        <pre className="p-6 overflow-auto h-full text-sm font-mono">
          <code
            dangerouslySetInnerHTML={{ __html: highlightJson(jsonString) }}
          />
        </pre>
      </div>

      <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-lg">
        <p className="text-sm text-gray-400">
          <span className="font-medium text-cyan-400">Tip:</span> Copy this JSON-LD markup and paste it into a{' '}
          <code className="px-1.5 py-0.5 bg-gray-900 rounded text-cyan-400">
            &lt;script type="application/ld+json"&gt;
          </code>{' '}
          tag in your HTML.
        </p>
      </div>
    </div>
  );
}
