# Google Fonts Build Error - Fix

## Issue
Build fails with:
```
Failed to fetch `Inter` from Google Fonts.
Failed to fetch `Poppins` from Google Fonts.
```

This happens when Google Fonts is blocked by firewall or network restrictions during build time.

## Solutions

### Solution 1: Use Tailwind's Default Fonts (Quick Fix)

Replace `src/app/layout.tsx` font imports with Tailwind's font stack:

**Before:**
```typescript
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins"
});
```

**After:**
```typescript
// Remove Google Font imports
// Fonts will be loaded from Tailwind's default stack
```

Update the body className:
```typescript
<body className={cn(
  "min-h-screen bg-background font-sans antialiased"
  // Remove: inter.variable, poppins.variable
)}>
```

Then in `tailwind.config.ts`, use system fonts:
```typescript
theme: {
  extend: {
    fontFamily: {
      sans: [
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif'
      ],
    },
  },
}
```

### Solution 2: Use Local Font Files

1. Download Inter and Poppins from [Google Fonts](https://fonts.google.com/)
2. Place font files in `public/fonts/`
3. Use `next/font/local`:

```typescript
import localFont from 'next/font/local'

const inter = localFont({
  src: [
    {
      path: '../../public/fonts/Inter-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
})

const poppins = localFont({
  src: [
    {
      path: '../../public/fonts/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-poppins',
})
```

### Solution 3: Load Fonts at Runtime (CSS)

Add to `globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
```

Remove from `layout.tsx`:
```typescript
// Remove: import { Inter, Poppins } from "next/font/google";
// Remove font initialization
```

### Solution 4: Skip Font Optimization

In `next.config.ts`, add:
```typescript
const nextConfig: NextConfig = {
  // ... existing config
  experimental: {
    optimizePackageImports: [],
  },
  // Tell Next.js to skip font optimization
}
```

Then use regular CSS imports (Solution 3).

---

## Recommended Approach for This Environment

Since Google Fonts is blocked at build time, use **Solution 1** (Tailwind defaults) for now. The site will use high-quality system fonts that look professional.

Once you deploy to Vercel or another platform where Google Fonts isn't blocked, you can switch back to the original font loading.

---

## Testing After Fix

```bash
npm run build
```

Should complete successfully without font errors.
