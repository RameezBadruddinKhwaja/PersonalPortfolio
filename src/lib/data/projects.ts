export type ProjectCategory = "web" | "ai" | "cybersecurity" | "all"

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  category: ProjectCategory
  live?: string
  repo?: string
}

export const categories: { value: ProjectCategory; label: string }[] = [
  { value: "all", label: "All Projects" },
  { value: "web", label: "Web Development" },
  { value: "ai", label: "AI / Machine Learning" },
  { value: "cybersecurity", label: "Cybersecurity" },
]

export const projects: Project[] = [
  // Web Development Projects
  {
    id: "authapp",
    title: "AuthApp Sage",
    description:
      "A full-stack authentication system built with Next.js, Express, Prisma, and PostgreSQL, featuring Google/GitHub OAuth, CSRF protection, Cloudinary image uploads, and an interactive dashboard.",
    tech: ["Next.js", "Express.js", "Prisma", "PostgreSQL", "Passport.js", "ShadCN UI"],
    category: "web",
    live: "", // Add your Vercel URL here
    repo: "https://github.com/RameezBadruddinKhwaja/authapp",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    description:
      "This portfolio website built with Next.js 16, featuring 3D animations, AI-powered chatbot, admin dashboard, and modern UI with Tailwind CSS and Framer Motion.",
    tech: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS", "Supabase"],
    category: "web",
    live: "", // Add your domain here
    repo: "https://github.com/RameezBadruddinKhwaja/PersonalPortfolio",
  },
  {
    id: "colorgame",
    title: "Color Guessing Game",
    description:
      "A fun JavaScript game that challenges users to match RGB colors in multiple difficulty modes with an intuitive and colorful interface.",
    tech: ["JavaScript", "Tailwind CSS", "HTML5"],
    category: "web",
    live: "", // Add URL when deployed
    repo: "https://github.com/RameezBadruddinKhwaja/color-guessing-game",
  },

  // AI Projects
  {
    id: "agentic-ai",
    title: "Agentic AI Bot",
    description:
      "An experimental AI agent built using OpenAI SDK, Crew AI, and Next.js, focused on automating reasoning-based workflows and intelligent task execution.",
    tech: ["Python", "Next.js", "OpenAI SDK", "Crew AI", "FastAPI"],
    category: "ai",
    live: "",
    repo: "https://github.com/RameezBadruddinKhwaja/agentic-ai-bot",
  },
  {
    id: "rag-chatbot",
    title: "RAG Portfolio Chatbot",
    description:
      "AI-powered chatbot using Retrieval Augmented Generation (RAG) with Google Gemini, vector embeddings, and semantic search for context-aware responses.",
    tech: ["TypeScript", "Gemini AI", "RAG", "Vector DB", "Next.js"],
    category: "ai",
    live: "", // This portfolio has it
    repo: "https://github.com/RameezBadruddinKhwaja/PersonalPortfolio",
  },

  // Cybersecurity Projects
  {
    id: "vuln-scanner",
    title: "Vulnerability Scanner",
    description:
      "A Python-based vulnerability assessment tool that scans networks for common security issues, open ports, and potential attack vectors.",
    tech: ["Python", "Nmap", "Scapy", "Socket"],
    category: "cybersecurity",
    live: "",
    repo: "", // Add when available
  },
  {
    id: "log-analyzer",
    title: "SIEM Log Analyzer",
    description:
      "Security Information and Event Management (SIEM) log analysis tool for detecting suspicious patterns, anomalies, and potential security incidents.",
    tech: ["Python", "ELK Stack", "Splunk", "Regex"],
    category: "cybersecurity",
    live: "",
    repo: "", // Add when available
  },
]
