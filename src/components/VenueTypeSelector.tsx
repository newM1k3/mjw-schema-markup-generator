import { Lock, Crosshair, Axe, Zap, Gamepad2, Circle, ArrowUpDown, Sparkles } from 'lucide-react';
import { VenueType } from '../types';

interface Props {
  selected: VenueType;
  onChange: (type: VenueType) => void;
}

const VENUE_TYPES: { type: VenueType; label: string; Icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { type: 'escape_room',         label: 'Escape Room',      Icon: Lock },
  { type: 'mini_golf',           label: 'Mini Golf',        Icon: Crosshair },
  { type: 'axe_throwing',        label: 'Axe Throwing',     Icon: Axe },
  { type: 'laser_tag',           label: 'Laser Tag',        Icon: Zap },
  { type: 'vr_arcade',           label: 'VR Arcade',        Icon: Gamepad2 },
  { type: 'bowling',             label: 'Bowling',          Icon: Circle },
  { type: 'trampoline_park',     label: 'Trampoline Park',  Icon: ArrowUpDown },
  { type: 'other_entertainment', label: 'Other Venue',      Icon: Sparkles },
];

export default function VenueTypeSelector({ selected, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-1">Venue Type</label>
      <p className="text-xs text-slate-500 mb-3">
        Select your venue type. This determines the correct <code className="text-emerald-400">@type</code> array in your schema, which is critical for accurate Google categorisation.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {VENUE_TYPES.map(({ type, label, Icon }) => {
          const isSelected = selected === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onChange(type)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border text-center transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-400'
                  : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-500 hover:text-slate-200'
              }`}
            >
              <Icon size={20} className={isSelected ? 'text-emerald-400' : 'text-slate-400'} />
              <span className="text-xs font-medium leading-tight">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
