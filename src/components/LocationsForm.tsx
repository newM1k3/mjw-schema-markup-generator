import { Plus, Trash2, MapPin } from 'lucide-react';
import { Location } from '../types';

interface Props {
  locations: Location[];
  onChange: (locations: Location[]) => void;
}

const inputClass =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors';

function createLocation(): Location {
  return {
    id: crypto.randomUUID(),
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
    phone: '',
    openingHours: [],
  };
}

export default function LocationsForm({ locations, onChange }: Props) {
  function updateLocation(id: string, updates: Partial<Location>) {
    onChange(locations.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  }

  function removeLocation(id: string) {
    if (locations.length <= 1) return;
    onChange(locations.filter((l) => l.id !== id));
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-slate-500">
          Each location generates a separate schema block. Multi-location <code className="text-emerald-400">@graph</code> export is supported automatically.
        </p>
      </div>

      {locations.map((loc, index) => (
        <div key={loc.id} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
              <MapPin size={14} className="text-emerald-400" />
              Location {index + 1}
            </div>
            {locations.length > 1 && (
              <button
                type="button"
                onClick={() => removeLocation(loc.id)}
                className="text-slate-500 hover:text-red-400 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Street Address *</label>
            <input
              type="text"
              className={inputClass}
              placeholder="123 Main Street"
              value={loc.streetAddress}
              onChange={(e) => updateLocation(loc.id, { streetAddress: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">City *</label>
              <input
                type="text"
                className={inputClass}
                placeholder="London"
                value={loc.city}
                onChange={(e) => updateLocation(loc.id, { city: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">State / Region</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Greater London"
                value={loc.state}
                onChange={(e) => updateLocation(loc.id, { state: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Postal Code *</label>
              <input
                type="text"
                className={inputClass}
                placeholder="EC1A 1BB"
                value={loc.postalCode}
                onChange={(e) => updateLocation(loc.id, { postalCode: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Country Code</label>
              <input
                type="text"
                className={inputClass}
                placeholder="US"
                maxLength={2}
                value={loc.country}
                onChange={(e) => updateLocation(loc.id, { country: e.target.value.toUpperCase() })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number</label>
            <p className="text-xs text-slate-600 mb-1">Include country code. Displayed in Google local results.</p>
            <input
              type="tel"
              className={inputClass}
              placeholder="+1-800-555-0100"
              value={loc.phone}
              onChange={(e) => updateLocation(loc.id, { phone: e.target.value })}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange([...locations, createLocation()])}
        className="flex items-center gap-2 text-sm text-emerald-400 border border-emerald-800 hover:border-emerald-500 bg-emerald-950/20 hover:bg-emerald-950/40 px-4 py-2.5 rounded-lg transition-all"
      >
        <Plus size={14} />
        Add Another Location
      </button>
    </div>
  );
}
