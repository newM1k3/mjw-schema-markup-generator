import { Plus, Trash2, HelpCircle } from 'lucide-react';
import { FaqItem } from '../types';

interface Props {
  faqItems: FaqItem[];
  onChange: (items: FaqItem[]) => void;
}

const inputClass =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors';

export default function FaqForm({ faqItems, onChange }: Props) {
  function addItem() {
    onChange([...faqItems, { question: '', answer: '' }]);
  }

  function removeItem(idx: number) {
    onChange(faqItems.filter((_, i) => i !== idx));
  }

  function updateItem(idx: number, updates: Partial<FaqItem>) {
    onChange(faqItems.map((item, i) => (i === idx ? { ...item, ...updates } : item)));
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-slate-500">
          <code className="text-emerald-400">FAQPage</code> schema generates expandable FAQ rich results in Google, dramatically increasing your search snippet size and visibility.
        </p>
      </div>

      {faqItems.map((item, idx) => (
        <div key={idx} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
              <HelpCircle size={13} className="text-emerald-400" />
              FAQ {idx + 1}
            </div>
            <button
              type="button"
              onClick={() => removeItem(idx)}
              className="text-slate-600 hover:text-red-400 transition-colors"
            >
              <Trash2 size={13} />
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Question *</label>
            <input
              type="text"
              className={inputClass}
              placeholder="How many people can play in an escape room?"
              value={item.question}
              onChange={(e) => updateItem(idx, { question: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Answer *</label>
            <textarea
              rows={2}
              className={inputClass}
              placeholder="Our escape rooms accommodate 2–8 players per session."
              value={item.answer}
              onChange={(e) => updateItem(idx, { answer: e.target.value })}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 text-sm text-emerald-400 border border-emerald-800 hover:border-emerald-500 bg-emerald-950/20 hover:bg-emerald-950/40 px-4 py-2.5 rounded-lg transition-all"
      >
        <Plus size={14} />
        Add FAQ Item
      </button>

      {faqItems.length >= 3 && (
        <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-lg">
          <p className="text-xs text-emerald-400 font-semibold">
            {faqItems.length} FAQ items — rich results eligible
          </p>
          <p className="text-xs text-emerald-300/60 mt-1">
            Google recommends 3–10 FAQ items. All {faqItems.length} items will be included in the <code className="text-emerald-400">FAQPage</code> block.
          </p>
        </div>
      )}
    </div>
  );
}
