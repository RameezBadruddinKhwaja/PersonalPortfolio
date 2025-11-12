# 🚀 Local Setup Guide - Complete Installation

**Portfolio with All Features:** RAG AI Chatbot, JWT Auth, CMS, Analytics & Security

This guide walks you through setting up the project locally with all Phase 1-5 features enabled.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ and npm installed
- **Git** installed
- **Supabase account** (free tier works)
- **Google Gemini API key** (free tier available)
- Code editor (VS Code recommended)

---

## 🔧 Step 1: Clone and Install

### 1.1 Clone the Repository

```bash
git clone <your-repo-url>
cd PersonalPortfolio
```

### 1.2 Install Dependencies

```bash
npm install
```

**Expected output:** All dependencies installed (may see font warnings - safe to ignore)

---

## 🗄️ Step 2: Database Setup (Supabase)

### 2.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - **Name:** PersonalPortfolio (or your choice)
   - **Database Password:** Save this securely!
   - **Region:** Choose closest to you
4. Wait for project to be ready (~2 minutes)

### 2.2 Get Database Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJ...`)
   - **Project API settings** → **Database URL** (Connection string)

### 2.3 Run Database Migrations

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the contents of `Documentation/SUPABASE_MIGRATION_PHASE3.sql`
4. Paste and click **RUN**
5. Wait for success message
6. Repeat for `Documentation/SUPABASE_MIGRATION_PHASE4.sql`

**What this creates:**
- ✅ ChatSession, ChatMessage tables (Phase 3)
- ✅ AICorrection, KnowledgeBase tables (Phase 3)
- ✅ Enhanced Project table (Phase 4)
- ✅ CMSContent table (Phase 4)
- ✅ Analytics table (Phase 4)
- ✅ All indexes and RLS policies

---

## 🤖 Step 3: AI Configuration (Google Gemini)

### 3.1 Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)

**Free Tier Limits:**
- 60 requests per minute
- Sufficient for development and moderate production use

### 3.2 Test API Key (Optional)

```bash
curl -H 'Content-Type: application/json' \
     -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' \
     -X POST 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY'
```

Should return a JSON response with generated content.

---

## 🔐 Step 4: Authentication Setup

### 4.1 Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output (128-character hex string).

### 4.2 Create Admin Password Hash

```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YourStrongPassword123!', 10, (e,h) => console.log(h))"
```

Replace `YourStrongPassword123!` with your desired admin password.
Copy the output hash (starts with `$2a$10$...`).

---

## 📝 Step 5: Environment Variables

### 5.1 Create `.env.local` File

Create a file named `.env.local` in the project root:

```env
# ======================
# DATABASE (Supabase)
# ======================
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres

# ======================
# AI (Google Gemini)
# ======================
GEMINI_API_KEY=AIzaSy...

# ======================
# AUTHENTICATION
# ======================
JWT_SECRET=your-128-character-hex-from-step-4.1
ADMIN_EMAIL=admin@rameez.dev
ADMIN_PASSWORD_HASH=$2a$10$... (from step 4.2)

# ======================
# OPTIONAL: Rate Limiting (Upstash Redis)
# ======================
# UPSTASH_REDIS_REST_URL=
# UPSTASH_REDIS_REST_TOKEN=

# ======================
# OPTIONAL: Email Notifications (Resend)
# ======================
# RESEND_API_KEY=

# ======================
# OPTIONAL: Python AI Bot Fallback
# ======================
# NEXT_PUBLIC_AI_BOT_URL=http://localhost:8000
```

