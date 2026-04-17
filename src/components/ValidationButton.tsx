import { ExternalLink } from 'lucide-react';
import { SchemaFormState } from '../types';

interface Props {
  state: SchemaFormState;
}

export default function ValidationButton({ state }: Props) {
  function handleClick() {
    if (!state.url) return;
    const url = `https://search.google.com/test/rich-results?url=${encodeURIComponent(state.url)}`;
    window.open(url, '_blank');
  }

  const hasUrl = !!state.url;

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={handleClick}
        disabled={!hasUrl}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
          hasUrl
            ? 'border-slate-600 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 bg-slate-800 hover:bg-emerald-950/20 cursor-pointer'
            : 'border-slate-700 text-slate-600 bg-slate-800/50 cursor-not-allowed'
        }`}
      >
        <ExternalLink size={14} />
        Validate on Google
      </button>

      {!hasUrl && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 hidden group-hover:block z-10">
          <div className="bg-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 text-center shadow-xl">
            Enter your website URL in Step 2 to validate.
          </div>
          <div className="w-2 h-2 bg-slate-700 rotate-45 mx-auto -mt-1" />
        </div>
      )}
    </div>
  );
}
