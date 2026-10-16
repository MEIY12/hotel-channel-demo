'use client';

import { HotelPropertyEntry, HotelPropertyFields } from '@/types/contentful';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import Image from 'next/image';
import { useState } from 'react';

interface OTAViewProps {
  hotelData: HotelPropertyEntry;
}

const NAV_ITEMS = [
  'Home',
  'Company Resources',
  'Employee Resources',
  'Workspaces & Teams',
  'Company & News',
];

const TABS = [
  'Business Resources',
  'Employee Center',
  'Departments & Teams',
  'Company & News',
];

const QUICK_LINK_STYLES = [
  { ring: 'ring-emerald-400', icon: '🎧', label: 'Helpdesk' },
  { ring: 'ring-lime-500', icon: '👥', label: 'Directory' },
  { ring: 'ring-green-600', icon: '⏱', label: 'Expenses' },
  { ring: 'ring-yellow-400', icon: '📊', label: 'Reports' },
  { ring: 'ring-teal-500', icon: '✉️', label: 'Newsletter' },
  { ring: 'ring-rose-400', icon: '❤️', label: 'Benefits' },
  { ring: 'ring-orange-400', icon: '❓', label: 'FAQs' },
  { ring: 'ring-emerald-600', icon: '⭐', label: 'Training' },
];

const CARD_BLURBS = [
  'Onboarding resources, policies, and teams that support your first weeks at Jabil.',
  'Payroll, benefits enrollment, and total rewards information for employees.',
  'Approved applications, IT support, and productivity tools for daily work.',
  'Connect with colleagues across sites, functions, and regions worldwide.',
  'Standard forms, templates, and operational checklists for your role.',
  'Company policies, safety standards, and compliance guidance.',
];

