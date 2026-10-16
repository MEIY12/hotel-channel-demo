'use client';

import JabilBrandExperience from '@/components/jabil/JabilBrandExperience';
import { HotelPropertyEntry } from '@/types/contentful';

interface LuxuryViewProps {
  hotelData: HotelPropertyEntry;
}

export default function LuxuryView({ hotelData }: LuxuryViewProps) {
  return <JabilBrandExperience hotelData={hotelData} layout="page" />;
}
