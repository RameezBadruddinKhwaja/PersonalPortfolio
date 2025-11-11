# Deployment Guide

This guide walks you through deploying your portfolio to production.

## Prerequisites Checklist

Before deploying, ensure you have:

- [x] Supabase project created and database tables set up (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md))
- [x] Gemini API key obtained from [Google AI Studio](https://makersuite.google.com/app/apikey)
- [x] GitHub repository created and code pushed
- [x] Vercel account created at [vercel.com](https://vercel.com)

## Step 1: Deploy Frontend to Vercel

### 1.1 Push Code to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "feat: complete portfolio website with AI chatbot integration"

# Push to main branch
git push origin main
```

### 1.2 Import Project to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your `PersonalPortfolio` repository
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

### 1.3 Add Environment Variables

In Vercel dashboard, go to **Settings → Environment Variables** and add:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Production, Preview, Development |
| `DATABASE_URL` | Your Supabase database URL | Production, Preview, Development |
| `GEMINI_API_KEY` | Your Gemini API key | Production, Preview, Development |
| `NEXT_PUBLIC_AI_BOT_URL` | `https://your-ai-bot-url.onrender.com` (or localhost for dev) | Production, Preview, Development |

### 1.4 Deploy

Click **Deploy** and wait for the build to complete (usually 1-2 minutes).

Your site will be live at: `https://your-project-name.vercel.app`

## Step 2: Deploy AI Chatbot Backend

You have three options for deploying the Python FastAPI chatbot:

### Option A: Deploy to Render.com (Recommended - Free Tier Available)

1. Go to [render.com](https://render.com) and sign up
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `rameezbot-api`
   - **Root Directory:** `./`
   - **Build Command:** `pip install -r ai_bot/requirements.txt`
   - **Start Command:** `uvicorn ai_bot.app:app --host 0.0.0.0 --port $PORT`
   - **Instance Type:** Free (or paid for better performance)

5. Add Environment Variable:
   - `GEMINI_API_KEY`: Your Gemini API key

6. Click **Create Web Service**

7. Once deployed, copy the URL (e.g., `https://rameezbot-api.onrender.com`)

8. Go back to Vercel → **Settings → Environment Variables**
   - Update `NEXT_PUBLIC_AI_BOT_URL` to your Render URL
   - Redeploy your Vercel app

### Option B: Deploy to Railway.app

1. Go to [railway.app](https://railway.app)
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your repository
4. Add environment variable: `GEMINI_API_KEY`
5. Configure:
   - **Start Command:** `uvicorn ai_bot.app:app --host 0.0.0.0 --port $PORT`
6. Deploy and copy the generated URL
7. Update `NEXT_PUBLIC_AI_BOT_URL` in Vercel

### Option C: Deploy as Vercel Serverless Function (Advanced)

See [Vercel Python documentation](https://vercel.com/docs/functions/serverless-functions/runtimes/python) for deploying Python functions on Vercel.

## Step 3: Configure Custom Domain (Optional)

### 3.1 Purchase Domain

Buy a domain from:
- [Namecheap](https://www.namecheap.com/) - Recommended: `rameez.tech` or `rameezbader.me`
- [Google Domains](https://domains.google/)
- [Cloudflare](https://www.cloudflare.com/products/registrar/)

### 3.2 Add Domain to Vercel

1. In Vercel dashboard, go to **Settings → Domains**
2. Click **Add Domain**
3. Enter your domain name (e.g., `rameez.tech`)
4. Follow the DNS configuration instructions
5. Add the provided DNS records to your domain registrar
6. Wait for DNS propagation (can take up to 48 hours, usually 15 minutes)

### 3.3 Update Metadata Base URL

After your custom domain is configured, update `src/app/layout.tsx`:

```typescript
metadataBase: new URL("https://rameez.tech"), // Your actual domain
```

Commit and push the changes to trigger a redeployment.

## Step 4: Post-Deployment Checklist

After deployment, verify everything works:

- [ ] Visit your deployed URL
- [ ] Test dark/light mode toggle
- [ ] Navigate through all pages (Home, About, Projects, Feedback)
- [ ] Submit a test feedback form
- [ ] Check Supabase database to see if feedback was stored
- [ ] Open RameezBot chatbot and send a message
- [ ] Test chatbot responses
- [ ] Check responsiveness on mobile (use browser dev tools)
- [ ] Verify all links work (GitHub, LinkedIn, email)
- [ ] Check /admin dashboard loads
- [ ] Test SEO: Open Graph preview at [metatags.io](https://metatags.io/)

## Step 5: Enable Analytics (Optional but Recommended)

### Vercel Analytics

1. In Vercel dashboard, go to **Analytics**
2. Click **Enable Analytics**
3. Install analytics package:
```bash
npm install @vercel/analytics
```

4. Add to `src/app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

5. Commit and redeploy

### Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your property (domain)
3. Verify ownership via DNS or HTML file
4. Submit your sitemap: `https://yourdomain.com/sitemap.xml`

## Step 6: Monitoring & Maintenance

### Monitor Errors

- Check Vercel **Functions** tab for API route errors
- Check Render/Railway logs for chatbot errors
- Monitor Supabase **Logs** for database issues

### Keep Dependencies Updated

```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Update Next.js to latest
npm install next@latest react@latest react-dom@latest
```

## Troubleshooting

### Build Fails on Vercel

- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Try building locally: `npm run build`
- Check for TypeScript errors: `npm run lint`

### Chatbot Not Responding

- Verify `NEXT_PUBLIC_AI_BOT_URL` is correct
- Check chatbot deployment logs
- Test chatbot directly: `curl https://your-bot-url.com/health`
- Verify `GEMINI_API_KEY` is set in chatbot environment

### Feedback Form Not Saving

- Check browser console for errors
- Verify Supabase environment variables
- Check Supabase RLS (Row Level Security) policies
- Test API route: `POST https://yourdomain.com/api/feedback`

### Database Connection Issues

- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check Supabase project status
- Verify your IP isn't blocked (if using Prisma directly)

## Performance Optimization Tips

1. **Enable Vercel Edge Config** for faster global response times
2. **Use Vercel Image Optimization** for images (already enabled with `next/image`)
3. **Enable Compression** (Vercel does this automatically)
4. **Add CDN caching headers** for static assets
5. **Monitor Web Vitals** in Vercel Analytics

## Security Best Practices

- ✅ Never commit `.env.local` to git
- ✅ Rotate API keys periodically
- ✅ Enable Supabase RLS (Row Level Security)
- ✅ Use HTTPS only (Vercel enforces this)
- ✅ Implement rate limiting for API routes
- ✅ Regularly update dependencies
- ✅ Monitor for vulnerabilities: `npm audit`

## Next Steps

- Set up automated backups for Supabase
- Implement email notifications for new feedback
- Add admin authentication
- Set up CI/CD with GitHub Actions
- Configure preview deployments for testing

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Production Checklist](https://supabase.com/docs/guides/platform/going-into-prod)
- [Render Documentation](https://render.com/docs)

---

**Need Help?**
- Check Vercel Support: [vercel.com/support](https://vercel.com/support)
- Join Vercel Discord: [vercel.com/discord](https://vercel.com/discord)
- Supabase Discord: [discord.supabase.com](https://discord.supabase.com/)
