export type VenueType =
  | 'escape_room'
  | 'mini_golf'
  | 'axe_throwing'
  | 'laser_tag'
  | 'vr_arcade'
  | 'bowling'
  | 'trampoline_park'
  | 'other_entertainment';

export interface OpeningHour {
  days: ('Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su')[];
  opens: string;
  closes: string;
}

export interface Location {
  id: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  openingHours: OpeningHour[];
}

export interface ReviewData {
  ratingValue: number;
  reviewCount: number;
  source: 'Google' | 'TripAdvisor' | 'Yelp' | 'Facebook' | 'Other';
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SchemaFormState {
  venueType: VenueType;
  businessName: string;
  description: string;
  url: string;
  logoUrl: string;
  imageUrl: string;
  email: string;
  priceRange: string;
  locations: Location[];
  aggregateRating: ReviewData | null;
  ticketingUrl: string;
  faqItems: FaqItem[];
}
