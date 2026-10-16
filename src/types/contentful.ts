/** Client-safe types (no `contentful` package import — avoids broken client bundles). */

export interface ContentfulAssetFile {
  url?: string;
  details?: { image?: { width?: number; height?: number } };
  fileName?: string;
  contentType?: string;
}

export interface ContentfulAsset {
  sys?: { id: string };
  fields?: {
    title?: string;
    description?: string;
    file?: ContentfulAssetFile;
  };
}

export interface HotelPropertyFields {
  /** When true, this entry is preferred for the homepage when no `id` is in the URL. */
  defaultProperty?: boolean;
  propertyName: string;
  heroHeadline: string;
  location: string;
  roomType: string;
  roomDescription: string;
  neighborhoodVibe: string;
  signatureExperience: string;
  keyAmenities: string[];
  heroImage: ContentfulAsset;
  roomImages: ContentfulAsset[];
}

export interface HotelPropertyEntry {
  sys: {
    id: string;
    type?: string;
    createdAt?: string;
    updatedAt?: string;
    contentType?: { sys: { id: string } };
  };
  metadata?: { tags?: unknown[]; concepts?: unknown[] };
  fields: HotelPropertyFields;
}

export type ChannelType =
  | 'luxury'
  | 'ota'
  | 'mobile'
  | 'email'
  | 'kiosk';

export interface ChannelConfig {
  id: ChannelType;
  name: string;
  description: string;
  icon: string;
}
