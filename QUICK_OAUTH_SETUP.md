# Quick OAuth Setup - Do These Steps Now!

## ✅ Step 1: Get Supabase Anon Key

1. Go to: https://app.supabase.com/project/yhihzipmecvtvoofhqxh/settings/api
2. Copy the **anon/public** key (long string starting with `eyJ...`)

## ✅ Step 2: Update .env.local File

Open `.env.local` and replace these lines:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://yhihzipmecvtvoofhqxh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_copied_anon_key_here
```

## ✅ Step 3: Configure GitHub OAuth in Supabase

**In your screenshot, you need to fill:**

1. **Client ID**: Get from https://github.com/settings/developers (your GitHub OAuth App)
2. **Client Secret**: From same GitHub OAuth App
3. Click **Save**

**Callback URL is already correct:** `https://yhihzipmecvtvoofhqxh.supabase.co/auth/v1/callback`

## ✅ Step 4: Configure Google OAuth in Supabase

**In your screenshot, you need to fill:**

1. **Client IDs**: Get from https://console.cloud.google.com (OAuth 2.0 credentials)
2. **Client Secret**: From same Google credentials
3. Keep "Skip nonce checks" enabled
4. Keep "Allow users without email" enabled
5. Click **Save**

**Callback URL is already correct:** `https://yhihzipmecvtvoofhqxh.supabase.co/auth/v1/callback`

## ✅ Step 5: Restart and Test

```bash
# Restart your dev server
npm run dev

# Then visit:
# http://localhost:3000/login
```

## 🔑 Admin Login (Already Working)

- URL: http://localhost:3000/admin/login
- Email: `admin@rameez.dev`
- Password: `admin123`

## 📝 What Each OAuth Provider Needs

### GitHub OAuth App Settings:
- Homepage URL: `http://localhost:3000`
- Callback URL: `https://yhihzipmecvtvoofhqxh.supabase.co/auth/v1/callback`

### Google OAuth Settings:
- Authorized redirect URI: `https://yhihzipmecvtvoofhqxh.supabase.co/auth/v1/callback`

## 🎯 Expected Result

After setup:
1. Go to `/login`
2. See "Continue with Google" and "Continue with GitHub" buttons
3. Click either → OAuth flow → Redirected back logged in
4. See your avatar in navbar (top right)

---

**Agar koi issue aaye toh error message batana!**