### 5.2 Replace Placeholder Values

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL` → Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Your Supabase anon key
- `DATABASE_URL` → Your Supabase database connection string
- `GEMINI_API_KEY` → Your Gemini API key
- `JWT_SECRET` → Generated in step 4.1
- `ADMIN_PASSWORD_HASH` → Generated in step 4.2

**Optional (can leave commented):**
- Upstash Redis (for distributed rate limiting)
- Resend API (for email notifications)
- Python AI Bot URL

---

## 🌱 Step 6: Initialize Knowledge Base

### 6.1 Prepare Knowledge Data

The knowledge base contains information about you that the RAG chatbot uses.

1. Open `src/lib/rag/knowledge-base.ts`
2. Review the sample knowledge array (around line 70-100)
3. Customize with your own information:
   - About me
   - Skills & experience
   - Projects
   - Education
   - Contact preferences

**Example:**
```typescript
const sampleKnowledge = [
  {
    content: "Rameez Bader Khwaja is a full-stack developer specializing in Next.js, TypeScript, and AI integration.",
    category: "about",
  },
  {
    content: "Skills: React, Next.js, TypeScript, Python, TensorFlow, RAG, PostgreSQL, Docker",
    category: "skills",
  },
  // Add more...
]
```

### 6.2 Initialize the Knowledge Base

After starting the dev server (step 7), run:

```bash
curl -X POST http://localhost:3000/api/knowledge/init
```

**Expected response:**
```json
{
  "success": true,
  "message": "Knowledge base initialized with X items",
  "count": X
}
```

**What this does:**
- Generates vector embeddings for each knowledge item
- Stores in Supabase knowledge_base table
- Enables semantic search for chatbot

---

## 🏃 Step 7: Run Development Server

### 7.1 Start the Server

```bash
npm run dev
```

**Expected output:**
```
> personal-portfolio@0.1.0 dev
> next dev

  ▲ Next.js 16.x.x
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

✓ Ready in 2.5s
```

### 7.2 Open in Browser

Navigate to: [http://localhost:3000](http://localhost:3000)

**You should see:**
- ✅ Portfolio homepage with green theme
- ✅ 3D energy ring animation
- ✅ All sections (Hero, About, Projects, Skills, Contact)

---

## ✅ Step 8: Test Each Feature

### 8.1 Test Admin Login (Phase 2)

1. Navigate to: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Enter credentials:
   - **Email:** `admin@rameez.dev`
   - **Password:** (the password you used in step 4.2)
3. Click "Sign In"
4. Should redirect to `/admin` dashboard

**Troubleshooting:**
- "Invalid credentials" → Check ADMIN_PASSWORD_HASH in `.env.local`
- "JWT error" → Check JWT_SECRET is set correctly

### 8.2 Test Rate Limiting (Phase 2)

1. Open browser console (F12)
2. Go to Contact section
3. Submit feedback form 10+ times rapidly
4. After 10 requests, should see "Too many requests" error

**Expected behavior:**
- First 10 requests: Success
- 11th+ request: 429 status with "Too Many Requests"

### 8.3 Test RAG Chatbot (Phase 3)

**Prerequisites:** Knowledge base initialized (step 6.2)

1. Navigate to homepage
2. Find chatbot component (usually bottom right or dedicated section)
3. Type: "What are Rameez's skills?"
4. Send message

**Expected response:**
- Should use information from knowledge base
- Response should be contextually accurate
- Check browser console for method used: `"method": "rag"`

**Test fallback:**
1. Temporarily remove GEMINI_API_KEY from `.env.local`
2. Restart server
3. Send message
4. Should get generic fallback response

### 8.4 Test Project CRUD (Phase 4)

**Prerequisites:** Logged in as admin (step 8.1)

1. Go to `/admin` dashboard
2. Navigate to Projects section
3. Click "Add New Project"
4. Fill in:
   - **Title:** Test Project
   - **Description:** Testing CRUD operations
   - **Tech:** `["Next.js", "TypeScript"]`
   - **Live URL:** https://example.com
5. Submit

**Expected result:**
- Project appears in list
- Can edit
- Can delete
- Can reorder

**API Test:**
```bash
# GET all projects
curl http://localhost:3000/api/projects

# Should return JSON array of projects
```

### 8.5 Test CMS (Phase 4)

**Prerequisites:** Logged in as admin

1. In admin dashboard, go to CMS section
2. Create new content:
   - **Key:** `test.greeting`
   - **Value:** `Hello from CMS!`
   - **Category:** `test`
   - **Type:** `text`
3. Submit

**Expected result:**
- Content saved successfully
- Can retrieve via API

**API Test:**
```bash
# GET content by key
curl http://localhost:3000/api/cms?key=test.greeting

