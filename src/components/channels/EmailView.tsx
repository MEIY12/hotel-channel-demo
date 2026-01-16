'use client';

import { HotelPropertyEntry, HotelPropertyFields } from '@/types/contentful';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import Image from 'next/image';

interface EmailViewProps {
  hotelData: HotelPropertyEntry;
}

export default function EmailView({ hotelData }: EmailViewProps) {
  const updatedData = useContentfulLiveUpdates(hotelData) as HotelPropertyEntry;
  const fields = updatedData.fields as HotelPropertyFields;

  const heroImageUrl = fields.heroImage?.fields?.file?.url
    ? `https:${fields.heroImage.fields.file.url}?w=600&h=300&fit=fill`
    : '/placeholder.jpg';

  return (
    <div className="font-sans bg-[#f2f5f7] py-10 min-h-screen flex justify-center">
      {/* Email Container */}
      <div className="w-full max-w-[600px] bg-white shadow-sm mx-auto">
        
        {/* Preheader (hidden text usually, but we'll show a top bar) */}
        <div className="bg-[#1e293b] text-white text-xs py-2 px-6 text-center">
          Your reservation at {fields.propertyName} is confirmed. Reference #839201
        </div>

        {/* Logo Header */}
        <div className="border-b border-gray-100 p-6 text-center">
          <div 
            className="inline-block text-xl font-serif font-bold tracking-wider text-gray-900 border-2 border-gray-900 px-3 py-1 uppercase"
            data-contentful-entry-id={updatedData.sys.id}
            data-contentful-field-id="propertyName"
          >
            {fields.propertyName}
          </div>
          <div 
            className="mt-4 text-gray-600 font-medium italic"
            data-contentful-entry-id={updatedData.sys.id}
            data-contentful-field-id="heroHeadline"
          >
            {fields.heroHeadline}
          </div>
        </div>

        {/* Email Content */}
        <div className="p-8">
          <h1 className="text-2xl text-gray-800 font-bold mb-4">Reservation Confirmed</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Dear Guest,<br/><br/>
            We are delighted to confirm your reservation at <span data-contentful-entry-id={updatedData.sys.id} data-contentful-field-id="propertyName" className="font-semibold text-gray-800">{fields.propertyName}</span>. 
            We look forward to welcoming you for your upcoming stay.
          </p>

          {/* Hero Image */}
          <div className="mb-8 rounded overflow-hidden">
            <Image
              src={heroImageUrl}
              alt={fields.propertyName}
              width={600}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Reservation Details Box */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4 border-b border-gray-200 pb-2">Your Trip Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Check-in</p>
                <p className="text-gray-900 font-semibold">Fri, Oct 24, 2025</p>
                <p className="text-xs text-gray-500">After 3:00 PM</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Check-out</p>
                <p className="text-gray-900 font-semibold">Sun, Oct 26, 2025</p>
                <p className="text-xs text-gray-500">Before 11:00 AM</p>
              </div>
              <div className="col-span-2 border-t border-gray-200 pt-4 mt-2">
                <p className="text-xs text-gray-500 mb-1">Room Type</p>
                <p 
                  className="text-gray-900 font-semibold"
                  data-contentful-entry-id={updatedData.sys.id}
                  data-contentful-field-id="roomType"
                >
                  {fields.roomType}
                </p>
                <p 
                  className="text-sm text-gray-600 mt-1"
                  data-contentful-entry-id={updatedData.sys.id}
                  data-contentful-field-id="roomDescription"
                >
                  {fields.roomDescription?.slice(0, 100)}...
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-500 mb-1">Location</p>
                <p 
                  className="text-gray-900 text-sm"
                  data-contentful-entry-id={updatedData.sys.id}
                  data-contentful-field-id="location"
                >
                  {fields.location}
                </p>
              </div>
            </div>
          </div>

          {/* Signature Experience / Note */}
          {fields.signatureExperience && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Enhance Your Stay</h3>
              <p 
                className="text-gray-600 text-sm leading-relaxed"
                data-contentful-entry-id={updatedData.sys.id}
                data-contentful-field-id="signatureExperience"
              >
                {fields.signatureExperience}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="text-center mb-8">
            <a href="#" className="inline-block bg-[#1e293b] text-white px-8 py-3 rounded text-sm font-semibold hover:bg-gray-800 transition-colors no-underline">
              Manage Reservation
            </a>
          </div>

          {/* Need Help */}
          <div className="border-t border-gray-100 pt-6">
            <p className="text-gray-600 text-sm mb-2 font-semibold">Questions?</p>
            <p className="text-gray-500 text-sm">
              Contact our concierge at <a href="#" className="text-blue-600 underline">concierge@maritimedenver.com</a> or call +1 (303) 555-0192.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f8fafc] p-6 text-center border-t border-gray-200">
          <p className="text-xs text-gray-400 mb-2">
            © 2025 {fields.propertyName}. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            123 Highland St, Denver, CO 80202
          </p>
          <div className="mt-4 space-x-4 text-xs text-gray-400">
            <a href="#" className="underline">Privacy Policy</a>
            <a href="#" className="underline">Unsubscribe</a>
          </div>
        </div>
      </div>
    </div>
  );
}

