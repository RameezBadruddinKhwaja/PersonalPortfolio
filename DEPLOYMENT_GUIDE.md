# 🚀 Production Deployment Guide

This guide will help you deploy your portfolio to **Vercel** with the domain **rameez.me**.

---

## ✅ Pre-Deployment Checklist

All these are **DONE**:
- [x] Python bot dependency removed (using RAG chatbot only)
- [x] Vercel Analytics enabled
- [x] Resend email API route created for contact form
- [x] Environment variables updated
- [x] Production build tested successfully
- [x] vercel.json configured

---

## 📋 Step 1: Get Resend API Key (2 minutes)

The contact form needs this to send emails to your Gmail.

1. Go to https://resend.com/signup
2. Sign up with your email
3. Verify your email
4. Go to **API Keys** section
5. Click **Create API Key**
6. Name it: "Portfolio Production"
7. Copy the API key (starts with `re_...`)
8. **Keep it safe** - you'll add it to Vercel later

---

## 📋 Step 2: Update Admin Password (Optional)

If you want to change your admin password:

```bash
node scripts/update-admin-password.js
```

This will:
1. Ask for your new password
2. Generate a hash
3. Show you what to copy to `.env` and Vercel

---

## 🚀 Step 3: Deploy to Vercel

### 3.1 Push Code to GitHub (if not already done)

```bash
git add .
git commit -m "feat: prepare for production deployment"
git push origin master
```

### 3.2 Deploy to Vercel

1. Go to https://vercel.com
2. Click **"Add New Project"**
3. **Import** your GitHub repository: `PersonalPortfolio`
4. Vercel will auto-detect Next.js settings ✅

### 3.3 Configure Environment Variables

**IMPORTANT:** Add these environment variables in Vercel dashboard:

Click **"Environment Variables"** and add:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://yhihzipmecvtvoofhqxh.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (from .env) | Production, Preview, Development |
| `DATABASE_URL` | `postgresql://postgres:...` (from .env) | Production, Preview, Development |
| `GEMINI_API_KEY` | `AIzaSyDG37LPHSTiuf3cAlP2_X9bGLBPIJvBGHw` | Production, Preview, Development |
| `RESEND_API_KEY` | `re_...` (from Step 1) | Production, Preview, Development |
| `JWT_SECRET` | (from .env) | Production, Preview, Development |
| `ADMIN_EMAIL` | `rameezbader@gmail.com` | Production, Preview, Development |
| `ADMIN_PASSWORD_HASH` | (from .env or Step 2) | Production, Preview, Development |

### 3.4 Deploy

Click **"Deploy"** and wait 2-3 minutes.

You'll get a URL like: `https://your-project-name.vercel.app`

---

## 🌐 Step 4: Add Custom Domain (rameez.me)

### 4.1 Add Domain in Vercel

1. Go to your project in Vercel dashboard
2. Click **Settings** → **Domains**
3. Click **"Add Domain"**
4. Enter: `rameez.me`
5. Click **"Add"**

Vercel will show you DNS records to configure.

### 4.2 Configure DNS

Go to where you bought **rameez.me** (GoDaddy/Namecheap/etc):

**Add these DNS records:**

| Type | Name | Value |
|------|------|-------|
| A | @ | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com` |

**Wait 5-60 minutes** for DNS propagation.

### 4.3 Verify Domain

1. Go back to Vercel → Domains
2. You'll see a green checkmark when ready
3. Set `rameez.me` as **primary domain** (optional)

---

## 📧 Step 5: Configure Resend Email Domain

For professional emails from `noreply@rameez.me`:

1. Go to https://resend.com/domains
2. Click **"Add Domain"**
3. Enter: `rameez.me`
4. Copy the DNS records shown
5. Add them to your domain DNS settings

**DNS Records to add:**

| Type | Name | Value |
|------|------|-------|
| TXT | @ | (Resend will show this) |
| MX | @ | (Resend will show this) |
| CNAME | resend._domainkey | (Resend will show this) |

**Wait 10-30 minutes** for verification.

Once verified, update the contact API:

```typescript
// In src/app/api/contact/route.ts line 40
from: "Portfolio Contact <noreply@rameez.me>", // ✅ Now verified!
```

Redeploy or it will work automatically on next deployment.

---

## ✅ Step 6: Post-Deployment Verification

Test everything works:

### Test Checklist:

- [ ] Website loads at `https://rameez.me`
- [ ] Admin login works (`/admin/login`)
- [ ] Chatbot responds (test on homepage)
- [ ] Contact form sends emails to `rameezbader@gmail.com`
- [ ] Feedback form saves to Supabase
- [ ] Projects page loads
- [ ] About page loads
- [ ] Accomplishments page loads
- [ ] All images load correctly
- [ ] Mobile responsive design works

### Check Analytics:

1. Go to Vercel dashboard
2. Click **"Analytics"** tab
3. You should see page views tracking automatically

---

## 🔧 Optional: Upstash Redis (Rate Limiting)

For better rate limiting (currently using in-memory):

1. Go to https://upstash.com
2. Sign up (free tier)
3. Create a **Redis database**
4. Copy:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
5. Add to Vercel environment variables
6. Update `src/lib/rate-limit.ts` to use Upstash

**This is optional** - current rate limiting works fine without it.

---

## 🎉 You're Live!

Your portfolio is now live at:
- `https://rameez.me`
- `https://www.rameez.me`

### What's Working:

✅ **RAG-powered AI Chatbot** (Gemini + Supabase vector search)
✅ **Contact Form** (sends to rameezbader@gmail.com via Resend)
✅ **Feedback System** (saves to Supabase)
✅ **Admin Dashboard** (protected with JWT auth)
✅ **CMS** (update content without code)
✅ **Vercel Analytics** (track visitors)
✅ **Rate Limiting** (prevent spam)
✅ **SEO Optimized** (metadata, sitemap, robots.txt)
✅ **Mobile Responsive**

---

## 🐛 Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Check Vercel build logs for specific errors

### Chatbot Not Working
- Verify `GEMINI_API_KEY` is set in Vercel
- Check Supabase is accessible (database not paused)

### Contact Form Not Sending Emails
- Verify `RESEND_API_KEY` is correct
- Check Resend domain is verified
- Look at Vercel function logs

### Domain Not Working
- Wait 30-60 minutes for DNS propagation
- Use https://dnschecker.org to verify DNS records
- Clear browser cache

---

## 📝 Future Enhancements

Consider adding later:
- [ ] Upstash Redis for persistent rate limiting
- [ ] Sentry for error tracking
- [ ] Google Search Console verification
- [ ] Blog section with MDX
- [ ] Newsletter signup
- [ ] More social auth options (Google, GitHub)

---

## 📞 Support

If you run into issues:
1. Check Vercel build/function logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Test locally with `npm run build` first

---

**Congratulations! Your portfolio is production-ready! 🎊**
