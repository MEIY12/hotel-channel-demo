# Architecture Overview

This document explains the technical architecture of the Contentful Channel Demo application.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Contentful CMS                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          Hotel Property Content Type                  │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  Fields:                                        │  │  │
│  │  │  - propertyName (Short text)                   │  │  │
│  │  │  - heroHeadline (Short text)                   │  │  │
│  │  │  - location (Short text)                       │  │  │
│  │  │  - roomType (Short text)                       │  │  │
│  │  │  - roomDescription (Long text)                 │  │  │
│  │  │  - neighborhoodVibe (Long text)                │  │  │
│  │  │  - signatureExperience (Long text)             │  │  │
│  │  │  - keyAmenities (Array)                        │  │  │
│  │  │  - heroImage (Media)                           │  │  │
│  │  │  - roomImages (Media, multiple)                │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                              │                              │
│                              │ API                          │
└──────────────────────────────┼──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      Next.js Application                     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │               Contentful Client Layer                 │  │
│  │  - contentful.ts: API client configuration          │  │
│  │  - Live Preview SDK initialization                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                              │                              │
│                              ▼                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Main Page (page.tsx)                 │  │
│  │  - Fetches hotel data                                │  │
│  │  - Channel routing logic                             │  │
│  │  - Live Preview provider                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                              │                              │
│          ┌───────────────────┼───────────────────┐         │
│          ▼                   ▼                   ▼         │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Channel    │    │   Channel    │    │   Channel    │ │
│  │  Switcher    │    │    View      │    │    View      │ │
│  │              │    │  Components  │    │  Components  │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
                       ┌───────────────┐
                       │  End Users    │
                       │  (6 channels) │
                       └───────────────┘
```

## Core Components

### 1. Content Layer (Contentful)

**Purpose:** Single source of truth for all content

**Key Features:**
- Content modeling with flexible fields
- Media asset management
- Content versioning
- Multi-environment support
- API-first delivery

**APIs Used:**
- Content Delivery API (CDN) - Published content
- Content Preview API - Draft content + Live Preview

### 2. Data Fetching Layer

**File:** `src/lib/contentful.ts`

```typescript
// Responsibilities:
- Initialize Contentful client
- Configure API endpoints (delivery vs preview)
- Fetch hotel property entries
- Initialize Live Preview SDK
```

**Key Functions:**
- `contentfulClient` - Configured Contentful client
- `getHotelProperty()` - Fetches entry by ID or first entry

### 3. Type System

**File:** `src/types/contentful.ts`

```typescript
// Defines:
- HotelPropertyFields interface
- HotelPropertyEntry type
- ChannelType union
- ChannelConfig interface
```

**Benefits:**
- Type safety for Contentful data
- IntelliSense for developers
- Compile-time error catching

### 4. Application Router

**File:** `src/app/page.tsx`

```typescript
// Responsibilities:
- Load hotel data on mount
- Parse channel query parameter
- Route to appropriate channel component
- Wrap in Live Preview provider
```

**Flow:**
1. Parse URL query parameter `?channel=luxury`
2. Fetch data from Contentful
3. Pass data to selected channel component
4. Enable Live Preview updates

### 5. Channel Components

**Location:** `src/components/channels/`

Each channel component:
- Receives same `hotelData` prop
- Uses `useContentfulLiveUpdates()` hook
- Renders data with channel-specific styling
- Implements `data-contentful-*` attributes for inspector mode

**Component Structure:**
```typescript
interface ChannelViewProps {
  hotelData: HotelPropertyEntry;
}

export default function ChannelView({ hotelData }: ChannelViewProps) {
  // Enable live updates
  const updatedData = useContentfulLiveUpdates(hotelData);
  
  // Access fields
  const fields = updatedData.fields;
  
  // Render with channel-specific styling
  return (/* JSX */);
}
```

### 6. Navigation Component

**File:** `src/components/ChannelSwitcher.tsx`

```typescript
// Responsibilities:
- Display all available channels
- Show current channel state
- Navigate between channels
- Display entry ID for demo purposes
```

## Data Flow

### Initial Page Load

```
1. User visits http://localhost:3000?channel=luxury
                    ↓
2. page.tsx parses query parameter
                    ↓
3. useEffect calls getHotelProperty()
                    ↓
4. Contentful client fetches entry via API
                    ↓
5. Entry data stored in state
                    ↓
6. renderChannel() determines which component to render
                    ↓
7. LuxuryView receives hotelData prop
                    ↓
8. Component renders with channel-specific styling
```

### Live Preview Updates

```
1. Content editor changes field in Contentful
                    ↓
2. Contentful Preview API pushes update via SDK
                    ↓
3. useContentfulLiveUpdates() hook receives new data
                    ↓
4. Component re-renders with updated data
                    ↓
5. User sees change instantly (no page reload)
```

### Channel Switching

```
1. User clicks channel button
                    ↓
2. ChannelSwitcher calls router.push(?channel=new)
                    ↓
3. URL updates, triggering component re-render
                    ↓
4. renderChannel() selects new component
                    ↓
