import { NextRequest, NextResponse } from 'next/server';
import { getHotelProperty } from '@/lib/contentful-server';

export async function GET(request: NextRequest) {
  const entryId = request.nextUrl.searchParams.get('entryId')?.trim() || undefined;

  const entry = await getHotelProperty(entryId);

  if (!entry) {
    return NextResponse.json(
      { error: entryId ? `No brand entry for id "${entryId}"` : 'No Jabil content entry found' },
      { status: 404 }
    );
  }

  return NextResponse.json(entry);
}
