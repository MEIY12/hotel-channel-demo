'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

interface PhoneMockupFrameProps {
  children: ReactNode;
}

export default function PhoneMockupFrame({ children }: PhoneMockupFrameProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center py-8 px-4">
      <div className="relative w-full max-w-[600px] mx-auto">
        {/* Container for phone mockup */}
        <div className="relative w-full" style={{ aspectRatio: '500/1024' }}>
          
          {/* Screen Content Area - positioned behind the phone frame */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {/* 
              Fine-tuned positioning to align with the actual phone screen in the mockup image.
              The phone screen is centered in the image but smaller than the full image bounds.
            */}
            <div 
              className="relative overflow-hidden bg-white"
              style={{
                width: '81%',
                height: '87.5%',
                borderRadius: '70px',
                marginTop: '0%',
              }}
            >
              {/* Scrollable content container */}
              <div
                className="w-full h-full overflow-y-auto overflow-x-hidden pt-12 px-5 pb-5"
                style={{ paddingTop: 'max(3rem, env(safe-area-inset-top))' }}
              >
                {children}
              </div>
            </div>
          </div>

          {/* iPhone Mockup Frame - overlaid on top with Dynamic Island */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <Image
              src="/iphone-mockup.png"
              alt="iPhone Mockup"
              fill
              className="object-contain"
              priority
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}

