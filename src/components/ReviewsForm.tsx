import { Star } from 'lucide-react';
import { ReviewData } from '../types';

interface Props {
  aggregateRating: ReviewData | null;
  onChange: (rating: ReviewData | null) => void;
}

const inputClass =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors';

const SOURCES: ReviewData['source'][] = ['Google', 'TripAdvisor', 'Yelp', 'Facebook', 'Other'];

export default function ReviewsForm({ aggregateRating, onChange }: Props) {
  const enabled = aggregateRating !== null;

  function toggle() {
    onChange(enabled ? null : { ratingValue: 4.8, reviewCount: 250, source: 'Google' });
  }

  function update(updates: Partial<ReviewData>) {
    if (!aggregateRating) return;
    onChange({ ...aggregateRating, ...updates });
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-slate-500">
          <code className="text-emerald-400">AggregateRating</code> data enables star ratings to appear directly in Google search results. Only include this if you have genuine, publicly verifiable reviews.
        </p>
      </div>

      <div className="flex items-center gap-3 p-3 bg-slate-800/60 border border-slate-700 rounded-lg">
        <button
          type="button"
          onClick={toggle}
          className={`relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0 ${
            enabled ? 'bg-emerald-500' : 'bg-slate-600'
          }`}
        >
          <span
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
              enabled ? 'left-5.5 translate-x-0.5' : 'left-0.5'
            }`}
          />
        </button>
        <div>
          <p className="text-sm font-semibold text-slate-200">Include Aggregate Rating</p>
          <p className="text-xs text-slate-500">Enables star ratings in search results</p>
        </div>
      </div>

      {enabled && aggregateRating && (
        <div className="space-y-4 p-4 bg-slate-800/40 border border-slate-700/60 rounded-xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">
                <Star size={13} className="inline mr-1 text-yellow-400" />
                Rating Value
              </label>
              <p className="text-xs text-slate-500 mb-1.5">Your average star rating (1.0–5.0)</p>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                className={inputClass}
                value={aggregateRating.ratingValue}
                onChange={(e) => update({ ratingValue: parseFloat(e.target.value) || 0 })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">Review Count</label>
              <p className="text-xs text-slate-500 mb-1.5">Total number of reviews</p>
              <input
                type="number"
                min="1"
                className={inputClass}
                value={aggregateRating.reviewCount}
                onChange={(e) => update({ reviewCount: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1">Review Source</label>
            <p className="text-xs text-slate-500 mb-1.5">Where are these reviews aggregated from?</p>
            <div className="flex flex-wrap gap-2">
              {SOURCES.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => update({ source: src })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    aggregateRating.source === src
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-400'
                      : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                  }`}
                >
                  {src}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-lg">
            <p className="text-xs text-amber-400 font-semibold">Schema Policy Notice</p>
            <p className="text-xs text-amber-300/70 mt-1">
              Google's guidelines prohibit self-serving ratings. Only include data from third-party review platforms with genuine customer reviews.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
