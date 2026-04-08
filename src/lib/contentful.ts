import { createClient } from 'contentful';
import { ContentfulLivePreview } from '@contentful/live-preview';

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

export async function getHotelProperty(entryId?: string) {
  try {
    if (entryId) {
      const entry = await contentfulClient.getEntry(entryId);
      const ctId = entry.sys.contentType.sys.id;
      if (ctId !== 'hotelProperty') {
        console.warn(
          `getHotelProperty: entry ${entryId} is content type "${ctId}", expected "hotelProperty"`
        );
        return null;
      }
      return entry;
    }
    
    // If no ID provided, get the first hotel property entry
    const entries = await contentfulClient.getEntries({
      content_type: 'hotelProperty',
      limit: 1,
    });
    
    return entries.items[0] || null;
  } catch (error) {
    console.error('Error fetching hotel property:', error);
    return null;
  }
}

