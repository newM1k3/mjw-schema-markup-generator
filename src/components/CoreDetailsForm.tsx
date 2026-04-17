import { SchemaFormState } from '../types';

interface Props {
  state: SchemaFormState;
  onChange: (updates: Partial<SchemaFormState>) => void;
}

interface FieldProps {
  label: string;
  hint: string;
  children: React.ReactNode;
}

function Field({ label, hint, children }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-1">{label}</label>
      <p className="text-xs text-slate-500 mb-1.5">{hint}</p>
      {children}
    </div>
  );
}

const inputClass =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors';

export default function CoreDetailsForm({ state, onChange }: Props) {
  return (
    <div className="space-y-4">
      <Field label="Business Name *" hint="Your venue's official trading name as it appears on Google Business Profile.">
        <input
          type="text"
          className={inputClass}
          placeholder="e.g. Escape Zone London"
          value={state.businessName}
          onChange={(e) => onChange({ businessName: e.target.value })}
        />
      </Field>

      <Field label="Description" hint="A concise description of your venue. Keep it 150–300 characters. Google may use this in knowledge panels.">
        <textarea
          rows={3}
          className={inputClass}
          placeholder="e.g. London's premier escape room experience with 6 uniquely themed rooms..."
          value={state.description}
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Website URL *" hint="Your canonical homepage URL. Required for Google Rich Results validation.">
          <input
            type="url"
            className={inputClass}
            placeholder="https://yoursite.com"
            value={state.url}
            onChange={(e) => onChange({ url: e.target.value })}
          />
        </Field>

        <Field label="Email Address" hint="Public contact email. Helps Google verify your business entity.">
          <input
            type="email"
            className={inputClass}
            placeholder="hello@yoursite.com"
            value={state.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Logo URL" hint="Direct URL to your logo image (PNG or SVG). Used in Google knowledge panels.">
          <input
            type="url"
            className={inputClass}
            placeholder="https://yoursite.com/logo.png"
            value={state.logoUrl}
            onChange={(e) => onChange({ logoUrl: e.target.value })}
          />
        </Field>

        <Field label="Hero Image URL" hint="A high-quality photo of your venue. Recommended: 1200×630px minimum.">
          <input
            type="url"
            className={inputClass}
            placeholder="https://yoursite.com/hero.jpg"
            value={state.imageUrl}
            onChange={(e) => onChange({ imageUrl: e.target.value })}
          />
        </Field>
      </div>

      <Field label="Price Range" hint="Use $ symbols to indicate price tier. This appears directly in Google Search results.">
        <div className="flex gap-2">
          {['$', '$$', '$$$', '$$$$'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onChange({ priceRange: p })}
              className={`px-4 py-2 rounded-lg text-sm font-mono font-semibold border transition-all ${
                state.priceRange === p
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-400'
                  : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-500 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </Field>
    </div>
  );
}
