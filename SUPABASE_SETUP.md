# Supabase Setup Guide

This guide will help you set up Supabase for your portfolio website.

## Prerequisites

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project in Supabase

## Step 1: Get Your Credentials

After creating your project, get the following from **Project Settings → API**:

- `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
- `anon public` key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
- `Database URL` (for Prisma, from **Project Settings → Database**)

Add these to your `.env.local` file.

## Step 2: Create Database Tables

Go to **SQL Editor** in your Supabase dashboard and run the following SQL:

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

-- Create chat_messages table (optional, for analytics)
CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_message TEXT NOT NULL,
  bot_reply TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_feedbacks_created_at ON feedbacks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read/insert access
CREATE POLICY "Allow public read access to projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access to feedbacks"
  ON feedbacks FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read access to feedbacks (for admin)"
  ON feedbacks FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access to chat_messages"
  ON chat_messages FOR INSERT
  WITH CHECK (true);
```

## Step 3: Verify Tables

1. Go to **Table Editor** in Supabase
2. You should see `feedbacks`, `projects`, and `chat_messages` tables
3. Verify columns match the schema above

## Step 4: (Optional) Seed Sample Data

If you want to add sample projects to test:

```sql
INSERT INTO projects (title, description, tech, live, repo) VALUES
  (
    'AuthApp Sage',
    'A full-stack authentication system built with Next.js, Express, Prisma, and PostgreSQL.',
    ARRAY['Next.js', 'Express.js', 'Prisma', 'PostgreSQL', 'Passport.js'],
    'https://your-deployment-url.vercel.app',
    'https://github.com/RameezBader/authapp'
  ),
  (
    'Color Guessing Game',
    'An interactive RGB color matching game with multiple modes.',
    ARRAY['JavaScript', 'Tailwind CSS', 'HTML5'],
    'https://your-game-url.vercel.app',
    'https://github.com/RameezBader/color-guessing-game'
  ),
  (
    'Agentic AI Bot',
    'An experimental AI agent using OpenAI SDK and Next.js.',
    ARRAY['Python', 'Next.js', 'OpenAI SDK', 'FastAPI'],
    'https://your-ai-bot-url.vercel.app',
    'https://github.com/RameezBader/agentic-ai-bot'
  );
```

## Step 5: Test Connection

1. Start your Next.js dev server: `npm run dev`
2. Try submitting the feedback form
3. Check Supabase **Table Editor** to see if the data appears in the `feedbacks` table

## Troubleshooting

### Connection Error
- Verify your environment variables are correct
- Make sure you're using `NEXT_PUBLIC_` prefix for client-side variables
- Restart your dev server after changing `.env.local`

### Permission Denied
- Check Row Level Security (RLS) policies
- Make sure the policies allow the operations you're trying to perform

### Data Not Appearing
- Check browser console for errors
- Verify API route is working: `http://localhost:3000/api/feedback`
- Check Supabase logs in the dashboard

## Admin Dashboard Access

To view feedback in your admin dashboard:

1. Navigate to `/admin` in your app
2. You should see all feedback submissions
3. (Future enhancement: Add authentication to protect this route)

## Next Steps

- Set up authentication for the admin dashboard
- Enable email notifications when new feedback arrives
- Add analytics tracking for chat messages
- Consider adding backups for your database

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
