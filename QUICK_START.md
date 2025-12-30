# Quick Start Guide

Get the Contentful Channel Demo running in 15 minutes.

## Prerequisites Checklist

- [ ] Node.js 18 or higher installed
- [ ] A Contentful account (sign up free at contentful.com)
- [ ] Basic terminal/command line knowledge

## 5-Step Setup

### Step 1: Install Dependencies (2 minutes)

```bash
npm install
```

### Step 2: Create Contentful Content Type (5 minutes)

1. Log into Contentful
2. Create a new space or use existing
3. Go to **Content model** → **Add content type**
4. Name: `Hotel Property`, API ID: `hotelProperty`
5. Add these fields (click **Add field** for each):

| Field Name | Field ID | Type | Settings |
|------------|----------|------|----------|
| Property Name | `propertyName` | Short text | Entry title |
| Hero Headline | `heroHeadline` | Short text | - |
| Location | `location` | Short text | - |
| Room Type | `roomType` | Short text | - |
| Room Description | `roomDescription` | Long text | - |
| Neighborhood Vibe | `neighborhoodVibe` | Long text | - |
| Signature Experience | `signatureExperience` | Long text | - |
| Key Amenities | `keyAmenities` | Short text, list | - |
| Hero Image | `heroImage` | Media (single) | Images only |
| Room Images | `roomImages` | Media (many) | Images only |

6. Click **Save**

### Step 3: Add Sample Content (3 minutes)

1. Go to **Content** → **Add entry** → **Hotel Property**
2. Fill in the sample data below
3. Upload 1 hero image and 2-3 room images (use stock photos from Unsplash)
4. Click **Publish**

**Sample Data:**

```
Property Name: The Maritime Denver
Hero Headline: Where Rocky Mountain elevation meets elevated hospitality
Location: Downtown Denver, walking distance to Union Station
Room Type: Skyline Suite
Room Description: Floor-to-ceiling windows frame panoramic views of the Front Range. This 450-square-foot retreat features a king bed, spa-inspired bathroom, and workspace designed for the modern traveler.
Neighborhood Vibe: In the heart of LoDo, you're steps from craft breweries, the Denver Performing Arts Complex, and Coors Field.
Signature Experience: Start your day with our complimentary coffee service featuring beans from local roasters, then explore Denver's 300 days of sunshine.
Key Amenities:
  - Rooftop bar with mountain views
  - Farm-to-table restaurant
  - 24-hour fitness center
  - Complimentary bike rentals
```

### Step 4: Configure Environment Variables (2 minutes)

1. Copy the example file:
```bash
cp .env.local.example .env.local
```

2. Get your Contentful credentials:
   - **Space ID:** Settings → General settings
   - **Access Token:** Settings → API keys → Content Delivery API
   - **Preview Token:** Settings → API keys → Content Preview API

3. Edit `.env.local` and add your values:

```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id_here
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_delivery_token_here
NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN=your_preview_token_here
NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT=master
```

### Step 5: Run the App (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**You should see:** Your hotel property rendered in the Luxury channel view! 🎉

## Quick Feature Tour

### View Different Channels

Click the channel buttons at the top to see the same content in 6 different presentations:

- ✨ **Luxury Brand** - Elegant, spacious, benefit-focused
- 💼 **Corporate Travel** - Efficient, specs-heavy, professional  
- 🌐 **OTA Partner** - E-commerce style with reviews and pricing
- 📱 **Mobile App** - Native mobile patterns, thumb-friendly
- 📧 **Email Campaign** - Single column, focused CTA
- 🖥️ **Digital Kiosk** - Large touch targets, auto-rotating

### Enable Live Preview (Optional)

1. Add to `.env.local`:
```env
NEXT_PUBLIC_CONTENTFUL_PREVIEW=true
```

2. Restart the dev server

3. In Contentful:
   - Settings → Content preview → Add content preview
   - URL: `http://localhost:3000?channel=luxury`
   - Save

4. Open your entry and click "Open preview"

5. Edit content and watch it update in real-time!

## Common Issues & Fixes

### "Error Loading Data"

**Problem:** App can't connect to Contentful

**Check:**
```bash
# Verify your environment variables are set
cat .env.local

# Test your API connection
curl "https://cdn.contentful.com/spaces/YOUR_SPACE_ID/environments/master/entries?access_token=YOUR_TOKEN&content_type=hotelProperty"
```

**Fix:** 
- Make sure `.env.local` is in project root
- Verify all values are correct (no quotes needed)
- Ensure content type ID is exactly `hotelProperty`
- Check that your entry is published

### Images Not Showing

**Problem:** Broken image icons

**Fix:**
- Verify images are uploaded and published in Contentful
- Check that `images.ctfassets.net` is in `next.config.js` domains
- Clear browser cache and reload

### Port 3000 Already in Use

**Problem:** Another app is using port 3000

**Fix:**
```bash
# Use a different port
npm run dev -- -p 3001

# Or kill the process using 3000
lsof -ti:3000 | xargs kill
```

### Live Preview Not Working

**Problem:** Changes in Contentful don't show up

**Fix:**
- Make sure `NEXT_PUBLIC_CONTENTFUL_PREVIEW=true` is set
- Verify you're using the **preview token**, not delivery token
- Restart dev server after changing env vars
- Check browser console for errors

## Next Steps

Now that it's running:

### 1. Explore All Channels

Click through each channel to see how the same content adapts to different contexts.

### 2. Edit Content

- Open Contentful
- Modify your hotel entry
- Watch changes appear (especially with Live Preview enabled)

### 3. Add More Entries

Create 2-3 different hotel properties to showcase variety:
- Urban boutique hotel
- Beach resort
- Mountain lodge

See `SAMPLE_CONTENT.md` for more examples.

### 4. Customize Styling

Edit the channel components in `src/components/channels/` to match your brand.

### 5. Read the Docs

- `README.md` - Full project overview
- `CONTENTFUL_SETUP.md` - Detailed setup guide
- `ARCHITECTURE.md` - How it all works
- `DEMO_SCRIPT.md` - Present the demo to others

## Getting Help

### Documentation

- [Contentful Docs](https://www.contentful.com/developers/docs/)
- [Next.js Docs](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

### Troubleshooting

Check the README's troubleshooting section or:
- Look at browser console for errors
- Check terminal for build errors
- Verify Contentful API with curl/Postman

### Community

- [Contentful Community Slack](https://www.contentful.com/slack/)
- [Next.js Discord](https://nextjs.org/discord)

## Quick Reference

### Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # React components
│   └── channels/     # 6 channel views
├── lib/              # Contentful client
└── types/            # TypeScript definitions
```

### Environment Variables

```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=        # Required
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=    # Required
NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN=   # Optional (for Live Preview)
NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT=     # Usually 'master'
NEXT_PUBLIC_CONTENTFUL_PREVIEW=         # true/false
```

### Important Files

- `package.json` - Dependencies
- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Styling configuration
- `.env.local` - Your local environment variables (never commit!)

---

**🎉 Congratulations!** You now have a working multi-channel content demo. Start exploring and customizing!

**Questions?** Check the other documentation files or open an issue on GitHub.

