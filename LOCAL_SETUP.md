# 🚀 Local Setup Guide - Step by Step

Follow this guide to get your portfolio running on your local machine.

---

## ✅ **Prerequisites Checklist**

Before starting, make sure you have:

- [ ] **Node.js 18+** installed ([Download here](https://nodejs.org/))
- [ ] **Git** installed
- [ ] **Code editor** (VS Code recommended)
- [ ] **Terminal/Command Prompt** access
- [ ] **Internet connection** (for API keys and package installation)

---

## 📋 **Step 1: Verify Node.js Installation**

Open your terminal and run:

```bash
node --version
# Should show v18.x.x or higher

npm --version
# Should show 9.x.x or higher
```

If not installed, download from [nodejs.org](https://nodejs.org/)

---

## 📁 **Step 2: Navigate to Project Directory**

```bash
cd /path/to/PersonalPortfolio

# Or if you just cloned:
git clone https://github.com/RameezBadruddinKhwaja/PersonalPortfolio.git
cd PersonalPortfolio
```

---

## 📦 **Step 3: Install Dependencies**

```bash
npm install
```

**Wait for installation to complete** (usually 1-2 minutes)

You should see output like:
```
added 347 packages, and audited 348 packages in 45s
```

---

## 🗄️ **Step 4: Set Up Supabase (Database)**

### 4.1 Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign up"**
3. Sign up with GitHub (recommended) or email

### 4.2 Create New Project

1. Click **"New Project"**
2. Fill in details:
   - **Name:** `rameez-portfolio` (or any name you like)
   - **Database Password:** Create a strong password (SAVE THIS!)
   - **Region:** Choose closest to you (e.g., `Asia Pacific (Mumbai)` for Pakistan)
   - **Pricing Plan:** Free tier is fine
3. Click **"Create new project"**
4. **Wait 2-3 minutes** for project to be ready

### 4.3 Get Your Credentials

Once project is ready:

**A. Get Project URL:**
1. In Supabase dashboard, go to **Settings** (gear icon) → **API**
2. Under **Project URL**, copy the URL
   - It looks like: `https://xxxxxxxxxx.supabase.co`

**B. Get Anon Key:**
1. Same page, scroll to **Project API keys**
2. Copy the `anon` `public` key
   - It's a long string starting with `eyJ...`

**C. Get Database URL:**
1. Go to **Settings** → **Database**
2. Scroll to **Connection string** → **URI**
3. Click **"Copy"**
4. **IMPORTANT:** Replace `[YOUR-PASSWORD]` with your actual database password
   - Example: `postgresql://postgres:YOUR_PASSWORD_HERE@db.xxx.supabase.co:5432/postgres`

### 4.4 Create Database Tables

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy and paste this SQL:

```sql
-- Create feedbacks table
CREATE TABLE IF NOT EXISTS feedbacks (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  profession TEXT,
  country TEXT,
  linkedin TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech TEXT[] NOT NULL,
  live TEXT,
  repo TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_message TEXT NOT NULL,
  bot_reply TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_feedbacks_created_at ON feedbacks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC);

-- Enable Row Level Security
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access to feedbacks"
  ON feedbacks FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read access to feedbacks"
  ON feedbacks FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access to chat_messages"
  ON chat_messages FOR INSERT
  WITH CHECK (true);
```

4. Click **"Run"** (or press `Ctrl+Enter`)
5. You should see: **Success. No rows returned**

### 4.5 Verify Tables Were Created

1. Go to **Table Editor** (left sidebar)
2. You should see 3 tables:
   - `feedbacks`
   - `projects`
   - `chat_messages`

✅ **Supabase setup complete!**

---

## 🤖 **Step 5: Get Gemini API Key (For AI Chatbot)**

### 5.1 Create Google AI Studio Account

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Click **"Create API key in new project"** (or select existing project)
5. Copy the generated API key
   - It looks like: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX`

⚠️ **Important:** Keep this key secret! Don't share it publicly.

---

## 🔧 **Step 6: Configure Environment Variables**

### 6.1 Create .env.local File

In your project root folder, you already have `.env.local` file. Open it:

```bash
# Open in VS Code
code .env.local

# Or use any text editor
notepad .env.local  # Windows
nano .env.local     # Mac/Linux
```

### 6.2 Fill in Your Credentials

Replace the placeholder values with your actual credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxxxxxxx.supabase.co:5432/postgres

# Gemini API Key (for AI Chatbot)
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX

# AI Bot Backend URL (keep as is for now)
NEXT_PUBLIC_AI_BOT_URL=http://localhost:8000

# Optional - can leave empty for now
ADMIN_PASSWORD=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

### 6.3 Save the File

**Important:**
- Make sure there are **no spaces** around the `=` sign
- Don't use quotes around values
- Save the file

---

## ▶️ **Step 7: Run the Development Server**

### 7.1 Start Next.js Server

In your terminal:

```bash
npm run dev
```

You should see:

```
  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 2.5s
```

### 7.2 Open in Browser

Open your browser and go to:
```
http://localhost:3000
```

You should see your portfolio home page! 🎉

---

## 🤖 **Step 8: (Optional) Run AI Chatbot**

The chatbot will work with fallback responses even without this step, but to enable AI responses:

### 8.1 Install Python Dependencies

Open a **NEW terminal window** (keep the first one running) and run:

```bash
# Navigate to ai_bot folder
cd ai_bot

# Install Python packages
pip install -r requirements.txt
```

### 8.2 Configure AI Bot Environment

```bash
# Create .env file in ai_bot folder
cp .env.example .env

# Open and edit it
code .env  # or notepad .env
```

Add your Gemini API key:
```env
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 8.3 Run the AI Bot

```bash
# Make sure you're in ai_bot folder
uvicorn app:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

Now your chatbot will use AI responses! 🤖

---

## ✅ **Step 9: Test Everything**

### Test Checklist:

1. **Home Page** - http://localhost:3000
   - [ ] Hero section loads
   - [ ] Animations work
   - [ ] Buttons are clickable

2. **About Page** - http://localhost:3000/about
   - [ ] Skills, education sections load
   - [ ] Timeline displays correctly

3. **Projects Page** - http://localhost:3000/projects
   - [ ] Project cards display
   - [ ] Tech badges show

4. **Feedback Form** - http://localhost:3000/feedback
   - [ ] Form loads
   - [ ] Try submitting test feedback
   - [ ] Should redirect to /thank-you

5. **Admin Dashboard** - http://localhost:3000/admin
   - [ ] Stats cards show (might show 0s if no data)
   - [ ] Feedback list loads
   - [ ] If you submitted test feedback, it should appear here

6. **Chatbot**
   - [ ] Click chat button (bottom left)
   - [ ] Send a message
   - [ ] Get a response

7. **Theme Toggle**
   - [ ] Click sun/moon icon (top right)
   - [ ] Theme should switch

8. **404 Page**
   - [ ] Visit http://localhost:3000/random-page
   - [ ] Should show custom 404

---

## 🐛 **Troubleshooting**

### Problem: "npm install" fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Try again
npm install
```

### Problem: "Cannot find package 'eslint'"

**Solution:**
```bash
npm install --save-dev eslint eslint-config-next
```

### Problem: Supabase connection error

**Check:**
- [ ] Environment variables are correct (no typos)
- [ ] No extra spaces in .env.local
- [ ] Supabase project is active (check dashboard)
- [ ] You ran the SQL to create tables

**Test connection:**
```bash
# In browser console on any page
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
# Should show your Supabase URL
```

### Problem: Feedback form not saving

**Check:**
1. Go to Supabase dashboard → **Table Editor** → **feedbacks**
2. Try submitting feedback again
3. Refresh the table - data should appear
4. If not, check browser console for errors (F12)

### Problem: Chatbot not responding

**Two scenarios:**

**A. Without AI bot running:**
- Should get fallback responses like "Hello! I'm RameezBot..."
- This is expected and works fine

**B. With AI bot running:**
- Check http://localhost:8000 in browser
- Should see: `{"status": "RameezBot is running!"}`
- If not, make sure Python server is running

### Problem: Port 3000 already in use

**Solution:**
```bash
# Kill the process
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
# Then open http://localhost:3001
```

### Problem: Dark mode not working

**Solution:**
- Clear browser cache
- Check if theme toggle button appears in nav
- Try switching themes manually

---

## 📊 **Verify Database Tables**

After submitting test feedback, verify it's saved:

1. Go to Supabase dashboard
2. Click **Table Editor** → **feedbacks**
3. You should see your test entry

**Screenshot example:**
```
| id  | name          | email             | message      | created_at |
|-----|---------------|-------------------|--------------|------------|
| xxx | Test User     | test@example.com  | Test message | 2024-...   |
```

---

## 🔍 **Check if Everything is Working**

Run this quick check:

```bash
# 1. Check if server is running
curl http://localhost:3000
# Should return HTML

# 2. Check if API routes work
curl http://localhost:3000/api/feedback
# Should return error (because GET is not allowed)

# 3. Check if AI bot is running (if you started it)
curl http://localhost:8000/health
# Should return: {"status":"healthy","gemini_api":"configured"}
```

---

## 📝 **Quick Reference**

### Start Development:
```bash
# Terminal 1 - Main app
npm run dev

# Terminal 2 - AI bot (optional)
cd ai_bot
uvicorn app:app --reload
```

### Stop Servers:
```
Press Ctrl+C in each terminal
```

### Restart After Changes:
Changes to most files auto-reload.

Restart needed for:
- `.env.local` changes
- `package.json` changes
- Config file changes

---

## ✅ **Success Checklist**

You're all set when you can:

- [x] See portfolio at http://localhost:3000
- [x] Navigate between pages
- [x] Submit feedback form
- [x] See feedback in admin dashboard
- [x] Chat with RameezBot
- [x] Toggle dark/light theme
- [x] See custom 404 page

---

## 🎯 **Next Steps**

Once everything works locally:

1. **Add Your Content**
   - Update projects in `src/lib/data/projects.ts`
   - Add your actual project URLs

2. **Test Thoroughly**
   - Try all features
   - Test on mobile view (F12 → Device toolbar)

3. **Deploy to Vercel**
   - Follow `DEPLOYMENT.md` guide
   - Add environment variables in Vercel

4. **Get a Custom Domain**
   - Buy `rameez.tech` or similar
   - Configure in Vercel

---

## 🆘 **Need Help?**

If you get stuck:

1. **Check browser console** (F12) for errors
2. **Check terminal** for error messages
3. **Verify environment variables** are correct
4. **Check Supabase dashboard** for database issues
5. **Review this guide** step by step

**Common mistakes:**
- Forgetting to create Supabase tables
- Wrong environment variable format
- Not saving .env.local after editing
- Supabase project not fully initialized

---

**You're ready to go! 🚀**

If you followed all steps, your portfolio should be running perfectly on http://localhost:3000

Happy coding! 💻
