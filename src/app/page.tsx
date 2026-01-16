'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getHotelProperty } from '@/lib/contentful';
import { HotelPropertyEntry, ChannelType } from '@/types/contentful';
import ChannelSwitcher from '@/components/ChannelSwitcher';
import LuxuryView from '@/components/channels/LuxuryView';
import OTAView from '@/components/channels/OTAView';
import MobileView from '@/components/channels/MobileView';
import EmailView from '@/components/channels/EmailView';
import KioskView from '@/components/channels/KioskView';
import PhoneMockupFrame from '@/components/PhoneMockupFrame';
import { ContentfulLivePreviewProvider, useContentfulLiveUpdates } from '@contentful/live-preview/react';

function HotelPageContent() {
  const [hotelData, setHotelData] = useState<HotelPropertyEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const channel = (searchParams.get('channel') || 'luxury') as ChannelType;

  // Use live updates at the parent level so all channels get fresh data
  const updatedHotelData = useContentfulLiveUpdates(hotelData);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getHotelProperty();
      setHotelData(data as HotelPropertyEntry);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hotel data...</p>
        </div>
      </div>
    );
  }

  if (!hotelData || !updatedHotelData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error Loading Data</h1>
          <p className="mt-2 text-gray-600">
            Please check your Contentful configuration and ensure you have created a Hotel Property entry.
          </p>
        </div>
      </div>
    );
  }

  const renderChannel = () => {
    const props = { hotelData: updatedHotelData };
    
    switch (channel) {
      case 'luxury':
        return <LuxuryView {...props} />;
      case 'ota':
        return <OTAView {...props} />;
      case 'mobile':
        return (
          <PhoneMockupFrame>
            <MobileView {...props} />
          </PhoneMockupFrame>
        );
      case 'email':
        return <EmailView {...props} />;
      case 'kiosk':
        return <KioskView {...props} />;
      default:
        return <LuxuryView {...props} />;
    }
  };

  return (
    <ContentfulLivePreviewProvider locale="en-US">
      <main className="min-h-screen">
        {/* Show ChannelSwitcher for all channels */}
        <ChannelSwitcher currentChannel={channel} entryId={updatedHotelData.sys.id} />
        
        {/* Add top padding for non-mobile channels to account for the fixed ChannelSwitcher */}
        <div className={channel === 'mobile' ? '' : 'pt-14'}>
          {renderChannel()}
        </div>
      </main>
    </ContentfulLivePreviewProvider>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <HotelPageContent />
    </Suspense>
  );
}
