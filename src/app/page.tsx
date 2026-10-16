import { getHotelProperty } from '@/lib/contentful-server';
import HomePageClient from './HomePageClient';

type SearchParams = Record<string, string | string[] | undefined>;

function pickEntryId(searchParams: SearchParams): string | undefined {
  const id = searchParams.id;
  const entry = searchParams.entry;
  if (typeof id === 'string' && id.trim()) return id.trim();
  if (typeof entry === 'string' && entry.trim()) return entry.trim();
  return undefined;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const entryId = pickEntryId(params);
  const hotelData = await getHotelProperty(entryId);

  return <HomePageClient initialHotelData={hotelData} initialEntryId={entryId} />;
}
