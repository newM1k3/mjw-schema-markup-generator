import { Lock, ArrowRight } from 'lucide-react';

export default function AdvancedPackCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-emerald-800/60 bg-slate-900/95 backdrop-blur-sm">
      <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 p-1.5 bg-emerald-950/60 rounded-lg border border-emerald-800/50">
            <Lock size={14} className="text-emerald-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-200">
              Unlock the Advanced Schema Pack{' '}
              <span className="text-emerald-400">($47)</span>
            </p>
            <p className="text-xs text-slate-500 truncate">
              Multi-location @graph export &middot; WebSite SearchAction &middot; Event schema &middot; Seasonal promotions
            </p>
          </div>
        </div>
        <a
          href="#"
          className="flex-shrink-0 flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-all border border-emerald-500 hover:border-emerald-400 shadow-lg shadow-emerald-900/30"
        >
          Unlock Now
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
