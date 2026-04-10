import { createClient } from 'contentful';
import { ContentfulLivePreview } from '@contentful/live-preview';
import type { HotelPropertyEntry, HotelPropertySkeleton } from '@/types/contentful';

const isPreview = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true';

export const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: isPreview
    ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN!
    : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master',
  host: isPreview ? 'preview.contentful.com' : 'cdn.contentful.com',
});

// Initialize Live Preview
if (typeof window !== 'undefined') {
  ContentfulLivePreview.init({
    locale: 'en-US',
    enableInspectorMode: true,
    enableLiveUpdates: true,
  });
}

export async function getHotelProperty(
  entryId?: string
): Promise<HotelPropertyEntry | null> {
  try {
    if (entryId) {
      const entry = await contentfulClient.getEntry<HotelPropertySkeleton>(
        entryId
      );
      const ctId = entry.sys.contentType.sys.id;
      if (ctId !== 'hotelProperty') {
        console.warn(
          `getHotelProperty: entry ${entryId} is content type "${ctId}", expected "hotelProperty"`
        );
        return null;
      }
      return entry;
    }

    // No ID: prefer an entry with defaultProperty === true; if several, newest by createdAt
    const defaultEntries = await contentfulClient.getEntries<HotelPropertySkeleton>({
      content_type: 'hotelProperty',
      order: ['-sys.createdAt'],
      limit: 1,
      // @ts-expect-error EntriesQueries omits custom fields.* filter keys; CDA supports fields.defaultProperty
      'fields.defaultProperty': true,
    });

    if (defaultEntries.items.length > 0) {
      return defaultEntries.items[0];
    }

    // Fallback: any hotel property (legacy spaces with no default flagged)
    const entries = await contentfulClient.getEntries<HotelPropertySkeleton>({
      content_type: 'hotelProperty',
      limit: 1,
    });

    return entries.items[0] || null;
  } catch (error) {
    console.error('Error fetching hotel property:', error);
    return null;
  }
}

