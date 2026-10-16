'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { HotelPropertyEntry, ChannelType } from '@/types/contentful';
import ChannelSwitcher from '@/components/ChannelSwitcher';
import PhoneMockupFrame from '@/components/PhoneMockupFrame';
import LuxuryView from '@/components/channels/LuxuryView';
import OTAView from '@/components/channels/OTAView';
import MobileView from '@/components/channels/MobileView';
import EmailView from '@/components/channels/EmailView';
import KioskView from '@/components/channels/KioskView';
import { ContentfulLivePreviewProvider, useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { initContentfulPreview } from '@/lib/contentful-preview';
import { applyJabilContentCopy } from '@/lib/jabil-content-copy';

function getEntryIdFromSearchParams(searchParams: URLSearchParams): string | undefined {
  const id = searchParams.get('id')?.trim() || searchParams.get('entry')?.trim();
  return id || undefined;
}

function HotelChannels({
  hotelData,
  channel,
}: {
  hotelData: HotelPropertyEntry;
  channel: ChannelType;
}) {
  const updatedHotelData = useContentfulLiveUpdates(hotelData);
  const entry = applyJabilContentCopy(updatedHotelData ?? hotelData);

  const renderChannel = () => {
    const props = { hotelData: entry };

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

  const previewEnabled = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true';

  const main = (
    <main className="min-h-screen">
      <ChannelSwitcher currentChannel={channel} entryId={entry.sys.id} />
      <div className={channel === 'mobile' ? '' : 'pt-14'}>
        {renderChannel()}
      </div>
    </main>
  );

  if (!previewEnabled) {
    return main;
  }

  return <ContentfulLivePreviewProvider locale="en-US">{main}</ContentfulLivePreviewProvider>;
}

function HotelPageContent({
  initialHotelData,
  initialEntryId,
}: {
  initialHotelData: HotelPropertyEntry | null;
  initialEntryId?: string;
}) {
  const [hotelData, setHotelData] = useState<HotelPropertyEntry | null>(initialHotelData);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const channel = (searchParams.get('channel') || 'luxury') as ChannelType;
  const entryId = getEntryIdFromSearchParams(searchParams);

  useEffect(() => {
    initContentfulPreview();
  }, []);

  useEffect(() => {
    if ((entryId || '') === (initialEntryId || '')) {
      setHotelData(initialHotelData);
      return;
    }

    async function loadData() {
      setLoading(true);
      setLoadError(null);
      try {
        const qs = entryId ? `?entryId=${encodeURIComponent(entryId)}` : '';
        const res = await fetch(`/api/hotel-property${qs}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          setLoadError((body as { error?: string }).error || res.statusText);
          setHotelData(null);
          return;
        }
        const data = (await res.json()) as HotelPropertyEntry;
        setHotelData(data);
      } catch {
        setLoadError('Failed to load content. Check that the dev server is running.');
        setHotelData(null);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [entryId, initialEntryId, initialHotelData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Jabil content...</p>
        </div>
      </div>
    );
  }

  if (!hotelData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-lg px-6">
          <h1 className="text-2xl font-bold text-red-600">Error Loading Data</h1>
          <p className="mt-2 text-gray-600">
            {loadError ||
              (entryId
                ? `No content entry was found for id “${entryId}”.`
                : 'Please check your Contentful configuration and ensure you have a published brand entry.')}
          </p>
        </div>
      </div>
    );
  }

  return <HotelChannels hotelData={hotelData} channel={channel} />;
}

export default function HomePageClient({
  initialHotelData,
  initialEntryId,
}: {
  initialHotelData: HotelPropertyEntry | null;
  initialEntryId?: string;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <HotelPageContent initialHotelData={initialHotelData} initialEntryId={initialEntryId} />
    </Suspense>
  );
}