# Should return your greeting
```

### 8.6 Test Analytics (Phase 4)

Analytics tracks automatically when pages are visited.

1. Open browser console (F12)
2. Navigate to different pages on the site
3. Check Network tab → filter by "analytics"
4. Should see POST requests to `/api/analytics`

**View analytics data:**
1. Go to `/admin` (logged in as admin)
2. Navigate to Analytics section
3. Should see:
   - Total page views
   - Device breakdown (mobile/desktop/tablet)
   - Page visit counts
   - Referrer information

**API Test:**
```bash
# POST track a visit
curl -X POST http://localhost:3000/api/analytics \
  -H "Content-Type: application/json" \
  -d '{"page": "/test", "referrer": "https://google.com"}'

# Should return {"success": true}
```

### 8.7 Test Security Headers (Phase 5)

1. Open browser DevTools (F12)
2. Go to Network tab
3. Reload page
4. Click on the document request (first one)
5. View Response Headers

**Should see:**
- ✅ `Strict-Transport-Security: max-age=63072000`
- ✅ `X-Frame-Options: SAMEORIGIN`
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-XSS-Protection: 1; mode=block`
- ✅ `Referrer-Policy: origin-when-cross-origin`
- ✅ `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### 8.8 Test Input Sanitization (Phase 5)

1. Try submitting feedback with HTML:
   - Message: `<script>alert('xss')</script>Hello`
2. Check database (Supabase → Table Editor → feedback)
3. Should see sanitized version (HTML escaped)

**Expected in database:**
```
&lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;Hello
```

---

## 🔍 Step 9: Verify Everything Works

### 9.1 Build for Production

```bash
npm run build
```

**Expected output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                   xxx kB        xxx kB
├ ○ /admin                              xxx kB        xxx kB
└ ○ /admin/login                        xxx kB        xxx kB

○  (Static)  prerendered as static content

✓ Build completed successfully
```

**Note:** Font warnings are safe to ignore (network issue, fonts still work).

### 9.2 Run Production Build Locally

```bash
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) and test all features again.

---

## 🚨 Troubleshooting

### Issue: "Failed to fetch fonts from Google Fonts" (Build Error)

**Symptoms:**
```
Failed to fetch `Inter` from Google Fonts.
Failed to fetch `Poppins` from Google Fonts.
Build error with 403 or TLS errors
```

**Cause:** Network restrictions, firewall, or environment blocking Google Fonts at build time.

**Quick Fix:** Use system fonts instead (no Google Fonts needed)

See `FONT_LOADING_FIX.md` for detailed solutions. Quick fix:

1. Edit `src/app/layout.tsx`
2. Remove the font import lines (lines 2, 10-19)
3. Update body className to remove `inter.variable` and `poppins.variable`
4. Run `npm run build` again

The site will use high-quality system fonts (same as GitHub, Twitter, etc.).

**Note:** This is an environment issue, not a code issue. On Vercel or other platforms, Google Fonts will work fine.

---

### Issue: "Module not found: @/lib/supabase/client"

**Solution:**
```bash
# Ensure file exists at src/lib/supabase/client.ts
# If missing, create it:
mkdir -p src/lib/supabase
```

Then create `src/lib/supabase/client.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Issue: "GEMINI_API_KEY is not defined"

**Solution:**
1. Check `.env.local` has the key
2. Restart dev server (`Ctrl+C` then `npm run dev`)
3. Verify key is correct (test with curl from step 3.2)

### Issue: "Database connection failed"

**Solution:**
1. Check DATABASE_URL format: `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres`
2. Ensure password is URL-encoded (spaces = `%20`, special chars escaped)
3. Test connection in Supabase dashboard

### Issue: "JWT verification failed"

**Solution:**
1. Delete all cookies for localhost:3000
2. Clear browser cache
3. Generate new JWT_SECRET
4. Restart server
5. Login again

### Issue: "Knowledge base initialization fails"

