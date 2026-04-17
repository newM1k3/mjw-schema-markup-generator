import { Plus, Trash2, Clock } from 'lucide-react';
import { Location, OpeningHour } from '../types';

interface Props {
  locations: Location[];
  onChange: (locations: Location[]) => void;
}

const DAYS: OpeningHour['days'][number][] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const DAY_LABELS: Record<string, string> = {
  Mo: 'Mon', Tu: 'Tue', We: 'Wed', Th: 'Thu', Fr: 'Fri', Sa: 'Sat', Su: 'Sun',
};

function createHoursBlock(): OpeningHour {
  return { days: [], opens: '10:00', closes: '22:00' };
}

export default function OpeningHoursForm({ locations, onChange }: Props) {
  function updateLocationHours(locId: string, hours: OpeningHour[]) {
    onChange(locations.map((l) => (l.id === locId ? { ...l, openingHours: hours } : l)));
  }

  function addBlock(locId: string, existing: OpeningHour[]) {
    updateLocationHours(locId, [...existing, createHoursBlock()]);
  }

  function removeBlock(locId: string, idx: number, existing: OpeningHour[]) {
    updateLocationHours(locId, existing.filter((_, i) => i !== idx));
  }

  function toggleDay(locId: string, blockIdx: number, day: OpeningHour['days'][number], existing: OpeningHour[]) {
    const updated = existing.map((b, i) => {
      if (i !== blockIdx) return b;
      const days = b.days.includes(day) ? b.days.filter((d) => d !== day) : [...b.days, day];
      return { ...b, days };
    });
    updateLocationHours(locId, updated);
  }

  function updateTime(locId: string, blockIdx: number, field: 'opens' | 'closes', value: string, existing: OpeningHour[]) {
    const updated = existing.map((b, i) => (i === blockIdx ? { ...b, [field]: value } : b));
    updateLocationHours(locId, updated);
  }

  const inputClass =
    'bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors';

  return (
    <div className="space-y-5">
      <p className="text-xs text-slate-500">
        Opening hours generate <code className="text-emerald-400">OpeningHoursSpecification</code> blocks, which power Google's business hours display in search results.
      </p>

      {locations.map((loc, locIdx) => (
        <div key={loc.id} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
            <Clock size={14} className="text-emerald-400" />
            Location {locIdx + 1} Hours
            {loc.city && <span className="text-slate-500 font-normal">— {loc.city}</span>}
          </div>

          {loc.openingHours.map((block, blockIdx) => (
            <div key={blockIdx} className="bg-slate-900/60 border border-slate-700/60 rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">Hours Block {blockIdx + 1}</span>
                <button
                  type="button"
                  onClick={() => removeBlock(loc.id, blockIdx, loc.openingHours)}
                  className="text-slate-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-2">Select days this schedule applies to:</p>
                <div className="flex flex-wrap gap-1.5">
                  {DAYS.map((day) => {
                    const active = block.days.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(loc.id, blockIdx, day, loc.openingHours)}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-all ${
                          active
                            ? 'border-emerald-500 bg-emerald-950/50 text-emerald-400'
                            : 'border-slate-700 bg-slate-800 text-slate-500 hover:border-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {DAY_LABELS[day]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {block.days.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="block text-xs text-slate-500 mb-1">Opens</label>
                    <input
                      type="time"
                      className={inputClass + ' w-full'}
                      value={block.opens}
                      onChange={(e) => updateTime(loc.id, blockIdx, 'opens', e.target.value, loc.openingHours)}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-slate-500 mb-1">Closes</label>
                    <input
                      type="time"
                      className={inputClass + ' w-full'}
                      value={block.closes}
                      onChange={(e) => updateTime(loc.id, blockIdx, 'closes', e.target.value, loc.openingHours)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => addBlock(loc.id, loc.openingHours)}
            className="flex items-center gap-2 text-xs text-emerald-400 border border-emerald-800 hover:border-emerald-500 bg-emerald-950/20 hover:bg-emerald-950/40 px-3 py-2 rounded-lg transition-all"
          >
            <Plus size={12} />
            Add Hours Block
          </button>
        </div>
      ))}
    </div>
  );
}
