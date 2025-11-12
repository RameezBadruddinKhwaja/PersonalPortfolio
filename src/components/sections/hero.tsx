import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { EnergyRing } from "@/components/3d/energy-ring";

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-5xl mx-auto text-center pt-20 lg:pt-32"
    >
      {/* 3D Energy Ring Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <EnergyRing />
      </div>

      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Hi, I'm Rameez Bader Khwaja —
        <br />
        <span className="text-primary">
          Full-Stack & AI Developer
        </span>
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        I design and build intelligent, modern, and responsive web experiences using
        Next.js, TypeScript, and AI-driven technologies.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Link href="/projects">
          <Button size="lg" className="min-w-[150px]">
            View My Work
          </Button>
        </Link>
        <Link href="/feedback">
          <Button variant="outline" size="lg" className="min-w-[150px]">
            Let's Talk
          </Button>
        </Link>
      </motion.div>

      <motion.p
        className="text-sm text-muted-foreground mt-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        Turning ideas into interactive digital reality
      </motion.p>
    </motion.section>
  );
}