**Solution:**
1. Check GEMINI_API_KEY is valid
2. Ensure knowledge_base table exists (run Phase 3 migration)
3. Check Gemini API quota (60 req/min limit)
4. Try again after 1 minute

### Issue: Rate limiting not working

**Solution:**
- In-memory rate limiting resets on server restart (expected)
- For persistent rate limiting, set up Upstash Redis (optional)

### Issue: "ChatMessage table not found"

**Solution:**
1. Run Phase 3 migration SQL in Supabase
2. Check table exists: Supabase → Table Editor → chat_messages
3. If missing, re-run migration

---

## 📚 Feature Overview

### What You Have Now

#### Phase 1: Foundation ✅
- Professional green theme (#0fa15d, #00d97e)
- Interactive 3D energy ring (Three.js)
- Responsive design
- Dark/light mode

#### Phase 2: Security & Auth ✅ (70%)
- JWT authentication with HTTP-only cookies
- Admin login page
- Protected routes via middleware
- Rate limiting (feedback, chat, login, API)

#### Phase 3: AI Enhancement ✅
- **RAG (Retrieval Augmented Generation)** chatbot
- Vector embeddings with Gemini
- Knowledge base with semantic search
- Chat session management
- AI correction system
- Context-aware responses

#### Phase 4: CMS & Analytics ✅
- Dynamic content management (CMS)
- Project CRUD operations
- Privacy-focused analytics tracking
- Device detection
- Referrer tracking

#### Phase 5: Security & Polish ✅
- Production security headers
- Input sanitization utilities
- XSS protection
- SQL injection prevention

---

## 🎯 Next Steps

### Option 1: Development
Continue building features locally:
- Add blog section
- Implement newsletter
- Create testimonials system
- Add more AI features

### Option 2: Deploy to Production
Ready to deploy! See `DEPLOYMENT.md` for:
- Vercel deployment steps
- Environment variable setup
- Domain configuration
- Post-deployment testing

### Option 3: Complete Phase 2 (100%)
Implement remaining Phase 2 features:
- Email notifications via Resend
- Dashboard charts with Recharts

---

## 📖 Documentation Reference

| File | Purpose |
|------|---------|
| `README.md` | Project overview |
| `LOCAL_SETUP_GUIDE.md` | This file |
| `DEPLOYMENT.md` | Production deployment |
| `ALL_PHASES_COMPLETE.md` | Complete feature list |
| `IMPLEMENTATION_STATUS.md` | Development timeline |
| `ADVANCED_ROADMAP.md` | Original 10-week plan |
| `ADVANCED_SUGGESTIONS.md` | Future feature ideas |

---

## 💡 Tips for Development

### 1. Database Inspection
Use Supabase dashboard to view data in real-time:
- **Table Editor:** See all records
- **SQL Editor:** Run custom queries
- **Database:** View schema

### 2. API Testing
Use curl or Postman:
```bash
# Test chat endpoint
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!", "useRAG": true}'

# Test analytics
curl -X POST http://localhost:3000/api/analytics \
  -H "Content-Type: application/json" \
  -d '{"page": "/", "referrer": "direct"}'
```

### 3. Monitoring Logs
Watch server logs:
```bash
npm run dev

# In another terminal, tail logs:
tail -f .next/trace
```

### 4. Prisma Studio (Alternative DB Viewer)
```bash
npx prisma studio
```
Opens GUI at http://localhost:5555 to view/edit database.

---

## 🎉 Success!

You now have a fully functional, production-ready portfolio with:
- ✅ AI-powered RAG chatbot
- ✅ Secure authentication
- ✅ Content management system
- ✅ Analytics tracking
- ✅ Enterprise-level security
- ✅ Beautiful 3D UI

**Happy coding!** 🚀

---

**Need Help?**
- Check `ALL_PHASES_COMPLETE.md` for feature details
- Review API endpoints in respective `route.ts` files
- Test individual components in isolation
- Use browser DevTools for debugging

**Built with ❤️ using Next.js 16, TypeScript, and AI**
