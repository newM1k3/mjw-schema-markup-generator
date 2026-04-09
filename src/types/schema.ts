export type SchemaType = 'Article' | 'Product' | 'LocalBusiness' | 'FAQPage';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SchemaFormState {
  // Article fields
  headline?: string;
  image?: string;
  authorName?: string;
  datePublished?: string;
  publisherName?: string;

  // Product fields
  name?: string;
  description?: string;
  brand?: string;
  price?: string;
  currency?: string;
  availability?: string;

  // LocalBusiness fields
  address?: string;
  phone?: string;
  url?: string;
  priceRange?: string;

  // FAQPage fields
  faqItems?: FAQItem[];
}

export interface SchemaConfig {
  type: SchemaType;
  label: string;
  description: string;
}
