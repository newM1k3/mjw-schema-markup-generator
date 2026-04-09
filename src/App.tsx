import { useState, useEffect } from 'react';
import { FileJson } from 'lucide-react';
import SchemaTypeSelector from './components/SchemaTypeSelector';
import SchemaForm from './components/SchemaForm';
import JsonPreview from './components/JsonPreview';
import { SchemaType, SchemaFormState } from './types/schema';
import { generateSchema, getDefaultFormState } from './utils/schemaGenerator';

function App() {
  const [schemaType, setSchemaType] = useState<SchemaType>('Article');
  const [formState, setFormState] = useState<SchemaFormState>(getDefaultFormState('Article'));
  const [generatedSchema, setGeneratedSchema] = useState<object>({});

  useEffect(() => {
    setFormState(getDefaultFormState(schemaType));
  }, [schemaType]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGeneratedSchema(generateSchema(schemaType, formState));
    }, 100);

    return () => clearTimeout(timer);
  }, [schemaType, formState]);

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-950 border-b border-gray-800">
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <FileJson className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Schema Markup Generator</h1>
              <p className="text-sm text-gray-400 mt-0.5">
                Generate SEO-optimized Schema.org JSON-LD markup
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-180px)]">
          <div className="bg-gray-850 rounded-lg border border-gray-800 p-6 overflow-y-auto">
            <h2 className="text-lg font-semibold text-white mb-6">Schema Configuration</h2>
            <SchemaTypeSelector selectedType={schemaType} onTypeChange={setSchemaType} />
            <SchemaForm type={schemaType} formState={formState} onChange={setFormState} />
          </div>

          <div className="bg-gray-850 rounded-lg border border-gray-800 p-6 overflow-hidden">
            <JsonPreview schema={generatedSchema} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