5. New channel component receives same hotelData
                    ↓
6. Different presentation of identical content
```

## Key Design Patterns

### 1. Single Source of Truth

- One entry in Contentful
- Multiple presentation components
- No content duplication
- Consistent updates across channels

### 2. Separation of Concerns

**Content (Contentful):**
- What to say
- Media assets
- Structured data

**Presentation (React Components):**
- How to display
- Styling and layout
- User interactions

**Business Logic (Next.js):**
- Routing
- Data fetching
- Error handling

### 3. Component Composition

```
App
├── ChannelSwitcher (Navigation)
└── Channel Views (6 variations)
    ├── LuxuryView
    ├── CorporateView
    ├── OTAView
    ├── MobileView
    ├── EmailView
    └── KioskView
```

### 4. Progressive Enhancement

- Base functionality works without JavaScript
- Live Preview enhances editing experience
- Images load with Next.js optimization
- Responsive design adapts to viewport

## Technology Decisions

### Why Next.js?

✅ Server-side rendering for SEO
✅ Image optimization built-in
✅ File-based routing
✅ TypeScript support
✅ Easy deployment to Vercel

### Why TailwindCSS?

✅ Rapid prototyping
✅ Consistent design system
✅ Custom color palettes per channel
✅ Responsive utilities
✅ Small production bundle

### Why TypeScript?

✅ Type safety for Contentful data
✅ Better developer experience
✅ Catch errors at compile time
✅ Self-documenting code

### Why Contentful?

✅ API-first architecture
✅ Flexible content modeling
✅ Live Preview SDK
✅ Excellent developer experience
✅ Scalable infrastructure

## Performance Optimizations

### 1. Image Optimization

```typescript
// Next.js Image component automatically:
- Serves modern formats (WebP)
- Resizes based on device
- Lazy loads below the fold
- Optimizes on-demand

// Contentful Images API:
- Transform via URL parameters
- ?w=1200&h=800&fit=fill
- Caching at CDN edge
```

### 2. Code Splitting

```
// Next.js automatically splits code:
- Each page is a separate chunk
- Components loaded on-demand
- Shared dependencies in common chunks
```

### 3. Data Fetching

```typescript
// Current: Client-side fetching
// Future optimization: ISR
export const revalidate = 60; // Regenerate every 60s
```

## Security Considerations

### API Tokens

- **Delivery Token:** Read access to published content (safe for client)
- **Preview Token:** Read access to draft content (protect carefully)
- Both tokens are read-only (no write access)

### Environment Variables

```typescript
// NEXT_PUBLIC_* prefix makes vars available to browser
// Only include what's necessary for client-side
// Never include write tokens or secrets
```

### Content Validation

```typescript
// Always validate data from API:
if (!hotelData) {
  return <ErrorState />;
}

// Use TypeScript to enforce structure
```

## Scalability

### Adding New Channels

1. Create new component in `src/components/channels/`
2. Add type to `ChannelType` union
3. Add config to channels array
4. Add route case in `renderChannel()`

### Adding New Content Types

1. Create content type in Contentful
2. Add TypeScript interface
3. Create fetch function
4. Build presentation components

### Multi-Region Support

- Contentful CDN is globally distributed
- Next.js can deploy to edge
- Images served from nearest location

## Testing Strategy

### Unit Tests (Recommended)

```typescript
// Test individual components
test('LuxuryView renders property name', () => {
  render(<LuxuryView hotelData={mockData} />);
  expect(screen.getByText('The Maritime Denver')).toBeInTheDocument();
});
```

### Integration Tests

```typescript
// Test data fetching and routing
test('Switching channels maintains data', async () => {
  // Test channel switching logic
});
```

### E2E Tests

```typescript
// Test full user flows with Playwright/Cypress
test('User can view all six channels', async () => {
  // Navigate through all channels
});
```

## Monitoring & Debugging

### Browser DevTools

- React DevTools for component inspection
- Network tab for API calls
- Console for Live Preview events

### Contentful Debugging

```typescript
// Log entry data
console.log('Entry:', updatedData);

// Verify field IDs
console.log('Fields:', Object.keys(updatedData.fields));

// Check sys metadata
console.log('Entry ID:', updatedData.sys.id);
```

### Common Issues

**Issue:** Content not updating
**Debug:** Check token type, verify environment

**Issue:** Images not loading  
**Debug:** Verify domains in next.config.js

**Issue:** Live Preview not working
**Debug:** Check preview token, CORS settings

## Future Enhancements

### Potential Additions

1. **Localization:** Multi-language support
2. **Analytics:** Track channel performance
3. **A/B Testing:** Compare channel effectiveness
4. **User Preferences:** Remember channel choice
5. **Advanced Routing:** Deep linking to specific sections
6. **Offline Support:** Service worker for PWA
7. **Content Scheduling:** Publish at specific times
8. **Personalization:** User-specific content variations

---

**This architecture demonstrates:**
- Clean separation of content and presentation
- Scalable multi-channel delivery
- Modern web development practices
- Production-ready patterns

