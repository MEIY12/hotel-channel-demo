'use client';

import { HotelPropertyEntry, HotelPropertyFields } from '@/types/contentful';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import Image from 'next/image';

interface OTAViewProps {
  hotelData: HotelPropertyEntry;
}

export default function OTAView({ hotelData }: OTAViewProps) {
  const updatedData = useContentfulLiveUpdates(hotelData) as HotelPropertyEntry;
  const fields = updatedData.fields as HotelPropertyFields;

  const heroImageUrl = fields.heroImage?.fields?.file?.url
    ? `https:${fields.heroImage.fields.file.url}?w=1200&h=600&fit=fill`
    : '/placeholder.jpg';

  const roomImages = fields.roomImages?.slice(0, 4) || [];

  return (
    <div className="font-inter pt-14 pb-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-4">
          United States &gt; Colorado &gt; Denver &gt; Downtown
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Header */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-ota-primary text-white px-2 py-1 text-xs rounded">
                      Hotel
                    </span>
                    <div className="text-yellow-400 text-sm">★★★★☆</div>
                    <span className="text-sm text-gray-600">(428 reviews)</span>
                  </div>
                  <h1 
                    className="text-3xl font-bold text-gray-900 mb-2"
                    data-contentful-entry-id={updatedData.sys.id}
                    data-contentful-field-id="propertyName"
                  >
                    {fields.propertyName}
                  </h1>
                  <p 
                    className="text-gray-600"
                    data-contentful-entry-id={updatedData.sys.id}
                    data-contentful-field-id="location"
                  >
                    📍 {fields.location}
                  </p>
                </div>
                <button className="text-ota-primary border border-ota-primary px-4 py-2 rounded hover:bg-blue-50 transition-colors">
                  ♡ Save
                </button>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative h-96">
                <Image
                  src={heroImageUrl}
                  alt={fields.propertyName}
                  fill
                  className="object-cover"
                />
                <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded shadow hover:shadow-lg transition-shadow">
                  View all photos
                </button>
              </div>
              {roomImages.length > 0 && (
                <div className="grid grid-cols-4 gap-2 p-2">
                  {roomImages.map((image, index) => {
                    const imageUrl = image.fields?.file?.url
                      ? `https:${image.fields.file.url}?w=300&h=200&fit=fill`
                      : '/placeholder.jpg';
                    return (
                      <div key={index} className="relative h-24">
                        <Image
                          src={imageUrl}
                          alt={`Room view ${index + 1}`}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-ota-success text-white px-3 py-1 rounded text-sm font-medium">
                  Free cancellation
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                  Pay at property
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                  No booking fee
                </span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-4">
                About this property
              </h2>
              <p 
                className="text-gray-700 leading-relaxed mb-6"
                data-contentful-entry-id={updatedData.sys.id}
                data-contentful-field-id="roomDescription"
              >
                {fields.roomDescription}
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Most popular facilities
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {fields.keyAmenities?.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-ota-success">✓</span>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Options */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Available rooms
              </h2>
              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 
                      className="font-semibold text-lg text-gray-900"
                      data-contentful-entry-id={updatedData.sys.id}
                      data-contentful-field-id="roomType"
                    >
                      {fields.roomType}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span>🛏️ 1 king bed</span>
                      <span>👤 Sleeps 2</span>
                      <span>📐 450 sq ft</span>
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className="text-sm text-ota-success">✓ Free cancellation before Feb 1</div>
                      <div className="text-sm text-ota-success">✓ Breakfast included</div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm text-gray-500 line-through">$299</div>
                    <div className="text-3xl font-bold text-gray-900">$249</div>
                    <div className="text-xs text-gray-500">per night</div>
                    <button className="mt-3 bg-ota-primary text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition-colors">
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Guest reviews
              </h2>
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-ota-primary text-white w-16 h-16 rounded flex items-center justify-center text-2xl font-bold">
                  8.7
                </div>
                <div>
                  <div className="font-semibold text-lg">Excellent</div>
                  <div className="text-sm text-gray-600">Based on 428 reviews</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Location</span>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 bg-gray-200 w-32 rounded-full">
                      <div className="h-2 bg-ota-primary w-[90%] rounded-full"></div>
                    </div>
                    <span className="font-semibold">9.0</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Cleanliness</span>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 bg-gray-200 w-32 rounded-full">
                      <div className="h-2 bg-ota-primary w-[85%] rounded-full"></div>
                    </div>
                    <span className="font-semibold">8.5</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Value</span>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 bg-gray-200 w-32 rounded-full">
                      <div className="h-2 bg-ota-primary w-[88%] rounded-full"></div>
                    </div>
                    <span className="font-semibold">8.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-36">
              <div className="text-center mb-4">
                <div className="text-sm text-gray-500">Starting from</div>
                <div className="text-4xl font-bold text-ota-primary">$249</div>
                <div className="text-sm text-gray-600">per night</div>
              </div>

              <div className="border-t border-b py-4 my-4 space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Check-in</label>
                  <input 
                    type="date" 
                    className="w-full border rounded px-3 py-2 mt-1"
                    defaultValue="2025-02-15"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Check-out</label>
                  <input 
                    type="date" 
                    className="w-full border rounded px-3 py-2 mt-1"
                    defaultValue="2025-02-17"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Guests</label>
                  <select className="w-full border rounded px-3 py-2 mt-1">
                    <option>2 adults</option>
                    <option>1 adult</option>
                    <option>3 adults</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-ota-accent text-gray-900 py-4 rounded-lg font-bold hover:bg-yellow-500 transition-colors mb-3">
                Check availability
              </button>

              <div className="text-center text-sm text-gray-600">
                ✓ Free cancellation until Feb 1
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

