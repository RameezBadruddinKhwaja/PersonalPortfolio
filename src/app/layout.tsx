import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { MainNav } from "@/components/nav/main-nav";
import { Footer } from "@/components/footer/footer";
import { ChatButton } from "@/components/chat/chat-button";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "Rameez Bader Khwaja | Full Stack & AI Developer",
  description: "Full Stack Developer and AI enthusiast specializing in Next.js, TypeScript, and modern web technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable,
        poppins.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <MainNav />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <ChatButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
