# ⚡ Quick Start - TL;DR Version

For experienced developers who want to get started fast.

---

## 🚀 **One-Minute Setup**

```bash
# 1. Install dependencies
npm install

# 2. Set up environment (see details below)
cp .env.example .env.local
# Edit .env.local with your credentials

# 3. Run development server
npm run dev

# 4. (Optional) Run AI bot
cd ai_bot
pip install -r requirements.txt
uvicorn app:app --reload
```

Visit: **http://localhost:3000**

---

## 🔑 **Required Credentials**

### Get These First:

1. **Supabase** ([supabase.com](https://supabase.com))
   - Create project
   - Get: `Project URL` + `Anon Key` + `Database URL`
   - Run SQL from `SUPABASE_SETUP.md`

2. **Gemini API** ([makersuite.google.com](https://makersuite.google.com/app/apikey))
   - Create API key
   - Free tier available

---

## 📝 **Environment Variables (.env.local)**

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
DATABASE_URL=postgresql://postgres:PASSWORD@db.xxx.supabase.co:5432/postgres
GEMINI_API_KEY=AIza...

# Optional
NEXT_PUBLIC_AI_BOT_URL=http://localhost:8000
```

---

## 🗄️ **Database Setup (Supabase)**

1. Go to **SQL Editor** in Supabase
2. Run the SQL from `SUPABASE_SETUP.md`
3. Verify tables in **Table Editor**:
   - `feedbacks`
   - `projects`
   - `chat_messages`

---

## ✅ **Test Checklist**

- [ ] http://localhost:3000 - Home loads
- [ ] http://localhost:3000/about - About page
- [ ] http://localhost:3000/projects - Projects page
- [ ] http://localhost:3000/feedback - Submit test feedback
- [ ] http://localhost:3000/admin - See feedback in admin
- [ ] Chat button works (bottom left)
- [ ] Theme toggle works (top right)

---

## 🐛 **Common Issues**

| Issue | Solution |
|-------|----------|
| Port 3000 busy | `npx kill-port 3000` |
| Supabase error | Check env vars, verify tables created |
| Chatbot not working | Check `GEMINI_API_KEY`, or ignore (fallback works) |
| npm install fails | `npm cache clean --force && rm -rf node_modules` |

---

## 📚 **Full Guides**

- **Detailed setup:** `LOCAL_SETUP.md`
- **Deployment:** `DEPLOYMENT.md`
- **Supabase:** `SUPABASE_SETUP.md`
- **Improvements:** `IMPROVEMENTS.md`

---

**Need help?** See `LOCAL_SETUP.md` for step-by-step instructions.
