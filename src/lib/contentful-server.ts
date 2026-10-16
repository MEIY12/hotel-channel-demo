import { createClient, type Entry, type EntrySkeletonType } from 'contentful';
import { applyJabilContentCopy } from '@/lib/jabil-content-copy';
import type { HotelPropertyEntry, HotelPropertyFields } from '@/types/contentful';

interface HotelPropertySkeleton extends EntrySkeletonType {
  contentTypeId: 'hotelProperty';
  fields: HotelPropertyFields;
}

function toHotelPropertyEntry(entry: Entry<HotelPropertySkeleton>): HotelPropertyEntry {
  return applyJabilContentCopy(entry as unknown as HotelPropertyEntry);
}

const isPreview = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true';

const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: isPreview
    ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN!
    : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master',
  host: isPreview ? 'preview.contentful.com' : 'cdn.contentful.com',
});

export async function getHotelProperty(
  entryId?: string
): Promise<HotelPropertyEntry | null> {
  try {
    if (entryId) {
      const entry = await contentfulClient.getEntry<HotelPropertySkeleton>(entryId);
      const ctId = entry.sys.contentType.sys.id;
      if (ctId !== 'hotelProperty') {
        console.warn(
          `getHotelProperty: entry ${entryId} is content type "${ctId}", expected "hotelProperty"`
        );
        return null;
      }
      return toHotelPropertyEntry(entry);
    }

    const defaultEntries = await contentfulClient.getEntries<HotelPropertySkeleton>({
      content_type: 'hotelProperty',
      order: ['-sys.createdAt'],
      limit: 1,
      // @ts-expect-error CDA supports fields.defaultProperty
      'fields.defaultProperty': true,
    });

    if (defaultEntries.items.length > 0) {
      return toHotelPropertyEntry(defaultEntries.items[0]);
    }

    const entries = await contentfulClient.getEntries<HotelPropertySkeleton>({
      content_type: 'hotelProperty',
      limit: 1,
    });

    return entries.items[0] ? toHotelPropertyEntry(entries.items[0]) : null;
  } catch (error) {
    console.error('Error fetching hotel property:', error);
    return null;
  }
}
