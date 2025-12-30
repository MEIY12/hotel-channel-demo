'use client';

import { HotelPropertyEntry } from '@/types/contentful';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import Image from 'next/image';

interface KioskViewProps {
  hotelData: HotelPropertyEntry;
}

export default function KioskView({ hotelData }: KioskViewProps) {
  const updatedData = useContentfulLiveUpdates(hotelData);
  const fields = updatedData.fields;

  const heroImageUrl = fields.heroImage?.fields?.file?.url
    ? `https:${fields.heroImage.fields.file.url}?w=1920&h=1080&fit=fill`
    : '/placeholder.jpg';

  return (
    <div className="font-sans relative h-screen w-full bg-black overflow-hidden">
      {/* Full Screen Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImageUrl}
          alt={fields.propertyName}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Main Interface */}
      <div className="relative z-10 grid grid-cols-12 h-full">
        {/* Left Content Panel */}
        <div className="col-span-5 h-full flex flex-col justify-between p-12 pl-16">
          
          {/* Header */}
          <div>
            <p className="text-amber-400 tracking-[0.2em] text-sm font-bold mb-4 uppercase">Welcome to</p>
            <h1 
              className="text-6xl font-serif text-white mb-6 leading-tight"
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="propertyName"
            >
              {fields.propertyName}
            </h1>
            <div className="w-20 h-1 bg-amber-500 mb-8"></div>
          </div>

          {/* Room Info */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 
              className="text-3xl text-white font-light mb-4"
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="roomType"
            >
              {fields.roomType}
            </h2>
            <p 
              className="text-gray-300 text-lg leading-relaxed mb-8 font-light"
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="roomDescription"
            >
              {fields.roomDescription}
            </p>

            {/* Amenities Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-10">
              {fields.keyAmenities?.slice(0, 4).map((amenity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white">
                    ✓
                  </div>
                  <span className="text-gray-200 text-lg">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer / Actions */}
          <div className="space-y-6">
            <div className="flex space-x-6">
              <button className="bg-amber-500 text-black px-8 py-5 text-xl font-semibold hover:bg-amber-400 transition-colors w-full uppercase tracking-wider">
                Check In
              </button>
              <button className="bg-transparent border border-white text-white px-8 py-5 text-xl font-semibold hover:bg-white/10 transition-colors w-full uppercase tracking-wider">
                View Map
              </button>
            </div>
            <p className="text-white/40 text-sm uppercase tracking-widest">Touch screen to interact</p>
          </div>
        </div>

        {/* Right Content (Floating Cards / Upgrade) */}
        <div className="col-span-7 p-12 flex flex-col justify-end items-end pb-16 pr-16">
          
          {/* Upgrade Card */}
          {fields.signatureExperience && (
            <div className="bg-white/10 backdrop-blur-md border-l-4 border-amber-500 p-8 max-w-md shadow-2xl transform transition-transform hover:scale-105 duration-500">
              <p className="text-amber-400 font-bold uppercase tracking-wider text-xs mb-2">Enhance Your Stay</p>
              <h3 className="text-white text-2xl font-serif mb-3">Signature Experience</h3>
              <p 
                className="text-gray-200 mb-6"
                data-contentful-entry-id={updatedData.sys.id}
                data-contentful-field-id="signatureExperience"
              >
                {fields.signatureExperience}
              </p>
              <button className="text-white border-b border-amber-500 pb-1 hover:text-amber-400 transition-colors">
                Tap to add to your stay
              </button>
            </div>
          )}

          {/* Weather/Location Widget (Simulated) */}
          <div className="mt-8 flex items-center space-x-4 text-white/80 bg-black/40 px-6 py-3 rounded-full backdrop-blur-sm">
            <span className="text-3xl">72°F</span>
            <div className="h-8 w-px bg-white/20"></div>
            <span 
              className="text-lg"
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="location"
            >
              {fields.location}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

