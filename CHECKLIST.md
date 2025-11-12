# ✅ Setup Checklist

Use this checklist to ensure you've completed all setup steps.

---

## 📋 **Pre-Setup**

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] Code editor installed (VS Code recommended)
- [ ] Project cloned/downloaded to your computer

---

## 🗄️ **Supabase Setup**

- [ ] Created account at [supabase.com](https://supabase.com)
- [ ] Created new project
- [ ] Saved database password somewhere safe
- [ ] Waited for project to finish initializing (2-3 min)
- [ ] Got Project URL from Settings → API
- [ ] Got Anon Key from Settings → API
- [ ] Got Database URL from Settings → Database
- [ ] Opened SQL Editor
- [ ] Ran SQL script from `SUPABASE_SETUP.md`
- [ ] Saw "Success. No rows returned" message
- [ ] Verified 3 tables in Table Editor:
  - [ ] feedbacks
  - [ ] projects
  - [ ] chat_messages

---

## 🤖 **Gemini API Setup**

- [ ] Visited [Google AI Studio](https://makersuite.google.com/app/apikey)
- [ ] Signed in with Google account
- [ ] Created new API key
- [ ] Copied API key
- [ ] Saved API key somewhere safe

---

## 🔧 **Environment Variables**

- [ ] Opened `.env.local` file in editor
- [ ] Replaced `NEXT_PUBLIC_SUPABASE_URL` with your URL
- [ ] Replaced `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your key
- [ ] Replaced `DATABASE_URL` with your database URL
  - [ ] Replaced `[YOUR-PASSWORD]` in URL with actual password
- [ ] Replaced `GEMINI_API_KEY` with your Gemini key
- [ ] Saved `.env.local` file
- [ ] Double-checked: No extra spaces, no quotes around values

---

## 📦 **Installation**

- [ ] Opened terminal in project folder
- [ ] Ran `npm install`
- [ ] Saw "added XXX packages" message
- [ ] No error messages during installation

---

## ▶️ **Running Locally**

### Main Application
- [ ] Ran `npm run dev` in terminal
- [ ] Saw "Ready in X.Xs" message
- [ ] Opened http://localhost:3000 in browser
- [ ] Home page loads successfully

### AI Chatbot (Optional)
- [ ] Opened new terminal window
- [ ] Navigated to `ai_bot` folder (`cd ai_bot`)
- [ ] Ran `pip install -r requirements.txt`
- [ ] Created `.env` file in ai_bot folder
- [ ] Added `GEMINI_API_KEY=...` to ai_bot/.env
- [ ] Ran `uvicorn app:app --reload --port 8000`
- [ ] Saw "Uvicorn running" message
- [ ] Visited http://localhost:8000 (should see status message)

---

## 🧪 **Testing**

### Pages
- [ ] Home page (/) loads
- [ ] About page (/about) loads
- [ ] Projects page (/projects) loads
- [ ] Feedback page (/feedback) loads
- [ ] Admin page (/admin) loads
- [ ] Thank you page (/thank-you) loads
- [ ] 404 page (visit /random-url) loads

### Features
- [ ] Navigation menu works
- [ ] Mobile menu works (resize browser)
- [ ] Theme toggle works (light/dark)
- [ ] Project cards display correctly
- [ ] Skills section shows all categories

### Functionality
- [ ] Submitted test feedback form
- [ ] Redirected to /thank-you page
- [ ] Feedback appears in /admin dashboard
- [ ] Feedback appears in Supabase Table Editor
- [ ] Chat button appears (bottom left)
- [ ] Chat window opens when clicked
- [ ] Can send message to chatbot
- [ ] Chatbot responds (AI or fallback)

### Responsiveness
- [ ] Tested on desktop view
- [ ] Tested on tablet view (F12 → responsive mode)
- [ ] Tested on mobile view
- [ ] All pages look good on all sizes

---

## 🐛 **Troubleshooting**

### If Something Doesn't Work:

**Supabase Issues:**
- [ ] Checked browser console (F12) for errors
- [ ] Verified environment variables are correct
- [ ] Confirmed tables were created in Supabase
- [ ] Checked Supabase project is active (not paused)

**Chatbot Issues:**
- [ ] Verified GEMINI_API_KEY is set
- [ ] Checked Python server is running (Terminal 2)
- [ ] Tried without AI (fallback responses work)
- [ ] Visited http://localhost:8000/health

**Build/Run Issues:**
- [ ] Deleted node_modules and ran `npm install` again
- [ ] Cleared npm cache: `npm cache clean --force`
- [ ] Checked Node.js version is 18+
- [ ] Restarted development server

**Port Issues:**
- [ ] Killed port 3000: `npx kill-port 3000`
- [ ] Or used different port: `npm run dev -- -p 3001`

---

## 🎯 **Ready for Next Steps**

Once all checkboxes above are ✅, you're ready to:

- [ ] Customize content (projects, about, etc.)
- [ ] Add your actual project links
- [ ] Test all features thoroughly
- [ ] Deploy to Vercel (see `DEPLOYMENT.md`)

---

## 📊 **Verification**

**Everything is working if you can:**

✅ See your portfolio at http://localhost:3000
✅ Navigate between all pages without errors
✅ Submit feedback and see it in admin dashboard
✅ Chat with RameezBot and get responses
✅ Toggle between light and dark themes
✅ View custom 404 page
✅ See all your projects displayed
✅ Admin dashboard shows stats

---

## 📞 **Need Help?**

Stuck on a step? Check these guides:

- **Detailed setup:** `LOCAL_SETUP.md` (step-by-step with explanations)
- **Quick setup:** `QUICK_START.md` (TL;DR for experienced devs)
- **Database setup:** `SUPABASE_SETUP.md` (SQL scripts and RLS policies)
- **Deployment:** `DEPLOYMENT.md` (when ready to go live)

---

**Completion Status:** ___ / 100% ✅

Keep this checklist handy as you work through the setup!
