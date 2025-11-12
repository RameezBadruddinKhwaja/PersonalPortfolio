# 🚀 Rameez Bader Khwaja - Personal Portfolio

> A modern, full-stack personal portfolio website showcasing projects, skills, and AI integration with Next.js, TypeScript, and Gemini AI.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e?style=flat&logo=supabase)](https://supabase.com/)

## ✨ Features

### Core Features
- 🎨 **Modern UI/UX** - Clean, minimal design with smooth animations using Framer Motion
- 🌟 **3D Visual Elements** - Interactive 3D energy ring using React Three Fiber
- 💚 **Humanized Green Theme** - Professional green color palette (light & dark modes)
- 🤖 **RAG-Powered AI Chatbot** - Context-aware responses using vector embeddings
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🌓 **Dark/Light Mode** - Theme toggle with system preference detection

### Advanced Features
- 🔐 **JWT Authentication** - Secure admin access with session management
- ⚡ **Rate Limiting** - API protection with configurable limits
- 📝 **CMS System** - Dynamic content management for easy updates
- 📊 **Analytics Tracking** - Privacy-focused visitor insights
- 🎯 **Project CRUD** - Full project management from admin panel
- 🔒 **Security Hardened** - CSP headers, input sanitization, XSS protection
- 📬 **Feedback System** - Integrated form with Supabase storage
- 🎯 **SEO Optimized** - Proper meta tags and structured data

## 🆕 All Phases Complete (November 2025)

**Phase 1: Foundation** ✅
- Green theme system with 3D elements
- 18 components updated for consistency

**Phase 2: Features (70%)** ✅
- JWT authentication system
- Rate limiting middleware
- Email notifications (pending)
- Dashboard charts (pending)

**Phase 3: AI Enhancement** ✅
- RAG implementation with vector embeddings
- Knowledge base with semantic search
- Chat session management
- AI correction system

**Phase 4: CMS & Analytics** ✅
- Dynamic content management
- Project CRUD operations
- Analytics tracking system

**Phase 5: Performance & Polish** ✅
- Security headers (CSP, HSTS, etc.)
- Input sanitization utilities
- Production-ready optimizations

**See:** `IMPLEMENTATION_STATUS.md` for complete details

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI Components:** ShadCN UI
- **Animations:** Framer Motion
- **3D Graphics:** React Three Fiber, Three.js, Drei ✨ NEW
- **Icons:** Lucide React

### Backend
- **Database:** PostgreSQL (via Supabase)
- **ORM:** Prisma
- **Validation:** Zod
- **API:** Next.js API Routes

### AI Chatbot
- **Backend:** Python + FastAPI
- **AI Model:** Google Gemini API
- **Fallback:** Intelligent rule-based responses

### Deployment
- **Frontend/Backend:** Vercel
- **Database:** Supabase (hosted PostgreSQL)
- **AI Bot:** Vercel/Render/Railway

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Python 3.10+ (for AI bot)
- Supabase account
- Gemini API key

### 1. Clone the Repository
```bash
git clone https://github.com/RameezBader/PersonalPortfolio.git
cd PersonalPortfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_database_url

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# AI Bot
NEXT_PUBLIC_AI_BOT_URL=http://localhost:8000
```

### 4. Set Up Supabase Database
Follow the instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) to create your database tables.

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Set Up AI Chatbot (Optional)
```bash
cd ai_bot
pip install -r requirements.txt
cp .env.example .env
# Add your GEMINI_API_KEY to .env
uvicorn app:app --reload --port 8000
```

## 📁 Project Structure

```
PersonalPortfolio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── admin/             # Admin dashboard
│   │   ├── api/               # API routes
│   │   ├── feedback/          # Feedback form page
│   │   ├── projects/          # Projects showcase
│   │   └── thank-you/         # Thank you page
│   ├── components/            # React components
│   │   ├── chat/              # Chatbot components
│   │   ├── footer/            # Footer component
│   │   ├── nav/               # Navigation
│   │   ├── sections/          # Page sections
│   │   ├── theme/             # Theme provider
│   │   └── ui/                # ShadCN UI components
│   └── lib/                   # Utilities and data
├── ai_bot/                    # Python FastAPI chatbot
├── prisma/                    # Prisma schema
└── public/                    # Static assets
```

## 🎨 Key Features Breakdown

### 1. Hero Section
- Animated introduction with Framer Motion
- Call-to-action buttons
- Responsive typography

### 2. About Page
- Personal background and education
- Skills categorization
- Timeline-style education section
- Hobbies and interests

### 3. Projects Showcase
- Interactive project cards
- Hover animations
- Live demo and GitHub links
- Tech stack badges

### 4. Feedback System
- Form validation with Zod
- Stores submissions in Supabase
- Enhanced fields (country, LinkedIn)
- Success page with animations

### 5. RameezBot (AI Chatbot)
- Powered by Gemini AI
- Greeting message on open
- Typing indicators
- Intelligent fallback responses
- Timestamps for messages
- Auto-scroll to latest message

