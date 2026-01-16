'use client';

import { HotelPropertyEntry, HotelPropertyFields } from '@/types/contentful';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import Image from 'next/image';
import { useState } from 'react';

interface MobileViewProps {
  hotelData: HotelPropertyEntry;
}

export default function MobileView({ hotelData }: MobileViewProps) {
  const updatedData = useContentfulLiveUpdates(hotelData) as HotelPropertyEntry;
  const fields = updatedData.fields as HotelPropertyFields;
  const [expandedDesc, setExpandedDesc] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImageUrl = fields.heroImage?.fields?.file?.url
    ? `https:${fields.heroImage.fields.file.url}?w=800&h=600&fit=fill`
    : '/placeholder.jpg';

  const allImages = [fields.heroImage, ...(fields.roomImages || [])].filter(Boolean);

  const truncatedDesc = fields.roomDescription?.slice(0, 120) + '...';

  return (
    <div className="font-inter bg-gray-50 h-full w-full relative flex flex-col overflow-hidden">
      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden pb-24">
        {/* Header */}
        <div className="bg-white px-4 pt-14 pb-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <button className="p-2 -ml-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h1 className="font-semibold text-gray-900 text-lg">Property Details</h1>
          <button className="p-2 -mr-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
        </div>

        {/* Image Carousel */}
        <div className="relative bg-gray-200">
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={heroImageUrl}
              alt={fields.propertyName}
              fill
              className="object-cover"
              priority
            />
            
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-4">
          {/* Title & Location */}
          <div className="mb-4">
            <h2 
              className="text-2xl font-bold text-gray-900 mb-1 leading-tight"
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="propertyName"
            >
              {fields.propertyName}
            </h2>
            <p 
              className="text-blue-600 font-medium text-sm mb-1"
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="heroHeadline"
            >
              {fields.heroHeadline}
            </p>
            <p 
              className="text-gray-600 text-sm flex items-center mt-1"
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="location"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-gray-400">
                <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 10 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.006.003.002.001.003-.001a.75.75 0 00-.01-.003zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {fields.location}
            </p>
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center justify-between py-3 border-y border-gray-100 mb-4">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center mr-2">
                9.2
              </div>
              <span className="text-sm font-semibold text-gray-900">Wonderful</span>
              <span className="mx-1 text-gray-300">•</span>
              <span className="text-sm text-gray-500">428 reviews</span>
            </div>
          </div>

          {/* Quick Stats / Features */}
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide mb-4">
            <div className="flex-shrink-0 flex flex-col items-center justify-center min-w-[80px] p-3 rounded-xl border border-gray-200 bg-white">
              <span className="text-xl mb-1">🛏️</span>
              <span className="text-xs text-gray-600 font-medium">{fields.roomType?.split(' ')[0] || 'Room'}</span>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center justify-center min-w-[80px] p-3 rounded-xl border border-gray-200 bg-white">
              <span className="text-xl mb-1">👥</span>
              <span className="text-xs text-gray-600 font-medium">2 Guests</span>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center justify-center min-w-[80px] p-3 rounded-xl border border-gray-200 bg-white">
              <span className="text-xl mb-1">📏</span>
              <span className="text-xs text-gray-600 font-medium">450 ft²</span>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center justify-center min-w-[80px] p-3 rounded-xl border border-gray-200 bg-white">
              <span className="text-xl mb-1">📶</span>
              <span className="text-xs text-gray-600 font-medium">WiFi</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-bold text-lg text-gray-900 mb-2">About this stay</h3>
            <p 
              className="text-gray-600 text-sm leading-relaxed"
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="roomDescription"
            >
              {expandedDesc ? fields.roomDescription : truncatedDesc}
            </p>
            <button 
              onClick={() => setExpandedDesc(!expandedDesc)}
              className="text-blue-600 font-medium text-sm mt-2 flex items-center"
            >
              {expandedDesc ? 'Show less' : 'Show more'}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 ml-1 transition-transform ${expandedDesc ? 'rotate-180' : ''}`}>
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Amenities List */}
          <div className="mb-6">
            <h3 className="font-bold text-lg text-gray-900 mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {fields.keyAmenities?.slice(0, 4).map((amenity: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
            {fields.keyAmenities && fields.keyAmenities.length > 4 && (
              <button className="w-full mt-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
                Show all amenities
              </button>
            )}
          </div>

          {/* Location/Map Preview */}
          <div className="mb-6">
            <h3 className="font-bold text-lg text-gray-900 mb-3">Location</h3>
            <div className="bg-gray-100 rounded-xl h-40 w-full flex items-center justify-center relative overflow-hidden mb-3">
              {/* Placeholder for map */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="bg-white p-2 rounded-full shadow-lg z-10">
                <div className="bg-blue-600 w-3 h-3 rounded-full"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur p-2 text-xs text-center text-gray-600 border-t border-gray-200">
                {fields.location}
              </div>
            </div>
            <p 
              className="text-gray-600 text-sm"
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="neighborhoodVibe"
            >
              {fields.neighborhoodVibe}
            </p>
          </div>

          {/* Highlight / Signature Experience */}
          {fields.signatureExperience && (
            <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl mt-0.5">✨</span>
                <div>
                  <h3 className="font-semibold text-blue-900 text-sm mb-1">Signature Experience</h3>
                  <p 
                    className="text-blue-800 text-sm leading-relaxed"
                    data-contentful-entry-id={updatedData.sys.id}
                    data-contentful-field-id="signatureExperience"
                  >
                    {fields.signatureExperience}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Spacer */}
          <div className="h-10"></div>
        </div>
      </div>

      {/* Bottom Navigation / CTA */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-6 pt-3 px-4 z-40 safe-area-bottom">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-gray-500 line-through">$299</p>
            <p className="text-xl font-bold text-gray-900">$249<span className="text-sm font-normal text-gray-500">/night</span></p>
          </div>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-sm active:bg-blue-700 active:scale-95 transition-all">
            Reserve
          </button>
        </div>
        
        {/* App Tab Bar */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100 -mx-4 px-8">
          <button className="flex flex-col items-center space-y-1 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
            </svg>
            <span className="text-[10px] font-medium">Explore</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span className="text-[10px] font-medium">Saved</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
            <span className="text-[10px] font-medium">Trips</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span className="text-[10px] font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

