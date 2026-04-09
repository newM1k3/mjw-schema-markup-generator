import { SchemaType, SchemaConfig } from '../types/schema';

interface SchemaTypeSelectorProps {
  selectedType: SchemaType;
  onTypeChange: (type: SchemaType) => void;
}

const schemaConfigs: SchemaConfig[] = [
  {
    type: 'Article',
    label: 'Article',
    description: 'News articles, blog posts, and editorial content',
  },
  {
    type: 'Product',
    label: 'Product',
    description: 'E-commerce products with pricing and availability',
  },
  {
    type: 'LocalBusiness',
    label: 'Local Business',
    description: 'Physical business locations and contact info',
  },
  {
    type: 'FAQPage',
    label: 'FAQ Page',
    description: 'Frequently asked questions and answers',
  },
];

export default function SchemaTypeSelector({ selectedType, onTypeChange }: SchemaTypeSelectorProps) {
  return (
    <div className="mb-6">
      <label htmlFor="schema-type" className="block text-sm font-medium text-gray-300 mb-2">
        Schema Type
      </label>
      <select
        id="schema-type"
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value as SchemaType)}
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
      >
        {schemaConfigs.map((config) => (
          <option key={config.type} value={config.type}>
            {config.label}
          </option>
        ))}
      </select>
      <p className="mt-2 text-sm text-gray-400">
        {schemaConfigs.find((c) => c.type === selectedType)?.description}
      </p>
    </div>
  );
}
