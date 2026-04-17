import { useState } from 'react';
import { Code2, ChevronRight, ChevronLeft } from 'lucide-react';
import { SchemaFormState, VenueType } from './types';
import { FAQ_TEMPLATES } from './utils/schemaGenerator';
import VenueTypeSelector from './components/VenueTypeSelector';
import CoreDetailsForm from './components/CoreDetailsForm';
import LocationsForm from './components/LocationsForm';
import OpeningHoursForm from './components/OpeningHoursForm';
import ReviewsForm from './components/ReviewsForm';
import TicketingForm from './components/TicketingForm';
import FaqForm from './components/FaqForm';
import SchemaPreview from './components/SchemaPreview';
import AdvancedPackCta from './components/AdvancedPackCta';
import ValidationButton from './components/ValidationButton';

const INITIAL_STATE: SchemaFormState = {
  venueType: 'escape_room',
  businessName: '',
  description: '',
  url: '',
  logoUrl: '',
  imageUrl: '',
  email: '',
  priceRange: '',
  locations: [
    {
      id: crypto.randomUUID(),
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US',
      phone: '',
      openingHours: [],
    },
  ],
  aggregateRating: null,
  ticketingUrl: '',
  faqItems: FAQ_TEMPLATES['escape_room'],
};

const STEPS = [
  { id: 1, label: 'Venue Type' },
  { id: 2, label: 'Core Details' },
  { id: 3, label: 'Location' },
  { id: 4, label: 'Hours' },
  { id: 5, label: 'Reviews' },
  { id: 6, label: 'FAQ' },
];

export default function App() {
  const [state, setState] = useState<SchemaFormState>(INITIAL_STATE);
  const [step, setStep] = useState(1);
  const [mobileShowPreview, setMobileShowPreview] = useState(false);

  function update(updates: Partial<SchemaFormState>) {
    setState((prev) => ({ ...prev, ...updates }));
  }

  function handleVenueChange(type: VenueType) {
    setState((prev) => ({
      ...prev,
      venueType: type,
      faqItems: FAQ_TEMPLATES[type],
    }));
  }

  const isFirstStep = step === 1;
  const isLastStep = step === STEPS.length;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100">
      <header className="flex-shrink-0 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-950/60 rounded-xl border border-emerald-800/60">
              <Code2 size={18} className="text-emerald-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-100 leading-none">Local SEO Schema Generator</h1>
              <p className="text-xs text-slate-500 mt-0.5">Entertainment Venues</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileShowPreview((v) => !v)}
              className="sm:hidden text-xs px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300"
            >
              {mobileShowPreview ? 'Show Form' : 'Preview JSON'}
            </button>
            <ValidationButton state={state} />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden max-w-screen-xl mx-auto w-full">
        <div
          className={`w-full lg:w-1/2 flex flex-col overflow-hidden border-r border-slate-800/60 ${
            mobileShowPreview ? 'hidden' : 'flex'
          } lg:flex`}
        >
          <div className="flex-shrink-0 px-5 pt-5 pb-4 border-b border-slate-800/60">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {STEPS.map((s, idx) => {
                const isActive = step === s.id;
                const isDone = step > s.id;
                return (
                  <div key={s.id} className="flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setStep(s.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/50'
                          : isDone
                          ? 'text-slate-400 hover:text-slate-200'
                          : 'text-slate-600 hover:text-slate-400'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0 ${
                          isActive
                            ? 'bg-emerald-500 text-white'
                            : isDone
                            ? 'bg-slate-600 text-slate-300'
                            : 'bg-slate-800 border border-slate-700 text-slate-600'
                        }`}
                      >
                        {s.id}
                      </span>
                      <span className="hidden sm:inline">{s.label}</span>
                    </button>
                    {idx < STEPS.length - 1 && (
                      <ChevronRight size={12} className="text-slate-700 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <div className="max-w-lg mx-auto space-y-6">
              {step === 1 && (
                <div>
                  <h2 className="text-base font-bold text-slate-100 mb-1">Select Your Venue Type</h2>
                  <p className="text-xs text-slate-500 mb-4">
                    This determines the correct <code className="text-emerald-400">schema.org @type</code> for your business.
                  </p>
                  <VenueTypeSelector selected={state.venueType} onChange={handleVenueChange} />
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-base font-bold text-slate-100 mb-1">Core Business Details</h2>
                  <p className="text-xs text-slate-500 mb-4">
                    These fields populate the top-level properties of your schema entity.
                  </p>
                  <CoreDetailsForm state={state} onChange={update} />
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-base font-bold text-slate-100 mb-1">Location Details</h2>
                  <p className="text-xs text-slate-500 mb-4">
                    Physical address data is required for local SEO. Each location generates a complete schema block.
                  </p>
                  <LocationsForm locations={state.locations} onChange={(locations) => update({ locations })} />
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="text-base font-bold text-slate-100 mb-1">Opening Hours</h2>
                  <p className="text-xs text-slate-500 mb-4">
                    Structured hours data enables Google to display your opening times prominently in search results.
                  </p>
                  <OpeningHoursForm
                    locations={state.locations}
                    onChange={(locations) => update({ locations })}
                  />
                </div>
              )}

              {step === 5 && (
                <div>
                  <h2 className="text-base font-bold text-slate-100 mb-1">Reviews & Ticketing</h2>
                  <p className="text-xs text-slate-500 mb-4">
                    Star ratings and booking actions increase click-through rates from search results.
                  </p>
                  <div className="space-y-6">
                    <ReviewsForm
                      aggregateRating={state.aggregateRating}
                      onChange={(aggregateRating) => update({ aggregateRating })}
                    />
                    <div className="border-t border-slate-800 pt-5">
                      <TicketingForm
                        ticketingUrl={state.ticketingUrl}
                        onChange={(ticketingUrl) => update({ ticketingUrl })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div>
                  <h2 className="text-base font-bold text-slate-100 mb-1">FAQ Schema</h2>
                  <p className="text-xs text-slate-500 mb-4">
                    FAQ rich results can double your search snippet height, pushing competitors further down the page.
                  </p>
                  <FaqForm faqItems={state.faqItems} onChange={(faqItems) => update({ faqItems })} />
                </div>
              )}
            </div>
          </div>

          <div className="flex-shrink-0 px-5 py-4 border-t border-slate-800/60 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={isFirstStep}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                isFirstStep
                  ? 'border-slate-800 text-slate-700 cursor-not-allowed'
                  : 'border-slate-700 text-slate-300 hover:border-slate-500 hover:text-slate-100 bg-slate-800 hover:bg-slate-700'
              }`}
            >
              <ChevronLeft size={15} />
              Previous
            </button>

            <span className="text-xs text-slate-600 font-mono">
              {step} / {STEPS.length}
            </span>

            <button
              type="button"
              onClick={() => setStep((s) => Math.min(STEPS.length, s + 1))}
              disabled={isLastStep}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isLastStep
                  ? 'border border-slate-800 text-slate-700 cursor-not-allowed'
                  : 'border border-emerald-700 bg-emerald-700/20 text-emerald-400 hover:bg-emerald-700/30 hover:border-emerald-600'
              }`}
            >
              Next
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        <div
          className={`w-full lg:w-1/2 sticky top-[57px] h-[calc(100vh-57px)] flex flex-col bg-slate-900/40 ${
            mobileShowPreview ? 'flex' : 'hidden'
          } lg:flex`}
        >
          <SchemaPreview state={state} />
        </div>
      </div>

      <div className="pb-[60px]" />
      <AdvancedPackCta />
    </div>
  );
}
