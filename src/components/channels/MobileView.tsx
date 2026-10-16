'use client';

import JabilBrandExperience from '@/components/jabil/JabilBrandExperience';
import { HotelPropertyEntry } from '@/types/contentful';

interface MobileViewProps {
  hotelData: HotelPropertyEntry;
}

export default function MobileView({ hotelData }: MobileViewProps) {
  return <JabilBrandExperience hotelData={hotelData} layout="mobile" />;
}
