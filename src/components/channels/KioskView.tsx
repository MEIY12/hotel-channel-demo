'use client';

import { HotelPropertyEntry, HotelPropertyFields } from '@/types/contentful';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface KioskViewProps {
  hotelData: HotelPropertyEntry;
}

const SNAPSHOT_STATS = [
  { label: 'Global sites', value: '120+', change: '+2.1%' },
  { label: 'Team members', value: '140K+', change: '+0.8%' },
  { label: 'Active customers', value: '400+', change: '+1.4%' },
];

function useLiveClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const date = now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return { time, date };
}

export default function KioskView({ hotelData }: KioskViewProps) {
  const updatedData = useContentfulLiveUpdates(hotelData) as HotelPropertyEntry;
  const fields = updatedData.fields as HotelPropertyFields;
  const { time, date } = useLiveClock();

  const heroImageUrl = fields.heroImage?.fields?.file?.url
    ? `https:${fields.heroImage.fields.file.url}?w=1200&h=700&fit=fill`
    : null;

  const seminars = fields.keyAmenities?.slice(0, 2) || ['Town hall', 'Safety briefing'];
  const locationLines = fields.location?.split(',').map((s) => s.trim()).filter(Boolean) || [
    'St. Petersburg, FL — Global headquarters',
    'Penang, Malaysia — Advanced manufacturing',
    'Guadalajara, Mexico — Operations hub',
  ];

  return (
    <div className="font-inter min-h-[calc(100vh-3.5rem)] bg-[#e8ecf1] text-jabil-navy overflow-hidden">
      <div className="h-full min-h-[calc(100vh-3.5rem)] grid grid-cols-1 lg:grid-cols-[minmax(220px,26%)_1fr]">
        {/* Brand column */}
        <aside className="bg-[#0c1f3f] text-white p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="mb-10">
              <span
                className="text-2xl font-bold tracking-tight"
                data-contentful-entry-id={updatedData.sys.id}
                data-contentful-field-id="propertyName"
              >
                {fields.propertyName}
              </span>
            </div>
            <h1
              className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6"
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="heroHeadline"
            >
              {fields.heroHeadline}
            </h1>
          </div>
          <p
            className="text-sm lg:text-base text-gray-300 leading-relaxed max-w-xs"
            data-contentful-entry-id={updatedData.sys.id}
            data-contentful-field-id="roomDescription"
          >
            {fields.roomDescription}
          </p>
        </aside>

        {/* Main signage grid */}
        <div className="grid grid-rows-[auto_1fr_auto] min-h-[calc(100vh-3.5rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[200px] lg:min-h-[240px]">
            {/* Operations snapshot */}
            <div className="bg-white p-6 lg:p-8 border-b border-r border-gray-200">
              <h2 className="text-sm font-bold tracking-[0.2em] text-sky-600 uppercase mb-4">
                Operations snapshot
              </h2>
              <ul className="space-y-3">
                {SNAPSHOT_STATS.map((stat) => (
                  <li key={stat.label} className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-semibold text-jabil-navy">{stat.label}</span>
                    <span className="flex items-center gap-2 tabular-nums">
                      <span className="font-bold">{stat.value}</span>
                      <span className="text-emerald-600 text-xs font-semibold">▲ {stat.change}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 mt-4">As of {time} local</p>
            </div>

            {/* Hero visual */}
            <div className="relative bg-gray-300 min-h-[200px] lg:min-h-[240px]">
              {heroImageUrl ? (
                <Image src={heroImageUrl} alt="" fill className="object-cover" priority />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-sky-200 to-jabil-blue/40" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 flex-1 min-h-0">
            {/* Quote */}
            <div className="bg-[#0c1f3f] text-white p-8 lg:p-10 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-200">
              <h2 className="text-sm font-bold tracking-[0.2em] text-sky-400 uppercase mb-4">
                Message of the day
              </h2>
              <blockquote
                className="text-xl lg:text-2xl font-medium leading-snug mb-4"
                data-contentful-entry-id={updatedData.sys.id}
                data-contentful-field-id="signatureExperience"
              >
                “{fields.signatureExperience}”
              </blockquote>
              <p className="text-sky-300 text-sm">— {fields.propertyName} leadership</p>
            </div>

            {/* Highlights */}
            <div className="bg-[#eef1f5] p-8 lg:p-10 flex flex-col justify-center">
              <h2 className="text-sm font-bold tracking-[0.2em] text-sky-600 uppercase mb-6">
                Upcoming highlights
              </h2>
              <div className="flex gap-5 items-start">
                <div className="w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center text-white text-2xl shrink-0">
                  📅
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <p
                      className="font-bold text-jabil-navy"
                      data-contentful-entry-id={updatedData.sys.id}
                      data-contentful-field-id="roomType"
                    >
                      {fields.roomType}
                    </p>
                    <p className="text-sm text-gray-500">Featured this week</p>
                  </div>
                  {seminars.map((title, i) => (
                    <div key={title}>
                      <p className="font-bold text-jabil-navy text-sm">{title}</p>
                      <p className="text-xs text-gray-500">
                        {i === 0 ? 'Today · Main auditorium' : 'Thursday · Virtual'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer ticker */}
          <footer className="bg-[#f4f6f8] border-t border-gray-200 px-6 lg:px-8 py-4 grid grid-cols-1 lg:grid-cols-[1fr_2fr_auto] gap-4 items-center text-xs lg:text-sm">
            <div>
              <p className="font-bold text-sky-600 tracking-wider uppercase mb-1">Follow us</p>
              <p className="text-gray-600">@{fields.propertyName?.replace(/\s+/g, '').toLowerCase() || 'jabil'}</p>
              <div className="flex gap-2 mt-2 text-sky-600">
                <span>f</span>
                <span>in</span>
                <span>◎</span>
              </div>
            </div>
            <div>
              <p className="font-bold text-sky-600 tracking-wider uppercase mb-2">Our locations</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 text-gray-600">
                {locationLines.slice(0, 3).map((line, i) => (
                  <p
                    key={i}
                    data-contentful-entry-id={updatedData.sys.id}
                    data-contentful-field-id={i === 0 ? 'location' : undefined}
                  >
                    {line}
                  </p>
                ))}
              </div>
              <p
                className="text-gray-500 mt-2 hidden md:block line-clamp-1"
                data-contentful-entry-id={updatedData.sys.id}
                data-contentful-field-id="neighborhoodVibe"
              >
                {fields.neighborhoodVibe}
              </p>
            </div>
            <div className="text-right lg:pl-6">
              <p className="text-3xl lg:text-4xl font-light text-jabil-navy tabular-nums">{time}</p>
              <p className="text-gray-500">{date}</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
