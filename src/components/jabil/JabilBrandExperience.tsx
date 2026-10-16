'use client';

import { HotelPropertyEntry, HotelPropertyFields } from '@/types/contentful';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import Image from 'next/image';
import Link from 'next/link';

export const GLOBAL_STATS = [
  { value: '30+', label: 'Countries' },
  { value: '120+', label: 'Sites worldwide' },
  { value: '140K+', label: 'Employees' },
  { value: '400+', label: 'Customers' },
];

const NAV_LINKS = ['Solutions', 'Industries', 'About', 'Careers', 'Contact'];

export type JabilLayout = 'page' | 'mobile' | 'email' | 'kiosk';

interface JabilBrandExperienceProps {
  hotelData: HotelPropertyEntry;
  layout?: JabilLayout;
}

export default function JabilBrandExperience({
  hotelData,
  layout = 'page',
}: JabilBrandExperienceProps) {
  const updatedData = useContentfulLiveUpdates(hotelData) as HotelPropertyEntry;
  const fields = updatedData?.fields as HotelPropertyFields | undefined;

  if (!fields) {
    return null;
  }

  const isMobile = layout === 'mobile';
  const isEmail = layout === 'email';
  const isKiosk = layout === 'kiosk';

  const stickyTop = isMobile || isEmail ? 'top-0' : 'top-14';

  const heroImageUrl = fields.heroImage?.fields?.file?.url
    ? `https:${fields.heroImage.fields.file.url}?w=1920&h=900&fit=fill`
    : '/placeholder.jpg';

  const capabilityImages =
    fields.roomImages
      ?.map((asset) => {
        const url = asset?.fields?.file?.url;
        return url ? `https:${url}?w=800&h=600&fit=fill` : null;
      })
      .filter(Boolean) as string[] | undefined;

  const sectionY = isMobile || isEmail ? 'py-10' : isKiosk ? 'py-16' : 'py-20 lg:py-28';
  const containerPx = isMobile ? 'px-0' : isEmail ? 'px-4' : 'px-6 lg:px-10';

  return (
    <div className="font-inter bg-white min-h-full text-jabil-navy">
      <header
        className={`${
          isMobile ? 'relative' : `sticky ${stickyTop}`
        } z-40 bg-white border-b border-jabil-border shadow-sm`}
      >
        <div
          className={`max-w-7xl mx-auto ${containerPx} ${
            isMobile ? 'min-h-11 py-1' : 'h-16'
          } flex items-center justify-between gap-3`}
        >
          <div
            className={`font-bold tracking-tight text-jabil-blue min-w-0 flex-1 truncate ${
              isMobile ? 'text-base' : 'text-2xl'
            }`}
            data-contentful-entry-id={updatedData.sys.id}
            data-contentful-field-id="propertyName"
          >
            {fields.propertyName}
          </div>
          {!isMobile && !isEmail && (
            <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
              {NAV_LINKS.map((label) => (
                <span
                  key={label}
                  className="text-sm font-medium text-gray-600 hover:text-jabil-blue cursor-default transition-colors"
                >
                  {label}
                </span>
              ))}
            </nav>
          )}
          <Link
            href="https://www.jabil.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex shrink-0 font-semibold text-white bg-jabil-blue hover:bg-jabil-blue-dark rounded transition-colors ${
              isMobile ? 'text-xs px-2.5 py-1.5' : 'text-sm px-5 py-2.5'
            }`}
          >
            {isMobile ? 'Explore' : 'Explore Jabil'}
          </Link>
        </div>
      </header>

      <section
        className={`relative ${
          isMobile ? 'h-[280px]' : isEmail ? 'h-[220px]' : isKiosk ? 'h-[min(70vh,640px)]' : 'h-[min(85vh,720px)]'
        }`}
      >
        <Image
          src={heroImageUrl}
          alt={fields.propertyName}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-jabil-navy/95 via-jabil-navy/70 to-jabil-blue/40" />
        <div
          className={`absolute inset-0 flex ${
            isMobile ? 'items-end' : 'items-center'
          }`}
        >
          <div
            className={`max-w-7xl mx-auto w-full ${
              isMobile ? 'px-5 pb-6 pt-4' : containerPx
            }`}
          >
            <p
              className={`text-jabil-sky font-semibold tracking-[0.15em] uppercase mb-2 ${
                isMobile ? 'text-[10px] leading-relaxed' : 'text-sm'
              }`}
            >
              Engineering · Supply chain · Manufacturing
            </p>
            <h1
              className={`font-bold text-white mb-3 ${
                isMobile
                  ? 'text-lg leading-snug pr-1'
                  : isEmail
                    ? 'text-2xl'
                    : isKiosk
                      ? 'text-4xl lg:text-5xl max-w-4xl'
                      : 'text-4xl sm:text-5xl lg:text-6xl max-w-4xl'
              }`}
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="heroHeadline"
            >
              {fields.heroHeadline}
            </h1>
            {!isMobile && !isEmail && (
              <p className="text-lg sm:text-xl text-gray-200 max-w-2xl font-light leading-relaxed">
                Solutions that help the world&apos;s leading brands design, build, and scale
                products across global markets.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className={`${sectionY} bg-jabil-light`}>
        <div className={`max-w-7xl mx-auto ${containerPx} grid ${isMobile || isEmail ? 'gap-6' : 'lg:grid-cols-12 gap-12'} items-start`}>
          <div className={isMobile || isEmail ? '' : 'lg:col-span-4'}>
            <h2
              className={`font-bold text-jabil-blue tracking-tight ${
                isMobile ? 'text-3xl' : isEmail ? 'text-4xl' : 'text-5xl lg:text-6xl'
              }`}
            >
              Hello
            </h2>
            <p className={`mt-2 text-gray-600 font-medium ${isMobile ? 'text-sm' : 'text-xl'}`}>
              Welcome to{' '}
              <span
                data-contentful-entry-id={updatedData.sys.id}
                data-contentful-field-id="propertyName"
              >
                {fields.propertyName}
              </span>
            </p>
          </div>
          <div className={isMobile || isEmail ? '' : 'lg:col-span-8'}>
            <p
              className={`text-gray-700 leading-relaxed ${
                isMobile || isEmail ? 'text-sm' : 'text-lg sm:text-xl'
              }`}
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="roomDescription"
            >
              {fields.roomDescription}
            </p>
          </div>
        </div>
      </section>

      <section className={`${isMobile || isEmail ? 'py-8' : 'py-16'} bg-jabil-navy text-white`}>
        <div className={`max-w-7xl mx-auto ${containerPx}`}>
          <p className="text-center text-jabil-sky text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Global
          </p>
          <h2
            className={`text-center font-bold mb-8 ${
              isMobile ? 'text-lg' : 'text-2xl sm:text-3xl'
            }`}
          >
            Built for scale, engineered for impact
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {GLOBAL_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className={`font-bold text-jabil-sky ${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-gray-300 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionY}>
        <div className={`max-w-7xl mx-auto ${containerPx}`}>
          <div className={`text-center max-w-3xl mx-auto ${isMobile ? 'mb-8' : 'mb-16'}`}>
            <p className="text-jabil-blue text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              What we do
            </p>
            <h2 className={`font-bold text-jabil-navy mb-4 ${isMobile ? 'text-xl' : 'text-3xl sm:text-4xl'}`}>
              Tailored solutions across the product lifecycle
            </h2>
            <p
              className={`text-gray-600 leading-relaxed ${isMobile ? 'text-sm' : 'text-lg'}`}
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="signatureExperience"
            >
              {fields.signatureExperience}
            </p>
          </div>
          <div className={`grid gap-4 ${isMobile || isEmail ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-4 gap-6'}`}>
            {fields.keyAmenities?.map((amenity, index) => (
              <div
                key={index}
                className="group p-6 bg-white border border-jabil-border rounded-lg hover:border-jabil-blue hover:shadow-lg transition-all"
              >
                <div className="w-10 h-1 bg-jabil-blue mb-4 group-hover:w-14 transition-all" />
                <h3 className={`font-bold text-jabil-navy leading-snug ${isMobile ? 'text-base' : 'text-lg'}`}>
                  {amenity}
                </h3>
                <p className="mt-2 text-sm text-gray-500">Explore capabilities →</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${isMobile ? 'py-10' : 'py-20'} bg-jabil-light border-y border-jabil-border`}>
        <div className={`max-w-7xl mx-auto ${containerPx} ${!isMobile && !isEmail ? 'grid lg:grid-cols-2 gap-12 items-center' : 'space-y-6'}`}>
          <div>
            <p className="text-jabil-blue text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Cutting edge
            </p>
            <h2
              className={`font-bold text-jabil-navy mb-4 ${isMobile ? 'text-xl' : 'text-3xl sm:text-4xl'}`}
              data-contentful-entry-id={updatedData.sys.id}
              data-contentful-field-id="roomType"
            >
              {fields.roomType}
            </h2>
            <p className={`text-gray-600 leading-relaxed mb-4 ${isMobile ? 'text-sm' : ''}`}>
              Supporting leading brands with decades of cross-industry experience—from data
              center infrastructure and healthcare to automotive and advanced manufacturing.
            </p>
            <Link
              href="https://www.jabil.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-jabil-blue font-semibold hover:text-jabil-blue-dark text-sm"
            >
              Explore industries
              <span className="ml-2" aria-hidden>→</span>
            </Link>
          </div>
          {capabilityImages && capabilityImages.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {capabilityImages.slice(0, 4).map((src, index) => (
                <div
                  key={src}
                  className={`relative overflow-hidden rounded-lg bg-gray-200 ${
                    index === 0 ? 'col-span-2 h-40' : 'h-28'
                  }`}
                >
                  <Image src={src} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={sectionY}>
        <div className={`max-w-7xl mx-auto ${containerPx}`}>
          <div
            className={`bg-jabil-navy text-white rounded-2xl relative overflow-hidden ${
              isMobile ? 'p-6' : 'p-10 lg:p-16'
            }`}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-jabil-blue/20 rounded-full -mr-32 -mt-32" />
            <div className="relative z-10 max-w-3xl">
              <p className="text-jabil-sky text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                People-centered
              </p>
              <h2 className={`font-bold mb-4 ${isMobile ? 'text-xl' : 'text-3xl'}`}>
                A global team, locally invested
              </h2>
              <p
                className={`text-gray-200 mb-3 ${isMobile ? 'text-sm' : 'text-lg'}`}
                data-contentful-entry-id={updatedData.sys.id}
                data-contentful-field-id="location"
              >
                {fields.location}
              </p>
              <p
                className={`text-gray-300 leading-relaxed ${isMobile ? 'text-sm' : ''}`}
                data-contentful-entry-id={updatedData.sys.id}
                data-contentful-field-id="neighborhoodVibe"
              >
                {fields.neighborhoodVibe}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${isMobile ? 'py-8' : 'py-16'} border-t border-jabil-border bg-white`}>
        <div className={`max-w-7xl mx-auto ${containerPx} text-center`}>
          <h2 className={`font-bold text-jabil-navy mb-4 ${isMobile ? 'text-lg' : 'text-2xl sm:text-3xl'}`}>
            Ready to explore a world of possibilities?
          </h2>
          <Link
            href="https://www.jabil.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex bg-jabil-blue text-white font-semibold rounded hover:bg-jabil-blue-dark transition-colors ${
              isKiosk ? 'px-12 py-5 text-xl' : isMobile ? 'px-6 py-3 text-sm' : 'px-10 py-4 text-lg'
            }`}
          >
            Visit jabil.com
          </Link>
        </div>
      </section>

      <footer className={`bg-jabil-navy text-gray-400 text-center ${isMobile ? 'py-4 text-xs' : 'py-8 text-sm'}`}>
        <p>
          Content powered by Contentful ·{' '}
          <Link
            href="https://www.jabil.com/"
            className="text-jabil-sky hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jabil
          </Link>
        </p>
      </footer>
    </div>
  );
}
