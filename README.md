# Contentful Channel Demo - The Maritime Denver

A comprehensive Next.js application demonstrating Contentful's channel-agnostic content management capabilities by rendering the same hotel property content across 6 different channel experiences.

## 🎯 Core Concept

**Single Source of Truth → Multiple Presentations**

This demo showcases how one Contentful entry can power multiple distinct user experiences without content duplication:

- ✨ **Luxury Brand Portal** - Marriott Bonvoy-style elegance
- 💼 **Corporate Travel Portal** - B2B efficiency
- 🌐 **OTA Partner** - Booking.com-style marketplace
- 📱 **Mobile App** - Native mobile experience
- 📧 **Email Campaign** - Marketing communication
- 🖥️ **Digital Kiosk** - In-lobby interactive display

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Contentful account (free tier works!)
- Basic familiarity with Next.js

### Installation

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Set up Contentful:**

Follow the detailed instructions in `CONTENTFUL_SETUP.md` to:
- Create your Contentful space
- Set up the Hotel Property content model
- Create your first entry with sample data
- Get your API keys

3. **Configure environment variables:**

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Then update with your Contentful credentials:

```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_delivery_token
NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN=your_preview_token
NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT=master
```

4. **Run the development server:**

```bash
npm run dev
```

5. **Open your browser:**

Visit [http://localhost:3000](http://localhost:3000)

## 📋 Content Model

The app uses a single content type called **Hotel Property** with these fields:

### Text Fields
- `propertyName` (Short text) - Hotel name
- `heroHeadline` (Short text) - Marketing headline
- `location` (Short text) - Geographic location
- `roomType` (Short text) - Room category name
- `roomDescription` (Long text) - Detailed room description
- `neighborhoodVibe` (Long text) - Area information
- `signatureExperience` (Long text) - Unique selling proposition

### Array Fields
- `keyAmenities` (Short text, list) - Hotel features

### Media Fields
- `heroImage` (Single media) - Primary marketing image
- `roomImages` (Multiple media) - Additional room photos

See `CONTENTFUL_SETUP.md` for detailed setup instructions.

## 🎨 Channel Experiences

### 1. Luxury Brand Portal (✨)
- **Target Audience:** High-end leisure travelers
- **Design Philosophy:** Spacious, elegant, benefit-focused
- **Typography:** Playfair Display serif
- **Color Palette:** Gold (#C5A572) and Navy (#1B2B3A)
- **Key Features:** Large imagery, experiential language, premium feel

### 2. Corporate Travel Portal (💼)
- **Target Audience:** Business travelers and travel managers
- **Design Philosophy:** Efficient, data-dense, professional
- **Typography:** Inter sans-serif
- **Color Palette:** Corporate Blue (#2563EB)
- **Key Features:** Quick facts, distance metrics, business amenities

### 3. OTA Partner (🌐)
- **Target Audience:** Price-conscious comparison shoppers
- **Design Philosophy:** Familiar e-commerce patterns
- **Typography:** Inter sans-serif
- **Color Palette:** Traditional OTA colors
- **Key Features:** Reviews, ratings, pricing, availability calendar

### 4. Mobile App (📱)
- **Target Audience:** On-the-go mobile users
- **Design Philosophy:** Native mobile patterns, thumb-friendly
- **Typography:** System fonts
- **Color Palette:** Modern app aesthetics
- **Key Features:** Bottom navigation, image carousel, expandable content

### 5. Email Campaign (📧)
- **Target Audience:** Marketing email subscribers
- **Design Philosophy:** Single column, focused messaging
- **Typography:** Web-safe fonts
- **Color Palette:** Brand-consistent
- **Key Features:** 600px width, prominent CTA, seasonal messaging

### 6. Digital Kiosk (🖥️)
- **Target Audience:** Hotel guests in the lobby
- **Design Philosophy:** High contrast, large touch targets
- **Typography:** Large, bold typefaces
- **Color Palette:** High contrast for visibility
- **Key Features:** 60px+ touch targets, auto-rotation, upsell focus

## 🔄 Live Preview Integration

The app includes Contentful Live Preview SDK integration:

1. **Enable Live Preview:**
   - Add `NEXT_PUBLIC_CONTENTFUL_PREVIEW=true` to your `.env.local`
   - Use your preview token

2. **Use in Contentful:**
   - Go to Settings → Content Preview
   - Add a new preview URL: `http://localhost:3000?channel=luxury`
   - Open any Hotel Property entry
   - Click "Open Preview"

3. **Features:**
   - Real-time content updates as you type
   - Inspector mode (click on content to jump to the field in Contentful)
   - Works across all 6 channel views

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Content:** Contentful CMS
- **Live Preview:** @contentful/live-preview
- **Images:** Next.js Image optimization

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and fonts
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page with channel routing
├── components/
│   ├── ChannelSwitcher.tsx  # Channel navigation
│   └── channels/
│       ├── LuxuryView.tsx
│       ├── CorporateView.tsx
│       ├── OTAView.tsx
│       ├── MobileView.tsx
│       ├── EmailView.tsx
│       └── KioskView.tsx
├── lib/
│   └── contentful.ts        # Contentful client setup
└── types/
    └── contentful.ts        # TypeScript definitions
```

## 🎬 Demo Script

When presenting this demo:

1. **Start with Channel Switcher:** Show all 6 channels in the navigation
2. **Point out Entry ID:** Visible in the header - same for all views
3. **Tour Luxury View:** Elegant, spacious, benefit-focused
4. **Compare to Corporate:** Same content, totally different presentation
5. **Show OTA View:** E-commerce patterns, reviews, pricing
6. **Mobile Experience:** Swipe through, show bottom nav
7. **Email View:** Single column, focused CTA
8. **Kiosk View:** Large touch targets, auto-rotation
9. **Live Preview:** Open Contentful, make a change, watch it update
10. **Key Message:** One entry, six experiences, no duplication

## 🎓 Learning Objectives

This demo teaches:

- ✅ Content modeling for reusability
- ✅ Channel-agnostic content strategy
- ✅ Separation of content from presentation
- ✅ Live Preview implementation
- ✅ TypeScript with Contentful
- ✅ Next.js App Router patterns
- ✅ Responsive design across contexts

## 🔧 Customization

### Adding a New Channel

1. Create a new view component in `src/components/channels/`
2. Add the channel type to `src/types/contentful.ts`
3. Add it to the channels array in `ChannelSwitcher.tsx`
4. Add routing logic in `src/app/page.tsx`

### Using Your Own Content

1. Update the content model in Contentful
2. Modify `HotelPropertyFields` in `src/types/contentful.ts`
3. Update channel components to use new fields

## 📚 Additional Resources

- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Live Preview SDK Guide](https://www.contentful.com/developers/docs/tutorials/general/live-preview/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 🐛 Troubleshooting

### "Error Loading Data"
- Check your `.env.local` file has correct Contentful credentials
- Verify you've created a Hotel Property entry in Contentful
- Ensure your content type ID is exactly `hotelProperty`

### Images not loading
- Verify `images.ctfassets.net` is in `next.config.js` domains
- Check that your entry has images uploaded

### Live Preview not working
- Make sure you're using the preview token (not delivery token)
- Set `NEXT_PUBLIC_CONTENTFUL_PREVIEW=true` in `.env.local`
- Verify preview URL is configured in Contentful settings

## 📝 License

This is a demo project for educational purposes.

## 🤝 Contributing

This is a demonstration project, but feel free to use it as a starting point for your own projects!

---

Built with ❤️ to showcase Contentful's powerful content management capabilities.