export default function OTAView({ hotelData }: OTAViewProps) {
  const updatedData = useContentfulLiveUpdates(hotelData) as HotelPropertyEntry;
  const fields = updatedData.fields as HotelPropertyFields;
  const [activeTab, setActiveTab] = useState(0);

  const imagePool = [
    fields.heroImage,
    ...(fields.roomImages || []),
  ].filter(Boolean);

  const getImageUrl = (index: number) => {
    const asset = imagePool[index % imagePool.length];
    const path = asset?.fields?.file?.url;
    return path ? `https:${path}?w=480&h=320&fit=fill` : null;
  };

  const amenityCards = fields.keyAmenities?.slice(0, 6) || [];
  const quickLabels =
    fields.keyAmenities?.slice(0, 8) ||
    QUICK_LINK_STYLES.map((item) => item.label);

  return (
    <div className="font-inter bg-white min-h-screen text-jabil-navy">
      {/* Intranet header */}
      <header className="sticky top-14 z-40 bg-white border-b border-jabil-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-14 flex items-center justify-between gap-6">
          <div className="shrink-0">
            <p
              className="text-lg font-bold text-jabil-blue leading-none"
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="propertyName"
            >
              {fields.propertyName}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-gray-500">The Hub</p>
          </div>
          <nav className="hidden lg:flex items-center gap-5 text-sm text-gray-600" aria-label="Intranet">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                type="button"
                className="hover:text-jabil-blue whitespace-nowrap transition-colors"
              >
                {item}
                {item !== 'Home' && <span className="ml-0.5 text-[10px]">▾</span>}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-[#0c1f3f] text-white overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-1/4 opacity-90 pointer-events-none">
          <div className="absolute top-8 left-4 w-24 h-24 rounded-full bg-lime-500/80" />
          <div className="absolute top-28 left-20 w-32 h-32 rounded-full bg-emerald-700/70" />
          <div className="absolute bottom-10 left-8 w-20 h-20 rounded-full bg-teal-400/60" />
        </div>
        <div className="absolute inset-y-0 right-0 w-1/4 opacity-90 pointer-events-none">
          <div className="absolute top-12 right-8 w-28 h-28 rounded-full bg-lime-400/75" />
          <div className="absolute top-32 right-24 w-36 h-36 rounded-full bg-green-800/65" />
          <div className="absolute bottom-8 right-4 w-24 h-24 rounded-full bg-emerald-500/55" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 pt-12 pb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">
            Welcome, Team Member!
          </h1>
          <p
            className="text-jabil-sky text-sm sm:text-base mb-6 max-w-2xl mx-auto"
            data-contentful-entry-id={updatedData.sys.id}
            data-contentful-field-id="heroHeadline"
          >
            {fields.heroHeadline}
          </p>
          <div className="max-w-xl mx-auto">
            <label className="sr-only" htmlFor="hub-search">Search</label>
            <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden">
              <input
                id="hub-search"
                type="search"
                placeholder="Search forms & templates"
                className="flex-1 px-5 py-3 text-gray-700 text-sm outline-none"
              />
              <span className="pr-4 text-gray-400" aria-hidden>🔍</span>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="relative max-w-5xl mx-auto px-4 pb-10 grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
          {QUICK_LINK_STYLES.map((style, index) => (
            <button
              key={style.label}
              type="button"
              className="flex flex-col items-center gap-2 group"
            >
              <span
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center text-lg ring-2 ${style.ring} group-hover:scale-105 transition-transform`}
              >
                {style.icon}
              </span>
              <span className="text-[10px] sm:text-xs text-white/90 text-center leading-tight">
                {quickLabels[index] || style.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <div className="border-b border-jabil-border bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex gap-8 overflow-x-auto">
          {TABS.map((tab, index) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(index)}
              className={`py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === index
                  ? 'border-jabil-blue text-jabil-blue'
                  : 'border-transparent text-gray-500 hover:text-jabil-navy'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab panels */}
      <section className="bg-jabil-light py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {activeTab === 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {amenityCards.map((title, index) => {
                const img = getImageUrl(index);
                return (
                  <article
                    key={`${title}-${index}`}
                    className="bg-white rounded-lg shadow-sm border border-jabil-border overflow-hidden flex flex-col"
                  >
                    <div className="relative h-40 bg-gray-200">
                      {img ? (
                        <Image src={img} alt="" fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-jabil-blue/20 to-emerald-600/20" />
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-jabil-blue mb-2">{title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed flex-1">
                        {index === 0
                          ? fields.roomDescription
                          : index === 2
                            ? fields.signatureExperience
                            : CARD_BLURBS[index] || CARD_BLURBS[0]}
                      </p>
                      <button
                        type="button"
                        className="mt-4 text-sm font-semibold text-jabil-blue hover:text-jabil-blue-dark text-left"
                      >
                        Learn more →
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {activeTab === 1 && (
            <div className="max-w-3xl bg-white rounded-xl border border-jabil-border p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-jabil-navy mb-4">Employee Center</h2>
              <p
                className="text-gray-700 leading-relaxed mb-4"
                data-contentful-entry-id={updatedData.sys.id}
                data-contentful-field-id="roomDescription"
              >
                {fields.roomDescription}
              </p>
              <p
                className="text-gray-600 leading-relaxed"
                data-contentful-entry-id={updatedData.sys.id}
                data-contentful-field-id="neighborhoodVibe"
              >
                {fields.neighborhoodVibe}
              </p>
            </div>
          )}

          {activeTab === 2 && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-jabil-border p-8 shadow-sm">
                <h2 className="text-xl font-bold text-jabil-blue mb-3">Featured team</h2>
                <p
                  className="text-2xl font-semibold text-jabil-navy mb-2"
                  data-contentful-entry-id={updatedData.sys.id}
                  data-contentful-field-id="roomType"
                >
                  {fields.roomType}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{fields.signatureExperience}</p>
              </div>
              <div className="bg-jabil-navy text-white rounded-xl p-8">
                <h2 className="text-xl font-bold text-jabil-sky mb-3">Global footprint</h2>
                <p
                  className="text-gray-200 mb-3"
                  data-contentful-entry-id={updatedData.sys.id}
                  data-contentful-field-id="location"
                >
                  {fields.location}
                </p>
                <p className="text-gray-300 text-sm">{fields.neighborhoodVibe}</p>
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="bg-white rounded-xl border border-jabil-border p-8 shadow-sm max-w-3xl">
              <h2 className="text-2xl font-bold text-jabil-navy mb-4">Company & News</h2>
              <p
                className="text-lg font-medium text-jabil-blue mb-3"
                data-contentful-entry-id={updatedData.sys.id}
                data-contentful-field-id="heroHeadline"
              >
                {fields.heroHeadline}
              </p>
              <p className="text-gray-600 leading-relaxed">{fields.signatureExperience}</p>
            </div>
          )}
        </div>
      </section>

      <footer className="py-6 bg-white border-t border-jabil-border text-center text-xs text-gray-500">
        <p>
          {fields.propertyName} employee intranet · Content powered by Contentful
        </p>
      </footer>
    </div>
  );
}
