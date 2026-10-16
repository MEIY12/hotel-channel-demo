import type { HotelPropertyEntry, HotelPropertyFields } from '@/types/contentful';

/** Canonical Jabil messaging (jabil.com) mapped onto the demo content model. */
export const JABIL_FIELD_COPY: Pick<
  HotelPropertyFields,
  | 'propertyName'
  | 'heroHeadline'
  | 'roomDescription'
  | 'roomType'
  | 'location'
  | 'neighborhoodVibe'
  | 'signatureExperience'
  | 'keyAmenities'
> = {
  propertyName: 'Jabil',
  heroHeadline:
    'Engineering, supply chain, and manufacturing that enables the world’s leading product brands',
  roomDescription:
    'We help the world’s leading brands design, build, and scale products across global markets. With more than 60 years of experience across nearly every industry, we solve tough challenges through engineering excellence, resilient supply chains, and comprehensive manufacturing solutions.',
  roomType: 'Design & Engineering',
  location:
    '30+ countries, 120+ sites strategically located worldwide, and 140,000+ employees united by a people-centered culture.',
  neighborhoodVibe:
    'Our people are Jabil’s greatest strength—empowered to grow their careers, support their wellbeing, and deliver impact for customers in healthcare, automotive, energy, digital commerce, and more.',
  signatureExperience:
    'Tailored solutions across the product lifecycle accelerate your time-to-market—from early design and engineering through supply chain management, manufacturing, and post-production services.',
  keyAmenities: [
    'Design & Engineering',
    'Supply Chain Management',
    'Manufacturing',
    'Post-Production Services',
  ],
};

export function applyJabilContentCopy(entry: HotelPropertyEntry): HotelPropertyEntry {
  return {
    ...entry,
    fields: {
      ...entry.fields,
      ...JABIL_FIELD_COPY,
      heroImage: entry.fields.heroImage,
      roomImages: entry.fields.roomImages,
      defaultProperty: entry.fields.defaultProperty,
    },
  };
}