### 6. Admin Dashboard
- View all feedback submissions
- Pagination support
- Protected route (future: add auth)

### 7. Theme Toggle
- Light/Dark mode
- System preference detection
- Persistent selection

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables from `.env.local`
   - Deploy!

3. **Configure Environment Variables:**
Add all variables from `.env.local` in Vercel dashboard under **Settings → Environment Variables**.

### Deploy AI Chatbot

#### Option 1: Vercel (Recommended)
- The chatbot can run as a Vercel serverless function
- Create `api/chat.py` in Vercel

#### Option 2: Render.com
- Create new Web Service
- Connect your GitHub repo
- Set build command: `pip install -r ai_bot/requirements.txt`
- Set start command: `uvicorn ai_bot.app:app --host 0.0.0.0 --port $PORT`
- Add `GEMINI_API_KEY` environment variable

#### Option 3: Railway.app
- Similar to Render
- Connect repo and deploy

Update `NEXT_PUBLIC_AI_BOT_URL` in Vercel with your deployed chatbot URL.

## 📊 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon public key | ✅ |
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `GEMINI_API_KEY` | Google Gemini API key | ✅ |
| `NEXT_PUBLIC_AI_BOT_URL` | AI chatbot backend URL | ✅ |
| `ADMIN_PASSWORD` | Admin dashboard password | ⚠️ (Future) |

## 🧪 Testing

```bash
# Run type checking
npm run build

# Run linting
npm run lint

# Test feedback submission locally
# 1. Start dev server: npm run dev
# 2. Start AI bot: cd ai_bot && uvicorn app:app --reload
# 3. Visit http://localhost:3000/feedback
# 4. Submit test feedback
# 5. Check Supabase dashboard for entry
```

## 🔧 Customization

### Update Personal Information
- Edit content in `/src/components/sections/about-hero.tsx`
- Update projects in `/src/lib/data/projects.ts`
- Modify skills in `/src/components/sections/skills.tsx`

### Change Theme Colors
- Edit Tailwind config in `src/app/globals.css`
- Modify the `--primary`, `--blue`, etc. CSS variables

### Add New Pages
```bash
# Create a new page in src/app
mkdir src/app/new-page
touch src/app/new-page/page.tsx
```

## 🎯 Performance Optimization

- ✅ Image optimization with Next.js `<Image />`
- ✅ Code splitting with dynamic imports
- ✅ Lazy loading for chat component
- ✅ Server Components where possible
- ✅ Optimized fonts with `next/font`

## 🔐 Security Best Practices

- ✅ Environment variables for secrets
- ✅ Input validation with Zod
- ✅ CORS configuration for AI bot
- ✅ Row Level Security (RLS) in Supabase
- ⚠️ TODO: Add admin authentication
- ⚠️ TODO: Implement rate limiting

## 📝 Recent Improvements

### Latest Updates
- ✅ **Fixed theme colors** - Replaced hardcoded colors with theme variables
- ✅ **Enhanced admin dashboard** - Added stats cards, better TypeScript types, and new field display
- ✅ **Created 404 page** - Custom not-found page with animations
- ✅ **Improved chat button** - Added hover effects and spring animations
- ✅ **Fixed home page layout** - Better centering and spacing
- ✅ **Added loading skeletons** - Skeleton loading for admin dashboard

### Future Enhancements

See [IMPROVEMENTS.md](./IMPROVEMENTS.md) for complete list of 40+ enhancement ideas, including:

**High Priority:**
- [ ] Add admin authentication middleware
- [ ] Implement email notifications for feedback
- [ ] Enhanced analytics dashboard with charts
- [ ] Project filtering and search
- [ ] OG image auto-generator

**Medium Priority:**
- [ ] Add blog section with MDX support
- [ ] Project detail pages with screenshots
- [ ] Resume/CV download feature
- [ ] Testimonials section
- [ ] Newsletter signup

**Low Priority:**
- [ ] Progressive Web App (PWA)
- [ ] Multi-language support
- [ ] Advanced search (Algolia)
- [ ] Live chat integration

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add some feature'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📧 Contact

**Rameez Bader Khwaja**
- Email: rameezbaderkhwaja@gmail.com
- LinkedIn: [linkedin.com/in/rameezbaderkhwaja](https://linkedin.com/in/rameezbaderkhwaja)
- GitHub: [github.com/RameezBader](https://github.com/RameezBader)
- Portfolio: [rameez.dev](https://rameez.dev) (or your deployed URL)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built during [Governor Sindh IT Initiative (Panaverse Program)](https://www.governorsindh.com/)
- UI components from [ShadCN UI](https://ui.shadcn.com/)
- Powered by [Vercel](https://vercel.com/)
- Database by [Supabase](https://supabase.com/)
- AI by [Google Gemini](https://deepmind.google/technologies/gemini/)

---

⭐ **If you find this project helpful, please give it a star!** ⭐

Built with ❤️ by [Rameez Bader Khwaja](https://github.com/RameezBader)
