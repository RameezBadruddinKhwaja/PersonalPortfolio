# 🔐 Supabase OAuth Configuration for Production

## Production Domain: https://rameezbadruddinkhwaja.me

---

## 📋 Step 1: Update Supabase Authentication Settings

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: **yhihzipmecvtvoofhqxh**
3. Click **Authentication** in left sidebar
4. Click **URL Configuration**

---

## 🌐 Step 2: Add Production URLs

### Site URL
```
https://rameezbadruddinkhwaja.me
```

### Redirect URLs (Add ALL of these)
```
https://rameezbadruddinkhwaja.me/auth/callback
https://www.rameezbadruddinkhwaja.me/auth/callback
https://rameezbadruddinkhwaja.me/api/auth/callback
https://www.rameezbadruddinkhwaja.me/api/auth/callback
```

**Keep localhost URLs for local development:**
```
http://localhost:3000/auth/callback
http://localhost:3000/api/auth/callback
```

---

## 📧 Step 3: Email Templates (Optional)

If you want to customize auth emails:

1. Go to **Authentication** → **Email Templates**
2. Update each template to use your domain:
   - Confirm signup
   - Magic link
   - Change email
   - Reset password

Replace any instance of `{{ .SiteURL }}` references to point to production.

---

## 🔑 Step 4: Verify Environment Variables in Vercel

Make sure these are set in **Vercel Dashboard** → **Settings** → **Environment Variables**:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://yhihzipmecvtvoofhqxh.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (your anon key) |
| `DATABASE_URL` | (your database URL) |
| `NEXT_PUBLIC_SITE_URL` | `https://rameezbadruddinkhwaja.me` |
| `NEXTAUTH_URL` | `https://rameezbadruddinkhwaja.me` |

---

## 🧪 Step 5: Test Authentication Flow

After updating Supabase settings:

1. Go to https://rameezbadruddinkhwaja.me/admin/login
2. Try logging in with admin credentials
3. Verify redirect works correctly
4. Check that session persists

---

## ⚠️ Common Issues & Solutions

### Issue: "Invalid redirect URL" error
**Solution:** Make sure ALL redirect URLs are added in Supabase (including www variant)

### Issue: "Site URL is not allowed"
**Solution:** Update Site URL in Supabase to production domain

### Issue: Authentication works locally but not in production
**Solution:**
- Clear browser cache
- Check Vercel environment variables
- Verify Supabase URLs are correct

---

## 📝 Summary of Changes Needed

### In Supabase Dashboard:
- [x] Site URL → `https://rameezbadruddinkhwaja.me`
- [x] Add redirect URLs (4 production URLs)
- [ ] Keep localhost URLs for development

### In Vercel Dashboard:
- [x] Add `NEXT_PUBLIC_SITE_URL` environment variable
- [x] Update `NEXTAUTH_URL` environment variable
- [x] All other variables already set

### In Code:
- [x] `.env` updated with production URLs
- [x] `layout.tsx` metadata updated
- [x] No hardcoded localhost URLs in src

---

## ✅ Checklist

- [ ] Update Site URL in Supabase
- [ ] Add all redirect URLs in Supabase
- [ ] Verify environment variables in Vercel
- [ ] Test admin login on production
- [ ] Test auth callback works
- [ ] Verify session persistence

---

**Once you complete the Supabase configuration, your authentication will work perfectly on production!** 🎉
