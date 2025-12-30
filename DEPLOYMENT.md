# Deployment Guide

This guide covers deploying your Contentful Channel Demo application to production.

## Deployment Platforms

The app works with any platform that supports Next.js:

- **Vercel** (Recommended - created by Next.js team)
- **Netlify**
- **AWS Amplify**
- **Google Cloud Run**
- **Self-hosted with Docker**

## Deploying to Vercel (Recommended)

### Method 1: Deploy via GitHub

1. **Push your code to GitHub:**

```bash
git init
git add .
git commit -m "Initial commit: Contentful Channel Demo"
git branch -M main
git remote add origin your-github-repo-url
git push -u origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables:**

In Vercel's deployment settings, add these environment variables:

```
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_delivery_token
NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN=your_preview_token
NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT=master
```

4. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy your app
   - You'll get a `.vercel.app` URL

### Method 2: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts and add environment variables when asked
```

## Deploying to Netlify

1. **Install Netlify CLI:**

```bash
npm install -g netlify-cli
```

2. **Build your app:**

```bash
npm run build
```

3. **Deploy:**

```bash
netlify deploy --prod
```

4. **Set Environment Variables:**
   - Go to Site settings → Build & deploy → Environment
   - Add all `NEXT_PUBLIC_*` variables

## Configuring Contentful Live Preview for Production

Once deployed, update your Contentful preview settings:

1. **In Contentful:**
   - Go to Settings → Content preview
   - Add a new preview or edit existing
   - Update URL to your production domain:
     ```
     https://your-app.vercel.app?channel=luxury
     ```

2. **For multiple channels:**
   
   Create separate preview URLs for each channel:
   - Luxury: `https://your-app.vercel.app?channel=luxury`
   - Corporate: `https://your-app.vercel.app?channel=corporate`
   - OTA: `https://your-app.vercel.app?channel=ota`
   - Mobile: `https://your-app.vercel.app?channel=mobile`
   - Email: `https://your-app.vercel.app?channel=email`
   - Kiosk: `https://your-app.vercel.app?channel=kiosk`

## Production Considerations

### 1. Environment Variables

**Important:** Only use the **Delivery API** token (`NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN`) in production, not the preview token, unless you specifically want draft content.

For production:
```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_delivery_token
NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT=master
# DON'T set NEXT_PUBLIC_CONTENTFUL_PREVIEW=true in production
```

### 2. Performance Optimization

#### Enable Image Optimization

The app uses Next.js Image component, which automatically optimizes images. Make sure your deployment platform supports this:

- **Vercel:** Works out of the box
- **Netlify:** Requires Next.js Image plugin
- **Self-hosted:** Requires proper configuration

#### Add ISR (Incremental Static Regeneration)

For better performance, convert the page to use ISR:

```typescript
// src/app/page.tsx
export const revalidate = 60; // Revalidate every 60 seconds
```

#### Enable Caching

Add appropriate cache headers in `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};
```

### 3. Security

#### Protect Preview Content

If you're using Live Preview in production:

1. Require authentication to access preview mode
2. Use preview tokens only for authenticated users
3. Consider IP restrictions for preview access

#### Environment Variable Security

- Never commit `.env.local` to Git
- Use your platform's secret management
- Rotate tokens periodically

### 4. Monitoring

#### Add Analytics

```bash
npm install @vercel/analytics
```

```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### Add Error Tracking

Consider adding Sentry or similar:

```bash
npm install @sentry/nextjs
```

### 5. Content Webhooks (Optional)

For even better performance, set up webhooks to trigger rebuilds when content changes:

1. **In Contentful:**
   - Settings → Webhooks
   - Add webhook
   - URL: Your platform's deploy hook URL

2. **For Vercel:**
   - Project Settings → Git
   - Copy the Deploy Hook URL
   - Add to Contentful webhooks

3. **Trigger events:**
   - Entry publish
   - Entry unpublish
   - Asset publish

Now your site rebuilds automatically when content changes!

## Custom Domain

### Vercel

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Netlify

1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS

## Testing Production Build Locally

Before deploying, test the production build:

```bash
# Build for production
npm run build

# Start production server
npm start

# Open http://localhost:3000
```

## Rollback Strategy

### Vercel
- Automatic rollback in dashboard
- Keep previous deployments accessible
- Use deployment URLs for testing

### Netlify
- Deploy previews for each branch
- Rollback to previous deploys in UI

## CI/CD Pipeline

For automated testing and deployment:

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_CONTENTFUL_SPACE_ID: ${{ secrets.CONTENTFUL_SPACE_ID }}
          NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: ${{ secrets.CONTENTFUL_ACCESS_TOKEN }}
      
      - name: Deploy to Vercel
        run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## Troubleshooting Deployment

### Images not loading
- Verify `images.ctfassets.net` is in `next.config.js` domains
- Check CSP headers if you have them configured

### Environment variables not working
- Ensure all vars start with `NEXT_PUBLIC_`
- Redeploy after adding/changing env vars
- Check platform-specific env var syntax

### Build failures
- Check build logs for specific errors
- Ensure all dependencies are in `package.json`
- Test build locally first with `npm run build`

### Preview mode issues
- Verify preview token is set
- Check that preview URLs are correct in Contentful
- Ensure CORS is configured if needed

## Production Checklist

Before going live:

- [ ] Test all 6 channels on production URL
- [ ] Verify images load correctly
- [ ] Test Live Preview with production URL
- [ ] Check mobile responsiveness
- [ ] Test with actual content (not just sample data)
- [ ] Set up monitoring/analytics
- [ ] Configure custom domain (if applicable)
- [ ] Set up content webhooks for auto-deploy
- [ ] Document any custom configuration
- [ ] Train content team on updating entries

---

**Need help?** Check the platform-specific documentation:
- [Vercel Next.js Documentation](https://vercel.com/docs/frameworks/nextjs)
- [Netlify Next.js Documentation](https://docs.netlify.com/integrations/frameworks/next-js/)

