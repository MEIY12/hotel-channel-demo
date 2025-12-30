'use client';

import { HotelPropertyEntry } from '@/types/contentful';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import Image from 'next/image';

interface LuxuryViewProps {
  hotelData: HotelPropertyEntry;
}

export default function LuxuryView({ hotelData }: LuxuryViewProps) {
  const updatedData = useContentfulLiveUpdates(hotelData);
  const fields = updatedData.fields;

  const heroImageUrl = fields.heroImage?.fields?.file?.url
    ? `https:${fields.heroImage.fields.file.url}?w=1920&h=1080&fit=fill`
    : '/placeholder.jpg';

  return (
    <div className="font-playfair pt-14 pb-20 bg-gradient-to-br from-[#F5F1E8] via-[#FAF8F3] to-[#F0EBE0] min-h-screen">
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
      
      {/* Hero Section */}
      <div className="relative h-[75vh] mb-20">
        <Image
          src={heroImageUrl}
          alt={fields.propertyName}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B3A]/90 via-[#1B2B3A]/50 to-transparent" />
        
        {/* Decorative Frame */}
        <div className="absolute inset-4 border-2 border-luxury-gold/30 pointer-events-none"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-12 pb-20 text-white w-full">
            <div className="border-l-4 border-luxury-gold pl-8">
              <h1 
                className="text-7xl font-bold mb-6 leading-tight tracking-wide"
                data-contentful-entry-id={updatedData.sys.id}
                data-contentful-field-id="propertyName"
              >
                {fields.propertyName}
              </h1>
              <p 
                className="text-3xl font-light italic text-luxury-gold tracking-wide"
                data-contentful-entry-id={updatedData.sys.id}
                data-contentful-field-id="heroHeadline"
              >
                {fields.heroHeadline}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-12">
        {/* Room Type with Ornamental Design */}
        <div className="text-center mb-20 relative pt-20">
          <div className="inline-block relative">
            {/* Decorative Elements */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
              <svg className="w-16 h-16 text-luxury-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3l1.5 4.5h4.5l-3.5 2.5 1.5 4.5-3.5-2.5-3.5 2.5 1.5-4.5-3.5-2.5h4.5z"/>
              </svg>
            </div>
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4 font-light">
              Signature Accommodation
            </p>
            <h2 
              className="text-5xl font-bold text-luxury-navy mb-8 tracking-wide"
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="roomType"
            >
              {fields.roomType}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px bg-luxury-gold w-20"></div>
              <div className="w-2 h-2 bg-luxury-gold rotate-45"></div>
              <div className="h-px bg-luxury-gold w-20"></div>
            </div>
          </div>
        </div>

        {/* Description with Elegant Styling */}
        <div className="mb-20 text-center">
          <p 
            className="text-2xl leading-loose text-gray-800 max-w-3xl mx-auto font-light italic"
            data-contentful-entry-id={updatedData.sys.id}
            data-contentful-field-id="roomDescription"
          >
            {fields.roomDescription}
          </p>
        </div>

        {/* Signature Experience with Luxurious Card */}
        <div className="bg-gradient-to-br from-white via-[#FEFDFB] to-[#FAF8F3] p-16 rounded-none border-4 border-luxury-gold/20 mb-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
          
          <h3 className="text-4xl font-bold text-luxury-navy mb-8 text-center tracking-wide">
            The Experience
          </h3>
          <p 
            className="text-xl leading-loose text-gray-700 text-center font-light"
            data-contentful-entry-id={updatedData.sys.id}
            data-contentful-field-id="signatureExperience"
          >
            {fields.signatureExperience}
          </p>
        </div>

        {/* Amenities with Diamond Bullets */}
        <div className="mb-20">
          <h3 className="text-4xl font-bold text-luxury-navy mb-12 text-center tracking-wide">
            Elevated Offerings
          </h3>
          <div className="grid md:grid-cols-2 gap-10 max-w-3xl mx-auto">
            {fields.keyAmenities?.map((amenity, index) => (
              <div key={index} className="flex items-start space-x-5 group">
                <div className="w-4 h-4 bg-luxury-gold rotate-45 mt-2 flex-shrink-0 group-hover:scale-110 transition-transform"></div>
                <p className="text-xl text-gray-800 font-light">{amenity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location with Rich Navy Background */}
        <div className="bg-gradient-to-br from-[#1B2B3A] to-[#2C3E50] text-white p-16 rounded-none border-4 border-luxury-gold/30 mb-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-luxury-gold/5 rounded-full -ml-32 -mb-32"></div>
          
          <div className="relative z-10">
            <h3 className="text-4xl font-bold mb-8 text-center tracking-wide">
              Your Denver Destination
            </h3>
            <div className="w-16 h-px bg-luxury-gold mx-auto mb-8"></div>
            <p 
              className="text-xl leading-relaxed mb-8 text-center text-gray-200 font-light"
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="location"
            >
              {fields.location}
            </p>
            <p 
              className="text-xl leading-relaxed text-center text-gray-300 font-light"
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="neighborhoodVibe"
            >
              {fields.neighborhoodVibe}
            </p>
          </div>
        </div>

        {/* CTA with Elegant Design */}
        <div className="text-center pb-12">
          <button className="bg-luxury-gold text-luxury-navy px-16 py-6 rounded-none text-2xl font-semibold hover:bg-luxury-navy hover:text-luxury-gold transition-all duration-300 shadow-2xl border-2 border-luxury-gold tracking-wider">
            Reserve Your Experience
          </button>
          <p className="text-gray-600 mt-6 text-sm tracking-widest uppercase font-light">
            Refined hospitality awaits
          </p>
        </div>
      </div>
    </div>
  );
}

