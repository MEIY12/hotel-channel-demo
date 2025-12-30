'use client';

import { ChannelType, ChannelConfig } from '@/types/contentful';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const channels: ChannelConfig[] = [
  {
    id: 'luxury',
    name: 'Luxury Brand',
    description: 'Marriott Bonvoy Style',
    icon: '✨',
  },
  {
    id: 'ota',
    name: 'OTA Partner',
    description: 'Booking.com Style',
    icon: '🌐',
  },
  {
    id: 'mobile',
    name: 'Mobile App',
    description: 'Native Experience',
    icon: '📱',
  },
  {
    id: 'email',
    name: 'Email Campaign',
    description: 'Marketing Email',
    icon: '📧',
  },
  {
    id: 'kiosk',
    name: 'Digital Kiosk',
    description: 'In-Lobby Display',
    icon: '🖥️',
  },
];

interface ChannelSwitcherProps {
  currentChannel: ChannelType;
  entryId: string;
}

export default function ChannelSwitcher({ currentChannel, entryId }: ChannelSwitcherProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleChannelChange = (channelId: ChannelType) => {
    router.push(`?channel=${channelId}`);
    setIsOpen(false);
  };

  const currentChannelConfig = channels.find(ch => ch.id === currentChannel);

  // Keyboard navigation: Press 1-5 to switch channels
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if user is typing in an input field
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      const key = event.key;
      const keyNumber = parseInt(key, 10);

      // Map number keys 1-5 to channel indices 0-4
      if (keyNumber >= 1 && keyNumber <= channels.length) {
        const channelIndex = keyNumber - 1;
        const targetChannel = channels[channelIndex];
        if (targetChannel) {
          handleChannelChange(targetChannel.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      {/* Compact Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
            aria-label="Toggle channel menu"
          >
            <div className="flex flex-col space-y-1">
              <span className="block w-6 h-0.5 bg-gray-700"></span>
              <span className="block w-6 h-0.5 bg-gray-700"></span>
              <span className="block w-6 h-0.5 bg-gray-700"></span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl">{currentChannelConfig?.icon}</span>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                {currentChannelConfig?.name}
              </span>
            </div>
          </button>

          {/* Entry ID Badge */}
          <div className="text-xs text-gray-500 hidden md:block">
            Entry: <code className="bg-gray-100 px-2 py-1 rounded font-mono">{entryId}</code>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`
          fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Channel Selector
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Single Source of Truth
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          {/* Entry ID */}
          <div className="mb-6 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Entry ID:</p>
            <code className="text-xs font-mono text-blue-700 break-all">{entryId}</code>
          </div>

          {/* Channel List */}
          <div className="space-y-2">
            {channels.map((channel, index) => (
              <button
                key={channel.id}
                onClick={() => handleChannelChange(channel.id)}
                className={`
                  w-full p-4 rounded-lg border-2 transition-all text-left
                  ${
                    currentChannel === channel.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="text-xs font-mono font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                      {index + 1}
                    </div>
                    <div className="text-2xl">{channel.icon}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">
                      {channel.name}
                    </div>
                    <div className="text-xs text-gray-500">{channel.description}</div>
                  </div>
                  {currentChannel === channel.id && (
                    <div className="text-blue-500 text-xl">✓</div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 leading-relaxed">
              This demo showcases how one Contentful entry powers multiple channel presentations without content duplication.
            </p>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 font-semibold mb-1">💡 Keyboard Shortcuts</p>
              <p className="text-xs text-gray-500">Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded font-mono">1</kbd>-<kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded font-mono">5</kbd> to switch channels</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

