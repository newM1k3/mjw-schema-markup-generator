import { SchemaFormState, VenueType, FaqItem } from '../types';

const VENUE_TYPE_MAP: Record<VenueType, string[]> = {
  escape_room:         ['EntertainmentBusiness', 'SportsActivityLocation'],
  mini_golf:           ['SportsActivityLocation', 'EntertainmentBusiness'],
  axe_throwing:        ['SportsActivityLocation', 'EntertainmentBusiness'],
  laser_tag:           ['EntertainmentBusiness', 'AmusementPark'],
  vr_arcade:           ['EntertainmentBusiness', 'VideoGameArcade'],
  bowling:             ['SportsActivityLocation', 'EntertainmentBusiness'],
  trampoline_park:     ['EntertainmentBusiness', 'AmusementPark'],
  other_entertainment: ['EntertainmentBusiness'],
};

export const FAQ_TEMPLATES: Record<VenueType, FaqItem[]> = {
  escape_room: [
    { question: 'How many people can play in an escape room?', answer: 'Our escape rooms accommodate 2–8 players per session.' },
    { question: 'Do I need to book in advance?', answer: 'Yes, we recommend booking online in advance as our rooms fill up quickly.' },
    { question: 'Is the escape room suitable for children?', answer: 'Yes! Our rooms are suitable for ages 12 and up with a parent or guardian.' },
  ],
  mini_golf: [
    { question: 'How long does a round of mini golf take?', answer: 'A typical round takes 45–60 minutes for up to 6 players.' },
    { question: 'Do you need to book in advance?', answer: 'Walk-ins are welcome but booking online guarantees your spot.' },
    { question: 'Is mini golf suitable for young children?', answer: 'Absolutely! Mini golf is fun for all ages, including young children.' },
  ],
  axe_throwing: [
    { question: 'Do I need experience to throw axes?', answer: 'No experience needed! Our certified coaches provide full safety training before every session.' },
    { question: 'What is the minimum age to throw axes?', answer: 'Participants must be at least 13 years old. Those under 18 require a parent or guardian present.' },
    { question: 'How long is an axe throwing session?', answer: 'Sessions typically run 60–90 minutes and include instruction time.' },
  ],
  laser_tag: [
    { question: 'How long does a laser tag game last?', answer: 'Each game lasts approximately 15–20 minutes. Packages typically include multiple games.' },
    { question: 'What age is laser tag suitable for?', answer: 'Laser tag is suitable for ages 6 and up. Younger children may need a parent to accompany them.' },
    { question: 'Can I book laser tag for a birthday party?', answer: 'Absolutely! We offer private party packages for groups. Contact us for details and availability.' },
  ],
  vr_arcade: [
    { question: 'Do I need VR experience to visit?', answer: 'Not at all! Our staff will walk you through everything — no prior VR experience is needed.' },
    { question: 'Is VR suitable for people who get motion sickness?', answer: 'Some experiences can cause motion discomfort. We offer a range of experiences including seated and gentle options.' },
    { question: 'How long is a VR session?', answer: 'Sessions start at 30 minutes. We recommend 60 minutes for a full experience with multiple games.' },
  ],
  bowling: [
    { question: 'Do I need to bring my own bowling shoes?', answer: 'No, bowling shoe rentals are available at our front desk for a small fee.' },
    { question: 'Can I book a lane in advance?', answer: 'Yes! Online lane reservations are available and recommended, especially for weekends.' },
    { question: 'Do you offer bumper bowling for kids?', answer: 'Absolutely! Bumper bowling and lighter balls are available for our younger guests.' },
  ],
  trampoline_park: [
    { question: 'Are grip socks required?', answer: 'Yes, all jumpers must wear approved grip socks. They are available for purchase at the front desk.' },
    { question: 'What is the minimum age to jump?', answer: 'Jumpers must be at least 3 years old. We have dedicated toddler areas for our youngest guests.' },
    { question: 'How long is a jump session?', answer: 'Jump sessions are available in 60 or 90-minute blocks. We recommend booking online to secure your preferred time.' },
  ],
  other_entertainment: [
    { question: 'How do I book an experience?', answer: 'Bookings can be made online through our website or by calling us directly.' },
    { question: 'Do you offer group discounts?', answer: 'Yes! We offer special rates for groups of 10 or more. Contact us for a custom quote.' },
    { question: 'What is your cancellation policy?', answer: 'Cancellations made 24 hours before your booking are eligible for a full refund.' },
  ],
};

export function generateSchema(state: SchemaFormState): object {
  const typeArray = VENUE_TYPE_MAP[state.venueType];

  const locationBlocks = state.locations.map((loc) => {
    const openingHoursSpec = loc.openingHours.map((oh) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: oh.days.map((d) => `https://schema.org/${getDayFull(d)}`),
      opens: oh.opens,
      closes: oh.closes,
    }));

    return {
      '@context': 'https://schema.org',
      '@type': typeArray.length === 1 ? typeArray[0] : typeArray,
      name: state.businessName,
      description: state.description || undefined,
      url: state.url || undefined,
      logo: state.logoUrl ? { '@type': 'ImageObject', url: state.logoUrl } : undefined,
      image: state.imageUrl || undefined,
      telephone: loc.phone || undefined,
      email: state.email || undefined,
      address: {
        '@type': 'PostalAddress',
        streetAddress: loc.streetAddress,
        addressLocality: loc.city,
        addressRegion: loc.state,
        postalCode: loc.postalCode,
        addressCountry: loc.country || 'US',
      },
      openingHoursSpecification: openingHoursSpec.length > 0 ? openingHoursSpec : undefined,
      aggregateRating: state.aggregateRating
        ? {
            '@type': 'AggregateRating',
            ratingValue: state.aggregateRating.ratingValue.toFixed(1),
            reviewCount: state.aggregateRating.reviewCount,
            bestRating: '5',
            worstRating: '1',
          }
        : undefined,
      potentialAction: state.ticketingUrl
        ? {
            '@type': 'ReserveAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: state.ticketingUrl,
              actionPlatform: [
                'http://schema.googleapis.com/FindAction',
                'http://schema.googleapis.com/ReserveAction',
              ],
            },
            result: {
              '@type': 'Reservation',
              name: `Book a session at ${state.businessName}`,
            },
          }
        : undefined,
      priceRange: state.priceRange || undefined,
    };
  });

  const faqBlock =
    state.faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: state.faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  if (locationBlocks.length === 1 && !faqBlock) {
    return stripUndefined(locationBlocks[0]);
  }

  const allBlocks = [...locationBlocks.map(stripUndefined)];
  if (faqBlock) allBlocks.push(faqBlock);

  return {
    '@context': 'https://schema.org',
    '@graph': allBlocks,
  };
}

function getDayFull(abbr: string): string {
  const map: Record<string, string> = {
    Mo: 'Monday',
    Tu: 'Tuesday',
    We: 'Wednesday',
    Th: 'Thursday',
    Fr: 'Friday',
    Sa: 'Saturday',
    Su: 'Sunday',
  };
  return map[abbr] || abbr;
}

function stripUndefined(obj: Record<string, unknown>): Record<string, unknown> {
  return JSON.parse(JSON.stringify(obj));
}

export function getScriptTag(schema: object): string {
  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}
