# Supabase OAuth Setup Guide

## Step 1: Get Supabase Credentials

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project: `yhihzipmecvtvoofhqxh`
3. Go to **Settings** → **API**
4. Copy the following:
   - **Project URL**: `https://yhihzipmecvtvoofhqxh.supabase.co`
   - **anon/public key**: (from API settings)

## Step 2: Configure OAuth Providers in Supabase

### GitHub OAuth

1. In Supabase Dashboard → Authentication → Providers → GitHub
2. Toggle **GitHub Enabled** ON
3. Enter your GitHub OAuth credentials:
   - **Client ID**: (from GitHub OAuth App)
   - **Client Secret**: (from GitHub OAuth App)
4. Click **Save**

The callback URL is already set: `https://yhihzipmecvtvoofhqxh.supabase.co/auth/v1/callback`

### Google OAuth

1. In Supabase Dashboard → Authentication → Providers → Google
2. Toggle **Enable Sign in with Google** ON
3. Enter your Google OAuth credentials:
   - **Client IDs**: (comma-separated list from Google Cloud Console)
   - **Client Secret**: (from Google Cloud Console)
4. Enable **Skip nonce checks** if needed
5. Enable **Allow users without an email** if needed
6. Click **Save**

The callback URL is already set: `https://yhihzipmecvtvoofhqxh.supabase.co/auth/v1/callback`

## Step 3: Create OAuth Apps (if not done)

### For GitHub:

1. Go to: https://github.com/settings/developers
2. Click **New OAuth App**
3. Fill in:
   - **Application name**: Rameez Portfolio
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `https://yhihzipmecvtvoofhqxh.supabase.co/auth/v1/callback`
4. Click **Register application**
5. Copy **Client ID** and generate **Client Secret**
6. Paste these in Supabase (Step 2)

### For Google:

1. Go to: https://console.cloud.google.com
2. Create/Select project
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Choose **Web application**
6. Add Authorized redirect URI: `https://yhihzipmecvtvoofhqxh.supabase.co/auth/v1/callback`
7. Click **Create**
8. Copy **Client ID** and **Client Secret**
9. Paste these in Supabase (Step 2)

## Step 4: Update .env.local

Replace these values in your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://yhihzipmecvtvoofhqxh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_ACTUAL_KEY_HERE
```

To get your anon key:
1. Go to Supabase Dashboard
2. Settings → API
3. Copy the **anon/public** key

## Step 5: Configure Redirect URLs in Supabase

1. Go to Authentication → URL Configuration
2. Add these to **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000` (for local dev)
   - Your production URL when deploying

## Step 6: Test OAuth

1. Start dev server: `npm run dev`
2. Go to `http://localhost:3000/login`
3. Click **Continue with Google** or **Continue with GitHub**
4. Authorize the app
5. You should be redirected back and logged in
6. Check navbar - you should see your profile avatar

## Quick Commands

```bash
# Start dev server
npm run dev

# Build and check for errors
npm run build

# Check if OAuth is working
# Visit: http://localhost:3000/login
```

## Database Tables Needed

Run these SQL queries in Supabase SQL Editor if tables don't exist:

```sql
-- Feedbacks table
CREATE TABLE IF NOT EXISTS feedbacks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  profession TEXT,
  country TEXT,
  linkedin TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT UNIQUE NOT NULL,
  user_ip TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT REFERENCES chat_sessions(session_id),
  user_message TEXT NOT NULL,
  bot_reply TEXT NOT NULL,
  embedding TEXT,
  context_used TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Knowledge base table
CREATE TABLE IF NOT EXISTS knowledge_base (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  embedding TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Troubleshooting

**"Invalid Supabase credentials" error:**
- Check that NEXT_PUBLIC_SUPABASE_URL matches your project URL
- Verify NEXT_PUBLIC_SUPABASE_ANON_KEY is correct
- Restart dev server after changing .env.local

**OAuth redirect not working:**
- Verify callback URL matches exactly in GitHub/Google settings
- Check Supabase Auth → URL Configuration has your URLs
- Clear browser cookies and try again

**Users not appearing in Supabase:**
- Check Supabase → Authentication → Users
- Verify OAuth provider is enabled
- Check browser console for errors

## Security Checklist

- [ ] .env.local is in .gitignore
- [ ] Strong admin password set
- [ ] OAuth secrets are kept private
- [ ] Production URLs updated in OAuth apps
- [ ] RLS policies configured on tables (optional but recommended)

## Next Steps

After OAuth is working:
1. Test login with both Google and GitHub
2. Check that users appear in Supabase Auth → Users
3. Deploy to production (Vercel/Netlify)
4. Update OAuth callback URLs for production domain
