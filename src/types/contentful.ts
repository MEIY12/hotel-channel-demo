import { Entry, Asset, EntrySkeletonType } from 'contentful';

export interface HotelPropertyFields {
  propertyName: string;
  heroHeadline: string;
  location: string;
  roomType: string;
  roomDescription: string;
  neighborhoodVibe: string;
  signatureExperience: string;
  keyAmenities: string[];
  heroImage: Asset;
  roomImages: Asset[];
}

export interface HotelPropertySkeleton extends EntrySkeletonType {
  contentTypeId: 'hotelProperty';
  fields: HotelPropertyFields;
}

export type HotelPropertyEntry = Entry<HotelPropertySkeleton, undefined, string>;

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

