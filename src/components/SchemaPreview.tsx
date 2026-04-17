import { useState } from 'react';
import { Copy, Check, CheckCircle, Circle } from 'lucide-react';
import { SchemaFormState } from '../types';
import { generateSchema, getScriptTag } from '../utils/schemaGenerator';

interface Props {
  state: SchemaFormState;
}

interface Section {
  key: string;
  label: string;
  check: (s: SchemaFormState) => boolean;
}

const SECTIONS: Section[] = [
  { key: 'core',     label: 'Core Details', check: (s) => !!s.businessName && !!s.url },
  { key: 'location', label: 'Location',     check: (s) => s.locations.some((l) => !!l.streetAddress && !!l.city) },
  { key: 'hours',    label: 'Hours',        check: (s) => s.locations.some((l) => l.openingHours.some((h) => h.days.length > 0)) },
  { key: 'reviews',  label: 'Reviews',      check: (s) => s.aggregateRating !== null },
  { key: 'faq',      label: 'FAQ',          check: (s) => s.faqItems.some((f) => f.question && f.answer) },
];

function syntaxHighlight(json: string): React.ReactNode[] {
  const lines = json.split('\n');
  return lines.map((line, lineIdx) => {
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let partIdx = 0;

    const keyMatch = remaining.match(/^(\s*)("(?:[^"\\]|\\.)+")(\s*:\s*)(.*)/);
    if (keyMatch) {
      parts.push(<span key={`indent-${partIdx++}`}>{keyMatch[1]}</span>);
      parts.push(<span key={`key-${partIdx++}`} className="text-cyan-400">{keyMatch[2]}</span>);
      parts.push(<span key={`colon-${partIdx++}`} className="text-slate-400">{keyMatch[3]}</span>);
      remaining = keyMatch[4];
    }

    const strVal = remaining.match(/^("(?:[^"\\]|\\.)*")(,?)(\s*)$/);
    if (strVal) {
      parts.push(<span key={`str-${partIdx++}`} className="text-emerald-400">{strVal[1]}</span>);
      if (strVal[2]) parts.push(<span key={`comma-${partIdx++}`} className="text-slate-500">{strVal[2]}</span>);
    } else {
      const numVal = remaining.match(/^(-?\d+(?:\.\d+)?)(,?)(\s*)$/);
      if (numVal) {
        parts.push(<span key={`num-${partIdx++}`} className="text-yellow-400">{numVal[1]}</span>);
        if (numVal[2]) parts.push(<span key={`comma-${partIdx++}`} className="text-slate-500">{numVal[2]}</span>);
      } else {
        if (parts.length === 0) {
          parts.push(<span key={`raw-${partIdx++}`} className="text-slate-400">{remaining}</span>);
        } else if (remaining.trim()) {
          parts.push(<span key={`rest-${partIdx++}`} className="text-slate-300">{remaining}</span>);
        }
      }
    }

    return (
      <div key={lineIdx} className="leading-6">
        {parts}
      </div>
    );
  });
}

export default function SchemaPreview({ state }: Props) {
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  const schema = generateSchema(state);
  const jsonString = JSON.stringify(schema, null, 2);
  const scriptTag = getScriptTag(schema);

  async function copyJson() {
    await navigator.clipboard.writeText(jsonString);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  }

  async function copyScript() {
    await navigator.clipboard.writeText(scriptTag);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  }

  const completedSections = SECTIONS.filter((s) => s.check(state));
  const completeness = Math.round((completedSections.length / SECTIONS.length) * 100);

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-slate-700/60 space-y-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-200 tracking-wide uppercase">JSON-LD Preview</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={copyJson}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-semibold transition-all border border-slate-600 hover:border-slate-500"
            >
              {copiedJson ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              {copiedJson ? 'Copied!' : 'Copy JSON'}
            </button>
            <button
              onClick={copyScript}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-600/80 text-emerald-100 text-xs font-semibold transition-all border border-emerald-600 hover:border-emerald-500"
            >
              {copiedScript ? <Check size={12} /> : <Copy size={12} />}
              {copiedScript ? 'Copied!' : 'Copy <script> Tag'}
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Schema Completeness</span>
            <span className="text-xs font-bold text-emerald-400">{completeness}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${completeness}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-3 mt-2.5">
            {SECTIONS.map((s) => {
              const done = s.check(state);
              return (
                <div key={s.key} className="flex items-center gap-1.5">
                  {done ? (
                    <CheckCircle size={12} className="text-emerald-400" />
                  ) : (
                    <Circle size={12} className="text-slate-600" />
                  )}
                  <span className={`text-xs ${done ? 'text-emerald-400' : 'text-slate-600'}`}>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <pre className="font-mono text-xs leading-relaxed">
          {syntaxHighlight(jsonString)}
        </pre>
      </div>
    </div>
  );
}
