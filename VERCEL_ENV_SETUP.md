# 🔧 Vercel Environment Variables Setup

## Production Domain: https://rameezbadruddinkhwaja.me

---

## 📋 Required Environment Variables for Vercel

Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

Add these variables for **Production**, **Preview**, and **Development** environments:

---

### 🗄️ Database & Supabase

```
NEXT_PUBLIC_SUPABASE_URL=https://yhihzipmecvtvoofhqxh.supabase.co
```

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloaWh6aXBtZWN2dHZvb2ZocXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NTc3NzQsImV4cCI6MjA3ODMzMzc3NH0.G8qeBjk6X8LGKJq0uwvAovM2ennH75k8uuuUiKrwcaw
```

```
DATABASE_URL=postgresql://postgres:Rameez1234portfolio@db.yhihzipmecvtvoofhqxh.supabase.co:5432/postgres
```

---

### 🤖 AI & Email Services

```
GEMINI_API_KEY=AIzaSyDG37LPHSTiuf3cAlP2_X9bGLBPIJvBGHw
```

```
RESEND_API_KEY=re_PjpMXWm9_CtkgZWYdYxn6PvYayAwKEJcb
```

---

### 🔐 Authentication & Security

```
JWT_SECRET=6829015f7b732461f75580ced9e16911eab86b8a3d473d6fc7e0e13f399f7e0fba858a38399f7b8196af3e2b22f3f495ae1f91728bcdab9481a44653142eff46
```

```
ADMIN_EMAIL=rameezbader.dev@gmail.com
```

```
ADMIN_PASSWORD_HASH=$2b$10$rO/.M.VjCFSYqfQSYcfhHeNEDg/SPmarKaylF1Qx6gqkqOd7PeBxS
```

---

### 🌐 Production URLs

```
NEXT_PUBLIC_SITE_URL=https://rameezbadruddinkhwaja.me
```

```
NEXTAUTH_URL=https://rameezbadruddinkhwaja.me
```

---

## ⚠️ Important Notes

### 1. Environment Selection
When adding each variable, select:
- ✅ **Production**
- ✅ **Preview** (optional)
- ✅ **Development** (optional)

### 2. After Adding Variables
You must **redeploy** your application for changes to take effect:
- Go to **Deployments** tab
- Click on latest deployment
- Click **"Redeploy"**

Or push a new commit to trigger automatic deployment.

### 3. Sensitive Variables
Never commit these to Git:
- `RESEND_API_KEY`
- `JWT_SECRET`
- `ADMIN_PASSWORD_HASH`
- `GEMINI_API_KEY`
- `DATABASE_URL`

These should ONLY be in:
- `.env` file (local development - gitignored)
- Vercel Environment Variables (production)

---

## ✅ Verification Checklist

After adding all variables to Vercel:

- [ ] All 11 environment variables added
- [ ] Selected correct environments (Production/Preview/Development)
- [ ] Redeployed application
- [ ] Tested admin login: https://rameezbadruddinkhwaja.me/admin/login
- [ ] Tested chatbot functionality
- [ ] Verified contact form works
- [ ] Checked Supabase connection

---

## 🔄 If You Need to Update a Variable

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Find the variable you want to update
3. Click **Edit** (pencil icon)
4. Update the value
5. Click **Save**
6. **Redeploy** your application

---

## 📝 Quick Reference

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `DATABASE_URL` | Direct database connection |
| `GEMINI_API_KEY` | AI chatbot API key |
| `RESEND_API_KEY` | Email service for contact form |
| `JWT_SECRET` | Admin authentication secret |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD_HASH` | Hashed admin password |
| `NEXT_PUBLIC_SITE_URL` | Production website URL |
| `NEXTAUTH_URL` | NextAuth redirect URL |

---

**All set! Your production environment is configured! 🚀**
