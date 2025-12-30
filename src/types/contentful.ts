import { Entry, Asset } from 'contentful';

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

export type HotelPropertyEntry = Entry<HotelPropertyFields>;

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

