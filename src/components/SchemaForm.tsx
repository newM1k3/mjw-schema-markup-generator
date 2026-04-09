import { Plus, Trash2 } from 'lucide-react';
import { SchemaType, SchemaFormState, FAQItem } from '../types/schema';

interface SchemaFormProps {
  type: SchemaType;
  formState: SchemaFormState;
  onChange: (state: SchemaFormState) => void;
}

export default function SchemaForm({ type, formState, onChange }: SchemaFormProps) {
  const updateField = (field: string, value: string) => {
    onChange({ ...formState, [field]: value });
  };

  const updateFAQItem = (index: number, field: 'question' | 'answer', value: string) => {
    const items = [...(formState.faqItems || [])];
    items[index] = { ...items[index], [field]: value };
    onChange({ ...formState, faqItems: items });
  };

  const addFAQItem = () => {
    onChange({
      ...formState,
      faqItems: [...(formState.faqItems || []), { question: '', answer: '' }],
    });
  };

  const removeFAQItem = (index: number) => {
    const items = formState.faqItems?.filter((_, i) => i !== index) || [];
    onChange({ ...formState, faqItems: items });
  };

  const renderInput = (
    label: string,
    field: string,
    type: string = 'text',
    placeholder: string = ''
  ) => (
    <div className="mb-4">
      <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        id={field}
        type={type}
        value={(formState[field as keyof SchemaFormState] as string) || ''}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
      />
    </div>
  );

  const renderTextarea = (label: string, field: string, placeholder: string = '') => (
    <div className="mb-4">
      <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <textarea
        id={field}
        value={(formState[field as keyof SchemaFormState] as string) || ''}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
      />
    </div>
  );

  const renderSelect = (label: string, field: string, options: { value: string; label: string }[]) => (
    <div className="mb-4">
      <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <select
        id={field}
        value={(formState[field as keyof SchemaFormState] as string) || ''}
        onChange={(e) => updateField(field, e.target.value)}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      {type === 'Article' && (
        <>
          {renderInput('Headline', 'headline', 'text', 'Enter article headline')}
          {renderInput('Image URL', 'image', 'url', 'https://example.com/image.jpg')}
          {renderInput('Author Name', 'authorName', 'text', 'John Doe')}
          {renderInput('Date Published', 'datePublished', 'date')}
          {renderInput('Publisher Name', 'publisherName', 'text', 'Publisher Organization')}
        </>
      )}

      {type === 'Product' && (
        <>
          {renderInput('Product Name', 'name', 'text', 'Enter product name')}
          {renderInput('Image URL', 'image', 'url', 'https://example.com/product.jpg')}
          {renderTextarea('Description', 'description', 'Describe the product...')}
          {renderInput('Brand', 'brand', 'text', 'Brand Name')}
          <div className="grid grid-cols-2 gap-4">
            {renderInput('Price', 'price', 'number', '99.99')}
            {renderSelect('Currency', 'currency', [
              { value: 'USD', label: 'USD ($)' },
              { value: 'EUR', label: 'EUR (€)' },
              { value: 'GBP', label: 'GBP (£)' },
              { value: 'JPY', label: 'JPY (¥)' },
            ])}
          </div>
          {renderSelect('Availability', 'availability', [
            { value: 'https://schema.org/InStock', label: 'In Stock' },
            { value: 'https://schema.org/OutOfStock', label: 'Out of Stock' },
            { value: 'https://schema.org/PreOrder', label: 'Pre-Order' },
            { value: 'https://schema.org/Discontinued', label: 'Discontinued' },
          ])}
        </>
      )}

      {type === 'LocalBusiness' && (
        <>
          {renderInput('Business Name', 'name', 'text', 'Your Business Name')}
          {renderInput('Image URL', 'image', 'url', 'https://example.com/business.jpg')}
          {renderTextarea('Street Address', 'address', '123 Main St, City, State ZIP')}
          {renderInput('Phone Number', 'phone', 'tel', '+1-555-555-5555')}
          {renderInput('Website URL', 'url', 'url', 'https://yourbusiness.com')}
          {renderInput('Price Range', 'priceRange', 'text', '$$')}
        </>
      )}

      {type === 'FAQPage' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-300">FAQ Items</h3>
            <button
              onClick={addFAQItem}
              className="flex items-center gap-2 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add FAQ
            </button>
          </div>

          {formState.faqItems?.map((item, index) => (
            <div
              key={index}
              className="mb-6 p-4 bg-gray-800 border border-gray-700 rounded-lg relative"
            >
              <button
                onClick={() => removeFAQItem(index)}
                className="absolute top-3 right-3 p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded transition-colors"
                title="Remove FAQ"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Question {index + 1}
                </label>
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => updateFAQItem(index, 'question', e.target.value)}
                  placeholder="Enter question..."
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Answer</label>
                <textarea
                  value={item.answer}
                  onChange={(e) => updateFAQItem(index, 'answer', e.target.value)}
                  placeholder="Enter answer..."
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>
          ))}

          {(!formState.faqItems || formState.faqItems.length === 0) && (
            <p className="text-center text-gray-500 py-8">
              No FAQ items yet. Click "Add FAQ" to get started.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
