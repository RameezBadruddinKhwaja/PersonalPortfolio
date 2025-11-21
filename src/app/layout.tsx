import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { AuthProvider } from "@/contexts/auth-context";
import { MainNav } from "@/components/nav/main-nav";
import { Footer } from "@/components/footer/footer";
import { ChatButton } from "@/components/chat/chat-button";

export const metadata: Metadata = {
  title: {
    default: "Rameez Bader Khwaja | Full Stack & AI Developer",
    template: "%s | Rameez Bader Khwaja",
  },
  description:
    "Full Stack Developer and AI enthusiast from Karachi, Pakistan. Specializing in Next.js, TypeScript, React, Prisma, and AI integrations. Building intelligent, scalable web applications.",
  keywords: [
    "Rameez Bader Khwaja",
    "Full Stack Developer",
    "AI Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "React Developer",
    "Karachi Developer",
    "Pakistan Developer",
    "Prisma",
    "Supabase",
    "Web Development",
    "AI Integration",
    "Gemini AI",
    "Portfolio",
  ],
  authors: [{ name: "Rameez Bader Khwaja", url: "https://github.com/RameezBader" }],
  creator: "Rameez Bader Khwaja",
  publisher: "Rameez Bader Khwaja",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://rameez.dev"), // Replace with your actual domain
  openGraph: {
    title: "Rameez Bader Khwaja | Full Stack & AI Developer",
    description:
      "Full Stack Developer and AI enthusiast specializing in Next.js, TypeScript, and modern web technologies.",
    url: "https://rameez.dev",
    siteName: "Rameez Bader Khwaja Portfolio",
    images: [
      {
        url: "/og-image.png", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "Rameez Bader Khwaja - Full Stack & AI Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rameez Bader Khwaja | Full Stack & AI Developer",
    description:
      "Full Stack Developer and AI enthusiast specializing in Next.js, TypeScript, and modern web technologies.",
    images: ["/og-image.png"],
    creator: "@rameezbader", // Replace with your Twitter handle if you have one
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code", // Add when you set up Google Search Console
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased"
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
