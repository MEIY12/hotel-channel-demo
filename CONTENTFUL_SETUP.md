# Contentful Setup Guide

This guide walks you through setting up your Contentful space for the Channel Demo application.

---

## 🚀 Quick Setup: Import Pre-configured Content (Recommended)

This repository includes a ready-to-use export file that contains the complete content model and sample data. This is the fastest way to get started!

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- A [Contentful account](https://www.contentful.com/) (free tier works!)

### Step 1: Install Contentful CLI

```bash
npm install -g contentful-cli
```

### Step 2: Login to Contentful

```bash
contentful login
```

This will open a browser window to authenticate. Follow the prompts to generate an access token.

### Step 3: Create a New Space (or use existing)

```bash
# Create a new space
contentful space create --name "Hotel Channel Demo"
```

Note the **Space ID** that's returned - you'll need this for the import and for your environment variables.

**Or** if you want to use an existing space:

```bash
# List your spaces to find the ID
contentful space list
```

### Step 4: Import the Content

```bash
contentful space import --space-id YOUR_SPACE_ID --content-file contentful-space-export.json
```

Replace `YOUR_SPACE_ID` with your actual space ID from Step 3.

This will import:
- ✅ The **Hotel Property** content type with all fields configured
- ✅ A sample entry for **"The Avalon Denver"** hotel
- ✅ Sample images (hero image and room photos)

### Step 5: Get Your API Keys

1. Go to [Contentful](https://app.contentful.com/)
2. Open your space
3. Navigate to **Settings** → **API keys**
4. Click **Add API key** (or use the default one)
5. Copy your:
   - **Space ID**
   - **Content Delivery API - access token**
   - **Content Preview API - access token** (for Live Preview)

### Step 6: Configure Your App

See [Step 6 in Manual Setup](#step-6-configure-your-app) below for environment variable configuration.

---

## 📝 Manual Setup: Create Everything from Scratch

If you prefer to create the content model manually (useful for learning), follow the steps below.

## Step 1: Create a Contentful Space

1. Go to [contentful.com](https://www.contentful.com/) and sign up or log in
2. Click "Create space" or select an existing space
3. Choose "Empty space" (not a template)
4. Name it something like "Hotel Channel Demo"

## Step 2: Create the Content Model

### Create the Hotel Property Content Type

1. In your Contentful space, go to **Content model** in the top navigation
2. Click **Add content type**
3. Set these values:
   - **Name:** Hotel Property
   - **API Identifier:** `hotelProperty` (this is important - must match exactly!)
   - **Description:** Hotel property for multi-channel demo

4. Click **Create**

### Add Fields to the Content Type

Now add each field below. For each field:
- Click **Add field**
- Select the field type
- Configure the settings as specified
- Click **Create and configure**
- Then click **Create** again

#### Field 1: Property Name
- **Type:** Short text
- **Name:** Property Name
- **Field ID:** `propertyName`
- **Settings:**
  - ✅ This field represents the Entry title
  - Appearance: Single line

#### Field 2: Hero Headline
- **Type:** Short text
- **Name:** Hero Headline
- **Field ID:** `heroHeadline`
- **Settings:**
  - Appearance: Single line
  - Help text: "Tagline or marketing headline"

#### Field 3: Location
- **Type:** Short text
- **Name:** Location
- **Field ID:** `location`
- **Settings:**
  - Appearance: Single line
  - Help text: "Geographic location and key landmarks"

#### Field 4: Room Type
- **Type:** Short text
- **Name:** Room Type
- **Field ID:** `roomType`
- **Settings:**
  - Appearance: Single line
  - Help text: "Name of the room category"

#### Field 5: Room Description
- **Type:** Long text
- **Name:** Room Description
- **Field ID:** `roomDescription`
- **Settings:**
  - Appearance: Markdown or plain text
  - Help text: "Detailed room description"

#### Field 6: Neighborhood Vibe
- **Type:** Long text
- **Name:** Neighborhood Vibe
- **Field ID:** `neighborhoodVibe`
- **Settings:**
  - Appearance: Markdown or plain text
  - Help text: "Description of the surrounding area"

#### Field 7: Signature Experience
- **Type:** Long text
- **Name:** Signature Experience
- **Field ID:** `signatureExperience`
- **Settings:**
  - Appearance: Markdown or plain text
  - Help text: "Unique selling proposition or special feature"

#### Field 8: Key Amenities
- **Type:** Short text, list
- **Name:** Key Amenities
- **Field ID:** `keyAmenities`
- **Settings:**
  - ✅ Create as a list
  - Appearance: List
  - Help text: "Hotel features and amenities"

#### Field 9: Hero Image
- **Type:** Media (single file)
- **Name:** Hero Image
- **Field ID:** `heroImage`
- **Settings:**
  - Accept only specified file types: Images
  - Help text: "Primary marketing image"

#### Field 10: Room Images
- **Type:** Media (many files)
- **Name:** Room Images
- **Field ID:** `roomImages`
- **Settings:**
  - Accept only specified file types: Images
  - Help text: "Additional room and property photos"

### Save the Content Type

Click **Save** in the top right corner.

## Step 3: Upload Sample Images

Before creating content, upload some images:

1. Go to **Media** in the top navigation
2. Click **Add asset** → **Single asset**
3. Upload a hero image (landscape orientation recommended, at least 1920x1080px)
4. Title it "Avalon Denver Hero"
5. Repeat for 3-4 additional room images

**Image Tips:**
- Use high-quality hotel/room images
- Landscape orientation works best
- You can find free stock photos at [Unsplash](https://unsplash.com/s/photos/hotel-room) or [Pexels](https://www.pexels.com/search/hotel/)

## Step 4: Create Your First Entry

1. Go to **Content** in the top navigation
2. Click **Add entry** → **Hotel Property**
3. Fill in the sample data below

### Sample Data: The Avalon Denver

```
Property Name: The Avalon Denver

Hero Headline: Where Rocky Mountain elevation meets elevated hospitality

Location: Downtown Denver, walking distance to Union Station

Room Type: Skyline Suite

Room Description:
Floor-to-ceiling windows frame panoramic views of the Front Range. This 450-square-foot retreat features a king bed, spa-inspired bathroom, and workspace designed for the modern traveler. Thoughtfully curated details include locally sourced bath amenities, premium linens, and a Bluetooth sound system for your favorite playlists.

Neighborhood Vibe:
In the heart of LoDo, you're steps from craft breweries, the Denver Performing Arts Complex, and Coors Field. The 16th Street Mall's free shuttle connects you to the entire downtown corridor, while Union Station's restaurants and bars create an energetic dining scene just outside your door.

Signature Experience:
Start your day with our complimentary coffee service featuring beans from local roasters, then explore Denver's 300 days of sunshine. Our concierge team curates personalized itineraries featuring hidden gems from Red Rocks to Rocky Mountain National Park.

Key Amenities (add each as a separate list item):
- Rooftop bar with mountain views
- Farm-to-table restaurant
- 24-hour fitness center
- Complimentary bike rentals
- High-speed WiFi throughout
- Pet-friendly accommodations

Hero Image: [Select your uploaded hero image]

Room Images: [Select 3-4 additional images]
```

4. Click **Publish** in the top right

## Step 5: Get Your API Keys

### Get Your Space ID

1. Go to **Settings** → **General settings**
2. Find **Space ID** and copy it
3. Save it for your `.env.local` file

### Get Your Access Tokens

1. Go to **Settings** → **API keys**
2. Click **Add API key** (or use the default "Example space")
3. Name it "Channel Demo App"

You'll see two important tokens:

**Content Delivery API - access token:**
- This is your `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN`
- Used for published content in production

**Content Preview API - access token:**
- This is your `NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN`
- Used for draft content and live preview

4. Copy both tokens

## Step 6: Configure Your App

1. In your project, copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

2. Update `.env.local` with your credentials:

```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id_here
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_delivery_token_here
NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN=your_preview_token_here
NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT=master
```

## Step 7: Enable Live Preview (Optional but Recommended)

1. In Contentful, go to **Settings** → **Content preview**
2. Click **Add content preview**
3. Configure:
   - **Name:** Local Development
   - **Description:** Channel Demo on localhost
   - **URL:** `http://localhost:3000?channel=luxury`
   - **Preview settings:** Select your Hotel Property content type

4. Click **Save**

5. In your `.env.local`, add:

```env
NEXT_PUBLIC_CONTENTFUL_PREVIEW=true
```

### Using Live Preview

1. Start your Next.js dev server: `npm run dev`
2. In Contentful, open your Hotel Property entry
3. Click the **Open preview** dropdown and select "Local Development"
4. Edit content in Contentful - watch it update in real-time!
5. Click on content elements to jump to that field in Contentful (Inspector Mode)

## Step 8: Test Your Setup

1. Start the development server:

```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000)
3. You should see your hotel property rendered in the Luxury channel
4. Click the channel switcher buttons to see different presentations

## Troubleshooting

### "Error Loading Data" message

**Check these:**
- ✅ Is your `.env.local` file in the project root?
- ✅ Are all four environment variables set?
- ✅ Did you copy the correct tokens from Contentful?
- ✅ Is your content type API ID exactly `hotelProperty`?
- ✅ Did you publish your entry in Contentful?

**Test your credentials:**

```bash
# In a new terminal, run:
curl "https://cdn.contentful.com/spaces/YOUR_SPACE_ID/environments/master/entries?access_token=YOUR_ACCESS_TOKEN&content_type=hotelProperty"
```

Replace `YOUR_SPACE_ID` and `YOUR_ACCESS_TOKEN` with your values. You should see JSON data.

### Images not showing

- Verify images are published in Contentful
- Check the Network tab in browser DevTools for 404 errors
- Ensure `images.ctfassets.net` is in your `next.config.js`

### Live Preview not working

- Make sure you're using the **preview token** (not delivery token)
- Set `NEXT_PUBLIC_CONTENTFUL_PREVIEW=true` in `.env.local`
- Restart your dev server after changing environment variables
- Check that your preview URL in Contentful is correct

## Content Model Reference

For quick reference, here's the complete content model structure:

```
Content Type: hotelProperty

Fields:
├── propertyName (Short text)
├── heroHeadline (Short text)
├── location (Short text)
├── roomType (Short text)
├── roomDescription (Long text)
├── neighborhoodVibe (Long text)
├── signatureExperience (Long text)
├── keyAmenities (Short text, list)
├── heroImage (Media, single)
└── roomImages (Media, multiple)
```

## Next Steps

Once your setup is complete:

1. ✅ Explore all 6 channel views
2. ✅ Try editing content and seeing it update
3. ✅ Add additional hotel properties
4. ✅ Customize the styling for your brand
5. ✅ Add more channels or modify existing ones

## Need Help?

- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Contentful Community Slack](https://www.contentful.com/slack/)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Pro Tip:** Create 2-3 different hotel properties to really showcase how the same content model works for different brands and property types!

