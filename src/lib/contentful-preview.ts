'use client';

import { ContentfulLivePreview } from '@contentful/live-preview';

let initialized = false;

export function initContentfulPreview() {
  if (initialized || typeof window === 'undefined') {
    return;
  }
  ContentfulLivePreview.init({
    locale: 'en-US',
    enableInspectorMode: true,
    enableLiveUpdates: true,
  });
  initialized = true;
}
