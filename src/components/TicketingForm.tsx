import { Ticket } from 'lucide-react';

interface Props {
  ticketingUrl: string;
  onChange: (url: string) => void;
}

const inputClass =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors';

export default function TicketingForm({ ticketingUrl, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-emerald-950/50 rounded-lg border border-emerald-800/50 flex-shrink-0 mt-0.5">
          <Ticket size={16} className="text-emerald-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-300">Ticketing / Booking URL</p>
          <p className="text-xs text-slate-500 mt-1">
            Tells Google where users can book a session. Enables the <span className="text-emerald-400">"Reserve a table"</span>-style action link in search results — a proven click-through rate booster.
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-1">Booking URL</label>
        <p className="text-xs text-slate-500 mb-1.5">
          Can be your own booking page, Checkfront, FareHarbor, Bookeo, or any reservation platform URL.
        </p>
        <input
          type="url"
          className={inputClass}
          placeholder="https://yoursite.com/book"
          value={ticketingUrl}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      {ticketingUrl && (
        <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-lg">
          <p className="text-xs text-emerald-400 font-semibold">ReserveAction schema will be generated</p>
          <p className="text-xs text-emerald-300/60 mt-1">
            A <code className="text-emerald-400">potentialAction</code> block with <code className="text-emerald-400">ReserveAction</code> will be added to your schema output.
          </p>
        </div>
      )}
    </div>
  );
}
