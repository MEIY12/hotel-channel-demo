'use client';

import { HotelPropertyEntry, HotelPropertyFields } from '@/types/contentful';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import Image from 'next/image';
import Link from 'next/link';

interface EmailViewProps {
  hotelData: HotelPropertyEntry;
}

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.jabil.com/', icon: 'f' },
  { label: 'Instagram', href: 'https://www.jabil.com/', icon: '◎' },
  { label: 'Twitter', href: 'https://www.jabil.com/', icon: '𝕏' },
  { label: 'LinkedIn', href: 'https://www.jabil.com/', icon: 'in' },
  { label: 'WhatsApp', href: 'https://www.jabil.com/', icon: '✆' },
];

export default function EmailView({ hotelData }: EmailViewProps) {
  const updatedData = useContentfulLiveUpdates(hotelData) as HotelPropertyEntry;
  const fields = updatedData.fields as HotelPropertyFields;

  const heroImageUrl = fields.heroImage?.fields?.file?.url
    ? `https:${fields.heroImage.fields.file.url}?w=600&h=360&fit=fill`
    : null;

  const year = new Date().getFullYear();

  return (
    <div className="font-inter bg-[#e8eaed] min-h-screen pt-14 pb-16 px-4">
      <div className="max-w-[560px] mx-auto bg-white shadow-sm">
        {/* Logo */}
        <div className="pt-10 pb-6 flex justify-center">
          <div
            className="w-[88px] h-[88px] border border-gray-200 bg-white flex flex-col items-center justify-center text-center px-2"
            data-contentful-entry-id={updatedData.sys.id}
            data-contentful-field-id="propertyName"
          >
            <span className="text-[10px] font-bold tracking-widest text-jabil-navy uppercase leading-tight">
              {fields.propertyName}
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="px-8 sm:px-12 text-center">
          <h1
            className="font-playfair text-[22px] sm:text-[26px] font-bold text-gray-900 leading-snug mb-5"
            data-contentful-entry-id={updatedData.sys.id}
            data-contentful-field-id="heroHeadline"
          >
            {fields.heroHeadline}
          </h1>

          <p
            className="font-playfair text-[15px] text-gray-700 leading-relaxed mb-8"
            data-contentful-entry-id={updatedData.sys.id}
            data-contentful-field-id="roomDescription"
          >
            {fields.roomDescription}
          </p>
        </div>

        {/* Hero image */}
        <div className="px-8 sm:px-12 mb-8">
          {heroImageUrl ? (
            <div className="relative w-full aspect-[5/3] bg-gray-100 overflow-hidden">
              <Image
                src={heroImageUrl}
                alt={fields.propertyName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full aspect-[5/3] bg-[#eceff1] flex flex-col items-center justify-center text-gray-500">
              <div className="w-14 h-14 rounded-full bg-gray-300/80 flex items-center justify-center text-2xl mb-3">
                🖼
              </div>
              <p className="text-sm">Add image to the campaign</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="px-8 sm:px-12 pb-10 flex justify-center">
          <Link
            href="https://www.jabil.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#1e2a3b] hover:bg-jabil-navy text-white text-sm font-medium px-10 py-3.5 min-w-[200px] text-center transition-colors"
            data-contentful-entry-id={updatedData.sys.id}
            data-contentful-field-id="roomType"
          >
            {fields.roomType || 'Learn more'}
          </Link>
        </div>

        {/* Social */}
        <div className="flex justify-center gap-3 pb-10">
          {SOCIAL_LINKS.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-9 h-9 rounded-full bg-[#b0b8c4] text-white text-xs font-semibold flex items-center justify-center hover:bg-jabil-blue transition-colors"
            >
              {social.icon}
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="px-8 sm:px-12 pb-10 text-center border-t border-gray-100 pt-8">
          <p className="font-playfair italic text-sm text-gray-600 mb-4">
            Copyright © {year}{' '}
            <span data-contentful-entry-id={updatedData.sys.id} data-contentful-field-id="propertyName">
              {fields.propertyName}
            </span>
            , All rights reserved.
          </p>
          <p className="text-xs text-gray-500 leading-relaxed max-w-md mx-auto">
            Want to change how you receive these emails? You can{' '}
            <button type="button" className="underline text-gray-700 hover:text-jabil-blue">
              unsubscribe from this list
            </button>
            .
          </p>
          {fields.location && (
            <p
              className="text-xs text-gray-400 mt-4"
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="location"
            >
              {fields.location}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
