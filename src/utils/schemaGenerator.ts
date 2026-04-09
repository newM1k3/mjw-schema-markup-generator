import { SchemaType, SchemaFormState } from '../types/schema';

export const generateSchema = (type: SchemaType, formState: SchemaFormState): object => {
  const baseSchema = {
    '@context': 'https://schema.org',
  };

  switch (type) {
    case 'Article':
      return {
        ...baseSchema,
        '@type': 'Article',
        headline: formState.headline || '',
        image: formState.image || '',
        author: {
          '@type': 'Person',
          name: formState.authorName || '',
        },
        datePublished: formState.datePublished || '',
        publisher: {
          '@type': 'Organization',
          name: formState.publisherName || '',
        },
      };

    case 'Product':
      return {
        ...baseSchema,
        '@type': 'Product',
        name: formState.name || '',
        image: formState.image || '',
        description: formState.description || '',
        brand: {
          '@type': 'Brand',
          name: formState.brand || '',
        },
        offers: {
          '@type': 'Offer',
          price: formState.price || '0',
          priceCurrency: formState.currency || 'USD',
          availability: formState.availability || 'https://schema.org/InStock',
        },
      };

    case 'LocalBusiness':
      return {
        ...baseSchema,
        '@type': 'LocalBusiness',
        name: formState.name || '',
        image: formState.image || '',
        address: {
          '@type': 'PostalAddress',
          streetAddress: formState.address || '',
        },
        telephone: formState.phone || '',
        url: formState.url || '',
        priceRange: formState.priceRange || '$$',
      };

    case 'FAQPage':
      return {
        ...baseSchema,
        '@type': 'FAQPage',
        mainEntity: (formState.faqItems || []).map((item) => ({
          '@type': 'Question',
          name: item.question || '',
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer || '',
          },
        })),
      };

    default:
      return baseSchema;
  }
};

export const getDefaultFormState = (type: SchemaType): SchemaFormState => {
  switch (type) {
    case 'Article':
      return {
        headline: '',
        image: '',
        authorName: '',
        datePublished: new Date().toISOString().split('T')[0],
        publisherName: '',
      };

    case 'Product':
      return {
        name: '',
        image: '',
        description: '',
        brand: '',
        price: '',
        currency: 'USD',
        availability: 'https://schema.org/InStock',
      };

    case 'LocalBusiness':
      return {
        name: '',
        image: '',
        address: '',
        phone: '',
        url: '',
        priceRange: '$$',
      };

    case 'FAQPage':
      return {
        faqItems: [{ question: '', answer: '' }],
      };

    default:
      return {};
  }
};
