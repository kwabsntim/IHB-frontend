# Google Search Console Setup Guide for IHB Transport

## What I've Done for You

I've prepared your website with the following SEO essentials:

### 1. **sitemap.xml** ✅
- Lists all your public pages for Google to crawl
- Located at: `https://ihb-transport.dk/sitemap.xml`
- Includes: Home, Book Now, and Track pages
- Excludes admin pages (for security)

### 2. **robots.txt** ✅
- Tells search engines what to crawl
- Located at: `https://ihb-transport.dk/robots.txt`
- Blocks admin pages from search results
- Points to your sitemap

### 3. **SEO Meta Tags** ✅
- Added Danish title and description
- Added keywords for search engines
- Added Open Graph tags (for Facebook/LinkedIn sharing)
- Added Twitter Card tags (for Twitter sharing)
- Added canonical URL

### 4. **Schema.org Structured Data** ✅
- Helps Google understand your business
- Shows rich snippets in search results
- Includes business info, ratings, services

---

## Step-by-Step: Google Search Console Setup

### STEP 1: Deploy Your Changes
First, push these changes to your live site:
```bash
git add .
git commit -m "Add SEO optimization and Google Search Console preparation"
git push
```

Wait for Vercel to deploy (usually 1-2 minutes).

---

### STEP 2: Go to Google Search Console
1. Visit: https://search.google.com/search-console
2. Click **"Start now"**
3. Sign in with your Google account (create one if needed)

---

### STEP 3: Add Your Property
You'll see two options:

**Choose: "URL prefix"** (easier method)
- Enter: `https://ihb-transport.dk`
- Click **Continue**

---

### STEP 4: Verify Ownership
Google will show you several verification methods. Choose ONE:

#### **METHOD 1: HTML File Upload (Recommended)**
1. Google gives you a file like `google1234567890abcdef.html`
2. Download this file
3. Upload it to your website root folder (same level as index.html)
4. Push to GitHub and deploy
5. Click "Verify" in Google Search Console

To add the file:
```bash
# Place the downloaded file in your project folder, then:
git add google*.html
git commit -m "Add Google Search Console verification"
git push
```

#### **METHOD 2: HTML Tag (Alternative)**
1. Google gives you a meta tag like:
   ```html
   <meta name="google-site-verification" content="abc123..." />
   ```
2. Copy this tag
3. Add it to `index.html` in the `<head>` section (after line 6)
4. Push changes and deploy
5. Click "Verify"

#### **METHOD 3: DNS Verification (If you control DNS)**
1. Google gives you a TXT record
2. Add it to your domain DNS settings
3. Wait 5-10 minutes for DNS propagation
4. Click "Verify"

---

### STEP 5: Submit Your Sitemap
After verification is successful:

1. In Google Search Console, go to **"Sitemaps"** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **Submit**
4. Google will start crawling your site (takes 1-3 days)

---

### STEP 6: Monitor Your Site (After Verification)

**What to Check:**
- **Coverage**: See which pages are indexed
- **Performance**: See search queries and clicks
- **Mobile Usability**: Check mobile-friendliness
- **Core Web Vitals**: See site speed metrics

**First Results:**
- Verification: Immediate
- Sitemap processing: Few hours
- First data appearing: 2-3 days
- Full indexing: 1-2 weeks

---

## Additional Optimization Tips

### 1. **Submit to Google My Business** (if local)
- https://business.google.com
- Add your transport business
- Links to your website
- Shows on Google Maps

### 2. **Test Your Setup**
Before submitting, test:
- Sitemap: `https://ihb-transport.dk/sitemap.xml`
- Robots: `https://ihb-transport.dk/robots.txt`
- Both should load without errors

### 3. **Rich Results Test**
Test your structured data:
1. Visit: https://search.google.com/test/rich-results
2. Enter: `https://ihb-transport.dk`
3. Check if your business info appears correctly

### 4. **Mobile-Friendly Test**
1. Visit: https://search.google.com/test/mobile-friendly
2. Enter: `https://ihb-transport.dk`
3. Make sure it passes

---

## Monitoring & Maintenance

### Weekly (First Month):
- Check Google Search Console for errors
- Monitor which pages are indexed
- Check search queries bringing traffic

### Monthly (Ongoing):
- Update sitemap if you add new pages
- Check Core Web Vitals
- Review search performance
- Fix any crawl errors

### When to Update Sitemap:
Add new URLs to `sitemap.xml` when you:
- Add new service pages
- Add blog posts
- Add location pages
- Change `<lastmod>` date to current date

---

## Common Issues & Solutions

### "Site not verified"
- Make sure verification file is accessible: `https://ihb-transport.dk/google*.html`
- Check Vercel deployment completed
- Try alternative verification method

### "Sitemap can't be read"
- Check XML format is correct
- Make sure sitemap.xml is in root folder
- Test URL directly in browser

### "Submitted URL not found (404)"
- Check Vercel routing
- Make sure vercel.json doesn't block sitemap
- Test URL in browser

### "Pages not indexed yet"
- Normal! Takes 1-2 weeks for new sites
- Request indexing for important pages manually
- Keep creating quality content

---

## Quick Commands Reference

```bash
# Deploy SEO changes
git add sitemap.xml robots.txt index.html
git commit -m "Add SEO optimization"
git push

# Add Google verification file (after downloading)
git add google*.html
git commit -m "Add Google verification"
git push
```

---

## Need Help?

1. **Google Search Console Help**: https://support.google.com/webmasters
2. **Sitemap Validator**: https://www.xml-sitemaps.com/validate-xml-sitemap.html
3. **Test Tools**: https://search.google.com/test/

---

## Your SEO Checklist ✅

- [x] sitemap.xml created
- [x] robots.txt created
- [x] Meta tags added
- [x] Schema.org structured data added
- [ ] Deploy to production
- [ ] Verify in Google Search Console
- [ ] Submit sitemap
- [ ] Test with Google tools
- [ ] Monitor results after 1 week

Good luck with your Google Search Console setup! 🚀
